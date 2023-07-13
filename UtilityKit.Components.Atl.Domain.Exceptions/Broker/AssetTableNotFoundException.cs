namespace UtilityKit.Components.Atl.Domain.Exceptions.Broker;
public class AssetTableNotFoundException : BusinessException
{
    public AssetTableNotFoundException() :
        base(
        3,
        "Asset table not found.",
        "",
        HttpStatusCode.BadRequest)
    { }
}