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
    public class DealerLocationInfoDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public DealerLocationInfoDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters DealerLocationInfoParameterBinding(DealerLocationInfo dealerLocationInfo, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_dealer_location_info_id", dealerLocationInfo.dealer_location_info_id, DbType.Int32);
                parameters.Add("@param_dealer_info_id", dealerLocationInfo.dealer_info_id, DbType.Int32);
                parameters.Add("@param_dealer_location_info_code", dealerLocationInfo.dealer_location_info_code, DbType.String);
                parameters.Add("@param_dealer_location_info_name", dealerLocationInfo.dealer_location_info_name, DbType.String);
                parameters.Add("@param_dealer_location_info_short_name", dealerLocationInfo.dealer_location_info_short_name, DbType.String);
                parameters.Add("@param_trade_license", dealerLocationInfo.trade_license, DbType.String);
                parameters.Add("@param_trade_license_date", dealerLocationInfo.trade_license_date, DbType.Date);
                parameters.Add("@param_mobile", dealerLocationInfo.mobile, DbType.String);
                parameters.Add("@param_phone", dealerLocationInfo.phone, DbType.String);
                parameters.Add("@param_email", dealerLocationInfo.email, DbType.String);
                parameters.Add("@param_emergency_contact", dealerLocationInfo.emergency_contact, DbType.String);
                parameters.Add("@param_country_id", dealerLocationInfo.country_id, DbType.Int32);
                parameters.Add("@param_division_id", dealerLocationInfo.division_id, DbType.Int32);
                parameters.Add("@param_district_id", dealerLocationInfo.district_id, DbType.Int32);
                parameters.Add("@param_thana_id", dealerLocationInfo.thana_id, DbType.Int32);
                parameters.Add("@param_ps_area", dealerLocationInfo.ps_area, DbType.String);
                parameters.Add("@param_post_code", dealerLocationInfo.post_code, DbType.String);
                parameters.Add("@param_block", dealerLocationInfo.block, DbType.String);
                parameters.Add("@param_road_no", dealerLocationInfo.road_no, DbType.String);
                parameters.Add("@param_house_no", dealerLocationInfo.house_no, DbType.String);
                parameters.Add("@param_flat_no", dealerLocationInfo.flat_no, DbType.String);
                parameters.Add("@param_address_note", dealerLocationInfo.address_note, DbType.String);
                parameters.Add("@param_is_active", true, DbType.Boolean);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int64);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_dealer_location_info_id", dealerLocationInfo.dealer_location_info_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            return parameters;
        }

        public async Task<dynamic> IUD_DealerLocationInfo(DealerLocationInfo dealerLocationInfo, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = DealerLocationInfoParameterBinding(dealerLocationInfo, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                dynamic data = await _dbConnection.QueryAsync("[Party].[SP_Dealer_Location_Info_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
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
                //DB connection dispose with db connection close
                _dbConnection.Dispose();
            }
            return (message);
        }

        public async Task<dynamic> GetAllDealerLocationInfo()
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Party].[Dealer_Location_Info]";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select DealerLocationInfoModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetDealerLocationInfoById(int dealer_location_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Dealer_Location_Info] DCI WHERE DCI.dealer_location_info_id =" + dealer_location_info_id + "";
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql);
                if (data != null)
                {
                    result = DealerLocationInfoModel.ConvertToModel(data);
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

        public async Task<dynamic> GetLocationInfoByDealerId(int dealer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Dealer_Location_Info] DCI WHERE DCI.dealer_info_id =" + dealer_info_id + "";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select DealerContactInfoModel.ConvertToModel(dr)).ToList();
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
