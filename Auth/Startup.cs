using Auth.DataAccess;
using Auth.DataAccess.Attendance;
using Auth.DataAccess.EmailService;
using Auth.DataAccess.EntityDataAccess;
using Auth.DataAccess.Party;
using Auth.DataAccess.Payroll;
using Auth.DataAccess.PIMS;
using Auth.DataAccess.Procurement;
using Auth.Middleware;
using Auth.Repository.Administrative;
using Auth.Repository.Attendance;
using Auth.Repository.AuthorizationRole;
using Auth.Repository.EmailService;
using Auth.Repository.Menu;
using Auth.Repository.Party;
using Auth.Repository.Payroll;
using Auth.Repository.PIMS;
using Auth.Repository.Procurement;
using Auth.Repository.UserMenuPermisssion;
using Auth.Service;
using Auth.DataAccess.Administrative;
using DataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository.Implementation;
using Repository.Interface;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationDBContext = DataAccess.ApplicationDBContext;

namespace Auth
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public string audiance;



        // This method gets called by the runtime. Use this method to add services to the container.
        [System.Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers()
             .AddJsonOptions(options =>
               options.JsonSerializerOptions.PropertyNamingPolicy = null);
            services.AddTransient<ApplicationDBContext>();
            //Db connection string link with sql server
            services.AddDbContext<ApplicationDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SqlConnStr")));
            // Read the connection string from appsettings.
            string dbConnectionString = this.Configuration.GetConnectionString("SqlConnStr");

            // Inject IDbConnection, with implementation from SqlConnection class.
            IServiceCollection serviceCollection = services.AddTransient<IDbConnection>((sp) => new SqlConnection(dbConnectionString));
            services
    .AddMvc()
    .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            //Swagger add
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                var securitySchema = new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer", securitySchema);

                var securityRequirement = new OpenApiSecurityRequirement
                {
                    { securitySchema, new[] { "Bearer" } }
                };

                c.AddSecurityRequirement(securityRequirement);
            });
            services.AddMvc()
              .AddControllersAsServices();

            services.AddSession();
            services.AddSingleton<Microsoft.AspNetCore.Http.IHttpContextAccessor, Microsoft.AspNetCore.Http.HttpContextAccessor>();

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();


            // Adding Authentication
            services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;


    })


     // Adding Jwt Bearer
     .AddJwtBearer(options =>
     {
         options.SaveToken = true;
         options.RequireHttpsMetadata = false;
         options.TokenValidationParameters = new TokenValidationParameters()
         {
             ValidateIssuer = true,
             ValidateAudience = false,
             RequireExpirationTime = true,
             ClockSkew = System.TimeSpan.Zero,
             ValidAudiences = Configuration.GetSection("JWT:ValidAudience").Get<string[]>().ToList(),
             ValidIssuer = Configuration["JWT:ValidIssuer"],

             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"]))
         };
         options.Events = new JwtBearerEvents
         {
             OnAuthenticationFailed = context =>
             {
                 if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                 {
                     context.Response.Headers.Add("Token-Expired", "true");
                 }
                 return Task.CompletedTask;
             }
         };
     });

            #region Auth
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<UserDataAccess, UserDataAccess>();
            services.AddScoped<IMenuRepository, MenuRepository>();
            services.AddScoped<MenuDataAccess, MenuDataAccess>();
            services.AddScoped<IAuthorizationRoleRepository, AuthorizationRoleRepository>();
            services.AddScoped<AuthorizationRoleDataAccess, AuthorizationRoleDataAccess>();
            services.AddScoped<IEmailServiceRepository, EmailServiceRepository>();
            services.AddScoped<EmailServiceDataAccess, EmailServiceDataAccess>();
            services.AddScoped<IUserMenuPermisssionRepository, UserMenuPermisssionRepository>();
            services.AddScoped<UserMenuPermisssionDataAccess, UserMenuPermisssionDataAccess>();
            
            #endregion

            #region Administrative
            services.AddTransient(typeof(IEntityDataAccess<>), typeof(DataAccess.EntityDataAccess.EntityDataAccess<>));
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<IDivisionRepository, DivisionRepository>();
            services.AddScoped<IDistrictRepository, DistrictRepository>();
            services.AddScoped<IThanaRepository, ThanaRepository>();
            services.AddScoped<IZoneRepository, ZoneRepository>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<ICompanyCorporateRepository, CompanyCorporateRepository>();
            services.AddScoped<ICompanyGroupRepository, CompanyGroupRepository>();
            services.AddScoped<ICompetencyRepository, CompetencyRepository>();
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            services.AddScoped<IDepartmentTypeConfigRepository, DepartmentTypeConfigRepository>();
            services.AddScoped<IDesignationRepository, DesignationRepository>();
            services.AddScoped<IEducationRepository, EducationRepository>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<ILocationBINRepository, LocationBINRepository>();
            services.AddScoped<ICompanyBusinessNatureRepository, CompanyBusinessNatureRepository>();
            services.AddScoped<ICompanyIndustrySubSectorRepository, CompanyIndustrySubSectorRepository>();
            services.AddScoped<ICompanyOwnershipTypeRepository, CompanyOwnershipTypeRepository>();
            services.AddScoped<IIndustrySectorRepository, IndustrySectorRepository>();
            services.AddScoped<IIndustrySubSectorRepository, IndustrySubSectorRepository>();
            services.AddScoped<IKeySkillRepository, KeySkillRepository>();
            services.AddScoped<IOwnershipTypeRepository, OwnershipTypeRepository>();
            services.AddScoped<ICompanyBINRepository, CompanyBINRepository>();
            services.AddScoped<IPositionRepository, PositionRepository>();
            services.AddScoped<IVatCommissionerateRepository, VatCommissionerateRepository>();
            services.AddScoped<IVatDivisionRepository, VatDivisionRepository>();
            services.AddScoped<IVatCircleRepository, VatCircleRepository>();
            services.AddScoped<IOrganogramRepository, OrganogramRepository>();
            services.AddScoped<IOrganogramDetailRepository, OrganogramDetailRepository>();
            services.AddScoped<IOrganogramDetailCompetencyRepository, OrganogramDetailCompetencyRepository>();
            services.AddScoped<IOrganogramDetailEducationRepository, OrganogramDetailEducationRepository>();
            services.AddScoped<IOrganogramDetailKeySkillRepository, OrganogramDetailKeySkillRepository>();
            services.AddScoped<IOrganogramDetailSupervisorRepository, OrganogramDetailSupervisorRepository>();
            services.AddScoped<ICurrencyRepository, CurrencyRepository>();
            services.AddScoped<IDocumentTypeRepository, DocumentTypeRepository>();
            services.AddScoped<IMfsRepository, MfsRepository>();
            services.AddScoped<ILocationTypeRepository, LocationTypeRepository>();
            services.AddScoped<IContactTypeRepository, ContactTypeRepository>();
            services.AddScoped<IAdministrativeDBEnumRepository, AdministrativeDBEnumRepository>();
            services.AddScoped<ISecurityDepositRepository, SecurityDepositRepository>();

            services.AddScoped<IAssociationRepository, AssociationRepository>();
            services.AddScoped<IRegistryAuthorityRepository, RegistryAuthorityRepository>();
            services.AddScoped<IEcommercePlatformRepository, EcommercePlatformRepository>();
            services.AddScoped<IRegulatorRepository, RegulatorRepository>();

            services.AddScoped<BankDataAccess, BankDataAccess>();
            services.AddScoped<IBankRepository, BankRepository>();

            services.AddScoped<BankBranchDataAccess, BankBranchDataAccess>();
            services.AddScoped<IBankBranchRepository, BankBranchRepository>();

            services.AddScoped<OrganogramDataAccess, OrganogramDataAccess>();
            services.AddScoped<IOrganogramRepository, OrganogramRepository>();
            
            services.AddScoped<OrganogramDetailDataAccess, OrganogramDetailDataAccess>();
            services.AddScoped<IOrganogramDetailRepository, OrganogramDetailRepository>();
            #endregion

            #region Voucher Type
            services.AddScoped<IVoucherTypeRepository, VoucherTypeRepository>();
            #endregion

            #region Attendance
            services.AddScoped<IHolidayRepository, HolidayRepository>();
            // services.AddTransient(typeof(IEntityDataAccess<>), typeof(DataAccess.Attendance.EntityDataAccess.EntityDataAccess<>));
            services.AddScoped<IAttendanceCalendarRepository, AttendanceCalendarRepository>();
            services.AddScoped<AttendanceCalendarDataAccess, AttendanceCalendarDataAccess>();
            services.AddScoped<IAttendanceCalendarSessionRepository, AttendanceCalendarSessionRepository>();
            services.AddScoped<AttendanceCalendarSessionDataAccess, AttendanceCalendarSessionDataAccess>();
            services.AddScoped<IShiftBreakRepository,ShiftBreakRepository>();
            services.AddScoped<IOvertimePolicyRepository, OvertimePolicyRepository>();
            services.AddScoped<OvertimePolicyDataAccess, OvertimePolicyDataAccess>();
            services.AddScoped<ILeaveHeadRepository, LeaveHeadRepository>();
            services.AddScoped<LeaveHeadDataAccess, LeaveHeadDataAccess>();
            services.AddScoped<IShiftInfoRepository, ShiftInfoRepository>();
            services.AddScoped<ShiftInfoDataAccess, ShiftInfoDataAccess>();
            services.AddScoped<IAttendanceBenefitPolicyRepository, AttendanceBenefitPolicyRepository>();
            services.AddScoped<AttendanceBenefitPolicyDataAccess, AttendanceBenefitPolicyDataAccess>();
            services.AddScoped<IAbsenteeismPolicyRepository, AbsenteeismPolicyRepository>();
            services.AddScoped<AbsenteeismPolicyDataAccess, AbsenteeismPolicyDataAccess>();
            services.AddScoped<ISalaryHeadRepository, SalaryHeadRepository>();
            services.AddScoped<SalaryHeadDataAccess, SalaryHeadDataAccess>();
            services.AddScoped<IPayrollDBEnumRepository, PayrollDBEnumRepository>();
            services.AddScoped<LateEarlyPolicyDataAccess, LateEarlyPolicyDataAccess>();
            services.AddScoped<ILateEarlyPolicyRepository, LateEarlyPolicyRepository>();
            services.AddScoped<RosterPolicyDataAccess, RosterPolicyDataAccess>();
            services.AddScoped<IRosterPolicyRepository, RosterPolicyRepository>();
            services.AddScoped<LeavePolicyDataAccess, LeavePolicyDataAccess>();
            services.AddScoped<ILeavePolicyRepository, LeavePolicyRepository>();
            services.AddScoped<AttendancePolicyDataAccess, AttendancePolicyDataAccess>();
            services.AddScoped<IAttendancePolicyRepository, AttendancePolicyRepository>();
            services.AddScoped<IDBEnumRepository, DBEnumRepository>();
            services.AddScoped<DBEnumDataAcess, DBEnumDataAcess>();
            services.AddScoped<IAttendancePolicyAssignmentRepository, AttendancePolicyAssignmentRepository>();
            services.AddScoped<AttendancePolicyAssignmentDataAccess, AttendancePolicyAssignmentDataAccess>();

            #endregion

            #region PIMS
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<EmployeeDataAccess, EmployeeDataAccess>();
            services.AddScoped<IEmployeeOfficialRepository, EmployeeOfficialRepository>();
            services.AddScoped<EmployeeOfficialDataAccess, EmployeeOfficialDataAccess>();
            services.AddScoped<IEmployeeCategoryTypeRepository, EmployeeCategoryTypeRepository>();
            services.AddScoped<IPIMSDBEnumRepository, PIMSDBEnumRepository>();
            services.AddScoped<PIMSDBEnumDataAcess, PIMSDBEnumDataAcess>();
            services.AddScoped<IEmployeeDayoffRepository, EmployeeDayoffRepository>();
            services.AddScoped<EmployeeDayoffDataAccess, EmployeeDayoffDataAccess>();
            services.AddScoped<IEmployeeBenefitPolicyRepository, EmployeeBenefitPolicyRepository>();
            services.AddScoped<EmployeeBenefitPolicyDataAccess, EmployeeBenefitPolicyDataAccess>();
            services.AddScoped<IEmployeeLeaveLedgerRepository, EmployeeLeaveLedgerRepository>();
            services.AddScoped<EmployeeLeaveLedgerDataAccess, EmployeeLeaveLedgerDataAccess>();
            services.AddScoped<IEmployeeAttendancePolicyRepository, EmployeeAttendancePolicyRepository>();
            services.AddScoped<EmployeeAttendancePolicyDataAccess, EmployeeAttendancePolicyDataAccess>();
            #endregion

            #region Party

            #region Dealer Part
            services.AddScoped<IDealerInfoRepository, DealerInfoRepository>();
            services.AddScoped<DealerInfoDataAccess, DealerInfoDataAccess>();
            services.AddScoped<IDealerContactInfoRepository, DealerContactInfoRepository>();
            services.AddScoped<DealerContactInfoDataAccess, DealerContactInfoDataAccess>();
            services.AddScoped<IDealerLocationInfoRepository, DealerLocationInfoRepository>();
            services.AddScoped<DealerLocationInfoDataAccess, DealerLocationInfoDataAccess>();
            services.AddScoped<IDealerDocumentInfoRepository, DealerDocumentInfoRepository>();
            services.AddScoped<DealerDocumentInfoDataAccess, DealerDocumentInfoDataAccess>();
            services.AddScoped<IDealerCreditInfoRepository, DealerCreditInfoRepository>();
            services.AddScoped<DealerCreditInfoDataAccess, DealerCreditInfoDataAccess>();
            services.AddScoped<IDealerVerificationRepository, DealerVerificationRepository>();
            services.AddScoped<DealerVerificationDataAccess, DealerVerificationDataAccess>();
            #endregion
            #region Retailer Part
            services.AddScoped<IRetailerInfoRepository, RetailerInfoRepository>();
            services.AddScoped<RetailerInfoDataAccess, RetailerInfoDataAccess>();
            services.AddScoped<IRetailerContactInfoRepository, RetailerContactInfoRepository>();
            services.AddScoped<RetailerContactInfoDataAccess, RetailerContactInfoDataAccess>();
            services.AddScoped<IRetailerLocationInfoRepository, RetailerLocationInfoRepository>();
            services.AddScoped<RetailerLocationInfoDataAccess, RetailerLocationInfoDataAccess>();
            #endregion
            #endregion

            #region Supplier

            services.AddScoped<SupplierApplicationDataAccess, SupplierApplicationDataAccess>();
            services.AddScoped<ISupplierApplicationRepository, SupplierApplicationRepository>();

            services.AddScoped<SupplierAssessmentDataAccess, SupplierAssessmentDataAccess>();
            services.AddScoped<ISupplierAssessmentRepository, SupplierAssessmentRepository>();
            #endregion

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        [System.Obsolete]
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            if (env.IsDevelopment()|| env.IsProduction())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
                // specifying the Swagger JSON endpoint.
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                });
            }
            // Enable middleware to serve generated Swagger as a JSON endpoint.
        

            app.UseCors(builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });
            app.UseRouting();
            //app.UseStaticFiles();
            //app.UseStaticFiles(new StaticFileOptions()
            //{
            //    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Library")),
            //    RequestPath = new PathString("/Library")
            //});
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();
            app.UseMiddleware<JWTMiddleware>();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
