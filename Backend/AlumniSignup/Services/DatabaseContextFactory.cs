using AlumniSignup.Data;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace AlumniSignup.Services
{
    public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
    {
        public DatabaseContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();

            // Use a dummy, no-connection-needed in-memory provider
            optionsBuilder.UseNpgsql("Host=invalid;Database=fake;Username=fake;Password=fake");

            return new DatabaseContext(optionsBuilder.Options);
        }
    }
}
