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
    public class RetailerContactInfoDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public RetailerContactInfoDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters RetailerContactInfoParameterBinding(RetailerContactInfo retailerContactInfo, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_retailer_contact_info_id", retailerContactInfo.retailer_contact_info_id, DbType.Int32);
                parameters.Add("@param_retailer_info_id", retailerContactInfo.retailer_info_id, DbType.Int32);
                parameters.Add("@param_retailer_contact_info_code", retailerContactInfo.retailer_contact_info_code, DbType.String);
                parameters.Add("@param_person_name", retailerContactInfo.person_name, DbType.String);
                parameters.Add("@param_person_designation", retailerContactInfo.person_designation, DbType.String);
                parameters.Add("@param_father_name", retailerContactInfo.father_name, DbType.String);
                parameters.Add("@param_mother_name", retailerContactInfo.mother_name, DbType.String);
                parameters.Add("@param_date_of_birth", retailerContactInfo.date_of_birth, DbType.Date);
                parameters.Add("@param_religion_enum_id", retailerContactInfo.religion_enum_id, DbType.Int16);
                parameters.Add("@param_nationality", retailerContactInfo.nationality, DbType.String);
                parameters.Add("@param_national_id_no", retailerContactInfo.national_id_no, DbType.String);
                parameters.Add("@param_birth_certificate_no", retailerContactInfo.birth_certificate_no, DbType.String);
                parameters.Add("@param_passport_no", retailerContactInfo.passport_no, DbType.String);
                parameters.Add("@param_mobile", retailerContactInfo.mobile, DbType.String);
                parameters.Add("@param_phone", retailerContactInfo.phone, DbType.String);
                parameters.Add("@param_email", retailerContactInfo.email, DbType.String);
                parameters.Add("@param_emergency_contact", retailerContactInfo.emergency_contact, DbType.String);
                parameters.Add("@param_blood_group_enum_id", retailerContactInfo.blood_group_enum_id, DbType.Int16);
                parameters.Add("@param_image_path", retailerContactInfo.image_path, DbType.String);
                parameters.Add("@param_permanent_country_id", retailerContactInfo.permanent_country_id, DbType.Int32);
                parameters.Add("@param_permanent_division_id", retailerContactInfo.permanent_division_id, DbType.Int32);
                parameters.Add("@param_permanent_district_id", retailerContactInfo.permanent_district_id, DbType.Int32);
                parameters.Add("@param_permanent_thana_id", retailerContactInfo.permanent_thana_id, DbType.Int32);
                parameters.Add("@param_permanent_zone_id", retailerContactInfo.permanent_zone_id, DbType.Int32);
                parameters.Add("@param_permanent_city", retailerContactInfo.permanent_city, DbType.String);
                parameters.Add("@param_permanent_post_code", retailerContactInfo.permanent_post_code, DbType.String);
                parameters.Add("@param_permanent_block", retailerContactInfo.permanent_block, DbType.String);
                parameters.Add("@param_permanent_road_no", retailerContactInfo.permanent_road_no, DbType.String);
                parameters.Add("@param_permanent_house_no", retailerContactInfo.permanent_house_no, DbType.String);
                parameters.Add("@param_permanent_flat_no", retailerContactInfo.permanent_flat_no, DbType.String);
                parameters.Add("@param_present_country_id", retailerContactInfo.present_country_id, DbType.Int32);
                parameters.Add("@param_present_division_id", retailerContactInfo.present_division_id, DbType.Int32);
                parameters.Add("@param_present_district_id", retailerContactInfo.present_district_id, DbType.Int32);
                parameters.Add("@param_present_thana_id", retailerContactInfo.present_thana_id, DbType.Int32);
                parameters.Add("@param_present_zone_id", retailerContactInfo.present_zone_id, DbType.Int32);
                parameters.Add("@param_present_city", retailerContactInfo.present_city, DbType.String);
                parameters.Add("@param_present_post_code", retailerContactInfo.present_post_code, DbType.String);
                parameters.Add("@param_present_block", retailerContactInfo.present_block, DbType.String);
                parameters.Add("@param_present_road_no", retailerContactInfo.present_road_no, DbType.String);
                parameters.Add("@param_present_house_no", retailerContactInfo.present_house_no, DbType.String);
                parameters.Add("@param_present_flat_no", retailerContactInfo.present_flat_no, DbType.String);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int64);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_retailer_contact_info_id", retailerContactInfo.retailer_contact_info_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }            
            return parameters;
        }

        public async Task<dynamic> IUD_RetailerContactInfo(RetailerContactInfo retailerContactInfo, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = RetailerContactInfoParameterBinding(retailerContactInfo, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Party].[SP_Retailer_Contact_Info_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    result = RetailerContactInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    result = RetailerContactInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    result = RetailerContactInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage, result);
                }
               
                if (data.Count > 0)
                {
                    result = RetailerContactInfoViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetAllRetailerContactInfo()
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Party].[Retailer_Contact_Info]";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select RetailerContactInfoViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetRetailerContactInfoById(int retailer_contact_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Retailer_Contact_Info] DCI WHERE DCI.retailer_contact_info_id =" + retailer_contact_info_id + "";
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql);
                if (data != null)
                {
                    result = RetailerContactInfoViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetContactInfoByRetailerId(int retailer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Retailer_Contact_Info] DCI WHERE DCI.retailer_info_id =" + retailer_info_id + "";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select RetailerContactInfoViewModel.ConvertToModel(dr)).ToList();
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
