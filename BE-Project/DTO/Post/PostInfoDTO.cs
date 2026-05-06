using Lumiere.Custom_Validation;

namespace Lumiere.DTO.Post
{
    public class PostInfoDTO
    {

        public string content { get; set; }

        [ValidImage(ErrorMessage = "Only image files (.jpg, .png, etc.) are allowed.")]
        public IFormFile? image { get; set; }

    }
}
