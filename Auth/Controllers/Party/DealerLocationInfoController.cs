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
    public class DealerLocationInfoController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IDealerLocationInfoRepository _dealerLocationInfoRepository;

        public DealerLocationInfoController(
            IDealerLocationInfoRepository dealerLocationInfoRepository
            )
        {
            _dealerLocationInfoRepository = dealerLocationInfoRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] DealerLocationInfo dealerLocationInfo)
        {         
            return await _dealerLocationInfoRepository.IUD_DealerLocationInfo(dealerLocationInfo, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] DealerLocationInfo dealerLocationInfo)
        {            
           return await _dealerLocationInfoRepository.IUD_DealerLocationInfo(dealerLocationInfo, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int dealer_location_info_id)
        {
            DealerLocationInfo oDealerLocationInfo = new DealerLocationInfo();
            oDealerLocationInfo.dealer_location_info_id = dealer_location_info_id;            
            return await _dealerLocationInfoRepository.IUD_DealerLocationInfo(oDealerLocationInfo, (int)GlobalEnumList.DBOperation.Delete);
        }


        [HttpGet]
        public async Task<dynamic> GetAllDealerLocationInfo()
        {
            return await _dealerLocationInfoRepository.GetAllDealerLocationInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetLocationInfoByDealerId(int dealer_info_id)
        {
            return await _dealerLocationInfoRepository.GetLocationInfoByDealerId(dealer_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetDealerLocationInfoById(int dealer_location_info_id)
        {
            return await _dealerLocationInfoRepository.GetDealerLocationInfoById(dealer_location_info_id);
        }
      
        
        private string GetImagePath(IFormFile image)
        {
            var folderName = Path.Combine("UploadedResource", "DealerImage");
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
                var folderName = Path.Combine("UploadedResource", "DealerImage");
                //var pathToSave = directoryName + "\\" + folderName;
                // var directoryPath = ("..\\WebApp\\src\\assets\\images\\dealerimage");
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
