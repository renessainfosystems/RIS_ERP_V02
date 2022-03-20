using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 22/11/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("MFS_Type", Schema = "DBEnum")]
    public class MfsType
    {
        [Key]
        public int mfs_type_id { get; set; }
        public string mfs_type_name { get; set; }

        //public int bank_type_id { get; set; }

        //public string bank_type_name { get; set; }
    }
}
