using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Adnan
/// Dated: 01/02/2022
/// </summary>


namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MfsController : ControllerBase
    {
        #region Constructor
        private IMfsRepository _mfsRepository;

        public MfsController(
            IMfsRepository mfsRepository
            )
        {

            _mfsRepository = mfsRepository;
        }
        #endregion

        [HttpGet]
        public dynamic GetAllMfs()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _mfsRepository.GetAllMfs();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int mfs_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _mfsRepository.GetById(mfs_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(Mfs oMfs)
        {
            var message = new CommonMessage();
            try
            {
                _mfsRepository.Add(oMfs);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Mfs oMfs)
        {
            var message = new CommonMessage();
            try
            {
                _mfsRepository.Update(oMfs);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int mfs_id)
        {

            var message = new CommonMessage();
            try
            {
                _mfsRepository.Delete(mfs_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic MfsCboList()
        {
            return _mfsRepository.MfsCboList();
        }
    }
}
