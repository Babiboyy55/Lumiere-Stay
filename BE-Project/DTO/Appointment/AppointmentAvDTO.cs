using Lumiere.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lumiere.DTO.Appointment
{
    public class AppointmentAvDTO
    {
        public int id { get; set; }
        public DateTime appointmentDate { get; set; }
        public bool isAvaliable { get; set; }

        public string ownerId { get; set; }
        public int advertisementId { get; set; }
    }
}
