using Auth.Model.Attendance.Model;
using Auth.Model.Attendance.ViewModel;
using Auth.Utility;
using Auth.Utility.Attendance.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.DataAccess.Attendance
{
    public class AttendanceCalendarSessionDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public AttendanceCalendarSessionDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters AttendanceCalendarSessionParameterBinding(AttendanceCalendarSession attendanceCalendarSession, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_acs_id", attendanceCalendarSession.acs_id, DbType.Int32);
                parameters.Add("@param_attendance_calendar_id", attendanceCalendarSession.attendance_calendar_id, DbType.Int32);
                parameters.Add("@param_session_name", attendanceCalendarSession.session_name, DbType.String);
                parameters.Add("@param_session_start_date", attendanceCalendarSession.session_start_date, DbType.DateTime);
                parameters.Add("@param_session_end_date", attendanceCalendarSession.session_end_date, DbType.DateTime);
                //parameters.Add("@param_is_active", attendanceCalendarSession.is_active, DbType.Boolean);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_acs_id", attendanceCalendarSession.acs_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Copy)
            {
                parameters.Add("@param_acs_id", attendanceCalendarSession.acs_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Copy);
            }
            return parameters;
        }

        public DynamicParameters AttendanceCalendarSessionHolidayParameterBinding(AttendanceCalendarSessionHoliday attCalendarSessionHoliday, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_acs_id", attCalendarSessionHoliday.acs_id, DbType.Int32);
                parameters.Add("@param_acs_holiday_id", attCalendarSessionHoliday.acs_holiday_id, DbType.Int32);
                parameters.Add("@param_holiday_id", attCalendarSessionHoliday.holiday_id, DbType.Int32);
                parameters.Add("@param_session_start_date", attCalendarSessionHoliday.session_start_date, DbType.DateTime);
                parameters.Add("@param_session_end_date", attCalendarSessionHoliday.session_end_date, DbType.DateTime);
                //parameters.Add("@param_is_active", attCalendarSessionHoliday.is_active, DbType.Boolean);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_acs_id", attCalendarSessionHoliday.acs_id, DbType.Int32);
                parameters.Add("@param_holiday_id", attCalendarSessionHoliday.holiday_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public async Task<dynamic> IUD_AttendanceCalendarSession(AttendanceCalendarSession attendanceCalendar, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = AttendanceCalendarSessionParameterBinding(attendanceCalendar, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Attendance].[SP_Attendance_Calendar_Session_IUD]", parameters, commandType: CommandType.StoredProcedure);
               

                if (dbOperation == (int)DBOperation.Create)
                {
                    if (attendanceCalendar.attendanceCalendarSessions_holiday.Count > 0 && data.acs_id > 0)
                    {
                        foreach (AttendanceCalendarSessionHoliday item in attendanceCalendar.attendanceCalendarSessions_holiday)
                        {
                            item.acs_id = data.acs_id;
                            var menuEventParameters = AttendanceCalendarSessionHolidayParameterBinding(item, dbOperation);
                            dynamic eventData = _dbConnection.QueryAsync<dynamic>("[Attendance].[SP_Attendance_Calendar_Session_Holiday_IUD]", menuEventParameters, commandType: CommandType.StoredProcedure);
                          
                        }
                    }
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (data != null)
                {
                    result = AttendanceCalendarSessionViewModel.ConvertToModelForAllSession(data);
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

        public async Task<dynamic> GetAllAttendanceSessionCalendar()
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT acs_id,a.attendance_calendar_name,FORMAT(session_start_date, 'dd-MMM-yyyy')  session_start_date_str,FORMAT (session_end_date, 'dd-MMM-yyyy') session_end_date_str,s.attendance_calendar_id,session_name,session_start_date,session_end_date,s.is_active " +
                    " FROM  Attendance.Attendance_Calendar_Session  s inner join Attendance.Attendance_Calendar a on a.attendance_calendar_id=s.attendance_calendar_id ORDER BY s.acs_id DESC";

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select AttendanceCalendarSessionViewModel.ConvertToModelForAllSession(dr)).ToList();

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

        public async Task<dynamic> GetCalendarHolidaySessionById(int acs_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT acs_id,A.holiday_id,H.holiday_name,FORMAT(session_start_date, 'dd-MMM-yyyy')  session_start_date_str,FORMAT (session_end_date, 'dd-MMM-yyyy')   session_end_date_str " +
                    "FROM Attendance.Attendance_Calendar_Session_Holiday a INNER JOIN Attendance.Holiday H ON A.holiday_id = H.holiday_id WHERE acs_id = @acs_id ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@acs_id", acs_id);

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

        public async Task<dynamic> GetAllHolidayByName(string holiday_name)
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT holiday_id,holiday_name,days_of_month " +
                    "FROM Attendance.Holiday Where company_group_id =@company_group_id and holiday_name like @holiday_name";
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@holiday_name", string.IsNullOrEmpty(holiday_name) ? "%" : holiday_name + '%');
                parameters.Add("@company_group_id", company_group_id);
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


        public async Task<dynamic> IUD_CalendarSessionHoliday(AttendanceCalendarSessionHoliday attendanceCalendarHoliday, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = AttendanceCalendarSessionHolidayParameterBinding(attendanceCalendarHoliday, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Attendance_Calendar_Session_Holiday_IUD]", parameters, commandType: CommandType.StoredProcedure);
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

    }
}
