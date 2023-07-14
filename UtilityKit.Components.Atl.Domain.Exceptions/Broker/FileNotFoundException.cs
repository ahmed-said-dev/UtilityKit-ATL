using UtilityKit.Components.Atl.Domain.Exceptions;

namespace G2Kit.Components.Und.Domain.Exceptions.Broker;
public class DataFileNotFoundException : BusinessException
{
    public DataFileNotFoundException() :
        base(
        2,
        "File not found.",
        "",
        HttpStatusCode.BadRequest)
    { }
}