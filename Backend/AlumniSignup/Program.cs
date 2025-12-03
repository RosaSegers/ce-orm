using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AlumniSignup.Data;
using AlumniSignup.Services;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Use PostgreSQL instead of SQL Server
        builder.Services.AddDbContext<DatabaseContext>(options =>
            options.UseNpgsql(
                builder.Configuration.GetConnectionString("DatabaseContext")
                ?? throw new InvalidOperationException("Connection string 'DatabaseContext' not found.")
            )
        );

        builder.Services.AddScoped<MailService>();

        using (var scope = builder.Services.BuildServiceProvider())
        {
            var dataContext = scope.GetRequiredService<DatabaseContext>();
            dataContext.Database.Migrate();
        }

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AlumniFrontend", policy =>
            {
                policy.AllowAnyHeader();
                policy.AllowAnyOrigin();
                policy.AllowAnyMethod();
            });
        });

        builder.Services.AddControllers();

        var app = builder.Build();

        app.UseCors("AlumniFrontend");
        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");

        app.Run();
    }
}
