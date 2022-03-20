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
    public class DealerContactInfoController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IDealerContactInfoRepository _dealerContactInfoRepository;

        public DealerContactInfoController(
            IDealerContactInfoRepository dealerContactInfoRepository
            )
        {
            _dealerContactInfoRepository = dealerContactInfoRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] DealerContactInfo dealerContactInfo)
        {           
            if (dealerContactInfo.ImageUpload != null)
            {
                dealerContactInfo.image_path = GetImagePath(dealerContactInfo.ImageUpload);
            }
            return await _dealerContactInfoRepository.IUD_DealerContactInfo(dealerContactInfo, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] DealerContactInfo dealerContactInfo)
        {
            var dealerContactInfodata = _dealerContactInfoRepository.GetDealerContactInfoById(dealerContactInfo.dealer_info_id).Result;            
            
            if (dealerContactInfo.ImageUpload != null)
            {
                if (!string.IsNullOrEmpty(dealerContactInfodata.ImagePath))
                {
                    deleteImage(dealerContactInfodata.ImagePath);
                }                
                dealerContactInfo.image_path = GetImagePath(dealerContactInfo.ImageUpload);
            }
           return await _dealerContactInfoRepository.IUD_DealerContactInfo(dealerContactInfo, (int)GlobalEnumList.DBOperation.Update);

        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int dealer_contact_info_id)
        {
            DealerContactInfo oDealerContactInfo = new DealerContactInfo();
            oDealerContactInfo.dealer_contact_info_id = dealer_contact_info_id;            
            return await _dealerContactInfoRepository.IUD_DealerContactInfo(oDealerContactInfo, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetAllDealerContactInfo()
        {
            return await _dealerContactInfoRepository.GetAllDealerContactInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetDealerContactInfoById(int dealer_contact_info_id)
        {
            return await _dealerContactInfoRepository.GetDealerContactInfoById(dealer_contact_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetContactInfoByDealerId(int dealer_info_id)
        {
            return await _dealerContactInfoRepository.GetContactInfoByDealerId(dealer_info_id);
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
