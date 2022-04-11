using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Utility.Administrative.Model
{
    public class Data
    {      
        public int department_id { get; set; }
        public string company_name { get; set; }
        public int company_id { get; set; }
        public int location_id { get; set; }
        public string location_name { get; set; }
        public string department { get; set; }
        public Boolean IsActive { get; set; }
        public int SortingPriority { get; set; }

        public string Node_Name { get; set; }
        public string group_name { get; set; }
        public int Organogram_Id { get; set; }
        public int TreeLavel { get; set; }//0=Company,1=Location,2=Department

    }
    public class Dtotree
    {
        //public string company_name { get; set; }
        //public int company_id { get; set; }
        //public Data data { get; set; }
        public Data data { get; set; }//CompanyInfo
        //public IList<treeLocations> data { get; set; }
        public IList<treeLocations> children { get; set; }//Locations
        
       
    }
    public class treeLocations
    {
        //public int location_id { get; set; }
        //public string location_name { get; set; }
        //public int company_id { get; set; }
        public Data data { get; set; }//Locations
        public IList<Departmenttree> children { get; set; }//department
    }
    public class Departmenttree
    {
        public Data data { get; set; }
    }

    public class Root
    {
       
        public IList<Dtotree> data { get; set; }//Company
    }
}
