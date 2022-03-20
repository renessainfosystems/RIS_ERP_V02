
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IOrganogramDetailKeySkillRepository
    {
        void Add(OrganogramDetailKeySkill oOrganogramDetailKeySkill);
        void Update(OrganogramDetailKeySkill oOrganogramDetailKeySkill);
        IEnumerable<OrganogramDetailKeySkill> GetAllOrganogramDetailKeySkill();
        OrganogramDetailKeySkill GetById(int organogram_detail_key_skill_id);
        void Delete(int organogram_detail_key_skill_id);

    }
}
