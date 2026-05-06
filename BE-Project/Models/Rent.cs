using Lumiere.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lumiere.Models
{
    public class Rent 
    {   

        public int id { get; set; }
     


        public DateOnly dueDate { get; set; }

        

        public bool IsPaid { get; set; }=false;
        public double Rentvalue { get; set; }

        // unit -rent 1-1
        [ForeignKey("unit")]
        public int unitId { get; set; }
        public virtual Unit unit { get; set; }

       
        public virtual Payment? Payment { get; set; }

    }
}
