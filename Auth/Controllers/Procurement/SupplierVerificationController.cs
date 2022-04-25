using Auth.Model.Procurement.Model;
using Auth.Repository.Procurement;
using Auth.Utility.Procurement.Enum;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Auth.Controllers.Procurement
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SupplierVerificationController : ControllerBase
    {
        //Intialize
        #region Constructor
        private ISupplierVerificationRepository _supplierVerificationRepository;

        public SupplierVerificationController(
            ISupplierVerificationRepository supplierVerificationRepository
            )
        {
            _supplierVerificationRepository = supplierVerificationRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromBody] SupplierVerification supplierVerification)
        {           
            
            return await _supplierVerificationRepository.IUD_SupplierVerification(supplierVerification, (int)GlobalEnumList.DBOperation.Create);
        }

        [HttpPost]
        public async Task<dynamic> Update([FromForm] SupplierVerification supplierVerification)
        {

            return await _supplierVerificationRepository.IUD_SupplierVerification(supplierVerification, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Delete(int supplier_verification_id)
        {
            SupplierVerification oSupplierVerification = new SupplierVerification();        
            return await _supplierVerificationRepository.IUD_SupplierVerification(oSupplierVerification, (int)GlobalEnumList.DBOperation.Delete);
        }


        [HttpPost]
        public async Task<dynamic> Approve(SupplierVerification supplierVerification)
        {

            return await _supplierVerificationRepository.IUD_SupplierVerification(supplierVerification, (int)GlobalEnumList.DBOperation.Approve);
        }

        [HttpGet]
        public async Task<dynamic> GetAllSupplierVerification()
        {
            return await _supplierVerificationRepository.GetAllSupplierVerification();
        }

        [HttpGet]
        public async Task<dynamic> GetSupplierVerificationById(int supplier_verification_id)
        {
            return await _supplierVerificationRepository.GetSupplierVerificationById(supplier_verification_id);
        }

        [HttpGet]
        public async Task<dynamic> GetSupplierVerificationBySupplierId(int supplier_id)
        {
            return await _supplierVerificationRepository.GetSupplierVerificationBySupplierId(supplier_id);
        }
    }
}
