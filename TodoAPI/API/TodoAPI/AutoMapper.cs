using AutoMapper;
using CoreLibrary.Models;
using CoreLibrary.DTOs;
using CoreLibrary.Helpers;
using System.Globalization;

namespace TodoAPI
{
    public class AutoMapper : Profile
    {
        public AutoMapper() 
        {
            CreateMap<Todo, TodoDTO>().IgnoreAllNonExisting().ForMember(
                des => des.DueDate,
                source => source.MapFrom(d => d.DueDate == null ? "" : d.DueDate.Value.ToString("yyyy-MM-dd"))
            ).ForMember(
                des => des.DueDayCount,
                source => source.MapFrom(d => d.DueDate == null ? null : (int?)(d.DueDate.Value - DateTime.Today).TotalDays)
            ); 

            CreateMap<TodoDTO, Todo>().IgnoreAllNonExisting().ForMember(
                des => des.DueDate,
                source => source.MapFrom(d => string.IsNullOrEmpty(d.DueDate) ? (DateTime?)null : DateTime.ParseExact(d.DueDate, "yyyy-MM-dd", CultureInfo.InvariantCulture))
            );
        }
    }
}
