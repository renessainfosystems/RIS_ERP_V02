using Auth.Model.Administrative.ViewModel;
using Auth.Model.Administrative.Model;
using Auth.Utility.Administrative;
using Auth.Utility.Administrative.Enum;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;


namespace DataAccess
{
    public class BankDataAccess
    {
        public IConfiguration _config;

        private readonly IDbConnection _dbConnection;


        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public BankDataAccess(IConfiguration configuration, IDbConnection dbConnection)
        {
            _config = configuration;
            _dbConnection = dbConnection;

        }

        //Parameter Binding
        public DynamicParameters BankParameterBinding(Bank bank, int operationType)
        {
           // var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@bank_id", bank.bank_id, DbType.Int32);
                parameters.Add("@bank_name", bank.bank_name, DbType.String);
                parameters.Add("@bank_short_name", bank.bank_short_name, DbType.String);
                parameters.Add("@bank_swift_code", bank.bank_swift_code, DbType.String);
                parameters.Add("@bank_email", bank.bank_email, DbType.String);
                parameters.Add("@bank_web_url", bank.bank_web_url, DbType.String);
                parameters.Add("@country_id", bank.country_id, DbType.Int32);
                parameters.Add("@division_id", bank.division_id, DbType.Int32);
                parameters.Add("@district_id", bank.district_id, DbType.Int32);
                parameters.Add("@city", bank.city, DbType.String);
                parameters.Add("@ps_area", bank.ps_area, DbType.String);
                parameters.Add("@post_code", bank.post_code, DbType.String);
                parameters.Add("@block", bank.block, DbType.String);
                parameters.Add("@road_no", bank.road_no, DbType.String);
                parameters.Add("@house_no", bank.house_no, DbType.String);
                parameters.Add("@flat_no", bank.flat_no, DbType.String);
                parameters.Add("@address_note", bank.address_note, DbType.String);
                parameters.Add("@remarks", bank.remarks, DbType.String);
                parameters.Add("@is_bank", bank.is_bank, DbType.Boolean);
                parameters.Add("@is_local", bank.is_local, DbType.Boolean);
                //parameters.Add("@is_active", bank.is_active, DbType.Boolean);
                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
    }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@bank_id", bank.bank_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }


        //User Insert Update Delete
        public async Task<dynamic> IUDBank(Bank bank, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = BankParameterBinding(bank, dbOperation);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            using (var tran = _dbConnection.BeginTransaction())
            {
                try
                {

                    tran.Commit();

                    if (dbOperation == 3)
                    {
                        dynamic data = await _dbConnection.ExecuteAsync("[Administrative].[SP_Bank_D]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                        message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);

                    }
                    else
                    {
                        dynamic data = await _dbConnection.QueryAsync<dynamic>("[Administrative].[SP_Bank_IUD]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);

                        if (data != null)
                        {
                            List<dynamic> dataList = data;

                            result = (from dr in dataList select BankViewModel.ConvertToModel(dr)).ToList();


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
                    }


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

        public async Task<dynamic> GetAllAsync()
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = @"SELECT B.*,C.country_name,dv.division_name,ds.district_name
                            FROM [Administrative].[Bank] B 
                            left join[Administrative].[Country] C on B.country_id = C.country_id 
                            left join[Administrative].[Division] DV on B.division_id = DV.division_id 
                            left join[Administrative].[District] DS on B.district_id = DS.district_id 
                            ORDER BY bank_name ASC";

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);

                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select BankViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetByIdAsync(int bank_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = @"SELECT B.*,C.country_name,dv.division_name,ds.district_name
                            FROM [Administrative].[Bank] B 
                            left join[Administrative].[Country] C on B.country_id = C.country_id 
                            left join[Administrative].[Division] DV on B.division_id = DV.division_id 
                            left join[Administrative].[District] DS on B.district_id = DS.district_id 
                            WHERE [bank_id]=@bank_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@bank_id", bank_id);

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {

                    result = BankViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetAllBank()
        {


            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT bank_id,bank_name FROM [Administrative].[Bank]";

                result = await _dbConnection.QueryAsync<dynamic>(sql);


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
