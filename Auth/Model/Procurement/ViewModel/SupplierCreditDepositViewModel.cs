using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierCreditDepositViewModel
    {
        public int supplier_id { get; set; }
        public int currency_id { get; set; }
        public int credit_days { get; set; }
        public decimal credit_limit { get; set; }
        public int payment_frequency_id { get; set; }

        public static SupplierCreditDepositViewModel ConvertToSupplierCreditDepositViewModel(dynamic supplierCreditDeposit)
        {
            var model = new SupplierCreditDepositViewModel();
            model.supplier_id = supplierCreditDeposit.supplier_id;
            model.currency_id = supplierCreditDeposit.currency_id ?? 0;
            model.credit_days = supplierCreditDeposit.credit_days ?? 0;
            model.credit_limit = supplierCreditDeposit.credit_limit ?? 0;
            model.payment_frequency_id = supplierCreditDeposit.payment_frequency_id ?? 0;



            return model;

        }

        //public static SupplierLocationViewModel ConvertToModelForLocation(dynamic SupplierLocation)
        //{

        //    var model = new SupplierLocationViewModel();
        //    model.SupplierId = SupplierLocation.supplier_id;
        //    model.SupplierLocationName = SupplierLocation.supplier_location_name ?? "";
        //    model.LocationTypeEnumId = SupplierLocation.location_type_enum_id ?? 0;
        //    model.CountryId = SupplierLocation.country_id ?? 0;
        //    model.DivisionId = SupplierLocation.division_id ?? 0;
        //    model.DistrictId = SupplierLocation.district_id ?? 0;
        //    model.City = SupplierLocation.city ?? "";
        //    model.PsArea = SupplierLocation.ps_area ?? "";
        //    model.PostCode = SupplierLocation.post_code ?? "";
        //    model.Block = SupplierLocation.block ?? "";
        //    model.RoadNo = SupplierLocation.road_no ?? "";
        //    model.HouseNo = SupplierLocation.house_no ?? "";
        //    model.FlatNo = SupplierLocation.flat_no ?? "";
        //    model.Email = SupplierLocation.mail ?? "";
        //    model.MobileNo = SupplierLocation.mobile_no ?? "";
        //    model.PhoneNo = SupplierLocation.phone_no ?? "";
        //    model.Pabx = SupplierLocation.pabx ?? "";

        //    return model;


        //}
    }

}
