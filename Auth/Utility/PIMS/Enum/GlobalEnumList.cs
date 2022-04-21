using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Auth.Utility.PIMS.Enum
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
        #region Employee PIMS
        public enum EnumEmployeeTittle
        {
            [Display(Name = "Mr.")]
            Mr = 1,
            [Display(Name = "Mrs.")]
            Mrs = 2,
            [Display(Name = "Ms.")]
            Ms = 3
        }
        public class EmployeeTittle
        {
         public int title_enum_id { get; set; }
         public string title_enum_name { get; set; }
        }
        public enum EnumEmployeeGender
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
        public class EmployeeGender
        {
            public int gender_enum_id { get; set; }
            public string gender_enum_name { get; set; }
        }  
        public enum EnumEmployeeReligion
        {
            Islam = 1,
            Hindu = 2,
            Cristian = 3,
            Budha = 4
        }
        public class EmployeeReligion
        {
            public int religion_enum_id { get; set; }
            public string religion_enum_name { get; set; }
        } 
        public enum EnumEmployeeBloodGroup
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
        public class EmployeeBloodGroup
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

        #region ENUM: EnumBenefitTypeOnWork
        public enum EnumBenefitTypeOnWork
        {
            [Display(Name = "Time Slot")]
            TimeSlot = 1,
            [Display(Name = "Shift")]
            Shift = 2,
            [Display(Name = "Day Off")]
            DayOff = 3,
            [Display(Name = "Holiday")]
            Holiday = 4,

        }
        public class BenefitTypeOnWork
        {
            public int benefit_work_on_id_enum { get; set; }
            public string benefit_work_on_name_enum { get; set; }
        }
        #endregion
    }
}
