using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Adnan
/// Dated: 01/02/2022
/// </summary>


namespace Auth.Controllers.Procurement
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DocumentTypeController : ControllerBase
    {
        #region Constructor
        private IDocumentTypeRepository _documentTypeRepository;

        public DocumentTypeController(
            IDocumentTypeRepository documentTypeRepository
            )
        {

            _documentTypeRepository = documentTypeRepository;
        }
        #endregion

        [HttpGet]
        public dynamic GetAllDocumentType()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _documentTypeRepository.GetAllDocumentType();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int document_type_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _documentTypeRepository.GetById(document_type_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(DocumentType oDocumentType)
        {
            var message = new CommonMessage();
            try
            {
                _documentTypeRepository.Add(oDocumentType);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(DocumentType oDocumentType)
        {
            var message = new CommonMessage();
            try
            {
                _documentTypeRepository.Update(oDocumentType);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int document_type_id)
        {

            var message = new CommonMessage();
            try
            {
                _documentTypeRepository.Delete(document_type_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }


        [HttpGet]
        public dynamic DocumentTypeCboList()
        {
            return _documentTypeRepository.DocumentTypeCboList();
        }
    }
}
