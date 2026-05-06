namespace Lumiere.Services
{
    public interface IEmailService
    {
        //public  Task SendEmailAsync(string toEmail, string subject, string message);
        Task SendEmailAsync(string toEmail, string subject, string htmlBody);
    }
}
