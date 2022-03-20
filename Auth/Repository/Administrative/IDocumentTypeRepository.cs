using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IDocumentTypeRepository
    {
        void Add(DocumentType oDocumentType);
        void Update(DocumentType oDocumentType);
        IEnumerable<DocumentType> GetAllDocumentType();
        DocumentType GetById(int document_type_id);
        IEnumerable<object> DocumentTypeCboList();
        void Delete(int document_type_id);
    }
}
