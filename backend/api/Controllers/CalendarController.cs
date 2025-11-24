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
                existing.EventDescription = activity.EventDescription;
            }
            else
            {
                activity.Id = activities.Count + 1;
                activities.Add(activity);
            }
            return Ok(activity);
        }
    }
}