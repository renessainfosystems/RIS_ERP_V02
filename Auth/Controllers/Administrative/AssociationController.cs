using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Adnan Amin
/// Dated: 14/12/2021
/// </summary>
/// 


namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AssociationController : ControllerBase
    {

        #region Constructor
        private readonly IEntityDataAccess<Association> _entityDataAccess;
        private IAssociationRepository _associationRepository;

        public AssociationController(IAssociationRepository associationRepository, IEntityDataAccess<Association> entityDataAccess)
        {

            _associationRepository = associationRepository;
            _entityDataAccess = entityDataAccess;
        }

        #endregion  
        [HttpGet]
        public dynamic GetAllAssociation()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _associationRepository.GetAllAssociation();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetAllByRawSql()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _associationRepository.GetAllByRawSql();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int association_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _associationRepository.GetById(association_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(Association oAssociation)
        {
            var message = new CommonMessage();
            dynamic data = (dynamic)null;
            try
            {
                oAssociation.association_id= _entityDataAccess.GetAutoId("Administrative.Association", "association_id");
                _associationRepository.Add(oAssociation);
                data = _entityDataAccess.GetById(oAssociation.association_id);

                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage,data);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return (message);
        }

        [HttpPost]
        public dynamic Update(Association oAssociation)
        {
            var message = new CommonMessage();
            try
            {
                _associationRepository.Update(oAssociation);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int association_id)
        {

            var message = new CommonMessage();
            try
            {
                _associationRepository.Delete(association_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic AssociationCboList()
        {
            return _associationRepository.AssociationCboList();
        }

    }
}
