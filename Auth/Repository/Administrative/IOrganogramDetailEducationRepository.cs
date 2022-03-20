
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IOrganogramDetailEducationRepository
    {
        void Add(OrganogramDetailEducation oOrganogramDetailEducation);
        void Update(OrganogramDetailEducation oOrganogramDetailEducation);
        IEnumerable<OrganogramDetailEducation> GetAllOrganogramDetailEducation();
        OrganogramDetailEducation GetById(int organogram_detail_education_id);
        void Delete(int organogram_detail_education_id);

    }
}
