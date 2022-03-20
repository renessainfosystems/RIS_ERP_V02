
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IDesignationRepository
    {
        void Add(Designation oDesignation);
        void Update(Designation oDesignation);
        IEnumerable<Designation> GetAllDesignation();
        Designation GetById(int designation_id);
        IEnumerable<object> DesignationCboList();
        void Delete(int designation_id);

    }
}
