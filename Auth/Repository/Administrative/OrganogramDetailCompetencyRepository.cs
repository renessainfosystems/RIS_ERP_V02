using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public class OrganogramDetailCompetencyRepository:IOrganogramDetailCompetencyRepository
    {
        private readonly IEntityDataAccess<OrganogramDetailCompetency> _entityDataAccess;
        
        public OrganogramDetailCompetencyRepository(
            IEntityDataAccess<OrganogramDetailCompetency> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(OrganogramDetailCompetency oOrganogramDetailCompetency)
        {
            _entityDataAccess.Add(oOrganogramDetailCompetency);
           
        }
        public void Update(OrganogramDetailCompetency oOrganogramDetailCompetency)
        {
            _entityDataAccess.Update(oOrganogramDetailCompetency);

        }
        public IEnumerable<OrganogramDetailCompetency> GetAllOrganogramDetailCompetency()
        {
            return  _entityDataAccess.GetAll();
        }

        public OrganogramDetailCompetency GetById(int organogram_detail_competency_id)
        {
            return _entityDataAccess.GetById(organogram_detail_competency_id);
        }

       

        public void Delete(int organogram_detail_competency_id)
        {
            OrganogramDetailCompetency oOrganogramDetailCompetency = new OrganogramDetailCompetency() { organogram_detail_competency_id = organogram_detail_competency_id };
            _entityDataAccess.Remove(oOrganogramDetailCompetency);
        }

    }
}
