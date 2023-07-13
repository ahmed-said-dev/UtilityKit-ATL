namespace System
{
    public static class Booleans
    {
        public static bool FieldHasValue(this bool value, object fieldObject)
        {
            if (fieldObject == null) return false;
            switch (Type.GetTypeCode(fieldObject.GetType()))
            {
                //bool
                case TypeCode.Boolean: return (bool)fieldObject;
                //string 
                case TypeCode.String: return string.IsNullOrEmpty(fieldObject + "") ? false : true;
                //DateTime 
                case TypeCode.DateTime: return (DateTime)fieldObject != DateTime.MinValue ? false : true;
                //Numbers
                case TypeCode.Byte: return ((Byte)fieldObject < 1) ? false : true;
                case TypeCode.SByte: return ((SByte)fieldObject < 1) ? false : true;
                case TypeCode.UInt16: return ((Int16)fieldObject < 1) ? false : true;
                case TypeCode.UInt32: return ((UInt32)fieldObject < 1) ? false : true;
                case TypeCode.UInt64: return ((UInt64)fieldObject < 1) ? false : true;
                case TypeCode.Int16: return ((Int16)fieldObject < 1) ? false : true;
                case TypeCode.Int32: return ((Int32)fieldObject < 1) ? false : true;
                case TypeCode.Int64: return ((Int64)fieldObject < 1) ? false : true;
                case TypeCode.Decimal: return ((decimal)fieldObject < 1) ? false : true;
                case TypeCode.Double: return ((double)fieldObject < 1) ? false : true;
                case TypeCode.Single: return ((Single)fieldObject < 1) ? false : true;
                //Other
                default:
                    return false;
            }
        }
    }
}