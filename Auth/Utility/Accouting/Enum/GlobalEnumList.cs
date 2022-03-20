using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Utility.Accounting.Enum
{
    public class GlobalEnumList
    {
        #region  ENUM: DBOperation
        public enum DBOperation
        {
            Create = 1,
            Update = 2,
            Delete = 3,
            Approve = 4
        }
        #endregion


        #region ENUM: EnumUserType
        public enum EnumUserType
        {
            [Display(Name = "Super User")]
            SuperUser  = 1,
            [Display(Name = "General User")]
            GeneralUser= 2
        }
        public class UserType
        {
            public int user_type_enum_id { get; set; }
            public string user_type_enum_name { get; set; }
        }
        #endregion

        #region  ENUM: EnumContinent
        /// <summary>
        /// Name: Jahid
        /// This enum is for Continent
        /// Date: 15/11/2021
        /// </summary>
        public enum EnumContinent
        {
            [Display(Name = "Asia")]
            Asia =1,
            [Display(Name = "Europe")]
            Europe =2,
            [Display(Name = "Africa")]
            Africa =3,
            [Display(Name = "Australia")]
            Australia =4,
            [Display(Name = "North America")]
            North_America =5,
            [Display(Name = "South America")]
            South_America =6,
            [Display(Name = "Antarctica")]
            Antarctica =7
        }
        
        public class Continent
        {
            public int continent_enum_id { get; set; }
            public string continent_enum_name { get; set; }
        }
        #endregion

        #region ENUM: EnumAuthorizationEvent
        public enum EnumAuthorizationEvent
        {
            //Common Events            
            New=1,
            Edit=2,
            View=3,
            Delete=4,
            Activity=5,
            Search=6,//find
            Adv_Search=7,
            Up=8,
            Down=9

            //HR-Attendance
            //HR-Payroll
            //Accounting
            //Inventory (Vat)
        }
        public class AuthorizationEvent
        {
            public int event_enum_id { get; set; }
            public string event_enum_name { get; set; }
        }
        #endregion

        #region EnumDepartmentFunctionality
        public enum EnumDepartmentFunctionality
        {
            General =1,
            Manufacturing =2
        }
        public class DepartmentFunctionality
        {
            public int department_functionality_enum_id { get; set; }
            public string department_functionality_enum_name { get; set; }
        }
        #endregion

        #region EnumDepartmentType
        public enum EnumDepartmentType
        {
            Department =1,
            Section =2,
            Team=3,
            Process=4,
            Line=5,
            Shop=6
        }
        public class DepartmentType
        {
            public int department_type_enum_id { get; set; }
            public string department_type_enum_name { get; set; }
        }
        #endregion

        #region EnumCompanyBusinessNature
        public enum EnumBusinessNature
        {
            [Display(Name = "Trading")]
            Trading =1,
            [Display(Name = "Menufacture")]
            Menufacture =2,
            [Display(Name = "Wholesaler")]
            Wholesaler =3,
            [Display(Name = "Retailer")]
            Retailer =4,
            [Display(Name = "Buying House")]
            Buying_House =5,
            [Display(Name = "Online Shop")]
            Online_Shop = 6,
            [Display(Name = "Indentor")]
            Indentor =7,
            [Display(Name = "Importer")]
            Importer = 8
        }
        public class BusinessNature
        {
            public int company_type_enum_id { get; set; }
            public string company_type_enum_name { get; set; }
        }
        #endregion

        #region EnumVatApplicable
        public enum EnumVatApplicable
        {

            Vatable = 1,
            Exempted = 2         
        }
        public class VatApplicable
        {
            public int vat_applicable_type_enum_id { get; set; }
            public string vat_applicable_type_enum_name { get; set; }
        }

        #endregion

        #region EnumSubOrdinateLine
        public enum EnumSubOrdinateLine
        {

            [Display(Name = "Solid Line")]
            Solid_Line = 1,
            [Display(Name = "Dotted Line")]
            Dotted_Line = 2,
            [Display(Name = "Mixed Line")]
            Mixed_Line =3
        }
        public class SubOrdinateLine
        {
            public int sub_ordinate_line_enum_id { get; set; }
            public string sub_ordinate_line_enum_name { get; set; }
        }

        #endregion

        #region EnumSalary
        public enum EnumSalary
        {

            Gross = 1,
            Basic = 2
        }
        public class Salary
        {
            public int increment_on_enum_id { get; set; }
            public string increment_on_enum_name { get; set; }
        }

        #endregion

        #region  ENUM: EnumOrganizationType
        /// <summary>
        /// Name: Adnan
        /// This enum is for Organization Type
        /// Date: 15/11/2021
        /// </summary>
        public enum EnumOrganizationType
        {
            [Display(Name = "Business Associations")]
            Business_Associations = 1,
            [Display(Name = "Non Business Associations")]
            Non_Business_Associations = 2,
            [Display(Name = "Academic Institutions")]
            Academic_Institutions = 3,
            [Display(Name = "Professional Institutions")]
            Professional_Institutions = 4,
            [Display(Name = "Chambers")]
            Chambers = 5,
            [Display(Name = "Clubs")]
            Clubs = 6,
            [Display(Name = "Society")]
            Society = 7,
            [Display(Name = "Alumni")]
            Alumni = 8
        }

        public class OrganizationType
        {
            public int organization_type_id_enum { get; set; }
            public string organization_type_name_enum { get; set; }
        }
        #endregion

    }
}
