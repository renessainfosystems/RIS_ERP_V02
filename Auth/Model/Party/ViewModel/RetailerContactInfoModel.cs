using System;

namespace Auth.Model.Party.ViewModel
{
    public class RetailerContactInfoModel
    {
        public RetailerContactInfoModel()
        {
            //Constractor
        }
        public int RetailerContactInfoId { get; set; }
        public int RetailerInfoId { get; set; }
        public string RetailerContactInfoCode { get; set; }
        public string PersonName { get; set; }
        public string PersonDesignation { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? ReligionEnumId { get; set; }
        public string Nationality { get; set; }
        public string NationalIdNo { get; set; }
        public string BirthCertificateNo { get; set; }
        public string PassportNo { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string EmergencyContact { get; set; }
        public int? BloodGroupEnumId { get; set; }
        public string ImagePath { get; set; }
        public int PermanentCountryId { get; set; }
        public int PermanentDivisionId { get; set; }
        public int PermanentDistrictId { get; set; }
        public int PermanentThanaId { get; set; }
        public int? PermanentZoneId { get; set; }
        public string PermanentPsArea { get; set; }
        public string PermanentPostCode { get; set; }
        public string PermanentBlock { get; set; }
        public string PermanentRoadNo { get; set; }
        public string PermanentHouseNo { get; set; }
        public string PermanentFlatNo { get; set; }
        public int PresentCountryId { get; set; }
        public int PresentDivisionId { get; set; }
        public int PresentDistrictId { get; set; }
        public int PresentThanaId { get; set; }
        public int? PresentZoneId { get; set; }
        public string PresentPsArea { get; set; }
        public string PresentPostCode { get; set; }
        public string PresentBlock { get; set; }
        public string PresentRoadNo { get; set; }
        public string PresentHouseNo { get; set; }
        public string PresentFlatNo { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime DBServerDateTime { get; set; }
        public long CreatedUserInfoId { get; set; }

        public static RetailerContactInfoModel ConvertToModel(dynamic retailerContact)
        {
            var model = new RetailerContactInfoModel();
            model.RetailerContactInfoId = retailerContact.retailer_contact_info_id ?? 0;
            model.RetailerInfoId = retailerContact.retailer_info_id ?? 0;
            model.RetailerContactInfoCode = retailerContact.retailer_contact_info_code ?? "";
            model.PersonName = retailerContact.person_name ?? "";
            model.PersonDesignation = retailerContact.person_designation ?? "";
            model.FatherName = retailerContact.father_name ?? "";
            model.MotherName = retailerContact.mother_name ?? "";
            model.DateOfBirth = retailerContact.date_of_birth;
            model.ReligionEnumId = retailerContact.religion_enum_id ?? 0;
            model.Nationality = retailerContact.nationality ?? "";
            model.NationalIdNo = retailerContact.national_id_no ?? "";
            model.BirthCertificateNo = retailerContact.birth_certificate_no ?? "";
            model.PassportNo = retailerContact.passport_no ?? "";
            model.Mobile = retailerContact.mobile ?? "";
            model.Phone = retailerContact.phone ?? "";
            model.Email = retailerContact.email ?? "";
            model.EmergencyContact = retailerContact.emergency_contact ?? "";
            model.BloodGroupEnumId = retailerContact.blood_group_enum_id ?? 0;
            model.ImagePath = retailerContact.image_path ?? "";
            model.PermanentCountryId = retailerContact.permanent_country_id ?? 0;
            model.PermanentDivisionId = retailerContact.permanent_division_id ?? 0;
            model.PermanentDistrictId = retailerContact.permanent_district_id ?? 0;
            model.PermanentThanaId = retailerContact.permanent_thana_id ?? 0;
            model.PermanentZoneId = retailerContact.permanent_zone_id ?? 0;
            model.PermanentPsArea = retailerContact.permanent_ps_area ?? "";
            model.PermanentPostCode = retailerContact.permanent_post_code ?? "";
            model.PermanentBlock = retailerContact.permanent_block ?? "";
            model.PermanentRoadNo = retailerContact.permanent_road_no ?? "";
            model.PermanentHouseNo = retailerContact.permanent_house_no ?? "";
            model.PermanentFlatNo = retailerContact.permanent_flat_no ?? "";
            model.PresentCountryId = retailerContact.present_country_id ?? 0;
            model.PresentDivisionId = retailerContact.present_division_id ?? 0;
            model.PresentDistrictId = retailerContact.present_district_id ?? 0;
            model.PresentThanaId = retailerContact.present_thana_id ?? 0;
            model.PresentZoneId = retailerContact.present_zone_id ?? 0;
            model.PresentPsArea = retailerContact.present_ps_area ?? "";
            model.PresentPostCode = retailerContact.present_post_code ?? "";
            model.PresentBlock = retailerContact.present_block ?? "";
            model.PresentRoadNo = retailerContact.present_road_no ?? "";
            model.PresentHouseNo = retailerContact.present_house_no ?? "";
            model.PresentFlatNo = retailerContact.present_flat_no ?? "";
            return model;
        }
    }     

}


