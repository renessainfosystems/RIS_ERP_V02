using Auth.Model.DomainModel;
using Microsoft.EntityFrameworkCore;


namespace Auth.Utility.Procurement
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }

     

    }
}
