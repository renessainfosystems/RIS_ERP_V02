
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IIndustrySectorRepository
    {
        void Add(IndustrySector oIndustrySector);
        void Update(IndustrySector oIndustrySector);
        IEnumerable<IndustrySector> GetAllIndustrySector();
        IndustrySector GetById(int industry_sector_id);
        IEnumerable<object> IndustrySectorCboList();
        void Delete(int industry_sector_id);

    }
}
