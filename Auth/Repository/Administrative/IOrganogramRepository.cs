using Auth.Model.DomainModel;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auth.Repository.Administrative
{
    public interface IOrganogramRepository
    {
        //void Add(Organogram oOrganogram);
        //void Update(Organogram oOrganogram);
        //IEnumerable<Organogram> GetAllOrganogram();
        //Organogram GetById(int organogram_id);
        //IEnumerable<object> OrganogramCboList();
        //void Delete(int organogram_id);
        Task<dynamic> GetAllOrganogram();
        Task<dynamic> GetAllActiveOrganogram();
        Task<dynamic> GetOrganogramById(int Organogram_id);
        Task<dynamic> OrganogramActivity(int Organogram_id);
        Task<dynamic> IUD_Organogram(Organogram organogram, int dbOperation);
        Task<dynamic> GetCompanyByOrganogram(OrganogramFilter organogramFilter);
        Task<dynamic> GetLocationByOrganogram(OrganogramFilter organogramFilter);
        Task<dynamic> GetDepartmentByOrganogram(OrganogramFilter organogramFilter);
        Task<dynamic> GetPositionByOrganogram(OrganogramFilter organogramFilter);
    }
}
