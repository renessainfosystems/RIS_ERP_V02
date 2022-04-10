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
    public class DealerContactInfoDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public DealerContactInfoDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters DealerContactInfoParameterBinding(DealerContactInfo dealerContactInfo, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_dealer_contact_info_id", dealerContactInfo.dealer_contact_info_id, DbType.Int32);
                parameters.Add("@param_dealer_info_id", dealerContactInfo.dealer_info_id, DbType.Int32);
                parameters.Add("@param_dealer_contact_info_code", dealerContactInfo.dealer_contact_info_code, DbType.String);
                parameters.Add("@param_person_name", dealerContactInfo.person_name, DbType.String);
                parameters.Add("@param_person_designation", dealerContactInfo.person_designation, DbType.String);
                parameters.Add("@param_father_name", dealerContactInfo.father_name, DbType.String);
                parameters.Add("@param_mother_name", dealerContactInfo.mother_name, DbType.String);
                parameters.Add("@param_date_of_birth", dealerContactInfo.date_of_birth, DbType.Date);
                parameters.Add("@param_religion_enum_id", dealerContactInfo.religion_enum_id, DbType.Int16);
                parameters.Add("@param_nationality", dealerContactInfo.nationality, DbType.String);
                parameters.Add("@param_national_id_no", dealerContactInfo.national_id_no, DbType.String);
                parameters.Add("@param_birth_certificate_no", dealerContactInfo.birth_certificate_no, DbType.String);
                parameters.Add("@param_passport_no", dealerContactInfo.passport_no, DbType.String);
                parameters.Add("@param_mobile", dealerContactInfo.mobile, DbType.String);
                parameters.Add("@param_phone", dealerContactInfo.phone, DbType.String);
                parameters.Add("@param_email", dealerContactInfo.email, DbType.String);
                parameters.Add("@param_emergency_contact", dealerContactInfo.emergency_contact, DbType.String);
                parameters.Add("@param_blood_group_enum_id", dealerContactInfo.blood_group_enum_id, DbType.Int16);
                parameters.Add("@param_image_path", dealerContactInfo.image_path, DbType.String);
                parameters.Add("@param_permanent_country_id", dealerContactInfo.permanent_country_id, DbType.Int32);
                parameters.Add("@param_permanent_division_id", dealerContactInfo.permanent_division_id, DbType.Int32);
                parameters.Add("@param_permanent_district_id", dealerContactInfo.permanent_district_id, DbType.Int32);
                parameters.Add("@param_permanent_thana_id", dealerContactInfo.permanent_thana_id, DbType.Int32);
                parameters.Add("@param_permanent_zone_id", dealerContactInfo.permanent_zone_id, DbType.Int32);
                parameters.Add("@param_permanent_city", dealerContactInfo.permanent_city, DbType.String);
                parameters.Add("@param_permanent_post_code", dealerContactInfo.permanent_post_code, DbType.String);
                parameters.Add("@param_permanent_block", dealerContactInfo.permanent_block, DbType.String);
                parameters.Add("@param_permanent_road_no", dealerContactInfo.permanent_road_no, DbType.String);
                parameters.Add("@param_permanent_house_no", dealerContactInfo.permanent_house_no, DbType.String);
                parameters.Add("@param_permanent_flat_no", dealerContactInfo.permanent_flat_no, DbType.String);
                parameters.Add("@param_present_country_id", dealerContactInfo.present_country_id, DbType.Int32);
                parameters.Add("@param_present_division_id", dealerContactInfo.present_division_id, DbType.Int32);
                parameters.Add("@param_present_district_id", dealerContactInfo.present_district_id, DbType.Int32);
                parameters.Add("@param_present_thana_id", dealerContactInfo.present_thana_id, DbType.Int32);
                parameters.Add("@param_present_zone_id", dealerContactInfo.present_zone_id, DbType.Int32);
                parameters.Add("@param_present_city", dealerContactInfo.present_city, DbType.String);
                parameters.Add("@param_present_post_code", dealerContactInfo.present_post_code, DbType.String);
                parameters.Add("@param_present_block", dealerContactInfo.present_block, DbType.String);
                parameters.Add("@param_present_road_no", dealerContactInfo.present_road_no, DbType.String);
                parameters.Add("@param_present_house_no", dealerContactInfo.present_house_no, DbType.String);
                parameters.Add("@param_present_flat_no", dealerContactInfo.present_flat_no, DbType.String);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int64);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_dealer_contact_info_id", dealerContactInfo.dealer_contact_info_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }            
            return parameters;
        }

        public async Task<dynamic> IUD_DealerContactInfo(DealerContactInfo dealerContactInfo, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = DealerContactInfoParameterBinding(dealerContactInfo, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Party].[SP_Dealer_Contact_Info_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    result = DealerContactInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    result = DealerContactInfoViewModel.ConvertToModel(data);
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }
               
                if (data.Count > 0)
                {
                    result = DealerContactInfoViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetAllDealerContactInfo()
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Party].[Dealer_Contact_Info]";
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
            return (result);
        }

        public async Task<dynamic> GetDealerContactInfoById(int dealer_contact_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Dealer_Contact_Info] DCI WHERE DCI.dealer_contact_info_id =@dealer_contact_info_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@dealer_contact_info_id", dealer_contact_info_id);
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    result = DealerContactInfoViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetContactInfoByDealerId(int dealer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Dealer_Contact_Info] DCI WHERE DCI.dealer_info_id =@dealer_info_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@dealer_info_id", dealer_info_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql,parameters);
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
