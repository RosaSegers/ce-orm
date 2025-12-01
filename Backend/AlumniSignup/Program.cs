using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AlumniSignup.Data;
using AlumniSignup.Services;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<DatabaseContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseContext")
                ?? throw new InvalidOperationException("Connection string 'DatabaseContext' not found.")));

        builder.Services.AddScoped<MailService>();

        using (var scope = builder.Services.BuildServiceProvider())
        {
            var dataContext = scope.GetRequiredService<DatabaseContext>();
            dataContext.Database.Migrate();
        }

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "AlumniFrontend",
                              policy =>
                              {
                                  policy.AllowAnyHeader();
                                  policy.AllowAnyOrigin();
                                  policy.AllowAnyMethod();
                              });
        });

        builder.Services.AddControllers();

        var app = builder.Build();

        app.UseHttpsRedirection();
        app.UseCors("AlumniFrontend");
        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");

        app.Run();
    }
}
