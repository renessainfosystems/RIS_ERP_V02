
using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Jahid
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CurrencyController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICurrencyRepository _currencyRepository;

        public CurrencyController(
            ICurrencyRepository currencyRepository
            )
        {
            _currencyRepository = currencyRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCurrency()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _currencyRepository.GetAllCurrency();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int currency_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _currencyRepository.GetById(currency_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(Currency oCurrency)
        {
            
            var message = new CommonMessage();
            try
            {
                _currencyRepository.Add(oCurrency);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Currency oCurrency)
        {

            var message = new CommonMessage();
            try
            {
                _currencyRepository.Update(oCurrency);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int currency_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _currencyRepository.Delete(currency_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic CurrencyCboList()
        {            
            return _currencyRepository.CurrencyCboList();
        }
    }
}
