
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICurrencyRepository
    {
        void Add(Currency oCurrency);
        void Update(Currency oCurrency);
        IEnumerable<Currency> GetAllCurrency();
        Currency GetById(int currency_id);
        IEnumerable<object> CurrencyCboList();
        void Delete(int currency_id);

    }
}
