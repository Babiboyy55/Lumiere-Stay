using Lumiere.Models;
using Lumiere.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lumiere.DTO.Appointment
{
    public class AppointmentDTO
    {
        public string appointmentDate { get; set; }
        public int advertisementId { get; set; }

    }
}
