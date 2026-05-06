using System.ComponentModel.DataAnnotations;

namespace Lumiere.DTO.Auth
{
    public class LoginDTO
    {
        public string? userName { get; set; }

        [DataType(DataType.Password)]
        public string password { get; set; }

        [DataType(DataType.EmailAddress)]
        public string? email { get; set; }

    }
}

