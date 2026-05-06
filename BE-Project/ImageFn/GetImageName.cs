using Lumiere.Repositories;
using Lumiere.Models;

namespace Lumiere.Images
{
    public static class GetImageName
    {

        public static async Task<string> GetImageNameFn(IFormFile image)

        {
            if (image != null && image.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Images", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
                //var fileName = await cloudinaryRepository.UploadImageAsync(userFromRequest.imageFile);

                return fileName;

            }
            return null;
        }



    }
}
