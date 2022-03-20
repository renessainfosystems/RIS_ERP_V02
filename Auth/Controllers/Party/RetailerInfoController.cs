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
    public class RetailerInfoController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IRetailerInfoRepository _retailerInfoRepository;

        public RetailerInfoController(
            IRetailerInfoRepository retailerInfoRepository
            )
        {
            _retailerInfoRepository = retailerInfoRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] RetailerInfo retailerInfo)
        {           
            if (retailerInfo.ImageUpload != null)
            {
                retailerInfo.image_path = GetImagePath(retailerInfo.ImageUpload);
            }
            return await _retailerInfoRepository.IUD_RetailerInfo(retailerInfo, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] RetailerInfo retailerInfo)
        {
            var retailerInfodata = _retailerInfoRepository.GetRetailerInfoById(retailerInfo.retailer_info_id).Result;            
            
            if (retailerInfo.ImageUpload != null)
            {
                if (!string.IsNullOrEmpty(retailerInfodata.LogoPath))
                {
                    deleteImage(retailerInfodata.LogoPath);
                }                
                retailerInfo.image_path = GetImagePath(retailerInfo.ImageUpload);
            }
           return await _retailerInfoRepository.IUD_RetailerInfo(retailerInfo, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int retailer_info_id)
        {
            RetailerInfo oRetailerInfo = new RetailerInfo();
            oRetailerInfo.retailer_info_id = retailer_info_id;            
            return await _retailerInfoRepository.IUD_RetailerInfo(oRetailerInfo, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetAllRetailerInfo()
        {
            return await _retailerInfoRepository.GetAllRetailerInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetRetailerInfoById(int retailer_info_id)
        {
            return await _retailerInfoRepository.GetRetailerInfoById(retailer_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetRetailerInfoCboList()
        {
            return await _retailerInfoRepository.GetRetailerInfoCboList();
        }

        private string GetImagePath(IFormFile image)
        {
            var folderName = Path.Combine("UploadedResource", "RetailerImage");
            var directoryName = Directory.GetCurrentDirectory();
            var pathToSave = directoryName + "\\" + folderName;
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
                var path = directoryName + "\\" + folderName + file.Name;
                System.IO.File.Delete(path);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
