using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;




/// <summary>
/// Created by Adnan
/// Dated: 22/12/2021
/// </summary>
namespace Auth.Model.Procurement.Model
{
    public class SupplierWarehouse
    {
        //public SupplierWarehouse()
        //{

        //    supplier_id = 0;

        //}

        public int supplier_warehouse_id { get; set; }
        public int supplier_id { get; set; }

        public int supplier_location_id { get; set; }

        public string supplier_location_name { get; set; }

        public string supplier_warehouse_name { get; set; }
        public string add_note { get; set; }
        //public List<WarehouseSession> warehouseSession { get; set; }
    }

    //public class WarehouseSession
    //{
    //    public WarehouseSession()
    //    {
    //        supplier_id = 0;
    //        supplier_location_id = 0;
    //        supplier_location_name = "";
    //        supplier_warehouse_name = "";       
    //        add_note = "";
    //    }
    //    public int supplier_id { get; set; }
    //    public int supplier_location_id { get; set; }

    //    public string supplier_location_name { get; set; }

    //    public string supplier_warehouse_name { get; set; }
    //    public string add_note { get; set; }
    //}
}
