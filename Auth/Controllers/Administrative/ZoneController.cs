
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
    public class ZoneController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IZoneRepository _zoneRepository;

        public ZoneController(
            IZoneRepository zoneRepository
            )
        {

            _zoneRepository = zoneRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllZone()
        {
           
            dynamic data = (dynamic)null;
            try
            {
                data = _zoneRepository.GetAllZone();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int zone_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _zoneRepository.GetById(zone_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(Zone oZone)
        {
            var message = new CommonMessage();
            try
            {
                _zoneRepository.Add(oZone);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Zone oZone)
        {
            var message = new CommonMessage();
            try
            {
                _zoneRepository.Update(oZone);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int zone_id)
        {
           
            var message = new CommonMessage();
            try
            {
                _zoneRepository.Delete(zone_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic ZoneCboList()
        {
            return _zoneRepository.ZoneCboList();
        }

        [HttpGet]
        public dynamic ZoneCboListByCountryId( int country_id )
        {            
            dynamic data = (dynamic)null;
            try
            {
                data = _zoneRepository.ZoneCboListByCountryId(country_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }
    }
}
