using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public class OrganogramDetailKeySkillRepository:IOrganogramDetailKeySkillRepository
    {
        private readonly IEntityDataAccess<OrganogramDetailKeySkill> _entityDataAccess;
        
        public OrganogramDetailKeySkillRepository(
            IEntityDataAccess<OrganogramDetailKeySkill> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(OrganogramDetailKeySkill oOrganogramDetailKeySkill)
        {
            _entityDataAccess.Add(oOrganogramDetailKeySkill);
           
        }
        public void Update(OrganogramDetailKeySkill oOrganogramDetailKeySkill)
        {
            _entityDataAccess.Update(oOrganogramDetailKeySkill);

        }
        public IEnumerable<OrganogramDetailKeySkill> GetAllOrganogramDetailKeySkill()
        {
            return  _entityDataAccess.GetAll();
        }

        public OrganogramDetailKeySkill GetById(int organogram_detail_key_skill_id)
        {
            return _entityDataAccess.GetById(organogram_detail_key_skill_id);
        }

       

        public void Delete(int organogram_detail_key_skill_id)
        {
            OrganogramDetailKeySkill oOrganogramDetailKeySkill = new OrganogramDetailKeySkill() { organogram_detail_key_skill_id = organogram_detail_key_skill_id };
            _entityDataAccess.Remove(oOrganogramDetailKeySkill);
        }

    }
}
