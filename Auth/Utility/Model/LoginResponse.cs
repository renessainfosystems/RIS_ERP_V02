using Auth.Model.Auth.ViewModel;

namespace Utility.Model
{
    public class LoginResponse
    {
        public string Login_Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string Token { get; set; }


        //[JsonIgnore] // refresh token is returned in http only cookie
        //public string RefreshToken { get; set; }

        public LoginResponse(UserViewModel user, string jwtToken)
        {
            Login_Id = user.LoginId;
            UserName = user.UserName;
            Email = user.EmailAddress;
            MobileNo = user.MobileNo;
            Token = jwtToken;
            //RefreshToken = refreshToken;
        }

        
    }
}
