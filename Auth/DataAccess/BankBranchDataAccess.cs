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
    public class BankBranchDataAccess
    {
        public IConfiguration _config;

        private readonly IDbConnection _dbConnection;
        //protected CommonParammeter _commonParammeter { get; set; }

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public BankBranchDataAccess(IConfiguration configuration, IDbConnection dbConnection)
        {
            _config = configuration;
            _dbConnection = dbConnection;

        }

        //Parameter Binding
        public DynamicParameters BankBranchParameterBinding(BankBranch bankBranch, int operationType)
        {
            // var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {

                parameters.Add("@bank_branch_id", bankBranch.bank_branch_id, DbType.Int32);
                parameters.Add("@bank_branch_name", bankBranch.bank_branch_name, DbType.String);
                parameters.Add("@bank_branch_short_name", bankBranch.bank_branch_short_name, DbType.String);
                parameters.Add("@bank_branch_routing", bankBranch.bank_branch_routing, DbType.String);
                parameters.Add("@bank_id", bankBranch.bank_id, DbType.Int32);
                parameters.Add("@bank_branch_contact_number", bankBranch.bank_branch_contact_number, DbType.String);
                parameters.Add("@bank_branch_email", bankBranch.bank_branch_email, DbType.String);
                parameters.Add("@country_id", bankBranch.country_id, DbType.Int32);
                parameters.Add("@division_id", bankBranch.division_id, DbType.Int32);
                parameters.Add("@district_id", bankBranch.district_id, DbType.Int32);
                parameters.Add("@city", bankBranch.city, DbType.String);
                parameters.Add("@ps_area", bankBranch.ps_area, DbType.String);
                parameters.Add("@post_code", bankBranch.post_code, DbType.String);
                parameters.Add("@block", bankBranch.block, DbType.String);
                parameters.Add("@road_no", bankBranch.road_no, DbType.String);
                parameters.Add("@house_no", bankBranch.house_no, DbType.String);
                parameters.Add("@flat_no", bankBranch.flat_no, DbType.String);
                parameters.Add("@address_note", bankBranch.address_note, DbType.String);
                parameters.Add("@remarks", bankBranch.remarks, DbType.String);
                parameters.Add("@is_branch", bankBranch.is_branch, DbType.Boolean);
                //parameters.Add("@is_active", bankBranch.is_active, DbType.Boolean);
                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@bank_branch_id", bankBranch.bank_branch_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }


        //User Insert Update Delete
        public async Task<dynamic> IUDBankBranch(BankBranch bankBranch, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = BankBranchParameterBinding(bankBranch, dbOperation);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            using (var tran = _dbConnection.BeginTransaction())
            {
                try
                {

                    tran.Commit();

                    if (dbOperation == 3)
                    {
                        dynamic data = await _dbConnection.ExecuteAsync("[Administrative].[SP_Bank_Branch_D]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                        message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                    }
                    else
                    {
                        dynamic data = await _dbConnection.QueryAsync<dynamic>("[Administrative].[SP_BankBranch_IUD]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);

                        if (data != null)
                        {
                            List<dynamic> dataList = data;

                            result = (from dr in dataList select BankBranchViewModel.ConvertToModel(dr)).ToList();


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

        public async Task<dynamic> GetAllBankBranchs()
        {
  
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = @"SELECT BB.*,C.country_name,dv.division_name,ds.district_name,B.bank_name
                            FROM [Administrative].[Bank_Branch] BB 
                            left join[Administrative].[Bank] B on BB.bank_id = B.bank_id 
                            left join[Administrative].[Country] C on BB.country_id = C.country_id 
                            left join[Administrative].[Division] DV on BB.division_id = DV.division_id 
                            left join[Administrative].[District] DS on BB.district_id = DS.district_id ";

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select BankBranchViewModel.ConvertToModel(dr)).ToList();
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

        public async Task<dynamic> GetAllBankBranchByBankBranchId(int bank_branch_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = @"SELECT BB.*,C.country_name,dv.division_name,ds.district_name,B.bank_name
                            FROM[Administrative].[Bank_Branch] BB
                            left join[Administrative].[Bank] B on BB.bank_id = B.bank_id
                            left join[Administrative].[Country] C on BB.country_id = C.country_id
                            left join[Administrative].[Division] DV on BB.division_id = DV.division_id
                            left join[Administrative].[District] DS on BB.district_id = DS.district_id
                            WHERE bank_branch_id =@bank_branch_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@bank_branch_id", bank_branch_id);

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {

                    result = BankBranchViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetAllBankBranchByBankId(int bank_id)
        {
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT bank_branch_id,bank_branch_name " +
                 "FROM [Administrative].[Bank_Branch] WHERE  bank_id=@bank_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@bank_id", bank_id);

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
