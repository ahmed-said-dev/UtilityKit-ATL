namespace System.Collections.Generic
{
    public static class CollectionsGenerics
    {
        public static bool IsNullOrEmpty(this IEnumerable<object> collection)
        {
            return (collection != null && collection.Any()) ? false : true;
        }
        public static bool HasItems(this IEnumerable<object> collection)
        {
            return (collection != null && collection.Any()) ? true : false;
        }
    }
}