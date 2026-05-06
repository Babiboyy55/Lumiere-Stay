using Lumiere.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lumiere.Models
{
    public class React
    {
    

             public int Id { get; set; }

            [ForeignKey("User")]
            public string UserId { get; set; }
            public virtual ApplicationUser User { get; set; }
            [ForeignKey("Post")]
            public int PostId { get; set; }
            public virtual CommunityPost Post { get; set; }

        
    }
}
