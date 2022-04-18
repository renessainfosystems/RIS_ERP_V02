using Auth.Utility.Attendance;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.DataAccess.PIMS
{
    public class PIMSDBEnumDataAcess
    {
        private readonly IDbConnection _dbConnection;
        
        public PIMSDBEnumDataAcess(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;            
        }
        //public async Task<dynamic> GetJobDomicile()
        //{
        //    var result = (dynamic)null;
        //    if (_dbConnection.State == ConnectionState.Closed)
        //        _dbConnection.Open();
        //    try
        //    {
        //        var sql = "SELECT * FROM DBEnum.Job_Domicile";
        //        result = await _dbConnection.QueryAsync<dynamic>(sql);
        //    }
        //    catch (Exception ex)
        //    {
        //        _dbConnection.Dispose();
        //        throw ex.InnerException;
        //    }
        //    finally
        //    {
        //        _dbConnection.Dispose();
        //    }
        //    return (result);
        //}
        //public async Task<dynamic> GetServiceType()
        //{

        //    var result = (dynamic)null;
        //    if (_dbConnection.State == ConnectionState.Closed)
        //        _dbConnection.Open();
        //    try
        //    {
        //        var sql = "SELECT * FROM DBEnum.Service_Type";
        //        result = await _dbConnection.QueryAsync<dynamic>(sql);
        //    }
        //    catch (Exception ex)
        //    {
        //        _dbConnection.Dispose();
        //        throw ex.InnerException;
        //    }
        //    finally
        //    {
        //        _dbConnection.Close();
        //    }
        //    return (result);
        //}

        //public async Task<dynamic> GetConfirmationStatus()
        //{
        //    return await this.GetObject("DBEnum.Confirmation_Status");
        //}
        public async Task<dynamic> GetObject(string sDbObjectName)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                var sQuery = string.Format("SELECT * FROM {0}", sDbObjectName);
                result = await _dbConnection.QueryAsync<dynamic>(sQuery);
            }
            catch (Exception ex)
            {
                _dbConnection.Dispose();
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
