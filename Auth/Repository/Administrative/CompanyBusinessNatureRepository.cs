using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class CompanyBusinessNatureRepository:ICompanyBusinessNatureRepository
    {
        
        protected readonly ApplicationDBContext _dbSet;
        private readonly IEntityDataAccess<CompanyBusinessNature> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public CompanyBusinessNatureRepository(
            ApplicationDBContext dbSet
            ,IEntityDataAccess<CompanyBusinessNature> entityDataAccess           
            )
        {
            _dbSet = dbSet;
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(CompanyBusinessNature oCompanyBusinessNature)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                    var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
                    oCompanyBusinessNature.company_business_nature_id = _entityDataAccess.GetAutoId("Administrative.Company_Business_Nature", "company_business_nature_id");
                    oCompanyBusinessNature.created_user_id = (long)currentUserInfoId;
                    oCompanyBusinessNature.company_id = (int)company_id;
                    oCompanyBusinessNature.created_datetime = DateTime.Now;
                    oCompanyBusinessNature.db_server_date_time = DateTime.Now;
                    _entityDataAccess.Add(oCompanyBusinessNature);
                    tran.Complete();
                } 
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                tran.Dispose();
            }
        }
        public void Update(CompanyBusinessNature oCompanyBusinessNature)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];             
                oCompanyBusinessNature.updated_datetime = DateTime.Now;
                oCompanyBusinessNature.updated_user_id = (long)currentUserInfoId;
                _entityDataAccess.Update(oCompanyBusinessNature);
            }
            catch (Exception)
            {
                throw;
            }

        }
        public IEnumerable<CompanyBusinessNature> GetAllCompanyBusinessNature()
        {
            return  _entityDataAccess.GetAll();            
        }

        public CompanyBusinessNature GetById(int company_business_nature_id)
        {
            return _entityDataAccess.GetById(company_business_nature_id);
        }               
        public void Delete(int company_business_nature_id)
        {
            CompanyBusinessNature oCompanyBusinessNature = new CompanyBusinessNature() { company_business_nature_id = company_business_nature_id };
            _entityDataAccess.Remove(oCompanyBusinessNature);
        }

        public IEnumerable<CompanyBusinessNature> GetAllByRawSql()
        {
            try
            {
                var result = _dbSet.CompanyBusinessNatures
                      .FromSqlRaw("select * from [Administrative].[Company_Business_Nature]")
                      .ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
