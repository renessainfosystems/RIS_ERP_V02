
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IVatDivisionRepository
    {
        void Add(VatDivision oVatDivision);
        void Update(VatDivision oVatDivision);
        IEnumerable<VatDivision> GetAllVatDivision();
        VatDivision GetById(int vat_division_id);
        IEnumerable<object> VatDivisionCboList();
        void Delete(int vat_division_id);

    }
}
