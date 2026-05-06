using Lumiere.DTO.Community;
using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface ICommunityRepository:IRepository<Community>
    {
        Task<int> Create(Community community);
        int GetCommunityId(string ownerId);
        string GetName(int commId);
        bool Update(string ownerId, CommunityInfoDTO newName);
        List<compLocationDTO> Get(string ownerId);
        void Save();
    }
}
