using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RegulatorController : ControllerBase
    {
        #region Constructor
        private IRegulatorRepository _regulatorRepository;

        public RegulatorController(
            IRegulatorRepository regulatorRepository
            )
        {

            _regulatorRepository = regulatorRepository;
        }
        #endregion

        [HttpGet]
        public dynamic GetAllRegulator()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _regulatorRepository.GetAllRegulator();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int regulator_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _regulatorRepository.GetById(regulator_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(Regulator oRegulator)
        {
            var message = new CommonMessage();
            try
            {
                _regulatorRepository.Add(oRegulator);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Regulator oRegulator)
        {
            var message = new CommonMessage();
            try
            {
                _regulatorRepository.Update(oRegulator);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int regulator_id)
        {

            var message = new CommonMessage();
            try
            {
                _regulatorRepository.Delete(regulator_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }


        [HttpGet]
        public dynamic RegulatorCboList()
        {
            return _regulatorRepository.RegulatorCboList();
        }
    }
}
