﻿using Auth.Model.Party.Model;
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
    public class DealerDocumentInfoController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IDealerDocumentInfoRepository _dealerDocumentInfoRepository;

        public DealerDocumentInfoController(
            IDealerDocumentInfoRepository dealerDocumentInfoRepository
            )
        {
            _dealerDocumentInfoRepository = dealerDocumentInfoRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] DealerDocumentInfo dealerDocumentInfo)
        {
            if (dealerDocumentInfo.FileUpload != null)
            {
                dealerDocumentInfo.image_file = GetDocumentPath(dealerDocumentInfo.FileUpload);
            }
            
            return await _dealerDocumentInfoRepository.IUD_DealerDocumentInfo(dealerDocumentInfo, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] DealerDocumentInfo dealerDocumentInfo)
        {
            var dealerDocumentInfodata = _dealerDocumentInfoRepository.GetDealerDocumentInfoById(dealerDocumentInfo.dealer_info_id).Result;

            if (dealerDocumentInfo.FileUpload != null)
            {
                if (!string.IsNullOrEmpty(dealerDocumentInfodata.FileUpload))
                {
                    deleteDocument(dealerDocumentInfodata.FileUpload);
                }
                dealerDocumentInfo.image_file = GetDocumentPath(dealerDocumentInfo.FileUpload);
            }
            return await _dealerDocumentInfoRepository.IUD_DealerDocumentInfo(dealerDocumentInfo, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int dealer_document_info_id)
        {
            DealerDocumentInfo oDealerDocumentInfo = new DealerDocumentInfo();
            oDealerDocumentInfo.dealer_document_info_id = dealer_document_info_id;            
            return await _dealerDocumentInfoRepository.IUD_DealerDocumentInfo(oDealerDocumentInfo, (int)GlobalEnumList.DBOperation.Delete);
        }


        [HttpGet]
        public async Task<dynamic> GetAllDealerDocumentInfo()
        {
            return await _dealerDocumentInfoRepository.GetAllDealerDocumentInfo();
        }

        [HttpGet]
        public async Task<dynamic> GetDocumentInfoByDealerId(int dealer_info_id)
        {
            return await _dealerDocumentInfoRepository.GetDocumentInfoByDealerId(dealer_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetDealerDocumentInfoById(int dealer_document_info_id)
        {
            return await _dealerDocumentInfoRepository.GetDealerDocumentInfoById(dealer_document_info_id);
        }
      
        private string GetDocumentPath(IFormFile image)
        {
            var folderName = Path.Combine("assets", "images", "party", "dealerdocument");
            var directoryName = Directory.GetCurrentDirectory();

            var pathToSave = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\party\\dealerdocument");
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

        private void deleteDocument(string imagepath)
        {
            FileInfo file = new FileInfo(imagepath);
            var directoryPath = ("\\WebApp\\src\\assets\\images\\party\\dealerdocument");
            var path = directoryPath + "\\" + file.Name;
            System.IO.File.Delete(file.Name);
        }


    }
}
