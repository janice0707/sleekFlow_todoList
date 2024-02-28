using CoreLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Services.Interfaces
{
    public interface ITodoService
    {
        Task<Todo> AddTodo(Todo Todo);
        Task<IList<Todo>> GetTodos();
        Task<Todo> GetTodo(int id);
        Task<Todo> EditTodo(Todo Todo);
        Task<Todo> Delete(Todo Todo);
    }
}
