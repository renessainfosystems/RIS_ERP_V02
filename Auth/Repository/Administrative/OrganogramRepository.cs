using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class OrganogramRepository:IOrganogramRepository
    {
        private readonly IEntityDataAccess<Organogram> _entityDataAccess;
        
        public OrganogramRepository(
            IEntityDataAccess<Organogram> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Organogram oOrganogram)
        {
            _entityDataAccess.Add(oOrganogram);
           
        }
        public void Update(Organogram oOrganogram)
        {
            _entityDataAccess.Update(oOrganogram);

        }
        public IEnumerable<Organogram> GetAllOrganogram()
        {
            return  _entityDataAccess.GetAll();
        }

        public Organogram GetById(int organogram_id)
        {
            return _entityDataAccess.GetById(organogram_id);
        }

        public IEnumerable<object> OrganogramCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.organogram_id)
                       select new { organogram_id = r.organogram_id, organogram_code = r.organogram_code };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int organogram_id)
        {
            Organogram oOrganogram = new Organogram() { organogram_id = organogram_id };
            _entityDataAccess.Remove(oOrganogram);
        }

    }
}
