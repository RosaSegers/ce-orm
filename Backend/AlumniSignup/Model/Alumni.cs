namespace AlumniSignup.Model
{
    public class Alumni
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string GraduationYear { get; set; }
        public string Degree { get; set; }
        public string Major { get; set; }
        public string CurrentPosition { get; set; }
        public string Company { get; set; }
        public string Location { get; set; }
        public string LinkedInProfile { get; set; }
        public DateTime SignupDate { get; set; } = DateTime.Now;

        public Alumni()
        {
            Name = string.Empty;
            Email = string.Empty;
            GraduationYear = string.Empty;
            Degree = string.Empty;
            Major = string.Empty;
            CurrentPosition = string.Empty;
            Company = string.Empty;
            Location = string.Empty;
            LinkedInProfile = string.Empty;
        }

        public Alumni(string name, string email, string graduationYear, string degree, string major, string currentPosition, string company, string location, string linkedInProfile)
        {
            Name = name;
            Email = email;
            GraduationYear = graduationYear;
            Degree = degree;
            Major = major;
            CurrentPosition = currentPosition;
            Company = company;
            Location = location;
            LinkedInProfile = linkedInProfile;
        }
    }
}
