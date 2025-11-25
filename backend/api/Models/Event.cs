namespace api.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        
        // Relación con DayActivity (Foreign Key)
        public int DayActivityId { get; set; }
    }
}