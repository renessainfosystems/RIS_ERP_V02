using Auth.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.EmailService
{
    public interface IEmailServiceRepository
    {
        public CommonMessage SendEmail(string to, string subject, string html, string from = null);
       

    }
}
