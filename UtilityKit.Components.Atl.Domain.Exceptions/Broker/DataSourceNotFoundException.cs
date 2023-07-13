using UtilityKit.Components.Atl.Domain.Exceptions;

namespace G2Kit.Components.Und.Domain.Exceptions.Broker;
public class MapRecordNotFoundException : BusinessException
{
    public MapRecordNotFoundException() :
        base(
        2,
        "Map Record not found.",
        "",
        HttpStatusCode.BadRequest)
    { }
}