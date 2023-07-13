namespace System
{
    public static class Objects
    {
        public static object GetPropertyValue(this object src, string propName)
        {
            if (src is null)
            {
                throw new ArgumentNullException(nameof(src), "Object Must not be Null");
            }

            return src.GetType().GetProperty(propName).GetValue(src, null);
        }

        public static object GetDisplayName(this object src)
        {
            if (src is null)
            {
                throw new ArgumentNullException(nameof(src), "Object Must not be Null");
            }

            return src.GetType().GetProperty("DisplayName").GetValue(src, null);
        }
    }
}
