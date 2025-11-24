namespace api.Models
{
    public class DayActivity
    {
        public int Id { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public bool TrainingDone { get; set; }
        public string? EventDescription { get; set; }
    }
}