using Microsoft.AspNetCore.Identity;
using Lumiere.Models; // Đã đổi namespace cho khớp với cấu trúc thư mục của bạn

namespace Lumiere // Đã đổi namespace cho khớp với Program.cs
{
    public static class DbSeeder
    {
        public static async Task SeedRolesAndAdminAsync(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            Console.WriteLine("--- ĐANG KIỂM TRA DỮ LIỆU ADMIN ---");

            // 1. Tạo Roles
            string[] roleNames = { "Admin", "Owner", "Renter" };
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                    Console.WriteLine($"Đã tạo Role: {roleName}");
                }
            }

            // 2. Tạo Admin
            var adminEmail = "admin@lumiere.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                var newAdmin = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true,
                    
                    firstName = "Hoang", // Bổ sung firstName để không bị NULL
                    lastName = "Phong",  // Bổ sung luôn lastName cho đầy đủ
                };

                // Thực thi tạo User
                var createPowerUser = await userManager.CreateAsync(newAdmin, "Admin@Lumiere2026!");
                
                if (createPowerUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(newAdmin, "Admin");
                    Console.WriteLine("=> THÀNH CÔNG: Đã khởi tạo tài khoản Admin!");
                }
                else
                {
                    Console.WriteLine("=> THẤT BẠI: Không thể tạo tài khoản Admin do các lỗi sau:");
                    // Vòng lặp này sẽ in ra chính xác lý do tại sao tài khoản không được lưu vào DB
                    foreach (var error in createPowerUser.Errors)
                    {
                        Console.WriteLine($"   - Lỗi: {error.Description}");
                    }
                }
            }
            else
            {
                Console.WriteLine("=> Tài khoản Admin đã tồn tại sẵn trong Database.");
            }
            
            Console.WriteLine("-----------------------------------");
        }
    }
}