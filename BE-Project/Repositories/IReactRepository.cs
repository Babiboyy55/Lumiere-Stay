using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface IReactRepository:IRepository<React>
    {
        Task<string> ToggleReactAsync(React react);

    }
}
