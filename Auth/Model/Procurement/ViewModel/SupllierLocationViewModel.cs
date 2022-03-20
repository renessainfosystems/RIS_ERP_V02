using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Reflection;


namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierLocationViewModel
    {
        public int SupplierId { get; set; }
        public string SupplierLocationName { get; set; }
        public int LocationTypeEnumId { get; set; }
        public int CountryId { get; set; }
        public int DivisionId { get; set; }
        public int DistrictId { get; set; }
        public string City { get; set; }
        public string PsArea { get; set; }
        public string PostCode { get; set; }
        public string Block { get; set; }
        public string RoadNo { get; set; }
        public string HouseNo { get; set; }
        public string FlatNo { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string Pabx { get; set; }
        public string CountryName { get; set; }
        public string DivisionName { get; set; }
        public string DistrictName { get; set; }
        public string Address { get; set; }

        public static SupplierLocationViewModel ConvertToModelForLocation(dynamic SupplierLocation)
        {

            var model = new SupplierLocationViewModel();
            model.SupplierId = SupplierLocation.supplier_id;
            model.SupplierLocationName = SupplierLocation.supplier_location_name ?? "";
            model.LocationTypeEnumId = SupplierLocation.location_type_enum_id ?? 0;
            model.CountryId = SupplierLocation.country_id ?? 0;
            model.DivisionId = SupplierLocation.division_id ?? 0;
            model.DistrictId = SupplierLocation.district_id ?? 0;
            model.City = SupplierLocation.city ?? "";
            model.PsArea = SupplierLocation.ps_area ?? "";
            model.PostCode = SupplierLocation.post_code ?? "";
            model.Block = SupplierLocation.block ?? "";
            model.RoadNo = SupplierLocation.road_no ?? "";
            model.HouseNo = SupplierLocation.house_no ?? "";
            model.FlatNo = SupplierLocation.flat_no ?? "";
            model.Email = SupplierLocation.mail ?? "";
            model.MobileNo = SupplierLocation.mobile_no ?? "";
            model.PhoneNo = SupplierLocation.phone_no ?? "";
            model.Pabx = SupplierLocation.pabx ?? "";

            return model;


        }

        public static SupplierLocationViewModel ConvertToModelForAllLocation(dynamic SupplierLocation)
        {

            var model = new SupplierLocationViewModel();
            model.SupplierId = SupplierLocation.supplier_id;
            model.SupplierLocationName = SupplierLocation.supplier_location_name ?? "";
            model.LocationTypeEnumId = SupplierLocation.location_type_enum_id ?? 0;

            //model.ShiftTypeName = EnumDisplay.GetDisplayName((EnumShiftType)shiftInfo.shift_type_id_enum);
            model.CountryId = SupplierLocation.country_id ?? 0;
            model.DivisionId = SupplierLocation.division_id ?? 0;
            model.DistrictId = SupplierLocation.district_id ?? 0;
            model.City = SupplierLocation.city ?? "";
            model.PsArea = SupplierLocation.ps_area ?? "";
            model.PostCode = SupplierLocation.post_code ?? "";
            model.Block = SupplierLocation.block ?? "";
            model.RoadNo = SupplierLocation.road_no ?? "";
            model.HouseNo = SupplierLocation.house_no ?? "";
            model.FlatNo = SupplierLocation.flat_no ?? "";
            model.Email = SupplierLocation.mail ?? "";
            model.MobileNo = SupplierLocation.mobile_no ?? "";
            model.PhoneNo = SupplierLocation.phone_no ?? "";
            model.Pabx = SupplierLocation.pabx ?? "";
            model.CountryName = SupplierLocation.country_name ?? "";
            model.DivisionName = SupplierLocation.division_name ?? "";
            model.DistrictName = SupplierLocation.district_name ?? "";
            model.Address = SupplierLocation.address ?? "";

            return model;


        }
    }
}
