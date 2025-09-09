using System;

namespace API.Middleware;

public class ExceptionMiddleware(RequestDelegate next,
ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            var response = env.IsDevelopment()
                ? new Errors.ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new Errors.ApiException(context.Response.StatusCode, "Internal Server Error");

            var options = new System.Text.Json.JsonSerializerOptions { PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase };

            var json = System.Text.Json.JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}
