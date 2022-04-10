﻿using System;

namespace Auth.Model.Party.ViewModel
{
    public class DealerCreditInfoViewModel
    {
        public DealerCreditInfoViewModel()
        {
            //Constractor
        }
        public int DealerCreditInfoId { get; set; }
        public int DealerInfoId { get; set; }
        public int SecurityDepositId { get; set; }
        public decimal Amount { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Attachment { get; set; }
        public string Remarks { get; set; }
        public bool IsApproved { get; set; }
        public DateTime ApprovedDate { get; set; }
        public long ApprovedById { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public long CreatedUserInfoId { get; set; }

        public static DealerCreditInfoViewModel ConvertToModel(dynamic dealerCredit)
        {
            var model = new DealerCreditInfoViewModel();
            model.DealerCreditInfoId = dealerCredit.dealer_credit_info_id ?? 0;
            model.DealerInfoId = dealerCredit.dealer_info_id ?? 0;
            model.SecurityDepositId = dealerCredit.security_deposit_id ?? 0;
            model.Amount = dealerCredit.amount ?? 0;
            model.ExpiryDate = dealerCredit.expiry_date;
            model.Attachment = dealerCredit.attachment ?? "";
            model.Remarks = dealerCredit.remarks ?? "";
            model.IsApproved = dealerCredit.is_Approved ?? false;
            return model;
        }
    }     

}

