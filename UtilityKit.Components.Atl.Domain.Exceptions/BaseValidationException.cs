using FluentValidation.Results;
namespace UtilityKit.Components.Atl.Domain.Exceptions;
public class BaseValidationException : Exception
{
    #region --- Constructor
    public BaseValidationException()
        : base("One or more validation failures have occurred.")
    {
        Errors = new Dictionary<string, string>();
    }
    public BaseValidationException(IEnumerable<ValidationFailure> failures)
        : this()
    {
        var failureGroups = failures
            .Select(e => new { ErrorCode = $"{e.ErrorCode}_{e.PropertyName}", e.ErrorMessage });
        foreach (var failureGroup in failureGroups)
        {
            var errorCode = failureGroup.ErrorCode;
            string errorMessage = failureGroup.ErrorMessage;
            if (!Errors.ContainsKey(errorCode))
                Errors.Add(errorCode, errorMessage);
        }
    }
    #endregion

    #region --- Properties
    public IDictionary<string, string> Errors { get; }
    #endregion
}