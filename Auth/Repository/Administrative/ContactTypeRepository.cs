using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class ContactTypeRepository : IContactTypeRepository
    {
        private readonly IEntityDataAccess<ContactType> _entityDataAccess;

        public ContactTypeRepository(
            IEntityDataAccess<ContactType> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;
        }

        public IEnumerable<ContactType> GetAllContactType()
        {
            return _entityDataAccess.GetAll();
        }
        public IEnumerable<object> ContactTypeCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.contact_type_id)
                             select new { contact_type_id = r.contact_type_id, contact_type_name = r.contact_type_name };
                return result;
            }
            catch
            {
                return null;
            }
        }
    }
}
