using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Adnan Amin
/// Dated: 14/12/2021
/// </summary>

namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class EcommercePlatformController : ControllerBase
    {
        #region Constructor
        private IEcommercePlatformRepository _ecommercePlatformRepository;

        public EcommercePlatformController(
            IEcommercePlatformRepository ecommercePlatformRepository
            )
        {

            _ecommercePlatformRepository = ecommercePlatformRepository;
        }

        #endregion
        [HttpGet]
        public dynamic GetAllEcommercePlatform()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _ecommercePlatformRepository.GetAllEcommercePlatform();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int ecommerce_platforms_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _ecommercePlatformRepository.GetById(ecommerce_platforms_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(EcommercePlatform oEcommercePlatform)
        {
            var message = new CommonMessage();
            try
            {
                _ecommercePlatformRepository.Add(oEcommercePlatform);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(EcommercePlatform oEcommercePlatform)
        {
            var message = new CommonMessage();
            try
            {
                _ecommercePlatformRepository.Update(oEcommercePlatform);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int ecommerce_platforms_id)
        {

            var message = new CommonMessage();
            try
            {
                _ecommercePlatformRepository.Delete(ecommerce_platforms_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic EcommercePlatformCboList()
        {
            return _ecommercePlatformRepository.EcommercePlatformCboList();
        }
    }
}
