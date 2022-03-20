
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
    public class OwnershipTypeController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IOwnershipTypeRepository _ownershipTypeRepository;

        public OwnershipTypeController(
            IOwnershipTypeRepository ownershipTypeRepository
            )
        {

            _ownershipTypeRepository = ownershipTypeRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllOwnershipType()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _ownershipTypeRepository.GetAllOwnershipType();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int ownership_type_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _ownershipTypeRepository.GetById(ownership_type_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(OwnershipType oOwnershipType)
        {
            var message = new CommonMessage();
            try
            {
                _ownershipTypeRepository.Add(oOwnershipType);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(OwnershipType oOwnershipType)
        {
            var message = new CommonMessage();
            try
            {
                _ownershipTypeRepository.Update(oOwnershipType);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int ownership_type_id)
        {
            var message = new CommonMessage();
            try
            {
                _ownershipTypeRepository.Delete(ownership_type_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic OwnershipTypeCboList()
        {            
            return _ownershipTypeRepository.OwnershipTypeCboList();
        }
    }
}
