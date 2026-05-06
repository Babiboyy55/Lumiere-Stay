using Lumiere.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lumiere.Models
{
    public class Appointment
    {
        public int id { get; set; }
        public DateTime appointmentDate { get; set; }       
        public bool isAvaliable { get; set; }

        //1-M owner set many appointments

        [ForeignKey("owner")]
        public string ownerId { get; set; }
        public ApplicationUser owner { get; set; }

        //1-m advertisement has many appointments
        [ForeignKey("advertisement")]
        public int advertisementId { get; set; }
        public Addvertisement advertisement { get; set; }

        //1-1 reservation
        public virtual Reservation? reservation { get; set; }
    }
}
