using System.ComponentModel.DataAnnotations;

namespace Auth.Utility.Party.Enum
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

        #region EnumContinent
        public enum EnumContinent
        {
            [Display(Name = "Asia")]
            Asia = 1,
            [Display(Name = "Europe")]
            Europe = 2,
            [Display(Name = "Africa")]
            Africa = 3,
            [Display(Name = "Australia")]
            Australia = 4,
            [Display(Name = "North America")]
            North_America = 5,
            [Display(Name = "South America")]
            South_America = 6,
            [Display(Name = "Antarctica")]
            Antarctica = 7
        }

        public class Continent
        {
            public int continent_enum_id { get; set; }
            public string continent_enum_name { get; set; }
        } 
        #endregion

        #region  EnumDomicile
        public enum EnumDomicile
        {
            [Display(Name = "National")]
            National = 1,
            [Display(Name = "Foreign")]
            Foreign = 2,
            [Display(Name = "International")]
            International = 3,
            [Display(Name = "United Nations")]
            United_Nations = 4,
            [Display(Name = "Joint Venture")]
            Joint_Venture = 5
        }

        public class Domicile
        {
            public int domicile_enum_id { get; set; }
            public string domicile_enum_name { get; set; }
        }

        #endregion

        #region  EnumSecurityType
        public enum EnumSecurityType
        {
            [Display(Name = "Full Secured")]
            FullSecured = 1,
            [Display(Name = "Partial Secured")]
            PartialSecured = 2,
            [Display(Name = "Unsecured")]
            Unsecured = 3           
        }

        public class SecurityType
        {
            public int security_type_enum_id { get; set; }
            public string security_type_enum_name { get; set; }
        }

        #endregion

        #region  EnumPreferred Method
        public enum EnumPreferredMethod
        {
            [Display(Name = "Cash")]
            Cash = 1,
            [Display(Name = "Cheque")]
            Cheque = 2
        }
 
        public class PreferredMethod
        {
            public int prefered_method_enum_id { get; set; }
            public string prefered_method_enum_name { get; set; }
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
            public int organization_type_enum_id { get; set; }
            public string organization_type_enum_name { get; set; }
        }
        #endregion

        #region  ENUM: EnumBusinessActivities
        public enum EnumBusinessActivities
        {
            [Display(Name = "Trader")]
            Trader = 1,
            [Display(Name = "Manufacturer")]
            Manufacturer = 2,
            [Display(Name = "Wholesaler")]
            Wholesaler = 3,
            [Display(Name = "Retailer")]
            Retailer = 4,
            [Display(Name = "Buying Office")]
            Buying_Office = 5,
            [Display(Name = "Online Shop")]
            Online_Shop = 6,
            [Display(Name = "Indentor")]
            Indentor = 7

        }

        public class BusinessActivities
        {
            public int business_type_enum_id { get; set; }
            public string business_type_enum_name { get; set; }
        }
        #endregion

        #region Party

        public enum EnumGender
        {
            [Display(Name = "Male")]
            Male = 1,
            [Display(Name = "Female")]
            Female = 2,
            [Display(Name = "Transgender")]
            Transgender = 3,
            [Display(Name = "Not Sharable")]
            Not_Sharable =4
        }
        public class Gender
        {
            public int gender_enum_id { get; set; }
            public string gender_enum_name { get; set; }
        }  
        public enum EnumReligion
        {
            [Display(Name = "Islam")]
            Islam = 1,
            [Display(Name = "Hindu")]
            Hindu = 2,
            [Display(Name = "Christian")]
            Cristian = 3,
            [Display(Name = "Buddha")]
            Buddha = 4
        }
        public class Religion
        {
            public int religion_enum_id { get; set; }
            public string religion_enum_name { get; set; }
        } 
        public enum EnumBloodGroup
        {
            [Display(Name = "A(+)")]
            A_positive = 1,
            [Display(Name = "A(-)")]
            A_nagitive = 2,
            [Display(Name = "B(+)")]
            B_positive = 3,
            [Display(Name = "B(-)")]
            B_nagitive = 4,           
            [Display(Name = "O(+)")]
            O_positive = 5,
            [Display(Name = "O(-)")]
            O_nagitive = 6,
            [Display(Name = "AB(+)")]
            AB_positive = 7,
            [Display(Name = "AB(-)")]
            AB_nagitive = 8
        }
        public class BloodGroup
        {
            public int blood_group_enum_id { get; set; }
            public string blood_group_enum_name { get; set; }
        }

        public enum EnumResidencialStatus
        {
            [Display(Name = "Resident")]
            Resident = 1,
            [Display(Name = "Non Resident")]
            NonResident = 2
        }
        public class ResidencialStatus
        {
            public int residentcial_status_enum_id { get; set; }
            public string residentcial_status_enum_name { get; set; }
        }
        public enum EnumMaritalStatus
        {
            [Display(Name = "Single")]
            Single = 1,
            [Display(Name = "Married")]
            Married = 2,
            [Display(Name = "Separated")]
            Separated = 3,
            [Display(Name = "Divorced")]
            Divorced = 4,
            [Display(Name = "Widow")]
            Widow = 5,
            [Display(Name = "Not Sharable")]
            NotSharable = 6
        }
        public class MaritalStatus
        {
            public int marital_status_enum_id { get; set; }
            public string marital_status_enum_name { get; set; }
        }
        #endregion

    }
}
