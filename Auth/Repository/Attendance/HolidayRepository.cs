using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Attendance.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NHibernate.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.Repository.Attendance
{
    public class HolidayRepository:IHolidayRepository
    {

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        private readonly IEntityDataAccess<Holiday> _entityDataAccess;
       
        public HolidayRepository(
            IEntityDataAccess<Holiday> entityDataAccess
            
            )
        {
            _entityDataAccess = entityDataAccess;
 

        }
        public void Add(Holiday oHoliday)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

                
                oHoliday.created_user_id = (long)currentUserInfoId;
                oHoliday.company_corporate_id = (int)company_corporate_id;
                oHoliday.company_group_id = (int)company_group_id;

                oHoliday.holiday_id = GetAutoId();
                
                _entityDataAccess.Add(oHoliday);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_HolidayName"))
                    throw new Exception("This holiday name(" + oHoliday.holiday_name + ") is already exists.");

                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(Holiday oholiday)
        {
            try
            {
                var dbdata = _entityDataAccess.Get(oholiday.holiday_id);
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                
                dbdata.holiday_name = oholiday.holiday_name;
                dbdata.name_in_local_language = oholiday.name_in_local_language;
                dbdata.type_of_holiday_id_enum = dbdata.type_of_holiday_id_enum;
                dbdata.remarks = oholiday.remarks;
               
                _entityDataAccess.Update(dbdata);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_HolidayName"))
                    throw new Exception("This holiday name(" + oholiday.holiday_name + ") is already exists.");
                
                else
                    throw new Exception(ex.Message);
            }
        }
        public IEnumerable<dynamic> GetAllHoliday()
        {
           var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"]??0;
           
           return  from c in _entityDataAccess.GetAll().ToList()
                   where c.company_group_id == (int)company_group_id
                         select new { c.company_corporate_id,c.company_group_id,c.days_of_month,c.holiday_name,c.holiday_id,c.name_in_local_language,c.remarks,c.type_of_holiday_id_enum, holidayTypeName = Enum.GetName(typeof(EnumHolidayType),c.type_of_holiday_id_enum) };
            

        }
   
        public Holiday GetById(int holiday_id)
        {
            return _entityDataAccess.GetById(holiday_id);
        }

       
        public void Delete(int holiday_id)
        {

            Holiday holiday = new Holiday() { holiday_id = holiday_id };
            _entityDataAccess.Remove(holiday);
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.holiday_id).ToList();
                if (idList.Count() != 0)
                {
                    id = idList.Max(x => x + 1);
                }
                else
                {
                    id = 1;
                }
                return id;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public IEnumerable<object> HolidayListForDP()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.holiday_id)
                             select new { holiday_id = r.holiday_id, holiday_name = r.holiday_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

    }
}
