
using Auth.Model.DomainModel;
using System.Collections.Generic;

namespace Auth.Service
{
    public interface IVoucherTypeRepository
    {
        void Add(VoucherType oVoucherType);
        void Update(VoucherType oVoucherType);
        IEnumerable<VoucherType> GetAllVoucherType();
        VoucherType GetById(int industry_sector_id);
        IEnumerable<object> VoucherTypeCboList();
        void Delete(int industry_sector_id);

    }
}
