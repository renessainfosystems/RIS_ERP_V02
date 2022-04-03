
using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Auth.Utility.Administrative.Enum;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
/// <summary>
/// Created By Jahid
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class OrganogramController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IOrganogramRepository _organogramRepository;

        public OrganogramController(
            IOrganogramRepository organogramRepository
            )
        {

            _organogramRepository = organogramRepository;
        }

        #endregion        

        [HttpPost]
        public async Task<dynamic> Create(Organogram organogram)
        { 
            return await _organogramRepository.IUD_Organogram(organogram, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(Organogram organogram)
        {

            var organogramInfo = _organogramRepository.GetOrganogramById(organogram.organogram_id).Result;
            //if (OrganogramInfo==null)
            //{
            //    return;
            //}
          
            return await _organogramRepository.IUD_Organogram(organogram, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Delete(int OrganogramId)
        {
            Organogram oOrganogram = new Organogram();
            oOrganogram.organogram_id = OrganogramId;
            return await _organogramRepository.IUD_Organogram(oOrganogram, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllOrganogram()
        {

            return await _organogramRepository.GetAllOrganogram();
        }

        [HttpGet]
        public async Task<dynamic> GetOrganogramById(int OrganogramId)
        {

            return await _organogramRepository.GetOrganogramById(OrganogramId);
        }
        [HttpGet]
        public async Task<dynamic> GetAllActiveOrganogram()
        {

            return await _organogramRepository.GetAllActiveOrganogram();
        }

        [HttpPost]
        public async Task<dynamic> OrganogramActivity(int Organogram_id)
        {
            return await _organogramRepository.OrganogramActivity(Organogram_id);

        }
        //[HttpGet]
        //public dynamic GetAllOrganogram()
        //{

        //    dynamic data = (dynamic)null;
        //    try
        //    {
        //        data = _organogramRepository.GetAllOrganogram();
        //    }
        //    catch (Exception ex)
        //    {
        //        data = ex.Message;
        //    }
        //    return data;
        //}

        //[HttpGet]
        //public dynamic GetById(int organogram_id)
        //{

        //    dynamic data = (dynamic)null;
        //    try
        //    {
        //        data = _organogramRepository.GetById(organogram_id);
        //    }
        //    catch (Exception ex)
        //    {
        //        data = "Error info:" + ex.Message;
        //    }
        //    return data;
        //}

        //[HttpPost]
        //public  dynamic Create(Organogram oOrganogram)
        //{

        //    var message = new CommonMessage();
        //    try
        //    {
        //        _organogramRepository.Add(oOrganogram);
        //        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
        //    }
        //    catch (Exception ex)
        //    {
        //        message = CommonMessage.SetErrorMessage(ex.Message);
        //    }
        //    return message;
        //}

        //[HttpPost]
        //public dynamic Update(Organogram oOrganogram)
        //{

        //    var message = new CommonMessage();
        //    try
        //    {
        //        _organogramRepository.Update(oOrganogram);
        //        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
        //    }
        //    catch (Exception ex)
        //    {
        //        message = CommonMessage.SetErrorMessage(ex.Message);
        //    }
        //    return message;
        //}

        //[HttpPost]
        //public dynamic Delete(int organogram_id)
        //{

        //    var message = new CommonMessage();
        //    try
        //    {
        //        _organogramRepository.Delete(organogram_id);
        //        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
        //    }
        //    catch (Exception ex)
        //    {
        //        message = CommonMessage.SetErrorMessage(ex.Message);
        //    }
        //    return message;
        //}

        //[HttpGet]
        //public dynamic OrganogramCboList()
        //{            
        //    return _organogramRepository.OrganogramCboList();
        //}
    }
}
