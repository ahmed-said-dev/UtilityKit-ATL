using UtilityKit.Components.Atl.Domain.Exceptions;

namespace G2Kit.Components.Und.Domain.Exceptions.Broker;
public class DataSourceNotFoundException : BusinessException
{
    public DataSourceNotFoundException() :
        base(
        2,
        "Data Source not found.",
        "",
        HttpStatusCode.BadRequest)
    { }
}