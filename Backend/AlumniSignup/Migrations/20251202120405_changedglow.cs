using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlumniSignup.Migrations
{
    /// <inheritdoc />
    public partial class changedglow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Alumni",
                newName: "OudLidGlow");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OudLidGlow",
                table: "Alumni",
                newName: "Location");
        }
    }
}
