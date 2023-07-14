namespace UtilityKit.Components.Atl.Domain.SharedKernel.Enum
{
    public enum FeatureClassTypeEnum
    {
        //
        // Summary:
        //     Unknown type. There will be no Geometry instance existing with this type.
        Unknown = 0,
        //
        // Summary:
        //     Point geometry. See ArcGIS.Core.Geometry.MapPoint.
        Point = 513,
        //
        // Summary:
        //     Envelope geometry. See ArcGIS.Core.Geometry.Envelope.
        Envelope = 3077,
        //
        // Summary:
        //     Multipoint geometry. See ArcGIS.Core.Geometry.Multipoint.
        Multipoint = 8710,
        //
        // Summary:
        //     Polyline geometry. See ArcGIS.Core.Geometry.Polyline.
        Polyline = 25607,
        //
        // Summary:
        //     Polygon geometry. See ArcGIS.Core.Geometry.Polygon.
        Polygon = 27656,
        //
        // Summary:
        //     MultiPatch 3D surface. See ArcGIS.Core.Geometry.Multipatch.
        Multipatch = 32777,
        //
        // Summary:
        //     Bag of geometries. See ArcGIS.Core.Geometry.GeometryBag.
        GeometryBag = 3594
    }
}