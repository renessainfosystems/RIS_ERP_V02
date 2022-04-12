using Auth.Model.Procurement.Model;
using Auth.Service;
using Auth.Utility.Procurement.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using FromBodyAttribute = Microsoft.AspNetCore.Mvc.FromBodyAttribute;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

/// <summary>
/// Created By Adnan Amin
/// Dated: 13/01/2022
/// </summary>
/// 




namespace Auth.Controllers.Procurement
{
    // [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]

    
    public class SupplierApplicationController : ControllerBase
    {

        private ISupplierApplicationRepository _supplierApplicationRepository;
      //  private IConfiguration _config;

        public SupplierApplicationController(ISupplierApplicationRepository supplierApplicationRepository)
        {
            _supplierApplicationRepository = supplierApplicationRepository;
           // _config = config;
        }

        [HttpGet]
        public async Task<ActionResult> GetSupplierId()
        {

            return Ok(await _supplierApplicationRepository.GetSupplierById());
        }

        [HttpGet]
        public async Task<ActionResult> GetSupplierBasicInfoBySupplierId(int supplier_id)
        {

            return Ok(await _supplierApplicationRepository.GetSupplierBasicInfoBySupplierId(supplier_id));
        }

        [HttpGet]
        public async Task<dynamic> GetAllSupplierInfo()
        {

            return await _supplierApplicationRepository.GetAllSupplierInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetAllConfirmSupplierInfo()
        {

            return await _supplierApplicationRepository.GetAllConfirmSupplierInfo();
        }

        //Basic
        [HttpPost]
        public async Task<dynamic> Create([FromForm] SupplierApplication supplierApplication)

        {
            if (supplierApplication.ImageUpload != null)
            {
                supplierApplication.supplier_logo = GetSupplierLogoPath(supplierApplication.ImageUpload);
            }
            var result = await _supplierApplicationRepository.IUDSupplierApplication(supplierApplication, (int)GlobalEnumList.DBOperation.Create);
            return result;
        }




        [HttpPost]
        public async Task<dynamic> Update([FromForm] SupplierApplication supplierApplication)
        {
            if (supplierApplication.ImageUpload != null)
            {
                supplierApplication.supplier_logo = GetSupplierLogoPath(supplierApplication.ImageUpload);
            }
            return await _supplierApplicationRepository.IUDSupplierApplication(supplierApplication, (int)GlobalEnumList.DBOperation.Update);
            //return await _supplierApplicationRepository.IUDSupplierApplication(supplierApplication, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Delete([FromBody] SupplierApplication supplierApplication)
        {
            var supplierInfo = _supplierApplicationRepository.GetSupplierBasicInfoBySupplierId(supplierApplication.supplier_id).Result;
            return await _supplierApplicationRepository.IUDSupplierApplication(supplierApplication, (int)GlobalEnumList.DBOperation.Delete);
            if (!string.IsNullOrEmpty(supplierInfo.UserImagePath))
            {
                deleteImage(supplierInfo.UserImagePath);

            }
        }

        [HttpPost]
        public async Task<dynamic> Submit([FromBody] SupplierApplication supplierApplication)
        {
            return await _supplierApplicationRepository.IUDSupplierApplication(supplierApplication, (int)GlobalEnumList.DBOperation.Submit);
        }


        //Business

        [HttpPost]
        public async Task<dynamic> UpdateBusinessData([FromBody] SupplierBusiness supplierBusiness)
        {
            return await _supplierApplicationRepository.IUDSupplierBusinessData(supplierBusiness, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpGet]
        public async Task<ActionResult> GetBusinessDataBySupplierId(int supplier_id)
        {
            return Ok(await _supplierApplicationRepository.GetBusinessDataBySupplierId(supplier_id));
        }

        [HttpGet]
        public async Task<dynamic> GetBusinessSubSectorBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetBusinessSubSectorBySupplierId(supplier_id);
        }

        [HttpGet]
        public async Task<dynamic> GetBusinessEcommerceBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetBusinessEcommerceBySupplierId(supplier_id);
        }

        //Association
        [HttpPost]
        public async Task<dynamic> updateAssociationData([FromBody] SupplierAssociation supplierAssociation)
        {
            return await _supplierApplicationRepository.IUDSupplierAssociationData(supplierAssociation, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpGet]
        public async Task<dynamic> GetAssociationBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetAssociationBySupplierId(supplier_id);
        }

        [HttpPost]
        public async Task<dynamic> DeleteAssociationBySupplierAssociationId([FromBody] SupplierAssociation supplierAssociation)

        {
            return await _supplierApplicationRepository.IUDSupplierAssociationData(supplierAssociation, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpPost]
        public async Task<dynamic> UpdateDocumentData([FromForm] SupplierDocument supplierDocument)

        {
            if (supplierDocument.FileUpload != null)
            {
                supplierDocument.file_path = GetSupplierDocPath(supplierDocument.FileUpload);
            }
            return await _supplierApplicationRepository.IUDSupplierDocumentData(supplierDocument, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpGet]
        public async Task<dynamic> GetLegalDocumentBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetLegalDocumentBySupplierId(supplier_id);
        }

        [HttpPost]
        public async Task<dynamic> DeleteDocumentBySupplierDocumentId([FromBody] SupplierDocument supplierDocument)

        {
            return await _supplierApplicationRepository.IUDSupplierDocumentData(supplierDocument, (int)GlobalEnumList.DBOperation.Delete);
        }

        //Location

        [HttpPost]
        public async Task<dynamic> UpdateLocationData([FromBody] SupplierLocation supplierLocation)
        {
            return await _supplierApplicationRepository.IUDSupplierLocationData(supplierLocation, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> DeleteLocationBySupplierLocationId([FromBody] SupplierLocation supplierLocation)
        {
            return await _supplierApplicationRepository.IUDSupplierLocationData(supplierLocation, (int)GlobalEnumList.DBOperation.Delete);
        }


        [HttpGet]
        public async Task<dynamic> GetLocationBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetLocationBySupplierId(supplier_id);
        }

        //Warehouse
        [HttpPost]
        public async Task<dynamic> UpdateWarehouseData([FromBody] SupplierWarehouse supplierWarehouse)
        {
            return await _supplierApplicationRepository.IUDSupplierWarehouseData(supplierWarehouse, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> DeleteWarehouseBySupplierWarehouseId([FromBody] SupplierWarehouse supplierWarehouse)
        {
            return await _supplierApplicationRepository.IUDSupplierWarehouseData(supplierWarehouse, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetWarehouseBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetWarehouseBySupplierId(supplier_id);
        }

        [HttpGet]
        public async Task<dynamic> getAllWarehouseByLocationId(int location_id)
        {
            return await _supplierApplicationRepository.getAllWarehouseByLocationId(location_id);
        }


        //Contact
        [HttpPost]
        public async Task<dynamic> UpdateContactData([FromForm] SupplierContact supplierContact)

        {
            if (supplierContact.FileUpload != null)
            {
                supplierContact.nid_file_path = GetSupplierDocPath(supplierContact.FileUpload);
            }
            return await _supplierApplicationRepository.UpdateContactData(supplierContact, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> DeleteContactInfoBySupplierContactId([FromBody] SupplierContact supplierContact)
        {
            return await _supplierApplicationRepository.UpdateContactData(supplierContact, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpPost]
        public async Task<dynamic> UpdateContactLocationData([FromBody] SupplierLocationContact supplierLocationContact)
        {
            return await _supplierApplicationRepository.UpdateContactLocationData(supplierLocationContact, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> DeleteLocationWiseContactBySupplierContactLocationId([FromBody] SupplierLocationContact supplierLocationContact)
        {
            return await _supplierApplicationRepository.UpdateContactLocationData(supplierLocationContact, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetContactBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetContactBySupplierId(supplier_id);
        }

        [HttpGet]
        public async Task<dynamic> GetLocationWiseContactBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetLocationWiseContactBySupplierId(supplier_id);
        }


        // Financial

        [HttpPost]
        public async Task<dynamic> UpdateMobileBankingData([FromBody] SupplierMobileFinancialService supplierMobileFinancialService)
        {
            return await _supplierApplicationRepository.IUDMobileBankingData(supplierMobileFinancialService, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> DeleteMFSAccountBySupplierMFSAccountId([FromBody] SupplierMobileFinancialService supplierMobileFinancialService)
        {
            return await _supplierApplicationRepository.IUDMobileBankingData(supplierMobileFinancialService, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpPost]
        public async Task<dynamic> UpdateBankAccountData([FromBody] SupplierBankAccount supplierBankAccount)
        {
            return await _supplierApplicationRepository.IUDBankAccountData(supplierBankAccount, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> DeleteBankAccountBySupplierBankAccountId([FromBody] SupplierBankAccount supplierBankAccount)
        {
            return await _supplierApplicationRepository.IUDBankAccountData(supplierBankAccount, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpPost]
        public async Task<dynamic> UpdateCreditDepositData([FromBody] SupplierCreditDeposit supplierCreditDeposit)
        {
            //if (supplierApplication.ImageUpload != null)
            //{
            //    supplierApplication.supplier_logo = GetImagePath(supplierApplication.ImageUpload);
            //}
            return await _supplierApplicationRepository.UpdateCreditDepositData(supplierCreditDeposit, (int)GlobalEnumList.DBOperation.Update);
        }


        [HttpGet]
        public async Task<dynamic> GetAllMFSBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetAllMFSBySupplierId(supplier_id);
        }

        [HttpGet]
        public async Task<dynamic> GetAllBankAccountBySupplierId(int supplier_id)
        {
            return await _supplierApplicationRepository.GetAllBankAccountBySupplierId(supplier_id);
        }

        [HttpGet]
        public async Task<dynamic> getAllSupplierCreditDeposit(int supplier_id)
        {
            return await _supplierApplicationRepository.getAllSupplierCreditDeposit(supplier_id);
        }

        [HttpGet]
        public async Task<ActionResult> getAllSupplierCreditHistory(int supplier_id)
        {
            return Ok(await _supplierApplicationRepository.getAllSupplierCreditHistory(supplier_id));
        }

        // Get Bank By Bank Type ID
        [HttpGet]
        public async Task<ActionResult> getAllBankCboListByBankTypeId(int bank_type_id)
        {
            return Ok(await _supplierApplicationRepository.getAllBankCboListByBankTypeId(bank_type_id));
        }


        // Image & File Path

        private string GetSupplierLogoPath(IFormFile image)
        {
            var folderName = Path.Combine("assets", "images", "procurement", "supplierlogo");
            var directoryName = Directory.GetCurrentDirectory();

            //var pathToSave1 = Path.Combine(Directory.GetCurrentDirectory().Trim(), folderName);

            var pathToSave = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\procurement\\supplierlogo");
            if (image.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');

                var uniquefileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(fileName);

                var fullPath = Path.Combine(pathToSave, uniquefileName);
                var dbPath = Path.Combine(folderName, uniquefileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                return dbPath = dbPath.Replace(@"\", @"/");
            }
            return "";
        }

        private string GetSupplierDocPath(IFormFile image)
        {
            var folderName = Path.Combine("assets", "images", "procurement", "supplierdocument");
            var directoryName = Directory.GetCurrentDirectory();

            //var pathToSave1 = Path.Combine(Directory.GetCurrentDirectory().Trim(), folderName);

            var pathToSave = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\procurement\\supplierdocument");
            if (image.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');

                var uniquefileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(fileName);

                var fullPath = Path.Combine(pathToSave, uniquefileName);
                var dbPath = Path.Combine(folderName, uniquefileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                return dbPath = dbPath.Replace(@"\", @"/");
            }
            return "";
        }

        private void deleteImage(string imagepath)
        {
            FileInfo file = new FileInfo(imagepath);
            var directoryPath = ("\\WebApp\\src\\assets\\images\\supplierlogo");
            var path = directoryPath + "\\" + file.Name;
            System.IO.File.Delete(path);
        }

        // Assessment
        [HttpGet]
        public async Task<dynamic> getAllSupplierMasterAssessmentCriteria(int supplier_id)
        {
            return await _supplierApplicationRepository.getAllSupplierMasterAssessmentCriteria(supplier_id);
        }



        // Approve & Reject
        [HttpPost]
        public async Task<dynamic> ApproveSupplier([FromBody] SupplierInfoFeedbackDetail supplierInfoFeedbackDetail)
        {

            return await _supplierApplicationRepository.ApproveSupplier(supplierInfoFeedbackDetail, (int)GlobalEnumList.DBOperation.Create);

        }

        [HttpPost]
        public async Task<dynamic> RejectSupplier([FromBody] SupplierInfoFeedbackDetail supplierInfoFeedbackDetail)
        {
            return await _supplierApplicationRepository.RejectSupplier(supplierInfoFeedbackDetail, (int)GlobalEnumList.DBOperation.Create);
        }


    }
}
