using System;

namespace Auth.Model.Auth.ViewModel
{
    public class UserViewModel
    {
        public long  UserInfoId { get; set; }
        public int CompanyCorporateId { get; set; }
        public int CompanyId { get; set; }

        public int CompanyGroupId { get; set; }
        public string UserName { get; set; }
        public int EmployeeId { get; set; }
        public Boolean IsActive { get; set; }
        public string LoginId { get; set; }
        public string EmailAddress { get; set; }
        public string MobileNo { get; set; }
        public string Remarks { get; set; }
        public string Password { get; set; }
        public string UserImagePath { get; set; }
        public string SignatureImagePath { get; set; }
        public string UserTypeEnumName { get; set; }
        public int UserTypeEnumId { get; set; }
        public string NationalId { get; set; }
        public static UserViewModel ConvertToModel(dynamic user)
        {
         
            var model = new UserViewModel();
            model.UserInfoId = user.user_info_id;
            model.LoginId = user.login_id ??"";
            model.EmployeeId = user.employee_id ??0;
            model.UserName = user.user_name ?? "";
            model.IsActive = user.is_active ?? false;
            model.EmailAddress = user.email_address ??"";
            model.MobileNo = user.mobile_no ?? "";
            model.Remarks = user.remarks ??"";
            model.Password = user.password ?? "";
            model.SignatureImagePath = user.signature_image_path ?? "";
            model.UserImagePath = user.user_image_path ?? "";
            //model.UserTypeEnumName = Enum.GetName(typeof(EnumUserType), user.user_type_enum_id);
            model.UserTypeEnumId = user.user_type_enum_id??0;
            model.NationalId = user.national_id;
            return model;
        }

        public static UserViewModel ConvertToLoginModel(dynamic user)
        {

            var model = new UserViewModel();
            model.UserInfoId = user.user_info_id;
            model.CompanyCorporateId = user.company_corporate_id;
            model.CompanyId = user.company_id;
            model.CompanyGroupId = user.company_group_id;
            model.LoginId = user.login_id ??"";
            model.EmployeeId = user.employee_id ?? 0;
            model.UserName = user.user_name ??"";
            model.IsActive = user.is_active ??false;
            model.EmailAddress = user.email_address ??"";
            model.MobileNo = user.mobile_no ??"";
            model.Password = user.password ??"";

            return model;
        }
    }

}
