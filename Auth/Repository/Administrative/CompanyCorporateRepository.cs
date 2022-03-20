using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Auth.Utility.Accounting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class CompanyCorporateRepository : ICompanyCorporateRepository
    {
        private ApplicationDBContext _dbSet;
        private readonly IEntityDataAccess<CompanyCorporate> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public CompanyCorporateRepository(
             IEntityDataAccess<CompanyCorporate> entityDataAccess
            )
        {
            _entityDataAccess = entityDataAccess;
        }

        public void Add(CompanyCorporate oCompanyCorporate)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                    oCompanyCorporate.company_corporate_id = _entityDataAccess.GetAutoId("Administrative.Company_Corporate", "company_corporate_id");
                    oCompanyCorporate.created_user_id = (long)currentUserInfoId;
                    oCompanyCorporate.created_datetime = DateTime.Now;
                    oCompanyCorporate.db_server_date_time = DateTime.Now;
                    _entityDataAccess.Add(oCompanyCorporate);
                    tran.Complete();
                }
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_company_corporate_name"))
                    throw new Exception("This company corporate name(" + oCompanyCorporate.company_corporate_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_company_corporate_short_name"))
                    throw new Exception("This company corporate short name(" + oCompanyCorporate.company_corporate_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
            finally
            {
                tran.Dispose();
            }

        }
        public void Update(CompanyCorporate oCompanyCorporate)
        {
            try
            {                
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];                
                oCompanyCorporate.updated_datetime = DateTime.Now;
                oCompanyCorporate.updated_user_id = (long)currentUserInfoId;
                _entityDataAccess.Update(oCompanyCorporate);
            }
            catch (Exception ex)
            {

                if (ex.InnerException.Message.Contains("UC_company_corporate_name"))
                    throw new Exception("This company corporate name(" + oCompanyCorporate.company_corporate_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_company_corporate_short_name"))
                    throw new Exception("This company corporate short name(" + oCompanyCorporate.company_corporate_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<CompanyCorporate> GetAllCompanyCorporate()
        {
            return _entityDataAccess.GetAll();
        }

        public CompanyCorporate GetById(int company_corporate_id)
        {
            return _entityDataAccess.GetById(company_corporate_id);
        }

        public IEnumerable<object> CompanyCorporateCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.company_corporate_id)
                             select new { company_corporate_id = r.company_corporate_id, company_corporate_name = r.company_corporate_name };
                return result;
            }
            catch
            {
                return null;
            }
        }
        public void Delete(int company_corporate_id)
        {
            CompanyCorporate oCompanyCorporate = new CompanyCorporate() { company_corporate_id = company_corporate_id };
            _entityDataAccess.Remove(oCompanyCorporate);
        }        

    }
}
