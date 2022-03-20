using Auth.Model.Auth.Model;
using Auth.Model.DomainModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IUserRepository
    {
        Task<IEnumerable<dynamic>> GetUsers(string user_info_search);
        Task<dynamic> GetUserByUserId(int user_info_id);
        Task<dynamic> IUDUserInfo(User user, int dbOperation);
        Task<dynamic> GetUserByLoginUser(string loginUser);
        Task<dynamic> ResetPassword( ResetPasswordRequest resetPasswordRequest);
        Task<dynamic> CreateForgotInfo(ForgetPasswordRequest forgetPasswordRequest);
        Task<dynamic> getForgotTokenInfo(int user_info_id,string token);
        Task<dynamic> UserActivity(int user_info_id);
          
    }
}
