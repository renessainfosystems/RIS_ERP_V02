using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Utility.Payroll
{
    public enum MessageTypes
    {
        None = 0,
        Success = 1,
        Warning = 2,
        Error = 3

    }

    public class CommonMessage
    {
        public string CurrentMessage { get; set; }
        public MessageTypes MessageType { get; set; }
        public dynamic Data { get; set; }

        public CommonMessage()
        {
            CurrentMessage = string.Empty;
            MessageType = MessageTypes.None;
            Data = (dynamic)null;
        }



        public static string CommonDeleteMessage = "Data has been deleted successfully";
        public static string CommonErrorMessage = "An error Occurred";
        public static string CommonSaveMessage = "Data has been saved successfully";
        public static string CommonUpdateMessage = "Data has been updated successfully";
        public static string CommonMailMessage = "Email Sent successfully";

        public static CommonMessage SetSuccessMessage(string message, dynamic data = null)
        {

            var msg = new CommonMessage();

            msg.CurrentMessage = message;
            msg.MessageType = MessageTypes.Success;
            if (data != null)
            {
                msg.Data = data;
            }

            return msg;
        }

        public static CommonMessage SetWarningMessage(string message, dynamic data = null)
        {
            var msg = new CommonMessage();

            msg.CurrentMessage = message;
            msg.MessageType = MessageTypes.Warning;
            if (data != null)
            {
                msg.Data = data;
            }

            return msg;
        }

        public static CommonMessage SetErrorMessage(string message, dynamic data = null)
        {
            var msg = new CommonMessage();

            msg.CurrentMessage = message;
            msg.MessageType = MessageTypes.Error;
            if (data != null)
            {
                msg.Data = data;
            }

            return msg;
        }

    }
}
