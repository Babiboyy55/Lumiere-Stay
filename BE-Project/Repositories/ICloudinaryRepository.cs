namespace Lumiere.Repositories
{
    public interface ICloudinaryRepository
    {
        Task<string> UploadImageAsync(IFormFile file);
        Task DeleteImageAsync(string imageUrl);
        string ExtractPublicIdFromUrl(string imageUrl);
    }
}
