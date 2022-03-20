
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IOrganogramRepository
    {
        void Add(Organogram oOrganogram);
        void Update(Organogram oOrganogram);
        IEnumerable<Organogram> GetAllOrganogram();
        Organogram GetById(int organogram_id);
        IEnumerable<object> OrganogramCboList();
        void Delete(int organogram_id);

    }
}
