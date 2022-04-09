using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class DepartmentRepository:IDepartmentRepository
    {
        private readonly IEntityDataAccess<Department> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public DepartmentRepository(
            IEntityDataAccess<Department> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Department oDepartment)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                    var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                    oDepartment.department_id = _entityDataAccess.GetAutoId("Administrative.Department", "department_id");
                    oDepartment.created_user_id = (long)currentUserInfoId;
                    oDepartment.company_corporate_id = (int)company_corporate_id;
                    oDepartment.created_datetime = DateTime.Now;
                    oDepartment.db_server_date_time = DateTime.Now;
                    _entityDataAccess.Add(oDepartment);
                    tran.Complete();
                }                    
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_department_code"))
                    throw new Exception("This department code(" + oDepartment.department_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_department_name"))
                    throw new Exception("This department name(" + oDepartment.department_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_department_short_name"))
                    throw new Exception("This department short name(" + oDepartment.department_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
            finally
            {
                tran.Dispose();
            }
        }
        public void Update(Department oDepartment)
        {
            try
            {                
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                oDepartment.updated_datetime = DateTime.Now;
                oDepartment.updated_user_id = (long)currentUserInfoId;
                _entityDataAccess.Update(oDepartment);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_department_code"))
                    throw new Exception("This department code(" + oDepartment.department_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_department_name"))
                    throw new Exception("This department name(" + oDepartment.department_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_department_short_name"))
                    throw new Exception("This department short name(" + oDepartment.department_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }
        public IEnumerable<Department> GetAllDepartment()
        {
            return  _entityDataAccess.GetAll();
        }

        public Department GetById(int department_id)
        {
            return _entityDataAccess.GetById(department_id);
        }
        public Department GetDepartmentByType(int department_id)
        {
            return _entityDataAccess.GetById(department_id);
        }

        public IEnumerable<dynamic> GetByIdRawSql(string sqlquery)
        {
            try
            {
                var sql =string.Format(@"select * from Administrative.Department d where 1=1 {0} ", sqlquery);                
                return _entityDataAccess.SqlRawQuery(sql).Select(r=> new { department_id = r.department_id, department_name = r.department_name }).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<object> DepartmentCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.department_id)
                       select new { department_id = r.department_id, department_name = r.department_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int department_id)
        {
            Department oDepartment = new Department() { department_id = department_id };
            _entityDataAccess.Remove(oDepartment);
        }
    }
}
