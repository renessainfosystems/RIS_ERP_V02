
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
    public class LocationBINController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ILocationBINRepository _locationBINRepository;

        public LocationBINController(
            ILocationBINRepository locationBINRepository
            )
        {

            _locationBINRepository = locationBINRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllLocationBIN()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _locationBINRepository.GetAllLocationBIN();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int location_bin_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _locationBINRepository.GetById(location_bin_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(LocationBIN oLocationBIN)
        {
           
            var message = new CommonMessage();
            try
            {
                _locationBINRepository.Add(oLocationBIN);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(LocationBIN oLocationBIN)
        {

            var message = new CommonMessage();
            try
            {
                _locationBINRepository.Update(oLocationBIN);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(string location_bin_id)
        {
           
            var message = new CommonMessage();
            try
            {
                _locationBINRepository.Delete(location_bin_id); 
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic LocationBINCboList()
        {            
            return _locationBINRepository.LocationBINCboList();
        }

    }
}
