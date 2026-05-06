using Lumiere.DTO.Unit;
using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface IUnitRepository : IRepository<Unit>
    {
        List<AllUnit> GetAll(string ownerId);
        Unit GetById(int id, string ownerId);

        List<Unit> Filter(string? type, string? status, string userId);

        List<Unit> Search(string searchTerm, string userId);

        Unit Add(Unit entity);

        Task Update(string ownerId, int id, UnitDTO UpdatingRef);

        Task<bool> Delete(string ownerId, int id);

        void Save();
        public int GetCommunityId(string ownerId);



    }
}
