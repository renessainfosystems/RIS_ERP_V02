using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace Auth.Model.Auth.Model
{
    [Table("Menu", Schema = "Auth")]
    public class Menu
    {
        
        public Menu()
        {
           
            menu_id = 0;
            menu_parentid = 0;
            menu_name = "";
            is_active = true;
            sorting_priority = 0;
            menu_icon_path = "";
            menu_routing_path = "";
            calling_parameter_value = "";
            calling_parameter_type = "";
            updated_datetime = DateTime.Now;
            created_datetime = DateTime.Now;

        }
        [Key]
        public int menu_id { get; set; }
        public int menu_parentid { get; set; }
        public string menu_name { get; set; }
        public bool is_active { get; set; }
        public int sorting_priority { get; set; }
        public string menu_icon_path { get; set; }
        public string menu_routing_path { get; set; }
        public string calling_parameter_value { get; set; }
        public string calling_parameter_type { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime updated_datetime { get; set; }
        public int created_user_info_id { get; set; }

        public List<MenuEvent> menu_events { get; set; }

    }
}
