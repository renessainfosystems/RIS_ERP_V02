
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IIndustrySubSectorRepository
    {
        void Add(IndustrySubSector oIndustrySubSector);
        void Update(IndustrySubSector oIndustrySubSector);
        IEnumerable<IndustrySubSector> GetAllIndustrySubSector();
        IndustrySubSector GetById(int industry_sub_sector_id);
        IEnumerable<object> IndustrySubSectorCboList();

        IEnumerable<object> IndustrySubSectorCboListBySectorId(int sector_id);
        void Delete(int industry_sub_sector_id);

    }
}
