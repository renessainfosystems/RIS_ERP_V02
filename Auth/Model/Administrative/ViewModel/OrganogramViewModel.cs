using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Administrative.ViewModel
{
    public class OrganogramViewModel
    {
        public string company_name { get; set; }
        public string location_code { get; set; }
        public string organogram_code { get; set; }
        public string location_name { get; set; }
        public string department { get; set; }
        public int department_id { get; set; }
        public int location_id { get; set; }
        public int company_id { get; set; }
        public int organogram_id { get; set; }
        public Boolean IsActive { get; set; }
        public int SortingPriority { get; set; }
        public static OrganogramViewModel ConvertToModel(dynamic obj)
        {
            var model = new OrganogramViewModel();
            model.organogram_id = obj.organogram_id ?? 0;           
            model.company_name = obj.company_name ?? "";
            model.location_code = obj.location_code ?? "";
            model.organogram_code = obj.organogram_code ?? "";
            model.location_name = obj.location_name ?? "";
            model.department = obj.department ?? "";
            model.department_id = obj.department_id ?? 0;
            model.location_id = obj.location_id ?? 0;
            model.company_id = obj.company_id ?? 0;
            model.IsActive = obj.is_active ?? 0;
            model.SortingPriority = obj.sorting_priority ?? 0;
            return model;
        }
    }
}
