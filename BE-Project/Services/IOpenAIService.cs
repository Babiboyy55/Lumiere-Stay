namespace Lumiere.Services
{
    public interface IOpenAIService
    {
        Task<float[]> GenerateEmbeddingAsync(string input);
    }
}
