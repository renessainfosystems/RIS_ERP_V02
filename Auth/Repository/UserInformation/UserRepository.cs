using Auth.Model.Auth.Model;
using Auth.Model.DomainModel;
using DataAccess;
using Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Implementation
{
    public class UserRepository : IUserRepository
    {
        protected UserDataAccess _userdataAccess { get; set; }

        //Data access initialize
        public UserRepository(UserDataAccess userDataAccess)
        {
            _userdataAccess = userDataAccess;
        }
        public async Task<IEnumerable<dynamic>> GetUsers(string user_info_search)
        {

            return await _userdataAccess.GetAllAsync(user_info_search);
        }
        public async Task<dynamic> IUDUserInfo(User user, int dbOperation)
        {
            return await _userdataAccess.IUDUserInfo(user, dbOperation);
        }

        public async Task<dynamic> GetUserByUserId(int user_info_id)
        {
            return await _userdataAccess.GetByIdAsync(user_info_id);
        }

        public async Task<dynamic> GetUserByLoginUser(string loginUser)
        {
            return await _userdataAccess.GetUserByLoginUser(loginUser);
        }

        public async Task<dynamic> ResetPassword(ResetPasswordRequest resetPasswordRequest)
        {
            return await _userdataAccess.ResetPassword(resetPasswordRequest);
        }

        public async Task<dynamic> CreateForgotInfo(ForgetPasswordRequest forgetPasswordRequest)
        {
            return await _userdataAccess.CreateForgotInfo(forgetPasswordRequest);
        }

        public async Task<dynamic> getForgotTokenInfo(int user_info_id, string token)
        {
            return await _userdataAccess.getForgotTokenInfo( user_info_id,  token);
 
        }

        public async Task<dynamic> UserActivity(int user_info_id)
        {
            return await _userdataAccess.UserActivity(user_info_id);
        }
    }


}