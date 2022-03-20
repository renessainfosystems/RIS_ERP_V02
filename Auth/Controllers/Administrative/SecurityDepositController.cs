
using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Adnan
/// Dated: 16/02/2022
/// </summary>

namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SecurityDepositController : Controller
    {

        //Intialize
        #region Constructor
        private ISecurityDepositRepository _securityDepositRepository;

        public SecurityDepositController(ISecurityDepositRepository securityDepositRepository)
        {
            _securityDepositRepository = securityDepositRepository;
        }

        #endregion

        [HttpGet]
        public dynamic GetAllSecurityDeposit()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _securityDepositRepository.GetAllSecurityDeposit();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int security_deposit_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _securityDepositRepository.GetById(security_deposit_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(SecurityDeposit oSecurityDeposit)
        {

            var message = new CommonMessage();
            try
            {
                _securityDepositRepository.Add(oSecurityDeposit);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(SecurityDeposit oSecurityDeposit)
        {

            var message = new CommonMessage();
            try
            {
                _securityDepositRepository.Update(oSecurityDeposit);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int security_deposit_id)
        {

            var message = new CommonMessage();
            try
            {
                _securityDepositRepository.Delete(security_deposit_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic SecurityDepositCboList()
        {
            return _securityDepositRepository.SecurityDepositCboList();
        }
    }
}
