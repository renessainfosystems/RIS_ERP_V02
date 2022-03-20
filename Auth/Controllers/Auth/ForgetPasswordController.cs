using Auth.Model.Auth.Model;
using Auth.Model.DomainModel;
using Auth.Repository.EmailService;
using Auth.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Interface;
using System;
using System.Security.Cryptography;
using BC = BCrypt.Net.BCrypt;

namespace Auth.Controllers.Auth
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ForgetPasswordController : ControllerBase
    {
        private IEmailServiceRepository _emailServiceRepository;

        private IUserRepository _userRepository;
        //Intialize
        public ForgetPasswordController(IEmailServiceRepository emailServiceRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _emailServiceRepository = emailServiceRepository;
        }
        [HttpPost]
        public dynamic ForgotPassword(ForgetPasswordRequest forgetModel)
        {
            HttpContext context =HttpContext;
            //Checking login user with loginid,email and mobile no
            var userInfo = _userRepository.GetUserByLoginUser(forgetModel.email).Result;
            if (userInfo != null)
            {
                forgetModel.email = userInfo.EmailAddress;
                forgetModel.password = userInfo.Password;
                forgetModel.user_info_id = userInfo.UserInfoId;
                // create reset token that expires after 1 day
                forgetModel.token = randomTokenString();
                forgetModel.tokenexpiedtime = DateTime.UtcNow.AddMinutes(10);
   
                context.Items["company_id"] = userInfo.CompanyId;
                context.Items["company_corporate_id"] = userInfo.CompanyCorporateId;
            }
            else
            {
                return CommonMessage.SetErrorMessage(("Invalid email adderees,please provide valid email"));
            }
            // send email
            return sendPasswordResetEmail(forgetModel, Request.Headers["origin"]);



        }

        [HttpPost]
        public dynamic ResetPassword(ResetPasswordRequest model)
        {
            return ResetPasswordAccess(model);
          
        }
    

        private string randomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            // convert random bytes to hex string
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }

        private CommonMessage sendPasswordResetEmail(ForgetPasswordRequest forgetModel, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                var resetUrl = $"{origin}/reset-password;token={forgetModel.token};user_info_id={forgetModel.user_info_id}";
                message = $@"<p>Please click the below link to reset your password, the link will be valid for 10 minute:</p>
                             <p><a href=""{resetUrl}"">{resetUrl}</a></p>";
            }
            else
            {
                message = $@"<p>Please use the below token to reset your password with the <code>/accounts/reset-password</code> api route:</p>
                             <p><code>{forgetModel.token}</code></p>";
            }

           var data=  _emailServiceRepository.SendEmail(
                to: forgetModel.email,
                subject: "Reset Password",
                html: $@"<h4>Reset Password Email </h4>
                         {message}"
            );
            if (data.MessageType == MessageTypes.Success)
            {
                _userRepository.CreateForgotInfo(forgetModel);
            }
            return data;
        }


        private dynamic ResetPasswordAccess(ResetPasswordRequest model)
        {

            var data= _userRepository.getForgotTokenInfo(model.UserInfoId, model.Token).Result;
      
            if (data.token == model.Token &&
                data.tokenexpiedtime > DateTime.UtcNow && data.user_info_id == model.UserInfoId)
            {
                model.Password = BC.HashPassword(model.Password);
             
                var a= _userRepository.ResetPassword(model).Result;
                return a;
            }
           else
            {
                return CommonMessage.SetWarningMessage("Token is expired or invalid");
            }



        }
    }
}
