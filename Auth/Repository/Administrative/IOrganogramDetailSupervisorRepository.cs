
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IOrganogramDetailSupervisorRepository
    {
        void Add(OrganogramDetailSupervisor oOrganogramDetailSupervisor);
        void Update(OrganogramDetailSupervisor oOrganogramDetailSupervisor);
        IEnumerable<OrganogramDetailSupervisor> GetAllOrganogramDetailSupervisor();
        OrganogramDetailSupervisor GetById(int organogram_detail_supervisor_id);
        void Delete(int organogram_detail_supervisor_id);

    }
}
