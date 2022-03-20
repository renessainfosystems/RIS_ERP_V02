using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Utility.Accounting.MailService
{
    public interface IEmailService
    {
        void Send(string to, string subject, string html, string from = null);
    }

}
