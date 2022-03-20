
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
    public class EducationController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IEducationRepository _educationRepository;

        public EducationController(
            IEducationRepository educationRepository
            )
        {

            _educationRepository = educationRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllEducation()
        {            
            dynamic data = (dynamic)null;
            try
            {
                data = _educationRepository.GetAllEducation();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int education_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _educationRepository.GetById(education_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(Education oEducation)
        {
           
            var message = new CommonMessage();
            try
            {
                _educationRepository.Add(oEducation);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Education oEducation)
        {

            var message = new CommonMessage();
            try
            {
                _educationRepository.Update(oEducation);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int education_id)
        {
           
            var message = new CommonMessage();
            try
            {
                _educationRepository.Delete(education_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic EducationCboList()
        {            
            return _educationRepository.EducationCboList();
            
        }
    }
}
