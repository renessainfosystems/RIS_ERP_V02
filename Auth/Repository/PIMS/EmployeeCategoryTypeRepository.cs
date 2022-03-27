using Auth.DataAccess.EntityDataAccess;
using Auth.Model.PIMS.Model;
using Auth.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Auth.Utility.Attendance.Enum;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public class EmployeeCategoryTypeRepository: IEmployeeCategoryTypeRepository
    {
        protected readonly ApplicationDBContext _dbSet;
        private readonly IEntityDataAccess<EmployeeCategoryType> _entityDataAccess;
        public EmployeeCategoryTypeRepository(
            ApplicationDBContext dbSet
            , IEntityDataAccess<EmployeeCategoryType> entityDataAccess
            )
        {
            _dbSet = dbSet;
            _entityDataAccess = entityDataAccess;
        }
        public async Task<dynamic> IUD_EmployeeCategoryType(EmployeeCategoryType oEmployeeCategoryType,int dbOperation)
        {
            var message = new CommonMessage();
            try
            {
                string StrQuery = string.Format(@"exec PIMS.[SP_PIMS_Employee_Category_Type_IUD]{0},'{1}','{2}',{3},{4},{5},{6},{7}",
                       oEmployeeCategoryType.employee_category_type_id,
                       oEmployeeCategoryType.employee_category_name,
                       oEmployeeCategoryType.remarks,
                       oEmployeeCategoryType.created_user_id,
                       oEmployeeCategoryType.company_group_id,
                       oEmployeeCategoryType.company_corporate_id,
                       oEmployeeCategoryType.company_id,
                       dbOperation);
                var result = await _dbSet.EmployeeCategoryTypes.FromSqlRaw(StrQuery).ToListAsync();

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Approve)
                {
                    return message = CommonMessage.SetSuccessMessage("Employee Approved");
                }

                if (result.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return (message);
        }

        public IEnumerable<EmployeeCategoryType> GetAllEmployeeCategoryType()
        {
            return _entityDataAccess.GetAll();
        }
        public EmployeeCategoryType GetById(int EmployeeCategoryType_id)
        {
            return _entityDataAccess.GetById(EmployeeCategoryType_id);
        }
        public IEnumerable<object> EmployeeCategoryTypeCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.employee_category_type_id)
                             select new { EmployeeCategoryType_id = r.employee_category_type_id, EmployeeCategoryType_name = r.employee_category_name };
                return result;
            }
            catch
            {
                return null;
            }
        }
        public void Delete(int EmployeeCategoryType_id)
        {
            EmployeeCategoryType oEmployeeCategoryType = new EmployeeCategoryType() { employee_category_type_id = EmployeeCategoryType_id };
            _entityDataAccess.Remove(oEmployeeCategoryType);
        }
    }
}
