 
using Auth.Model.PIMS.Model;
using Auth.Repository.PIMS;
using Auth.Utility.Attendance.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Auth.Controllers.PIMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IEmployeeRepository _EmployeeRepository;

        public EmployeeController(
            IEmployeeRepository EmployeeRepository
            )
        {

            _EmployeeRepository = EmployeeRepository;
        }

        #endregion

        [HttpPost]
        public async Task<dynamic> Create([FromForm] Employee Employee)
        {
            //if (Employee.ImageUpload != null)
            //{
            //    Employee.employee_image_path = GetImagePath(Employee.ImageUpload);
            //}
            //if (Employee.SignatureUpload != null)
            //{
            //    Employee.signature_image_path = GetSignaturePath(Employee.SignatureUpload);
            //}

            return await _EmployeeRepository.IUD_Employee(Employee, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] Employee Employee)
        {

            var employeeInfo = _EmployeeRepository.GetEmployeeById(Employee.employee_id).Result;
            //if (employeeInfo==null)
            //{
            //    return;
            //}
            if (Employee.ImageUpload != null)
            {
                if (!string.IsNullOrEmpty(employeeInfo.EmployeeImagePath))
                {
                    deleteImage(employeeInfo.EmployeeImagePath);

                }
                Employee.employee_image_path = GetImagePath(Employee.ImageUpload);

            }

            if (Employee.SignatureUpload != null)
            {

                if (!string.IsNullOrEmpty(employeeInfo.SignatureImagePath))
                {
                    deleteSignature(employeeInfo.SignatureImagePath);

                }
                Employee.signature_image_path = GetSignaturePath(Employee.SignatureUpload);
            }
            return await _EmployeeRepository.IUD_Employee(Employee, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int employeeId)
        {
            Employee oEmployee = new Employee();
            oEmployee.employee_id = employeeId;            
            return await _EmployeeRepository.IUD_Employee(oEmployee, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllEmployee()
        {

            return await _EmployeeRepository.GetAllEmployee();
        }

        [HttpGet]
        public async Task<dynamic> GetEmployeeById(int employeeId)
        {

            return await _EmployeeRepository.GetEmployeeById(employeeId);
        }
        [HttpGet]
        public async Task<dynamic> GetAllActiveEmployee()
        {

            return await _EmployeeRepository.GetAllActiveEmployee();
        }

        [HttpPost]
        public async Task<dynamic> EmployeeActivity(int employee_id)
        {
            return await _EmployeeRepository.EmployeeActivity(employee_id);

        }
        private string GetImagePath(IFormFile image)
        {
            var folderName = Path.Combine("assets", "images", "employeeimage");
            var directoryName = Directory.GetCurrentDirectory();

            //var pathToSave1 = Path.Combine(Directory.GetCurrentDirectory().Trim(), folderName);

            var pathToSave = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\employeeimage");
            if (image.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');

                var uniquefileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(fileName);

                var fullPath = Path.Combine(pathToSave, uniquefileName);
                var dbPath = Path.Combine(folderName, uniquefileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                return dbPath = dbPath.Replace(@"\", @"/");
            }

            return "";

        }
        private string GetSignaturePath(IFormFile signature)
        {

            var folderName = Path.Combine("assets", "images", "employeesignature");
            var directoryName = Directory.GetCurrentDirectory();

            // var pathToSave = Path.Combine(Directory.GetCurrentDirectory().Trim(), folderName);

            var pathToSave = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\employeesignature");
            if (signature.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(signature.ContentDisposition).FileName.Trim('"');

                var uniquefileName = Guid.NewGuid().ToString() + (fileName);

                var fullPath = Path.Combine(pathToSave, uniquefileName);
                var dbPath = Path.Combine(folderName, uniquefileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    signature.CopyTo(stream);
                }

                return dbPath = dbPath.Replace(@"\", @"/");
            }
            return "";
        }
        private void deleteImage(string imagepath)
        {
            FileInfo file = new FileInfo(imagepath);

            var directoryPath = ("\\WebApp\\src\\assets\\images\\employeeimage");
            var path = directoryPath + "\\" + file.Name;
            System.IO.File.Delete(path);
        }
        private void deleteSignature(string sigpath)
        {
            FileInfo file = new FileInfo(sigpath);

            var directoryPath = ("\\WebApp\\src\\assets\\images\\employeesignature");
            var path = directoryPath + "\\" + file.Name;
            System.IO.File.Delete(path);
        }

        [HttpGet]
        public async Task<dynamic> GetEmployeeCboList()
        {

            return await _EmployeeRepository.GetEmployeeCboList();
        }
    }
}
