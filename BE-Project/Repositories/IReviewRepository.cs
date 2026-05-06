using Lumiere.DTO.Review;
using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface IReviewRepository: IRepository<Review>
    {
        Task<Review> Add(Review newReview);
        Task<bool> Edit(int id, ReviewDTO updatedReview, string renterId);
        Task<bool> Delete(int id, string renterId);
        Task<List<Review>> GetAll(int _communityId);
        Task<Review> GetById(int id);
        Task<Review> GetByIdAndCommunityId(int id, int communityId);

        Task<List<AllReviewDTO>> GetAllReviews();
        Task<bool> CheckIfRenterHasCommunity(string renterId);

        Task<List<Review>> GetAllReviewsByRenterId(string renterId);
    }
}
