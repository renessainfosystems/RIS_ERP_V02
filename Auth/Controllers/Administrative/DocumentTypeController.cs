using Auth.DataAccess.EntityDataAccess;
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
        private readonly IEntityDataAccess<DocumentType> _entityDataAccess;
        private IDocumentTypeRepository _documentTypeRepository;

        public DocumentTypeController(
            IEntityDataAccess<DocumentType> entityDataAccess
            ,IDocumentTypeRepository documentTypeRepository
            )
        {
            _entityDataAccess = entityDataAccess;
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
        public dynamic GetAllByRawSql()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _documentTypeRepository.GetAllByRawSql();

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
            dynamic data = (dynamic)null;
            try
            {
                oDocumentType.document_type_id = _entityDataAccess.GetAutoId("Administrative.Document_Type", "document_type_id");
                _documentTypeRepository.Add(oDocumentType);
                data = _documentTypeRepository.GetByIdRawSql(oDocumentType.document_type_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
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
            dynamic data = (dynamic)null;
            try
            {
                _documentTypeRepository.Update(oDocumentType);
                data = _documentTypeRepository.GetByIdRawSql(oDocumentType.document_type_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, data);

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
                message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
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
