namespace AlumniSignup.Model
{
    public class Alumni
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string GraduationYear { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public string Major { get; set; } = string.Empty;
        public string CurrentPosition { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string OudLidGlow { get; set; } = string.Empty;  // new field
        public string LinkedInProfile { get; set; } = string.Empty;
        public DateTime SignupDate { get; set; } = DateTime.Now;

        public Alumni()
        {
            // all properties already initialized inline
        }

        public Alumni(string name, string email, string graduationYear, string degree, string major,
                      string currentPosition, string company, string oudLidGlow, string linkedInProfile)
        {
            Name = name;
            Email = email;
            GraduationYear = graduationYear;
            Degree = degree;
            Major = major;
            CurrentPosition = currentPosition;
            Company = company;
            OudLidGlow = oudLidGlow;
            LinkedInProfile = linkedInProfile;
        }
    }
}
