using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public class OrganogramDetailEducationRepository:IOrganogramDetailEducationRepository
    {
        private readonly IEntityDataAccess<OrganogramDetailEducation> _entityDataAccess;
        
        public OrganogramDetailEducationRepository(
            IEntityDataAccess<OrganogramDetailEducation> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(OrganogramDetailEducation oOrganogramDetailEducation)
        {
            _entityDataAccess.Add(oOrganogramDetailEducation);
           
        }
        public void Update(OrganogramDetailEducation oOrganogramDetailEducation)
        {
            _entityDataAccess.Update(oOrganogramDetailEducation);

        }
        public IEnumerable<OrganogramDetailEducation> GetAllOrganogramDetailEducation()
        {
            return  _entityDataAccess.GetAll();
        }

        public OrganogramDetailEducation GetById(int organogram_detail_education_id)
        {
            return _entityDataAccess.GetById(organogram_detail_education_id);
        }

       

        public void Delete(int organogram_detail_education_id)
        {
            OrganogramDetailEducation oOrganogramDetailEducation = new OrganogramDetailEducation() { organogram_detail_education_id = organogram_detail_education_id };
            _entityDataAccess.Remove(oOrganogramDetailEducation);
        }

    }
}
