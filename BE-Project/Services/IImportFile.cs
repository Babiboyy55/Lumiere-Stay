namespace Lumiere.Services
{
    public interface IImportFile
    {
        Task ImportKnowledgeBaseAsync(string filePath);
    }
}
