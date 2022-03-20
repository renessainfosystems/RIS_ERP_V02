
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
    public class KeySkillController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IKeySkillRepository _keySkillRepository;

        public KeySkillController(
            IKeySkillRepository keySkillRepository
            )
        {

            _keySkillRepository = keySkillRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllKeySkill()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _keySkillRepository.GetAllKeySkill();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int key_skill_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _keySkillRepository.GetById(key_skill_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(KeySkill oKeySkill)
        {
            var message = new CommonMessage();
            try
            {
                _keySkillRepository.Add(oKeySkill);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(KeySkill oKeySkill)
        {

            var message = new CommonMessage();
            try
            {
                _keySkillRepository.Update(oKeySkill);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int key_skill_id)
        {            
            var message = new CommonMessage();
            try
            {
                _keySkillRepository.Delete(key_skill_id); 
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic KeySkillCboList()
        {            
            return _keySkillRepository.KeySkillCboList();
        }
    }
}
