
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IVatCircleRepository
    {
        void Add(VatCircle oVatCircle);
        void Update(VatCircle oVatCircle);
        IEnumerable<VatCircle> GetAllVatCircle();
        VatCircle GetById(int vat_circle_id);
        IEnumerable<object> VatCircleCboList();
        void Delete(int vat_circle_id);

    }
}
