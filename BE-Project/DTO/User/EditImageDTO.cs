using Lumiere.Custom_Validation;

namespace Lumiere.DTO.User
{
    public class EditImageDTO
    {
        [ValidImage(ErrorMessage = "Only image files (.jpg, .png, etc.) are allowed.")]
        public IFormFile? image { get; set; }
    }
}
