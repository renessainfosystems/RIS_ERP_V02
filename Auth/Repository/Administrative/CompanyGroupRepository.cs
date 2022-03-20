using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class CompanyGroupRepository : ICompanyGroupRepository
    {
        private readonly IEntityDataAccess<CompanyGroup> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public CompanyGroupRepository(
            IEntityDataAccess<CompanyGroup> entityDataAccess
            )
        {
            _entityDataAccess = entityDataAccess;

        }
        public void Add(CompanyGroup oCompanyGroup)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                    var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                    oCompanyGroup.company_group_id = _entityDataAccess.GetAutoId("Administrative.Company_Group", "company_group_id");
                    oCompanyGroup.created_user_id = (long)currentUserInfoId;
                    oCompanyGroup.company_corporate_id = (int)company_corporate_id;
                    oCompanyGroup.created_datetime = DateTime.Now;
                    oCompanyGroup.db_server_date_time = DateTime.Now;
                    _entityDataAccess.Add(oCompanyGroup);
                    tran.Complete();
                }
               
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_group_name"))
                    throw new Exception("This company group name(" + oCompanyGroup.group_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_group_short_name"))
                    throw new Exception("This company group short name(" + oCompanyGroup.group_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
            finally
            {
                tran.Dispose();
            }

        }
        public void Update(CompanyGroup oCompanyGroup)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];                
                oCompanyGroup.updated_datetime = DateTime.Now;
                oCompanyGroup.updated_user_id = (long)currentUserInfoId;
                _entityDataAccess.Update(oCompanyGroup);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_group_name"))
                    throw new Exception("This company group name(" + oCompanyGroup.group_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_group_short_name"))
                    throw new Exception("This company group short name(" + oCompanyGroup.group_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }
        public IEnumerable<CompanyGroup> GetAllCompanyGroup()
        {
            return _entityDataAccess.GetAll();
        }

        public CompanyGroup GetById(int company_group_id)
        {
            return _entityDataAccess.GetById(company_group_id);
        }

        public IEnumerable<object> CompanyGroupCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.company_group_id)
                             select new { company_group_id = r.company_group_id, company_group_name = r.group_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int company_group_id)
        {
            CompanyGroup oCompanyGroup = new CompanyGroup() { company_group_id = company_group_id };
            _entityDataAccess.Remove(oCompanyGroup);
        }
        
    }
}
