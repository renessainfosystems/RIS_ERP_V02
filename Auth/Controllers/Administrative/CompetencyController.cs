
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
    public class CompetencyController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICompetencyRepository _competencyRepository;

        public CompetencyController(
            ICompetencyRepository competencyRepository
            )
        {

            _competencyRepository = competencyRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCompetency()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _competencyRepository.GetAllCompetency();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int competency_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _competencyRepository.GetById(competency_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(Competency oCompetency)
        {
            
            var message = new CommonMessage();
            try
            {                
                _competencyRepository.Add(oCompetency);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Competency oCompetency)
        {

            var message = new CommonMessage();
            try
            {

                _competencyRepository.Update(oCompetency);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int competency_id)
        {
           
            var message = new CommonMessage();
            try
            {
                _competencyRepository.Delete(competency_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic CompetencyCboList()
        {            
            return _competencyRepository.CompetencyCboList();
            
        }
    }
}
