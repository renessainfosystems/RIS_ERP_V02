using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Repository.Interface;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.Middleware
{
    public class JWTMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;
        public JWTMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context, IUserRepository userRepository)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                attachAccountToContext(context, userRepository, token);

            await _next(context);

        }

        private void attachAccountToContext(HttpContext context, IUserRepository userRepository, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidIssuer = _configuration["JWT:ValidIssuer"],
                    ValidAudiences = _configuration.GetSection("JWT:ValidAudience").Get<string[]>().ToList(),
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                var loginId = (jwtToken.Claims.First(x => x.Type == "sub").Value);
                var userInfo = userRepository.GetUserByLoginUser(loginId).Result;
                // attach account to context on successful jwt validation
                if (context.Items != null)
                {
                    context.Items["Login_Id"] = userInfo.LoginId;
                    context.Items["User_Info_Id"] = userInfo.UserInfoId;
                    context.Items["company_id"] = userInfo.CompanyId;
                    context.Items["company_corporate_id"] = userInfo.CompanyCorporateId;
                    context.Items["company_group_id"] = userInfo.CompanyGroupId;
                }


                //context.Items["User"] = _userService.GetUserDetails();
            }
            catch (Exception ex)
            {
                // do nothing if jwt validation fails
                // account is not attached to context so request won't have access to secure routes
            }
        }
    }
}
