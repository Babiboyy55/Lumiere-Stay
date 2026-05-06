using Lumiere.Custom_Validation;

namespace Lumiere.DTO.Unit
{
    public class UnitDTO
    {
        public string status { get; set; }  //empty or rented
        public double price { get; set; }
        public string description { get; set; }
        public string type { get; set; } //for rent or  for sell
        public string? renterSSN {get; set;}
        [ValidImage(ErrorMessage = "Only image files (.jpg, .png, etc.) are allowed.")]
        public IFormFile? image1 { get; set; }
        [ValidImage(ErrorMessage = "Only image files (.jpg, .png, etc.) are allowed.")]
        public IFormFile? image2 { get; set; }
        [ValidImage(ErrorMessage = "Only image files (.jpg, .png, etc.) are allowed.")]
        public IFormFile? image3 { get; set; }

    }
}
