using CoreLibrary.Services;
using CoreLibrary.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCoreModule(this IServiceCollection services)
        {
            services.AddScoped<ITodoService, TodoService>();

            return services;
        }
    }
}
