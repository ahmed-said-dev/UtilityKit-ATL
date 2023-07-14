using System.Text;

namespace System
{
    public static class Strings
    {
        public static string GetSearchableArabicText(this string text)
        {
            if (string.IsNullOrEmpty(text))
                return "";

            text = text.Replace("أ", "ا");
            text = text.Replace("إ", "ا");
            text = text.Replace("آ", "ا");
            text = text.Replace("ة", "ه");
            text = text.Replace("ي", "ى");

            return text;
        }

        public static string ConvertToEasternArabicNumerals(this string input)
        {
            if (input != null)
            {
                System.Text.UTF8Encoding utf8Encoder = new UTF8Encoding();
                System.Text.Decoder utf8Decoder = utf8Encoder.GetDecoder();
                System.Text.StringBuilder convertedChars = new System.Text.StringBuilder();



                char[] convertedChar = new char[1];
                byte[] bytes = new byte[] { 217, 160 };
                char[] inputCharArray = input.ToCharArray();
                foreach (char c in inputCharArray)
                {
                    if (char.IsDigit(c))
                    {
                        bytes[1] = Convert.ToByte(160 + char.GetNumericValue(c));
                        utf8Decoder.GetChars(bytes, 0, 2, convertedChar, 0);
                        convertedChars.Append(convertedChar[0]);
                    }
                    else
                    {
                        convertedChars.Append(c);
                    }
                }
                return convertedChars.ToString();
            }
            else
            {
                return "";
            }
        }

    }
}
