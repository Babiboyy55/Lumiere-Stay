using Lumiere.Models;
using Lumiere.Models;
using System.ComponentModel.DataAnnotations;

namespace Lumiere.CustomAttributes
{
    public class UniqueAttribute: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {

            Reservation reservationFromReq = (Reservation)validationContext.ObjectInstance;
            int appointmentID =(int) value;
            ProjectContext context = new ProjectContext();
            Reservation reservationFromDB = context.Reservations.FirstOrDefault(r=>r.appointmentId==appointmentID);
            if (reservationFromDB == null)
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult( "This appointment is already reserved" );
            }
        }
    
    }
}
