using System;

namespace Auth.Model.Party.ViewModel
{
    public class RetailerLocationInfoViewModel
    {
        public RetailerLocationInfoViewModel()
        {
            //Constractor
        }
        public int RetailerLocationInfoId { get; set; }
        public int RetailerInfoId { get; set; }
        public string RetailerLocationInfoCode { get; set; }
        public string RetailerLocationInfoName { get; set; }
        public string RetailerLocationInfoShortName { get; set; }
        public string TradeLicense { get; set; }
        public DateTime? TradeLicenseDate { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string EmergencyContact { get; set; }
        public int CountryId { get; set; }
        public int DivisionId { get; set; }
        public int DistrictId { get; set; }
        public int ThanaId { get; set; }
        public string PSArea { get; set; }
        public string PostCode { get; set; }
        public string Block { get; set; }
        public string RoadNo { get; set; }
        public string HouseNo { get; set; }
        public string FlatNo { get; set; }
        public string AddressNote { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime DBServerDateTime { get; set; }
        public long CreatedUserInfoId { get; set; }

        public static RetailerLocationInfoViewModel ConvertToModel(dynamic retailerLocation)
        {
            var model = new RetailerLocationInfoViewModel();
            model.RetailerLocationInfoId = retailerLocation.retailer_location_info_id ?? 0;
            model.RetailerInfoId = retailerLocation.retailer_info_id ?? 0;
            model.RetailerLocationInfoCode = retailerLocation.retailer_location_info_code ?? "";
            model.RetailerLocationInfoName = retailerLocation.retailer_location_info_name ?? "";
            model.RetailerLocationInfoShortName = retailerLocation.retailer_location_info_short_name ?? "";
            model.TradeLicense = retailerLocation.trade_license ?? "";
            model.TradeLicenseDate = retailerLocation.trade_license_date?? null;
            model.Mobile = retailerLocation.mobile ?? "";
            model.Phone = retailerLocation.phone ?? "";
            model.Email = retailerLocation.email ?? "";
            model.EmergencyContact = retailerLocation.emergency_contact ?? "";
            model.CountryId = retailerLocation.country_id ?? 0;
            model.DivisionId = retailerLocation.division_id ?? 0;
            model.DistrictId = retailerLocation.district_id ?? 0;
            model.ThanaId = retailerLocation.thana_id ?? 0;
            model.PSArea = retailerLocation.ps_area ?? "";
            model.PostCode = retailerLocation.post_code ?? "";
            model.Block = retailerLocation.block ?? "";
            model.RoadNo = retailerLocation.road_no ?? "";
            model.HouseNo = retailerLocation.house_no ?? "";
            model.FlatNo = retailerLocation.flat_no ?? "";
            model.AddressNote = retailerLocation.address_note ?? "";
            model.IsActive = retailerLocation.is_active ?? false;
            return model;
        }
    }     

}


