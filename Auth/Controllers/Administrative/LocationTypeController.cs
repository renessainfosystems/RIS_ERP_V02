
using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Adnan
/// Dated: 07/02/2022
/// </summary>
/// 
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class LocationTypeController : ControllerBase
    {
        //Intialize
        #region Constructor
        private ILocationTypeRepository _locationTypeRepository;

        public LocationTypeController(
            ILocationTypeRepository locationTypeRepository
            )
        {
            _locationTypeRepository = locationTypeRepository;
        }

        #endregion

        [HttpGet]
        public dynamic GetAllLocationType()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _locationTypeRepository.GetAllLocationType();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic LocationTypeCboList()
        {
            return _locationTypeRepository.LocationTypeCboList();
        }
    }
}
