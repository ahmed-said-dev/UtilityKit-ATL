using G2Kit.Components.Und.Domain.Exceptions.Broker;
using MediatR;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Primitives;
using System.Drawing;
using System.IO;
using System.Net.Http.Headers;
using System.Resources;
using System.Threading;
using UtilityKit.Components.Atl.Api.WebApi.Controllers;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using UtilityKit.Components.Atl.Infrastrcuture.Repositories;

namespace UploadFilesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : BaseController
    {
        private readonly string folderName = Path.Combine("Resources", "DataSource");

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload([FromForm] FileDto fileDto)
        {
            try
            {
                var fileObject = fileDto;
                var formCollection = await Request.ReadFormAsync();
                string atlProjectId = formCollection["atlProjectId"];
                var file = formCollection.Files.First();
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    fileName += fileObject.FileType;

                    var fullPath = Path.Combine(pathToSave, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpDelete("{dataFileName}")]
        public Task<bool> Delete(string dataFileName)
        {
            try
            {
                if (dataFileName != null)
                {
                    var unZippedFolder = dataFileName.Substring(0, dataFileName.LastIndexOf("."));
                    var unZippedFolderPath = folderName + "\\" + unZippedFolder;


                    FileInfo zippedfile = new FileInfo(folderName + "\\" + dataFileName);

                    if (zippedfile.Exists)  //check file exsit or not
                        zippedfile.Delete();

                    DirectoryInfo directory = new DirectoryInfo(unZippedFolderPath);

                    if (directory.Exists)
                        Directory.Delete(directory.FullName, true);
                }

                return Task.FromResult(true);
            }
            catch (Exception)
            {
                throw new DataFileNotFoundException();
            }
        }
    }

    public class FileDto
    {
        public FileTypeEnum FileType { get; set; }
        public IFormFile File { get; set; }
    }

    public enum FileTypeEnum
    {
        GEOFile = 1,
        CADFile = 2,
    }

}