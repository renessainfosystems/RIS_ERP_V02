using Auth.Model.Procurement.Model;
using Auth.Model.Procurement.ViewModel;
using Auth.Utility;
using Auth.Utility.Procurement.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using static Auth.Utility.CommonMessage;

namespace Auth.DataAccess.Procurement
{
    public class SupplierVerificationDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public SupplierVerificationDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters SupplierVerificationParameterBinding(SupplierVerification supplierVerification, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_supplier_verification_id", supplierVerification.supplier_verification_id, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_dealer_verification_id", supplierVerification.supplier_verification_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_dealer_verification_id", supplierVerification.supplier_verification_id, DbType.Int32);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }
            return parameters;
        }

        public DynamicParameters SupplierAssignSessionParameterBinding(SupplierAssignSession supplierAssignSession, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_supplier_id", supplierAssignSession.supplier_id, DbType.Int32);
                parameters.Add("@param_department_id", supplierAssignSession.department_id, DbType.Int32);
                parameters.Add("@param_employee_id", supplierAssignSession.employee_id, DbType.Int32);
                parameters.Add("@param_remarks", supplierAssignSession.remarks, DbType.String);
                parameters.Add("@param_is_verified", false, DbType.Boolean);
                parameters.Add("@param_verified_date", supplierAssignSession.verified_date, DbType.DateTime);
                parameters.Add("@param_verified_user_id", supplierAssignSession.verified_user_id, DbType.Int64);
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

        public async Task<dynamic> IUD_SupplierVerification(SupplierVerification supplierVerification, int dbOperation)
        {
            var message = new CommonMessage();
            var data = (dynamic)null;
            var parameters = SupplierVerificationParameterBinding(supplierVerification, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            using (var tran = _dbConnection.BeginTransaction())
            {

                try
                {
                    if (supplierVerification.SupplierAssignSession.Count > 0)
                    {
                        foreach (SupplierAssignSession itemsecurityDeposit in supplierVerification.SupplierAssignSession)
                        {
                            var suopplierAssignSessionParameters = SupplierAssignSessionParameterBinding(itemsecurityDeposit, dbOperation);
                            data = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_Supplier_Verification_IUD]", suopplierAssignSessionParameters, commandType: CommandType.StoredProcedure, transaction: tran);
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

        public async Task<dynamic> GetAllSupplierVerification()
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT SI.supplier_id ,(SI.supplier_code+'-'+ SI.legal_name) supplier_name, SI.mobile_no,
	                            D.department_name,E.employee_name,SV.is_verified
	                            FROM Procurement.Supplier_Application SI
	                            LEFT JOIN Procurement.Supplier_Verification SV on SV.supplier_id=SI.Supplier_id
	                            LEFT JOIN PIMS.Employee E on E.employee_id=SV.employee_id
	                            LEFT JOIN Administrative.Department D on D.department_id=SV.department_id
	                            WHERE SV.is_verified=0 and SI.company_id=@company_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_id", company_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select SupplierVerificationViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetSupplierVerificationById(int dealer_Credit_info_id)
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
                    result = SupplierVerificationViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetSupplierVerificationBySupplierId(int dealer_info_id)
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
                    result = (from dr in dataList select SupplierVerificationViewModel.ConvertToModel(dr)).ToList();
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
