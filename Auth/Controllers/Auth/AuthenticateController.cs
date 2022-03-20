
using Auth.Model.Auth.Model;
using Auth.Model.Auth.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Repository.Interface;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Utility.Model;
using BC = BCrypt.Net.BCrypt;


namespace Auth.Controllers.Auth
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private IConfiguration _config;
        private IUserRepository _userRepository;

        //Intialize
        public AuthenticateController(IConfiguration config, IUserRepository userRepository)
        {
            _config = config;
            _userRepository = userRepository;
        }

        //User Login

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            IActionResult response = Unauthorized();
            
            var userInfo = (dynamic)null;

            //Checking login user with loginid,email and mobile no
            userInfo = _userRepository.GetUserByLoginUser(loginModel.Login_User).Result;

            //Checking login user with loginid,email and mobile no
            if (userInfo == null)
            {
                return response;
            }


            if (AuthenticateUserAsync(userInfo, loginModel) == true)
            {
                var tokenString = GenerateJSONWebToken(userInfo);

                // HttpContext.Session.SetString("Token", tokenString);

                response = Ok(tokenString);

                return response;
            }
            return response;
        }

        //Token Generation
        private LoginResponse GenerateJSONWebToken(UserViewModel userInfo)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:key"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var validAudiance = "";

            var claims = new[] {

                new Claim(JwtRegisteredClaimNames.Sub, userInfo.LoginId),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.EmailAddress),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var array = _config.GetSection("JWT:ValidAudience").Get<string[]>();

            for (int i = 0; i < array.Length; i++)
            {
                string currentAudiance = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
                if (currentAudiance == array[i])
                {
                    validAudiance = array[i];
                }
            }

            var token = new JwtSecurityToken(
            issuer: _config["JWT:ValidIssuer"],
            audience: validAudiance,
            claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: credentials);

            string jwttoken = new JwtSecurityTokenHandler().WriteToken(token);

            return new LoginResponse(userInfo, jwttoken);
        }

        //User Authentication
        private bool AuthenticateUserAsync(UserViewModel userInfo, LoginModel login)
        {
            // Check user found and verify password
            if ((userInfo != null && BC.Verify(login.Password, userInfo.Password)))
            {
                // Authentication successful
                return true;

            }
            else
            {
                // Authentication failed
                return false;
            }
        }

    }
}
