using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IAssociationRepository
    {
        void Add(Association oAssociation);
        void Update(Association oAssociation);
        IEnumerable<Association> GetAllAssociation();
        IEnumerable<AssociationViewModel> GetAllByRawSql();
        IEnumerable<AssociationViewModel> GetByIdRawSql(int association_id);
        Association GetById(int association_id);
        IEnumerable<object> AssociationCboList();
        void Delete(int association_id);
    }
}
