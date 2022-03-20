using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public class OrganogramDetailRepository:IOrganogramDetailRepository
    {
        private readonly IEntityDataAccess<OrganogramDetail> _entityDataAccess;
        
        public OrganogramDetailRepository(
            IEntityDataAccess<OrganogramDetail> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(OrganogramDetail oOrganogramDetail)
        {
            _entityDataAccess.Add(oOrganogramDetail);
           
        }
        public void Update(OrganogramDetail oOrganogramDetail)
        {
            _entityDataAccess.Update(oOrganogramDetail);

        }
        public IEnumerable<OrganogramDetail> GetAllOrganogramDetail()
        {
            return  _entityDataAccess.GetAll();
        }

        public OrganogramDetail GetById(int organogram_detail_id)
        {
            return _entityDataAccess.GetById(organogram_detail_id);
        }
        public void Delete(int organogram_detail_id)
        {
            OrganogramDetail oOrganogramDetail = new OrganogramDetail() { organogram_detail_id = organogram_detail_id };
            _entityDataAccess.Remove(oOrganogramDetail);
        }

    }
}
