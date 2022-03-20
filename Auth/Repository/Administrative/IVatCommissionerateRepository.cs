
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IVatCommissionerateRepository
    {
        void Add(VatCommissionerate oVatCommissionerate);
        void Update(VatCommissionerate oVatCommissionerate);
        IEnumerable<VatCommissionerate> GetAllVatCommissionerate();
        VatCommissionerate GetById(int vat_commissionerate_id);
        IEnumerable<object> VatCommissionerateCboList();
        void Delete(int vat_commissionerate_id);

    }
}
