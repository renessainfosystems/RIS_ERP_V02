using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public class OrganogramDetailSupervisorRepository:IOrganogramDetailSupervisorRepository
    {
        private readonly IEntityDataAccess<OrganogramDetailSupervisor> _entityDataAccess;
        
        public OrganogramDetailSupervisorRepository(
            IEntityDataAccess<OrganogramDetailSupervisor> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(OrganogramDetailSupervisor oOrganogramDetailSupervisor)
        {
            _entityDataAccess.Add(oOrganogramDetailSupervisor);
           
        }
        public void Update(OrganogramDetailSupervisor oOrganogramDetailSupervisor)
        {
            _entityDataAccess.Update(oOrganogramDetailSupervisor);

        }
        public IEnumerable<OrganogramDetailSupervisor> GetAllOrganogramDetailSupervisor()
        {
            return  _entityDataAccess.GetAll();
        }

        public OrganogramDetailSupervisor GetById(int organogram_detail_supervisor_id)
        {
            return _entityDataAccess.GetById(organogram_detail_supervisor_id);
        }

       

        public void Delete(int organogram_detail_supervisor_id)
        {
            OrganogramDetailSupervisor oOrganogramDetailSupervisor = new OrganogramDetailSupervisor() { organogram_detail_supervisor_id = organogram_detail_supervisor_id };
            _entityDataAccess.Remove(oOrganogramDetailSupervisor);
        }

    }
}
