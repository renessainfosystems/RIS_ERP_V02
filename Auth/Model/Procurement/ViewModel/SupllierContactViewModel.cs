using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static Auth.Utility.PIMS.Enum.GlobalEnumList;


namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierContactViewModel
    {
        public int supplier_contact_id { get; set; }
        public int supplier_id { get; set; }
        public int contact_type_id { get; set; }
        public string contact_person_name { get; set; }
        public string contact_type_name { get; set; }
        public string country_name { get; set; }

        public DateTime date_of_birth { get; set; }
        public string date_of_birth_str { get; set; }
        public string designation_name { get; set; }
        public string religion_enum_name { get; set; }
        public string gender_enum_name { get; set; }
        public string marital_status_enum_name { get; set; }
        


        public static SupplierContactViewModel
 ConvertToModelForContact(dynamic SupplierContact)
        {

            var model = new SupplierContactViewModel();
            model.supplier_contact_id= SupplierContact.supplier_contact_id;
            model.supplier_id = SupplierContact.supplier_id;
            model.contact_type_id = SupplierContact.contact_type_id ?? 0;
            model.contact_person_name = SupplierContact.contact_person_name;
            model.contact_type_name = SupplierContact.contact_type_name ?? "";
            model.country_name = SupplierContact.country_name;
            model.date_of_birth = SupplierContact.date_of_birth ?? "";
            model.date_of_birth_str = SupplierContact.date_of_birth_str ?? "";
            model.designation_name = SupplierContact.designation_name;
           // model.religion_enum_name = EnumContactDisplay.GetDisplayName((EnumEmployeeReligion)SupplierContact.religion_enum_id>0);
            model.gender_enum_name = EnumContactDisplay.GetDisplayName((EnumEmployeeGender)SupplierContact.gender_enum_id);
           // model.marital_status_enum_name = EnumContactDisplay.GetDisplayName((EnumMaritalStatus)SupplierContact.marital_status_enum_id);
            return model;

        }

    }

    public static class EnumContactDisplay
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
