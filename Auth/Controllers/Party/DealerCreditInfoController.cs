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
    public class DealerCreditInfoController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IDealerCreditInfoRepository _dealerCreditInfoRepository;

        public DealerCreditInfoController(
            IDealerCreditInfoRepository dealerCreditInfoRepository
            )
        {
            _dealerCreditInfoRepository = dealerCreditInfoRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] DealerCreditInfo dealerCreditInfo)
        {           
            if (dealerCreditInfo.ImageUpload != null)
            {
                dealerCreditInfo.attachment = GetImagePath(dealerCreditInfo.ImageUpload);
            }
            return await _dealerCreditInfoRepository.IUD_DealerCreditInfo(dealerCreditInfo, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] DealerCreditInfo dealerCreditInfo)
        {
            var dealerCreditInfodata = _dealerCreditInfoRepository.GetDealerCreditInfoById(dealerCreditInfo.dealer_info_id).Result;            
            
            if (dealerCreditInfo.ImageUpload != null)
            {
                if (!string.IsNullOrEmpty(dealerCreditInfodata.ImagePath))
                {
                    deleteImage(dealerCreditInfodata.ImagePath);
                }                
                dealerCreditInfo.attachment = GetImagePath(dealerCreditInfo.ImageUpload);
            }
           return await _dealerCreditInfoRepository.IUD_DealerCreditInfo(dealerCreditInfo, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int dealer_credit_info_id)
        {
            DealerCreditInfo oDealerCreditInfo = new DealerCreditInfo();
            oDealerCreditInfo.dealer_credit_info_id = dealer_credit_info_id;            
            return await _dealerCreditInfoRepository.IUD_DealerCreditInfo(oDealerCreditInfo, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetAllDealerCreditInfo()
        {
            return await _dealerCreditInfoRepository.GetAllDealerCreditInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetDealerCreditInfoById(int dealer_credit_info_id)
        {
            return await _dealerCreditInfoRepository.GetDealerCreditInfoById(dealer_credit_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetCreditInfoByDealerId(int dealer_info_id)
        {
            return await _dealerCreditInfoRepository.GetCreditInfoByDealerId(dealer_info_id);
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
