
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
    public class IndustrySubSectorController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IIndustrySubSectorRepository _industrySubSectorRepository;

        public IndustrySubSectorController(
            IIndustrySubSectorRepository industrySubSectorRepository
            )
        {

            _industrySubSectorRepository = industrySubSectorRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllIndustrySubSector()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _industrySubSectorRepository.GetAllIndustrySubSector();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int industry_sub_sector_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _industrySubSectorRepository.GetById(industry_sub_sector_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(IndustrySubSector oIndustrySubSector)
        {
            var message = new CommonMessage();
            try
            {
                _industrySubSectorRepository.Add(oIndustrySubSector);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(IndustrySubSector oIndustrySubSector)
        {
            var message = new CommonMessage();
            try
            {
                _industrySubSectorRepository.Update(oIndustrySubSector);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int industry_sub_sector_id)
        {            
            var message = new CommonMessage();
            try
            {
                _industrySubSectorRepository.Delete(industry_sub_sector_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic IndustrySubSectorCboList()
        {            
            return _industrySubSectorRepository.IndustrySubSectorCboList();
        }

        
        [HttpGet]
        public dynamic IndustrySubSectorCboListBySectorId(int sector_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _industrySubSectorRepository.IndustrySubSectorCboListBySectorId(sector_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

    }
}
