using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Auth.Repository.Administrative
{
    public class DocumentTypeRepository : IDocumentTypeRepository
    {
        private readonly IEntityDataAccess<DocumentType> _entityDataAccess;

        public DocumentTypeRepository(
            IEntityDataAccess<DocumentType> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;

        }
        public void Add(DocumentType oDocumentType)
        {
            try
            {
                oDocumentType.document_type_id = GetAutoId();
                _entityDataAccess.Add(oDocumentType);
            }
            catch (Exception ex)
            {

                if (ex.InnerException.Message.Contains("UC_document_type"))
                    throw new Exception("This Document Type (" + oDocumentType.document_type_name + ") is already exists");
                else
                    throw new Exception(ex.Message);
            }
        }

        public void Delete(int document_type_id)
        {
            DocumentType oDocumentType = new DocumentType() { document_type_id = document_type_id };
            _entityDataAccess.Remove(oDocumentType);
        }

        public IEnumerable<object> DocumentTypeCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.document_type_id)
                             select new { document_type_id = r.document_type_id, document_type_name = r.document_type_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<DocumentType> GetAllDocumentType()
        {
            return _entityDataAccess.GetAll();
        }

        public DocumentType GetById(int document_type_id)
        {
            return _entityDataAccess.GetById(document_type_id);
        }

        public void Update(DocumentType oDocumentType)
        {
            try
            {
                _entityDataAccess.Update(oDocumentType);
            }
            catch (Exception ex)
            {


                if (ex.InnerException.Message.Contains("UC_document_type"))
                    throw new Exception("This Document Type (" + oDocumentType.document_type_name + ") is already exists");
                else
                    throw new Exception(ex.Message);
            }
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.document_type_id).ToList();
                if (idList.Count() != 0)
                {
                    id = idList.Max(x => x + 1);
                }
                else
                {
                    id = 1;
                }
                return id;
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
