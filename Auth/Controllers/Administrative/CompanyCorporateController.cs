using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http.Headers;

/// <summary>
/// Created By Jahid
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CompanyCorporateController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICompanyCorporateRepository _companyCorporateRepository;

        public CompanyCorporateController(ICompanyCorporateRepository companyCorporateRepository)
        {
            _companyCorporateRepository = companyCorporateRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCompanyCorporate()
        {      
            dynamic data = (dynamic)null;
            try
            {
                data = _companyCorporateRepository.GetAllCompanyCorporate();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int company_corporate_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _companyCorporateRepository.GetById(company_corporate_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create([FromForm] CompanyCorporate oCompanyCorporate)
        {
            
            var message = new CommonMessage();
            try
            {
                if (oCompanyCorporate.ImageUpload != null)
                {
                    oCompanyCorporate.logo = GetImagePath(oCompanyCorporate.ImageUpload);
                }
                _companyCorporateRepository.Add(oCompanyCorporate);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        

        [HttpPost]
        public dynamic Update([FromForm] CompanyCorporate oCompanyCorporate)
        {

            var message = new CommonMessage();

            try
            {
                //var dbdata = _companyCorporateRepository.GetById(oCompanyCorporate.company_corporate_id);

                //if (oCompanyCorporate.ImageUpload != null)
                //{
                //    if (!string.IsNullOrEmpty(dbdata.logo))
                //    {
                //        deleteImage(dbdata.logo);
                //    }
                //    oCompanyCorporate.logo = GetImagePath(oCompanyCorporate.ImageUpload);
                //}
                oCompanyCorporate.logo = GetImagePath(oCompanyCorporate.ImageUpload);
                _companyCorporateRepository.Update(oCompanyCorporate);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete( int company_corporate_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _companyCorporateRepository.Delete(company_corporate_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic CompanyCorporateCboList()
        {
            return _companyCorporateRepository.CompanyCorporateCboList();
        }

        private string GetImagePath(IFormFile image)
        {
            var folderName = Path.Combine("UploadedResource", "CommonImages");
            var directoryName = Directory.GetCurrentDirectory();
            var pathToSave = directoryName + "\\" + folderName;
            if (image != null)
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
                var folderName = Path.Combine("UploadedResource", "CommonImages");
                //var pathToSave = directoryName + "\\" + folderName;
                // var directoryPath = ("..\\WebApp\\src\\assets\\images\\dealerimage");
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
