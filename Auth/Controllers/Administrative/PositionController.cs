
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
    public class PositionController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IPositionRepository _positionRepository;

        public PositionController(
            IPositionRepository positionRepository
            )
        {

            _positionRepository = positionRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllPosition()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _positionRepository.GetAllPosition();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int position_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _positionRepository.GetById(position_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(Position oPosition)
        {
            var message = new CommonMessage();
            try
            {
                _positionRepository.Add(oPosition);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Position oPosition)
        {

            var message = new CommonMessage();
            try
            {
                _positionRepository.Update(oPosition);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int position_id)
        {
            var message = new CommonMessage();
            try
            {
                _positionRepository.Delete(position_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic PositionCboList()
        {            
            return _positionRepository.PositionCboList();
        }
    }
}
