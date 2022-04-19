using Auth.Model.Party.Model;
using Auth.Model.Party.ViewModel;
using Auth.Utility;
using Auth.Utility.Party.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// Created By: Md. Zahangir Alam Jahid
/// Created Date: 24/02/2022
/// </summary>
namespace Auth.DataAccess.Party
{
    public class DealerVerificationDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public DealerVerificationDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters DealerVerificationParameterBinding(DealerVerification dealerVerification, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_dealer_verification_id", dealerVerification.dealer_verification_id, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_dealer_verification_id", dealerVerification.dealer_verification_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_dealer_verification_id", dealerVerification.dealer_verification_id, DbType.Int32);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }
            return parameters;
        }

        public DynamicParameters DealerAssignSessionParameterBinding(DealerAssignSession dealerAssignSession, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_dealer_info_id", dealerAssignSession.dealer_info_id, DbType.Int32);
                parameters.Add("@param_department_id", dealerAssignSession.department_id, DbType.Int32);
                parameters.Add("@param_employee_id", dealerAssignSession.employee_id, DbType.Int32);
                parameters.Add("@param_remarks", dealerAssignSession.remarks, DbType.String);
                parameters.Add("@param_is_verified", false, DbType.Boolean);
                parameters.Add("@param_verified_date", dealerAssignSession.verified_date, DbType.DateTime);
                parameters.Add("@param_verified_user_id", dealerAssignSession.verified_user_id, DbType.Int64);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int64);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }

            return parameters;
        }

        public async Task<dynamic> IUD_DealerVerification(DealerVerification dealerVerification, int dbOperation)
        {
            var message = new CommonMessage();
            var data = (dynamic)null;
            var parameters = DealerVerificationParameterBinding(dealerVerification, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            using (var tran = _dbConnection.BeginTransaction())
            {

                try
                {
                    if (dealerVerification.DealerAssignSession.Count > 0)
                    {
                        foreach (DealerAssignSession itemsecurityDeposit in dealerVerification.DealerAssignSession)
                        {
                            var dealerAssignSessionParameters = DealerAssignSessionParameterBinding(itemsecurityDeposit, dbOperation);
                            data = await _dbConnection.QueryAsync<dynamic>("[Party].[SP_Dealer_Verification_IUD]", dealerAssignSessionParameters, commandType: CommandType.StoredProcedure, transaction: tran);
                        }
                    }

                    if (data.Count > 0)
                    {
                        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
                    }
                    else
                    {
                        message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                    }
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    message = CommonMessage.SetErrorMessage(ex.Message);
                }
                finally
                {
                    //DB connection dispose with db connection close
                    _dbConnection.Dispose();
                }
            }
            return (message);
        }

        public async Task<dynamic> GetAllDealerVerification()
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Party].[Dealer_Verification]";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select DealerVerificationViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetDealerVerificationById(int dealer_Credit_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Dealer_Verification] DCI WHERE DCI.dealer_verification_id =@dealer_verification_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@dealer_verification_id", dealer_Credit_info_id);
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    result = DealerVerificationViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetDealerVerificationByDealerId(int dealer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM Party.Dealer_Verification WHERE DCI.dealer_info_id=@dealer_info_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@dealer_info_id", dealer_info_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select DealerVerificationViewModel.ConvertToModel(dr)).ToList();
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
    }
}
