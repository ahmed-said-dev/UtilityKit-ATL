using UtilityKit.Components.Atl.Domain.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net;

namespace UtilityKit.Components.Atl.Application.Shared.Middlewares;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandelExceptionAsync(context, ex, _logger);
        }
    }

    private async Task HandelExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)

    {
        List<Error> errors = new();
        HttpStatusCode code = HttpStatusCode.InternalServerError;
        string message = "";

        switch (ex)
        {
            case BusinessException be:
                errors.Add(new Error(be.ErrorCode, be.EnglishMessage, be.ArabicMessage));
                context.Response.StatusCode = (int)be.StatusCode;
                code = be.StatusCode;
                message = be.EnglishMessage;
                break;
            case BaseValidationException bve:
                foreach (KeyValuePair<string, string> keyValuePair in bve.Errors)
                {
                    errors.Add(new Error(keyValuePair.Key, keyValuePair.Value, keyValuePair.Value));
                }
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                code = HttpStatusCode.BadRequest;
                message = "Validation error";
                break;
            case { } e:
                errors.Add(new Error("Server_Error", string.IsNullOrWhiteSpace(e.Message) ? "ERROR" : e.Message, "Server Error"));

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                message = "Internal Server Error";
                _logger.LogError(e, "TypeOfException", "ApplicationException");
                break;
        }

        context.Response.ContentType = "application/json";
        if (errors.Count != 0)
        {
            var error = new ErrorMessage(errors, message, code);
            var results = JsonConvert.SerializeObject(error);
            await context.Response.WriteAsync(results);
        }
    }
}

public class ErrorMessage
{
    public ErrorMessage(List<Error> errors, string message, HttpStatusCode code)
    {
        Errors = errors;
        Message = message;
        StatusCode = code;
    }
    public List<Error> Errors { get; set; }
    public string Message { get; set; }
    public HttpStatusCode StatusCode { get; set; }
}
public class Error
{
    public Error(string errorCode, string englishErrorMessage, string arabicErrorMessage)
    {
        ErrorCode = errorCode;
        EnglishErrorMessage = englishErrorMessage;
        ArabicErrorMessage = arabicErrorMessage;
    }

    public string ErrorCode { get; set; }
    public string EnglishErrorMessage { get; }
    public string ArabicErrorMessage { get; }
}
