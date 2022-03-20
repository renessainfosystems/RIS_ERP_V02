using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.Party.Enum.GlobalEnumList;

namespace Auth.Model.Party.ViewModel
{
    public class DealerInfoViewModel
    {
        public DealerInfoViewModel()
        {
            //Constractor
        }
        public long UserInfoId { get; set; }
        public int CompanyCorporateId { get; set; }
        public int CompanyGroupId { get; set; }
        public int CompanyId { get; set; }
        public int DealerInfoId { get; set; }
        public string DealerInfoCode { get; set; }
        public string DealerInfoShortName { get; set; }
        public string DealerInfoName { get; set; }
        public string DealerInfoDisplayName { get; set; }
        public string TradeLicense { get; set; }
        public DateTime? YearEstablished { get; set; }
        public string TIN { get; set; }
        public string BIN { get; set; }
        public int DomicileEnumId { get; set; }
        public string DomicileEnumName { get; set; }
        public int? BusinessTypeEnumId { get; set; }
        public string BusinessTypeEnumName { get; set; }
        public int IndustrySectorId { get; set; }
        public int? IndustrySubSectorId { get; set; }
        public int OwnershipTypeId { get; set; }
        public int? OrganazationTypeEnumId { get; set; }
        public string OrganazationTypeEnumName { get; set; }
        public int? RegistryAuthorityId { get; set; }
        public int? RegulatorId { get; set; }
        public int CurrencyId { get; set; }
        public int? SecurityTypeEnumId { get; set; }
        public string SecurityTypeEnumName { get; set; }
        public int? PreferedMethodEnumId { get; set; }
        public string PreferedMethodEnumName { get; set; }
        public decimal? InternalCreditRating { get; set; }
        public decimal? AllowableCredit { get; set; }
        public decimal? MaximumCredit { get; set; }
        public decimal? CreditDays { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string WebUrl { get; set; }
        public string LogoPath { get; set; }
        public int ContinentEnumId { get; set; }
        public string ContinentEnumName { get; set; }
        public int CountryId { get; set; }
        public int DivisionId { get; set; }
        public int DistrictId { get; set; }
        public int ThanaId { get; set; }
        public int? ZoneId { get; set; }
        public string PSArea { get; set; }
        public string PostCode { get; set; }
        public string Block { get; set; }
        public string RoadNo { get; set; }
        public string HouseNo { get; set; }
        public string FlatNo { get; set; }
        public string AddressNote { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime DBServerDateTime { get; set; }
        public long CreatedUserInfoId { get; set; }
        public long? UpdatedUserInfoId { get; set; }

        public static DealerInfoViewModel ConvertToModel(dynamic dealer)
        {

            var model = new DealerInfoViewModel();
            model.DealerInfoId = dealer.dealer_info_id ?? 0;
            model.CompanyCorporateId = dealer.company_corporate_id ?? 0;
            model.CompanyGroupId = dealer.company_group_id ?? 0;
            model.CompanyId = dealer.company_id ?? 0;
            model.DealerInfoCode = dealer.dealer_info_code ?? "";
            model.DealerInfoShortName = dealer.dealer_info_short_name ?? "";
            model.DealerInfoName = dealer.dealer_info_name ?? "";
            model.DealerInfoDisplayName = dealer.dealer_info_display_name ?? "";
            model.TradeLicense = dealer.trade_license ?? "";
            model.YearEstablished = dealer.year_established;
            model.TIN = dealer.TIN ?? "";
            model.BIN = dealer.BIN ?? "";
            model.DomicileEnumId = dealer.domicile_enum_id ?? 0;
            model.BusinessTypeEnumId = dealer.business_type_enum_id ?? 0;
            model.IndustrySectorId = dealer.industry_sector_id ?? 0;
            model.IndustrySubSectorId = dealer.industry_sub_sector_id ?? 0;
            model.OwnershipTypeId = dealer.ownership_type_id ?? 0;
            model.OrganazationTypeEnumId = dealer.organazation_type_enum_id ?? 0;
            model.RegistryAuthorityId = dealer.registry_authority_id ?? 0;
            model.RegulatorId = dealer.regulator_id ?? 0;
            model.CurrencyId = dealer.currency_id ?? 0;
            model.SecurityTypeEnumId = dealer.security_type_enum_id ?? 0;
            model.PreferedMethodEnumId = dealer.prefered_method_enum_id ?? 0;
            model.InternalCreditRating = dealer.internal_credit_rating ?? 0;
            model.AllowableCredit = dealer.allowable_credit ?? 0;
            model.MaximumCredit = dealer.maximum_credit ?? 0;
            model.CreditDays = dealer.credit_days ?? 0;
            model.Mobile = dealer.mobile ?? "";
            model.Phone = dealer.phone ?? "";
            model.Email = dealer.email ?? "";
            model.WebUrl = dealer.web_url ?? "";
            model.LogoPath = dealer.logo_path ?? "";
            model.ContinentEnumId = dealer.continent_enum_id ?? 0;
            model.CountryId = dealer.country_id ?? 0;
            model.DivisionId = dealer.division_id ?? 0;
            model.DistrictId = dealer.district_id ?? 0;
            model.ThanaId = dealer.thana_id ?? 0;
            model.ZoneId = dealer.zone_id ?? 0;
            model.PSArea = dealer.ps_area ?? "";
            model.PostCode = dealer.post_code ?? "";
            model.Block = dealer.block ?? "";
            model.RoadNo = dealer.road_no ?? "";
            model.HouseNo = dealer.house_no ?? "";
            model.FlatNo = dealer.flat_no ?? "";
            model.AddressNote = dealer.address_note ?? "";
            model.IsActive = dealer.is_active ?? false;

            //model.DomicileEnumName = EnumDisplay.GetDisplayName((EnumDomicile)dealer.domicile_enum_id) ?? "";
            //model.ContinentEnumName = EnumDisplay.GetDisplayName((EnumContinent)dealer.continent_enum_id) ?? "";
            //model.BusinessTypeEnumName = EnumDisplay.GetDisplayName((EnumBusinessActivities)dealer.business_type_enum_id) ?? "";
            //model.OrganazationTypeEnumName = EnumDisplay.GetDisplayName((EnumOrganizationType)dealer.organazation_type_enum_id) ?? "";
            //model.SecurityTypeEnumName = EnumDisplay.GetDisplayName((EnumSecurityType)dealer.security_type_enum_id) ?? "";
            //model.PreferedMethodEnumName = EnumDisplay.GetDisplayName((EnumPreferredMethod)dealer.prefered_method_enum_id) ?? "";

            return model;
        }

    }

    public static class EnumDisplay
    {
        public static string GetDisplayName(this Enum enumValue)
        {
            return enumValue.GetType()?
                            .GetMember(enumValue.ToString())?
                            .First()?
                            .GetCustomAttribute<DisplayAttribute>()?
                            .Name;
        }
    }

}


