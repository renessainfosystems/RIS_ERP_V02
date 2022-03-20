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
    public class DealerInfoController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IDealerInfoRepository _dealerInfoRepository;

        public DealerInfoController(
            IDealerInfoRepository dealerInfoRepository
            )
        {
            _dealerInfoRepository = dealerInfoRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] DealerInfo dealerInfo)
        {           
            if (dealerInfo.ImageUpload != null)
            {
                dealerInfo.logo_path = GetImagePath(dealerInfo.ImageUpload);
            }
            return await _dealerInfoRepository.IUD_DealerInfo(dealerInfo, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] DealerInfo dealerInfo)
        {
            var dealerInfodata = _dealerInfoRepository.GetDealerInfoById(dealerInfo.dealer_info_id).Result;            
            
            if (dealerInfo.ImageUpload != null)
            {
                if (!string.IsNullOrEmpty(dealerInfodata.LogoPath))
                {
                    deleteImage(dealerInfodata.LogoPath);
                }                
                dealerInfo.logo_path = GetImagePath(dealerInfo.ImageUpload);
            }
           return await _dealerInfoRepository.IUD_DealerInfo(dealerInfo, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int dealer_info_id)
        {
            DealerInfo oDealerInfo = new DealerInfo();
            oDealerInfo.dealer_info_id = dealer_info_id;            
            return await _dealerInfoRepository.IUD_DealerInfo(oDealerInfo, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetAllDealerInfo()
        {
            return await _dealerInfoRepository.GetAllDealerInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetDealerInfoById(int dealer_info_id)
        {
            return await _dealerInfoRepository.GetDealerInfoById(dealer_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetDealerInfoCboList()
        {
            return await _dealerInfoRepository.GetDealerInfoCboList();
        }

        private string GetImagePath(IFormFile image)
        {
            var folderName = Path.Combine("assets", "images", "dealerimage");
            var directoryName = Directory.GetCurrentDirectory();

            var pathToSave = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\dealerimage");
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
                var directoryPath = ("..\\WebApp\\src\\assets\\images\\dealerimage");
                var path = directoryPath + "\\" + file.Name;
                System.IO.File.Delete(path);
            }
            catch (Exception)
            {
                throw;
            }

        }
        
    }
}
