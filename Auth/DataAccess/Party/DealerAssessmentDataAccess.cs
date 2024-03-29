﻿using Auth.Model.Procurement.Model;
using Auth.Model.Procurement.ViewModel;
using Auth.Utility;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Auth.Utility.Procurement.Enum;
using static Auth.Utility.CommonMessage;
using Auth.Model.Party.Model;
using Auth.Model.Party.ViewModel;

/// <summary>
/// Created By: Jahid
/// Created Date: 24/04/2022
/// </summary>
namespace Auth.DataAccess.Party
{
    public class DealerAssessmentDataAccess
    {
        public IConfiguration _config;

        private readonly IDbConnection _dbConnection;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public DealerAssessmentDataAccess(IConfiguration configuration, IDbConnection dbConnection)
        {
            _config = configuration;
            _dbConnection = dbConnection;

        }

        //Parameter Binding
        public DynamicParameters DealerAssessmentarameterBinding(DealerAssessment dealerAssessment, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_dealer_info_id", dealerAssessment.dealer_info_id, DbType.Int32);
                parameters.Add("@param_criteria_type_id", dealerAssessment.criteria_type_id, DbType.Int32);
                parameters.Add("@param_assessment_criteria_id", dealerAssessment.assessment_criteria_id, DbType.Int32);
                parameters.Add("@param_automatic_score", dealerAssessment.automatic_score, DbType.Decimal);
                parameters.Add("@param_manual_score", dealerAssessment.manual_score, DbType.Decimal);
                parameters.Add("@param_actual_score", dealerAssessment.actual_score, DbType.Decimal);
                parameters.Add("@param_comment", dealerAssessment.comment, DbType.String);
                parameters.Add("@param_is_assessment", false, DbType.Boolean);
                parameters.Add("@param_is_approval", false, DbType.Boolean);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", user_info_id ?? 0, DbType.Int64);

                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }

            return parameters;
        }

        public async Task<dynamic> IUDDealerAssessment(DealerAssessment dealerAssessment, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;


            var parameters = DealerAssessmentarameterBinding(dealerAssessment, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                dynamic data = await _dbConnection.QueryAsync<dynamic>("[Party].[SP_DealerAssessment_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (data != null)
                {
                    List<dynamic> dataList = data;

                    result = (from dr in dataList select DealerAssessmentViewModel.ConvertToModel(dr)).ToList();



                    if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Create)
                    {
                        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                    }
                    else if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Update)
                    {
                        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
                    }
                    else if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                    {
                        return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                    }
                    else
                    {
                        message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                    }
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

        public async Task<dynamic> GetAllDealerAssessmentInfo()
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Party].[Dealer_Assessment]";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select DealerAssessmentViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetAssessmentByDealerId(int dealer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT * FROM [Party].[Dealer_Assessment] DCI WHERE DCI.dealer_info_id =@dealer_info_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@dealer_info_id", dealer_info_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select DealerAssessmentViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetAllAssessmentCriteria(int dealer_info_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sql = @"SELECT AC.*,
                            ISNULL(DA.manual_score,0)manual_score,ISNULL(DA.actual_score,0)actual_score ,DA.comment
                            FROM Administrative.Assessment_Criteria AC
                            LEFT JOIN (SELECT *FROM Party.Dealer_Assessment WHERE dealer_info_id=@dealer_info_id) DA 
                            ON DA.assessment_criteria_id=AC.assessment_criteria_id
                            WHERE AC.criteria_type_id=1 and AC.party_type_id=2";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@dealer_info_id", dealer_info_id);
                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

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
