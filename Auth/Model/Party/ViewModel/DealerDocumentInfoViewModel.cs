using System;

namespace Auth.Model.Party.ViewModel
{
    public class DealerDocumentInfoViewModel
    {
        public DealerDocumentInfoViewModel()
        {
            //Constractor
        }
        public int DealerDocumentInfoId { get; set; }
        public int DealerInfoId { get; set; }
        public int DocumentTypeId { get; set; }
        public string DocumentTypeName { get; set; }
        public string DocumentNumber { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string FileUpload { get; set; }
        public bool IsVerified { get; set; }
        public bool IsComplete { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime DBServerDateTime { get; set; }
        public long CreatedUserInfoId { get; set; }

        public static DealerDocumentInfoViewModel ConvertToModel(dynamic dealerDocument)
        {
            var model = new DealerDocumentInfoViewModel();
            model.DealerDocumentInfoId = dealerDocument.dealer_document_info_id ?? 0;
            model.DealerInfoId = dealerDocument.dealer_info_id ?? 0;
            model.DocumentTypeId = dealerDocument.document_type_id ?? 0;
            model.DocumentTypeName = dealerDocument.document_type_name ?? "";
            model.DocumentNumber = dealerDocument.document_number ?? "";
            model.IssueDate = dealerDocument.issue_date;
            model.ExpiryDate = dealerDocument.expiry_date;
            model.FileUpload = dealerDocument.image_file ?? "";
            model.IsVerified = dealerDocument.is_verified ?? false;
            model.IsComplete = dealerDocument.is_complete ?? false;
            model.Status = dealerDocument.status ?? "";
            model.Remarks = dealerDocument.remarks ?? "";

            return model;
        }
    }     

}


