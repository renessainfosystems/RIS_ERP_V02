using Auth.DataAccess.Administrative;
using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auth.Repository.Administrative
{
    public class OrganogramDetailRepository:IOrganogramDetailRepository
    {
        protected OrganogramDetailDataAccess _OrganogramDetailDataAccess { get; set; }
        public OrganogramDetailRepository(OrganogramDetailDataAccess organogramDetailDataAccess)
        {
            _OrganogramDetailDataAccess = organogramDetailDataAccess;
        }
        public async Task<dynamic> GetAllOrganogramDetail(int Organogram_Id)
        {
            return await _OrganogramDetailDataAccess.GetAllOrganogramDetail(Organogram_Id);
        }
        public async Task<dynamic> GetAllActiveOrganogramDetail(int Organogram_Id)
        {
            return await _OrganogramDetailDataAccess.GetAllActiveOrganogramDetail(Organogram_Id);
        }
        public async Task<dynamic> GetOrganogramDetailById(int Organogram_id)
        {
            return await _OrganogramDetailDataAccess.GetOrganogramDetailById(Organogram_id);
        }
        public async Task<dynamic> IUD_OrganogramDetail(OrganogramDetail organogramDetail, int dbOperation)
        {
            return await _OrganogramDetailDataAccess.IUD_OrganogramDetail(organogramDetail, dbOperation);
        }

        public async Task<dynamic> OrganogramDetailActivity(int Organogram_id)
        {
            return await _OrganogramDetailDataAccess.OrganogramDetailActivity(Organogram_id);
        }
        //private readonly IEntityDataAccess<OrganogramDetail> _entityDataAccess;

        //public OrganogramDetailRepository(
        //    IEntityDataAccess<OrganogramDetail> entityDataAccess

        //    )
        //{
        //    _entityDataAccess = entityDataAccess;         

        //}

        //public void Add(OrganogramDetail oOrganogramDetail)
        //{
        //    _entityDataAccess.Add(oOrganogramDetail);

        //}
        //public void Update(OrganogramDetail oOrganogramDetail)
        //{
        //    _entityDataAccess.Update(oOrganogramDetail);

        //}
        //public IEnumerable<OrganogramDetail> GetAllOrganogramDetail()
        //{
        //    return  _entityDataAccess.GetAll();
        //}

        //public OrganogramDetail GetById(int organogram_detail_id)
        //{
        //    return _entityDataAccess.GetById(organogram_detail_id);
        //}
        //public void Delete(int organogram_detail_id)
        //{
        //    OrganogramDetail oOrganogramDetail = new OrganogramDetail() { organogram_detail_id = organogram_detail_id };
        //    _entityDataAccess.Remove(oOrganogramDetail);
        //}

    }
}
