using CoreLibrary.Models;
using CoreLibrary.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Services
{
    public class TodoService : ITodoService
    {
        private readonly ApplicationDbContext _context;

        public TodoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Todo> AddTodo(Todo Todo)
        {
            await _context.Todo.AddAsync(Todo);
            await _context.SaveChangesAsync();

            return Todo;
        }

        public async Task<IList<Todo>> GetTodos()
        {
            IList<Todo> todos = await _context.Todo.ToListAsync();

            return todos;
        }

        public async Task<Todo> GetTodo(int id)
        {
            Todo todo = await _context.Todo.Where(w => w.UniqueID == id).FirstOrDefaultAsync();

            return todo;
        }

        public async Task<Todo> EditTodo(Todo Todo)
        {
            _context.Todo.Update(Todo);
            await _context.SaveChangesAsync();

            return Todo;
        }

        public async Task<Todo> Delete(Todo Todo)
        {
            _context.Todo.Remove(Todo);
            await _context.SaveChangesAsync();

            return Todo;
        }
    }
}
