using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Auth
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
        //public static IWebHostBuilder CreateHostBuilder(string[] args)
        //{
        //    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        //    var builder = WebHost.CreateDefaultBuilder(args);

        //    if (env == EnvironmentName.Staging || env == EnvironmentName.Production)
        //        builder.UseIIS();

        //    builder.UseStartup<Startup>();
        //    return builder;
        //}
    }
}
