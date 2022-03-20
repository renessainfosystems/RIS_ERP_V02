using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class DepartmentTypeConfigRepository:IDepartmentTypeConfigRepository
    {
        private readonly IEntityDataAccess<DepartmentTypeConfig> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public DepartmentTypeConfigRepository(
            IEntityDataAccess<DepartmentTypeConfig> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(DepartmentTypeConfig oDepartmentTypeConfig)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                oDepartmentTypeConfig.department_type_config_id = GetAutoId();
                oDepartmentTypeConfig.company_corporate_id = (int)company_corporate_id;
                _entityDataAccess.Add(oDepartmentTypeConfig);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_display_name"))
                    throw new Exception("This department code(" + oDepartmentTypeConfig.display_name + ") is already exists.");
                
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(DepartmentTypeConfig oDepartmentTypeConfig)
        {
            try
            {
                var dbdata = _entityDataAccess.Get(oDepartmentTypeConfig.department_type_config_id);
                dbdata.company_corporate_id = dbdata.company_corporate_id;
                dbdata.display_name = oDepartmentTypeConfig.display_name;
                dbdata.is_active = oDepartmentTypeConfig.is_active;
                _entityDataAccess.Update(dbdata);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_display_name"))
                    throw new Exception("This department code(" + oDepartmentTypeConfig.display_name + ") is already exists.");

                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<DepartmentTypeConfig> GetAllDepartmentTypeConfig()
        {
            return  _entityDataAccess.GetAll();
        }

        public DepartmentTypeConfig GetById(int department_type_config_id)
        {
            return _entityDataAccess.GetById(department_type_config_id);
        }

        public IEnumerable<object> DepartmentTypeConfigCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.department_type_config_id)
                       select new { department_type_config_id = r.department_type_config_id, department_type_config_name = r.display_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int department_type_config_id)
        {
            DepartmentTypeConfig oDepartmentTypeConfig = new DepartmentTypeConfig() { department_type_config_id = department_type_config_id };
            _entityDataAccess.Remove(oDepartmentTypeConfig);
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.department_type_config_id).ToList();
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
    }
}
