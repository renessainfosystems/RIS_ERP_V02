
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
    public class IndustrySectorController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IIndustrySectorRepository _industrySectorRepository;

        public IndustrySectorController(
            IIndustrySectorRepository industrySectorRepository
            )
        {

            _industrySectorRepository = industrySectorRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllIndustrySector()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _industrySectorRepository.GetAllIndustrySector();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int industry_sector_id)
        {            
            dynamic data = (dynamic)null;
            try
            {
                data = _industrySectorRepository.GetById(industry_sector_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(IndustrySector oIndustrySector)
        {
            var message = new CommonMessage();
            try
            {
                _industrySectorRepository.Add(oIndustrySector);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(IndustrySector oIndustrySector)
        {
            var message = new CommonMessage();
            try
            {
                _industrySectorRepository.Update(oIndustrySector);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int industry_sector_id)
        {
            var message = new CommonMessage();
            try
            {
                _industrySectorRepository.Delete(industry_sector_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic IndustrySectorCboList()
        {            
            return _industrySectorRepository.IndustrySectorCboList();
        }
    }
}
