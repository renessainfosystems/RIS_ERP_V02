using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.PIMS.Enum.GlobalEnumList;

namespace Auth.Model.PIMS.ViewModel
{
    public class EmployeeViewModel
    {        
        public EmployeeViewModel()
        {
            //Constractor
        }
        public long  UserInfoId { get; set; }
        public int CompanyCorporateId { get; set; }
        public int CompanyId { get; set; }
        public int CompanyGroupId { get; set; }

       
        public long EmployeeId { get; set; }
        public string Code { get; set; }
        public int Title_Enum_Id{ get; set; }
        public string EmployeeName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string SurName { get; set; }
        public string FatherName { get; set; }        
        public string MotherName { get; set; }
        public int GenderEnumId { get; set; }
        public int MaritalStatusEnumId { get; set; }
        public string SpouseName { get; set; }
        public DateTime DateOfMarriage { get; set; }
        public string PersonalPhone { get; set; }
        public string OfficialPhone { get; set; }
        public string PersonalEmail { get; set; }
        public string OfficialEmail { get; set; }        
        public DateTime DateOfBirth { get; set; }
        public string IdentificationMark { get; set; }  
        public string PassportNo { get; set; }  
        public string BirthId { get; set; }  
        public string DrivingLicenseNo { get; set; }  
        public int NationalityId { get; set; }  
        public string NationalId { get; set; }  
        public int ReligionEnumId { get; set; }  
        public int CountryOfBirthId { get; set; }  
        public int BloodGroupEnumId { get; set; }  
        public int EthnicityId { get; set; }  
        public int ResidentcialStatusEnumId { get; set; }  
        
        public int? PresentCountryId { get; set; }  
        public int? PresentDivisionId { get; set; }  
        public int? PresentDistrictId { get; set; }  
        public string PresentCity { get; set; }  
        public string PresentPSArea { get; set; }  
        public string PresentPostCode { get; set; }  
        public string PresentBlock { get; set; }  
        public string PresentRoadNo { get; set; }  
        public string PresentHouseNo { get; set; }  
        public string PresentFlatNo { get; set; }  
        public string PresentAddressNote { get; set; }

        //
        public int? PermanentCountryId { get; set; }
        public int? PermanentDivisionId { get; set; }
        public int? PermanentDistrictId { get; set; }
        public string PermanentCity { get; set; }
        public string PermanentPSArea { get; set; }
        public string PermanentPostCode { get; set; }
        public string PermanentBlock { get; set; }
        public string PermanentRoadNo { get; set; }
        public string PermanentHouseNo { get; set; }
        public string PermanentFlatNo { get; set; }
        public string PermanentAddressNote { get; set; }
        public long EmployeeOldId { get; set; }
        public string EmployeeOldCode { get; set; }        //            //
        public bool IsActive { get; set; }
        public string TitleName { get; set; }
        public string GenderName { get; set; }
        public string ReligionName { get; set; }        
        public string BloodGroupName { get; set; }
        public string ResidencialStatusName { get; set; }
        public string MaritalName { get; set; }
        public string NationalityName { get; set; }
        public string CountryOfBirthName { get; set; }
        public string EmployeeImagePath { get; set; }
        public string SignatureImagePath { get; set; }
        public string EmployeeNameCode { get { return "[" + this.Code + "] " + this.EmployeeName; } }
        public string EmployeeOfficial { get { return this.position_name + ", " + this.department_name + ", " + this.location_name; } }

        public string position_name { get; set; }
        public string department_name { get; set; }
        public string location_name { get; set; }
        public string designation_name { get; set; }
        public string confirmation_status_name { get; set; }
        public string company_name { get; set; }
        public string job_domicile_name { get; set; }
        public string service_type_name { get; set; }
        public string working_action_name { get; set; }
        public string job_location_name { get; set; }

