using System.ComponentModel.DataAnnotations.Schema;

namespace Lumiere.Models
{
    public class Notification
    {
        public int id { get; set; }

        public string sender { get; set; }

        public string message { get; set; }


        public bool isRead { get; set; } = false;

        public DateTime createAt { get; set; } = DateTime.Now;

        // user-notifications 1-m
        [ForeignKey("user")]
        public string userId { get; set; }
        public virtual ApplicationUser user { get; set; }
    }

}

