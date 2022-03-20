using DataAccess;

namespace Service
{
    public class UserInformationService
    {

        protected UserDataAccess dataAccess { get; set; }
        public UserInformationService(UserDataAccess userDataAccess)
        {
            dataAccess = userDataAccess;
        }

        
    }
}
