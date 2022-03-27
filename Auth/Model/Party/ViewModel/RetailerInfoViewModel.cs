using System;

namespace Auth.Model.Party.ViewModel
{
    public class RetailerInfoViewModel
    {
        public RetailerInfoViewModel()
        {
            //Constractor
        }
        public int RetailerInfoId { get; set; }
        public int CompanyCorporateId { get; set; }
        public int CompanyGroupId { get; set; }
        public int CompanyId { get; set; }
        public int DealerInfoId { get; set; }
        public string RetailerInfoCode { get; set; }
        public string RetailerInfoShortName { get; set; }
        public string RetailerInfoName { get; set; }
        public string TradeLicense { get; set; }
        public DateTime? TradeLicenseDate { get; set; }
        public string TIN { get; set; }
        public string BIN { get; set; }
        public int DomicileEnumId { get; set; }
        public string DomicileEnumName { get; set; }
        public int? BusinessTypeEnumId { get; set; }
        public string BusinessTypeEnumName { get; set; }
        public int IndustrySectorId { get; set; }
        public int? IndustrySubSectorId { get; set; }
        public int OwnershipTypeId { get; set; }
        public int CurrencyId { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string WebUrl { get; set; }
        public string ImagePath { get; set; }
        public int CountryId { get; set; }
        public int DivisionId { get; set; }
        public int DistrictId { get; set; }
        public int ThanaId { get; set; }
        public int? ZoneId { get; set; }
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

        public static RetailerInfoViewModel ConvertToModel(dynamic retailer)
        {

            var model = new RetailerInfoViewModel();
            model.RetailerInfoId = retailer.retailer_info_id ?? 0;
            model.CompanyCorporateId = retailer.company_corporate_id ?? 0;
            model.CompanyGroupId = retailer.company_group_id ?? 0;
            model.CompanyId = retailer.company_id ?? 0;
            model.DealerInfoId = retailer.dealer_info_id ?? 0;
            model.RetailerInfoCode = retailer.retailer_info_code ?? "";
            model.RetailerInfoShortName = retailer.retailer_info_short_name ?? "";
            model.RetailerInfoName = retailer.retailer_info_name ?? "";
            model.TradeLicense = retailer.trade_license ?? "";
            model.TradeLicenseDate = retailer.trade_license_date;
            model.TIN = retailer.TIN ?? "";
            model.BIN = retailer.BIN ?? "";
            model.DomicileEnumId = retailer.domicile_enum_id ?? 0;
            model.BusinessTypeEnumId = retailer.business_type_enum_id ?? 0;
            model.IndustrySectorId = retailer.industry_sector_id ?? 0;
            model.IndustrySubSectorId = retailer.industry_sub_sector_id ?? 0;
            model.OwnershipTypeId = retailer.ownership_type_id ?? 0;
            model.CurrencyId = retailer.currency_id ?? 0;
            model.Mobile = retailer.mobile ?? "";
            model.Phone = retailer.phone ?? "";
            model.Email = retailer.email ?? "";
            model.WebUrl = retailer.web_url ?? "";
            model.ImagePath = retailer.logo_path ?? "";
            model.CountryId = retailer.country_id ?? 0;
            model.DivisionId = retailer.division_id ?? 0;
            model.DistrictId = retailer.district_id ?? 0;
            model.ThanaId = retailer.thana_id ?? 0;
            model.ZoneId = retailer.zone_id ?? 0;
            model.City = retailer.city ?? "";
            model.PostCode = retailer.post_code ?? "";
            model.Block = retailer.block ?? "";
            model.RoadNo = retailer.road_no ?? "";
            model.HouseNo = retailer.house_no ?? "";
            model.FlatNo = retailer.flat_no ?? "";
            model.AddressNote = retailer.address_note ?? "";
            model.IsActive = retailer.is_active ?? false;

            return model;
        }
    }   
}


