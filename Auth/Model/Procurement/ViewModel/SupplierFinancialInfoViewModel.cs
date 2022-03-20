using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;


namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierFinancialViewModel
    {
        public int supplier_id { get; set; }
        public int mfs_id { get; set; }

        public int bank_id { get; set; }
        public int bank_branch_id { get; set; }


        public static SupplierFinancialViewModel ConvertToMobileBankingAllModel(dynamic supplierFinancialInfo)
        {
            var model = new SupplierFinancialViewModel();
            model.supplier_id = supplierFinancialInfo.supplier_id ?? 0;
            model.mfs_id = supplierFinancialInfo.mfs_id ?? 0;
            //model.NonmanagementStaffNo = SupplierBusiness.nonmanagement_staff_no ?? 0;
            //model.PermanentWorkerNo = SupplierBusiness.permanent_worker_no ?? 0;
            //model.CasualWorkerNo = SupplierBusiness.casual_worker_no ?? "";


            return model;

        }

        public static SupplierFinancialViewModel ConvertToBankAccountAllModel(dynamic supplierFinancialInfo)
        {
            var model = new SupplierFinancialViewModel();
            model.supplier_id = supplierFinancialInfo.supplier_id ?? 0;
            model.bank_id = supplierFinancialInfo.bank_id ?? 0;
            model.bank_branch_id = supplierFinancialInfo.bank_branch_id ?? 0;
            //model.NonmanagementStaffNo = SupplierBusiness.nonmanagement_staff_no ?? 0;
            //model.PermanentWorkerNo = SupplierBusiness.permanent_worker_no ?? 0;
            //model.CasualWorkerNo = SupplierBusiness.casual_worker_no ?? "";


            return model;

        }
    }

}
