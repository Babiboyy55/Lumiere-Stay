using Lumiere.DTO.Reservation;
using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface IReservationRepository: IRepository<Reservation>
    {
        List<AllReservationDTO> GetAll(string ownerId);
        Reservation GetById(int id);
        bool Delete(int reservationId);


        Task<bool> Edit(int id, string ownerId, string status);
        Task<Reservation> Add(Reservation reservation);
        void Save();
    }
}
