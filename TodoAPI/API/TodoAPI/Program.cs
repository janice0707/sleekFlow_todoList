using CoreLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options => {
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    options.JsonSerializerOptions.MaxDepth = int.MaxValue;
    //options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
}); 


builder.Services.AddDbContext<ApplicationDbContext>(
       options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddCoreModule();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("*")
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
