using Auth.DataAccess.EmailService;
using Auth.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.EmailService
{
    public class EmailServiceRepository : IEmailServiceRepository
    {
        protected EmailServiceDataAccess _emailServiceDataAccess { get; set; }

        //Data access initialize
        public EmailServiceRepository(EmailServiceDataAccess emailServiceDataAccess)
        {
            _emailServiceDataAccess = emailServiceDataAccess;
        }
        public CommonMessage SendEmail(string to, string subject, string html, string from = null)
        {
            return  _emailServiceDataAccess.SendMail(to,subject,html,from);
        }
    }
}
