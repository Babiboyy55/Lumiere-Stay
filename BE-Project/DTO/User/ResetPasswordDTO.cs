using System.ComponentModel.DataAnnotations;

namespace Lumiere.DTO.Password
{
    public class ResetPasswordDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }

        [Required, MinLength(6)]
        public string NewPassword { get; set; }
    }
}
