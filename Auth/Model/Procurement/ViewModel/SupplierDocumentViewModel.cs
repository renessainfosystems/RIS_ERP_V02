using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierDocumentViewModel
    {
        public int supplier_id { get; set; }
        public int document_type_id { get; set; }
        public string document_number { get; set; }
        public DateTime issue_date { get; set; }
        //public string IssueDateStr { get; set; }
        public DateTime expiry_date { get; set; }
        //public string ExpiryDateStr { get; set; }
        public string file_path { get; set; }

        public static SupplierDocumentViewModel ConvertToModelForDocument(dynamic SupplierDocument)
        {

            var model = new SupplierDocumentViewModel();

            model.supplier_id = SupplierDocument.supplier_id;
            model.document_type_id = SupplierDocument.document_type_id;
            model.document_number = SupplierDocument.document_number ?? "";
            model.issue_date = SupplierDocument.issue_date ?? "";
            //model.IssueDateStr = SupplierDocument.issue_date_str ?? "";
            model.expiry_date = SupplierDocument.expiry_date ?? "";
            //model.ExpiryDateStr = SupplierDocument.expiry_date_str ?? "";
            model.file_path = SupplierDocument.file_path ?? "";

            return model;


        }
    }
}
