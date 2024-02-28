using AutoMapper;
using CoreLibrary;
using CoreLibrary.Models;
using CoreLibrary.Services.Interfaces;
using CoreLibrary.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Globalization;
using TodoAPI.DTOs;
using System.Text.Json;
using CoreLibrary.Helpers;
using System.Linq;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;
        private readonly IMapper _mapper;

        public TodoController(ITodoService todoService, ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _todoService = todoService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TodoDTO todoForm)
        {
            try
            {
                Todo todo = _mapper.Map<Todo>(todoForm);

                ModelState.Clear();
                TryValidateModel(todo);

                if (ModelState.IsValid)
                {
                    await _todoService.AddTodo(todo);
                }

                return Ok();
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            //if filtering exist then filter
            //if sorting exist then sorting
            try
            {
                Todo todo = await _todoService.GetTodo(id);
                TodoDTO todoDTO = _mapper.Map<TodoDTO>(todo);

                return Ok(todoDTO);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Dictionary<string, string>? filters = null)
        {
            //if filtering exist then filter
            //if sorting exist then sorting
            //FromQuery] TodoFilterDTO todoFilterDto

            IList<Todo> todos = await _todoService.GetTodos();

            string filtersString = JsonSerializer.Serialize(filters);
            TodoFilterDTO filterDTO = JsonSerializer.Deserialize<TodoFilterDTO>(filtersString);


            try
            {
                if (!string.IsNullOrEmpty(filterDTO.name) && filterDTO.name != "null")
                {
                    todos = todos.Where(w => w.Name.Contains(filterDTO.name)).ToList();
                }

                if (filterDTO._dueDate != null)
                {
                    todos = todos.Where(w => w.DueDate == filterDTO._dueDate).ToList();
                }

                IList<string> status = new List<string>();

                if (filterDTO.status_notStarted == "true")
                {
                    status.Add(TodoStatus.NotStarted);
                }

                if (filterDTO.status_inProcessing == "true")
                {
                    status.Add(TodoStatus.InProgress);
                }

                if (filterDTO.status_completed == "true")
                {
                    status.Add(TodoStatus.Completed);
                }


                todos = todos.Where(w => (status.Count == 0 || status.Contains(w.Status))).ToList();

                IList<TodoDTO> todosDTO = _mapper.Map<IList<TodoDTO>>(todos);


                return Ok(todosDTO);
            }
            catch (Exception ex)
            {
                throw;
            }

        }


        [HttpPut]
        public async Task<IActionResult> Put([FromBody] TodoDTO todoForm)
        {
            try
            {
                Todo todo = _mapper.Map<Todo>(todoForm);

                ModelState.Clear();
                TryValidateModel(todo);

                if (ModelState.IsValid)
                {
                    await _todoService.EditTodo(todo);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                Todo todo = await _todoService.GetTodo(id);

                await _todoService.Delete(todo);

                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }
        }



        //[HttpPut]
        //public async Task<Todo> Put()
        //{

        //}

        //[HttpDelete]
        //public async Task<Todo> Delete()
        //{

        //}
    }
}