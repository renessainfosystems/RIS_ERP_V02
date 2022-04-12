
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static Auth.Utility.Procurement.Enum.GlobalEnumList;

namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierApplicationViewModel
    {
        public int SupplierId { get; set; }
        public string SupplierCode { get; set; }     
        public string LegalName { get; set; }
        public string ShortName { get; set; }
        public string NameInLocalLanguage { get; set; }
        public string AddressInLocalLanguage { get; set; }
        public DateTime YearEstablished { get; set; }

        //public DateTime DateOfBirth { get; set; }
        public int DomicileEnumId { get; set; }
        public string DomicileEnumName { get; set; }
        public int RegistryAuthorityId { get; set; }
        public int RegulatorId { get; set; }
        public int OwnershipTypeId { get; set; }
        public string SupplierLogo { get; set; }
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

        public bool IsActive { get; set; }

        public bool IsConfirm { get; set; }

        public int FeedbackStatus { get; set; }
        public int BusinessActivityEnumId { get; set; }
        public int ManagementStaffNo { get; set; }
        public int NonmanagementStaffNo { get; set; }
        public int PermanentWorkerNo { get; set; }
        public int CasualWorkerNo { get; set; }

        public static SupplierApplicationViewModel ConvertToSupplierApplicationAllModel(dynamic SupplierApplication)
        {
            var model = new SupplierApplicationViewModel();
            model.SupplierId = SupplierApplication.supplier_id;
            model.SupplierCode = SupplierApplication.supplier_code ?? "";
            model.LegalName = SupplierApplication.legal_name ?? "";
            model.ShortName = SupplierApplication.short_name ?? "";
            model.NameInLocalLanguage = SupplierApplication.name_in_local_language ?? "";
            model.AddressInLocalLanguage = SupplierApplication.address_in_local_language ?? "";
            model.YearEstablished = SupplierApplication.year_established ?? "";
            model.DomicileEnumId = SupplierApplication.domicile_enum_id ?? 0;
            model.DomicileEnumName = EnumDisplayDomicile.GetDisplayDomicileName((EnumDomicile)SupplierApplication.domicile_enum_id);
            model.RegistryAuthorityId = SupplierApplication.registry_authority_id ?? 0;
            model.RegulatorId = SupplierApplication.regulator_id ?? 0;
            model.OwnershipTypeId = SupplierApplication.ownership_type_id ?? 0;
            model.SupplierLogo = SupplierApplication.supplier_logo ?? "";
            model.CountryId = SupplierApplication.country_id ?? 0;
            model.DivisionId = SupplierApplication.division_id ?? 0;
            model.DistrictId = SupplierApplication.district_id ?? 0;
            model.City = SupplierApplication.city ?? "";
            model.PsArea = SupplierApplication.ps_area ?? "";
            model.PostCode = SupplierApplication.post_code ?? "";
            model.Block = SupplierApplication.block ?? "";
            model.RoadNo = SupplierApplication.road_no ?? "";
            model.HouseNo = SupplierApplication.house_no ?? "";
            model.FlatNo = SupplierApplication.flat_no ?? "";
            model.Email = SupplierApplication.email ?? "";
            model.MobileNo = SupplierApplication.mobile_no ?? "";
            model.PhoneNo = SupplierApplication.phone_no ?? "";
            model.Pabx = SupplierApplication.pabx ?? "";
            model.IsActive = SupplierApplication.is_active ?? false;
            model.IsConfirm = SupplierApplication.is_confirm ?? false;
            //model.IsConfirm = SupplierApplication.is_confirm ?? false;
            model.FeedbackStatus = SupplierApplication.feedback_status ?? 1;



            model.BusinessActivityEnumId = SupplierApplication.business_activities_enum_id ?? 0;
            model.ManagementStaffNo = SupplierApplication.management_staff_no ?? 0;
            model.NonmanagementStaffNo = SupplierApplication.nonmanagement_staff_no ?? 0;
            model.PermanentWorkerNo = SupplierApplication.permanent_worker_no ?? 0;
            model.CasualWorkerNo = SupplierApplication.casual_worker_no ?? 0;

            return model;


        }

        public static SupplierApplicationViewModel ConvertToSupplierUserInfo(dynamic SupplierApplication)
        {

            var model = new SupplierApplicationViewModel();
            model.SupplierId = SupplierApplication.supplier_id;
            model.SupplierCode = SupplierApplication.supplier_code;

            return model;

        }
    }

    public static class EnumDisplayDomicile
    {
        public static string GetDisplayDomicileName(this Enum enumValue)
        {
            return enumValue.GetType()?
                            .GetMember(enumValue.ToString())?
                            .First()?
                            .GetCustomAttribute<DisplayAttribute>()?
                            .Name;
        }
    }
}