using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class LocationRepository : ILocationRepository
    {
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        private readonly IEntityDataAccess<Location> _entityDataAccess;
        public LocationRepository(
            IEntityDataAccess<Location> entityDataAccess
            )
        {
            _entityDataAccess = entityDataAccess;

        }
        public void Add(Location oLocation)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                    var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                    var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
                    var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
                    oLocation.created_user_id = (long)currentUserInfoId;
                    oLocation.company_corporate_id = (int)company_corporate_id;
                    oLocation.company_group_id = (int)company_group_id;
                    oLocation.company_id = (int)company_id;
                    oLocation.created_datetime = DateTime.Now;
                    oLocation.db_server_date_time = DateTime.Now;
                    oLocation.location_id = oLocation.location_id;
                    var prefix = oLocation.location_prefix.ToUpper();
                    var autoCode = _entityDataAccess.GetAutoCode("Administrative.Location", "location_id");
                    oLocation.location_code = prefix + "" + autoCode + "";
                    _entityDataAccess.Add(oLocation);
                    tran.Complete();
                }                    
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_location_code"))
                    throw new Exception("This location code(" + oLocation.location_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_location_name"))
                    throw new Exception("This location name(" + oLocation.location_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_location_short_name"))
                    throw new Exception("This location short name(" + oLocation.location_short_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_location_reg_no"))
                    throw new Exception("This location reg no(" + oLocation.location_reg_no + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_email"))
                    throw new Exception("This location email(" + oLocation.email + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_web_url"))
                    throw new Exception("This location web url(" + oLocation.web_url + ") is already exists.");                
                else
                    throw new Exception(ex.Message);
            }
            finally
            {
                tran.Dispose();
            }
        }
        public void Update(Location oLocation)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                oLocation.updated_datetime = DateTime.Now;
                oLocation.updated_user_id = (long)currentUserInfoId;
                _entityDataAccess.Update(oLocation);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_location_code"))
                    throw new Exception("This location code(" + oLocation.location_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_location_name"))
                    throw new Exception("This location name(" + oLocation.location_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_location_short_name"))
                    throw new Exception("This location short name(" + oLocation.location_short_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_location_reg_no"))
                    throw new Exception("This location reg no(" + oLocation.location_reg_no + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_email"))
                    throw new Exception("This location email(" + oLocation.email + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_web_url"))
                    throw new Exception("This location web url(" + oLocation.web_url + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }
        public IEnumerable<Location> GetAllLocation()
        {
            return  _entityDataAccess.GetAll();
        }

        public Location GetById(int location_id)
        {
            return _entityDataAccess.GetById(location_id);
        }

        public IEnumerable<object> LocationCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.location_id)
                       select new { location_id = r.location_id, location_name = r.location_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int location_id)
        {
            Location oLocation = new Location() { location_id = location_id };
            _entityDataAccess.Remove(oLocation);
        }
        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.location_id).ToList();
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

        private string GetAutoLocationCode()
        {
            try
            {

                string locationPrefix = "";
                locationPrefix = locationPrefix.PadLeft(1, '0');
                string code = "";
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.location_id).ToList();

                if (idList.Count() != 0)
                {
                    id = idList.Max(x => x + 1);
                }
                else
                {
                    id = 1;
                }
                if (id > 9)
                {
                    code = Convert.ToString(id);
                }
                else
                {
                    code = "" + locationPrefix + "" + id + "";
                }

                return code;
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
