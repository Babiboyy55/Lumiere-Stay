using Lumiere.DTO.Appointment;
using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface IAppointmentRepository: IRepository<Appointment>
    {
        Task<List<Appointment>> GetAll(string id);
        Task<List<AppointmentAvDTO>> GetAllAvailable(int id);
        Task<bool> Delete(int id, string ownerId);
        List<AllAppointmentDTO> GetAllByOwner(string ownerId);
        void AddAppointment(Appointment appointment);
        bool EditAppointment(Appointment appointment);
        Appointment GetById(int id);
        void Save();
    }
}
