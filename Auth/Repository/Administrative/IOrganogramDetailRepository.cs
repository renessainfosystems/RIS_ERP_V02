
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IOrganogramDetailRepository
    {
        void Add(OrganogramDetail oOrganogramDetail);
        void Update(OrganogramDetail oOrganogramDetail);
        IEnumerable<OrganogramDetail> GetAllOrganogramDetail();
        OrganogramDetail GetById(int organogram_detail_id);
        void Delete(int organogram_detail_id);

    }
}
