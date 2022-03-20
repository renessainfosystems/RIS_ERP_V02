
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
    public class DivisionController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IDivisionRepository _divisionRepository;

        public DivisionController(
            IDivisionRepository divisionRepository
            )
        {

            _divisionRepository = divisionRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllDivision()
        {
           
            dynamic data = (dynamic)null;
            try
            {
                data = _divisionRepository.GetAllDivision();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int division_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _divisionRepository.GetById(division_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(Division oDivision)
        {
            var message = new CommonMessage();
            try
            {
                _divisionRepository.Add(oDivision);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Division oDivision)
        {
            var message = new CommonMessage();
            try
            {
                _divisionRepository.Update(oDivision);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int division_id)
        {
           
            var message = new CommonMessage();
            try
            {
                _divisionRepository.Delete(division_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic DivisionCboList()
        {
            return _divisionRepository.DivisionCboList();
        }

        [HttpGet]
        public dynamic DivisionCboListByCountryId( int country_id )
        {            
            dynamic data = (dynamic)null;
            try
            {
                data = _divisionRepository.DivisionCboListByCountryId(country_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }
    }
}
