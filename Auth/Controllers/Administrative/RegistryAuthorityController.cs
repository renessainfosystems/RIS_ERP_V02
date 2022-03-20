using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;


/// <summary>
/// Created By Adnan
/// Dated: 19/12/2021
/// </summary>

namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RegistryAuthorityController : ControllerBase
    {

        #region Constructor
        private IRegistryAuthorityRepository _registryAuthorityRepository;

        public RegistryAuthorityController(
            IRegistryAuthorityRepository registryAuthorityRepository
            )
        {

            _registryAuthorityRepository = registryAuthorityRepository;
        }
        #endregion

        [HttpGet]
        public dynamic GetAllRegistryAuthority()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _registryAuthorityRepository.GetAllRegistryAuthority();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int registry_authority_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _registryAuthorityRepository.GetById(registry_authority_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(RegistryAuthority oRegistryAuthority)
        {
            var message = new CommonMessage();
            try
            {
                _registryAuthorityRepository.Add(oRegistryAuthority);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(RegistryAuthority oRegistryAuthority)
        {
            var message = new CommonMessage();
            try
            {
                _registryAuthorityRepository.Update(oRegistryAuthority);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int registry_authority_id)
        {

            var message = new CommonMessage();
            try
            {
                _registryAuthorityRepository.Delete(registry_authority_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }


        [HttpGet]
        public dynamic RegistryAuthorityCboList()
        {
            return _registryAuthorityRepository.RegistryAuthorityCboList();
        }
    }
}
