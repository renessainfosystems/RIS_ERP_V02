
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
    public class OrganogramDetailController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IOrganogramDetailRepository _organogramDetailRepository;

        public OrganogramDetailController(
            IOrganogramDetailRepository organogramDetailRepository
            )
        {

            _organogramDetailRepository = organogramDetailRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllOrganogramDetail()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailRepository.GetAllOrganogramDetail();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int organogram_detail_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailRepository.GetById(organogram_detail_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(OrganogramDetail oOrganogramDetail)
        {

            var message = new CommonMessage();
            try
            {
                _organogramDetailRepository.Add(oOrganogramDetail);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(OrganogramDetail oOrganogramDetail)
        {


            var message = new CommonMessage();
            try
            {
                _organogramDetailRepository.Update(oOrganogramDetail);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int organogram_detail_id)
        {

            var message = new CommonMessage();
            try
            {
                _organogramDetailRepository.Delete(organogram_detail_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;

        }
    }
}
