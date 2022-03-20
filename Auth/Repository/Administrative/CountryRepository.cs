using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class CountryRepository:ICountryRepository
    {
        
        private readonly IEntityDataAccess<Country> _entityDataAccess;
        
        public CountryRepository(
            IEntityDataAccess<Country> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Country oCountry)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    oCountry.country_id = _entityDataAccess.GetAutoId("Administrative.Country", "country_id");
                    _entityDataAccess.Add(oCountry);
                    tran.Complete();
                }                   
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_country_code"))
                    throw new Exception("This country code(" + oCountry.country_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_country_name"))
                    throw new Exception("This country name(" + oCountry.country_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_country_short_name"))
                    throw new Exception("This country short name(" + oCountry.country_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
            finally
            {
                tran.Dispose();
            }
        }
        public void Update(Country oCountry)
        {
            try
            {
                _entityDataAccess.Update(oCountry);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_country_code"))
                    throw new Exception("This country code(" + oCountry.country_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_country_name"))
                    throw new Exception("This country name(" + oCountry.country_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_country_short_name"))
                    throw new Exception("This country short name(" + oCountry.country_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<Country> GetAllCountry()
        {
            return  _entityDataAccess.GetAll();
        }

        public Country GetById(int country_id)
        {
            return _entityDataAccess.GetById(country_id);
        }

        public IEnumerable<object> CountryCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.country_id)
                       select new { country_id = r.country_id, country_name = r.country_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int country_id)
        {
            Country country = new Country() { country_id = country_id };
            _entityDataAccess.Remove(country);           
        }
    }
}
