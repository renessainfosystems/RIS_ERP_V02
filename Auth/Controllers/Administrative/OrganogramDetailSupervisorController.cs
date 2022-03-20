
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
    public class OrganogramDetailSupervisorController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IOrganogramDetailSupervisorRepository _organogramDetailSupervisorRepository;

        public OrganogramDetailSupervisorController(
            IOrganogramDetailSupervisorRepository organogramDetailSupervisorRepository
            )
        {

            _organogramDetailSupervisorRepository = organogramDetailSupervisorRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllOrganogramDetailSupervisor()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailSupervisorRepository.GetAllOrganogramDetailSupervisor();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int organogram_detail_supervisor_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailSupervisorRepository.GetById(organogram_detail_supervisor_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(OrganogramDetailSupervisor oOrganogramDetailSupervisor)
        {
           
            var message = new CommonMessage();
            try
            {
                _organogramDetailSupervisorRepository.Add(oOrganogramDetailSupervisor);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(OrganogramDetailSupervisor oOrganogramDetailSupervisor)
        {

            var message = new CommonMessage();
            try
            {
                _organogramDetailSupervisorRepository.Update(oOrganogramDetailSupervisor);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int organogram_detail_supervisor_id)
        {
            var message = new CommonMessage();
            try
            {
                _organogramDetailSupervisorRepository.Delete(organogram_detail_supervisor_id);
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
