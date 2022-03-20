using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using Microsoft.Extensions.Configuration;
using MailKit.Net.Smtp;

namespace Auth.Utility.Accounting.MailService
{

   
    
        public class MailService : IEmailService
        {
            
        private IConfiguration _config;


        //Intialize
        public MailService(IConfiguration config)
        {
            _config = config;

        }

  

            public void Send(string to, string subject, string html, string from = null)
            {
                // create message
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(from ?? _config["AppSettings:EmailFrom"]));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = html };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect(_config["AppSettings:SmtpHost"], 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(_config["AppSettings:SmtpUser"], _config["AppSettings:SmtpPass"]);
                smtp.Send(email);
                smtp.Disconnect(true);
            }
        
    }
}
