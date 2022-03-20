using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using Microsoft.Extensions.Configuration;
using MailKit.Net.Smtp;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System.Data;
using Dapper;
using System;
using System.Threading.Tasks;
using Auth.Utility;

namespace Auth.DataAccess.EmailService
{
    public class EmailServiceDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public EmailServiceDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }
        public CommonMessage SendMail(string to, string subject, string html, string from = null)
        {
            try
            {


                var smtpserverInfo = GetEmailConfigurationInfo().Result;
                // create message
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(from ?? smtpserverInfo.email_from));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = html };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect(smtpserverInfo.smtp_host, smtpserverInfo.smtp_port, SecureSocketOptions.StartTls);
                smtp.Authenticate(smtpserverInfo.smtp_user, smtpserverInfo.smtp_pass);
                smtp.Send(email);
                smtp.Disconnect(true);
            }
            catch(Exception ex)
            {
                return CommonMessage.SetErrorMessage(ex.Message);
            }
            return CommonMessage.SetSuccessMessage(CommonMessage.CommonMailMessage);
        }

        private async Task<dynamic> GetEmailConfigurationInfo()
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT * FROM Auth.EMAIL_CONFIGURATION WHERE company_id=@param_company_id and company_corporate_id=@param_company_corporate_id";
                DynamicParameters parameters = new DynamicParameters();
                var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);

                result = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);

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
