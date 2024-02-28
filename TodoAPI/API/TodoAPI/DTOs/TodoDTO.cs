using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.DTOs
{
    public class TodoDTO
    {
        public int? UniqueID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string DueDate { get; set; }
        public int? DueDayCount { get; set; }
        public string Status { get; set; }
    }
}
