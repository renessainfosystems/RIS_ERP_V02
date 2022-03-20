using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Thana", Schema = "Administrative")]
    public class Thana
    {
        [Key]
        public int thana_id { get; set; }
        public int district_id { get; set; }
        public string thana_code { get; set; }
        public string thana_name { get; set; }
        public string thana_short_name { get; set; }
        public string name_in_local_language { get; set; }
        public string short_name_in_local_language { get; set; }
        public string remarks { get; set; }
    }
}
