using System;

namespace Auth.Model.Party.ViewModel
{
    public class DealerContactInfoViewModel
    {
        public DealerContactInfoViewModel()
        {
            //Constractor
        }
        public int DealerContactInfoId { get; set; }
        public int DealerInfoId { get; set; }
        public string DealerContactInfoCode { get; set; }
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
        public string PermanentCity { get; set; }
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
        public string PresentCity { get; set; }
        public string PresentPostCode { get; set; }
        public string PresentBlock { get; set; }
        public string PresentRoadNo { get; set; }
        public string PresentHouseNo { get; set; }
        public string PresentFlatNo { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime DBServerDateTime { get; set; }
        public long CreatedUserInfoId { get; set; }

        public static DealerContactInfoViewModel ConvertToModel(dynamic dealerContact)
        {
            var model = new DealerContactInfoViewModel();
            model.DealerContactInfoId = dealerContact.dealer_contact_info_id ?? 0;
            model.DealerInfoId = dealerContact.dealer_info_id ?? 0;
            model.DealerContactInfoCode = dealerContact.dealer_contact_info_code ?? "";
            model.PersonName = dealerContact.person_name ?? "";
            model.PersonDesignation = dealerContact.person_designation ?? "";
            model.FatherName = dealerContact.father_name ?? "";
            model.MotherName = dealerContact.mother_name ?? "";
            model.DateOfBirth = dealerContact.date_of_birth;
            model.ReligionEnumId = dealerContact.religion_enum_id ?? 0;
            model.Nationality = dealerContact.nationality ?? "";
            model.NationalIdNo = dealerContact.national_id_no ?? "";
            model.BirthCertificateNo = dealerContact.birth_certificate_no ?? "";
            model.PassportNo = dealerContact.passport_no ?? "";
            model.Mobile = dealerContact.mobile ?? "";
            model.Phone = dealerContact.phone ?? "";
            model.Email = dealerContact.email ?? "";
            model.EmergencyContact = dealerContact.emergency_contact ?? "";
            model.BloodGroupEnumId = dealerContact.blood_group_enum_id ?? 0;
            model.ImagePath = dealerContact.image_path ?? "";
            model.PermanentCountryId = dealerContact.permanent_country_id ?? 0;
            model.PermanentDivisionId = dealerContact.permanent_division_id ?? 0;
            model.PermanentDistrictId = dealerContact.permanent_district_id ?? 0;
            model.PermanentThanaId = dealerContact.permanent_thana_id ?? 0;
            model.PermanentZoneId = dealerContact.permanent_zone_id ?? 0;
            model.PermanentCity = dealerContact.permanent_city ?? "";
            model.PermanentPostCode = dealerContact.permanent_post_code ?? "";
            model.PermanentBlock = dealerContact.permanent_block ?? "";
            model.PermanentRoadNo = dealerContact.permanent_road_no ?? "";
            model.PermanentHouseNo = dealerContact.permanent_house_no ?? "";
            model.PermanentFlatNo = dealerContact.permanent_flat_no ?? "";
            model.PresentCountryId = dealerContact.present_country_id ?? 0;
            model.PresentDivisionId = dealerContact.present_division_id ?? 0;
            model.PresentDistrictId = dealerContact.present_district_id ?? 0;
            model.PresentThanaId = dealerContact.present_thana_id ?? 0;
            model.PresentZoneId = dealerContact.present_zone_id ?? 0;
            model.PresentCity = dealerContact.present_city ?? "";
            model.PresentPostCode = dealerContact.present_post_code ?? "";
            model.PresentBlock = dealerContact.present_block ?? "";
            model.PresentRoadNo = dealerContact.present_road_no ?? "";
            model.PresentHouseNo = dealerContact.present_house_no ?? "";
            model.PresentFlatNo = dealerContact.present_flat_no ?? "";
            return model;
        }
    }     

}


