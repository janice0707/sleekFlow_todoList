using CoreLibrary.DTOs;
using System.Globalization;

namespace TodoAPI.DTOs
{
    public class TodoFilterDTO
    {
        public string name { get; set; }
        public string dueDate { get; set; }
        public DateTime? _dueDate
        {
            get
            {
                if (!string.IsNullOrEmpty(dueDate) && dueDate != "null")
                {
                    return DateTime.ParseExact(dueDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                }

                return null;
               
            }
        }
        public string status { get; set; }
        public string status_notStarted  { get; set; }
        public string status_inProcessing  { get; set; }
        public string status_completed  { get; set; }
    }
}
