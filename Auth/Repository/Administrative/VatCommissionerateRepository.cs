using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
namespace Auth.Repository.Administrative
{
    public class VatCommissionerateRepository : IVatCommissionerateRepository
    {
        private readonly IEntityDataAccess<VatCommissionerate> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public VatCommissionerateRepository(
            IEntityDataAccess<VatCommissionerate> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;

        }

        public void Add(VatCommissionerate oVatCommissionerate)
        {
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            oVatCommissionerate.company_corporate_id = (int)company_corporate_id;
            oVatCommissionerate.vat_commissionerate_id = _entityDataAccess.GetAutoId("Administrative.Vat_Commissionerate", "vat_commissionerate_id");
            _entityDataAccess.Add(oVatCommissionerate);

        }
        public void Update(VatCommissionerate oVatCommissionerate)
        {
            _entityDataAccess.Update(oVatCommissionerate);

        }
        public IEnumerable<VatCommissionerate> GetAllVatCommissionerate()
        {
            return _entityDataAccess.GetAll();
        }

        public VatCommissionerate GetById(int vat_commissionerate_id)
        {
            return _entityDataAccess.GetById(vat_commissionerate_id);
        }

        public IEnumerable<object> VatCommissionerateCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.vat_commissionerate_id)
                             select new { vat_commissionerate_id = r.vat_commissionerate_id, vat_commissionerate_name = r.vat_commissionerate_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int vat_commissionerate_id)
        {
            VatCommissionerate oVatCommissionerate = new VatCommissionerate() { vat_commissionerate_id = vat_commissionerate_id };
            _entityDataAccess.Remove(oVatCommissionerate);
        }

    }
}