
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
    public class OrganogramDetailEducationController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IOrganogramDetailEducationRepository _organogramDetailEducationRepository;

        public OrganogramDetailEducationController(
            IOrganogramDetailEducationRepository organogramDetailEducationRepository
            )
        {

            _organogramDetailEducationRepository = organogramDetailEducationRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllOrganogramDetailEducation()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailEducationRepository.GetAllOrganogramDetailEducation();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;

        }

        [HttpGet]
        public dynamic GetById(int organogram_detail_education_id)
        {
           
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailEducationRepository.GetById(organogram_detail_education_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(OrganogramDetailEducation oOrganogramDetailEducation)
        {
            var message = new CommonMessage();
            try
            {
                _organogramDetailEducationRepository.Add(oOrganogramDetailEducation);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(OrganogramDetailEducation oOrganogramDetailEducation)
        {

            var message = new CommonMessage();
            try
            {
                _organogramDetailEducationRepository.Update(oOrganogramDetailEducation);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int organogram_detail_education_id)
        {            
            var message = new CommonMessage();
            try
            {
                _organogramDetailEducationRepository.Delete(organogram_detail_education_id);
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
