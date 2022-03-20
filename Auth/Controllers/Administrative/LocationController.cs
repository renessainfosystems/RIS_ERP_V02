
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
    public class LocationController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ILocationRepository _locationRepository;

        public LocationController(
            ILocationRepository locationRepository
            )
        {

            _locationRepository = locationRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllLocation()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _locationRepository.GetAllLocation();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int location_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _locationRepository.GetById(location_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create([FromForm] Location oLocation)
        {
           
            var message = new CommonMessage();
            try
            {
                _locationRepository.Add(oLocation);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update([FromForm] Location oLocation)
        {

            var message = new CommonMessage();
            try
            {
                _locationRepository.Update(oLocation);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete( int location_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _locationRepository.Delete(location_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic LocationCboList()
        {            
            return _locationRepository.LocationCboList();
        }              

    }
}
