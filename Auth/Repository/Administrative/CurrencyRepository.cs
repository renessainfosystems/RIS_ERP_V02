using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Auth.Repository.Administrative
{
    public class CurrencyRepository:ICurrencyRepository
    {
        private readonly IEntityDataAccess<Currency> _entityDataAccess;
        
        public CurrencyRepository(
            IEntityDataAccess<Currency> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Currency oCurrency)
        {
            TransactionScope tran = new TransactionScope();
            try
            {
                using (tran)
                {
                    oCurrency.currency_id = _entityDataAccess.GetAutoId("Administrative.Currency", "currency_id");
                    _entityDataAccess.Add(oCurrency);
                    tran.Complete();
                }                  
               
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_currency_name"))
                    throw new Exception("This currency name(" + oCurrency.currency_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_symbol"))
                    throw new Exception("This symbol(" + oCurrency.symbol + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
            finally
            {
                tran.Dispose();
            }
        }
        public void Update(Currency oCurrency)
        {
            try
            {
                _entityDataAccess.Update(oCurrency);
            }
            catch (Exception ex)
            {

                if (ex.InnerException.Message.Contains("UC_currency_name"))
                    throw new Exception("This currency name(" + oCurrency.currency_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_symbol"))
                    throw new Exception("This symbol(" + oCurrency.symbol + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<Currency> GetAllCurrency()
        {
            return  _entityDataAccess.GetAll();
        }

        public Currency GetById(int position_id)
        {
            return _entityDataAccess.GetById(position_id);
        }

        public IEnumerable<object> CurrencyCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.currency_id)
                       select new { currency_id = r.currency_id, currency_name = r.currency_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }
        public void Delete(int currency_id)
        {
            Currency oCurrency = new Currency() { currency_id = currency_id };
            _entityDataAccess.Remove(oCurrency);
        }
    }
}
