using System;

namespace Auth.Model.Party.ViewModel
{
    public class DealerLocationInfoViewModel
    {
        public DealerLocationInfoViewModel()
        {
            //Constractor
        }
        public int DealerLocationInfoId { get; set; }
        public int DealerInfoId { get; set; }
        public string DealerLocationInfoCode { get; set; }
        public string DealerLocationInfoName { get; set; }
        public string DealerLocationInfoShortName { get; set; }
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
        public string City { get; set; }
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

        public static DealerLocationInfoViewModel ConvertToModel(dynamic dealerLocation)
        {
            var model = new DealerLocationInfoViewModel();
            model.DealerLocationInfoId = dealerLocation.dealer_location_info_id ?? 0;
            model.DealerInfoId = dealerLocation.dealer_info_id ?? 0;
            model.DealerLocationInfoCode = dealerLocation.dealer_location_info_code ?? "";
            model.DealerLocationInfoName = dealerLocation.dealer_location_info_name ?? "";
            model.DealerLocationInfoShortName = dealerLocation.dealer_location_info_short_name ?? "";
            model.TradeLicense = dealerLocation.trade_license ?? "";
            model.TradeLicenseDate = dealerLocation.trade_license_date?? null;
            model.Mobile = dealerLocation.mobile ?? "";
            model.Phone = dealerLocation.phone ?? "";
            model.Email = dealerLocation.email ?? "";
            model.EmergencyContact = dealerLocation.emergency_contact ?? "";
            model.CountryId = dealerLocation.country_id ?? 0;
            model.DivisionId = dealerLocation.division_id ?? 0;
            model.DistrictId = dealerLocation.district_id ?? 0;
            model.ThanaId = dealerLocation.thana_id ?? 0;
            model.City = dealerLocation.city ?? "";
            model.PostCode = dealerLocation.post_code ?? "";
            model.Block = dealerLocation.block ?? "";
            model.RoadNo = dealerLocation.road_no ?? "";
            model.HouseNo = dealerLocation.house_no ?? "";
            model.FlatNo = dealerLocation.flat_no ?? "";
            model.AddressNote = dealerLocation.address_note ?? "";
            model.IsActive = dealerLocation.is_active ?? false;
            return model;
        }
    }     

}


