
using Auth.Model.Administrative.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auth.Repository.Administrative
{
    public interface IOrganogramDetailRepository
    {
        //void Add(OrganogramDetail oOrganogramDetail);
        //void Update(OrganogramDetail oOrganogramDetail);
        //IEnumerable<OrganogramDetail> GetAllOrganogramDetail();
        //OrganogramDetail GetById(int organogram_detail_id);
        //void Delete(int organogram_detail_id);
        Task<dynamic> GetAllOrganogramDetail(int Organogram_Id);
        Task<dynamic> GetAllActiveOrganogramDetail(int Organogram_Id);
        Task<dynamic> GetOrganogramDetailById(int Organogram_id);
        Task<dynamic> OrganogramDetailActivity(int Organogram_id);
        Task<dynamic> IUD_OrganogramDetail(OrganogramDetail organogramDetail, int dbOperation);

    }
}
