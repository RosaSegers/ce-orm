using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AlumniSignup.Model;

namespace AlumniSignup.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext (DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<AlumniSignup.Model.Alumni> Alumni { get; set; } = default!;
    }
}
