using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Auth.Model
{
    public class ResetPasswordRequest
    {

        public string Token { get; set; }


     
        public string Password { get; set; }

 
       
        public string ConfirmPassword { get; set; }

        public int UserInfoId { get; set; }
    }
}
