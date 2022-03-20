using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class DesignationRepository:IDesignationRepository
    {
        private readonly IEntityDataAccess<Designation> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public DesignationRepository(
            IEntityDataAccess<Designation> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Designation oDesignation)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                    var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                    oDesignation.designation_id = _entityDataAccess.GetAutoId("Administrative.Designation", "designation_id");
                    oDesignation.created_user_id = (long)currentUserInfoId;
                    oDesignation.company_corporate_id = (int)company_corporate_id;
                    oDesignation.created_datetime = DateTime.Now;
                    oDesignation.db_server_date_time = DateTime.Now;
                    _entityDataAccess.Add(oDesignation);
                    tran.Complete();
                }

            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_designation_code"))
                    throw new Exception("This designation code(" + oDesignation.designation_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_designation_name"))
                    throw new Exception("This designation name(" + oDesignation.designation_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_designation_short_name"))
                    throw new Exception("This designation short name(" + oDesignation.designation_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
            finally
            {
                tran.Dispose();
            }
        }
        public void Update(Designation oDesignation)
        {
            try
            {                
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                oDesignation.updated_datetime = DateTime.Now;
                oDesignation.updated_user_id = (long)currentUserInfoId;
                _entityDataAccess.Update(oDesignation);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_designation_code"))
                    throw new Exception("This designation code(" + oDesignation.designation_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_designation_name"))
                    throw new Exception("This designation name(" + oDesignation.designation_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_designation_short_name"))
                    throw new Exception("This designation short name(" + oDesignation.designation_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<Designation> GetAllDesignation()
        {
            return  _entityDataAccess.GetAll();
        }

        public Designation GetById(int designation_id)
        {
            return _entityDataAccess.GetById(designation_id);
        }

        public IEnumerable<object> DesignationCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.designation_id)
                       select new { designation_id = r.designation_id, designation_name = r.designation_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int designation_id)
        {
            Designation oDesignation = new Designation() { designation_id = designation_id };
            _entityDataAccess.Remove(oDesignation);
        }

    }
}
