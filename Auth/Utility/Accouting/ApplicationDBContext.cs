using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using Auth.Model.Auth.Model;
using Auth.Model.DomainModel;
using Microsoft.EntityFrameworkCore;


namespace Auth.Utility.Accounting
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }

       
        #region Auth
        public DbSet<Menu> Menus { get; set; } 
        #endregion

        #region Administrative
        public DbSet<Country> Countries { get; set; }
        public DbSet<Division> Divisions { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<CompanyCorporate> CompanyCorporates { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanyGroup> CompanyGroups { get; set; }
        public DbSet<Competency> Competencies { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<DepartmentTypeConfig> DepartmentTypeConfigs { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<LocationBIN> LocationBINs { get; set; }
        public DbSet<CompanyBusinessNature> CompanyBusinessNatures { get; set; }
        public DbSet<CompanyIndustrySubSector> CompanyIndustrySubSectors { get; set; }
        public DbSet<CompanyOwnershipType> CompanyOwnershipTypes { get; set; }
        public DbSet<IndustrySector> IndustrySectors { get; set; }
        public DbSet<IndustrySubSector> IndustrySubSectors { get; set; }
        public DbSet<KeySkill> KeySkills { get; set; }
        public DbSet<OwnershipType> OwnershipTypes { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<CompanyBIN> CompanyBINs { get; set; }
        public DbSet<VatCommissionerate> VatCommissionerates { get; set; }
        public DbSet<VatDivision> VatDivisions { get; set; }
        public DbSet<VatCircle> VatCircles { get; set; }
        public DbSet<Organogram> Organograms { get; set; }
        public DbSet<OrganogramDetail> OrganogramDetails { get; set; }
        public DbSet<OrganogramDetailCompetency> OrganogramDetailCompetencies { get; set; }
        public DbSet<OrganogramDetailEducation> OrganogramDetailEducations { get; set; }
        public DbSet<OrganogramDetailKeySkill> OrganogramDetailKeySkills { get; set; }
        public DbSet<OrganogramDetailSupervisor> OrganogramDetailSupervisors { get; set; }
        public DbSet<Currency> Currencies { get; set; }

        #endregion

        #region Procurement
        public DbSet<Association> Associations { get; set; }

        public DbSet<AssociationViewModel> AssociationViewModels { get; set; }

        public DbSet<RegistryAuthority> RegistryAuthoritys { get; set; }

        public DbSet<EcommercePlatform> EcommercePlatforms { get; set; }

        public DbSet<Regulator> Regulators { get; set; }

        public DbSet<Bank> Banks { get; set; }

        #endregion

        #region VoucherType
        public DbSet<VoucherType> VoucherTypes { get; set; }

        #endregion
    }
}
