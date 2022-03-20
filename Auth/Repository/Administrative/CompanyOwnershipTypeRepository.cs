using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class CompanyOwnershipTypeRepository:ICompanyOwnershipTypeRepository
    {
        private readonly IEntityDataAccess<CompanyOwnershipType> _entityDataAccess;
        
        public CompanyOwnershipTypeRepository(
            IEntityDataAccess<CompanyOwnershipType> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(CompanyOwnershipType oCompanyOwnershipType)
        {
            oCompanyOwnershipType.company_ownership_type_id = GetAutoId();
            _entityDataAccess.Add(oCompanyOwnershipType);
           
        }
        public void Update(CompanyOwnershipType oCompanyOwnershipType)
        {
            _entityDataAccess.Update(oCompanyOwnershipType);

        }
        public IEnumerable<CompanyOwnershipType> GetAllCompanyOwnershipType()
        {
            return  _entityDataAccess.GetAll();
        }

        public CompanyOwnershipType GetById(int company_ownership_type_id)
        {
            return _entityDataAccess.GetById(company_ownership_type_id);
        }               
        public void Delete(int company_ownership_type_id)
        {
            CompanyOwnershipType oCompanyOwnershipType = new CompanyOwnershipType() { company_ownership_type_id = company_ownership_type_id };
            _entityDataAccess.Remove(oCompanyOwnershipType);
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.company_ownership_type_id).ToList();
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
