using Lumiere.DTO.Admin;

namespace Lumiere.Repositories
{
    public interface IAdminRepository
    {
         Task<List<UserDTO>> GetAll();
        Task<List<OwnerDTO>> GetAllOwners();
        Task<List<RenterDTO>> GetAllRenters();
        Task<object> GeneralNumbers();
        Task<List<ProfitDTO>> GetProfitMonth();
        Task Transfer(string oldOwner, string newOwner);
        Task<List<ProfitPerCommunityDTO>> GetProfitPerCommunity();
        List<AllReserDTO> GetReservation();
        List<AdsVsReservationsDTO> GetMonthlyAdsVsReservations();
        Task<List<RenterDTO>> GetRentersWithNoCommunity();
        Task<List<RenterDTO>> GetRentersByCommunity(string communityName);
    }
}
