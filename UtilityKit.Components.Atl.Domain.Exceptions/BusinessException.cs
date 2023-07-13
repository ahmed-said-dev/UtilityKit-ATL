global using System.Net;
using UtilityKit.Components.Atl.Domain.Exceptions.Constants;

namespace UtilityKit.Components.Atl.Domain.Exceptions
{
    public class BusinessException : Exception
    {
        #region --- Properties
        public string EnglishMessage { get; }
        public string ArabicMessage { get; }
        public HttpStatusCode StatusCode { get; }
        public string ErrorCode { get; }
        #endregion

        #region --- Constructor
        public BusinessException(int errorSerial,string englishMessage, string arabicMessage, HttpStatusCode code = HttpStatusCode.BadRequest) : base(englishMessage)
        {
            EnglishMessage = englishMessage;
            ArabicMessage = arabicMessage;
            StatusCode = code;
            ErrorCode = FormatErrorCode(errorSerial);
        }
        #endregion

        #region --- Methods
        private string FormatErrorCode(int errorSerial)
        {
            return $"{ExceptionCodes.G2_APP_PREFIX}_{ExceptionCodes.UND_COMPONENT_CODE}{errorSerial.ToString("00000")}";
        }
        #endregion
    }
}