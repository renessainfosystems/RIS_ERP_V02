using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static Auth.Utility.Procurement.Enum.GlobalEnumList;

namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierAssociationViewModel
    {
        public int supplier_association_id { get; set; }
        public int supplier_id { get; set; }
        public int association_id { get; set; }
        public string association_name { get; set; }
        public int membership_type_enum_id { get; set; }
        public string membership_type_enum_name { get; set; }
        public string association_number { get; set; }
        public DateTime start_date { get; set; }

        public string start_date_str { get; set; }

        public static SupplierAssociationViewModel ConvertToModelForAssociation(dynamic supplierAssociation)
        {

            var model = new SupplierAssociationViewModel();

            model.supplier_id = supplierAssociation.supplier_id;
            model.supplier_association_id = supplierAssociation.supplier_association_id;
            model.association_id = supplierAssociation.association_id;
            model.association_name = supplierAssociation.association_name ?? "";
            model.membership_type_enum_id = supplierAssociation.membership_type_enum_id;
            model.membership_type_enum_name = EnumDisplay.GetDisplayName((EnumMembershipTypes)supplierAssociation.membership_type_enum_id);
            model.association_number = supplierAssociation.association_number ?? "";
            model.start_date = supplierAssociation.start_date ?? "";
            model.start_date_str = supplierAssociation.start_date_str ?? "";

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
