using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{

    public class OwnershipTypeRepository : IOwnershipTypeRepository
    {
        
        private readonly IEntityDataAccess<OwnershipType> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public OwnershipTypeRepository(
            IEntityDataAccess<OwnershipType> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;

        }

        public void Add(OwnershipType oOwnershipType)
        {
            try
            {
                var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                oOwnershipType.ownership_type_id = _entityDataAccess.GetAutoId("Administrative.Ownership_Type", "ownership_type_id");
                oOwnershipType.company_corporate_id = (int)company_corporate_id;
                _entityDataAccess.Add(oOwnershipType);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_ownership_type_name"))
                    throw new Exception("This ownership type name(" + oOwnershipType.ownership_type_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(OwnershipType oOwnershipType)
        {
            try
            {                
                _entityDataAccess.Update(oOwnershipType);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_ownership_type_name"))
                    throw new Exception("This ownership type name(" + oOwnershipType.ownership_type_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<OwnershipType> GetAllOwnershipType()
        {
            return _entityDataAccess.GetAll();
        }

        public OwnershipType GetById(int ownership_type_id)
        {
            return _entityDataAccess.GetById(ownership_type_id);
        }

        public IEnumerable<object> OwnershipTypeCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.ownership_type_id)
                             select new { ownership_type_id = r.ownership_type_id, ownership_type_name = r.ownership_type_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int ownership_type_id)
        {
            OwnershipType oOwnershipType = new OwnershipType() { ownership_type_id = ownership_type_id };
            _entityDataAccess.Remove(oOwnershipType);
        }
        
    }
}
