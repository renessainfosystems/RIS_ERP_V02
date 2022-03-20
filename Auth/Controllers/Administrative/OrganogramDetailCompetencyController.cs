
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
    public class OrganogramDetailCompetencyController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IOrganogramDetailCompetencyRepository _organogramDetailCompetencyRepository;

        public OrganogramDetailCompetencyController(
            IOrganogramDetailCompetencyRepository organogramDetailCompetencyRepository
            )
        {

            _organogramDetailCompetencyRepository = organogramDetailCompetencyRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllOrganogramDetailCompetency()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailCompetencyRepository.GetAllOrganogramDetailCompetency();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int organogram_detail_competency_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailCompetencyRepository.GetById(organogram_detail_competency_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(OrganogramDetailCompetency oOrganogramDetailCompetency)
        {
           
            var message = new CommonMessage();
            try
            {
                _organogramDetailCompetencyRepository.Add(oOrganogramDetailCompetency);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(OrganogramDetailCompetency oOrganogramDetailCompetency)
        {

            var message = new CommonMessage();
            try
            {
                _organogramDetailCompetencyRepository.Update(oOrganogramDetailCompetency);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int organogram_detail_competency_id)
        {
           
            var message = new CommonMessage();
            try
            {
                _organogramDetailCompetencyRepository.Delete(organogram_detail_competency_id);
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
