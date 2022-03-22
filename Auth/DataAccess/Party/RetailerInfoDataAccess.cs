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
/// Created Date: 07/03/2022
/// </summary>
namespace Auth.DataAccess.Party
{
    public class RetailerInfoDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public RetailerInfoDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters RetailerInfoParameterBinding(RetailerInfo retailerInfo, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_retailer_info_id", retailerInfo.retailer_info_id, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_dealer_info_id", retailerInfo.dealer_info_id, DbType.Int32);
                parameters.Add("@param_retailer_info_code", retailerInfo.retailer_info_code, DbType.String);
                parameters.Add("@param_retailer_info_short_name", retailerInfo.retailer_info_short_name, DbType.String);
                parameters.Add("@param_retailer_info_name", retailerInfo.retailer_info_name, DbType.String);
                parameters.Add("@param_trade_license", retailerInfo.trade_license, DbType.String);
                parameters.Add("@param_trade_license_date", retailerInfo.trade_license_date, DbType.Date);
                parameters.Add("@param_TIN", retailerInfo.TIN, DbType.String);
                parameters.Add("@param_BIN", retailerInfo.BIN, DbType.String);
                parameters.Add("@param_domicile_enum_id", retailerInfo.domicile_enum_id, DbType.Int16);
                parameters.Add("@param_business_type_enum_id", retailerInfo.business_type_enum_id, DbType.Int16);
                parameters.Add("@param_industry_sector_id", retailerInfo.industry_sector_id, DbType.Int32);
                parameters.Add("@param_industry_sub_sector_id", retailerInfo.industry_sub_sector_id, DbType.Int32);
                parameters.Add("@param_ownership_type_id", retailerInfo.ownership_type_id, DbType.Int32);
                parameters.Add("@param_currency_id", retailerInfo.currency_id, DbType.Int32);
                parameters.Add("@param_mobile", retailerInfo.mobile, DbType.String);
                parameters.Add("@param_phone", retailerInfo.phone, DbType.String);
                parameters.Add("@param_email", retailerInfo.email, DbType.String);
                parameters.Add("@param_web_url", retailerInfo.web_url, DbType.String);
                parameters.Add("@param_image_path", retailerInfo.image_path, DbType.String);
                parameters.Add("@param_country_id", retailerInfo.country_id, DbType.Int32);
                parameters.Add("@param_division_id", retailerInfo.division_id, DbType.Int32);
                parameters.Add("@param_district_id", retailerInfo.district_id, DbType.Int32);
                parameters.Add("@param_thana_id", retailerInfo.thana_id, DbType.Int32);
                parameters.Add("@param_zone_id", retailerInfo.zone_id, DbType.Int32);
                parameters.Add("@param_ps_area", retailerInfo.ps_area, DbType.String);
                parameters.Add("@param_post_code", retailerInfo.post_code, DbType.String);
                parameters.Add("@param_block", retailerInfo.block, DbType.String);
                parameters.Add("@param_road_no", retailerInfo.road_no, DbType.String);
                parameters.Add("@param_house_no", retailerInfo.house_no, DbType.String);
                parameters.Add("@param_flat_no", retailerInfo.flat_no, DbType.String);
                parameters.Add("@param_address_note", retailerInfo.address_note, DbType.String);
                parameters.Add("@param_is_active", true, DbType.Boolean);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int64);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_retailer_info_id", retailerInfo.retailer_info_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            return parameters;
        }

        public async Task<dynamic> IUD_RetailerInfo(RetailerInfo retailerInfo, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = RetailerInfoParameterBinding(retailerInfo, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Party].[SP_Retailer_Info_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    result = RetailerInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    result = RetailerInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    result = RetailerInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage, result);
                }

                if (data.Count > 0)
                {
                    result = RetailerInfoViewModel.ConvertToModel(data);
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


        public async Task<dynamic> GetAllRetailerInfo()
        {
            var message = new CommonMessage();
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Party].[Retailer_Info] DI WHERE DI.company_id =" + company_id + "";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select RetailerInfoViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetRetailerInfoById(int retailer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = @"SELECT * FROM [Party].[Retailer_Info] DI WHERE DI.retailer_info_id =@retailer_info_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@retailer_info_id", retailer_info_id);
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    result = RetailerInfoViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetRetailerInfoCboList()
        {
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT DI.retailer_info_id,(DI.retailer_info_code+' - '+ DI.retailer_info_name)retailer_info_name FROM [Party].[Retailer_Info] DI";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = dataList;
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

    }
}
