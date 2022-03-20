
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICountryRepository
    {
        void Add(Country oCountry);
        void Update(Country oCountry);
        IEnumerable<Country> GetAllCountry();
        Country GetById(int country_id);
        IEnumerable<object> CountryCboList();
        void Delete(int country_id);

    }
}
