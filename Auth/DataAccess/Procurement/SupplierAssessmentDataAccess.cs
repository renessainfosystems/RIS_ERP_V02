using Auth.Model.Procurement.Model;
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



namespace Auth.DataAccess.Procurement
{
    public class SupplierAssessmentDataAccess
    {
        public IConfiguration _config;

        private readonly IDbConnection _dbConnection;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public SupplierAssessmentDataAccess(IConfiguration configuration, IDbConnection dbConnection)
        {
            _config = configuration;
            _dbConnection = dbConnection;

        }

        //Parameter Binding
        public DynamicParameters SupplierAssessmentarameterBinding(SupplierAssessment supplierAssessment, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_supplier_id", supplierAssessment.supplier_id, DbType.Int32);
                parameters.Add("@param_criteria_type", supplierAssessment.criteria_type, DbType.Int32);
                parameters.Add("@param_assessment_criteria_id", supplierAssessment.assessment_criteria_id, DbType.Int32);
                parameters.Add("@param_manual_weight", supplierAssessment.manual_weight, DbType.Decimal);
                parameters.Add("@param_actual_weight", supplierAssessment.actual_weight, DbType.Decimal);
                parameters.Add("@param_comments", supplierAssessment.comments, DbType.String);

                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_updated_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", user_info_id ?? 0, DbType.Int64);
                parameters.Add("@param_updated_user_info_id", user_info_id ?? 0, DbType.Int64);

                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            //else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            //{
            //    parameters.Add("@supplier_id", supplierApplication.supplier_id, DbType.Int32);
            //    parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            //}

            //else if (operationType == (int)GlobalEnumList.DBOperation.Submit)
            //{
            //    parameters.Add("@supplier_id", supplierApplication.supplier_id, DbType.Int32);
            //    parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Submit);
            //}

            return parameters;
        }

        public async Task<dynamic> IUDSupplierAssessment(SupplierAssessment supplierAssessment, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;


            var parameters = SupplierAssessmentarameterBinding(supplierAssessment, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            using (var tran = _dbConnection.BeginTransaction())
            {
                try
                {

                    dynamic data = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_SupplierAssessment_IUD]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);

                    // data = await _dbConnection.QueryAsync<dynamic>("[Party].[SP_Dealer_Verification_IUD]", dealerAssignSessionParameters, commandType: CommandType.StoredProcedure, transaction: tran);

                    if (data != null)
                    {
                        List<dynamic> dataList = data;

                        result = (from dr in dataList select SupplierAssessmentViewModel.ConvertToModel(dr)).ToList();


                        if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Approve)
                        {
                            return message = CommonMessage.SetSuccessMessage("Policy Approved", result);
                        }

                        if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Create)
                        {
                            message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                        }
                        else if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Update)
                        {
                            message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
                        }
                        else
                        {
                            message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                        }
                    }
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex.InnerException;
                }
                finally
                {
                    //DB connection dispose with db connection close
                    tran.Dispose();

                }

            }

            return (message);
        }

    }
}
