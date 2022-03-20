using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class CompanyRepository : ICompanyRepository
    {
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        private readonly IEntityDataAccess<Company> _entityDataAccess;
        private readonly IEntityDataAccess<Country> _countryRepository;
        public CompanyRepository(
            IEntityDataAccess<Company> entityDataAccess
            ,IEntityDataAccess<Country> countryRepository
            )
        {
            _entityDataAccess = entityDataAccess;
            _countryRepository = countryRepository;

        }
        public void Add(Company oCompany)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                    var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                    oCompany.created_user_id = (long)currentUserInfoId;
                    oCompany.company_corporate_id = (int)company_corporate_id;
                    oCompany.created_datetime = DateTime.Now;
                    oCompany.db_server_date_time = DateTime.Now;
                    oCompany.company_id = _entityDataAccess.GetAutoId("Administrative.Company", "company_id");
                    var countryCode = _countryRepository.Get(oCompany.country_id).country_code;
                    var prefix = oCompany.company_prefix.ToUpper();
                    var autoCode = _entityDataAccess.GetAutoCode("Administrative.Company", "company_id");
                    oCompany.company_code = "" + countryCode + "-" + prefix + "" + autoCode + "";
                    _entityDataAccess.Add(oCompany);
                    tran.Complete();
                }                
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_company_code"))
                    throw new Exception("This company code(" + oCompany.company_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_company_name"))
                    throw new Exception("This company name(" + oCompany.company_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_company_short_name"))
                    throw new Exception("This company short name(" + oCompany.company_short_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_name_in_local_language"))
                    throw new Exception("This company local  language(" + oCompany.name_in_local_language + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
            finally
            {
                tran.Dispose();
            }
        }
        public void Update(Company oCompany)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];                
                oCompany.updated_datetime = DateTime.Now;
                oCompany.created_user_id = oCompany.created_user_id;
                oCompany.updated_user_id = (long)currentUserInfoId;
                _entityDataAccess.Update(oCompany);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_company_code"))
                    throw new Exception("This company code(" + oCompany.company_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_company_name"))
                    throw new Exception("This company name(" + oCompany.company_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_company_short_name"))
                    throw new Exception("This company short name(" + oCompany.company_short_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_name_in_local_language"))
                    throw new Exception("This company short name(" + oCompany.name_in_local_language + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }
        public IEnumerable<Company> GetAllCompany()
        {
            return  _entityDataAccess.GetAll();
        }

        public Company GetById(int company_id)
        {
            return _entityDataAccess.GetById(company_id);
        }

        public IEnumerable<object> CompanyCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.company_id)
                       select new { company_id = r.company_id, company_name = r.company_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int company_id)
        {
            Company company = new Company() { company_id = company_id };
            _entityDataAccess.Remove(company);
        }

    }
}
