using System.ComponentModel.DataAnnotations;

namespace Lumiere.DTO.Auth
{
    public class RoleDTO
    {
        [Display(Name = "Role Name")]
        public string RoleName { get; set; }
    }
}
