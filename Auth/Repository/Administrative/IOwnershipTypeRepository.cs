
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IOwnershipTypeRepository
    {
        void Add(OwnershipType oOwnershipType);
        void Update(OwnershipType oOwnershipType);
        IEnumerable<OwnershipType> GetAllOwnershipType();
        OwnershipType GetById(int ownership_type_id);
        IEnumerable<object> OwnershipTypeCboList();
        void Delete(int ownership_type_id);

    }
}
