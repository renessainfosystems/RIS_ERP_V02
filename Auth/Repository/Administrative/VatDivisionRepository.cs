using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class VatDivisionRepository:IVatDivisionRepository
    {
        private readonly IEntityDataAccess<VatDivision> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        public VatDivisionRepository(
            IEntityDataAccess<VatDivision> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(VatDivision oVatDivision)
        {
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            oVatDivision.company_corporate_id = (int)company_corporate_id;
            oVatDivision.vat_division_id = _entityDataAccess.GetAutoId("Administrative.Vat_Division", "vat_division_id");
            _entityDataAccess.Add(oVatDivision);
           
        }
        public void Update(VatDivision oVatDivision)
        {
            
            _entityDataAccess.Update(oVatDivision);

        }
        public IEnumerable<VatDivision> GetAllVatDivision()
        {
            return  _entityDataAccess.GetAll();
        }

        public VatDivision GetById(int vat_division_id)
        {
            return _entityDataAccess.GetById(vat_division_id);
        }

        public IEnumerable<object> VatDivisionCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.vat_division_id)
                       select new { vat_division_id = r.vat_division_id, vat_division_name = r.vat_division_name};
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int vat_division_id)
        {
            VatDivision oVatDivision = new VatDivision() { vat_division_id = vat_division_id };
            _entityDataAccess.Remove(oVatDivision);
        }

    }
}
