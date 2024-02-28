using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace CoreLibrary.Models
{
    [Table("Todo")]
    public class Todo
    {
        [Key]
        public int UniqueID { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Name length can't be more than 100.")]
        public string Name { get; set; }

        [MaxLength(500, ErrorMessage = "Description length can't be more than 500.")]
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
