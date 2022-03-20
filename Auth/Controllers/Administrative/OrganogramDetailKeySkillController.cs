
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
    public class OrganogramDetailKeySkillController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IOrganogramDetailKeySkillRepository _organogramDetailKeySkillRepository;

        public OrganogramDetailKeySkillController(
            IOrganogramDetailKeySkillRepository organogramDetailKeySkillRepository
            )
        {

            _organogramDetailKeySkillRepository = organogramDetailKeySkillRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllOrganogramDetailKeySkill()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailKeySkillRepository.GetAllOrganogramDetailKeySkill();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int organogram_detail_key_skill_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _organogramDetailKeySkillRepository.GetById(organogram_detail_key_skill_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(OrganogramDetailKeySkill oOrganogramDetailKeySkill)
        {
            
            var message = new CommonMessage();
            try
            {
                _organogramDetailKeySkillRepository.Add(oOrganogramDetailKeySkill);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(OrganogramDetailKeySkill oOrganogramDetailKeySkill)
        {

            var message = new CommonMessage();
            try
            {
                _organogramDetailKeySkillRepository.Update(oOrganogramDetailKeySkill);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int organogram_detail_key_skill_id)
        {
            var message = new CommonMessage();
            try
            {
                _organogramDetailKeySkillRepository.Delete(organogram_detail_key_skill_id);
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
