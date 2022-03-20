using Auth.Model.Auth.Model;
using Auth.Model.Auth.ViewModel;
using Auth.Utility;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Utility.Auth.Enum;
using static Auth.Utility.CommonMessage;
namespace DataAccess
{
    public class UserDataAccess
    {
        public IConfiguration _config;

        private readonly IDbConnection _dbConnection;
        //protected CommonParammeter _commonParammeter { get; set; }

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public UserDataAccess(IConfiguration configuration, IDbConnection dbConnection)
        {
            _config = configuration;
            _dbConnection = dbConnection;

        }

        //Parameter Binding
        public DynamicParameters UserParameterBinding(User user, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@user_info_id", user.user_info_id, DbType.Int32);
                parameters.Add("@login_id", string.IsNullOrEmpty(user.login_id)?"":user.login_id, DbType.String);
                parameters.Add("@employee_id", user.employee_id , DbType.Int32);
                parameters.Add("@user_name", string.IsNullOrEmpty(user.user_name)?"":user.user_name, DbType.String);
                parameters.Add("@is_active", user.is_active, DbType.Boolean);
                parameters.Add("@company_id", user.company_id, DbType.Int32);
                parameters.Add("@company_corporate_id", user.company_corporate_id, DbType.Int32);
                parameters.Add("@user_type_enum_id", user.user_type_enum_id, DbType.Int32);
                parameters.Add("@phone_no", string.IsNullOrEmpty(user.phone_no) ? "":user.phone_no, DbType.String);
                parameters.Add("@mobile_no", string.IsNullOrEmpty(user.mobile_no) ? "":user.mobile_no, DbType.String);
                parameters.Add("@email_address", string.IsNullOrEmpty(user.email_address) ? "":user.email_address, DbType.String);
                parameters.Add("@national_id", string.IsNullOrEmpty(user.national_id) ? "":user.national_id, DbType.String);
                parameters.Add("@password", string.IsNullOrEmpty(user.password) ? "":user.password, DbType.String);
                parameters.Add("@user_image_path", user.user_image_path, DbType.String);
                parameters.Add("@signature_image_path", user.signature_image_path, DbType.String);
                parameters.Add("@is_password_reset", user.is_password_reset, DbType.Boolean);
                parameters.Add("@created_datetime", user.created_datetime, DbType.DateTime);
                parameters.Add("@updated_datetime", user.updated_datetime, DbType.DateTime);
                parameters.Add("@created_user_info_id", currentUserInfoId??0, DbType.Int32);
                parameters.Add("@updated_user_info_id", currentUserInfoId??0, DbType.Int32);
                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@user_info_id", user.user_info_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }


        //User Insert Update Delete
        public async Task<dynamic> IUDUserInfo(User user, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = UserParameterBinding(user, dbOperation);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

       
                try
                {

            

                    if (dbOperation == 3)
                    {
                        dynamic data = await _dbConnection.ExecuteAsync("[Auth].[SP_User_Info_Delete]", parameters, commandType: CommandType.StoredProcedure);
                        message = CommonMessage.SetSuccessMessage(CommonDeleteMessage);
                    }
                    else
                    {
                        dynamic data = await _dbConnection.QueryAsync<dynamic>("[Auth].[SP_User_Info_IUD]", parameters, commandType: CommandType.StoredProcedure);

                        if (data != null)
                        {
                            List<dynamic> dataList = data;

                            result = (from dr in dataList select UserViewModel.ConvertToModel(dr)).ToList();
                            message = CommonMessage.SetSuccessMessage(CommonSaveMessage,result);
                        }
                    }


                }
                catch (Exception ex)
                {

                return message = CommonMessage.SetErrorMessage(ex.Message);
                }
                finally
                {
                    _dbConnection.Close();

                }

           

            return message;
        }


        public async Task<IEnumerable<dynamic>> GetAllAsync(string user_info_search)
        {
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            
            {
            
                var sql = "SELECT user_info_id,company_corporate_id,user_type_enum_id,company_id,user_name,is_active,login_id,email_address,mobile_no,password FROM[Auth].[User_Info] " +
                    "WHERE login_id like @user_info_search Or email_address like @user_info_search or mobile_no like @user_info_search or user_name like @user_info_search ";
                
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@user_info_search", user_info_search+'%');

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql,parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select UserViewModel.ConvertToModel(dr)).ToList();

                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> GetByIdAsync(int user_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT user_info_id,user_name,employee_id,user_type_enum_id,is_active,login_id,email_address,mobile_no,password,signature_image_path,user_image_path,remarks,national_id FROM [Auth].[User_Info] WHERE  user_info_id=@user_info_id  ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@user_info_id", user_info_id);

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {

                    result = UserViewModel.ConvertToModel(data);
                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }



        public async Task<dynamic> GetUserByLoginUser(string loginUser)
        {
            var result = (dynamic)null;
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@loginUser", loginUser);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = "SELECT user_info_id,company_corporate_id,company_id,company_group_id,user_name,is_active,login_id,email_address,mobile_no,password " +
                    "FROM [Auth].[User_Info] WHERE  login_id=@loginUser Or email_address=@loginUser or mobile_no=@loginUser  ";
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    result = UserViewModel.ConvertToLoginModel(data);

                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;

        }

        public async Task<dynamic> ResetPassword(ResetPasswordRequest resetPasswordRequest)
        {
            var message = new CommonMessage();       
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Password", resetPasswordRequest.Password);
            parameters.Add("@user_info_id", resetPasswordRequest.UserInfoId);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = "Update Auth.User_Info SET password=@Password WHERE user_info_id=@user_info_id";
                int data = await _dbConnection.ExecuteAsync(sql, parameters);
                if (data > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Close();
            }
            return message;
        }

        public async Task<dynamic> CreateForgotInfo(ForgetPasswordRequest forgetPasswordRequest)
        {

            var result = (dynamic)null;

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@user_info_id", forgetPasswordRequest.user_info_id);
            parameters.Add("@company_id", forgetPasswordRequest.company_id);
            parameters.Add("@company_corporate_id", forgetPasswordRequest.company_corporate_id);
            parameters.Add("@token", forgetPasswordRequest.token);
            parameters.Add("@email", forgetPasswordRequest.email);
            parameters.Add("@tokenexpiedtime", forgetPasswordRequest.tokenexpiedtime);
            parameters.Add("@old_password", forgetPasswordRequest.password);
            parameters.Add("@created_db_server_date_time", DateTime.Now);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = "INSERT INTO [Auth].[Forgot_Password] (user_info_id,company_id,company_corporate_id,email,token,tokenexpiedtime,old_password,created_db_server_date_time) " +
                    " VALUES(@user_info_id, @company_id, @company_corporate_id, @email, @token, @tokenexpiedtime, @old_password, @created_db_server_date_time) ";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                result = data;
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }

        public async Task<dynamic> getForgotTokenInfo(int user_info_id, string token)
        {
            var result = (dynamic)null;
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@user_info_id", user_info_id);
            parameters.Add("@token", token);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = "SELECT user_info_id,company_id,company_corporate_id,email,token,tokenexpiedtime,old_password " +
                    "FROM [Auth].[Forgot_Password] WHERE  user_info_id=@user_info_id AND token=@token ";
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    result = ForgetPasswordRequest.ConvertToResetModel(data);

                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }


        public async Task<dynamic> UserActivity(int user_info_id)
        {
            var message = new CommonMessage();

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "UPDATE Auth.User_Info SET is_active=CASE WHEN(is_active=1) THEN 0 ELSE 1 end  Where user_info_id=@user_info_id ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@user_info_id", user_info_id);
                
                var data = await _dbConnection.ExecuteAsync(sql, parameters);
                if (data > 0)
                {

                    message = CommonMessage.SetSuccessMessage(CommonUpdateMessage);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonErrorMessage);
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(CommonErrorMessage);
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return message;
        }
    }
}
