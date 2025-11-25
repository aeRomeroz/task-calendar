using Microsoft.AspNetCore.Mvc;
using api.Models;   

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalendarController : ControllerBase
    {
        // Lista estática para guardar actividades mientras la app esté corriendo
        private static List<DayActivity> activities = new List<DayActivity>();

        [HttpGet("{year}/{month}")]
        public IEnumerable<DayActivity> GetMonthActivities(int year, int month)
        {
            return activities.Where(a => a.Year == year && a.Month == month);
        }

        [HttpPost]
        public IActionResult AddOrUpdateActivity([FromBody] DayActivity activity)
        {
            var existing = activities.FirstOrDefault(a => a.Day == activity.Day && a.Month == activity.Month && a.Year == activity.Year);
            if (existing != null)
            {
                existing.TrainingDone = activity.TrainingDone;
                existing.Events = activity.Events; // Actualizar eventos
            }
            else
            {
                activity.Id = activities.Count + 1;
                activities.Add(activity);
            }
            return Ok(activity);
        }

        [HttpPost("events")]
        public IActionResult AddEventToDay([FromBody] AddEventRequest request)
        {
            var activity = activities.FirstOrDefault(a => 
                a.Day == request.Day && 
                a.Month == request.Month && 
                a.Year == request.Year);
            
            if (activity == null)
            {
                // Crear nueva actividad si no existe
                activity = new DayActivity
                {
                    Id = activities.Count + 1,
                    Day = request.Day,
                    Month = request.Month,
                    Year = request.Year,
                    TrainingDone = false,
                    Events = new List<Event>()
                };
                activities.Add(activity);
            }

            // Inicializar lista de eventos si es null
            activity.Events ??= new List<Event>();

            // Agregar el nuevo evento
            var newEvent = new Event
            {
                Id = activity.Events.Count + 1,
                Title = request.Title,
                Description = request.Description,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                DayActivityId = activity.Id
            };

            activity.Events.Add(newEvent);
            return Ok(newEvent);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateActivity(int id, [FromBody] DayActivity activity)
        {
            var existing = activities.FirstOrDefault(a => a.Id == id);
            if (existing == null)
            {
                return NotFound(new { message = $"Activity with id {id} not found" });
            }

            existing.TrainingDone = activity.TrainingDone;
            existing.Events = activity.Events;
            
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteActivity(int id)
        {
            var activity = activities.FirstOrDefault(a => a.Id == id);
            if (activity == null)
            {
                return NotFound(new { message = $"Activity with id {id} not found" });
            }

            activities.Remove(activity);
            return NoContent();
        }
    }

    // DTO para agregar eventos
    public class AddEventRequest
    {
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}