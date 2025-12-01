using System.Net;
using System.Net.Mail;
using Humanizer;

namespace AlumniSignup.Services
{
    public class MailService
    {
        public void SendEmail(string to, string name, int id)
        {
            var fromAddress = new MailAddress("ceorm.alumnibijeenkomst@gmail.com", "From Name");
            var toAddress = new MailAddress(to, "To Name");
            const string fromPassword = "6kpWHK265rd0$Kbx4xV^*gdFl";
            const string subject = "Bedankt voor uw aanmelding.";
            string body = @"
                <html>
                    <body style='font-family: Arial, sans-serif; color:#333;'>
                        <h2>Bedankt voor uw aanmelding!</h2>
                        <p>
                            We hebben uw registratie goed ontvangen.  
                            We kijken ernaar uit om u te verwelkomen.
                        </p>

                        <p>
                            Als u zich wilt afmelden, kunt u dat doen via de volgende link:
                        </p>

                        <p>
                            <a href='http://localhost:3000/manage/" + id + @"' 
                               style='background:#d9534f; color:white; padding:10px 16px; 
                                      text-decoration:none; border-radius:4px;'>
                                Afmelden
                            </a>
                        </p>

                        <br>
                        <p>Met vriendelijke groet,<br>Het team</p>
                    </body>
                </html>";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}
