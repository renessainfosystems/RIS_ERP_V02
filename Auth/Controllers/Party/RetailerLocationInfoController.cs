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
    public class RetailerLocationInfoController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IRetailerLocationInfoRepository _retailerLocationInfoRepository;

        public RetailerLocationInfoController(
            IRetailerLocationInfoRepository retailerLocationInfoRepository
            )
        {
            _retailerLocationInfoRepository = retailerLocationInfoRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] RetailerLocationInfo retailerLocationInfo)
        {         
            return await _retailerLocationInfoRepository.IUD_RetailerLocationInfo(retailerLocationInfo, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] RetailerLocationInfo retailerLocationInfo)
        {            
           return await _retailerLocationInfoRepository.IUD_RetailerLocationInfo(retailerLocationInfo, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int retailer_location_info_id)
        {
            RetailerLocationInfo oRetailerLocationInfo = new RetailerLocationInfo();
            oRetailerLocationInfo.retailer_location_info_id = retailer_location_info_id;            
            return await _retailerLocationInfoRepository.IUD_RetailerLocationInfo(oRetailerLocationInfo, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetAllRetailerLocationInfo()
        {
            return await _retailerLocationInfoRepository.GetAllRetailerLocationInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetLocationInfoByRetailerId(int retailer_info_id)
        {
            return await _retailerLocationInfoRepository.GetLocationInfoByRetailerId(retailer_info_id);
        }
        [HttpGet]
        public async Task<dynamic> GetRetailerLocationInfoById(int retailer_location_info_id)
        {
            return await _retailerLocationInfoRepository.GetRetailerLocationInfoById(retailer_location_info_id);
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
