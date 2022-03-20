
using Auth.Model.Administrative.Model;
using System.Collections.Generic;
namespace Auth.Repository.Administrative
{
    public interface IOrganogramDetailCompetencyRepository
    {
        void Add(OrganogramDetailCompetency oOrganogramDetailCompetency);
        void Update(OrganogramDetailCompetency oOrganogramDetailCompetency);
        IEnumerable<OrganogramDetailCompetency> GetAllOrganogramDetailCompetency();
        OrganogramDetailCompetency GetById(int organogram_detail_competency_id);
        void Delete(int organogram_detail_competency_id);

    }
}
