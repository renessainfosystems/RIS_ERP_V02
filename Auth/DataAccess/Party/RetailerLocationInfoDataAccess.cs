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
    public class RetailerLocationInfoDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public RetailerLocationInfoDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters RetailerLocationInfoParameterBinding(RetailerLocationInfo retailerLocationInfo, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_retailer_location_info_id", retailerLocationInfo.retailer_location_info_id, DbType.Int32);
                parameters.Add("@param_retailer_info_id", retailerLocationInfo.retailer_info_id, DbType.Int32);
                parameters.Add("@param_retailer_location_info_code", retailerLocationInfo.retailer_location_info_code, DbType.String);
                parameters.Add("@param_retailer_location_info_name", retailerLocationInfo.retailer_location_info_name, DbType.String);
                parameters.Add("@param_retailer_location_info_short_name", retailerLocationInfo.retailer_location_info_short_name, DbType.String);
                parameters.Add("@param_trade_license", retailerLocationInfo.trade_license, DbType.String);
                parameters.Add("@param_trade_license_date", retailerLocationInfo.trade_license_date, DbType.Date);
                parameters.Add("@param_mobile", retailerLocationInfo.mobile, DbType.String);
                parameters.Add("@param_phone", retailerLocationInfo.phone, DbType.String);
                parameters.Add("@param_email", retailerLocationInfo.email, DbType.String);
                parameters.Add("@param_emergency_contact", retailerLocationInfo.emergency_contact, DbType.String);
                parameters.Add("@param_country_id", retailerLocationInfo.country_id, DbType.Int32);
                parameters.Add("@param_division_id", retailerLocationInfo.division_id, DbType.Int32);
                parameters.Add("@param_district_id", retailerLocationInfo.district_id, DbType.Int32);
                parameters.Add("@param_thana_id", retailerLocationInfo.thana_id, DbType.Int32);
                parameters.Add("@param_ps_area", retailerLocationInfo.ps_area, DbType.String);
                parameters.Add("@param_post_code", retailerLocationInfo.post_code, DbType.String);
                parameters.Add("@param_block", retailerLocationInfo.block, DbType.String);
                parameters.Add("@param_road_no", retailerLocationInfo.road_no, DbType.String);
                parameters.Add("@param_house_no", retailerLocationInfo.house_no, DbType.String);
                parameters.Add("@param_flat_no", retailerLocationInfo.flat_no, DbType.String);
                parameters.Add("@param_address_note", retailerLocationInfo.address_note, DbType.String);
                parameters.Add("@param_is_active", true, DbType.Boolean);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int64);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_retailer_location_info_id", retailerLocationInfo.retailer_location_info_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            return parameters;
        }

        public async Task<dynamic> IUD_RetailerLocationInfo(RetailerLocationInfo retailerLocationInfo, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = RetailerLocationInfoParameterBinding(retailerLocationInfo, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Party].[SP_Retailer_Location_Info_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    result = RetailerLocationInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage,result);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    result = RetailerLocationInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    result = RetailerLocationInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage, result);
                }

                if (data.Count > 0)
                {
                    result = RetailerLocationInfoViewModel.ConvertToModel(data);
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
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

        public async Task<dynamic> GetAllRetailerLocationInfo()
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Party].[Retailer_Location_Info]";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select RetailerLocationInfoViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetRetailerLocationInfoById(int retailer_location_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Retailer_Location_Info] DCI WHERE DCI.retailer_location_info_id =" + retailer_location_info_id + "";
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql);
                if (data != null)
                {
                    result = RetailerLocationInfoViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetLocationInfoByRetailerId(int retailer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Retailer_Location_Info] DCI WHERE DCI.retailer_info_id =" + retailer_info_id + "";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select DealerContactInfoViewModel.ConvertToModel(dr)).ToList();
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
