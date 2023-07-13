using System.Globalization;
namespace System
{
    public static class DatesAndTime
    {
        public static DateTime ConvertToHijriDateOld(this DateTime datetime)
        {
            string hijiDateString = ConvertDateFromGregorianToHijri(datetime);
            string Filnal = hijiDateString.Substring(0, 16);
            DateTime date = Convert.ToDateTime(Filnal);
            return date;
        }
        public static string ConvertToHijriDate(this DateTime datetime)
        {
            string hijriDate = datetime.ToString("yyyy/MM/dd", new CultureInfo("ar-sa"));
            return datetime.ToString("yyyy/MM/dd", new CultureInfo("ar-sa"));
        }
        public static DateTime ConvertToGregorianDate(this DateTime datetime)
        {
            string gregorianDateString = ConvertDateFromHijriToGregorian(datetime);
            DateTime date = Convert.ToDateTime(gregorianDateString);
            return date;
        }
        #region Private Methods
        /// <summary>
        /// Convert Date from Hijri Date to Gregorian
        /// </summary>
        /// <param name="DateToBeConverted">Hijri Date</param>        
        /// <returns>GregorianDate</returns>
        private static string ConvertDateFromHijriToGregorian(DateTime DateToBeConverted)
        {
            DateTimeFormatInfo DTFormat_Hijri;
            string DateLangCulture_Hijri = "ar-sa";
            DTFormat_Hijri = new System.Globalization.CultureInfo(DateLangCulture_Hijri, false).DateTimeFormat;
            DTFormat_Hijri.Calendar = new System.Globalization.UmAlQuraCalendar();

            DTFormat_Hijri.ShortDatePattern = "MM/dd/yyyy";
            DTFormat_Hijri.LongDatePattern = "MM/dd/yyyy";
            DTFormat_Hijri.FullDateTimePattern = "MM/dd/yyyy hh:mm:ss tt";
            DateTime DateConvHijri = new DateTime(DateToBeConverted.Year, DateToBeConverted.Month, DateToBeConverted.Day, DTFormat_Hijri.Calendar);
            //DateTime DateConvHijri = DateTime.Parse(DateToBeConverted.ToString(DTFormat_Hijri.ShortDatePattern), DTFormat_Hijri);

            DateTimeFormatInfo DTFormat_Gregorian;
            string DateLangCulture_Gregorian = "en-us";
            DTFormat_Gregorian = new System.Globalization.CultureInfo(DateLangCulture_Gregorian, false).DateTimeFormat;
            DTFormat_Gregorian.Calendar = new System.Globalization.GregorianCalendar();
            DTFormat_Gregorian.ShortDatePattern = "MM/dd/yyyy";

            /// We format the date structure to whatever we want

            return (DateConvHijri.Date.ToString(DTFormat_Gregorian));
        }

        /// <summary>
        /// Convert Date from Gregorian Date to Hijri
        /// </summary>
        /// <param name="DateToBeConverted"></param>
        /// <returns></returns>
        private static string ConvertDateFromGregorianToHijri(DateTime DateToBeConverted)
        {
            DateTimeFormatInfo DTFormat_Gregorian;
            string DateLangCulture_Gregorian = "en-us";
            DTFormat_Gregorian = new System.Globalization.CultureInfo(DateLangCulture_Gregorian, false).DateTimeFormat;
            DTFormat_Gregorian.Calendar = new System.Globalization.GregorianCalendar();

            DTFormat_Gregorian.ShortDatePattern = "MM/dd/yyyy";
            DTFormat_Gregorian.LongDatePattern = "MM/dd/yyyy";
            DTFormat_Gregorian.FullDateTimePattern = "MM/dd/yyyy hh:mm:ss tt";
            DateTime DateGregorian = new DateTime(DateToBeConverted.Year, DateToBeConverted.Month, DateToBeConverted.Day, DTFormat_Gregorian.Calendar);
            //DateTime DateGregorian = DateTime.Parse(DateToBeConverted.ToString(), DTFormat_Gregorian);

            DateTimeFormatInfo DTFormat_Hijri;
            string DateLangCulture_Hijri = "ar-sa";
            DTFormat_Hijri = new System.Globalization.CultureInfo(DateLangCulture_Hijri, false).DateTimeFormat;
            DTFormat_Hijri.Calendar = new System.Globalization.UmAlQuraCalendar();
            DTFormat_Hijri.ShortDatePattern = "MM/dd/yyyy";

            /// We format the date structure to whatever we want

            return (DateGregorian.Date.ToString(DTFormat_Hijri));
        }

        #endregion
    }
}