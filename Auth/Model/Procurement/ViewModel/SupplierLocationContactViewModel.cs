using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierLocationContactViewModel
    {
        public int supplier_id { get; set; }
        public int supplier_location_id { get; set; }
        public int supplier_contact_id { get; set; }
        public string add_note { get; set; }


        public static SupplierLocationContactViewModel ConvertToModelForLocationContact(dynamic supplierLocationContact)
        {

            var model = new SupplierLocationContactViewModel();

            model.supplier_id = supplierLocationContact.supplier_id;
            model.supplier_location_id = supplierLocationContact.supplier_location_id;
            model.supplier_contact_id = supplierLocationContact.supplier_contact_id;
            model.add_note = supplierLocationContact.add_note;


            return model;


        }

    }


}
