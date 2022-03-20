using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierWarehouseViewModel
    {
        public int SupplierId { get; set; }
        public string SupplierWarehouseName { get; set; }
        public int SupplierLocationId { get; set; }
        public string AddNote { get; set; }

        public static SupplierWarehouseViewModel ConvertToModelForWarehouse(dynamic SupplierWarehouse)
        {

            var model = new SupplierWarehouseViewModel();

            model.SupplierId = SupplierWarehouse.supplier_id;
            model.SupplierWarehouseName = SupplierWarehouse.supplier_warehouse_name ?? "";
            model.SupplierLocationId = SupplierWarehouse.supplier_location_id ?? 0;
            model.AddNote = SupplierWarehouse.add_note ?? "";

            return model;


        }
    }
}
