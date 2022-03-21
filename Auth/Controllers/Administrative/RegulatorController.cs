using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Auth.DataAccess.EntityDataAccess;


namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RegulatorController : ControllerBase
    {
        #region Constructor
        private readonly IEntityDataAccess<Regulator> _entityDataAccess;
        private IRegulatorRepository _regulatorRepository;

        public RegulatorController(
            IEntityDataAccess<Regulator> entityDataAccess
            ,IRegulatorRepository regulatorRepository
            )
        {
            _entityDataAccess = entityDataAccess;
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
        public dynamic GetAllByRawSql()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _regulatorRepository.GetAllByRawSql();

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
            dynamic data = (dynamic)null;
            try
            {
                oRegulator.regulator_id = _entityDataAccess.GetAutoId("Administrative.Regulator", "regulator_id");
                _regulatorRepository.Add(oRegulator);
                data = _regulatorRepository.GetByIdRawSql(oRegulator.regulator_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);

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
            dynamic data = (dynamic)null;
            try
            {
                _regulatorRepository.Update(oRegulator);
                data = _regulatorRepository.GetByIdRawSql(oRegulator.regulator_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, data);

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
