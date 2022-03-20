using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class CompanyBINRepository:ICompanyBINRepository
    {
        private readonly IEntityDataAccess<CompanyBIN> _entityDataAccess;
        
        public CompanyBINRepository(
            IEntityDataAccess<CompanyBIN> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(CompanyBIN oCompanyBIN)
        {
            _entityDataAccess.Add(oCompanyBIN);
           
        }
        public void Update(CompanyBIN oCompanyBIN)
        {
            _entityDataAccess.Update(oCompanyBIN);

        }
        public IEnumerable<CompanyBIN> GetAllCompanyBIN()
        {
            return  _entityDataAccess.GetAll();
        }

        public CompanyBIN GetById(int company_bin_id)
        {
            return _entityDataAccess.GetById(company_bin_id);
        }

        public IEnumerable<object> CompanyBINCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.company_bin_id)
                       select new { company_bin_id = r.company_bin_id, company_bin_name = r.company_bin_id };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(string company_bin_id)
        {
            CompanyBIN companyBIN = new CompanyBIN() { company_bin_id = company_bin_id };
            _entityDataAccess.Remove(companyBIN);
        }

    }
}
