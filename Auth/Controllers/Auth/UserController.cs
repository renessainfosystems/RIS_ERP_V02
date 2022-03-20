using Auth.Model.Auth.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Repository.Interface;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Utility.Auth.Enum;
using BC = BCrypt.Net.BCrypt;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Auth.Controllers.Auth
{
    // [Authorize]
    [Route("api/[controller]/[action]")]

    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepository;
        private IConfiguration _config;
    
        public UserController(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _config = config;
        }

        //User Registration
        [HttpPost]
        public async Task<dynamic> Create([FromForm] User user)
        {
            user.password = BC.HashPassword(user.password);
            if (user.ImageUpload != null)
            {
                user.user_image_path = GetImagePath(user.ImageUpload);
            }
            if (user.SignatureUpload != null)
            {
                user.signature_image_path = GetSignaturePath(user.ImageUpload);
            }

            return await _userRepository.IUDUserInfo(user, (int)GlobalEnumList.DBOperation.Create);

        }

        //User Registration
        [HttpPost]
        public async Task<dynamic> Update([FromForm] User user)
        {
            var userInfo = _userRepository.GetUserByUserId(user.user_info_id).Result;
            if (!BC.Verify(user.password, userInfo.Password))
            {
                user.password = BC.HashPassword(user.password);
            }
           if(user.ImageUpload !=null)
            {
                if (!string.IsNullOrEmpty(userInfo.UserImagePath))
                {
                    deleteImage(userInfo.UserImagePath);

                }
                user.user_image_path = GetImagePath(user.ImageUpload);

            }

            if (user.SignatureUpload != null)
            {
               
                if (!string.IsNullOrEmpty(userInfo.SignatureImagePath))
                {
                    deleteSignature(userInfo.SignatureImagePath);
                    
                }
                user.signature_image_path = GetSignaturePath(user.SignatureUpload);
            }
           
            return await _userRepository.IUDUserInfo(user, (int)GlobalEnumList.DBOperation.Update);



        }
        [HttpPost]
        public async Task<dynamic> UserActivity(int user_info_id)
        {
            return await _userRepository.UserActivity(user_info_id);
        }
        //User Delete
        [HttpPost]
        public  Task<dynamic> Delete(User user)
        {
            var userInfo =  _userRepository.GetUserByUserId(user.user_info_id).Result;

            if (!string.IsNullOrEmpty(userInfo.SignatureImagePath))
            {
                deleteSignature(userInfo.SignatureImagePath);

            }
            if (!string.IsNullOrEmpty(userInfo.UserImagePath))
            {
                deleteImage(userInfo.UserImagePath);

            }
        
            return _userRepository.IUDUserInfo(user, (int)GlobalEnumList.DBOperation.Delete); ;
        }

        [HttpPost]
        public async Task<ActionResult> GetAllUsers(string user_info_search)
        {
            return Ok(await _userRepository.GetUsers(user_info_search));
        }

        [HttpGet]
        public async Task<ActionResult> GetUserbyId(int user_info_id)
        {

            return Ok(await _userRepository.GetUserByUserId(user_info_id));
        }
    
        private string GetImagePath(IFormFile image)
        {
              var folderName = Path.Combine("assets", "images","userimage");
                var directoryName = Directory.GetCurrentDirectory();

                //var pathToSave1 = Path.Combine(Directory.GetCurrentDirectory().Trim(), folderName);

                var pathToSave = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\userimage");
                if (image.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');

                    var uniquefileName = Guid.NewGuid().ToString()+System.IO.Path.GetExtension(fileName);

                    var fullPath = Path.Combine(pathToSave, uniquefileName);
                    var dbPath = Path.Combine(folderName, uniquefileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        image.CopyTo(stream);
                    }

                    return  dbPath= dbPath.Replace(@"\", @"/");
                }

            return "";
           
        }
        private string GetSignaturePath(IFormFile signature)
        {
           
                var folderName = Path.Combine("assets", "images", "usersignature");         
                var directoryName = Directory.GetCurrentDirectory();

                // var pathToSave = Path.Combine(Directory.GetCurrentDirectory().Trim(), folderName);

                var pathToSave = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\usersignature");
                if (signature.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(signature.ContentDisposition).FileName.Trim('"');

                    var uniquefileName = Guid.NewGuid().ToString() + (fileName);

                    var fullPath = Path.Combine(pathToSave, uniquefileName);
                    var dbPath = Path.Combine(folderName, uniquefileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        signature.CopyTo(stream);
                    }

                return dbPath = dbPath.Replace(@"\", @"/");
            }
            return "";
            }        
        private void deleteImage(string imagepath)
        {
            FileInfo file = new FileInfo(imagepath);
            
            var directoryPath = ("\\WebApp\\src\\assets\\images\\userimage");
            var path = directoryPath + "\\" + file.Name;
            System.IO.File.Delete(path);
        }
        private void deleteSignature(string sigpath)
        {
            FileInfo file = new FileInfo(sigpath);

            var directoryPath = ("\\WebApp\\src\\assets\\images\\usersignature");
            var path = directoryPath + "\\" + file.Name;
            System.IO.File.Delete(path);
        }
    }
    }

