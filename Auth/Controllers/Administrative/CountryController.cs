
using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Service;
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
    public class CountryController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICountryRepository _countryRepository;

        public CountryController(
            ICountryRepository countryRepository
            )
        {
            _countryRepository = countryRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCountry()
        {
           
            dynamic data = (dynamic)null;
            try
            {
                data = _countryRepository.GetAllCountry();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int country_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _countryRepository.GetById(country_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(Country oCountry)
        {
            
            var message = new CommonMessage();
            try
            {
                _countryRepository.Add(oCountry);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Country oCountry)
        {           
            var message = new CommonMessage();
            try
            {
                _countryRepository.Update(oCountry);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int country_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _countryRepository.Delete(country_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic CountryCboList()
        {            
            return _countryRepository.CountryCboList();
        }
    }
}
