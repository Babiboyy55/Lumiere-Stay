using Lumiere.Models;
using Lumiere.Models;

namespace Lumiere.Services
{
    public class ImportFile: IImportFile        
    {
        private readonly ProjectContext _dbContext;
        private readonly IOpenAIService _openAIService;

        public ImportFile(ProjectContext dbContext, IOpenAIService openAIService)
        {
            _dbContext = dbContext;
            _openAIService = openAIService;
        }
        public async Task ImportKnowledgeBaseAsync(string filePath)
        {
            var lines = File.ReadAllLines(filePath);


            foreach (var line in lines)
            {
                var parts = line.Split("||");
                if (parts.Length != 2) continue;

                var question = parts[0].Trim();
                var answer = parts[1].Trim();
                var embedding = await _openAIService.GenerateEmbeddingAsync(question);

                var entry = new KnowledgeEntry
                {
                    Question = question,
                    Answer = answer,
                    Embedding = embedding
                };

                _dbContext.KnowledgeEntries.Add(entry);
            }

            await _dbContext.SaveChangesAsync();
        }
    }
}
