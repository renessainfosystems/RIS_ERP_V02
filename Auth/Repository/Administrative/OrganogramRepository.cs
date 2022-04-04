using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;
using System.Linq;
using Auth.DataAccess.Administrative;
using System.Threading.Tasks;

namespace Auth.Repository.Administrative
{
    public class OrganogramRepository:IOrganogramRepository
    {
      
        protected OrganogramDataAccess _OrganogramDataAccess { get; set; }        
        public OrganogramRepository(OrganogramDataAccess organogramDataAccess)
        {
            _OrganogramDataAccess = organogramDataAccess;
        }
        public async Task<dynamic> GetAllOrganogram()
        {
            return await _OrganogramDataAccess.GetAllOrganogram();
        }
        public async Task<dynamic> GetAllActiveOrganogram()
        {
            return await _OrganogramDataAccess.GetAllActiveOrganogram();
        }
        public async Task<dynamic> GetOrganogramById(int Organogram_id)
        {
            return await _OrganogramDataAccess.GetOrganogramById(Organogram_id);
        }
        public async Task<dynamic> IUD_Organogram(Organogram Organogram, int dbOperation)
        {
            return await _OrganogramDataAccess.IUD_Organogram(Organogram, dbOperation);
        }

        public async Task<dynamic> OrganogramActivity(int Organogram_id)
        {
            return await _OrganogramDataAccess.OrganogramActivity(Organogram_id);
        }
        

    }
}
