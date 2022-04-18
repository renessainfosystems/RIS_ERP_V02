using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Utility.Attendance
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
        public static string CommonErrorMessage = "Ops, An error occurred. Please contact with vendor.";
        public static string CommonSaveMessage = "Data has been saved successfully";
        public static string CommonUpdateMessage = "Data has been updated successfully";
        public static string CommonCopyMessage = "Copied successfully";
        public static string CommonMailMessage = "Email Sent successfully";
        public static string CommonApproveMessage = "Approved Successfully";

        public static CommonMessage Message(int nDBOperation, dynamic data = null)
        {
            var sMsg = new CommonMessage();
            sMsg.MessageType = MessageTypes.Success;
            if (nDBOperation == 1/*Insert*/) sMsg.CurrentMessage = CommonSaveMessage;
            else if (nDBOperation == 2/*Update*/) sMsg.CurrentMessage = CommonUpdateMessage;
            else if (nDBOperation == 3/*Delete*/) sMsg.CurrentMessage = CommonDeleteMessage;
            else if (nDBOperation == 4/*Approve*/) sMsg.CurrentMessage = CommonApproveMessage;
            else sMsg.CurrentMessage = CommonCopyMessage;/*DBOperation=5; Copy*/

            if (data != null) sMsg.Data = data;
            else
            {
                if (nDBOperation != 3/*Delete*/)
                {
                    sMsg.MessageType = MessageTypes.Error;
                    sMsg.CurrentMessage = CommonErrorMessage;
                }
            }
            return sMsg;
        }

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
