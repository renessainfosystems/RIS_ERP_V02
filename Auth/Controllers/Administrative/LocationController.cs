
using Auth.DataAccess.EntityDataAccess;
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
        private readonly IEntityDataAccess<Location> _entityDataAccess;
        private ILocationRepository _locationRepository;

        public LocationController(
            IEntityDataAccess<Location> entityDataAccess
            ,ILocationRepository locationRepository
            )
        {
            _entityDataAccess = entityDataAccess;
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
            dynamic data = (dynamic)null;
            try
            {
                oLocation.location_id = _entityDataAccess.GetAutoId("Administrative.Location", "location_id");
                _locationRepository.Add(oLocation);
                data = _locationRepository.GetById(oLocation.location_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
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
            dynamic data = (dynamic)null;
            try
            {
                _locationRepository.Update(oLocation);
                data = _locationRepository.GetById(oLocation.location_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, data);
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