        public static EmployeeViewModel ConvertToModel(dynamic user)
        {
         
            var model = new EmployeeViewModel();
            model.position_name = user.position_name ?? "";
            model.department_name = user.department_name ?? "";
            model.location_name = user.location_name ?? "";
            model.designation_name = user.designation_name ?? "";
            model.confirmation_status_name = user.confirmation_status_name ?? "";
            model.company_name = user.company_name ?? "";
            model.job_domicile_name = user.job_domicile_name ?? "";
            model.service_type_name = user.service_type_name ?? "";
            model.working_action_name = user.working_action_name ?? "";
            model.job_location_name = user.job_location_name ?? "";

            model.EmployeeId = user.employee_id ??0;
            model.Code = user.code ?? "";
            model.EmployeeName = user.employee_name ?? "";
            model.FirstName = user.first_name ?? "";
            model.MiddleName = user.middle_name ?? "";
            model.SurName = user.sur_name ?? "";
          
            model.FatherName = user.father_name ?? "";
            model.MotherName = user.mother_name ?? "";
            model.GenderEnumId = user.gender_enum_id ?? "";
            model.Title_Enum_Id = user.title_enum_id ?? "";
            model.MaritalStatusEnumId = user.marital_status_enum_id ?? "";
            model.SpouseName = user.spouse_name ?? "";
            model.DateOfMarriage = user.date_of_marriage ?? "";
            model.PersonalPhone = user.personal_phone ?? "";
            model.OfficialPhone = user.official_phone ?? "";
            model.PersonalEmail = user.personal_email ?? "";
            model.OfficialEmail = user.official_email ?? "";
            model.DateOfBirth = user.date_of_birth ?? "";
            model.IdentificationMark = user.identification_mark ?? "";
            model.NationalId = user.national_id ?? "";
            model.PassportNo = user.passport_no ?? "";
            model.BirthId = user.birth_id ?? "";
            model.DrivingLicenseNo = user.driving_license_no ?? "";
            model.NationalityId = user.nationality_id ?? "";
            model.ReligionEnumId = user.religion_enum_id ?? "";
            model.CountryOfBirthId = user.country_of_birth_id ?? "";
            model.BloodGroupEnumId = user.blood_group_enum_id ?? "";
            model.EthnicityId = user.ethnicity_id ?? "";
            model.ResidentcialStatusEnumId = user.residentcial_status_enum_id ?? "";

            model.PresentCountryId = user.present_country_id ?? null;
            model.PresentDivisionId = user.present_division_id ?? null;
            model.PresentDistrictId = user.present_district_id ?? null;
            model.PresentCity = user.present_city ?? "";
            model.PresentPSArea = user.present_ps_area ?? "";
            model.PresentPostCode = user.present_post_code ?? "";
            model.PresentBlock = user.present_block ?? "";
            model.PresentRoadNo = user.present_road_no ?? "";
            model.PresentHouseNo = user.present_house_no ?? "";
            model.PresentFlatNo = user.present_flat_no ?? "";
            model.PresentAddressNote = user.present_address_note ?? "";

            model.PermanentCountryId = user.permanent_country_id ?? null;
            model.PermanentDivisionId = user.permanent_division_id ?? null;
            model.PermanentDistrictId = user.permanent_district_id ?? null;
            model.PermanentCity = user.permanent_city ?? "";
            model.PermanentPSArea = user.permanent_ps_area ?? "";
            model.PermanentPostCode = user.permanent_post_code ?? "";
            model.PermanentBlock = user.permanent_block ?? "";
            model.PermanentRoadNo = user.permanent_road_no ?? "";
            model.PermanentHouseNo = user.permanent_house_no ?? "";
            model.PermanentFlatNo = user.permanent_flat_no ?? "";
            model.PermanentAddressNote = user.permanent_address_note ?? "";
          //  model.UserInfoId = user.created_user_id ?? "";
            model.CompanyCorporateId = user.company_corporate_id ?? "";
            model.CompanyGroupId = user.company_group_id ?? "";
            model.CompanyId = user.company_id ?? "";
            model.EmployeeOldId = user.employee_old_id ?? "";
            model.EmployeeOldCode = user.employee_old_code ?? "";
           

            model.TitleName = EnumDisplay.GetDisplayName((EnumEmployeeTittle)user.title_enum_id);
            model.GenderName = EnumDisplay.GetDisplayName((EnumEmployeeGender)user.gender_enum_id);
            model.ReligionName = Enum.GetName(typeof(EnumEmployeeReligion), user.religion_enum_id);//EnumDisplay.GetDisplayName((EnumEmployeeTittle)user.religion_enum_id)
            model.BloodGroupName = EnumDisplay.GetDisplayName((EnumEmployeeBloodGroup)user.blood_group_enum_id);
            model.ResidencialStatusName = EnumDisplay.GetDisplayName((EnumResidencialStatus)user.residentcial_status_enum_id);
            model.MaritalName = EnumDisplay.GetDisplayName((EnumMaritalStatus)user.marital_status_enum_id);

            model.IsActive = user.is_active ?? false;
            model.SignatureImagePath = user.signature_image_path ?? "";
            model.EmployeeImagePath = user.employee_image_path ?? "";



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
