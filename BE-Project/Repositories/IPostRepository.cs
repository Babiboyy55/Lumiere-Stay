using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface IPostRepository:IRepository<CommunityPost>
    {


        public  Task<int> Add(CommunityPost Post);
        public  Task<bool> Delete(int id ,string userId);
        Task<int> Update(int id , CommunityPost updatedPost ,string userId);
        Task<IEnumerable<CommunityPost>> GetAllPosts(string userId,int? communityId);
        Task<bool> PostExists(int postId);

        Task<CommunityPost> GetById(int postId);



    }
}
