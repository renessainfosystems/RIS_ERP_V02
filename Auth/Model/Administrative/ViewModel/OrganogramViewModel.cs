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
        public string location_name { get; set; }
        public string department { get; set; }
        public int department_id { get; set; }
        public int location_id { get; set; }
        public int company_id { get; set; }
        public int organogram_id { get; set; }

        public static OrganogramViewModel ConvertToModel(dynamic user)
        {
            var model = new OrganogramViewModel();
            model.organogram_id = user.organogram_id ?? 0;           
            model.company_name = user.company_name ?? "";
            model.location_code = user.location_code ?? "";
            model.location_name = user.location_name ?? "";
            model.department = user.department ?? "";
            model.department_id = user.department_id ?? 0;
            model.location_id = user.location_id ?? 0;
            model.company_id = user.company_id ?? 0;
            return model;
        }
    }
}
