using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface INotificationRepository:IRepository<Notification>
    {

        Task AddAsync(Notification notification);
        Task<List<Notification>> GetUserNotifications(string userId);
        Task MarkAsRead(int notificationId);
    }
}
