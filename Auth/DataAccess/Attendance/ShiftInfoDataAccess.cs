using Auth.Model.Attendance.Model;
using Auth.Model.Attendance.ViewModel;
using Auth.Utility.Attendance;
using Auth.Utility.Attendance.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.DataAccess.Attendance
{
    public class ShiftInfoDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public ShiftInfoDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }
        //Parameter Binding
        public DynamicParameters shiftInfoParameterBinding(ShiftInfo shiftInfo, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                
                parameters.Add("@param_shift_id", shiftInfo.shift_id, DbType.Int32);
                parameters.Add("@param_shift_name", shiftInfo.shift_name, DbType.String);
                parameters.Add("@param_code", shiftInfo.code, DbType.String);
                parameters.Add("@param_shift_type_id_enum", shiftInfo.shift_type_id_enum, DbType.Int32);
                parameters.Add("@param_time_zone_id", shiftInfo.time_zone_id, DbType.Int32);
                parameters.Add("@param_attendance_count", shiftInfo.attendance_count, DbType.Int32);
                parameters.Add("@param_remark", shiftInfo.remark, DbType.String);
                parameters.Add("@param_day_start", string.IsNullOrEmpty(shiftInfo.day_start) ? null : DateTime.ParseExact(shiftInfo.day_start, "HH:mm", CultureInfo.InvariantCulture), DbType.Time );
                parameters.Add("@param_day_end", string.IsNullOrEmpty(shiftInfo.day_end) ? null : DateTime.ParseExact(shiftInfo.day_end, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_shift_start", string.IsNullOrEmpty(shiftInfo.shift_start) ? null : DateTime.ParseExact(shiftInfo.shift_start, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_shift_end", string.IsNullOrEmpty(shiftInfo.shift_end) ? null : DateTime.ParseExact(shiftInfo.shift_end, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_is_allow_half_day", shiftInfo.is_allow_half_day, DbType.Boolean);
                parameters.Add("@param_half_shift_start", string.IsNullOrEmpty(shiftInfo.half_shift_start) ? null : DateTime.ParseExact(shiftInfo.half_shift_start, "HH:mm", CultureInfo.InvariantCulture) , DbType.Time);
                parameters.Add("@param_half_shift_end", string.IsNullOrEmpty(shiftInfo.half_shift_end) ? null : DateTime.ParseExact(shiftInfo.half_shift_end, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_report_time", string.IsNullOrEmpty(shiftInfo.report_time) ? null : DateTime.ParseExact(shiftInfo.report_time, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_late_tolerance_min", shiftInfo.late_tolerance_min, DbType.Int32);
                parameters.Add("@param_extended_time_min", shiftInfo.extended_time_min, DbType.Int32);
                parameters.Add("@param_early_tolerance_min", shiftInfo.early_tolerance_min, DbType.Int32);
                parameters.Add("@param_working_hour_min", shiftInfo.working_hour_min, DbType.Int32);
                parameters.Add("@param_half_working_hour_min", shiftInfo.half_working_hour_min, DbType.Int32);
                parameters.Add("@param_OT_policy_id", shiftInfo.OT_policy_id, DbType.Int32);
                parameters.Add("@param_is_OT_before_shift", shiftInfo.is_OT_before_shift, DbType.Boolean);
                parameters.Add("@param_is_OT_after_shift", shiftInfo.is_OT_after_shift, DbType.Boolean);
                parameters.Add("@param_attendance_benefit_policy_id", shiftInfo.attendance_benefit_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_shift_id", shiftInfo.shift_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_shift_id", shiftInfo.shift_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }


            return parameters;
        }

        public DynamicParameters shiftBreakDurationParameterBinding(ShiftBreakDuration shiftBreakDuration, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_shift_break_duration_id", shiftBreakDuration.shift_break_duration_id, DbType.Int32);
                parameters.Add("@param_shift_id", shiftBreakDuration.shift_id, DbType.Int32);
                parameters.Add("@param_shift_break_head_id", shiftBreakDuration.shift_break_head_id, DbType.Int32);
                parameters.Add("@param_is_allow_start_end", shiftBreakDuration.is_allow_start_end, DbType.Boolean);
                parameters.Add("@param_break_start", DateTime.ParseExact(shiftBreakDuration.break_start, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_break_end", DateTime.ParseExact(shiftBreakDuration.break_end, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_break_duration_min", shiftBreakDuration.break_duration_min, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_shift_break_duration_id", shiftBreakDuration.shift_break_duration_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }
        public DynamicParameters shiftFilteringParameterBinding(ShiftFiltering shiftFiltering)
        {
           
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
          
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            
            parameters.Add("@param_shift_type_id_enum", shiftFiltering.shift_type_id_enum, DbType.Int32);
            parameters.Add("@param_attendance_count", shiftFiltering.attendance_count, DbType.Int32);
            parameters.Add("@param_time_zone_id", shiftFiltering.time_zone_id, DbType.Int32);
            parameters.Add("@param_shift_name", string.IsNullOrEmpty(shiftFiltering.shift_name)?'%':shiftFiltering.shift_name, DbType.String);
            parameters.Add("@param_is_night_shift", shiftFiltering.is_night_shift, DbType.Boolean);
            parameters.Add("@param_is_allow_OT", shiftFiltering.is_allow_OT, DbType.Boolean);
            parameters.Add("@param_is_allow_half_day", shiftFiltering.is_allow_half_day, DbType.Boolean);
            parameters.Add("@param_is_inactive", shiftFiltering.is_inactive, DbType.Boolean);
            parameters.Add("@param_is_allow_benifit", shiftFiltering.is_allow_benifit, DbType.Boolean);
            parameters.Add("@param_shift_start", string.IsNullOrEmpty(shiftFiltering.shift_start) ? null : DateTime.ParseExact(shiftFiltering.shift_start, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
            parameters.Add("@param_shift_end", string.IsNullOrEmpty(shiftFiltering.shift_end) ? null : DateTime.ParseExact(shiftFiltering.shift_end, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
            parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
            parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
            parameters.Add("@param_isAdvanceSearch", shiftFiltering.isAdvanceSearch, DbType.Boolean);
            
            return parameters;
        }
        public async Task<dynamic> IUD_shiftInfo(ShiftInfo shiftInfo, int dbOperation)
        {
            var message = new CommonMessage();
         
            var parameters = shiftInfoParameterBinding(shiftInfo, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Shift_Info_IUD]", parameters, commandType: CommandType.StoredProcedure);
                if (dbOperation == (int)DBOperation.Create && shiftInfo.shiftBreakDurations != null)
                {
                    if (shiftInfo.shiftBreakDurations.Count > 0 && data[0].shift_id > 0)
                    {
                        foreach (ShiftBreakDuration item in shiftInfo.shiftBreakDurations)
                        {
                            item.shift_id = data[0].shift_id;
                            var slabParameters = shiftBreakDurationParameterBinding(item, dbOperation);
                            dynamic slabData = _dbConnection.QueryAsync<dynamic>("[Attendance].[SP_Shift_Break_Duration_IUD]", slabParameters, commandType: CommandType.StoredProcedure);

                        }
                    }
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Approve)
                {
                    return message = CommonMessage.SetSuccessMessage("Policy Approved");
                }

                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
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
  
        public async Task<dynamic> IUD_shiftInfoSlab(ShiftBreakDuration shiftBreakDuration, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = shiftBreakDurationParameterBinding(shiftBreakDuration, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Shift_Break_Duration_IUD]", parameters, commandType: CommandType.StoredProcedure);
                // Insert Menu events



                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
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
        public async Task<dynamic> GetTimeZone()
        {
            var message = new CommonMessage();
            var User_Info_Id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
            
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_user_id", User_Info_Id);
                 result = await _dbConnection.QueryAsync<dynamic>("[Auth].[SP_Time_Zone_Get]", parameters, commandType: CommandType.StoredProcedure);
             

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

        public async Task<dynamic> GetShiftById(int shift_id)
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                var sql = "	SELECT [shift_id],[shift_name],[code],[shift_type_id_enum],[remark],[time_zone_id],[is_day_crossing],[attendance_count],Convert(varchar(5),[day_start])[day_start],Convert(varchar(5),[day_end])[day_end]," +
                    "Convert(varchar(5),[shift_start])[shift_start],Convert(varchar(5),[shift_end])[shift_end],[is_allow_half_day],Convert(varchar(5),[half_shift_start])[half_shift_start],Convert(varchar(5),[half_shift_end])[half_shift_end],Convert(varchar(5),[report_time])[report_time],[late_tolerance_min],[extended_time_min]," +
                    "[early_tolerance_min],[working_hour_min],[half_working_hour_min],[OT_policy_id],[is_OT_before_shift],[is_OT_after_shift],[attendance_benefit_policy_id] FROM [Attendance].[Shift_Info] WHERE shift_id = @shift_id AND company_group_id = @company_group_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                parameters.Add("@shift_id", shift_id);

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


            return (result);
        }

        public async Task<dynamic> GetAllShift()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_company_group_id", company_group_id);
                parameters.Add("@param_company_id", company_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>("[Attendance].[SP_All_Shift_Get]", parameters, commandType: CommandType.StoredProcedure);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select ShiftInfoViewModel.ConvertToModel(dr)).ToList();

                    //  message = CommonMessage.SetSuccessMessage(CommonSaveMessage,result);

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

        public async Task<dynamic> GetShiftForDP()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_company_group_id", company_group_id);
                parameters.Add("@param_company_id", company_id);
                var sql = "DECLARE @pv_is_shared BIT " +
                    "SELECT @pv_is_shared = is_shared from Auth.Software_Sharing_Policy " +
                    "SELECT shift_id,shift_name+'('+Convert(varchar(5),[shift_start]) +'-'+ Convert(varchar(5),[shift_end])+')' shift_name FROM[Attendance].[Shift_Info] s " +
                    "WHERE S.company_group_id = CASE WHEN(@pv_is_shared = 1) THEN @param_company_group_id ELSE S.company_group_id END " +
                    "AND S.company_id = CASE WHEN(@pv_is_shared = 0) THEN @param_company_id ELSE S.company_id END AND is_active = 1";
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


            return (result);
        }
        public async Task<dynamic> GetAllShiftByFiltering(ShiftFiltering shiftFiltering)
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                DynamicParameters parameters = shiftFilteringParameterBinding(shiftFiltering);
   
                dynamic data = await _dbConnection.QueryAsync<dynamic>("[Attendance].[SP_All_Shift_Get_By_Filtering]", parameters, commandType: CommandType.StoredProcedure);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select ShiftInfoViewModel.ConvertToModel(dr)).ToList();

                    //  message = CommonMessage.SetSuccessMessage(CommonSaveMessage,result);

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

        public async Task<dynamic> GetShiftDurationSlabById(int shift_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT shift_break_duration_id,shift_id,shift_break_head_id,is_active,break_duration_min  " +
                    "FROM Attendance.Shift_Break_Duration WHERE shift_id=@shift_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@shift_id", shift_id);

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
