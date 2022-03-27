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
/// Created Date: 13/02/2022
/// </summary>
namespace Auth.DataAccess.Party
{
    public class DealerInfoDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public DealerInfoDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters DealerInfoParameterBinding(DealerInfo dealerInfo, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_dealer_info_id", dealerInfo.dealer_info_id, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_dealer_info_code", dealerInfo.dealer_info_code, DbType.String);
                parameters.Add("@param_dealer_info_short_name", dealerInfo.dealer_info_short_name, DbType.String);
                parameters.Add("@param_dealer_info_name", dealerInfo.dealer_info_name, DbType.String);
                parameters.Add("@param_dealer_info_display_name", dealerInfo.dealer_info_display_name, DbType.String);
                parameters.Add("@param_trade_license", dealerInfo.trade_license, DbType.String);
                parameters.Add("@param_year_established", dealerInfo.year_established, DbType.Date);
                parameters.Add("@param_TIN", dealerInfo.TIN, DbType.String);
                parameters.Add("@param_BIN", dealerInfo.BIN, DbType.String);
                parameters.Add("@param_domicile_enum_id", dealerInfo.domicile_enum_id, DbType.Int16);
                parameters.Add("@param_business_type_enum_id", dealerInfo.business_type_enum_id, DbType.Int16);
                parameters.Add("@param_industry_sector_id", dealerInfo.industry_sector_id, DbType.Int32);
                parameters.Add("@param_industry_sub_sector_id", dealerInfo.industry_sub_sector_id, DbType.Int32);
                parameters.Add("@param_ownership_type_id", dealerInfo.ownership_type_id, DbType.Int32);
                parameters.Add("@param_organazation_type_enum_id", dealerInfo.organization_type_enum_id, DbType.Int16);
                parameters.Add("@param_registry_authority_id", dealerInfo.registry_authority_id, DbType.Int32);
                parameters.Add("@param_regulator_id", dealerInfo.regulator_id, DbType.Int32);
                parameters.Add("@param_currency_id", dealerInfo.currency_id, DbType.Int32);
                parameters.Add("@param_security_type_enum_id", dealerInfo.security_type_enum_id, DbType.Int16);
                parameters.Add("@param_prefered_method_enum_id", dealerInfo.prefered_method_enum_id, DbType.Int16);
                parameters.Add("@param_internal_credit_rating", dealerInfo.internal_credit_rating, DbType.Decimal);
                parameters.Add("@param_allowable_credit", dealerInfo.allowable_credit, DbType.Decimal);
                parameters.Add("@param_maximum_credit", dealerInfo.maximum_credit, DbType.Decimal);
                parameters.Add("@param_credit_days", dealerInfo.credit_days, DbType.Decimal);
                parameters.Add("@param_mobile", dealerInfo.mobile, DbType.String);
                parameters.Add("@param_phone", dealerInfo.phone, DbType.String);
                parameters.Add("@param_email", dealerInfo.email, DbType.String);
                parameters.Add("@param_web_url", dealerInfo.web_url, DbType.String);
                parameters.Add("@param_logo_path", dealerInfo.logo_path, DbType.String);
                parameters.Add("@param_continent_enum_id", dealerInfo.continent_enum_id, DbType.Int16);
                parameters.Add("@param_country_id", dealerInfo.country_id, DbType.Int32);
                parameters.Add("@param_division_id", dealerInfo.division_id, DbType.Int32);
                parameters.Add("@param_district_id", dealerInfo.district_id, DbType.Int32);
                parameters.Add("@param_thana_id", dealerInfo.thana_id, DbType.Int32);
                parameters.Add("@param_zone_id", dealerInfo.zone_id, DbType.Int32);
                parameters.Add("@param_city", dealerInfo.city, DbType.String);
                parameters.Add("@param_post_code", dealerInfo.post_code, DbType.String);
                parameters.Add("@param_block", dealerInfo.block, DbType.String);
                parameters.Add("@param_road_no", dealerInfo.road_no, DbType.String);
                parameters.Add("@param_house_no", dealerInfo.house_no, DbType.String);
                parameters.Add("@param_flat_no", dealerInfo.flat_no, DbType.String);
                parameters.Add("@param_address_note", dealerInfo.address_note, DbType.String);
                parameters.Add("@param_is_active", true, DbType.Boolean);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_updated_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int64);
                parameters.Add("@param_updated_user_info_id", currentUserInfoId ?? 0, DbType.Int64);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_dealer_info_id", dealerInfo.dealer_info_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            return parameters;
        }

        public async Task<dynamic> IUD_DealerInfo(DealerInfo dealerInfo, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = DealerInfoParameterBinding(dealerInfo, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Party].[SP_Dealer_Info_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    result = DealerInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    result = DealerInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    result = DealerInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage, result);
                }

                if (data.Count > 0)
                {
                    result = DealerInfoViewModel.ConvertToModel(data);
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


        public async Task<dynamic> GetAllDealerInfo()
        {
            var message = new CommonMessage();
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Party].[Dealer_Info] DI WHERE DI.company_id =" + company_id + "";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select DealerInfoViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetDealerInfoById(int dealer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = @"SELECT * FROM [Party].[Dealer_Info] DI WHERE DI.dealer_info_id =@dealer_info_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@dealer_info_id", dealer_info_id);
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    result = DealerInfoViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetDealerInfoCboList()
        {
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT DI.dealer_info_id,(DI.dealer_info_code+' - '+ DI.dealer_info_name)dealer_info_name FROM [Party].[Dealer_Info] DI";
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
