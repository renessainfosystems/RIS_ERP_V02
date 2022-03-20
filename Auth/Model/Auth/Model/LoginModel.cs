using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Auth.Model
{
    public class LoginModel
    {

        [Required(ErrorMessage = "Login_User is required")]
        public string Login_User { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }


    }
}
