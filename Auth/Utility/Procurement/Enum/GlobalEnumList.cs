using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Utility.Procurement.Enum
{
    public class GlobalEnumList
    {
        #region  ENUM: DBOperation
        public enum DBOperation
        {
            Create = 1,
            Update = 2,
            Delete = 3,
            Approve = 4,
            Submit = 5,
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

        #region  ENUM: EnumDomicile
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
            public int business_activities_enum_id { get; set; }
            public string business_activities_enum_name { get; set; }
        }
        #endregion

        #region  ENUM: EnumMembershipTypes
        public enum EnumMembershipTypes
        {
            [Display(Name = "Associate")]
            Associate = 1,
            [Display(Name = "General")]
            General = 2,
            [Display(Name = "Life Member")]
            Life_Member = 3
        }

        public class MembershipTypes
        {
            public int membership_type_enum_id { get; set; }
            public string membership_type_enum_name { get; set; }
        }
        #endregion

 

    }
}
