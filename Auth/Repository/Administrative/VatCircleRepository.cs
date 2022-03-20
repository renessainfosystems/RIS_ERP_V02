using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class VatCircleRepository:IVatCircleRepository
    {
        private readonly IEntityDataAccess<VatCircle> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public VatCircleRepository(
            IEntityDataAccess<VatCircle> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(VatCircle oVatCircle)
        {
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            oVatCircle.company_corporate_id = (int)company_corporate_id;
            oVatCircle.vat_circle_id = _entityDataAccess.GetAutoId("Administrative.Vat_Circle", "vat_circle_id");
            _entityDataAccess.Add(oVatCircle);
           
        }
        public void Update(VatCircle oVatCircle)
        {            
            _entityDataAccess.Update(oVatCircle);
        }
        public IEnumerable<VatCircle> GetAllVatCircle()
        {
            return  _entityDataAccess.GetAll();
        }

        public VatCircle GetById(int vat_circle_id)
        {
            return _entityDataAccess.GetById(vat_circle_id);
        }

        public IEnumerable<object> VatCircleCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.vat_circle_id)
                       select new { vat_circle_id = r.vat_circle_id, vat_circle_name = r.vat_circle_name};
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int vat_circle_id)
        {
            VatCircle oVatCircle = new VatCircle() { vat_circle_id = vat_circle_id };
            _entityDataAccess.Remove(oVatCircle);
        }

    }
}
