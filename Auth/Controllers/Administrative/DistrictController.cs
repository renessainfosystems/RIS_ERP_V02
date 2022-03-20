
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
    public class DistrictController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IDistrictRepository _districtRepository;

        public DistrictController(
            IDistrictRepository districtRepository
            )
        {

            _districtRepository = districtRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllDistrict()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _districtRepository.GetAllDistrict();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int district_id)
        {
           
            dynamic data = (dynamic)null;
            try
            {
                data = _districtRepository.GetById(district_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(District oDistrict)

        {
            var message = new CommonMessage();
            try
            {
                _districtRepository.Add(oDistrict);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(District oDistrict)
        {

            var message = new CommonMessage();
            try
            {
                _districtRepository.Update(oDistrict);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int district_id)
        {
            var message = new CommonMessage();
            try
            {
                _districtRepository.Delete(district_id); 
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic DistrictCboList()
        {
            return _districtRepository.DistrictCboList();
        }

        [HttpGet]
        public dynamic DistrictCboListByDivisionId(int division_id)
        {
            return _districtRepository.DistrictCboListByDivisionId(division_id);
        }

    }
}
