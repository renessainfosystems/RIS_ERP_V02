using Auth.Model.Party.Model;
using Auth.Repository.Party;
using Auth.Utility.Party.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Auth.Controllers.Party
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RetailerContactInfoController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IRetailerContactInfoRepository _retailerContactInfoRepository;

        public RetailerContactInfoController(
            IRetailerContactInfoRepository retailerContactInfoRepository
            )
        {
            _retailerContactInfoRepository = retailerContactInfoRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] RetailerContactInfo retailerContactInfo)
        {           
            if (retailerContactInfo.ImageUpload != null)
            {
                retailerContactInfo.image_path = GetImagePath(retailerContactInfo.ImageUpload);
            }
            return await _retailerContactInfoRepository.IUD_RetailerContactInfo(retailerContactInfo, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] RetailerContactInfo retailerContactInfo)
        {
            var retailerContactInfodata = _retailerContactInfoRepository.GetRetailerContactInfoById(retailerContactInfo.retailer_info_id).Result;            
            
            if (retailerContactInfo.ImageUpload != null)
            {
                if (!string.IsNullOrEmpty(retailerContactInfodata.ImagePath))
                {
                    deleteImage(retailerContactInfodata.ImagePath);
                }                
                retailerContactInfo.image_path = GetImagePath(retailerContactInfo.ImageUpload);
            }
           return await _retailerContactInfoRepository.IUD_RetailerContactInfo(retailerContactInfo, (int)GlobalEnumList.DBOperation.Update);

        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int retailer_contact_info_id)
        {
            RetailerContactInfo oRetailerContactInfo = new RetailerContactInfo();
            oRetailerContactInfo.retailer_contact_info_id = retailer_contact_info_id;            
            return await _retailerContactInfoRepository.IUD_RetailerContactInfo(oRetailerContactInfo, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetAllRetailerContactInfo()
        {
            return await _retailerContactInfoRepository.GetAllRetailerContactInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetContactInfoByRetailerId(int retailer_info_id)
        {
            return await _retailerContactInfoRepository.GetContactInfoByRetailerId(retailer_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetRetailerContactInfoById(int retailer_contact_info_id)
        {
            return await _retailerContactInfoRepository.GetRetailerContactInfoById(retailer_contact_info_id);
        }
      
        
        private string GetImagePath(IFormFile image)
        {
            var folderName = Path.Combine("UploadedResource", "RetailerImage");
            var directoryName = Directory.GetCurrentDirectory();
            var pathToSave = directoryName+"\\"+ folderName;
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
            try
            {
                FileInfo file = new FileInfo(imagepath);
                var directoryName = Directory.GetCurrentDirectory();
                var folderName = Path.Combine("UploadedResource", "RetailerImage");
                var path = directoryName + "\\"+ folderName + file.Name;
                System.IO.File.Delete(path);
            }
            catch (Exception)
            {
                throw;
            }
        }        
    }
}
