using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Responses;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_ATLProject.Requests;
using UtilityKit.Components.Atl.Application.Contracts.Repository;
using UtilityKit.Components.Atl.Application.Errors.Design;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Domain.Exceptions.Broker;
using UtilityKit.Components.Atl.Domain.BusinessModel.Entities;
using FluentValidation;
using MediatR;
using AutoMapper;
using UtilityKit.Components.Atl.Domain.BusinessModel.MetaData.DataSourceSchema;
using UtilityKit.Components.Atl.Domain.SharedKernel.Enum;
using UtilityKit.Components.Atl.Application.Contracts.Data.DataSourceSchemaDtos;
using UtilityKit.Components.Atl.Application.Contracts.Data.Crt_XMLSchema.Responses;
using UtilityKit.Components.Shared.GIS;
using Newtonsoft.Json;
using System.Net.Sockets;
using System.Net;
using System.Text;
using UtilityKit.Components.Atl.Application.Commands.Cmd_MapRecord;
using System.IO.Compression;

namespace UtilityKit.Components.Atl.Application.Commands.Cmd_Schema_DataSource;
public class AddSchemaToATLCommand : IRequest
{
    public AddSchemaToATLRequest AddSchemaToATLRequest { get; set; }
    public class Handler : IRequestHandler<AddSchemaToATLCommand>
    {
        #region --- Variables
        private readonly IMapper _mapper;
        private readonly IDataSourceRepository _dataSourceRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly string folderName = Path.Combine("Resources", "DataSource");
        #endregion

        #region --- Constructor
        public Handler(IDataSourceRepository dataSourceRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _dataSourceRepository = dataSourceRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion

        #region --- Methods
        public async Task<Unit> Handle(AddSchemaToATLCommand request, CancellationToken cancellationToken)
        {
            Schema connectedSchema = null;

            // Connect the socket to the remote endpoint. Catch any errors.
            try
            {
                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), folderName + "\\" + request.AddSchemaToATLRequest.FileUrl);
                fullPath = fullPath.Substring(0, fullPath.LastIndexOf("."));
                ZipFile.ExtractToDirectory(folderName + "\\" + request.AddSchemaToATLRequest.FileUrl, folderName, true);

                byte[] bytes = new byte[1048576];

                // Connect to a Remote server
                // Get Host IP Address that is used to establish a connection
                // In this case, we get one IP address of localhost that is IP : 127.0.0.1
                // If a host has multiple addresses, you will get a list of addresses
                IPHostEntry host = Dns.GetHostEntry("localhost");
                IPAddress ipAddress = host.AddressList[0];
                IPEndPoint remoteEP = new IPEndPoint(ipAddress, 11000);
                // Create a TCP/IP  socket.
                Socket sender = new Socket(ipAddress.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
                // Connect to Remote EndPoint
                sender.Connect(remoteEP);
                Console.WriteLine("Socket connected to {0}", sender.RemoteEndPoint.ToString());

                // Encode the data string into a byte array.

                byte[] msg = Encoding.ASCII.GetBytes(fullPath);
                // Send the data through the socket.
                int bytesSent = sender.Send(msg);
                // Receive the response from the remote device.
                int bytesRec = sender.Receive(bytes);
                connectedSchema = JsonConvert.DeserializeObject<Schema>(Encoding.ASCII.GetString(bytes, 0, bytesRec));
                connectedSchema.Name = request.AddSchemaToATLRequest.Schema.Name;
                // Release the socket.
                sender.Shutdown(SocketShutdown.Both);
                sender.Close();

            }
            catch (ArgumentNullException ane)
            {
                Console.WriteLine("ArgumentNullException : {0}", ane.ToString());
                throw ane;
            }
            catch (SocketException se)
            {
                Console.WriteLine("SocketException : {0}", se.ToString());
                throw se;
            }
            catch (Exception e)
            {
                Console.WriteLine("Unexpected exception : {0}", e.ToString());
                throw e;
            }
            DataSource dataSource = GetATLProjectDataSource(request.AddSchemaToATLRequest.ATLProjectId, connectedSchema);
            await _dataSourceRepository.Add(dataSource, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return await Task.FromResult(Unit.Value);
        }

        private DataSource GetATLProjectDataSource(Guid atlId, Schema schema)
        {
            var date = DateTime.Now;
            DataSource dataSource = new DataSource();

            dataSource.Name = schema.Name;
            dataSource.DataSourceSchemaJson = schema;
            dataSource.DataSourceTypeId = 1; //TODO : should add DataSourceTypeId 
            dataSource.FeatureClassesCount = schema.FeatureClasses.Count();
            dataSource.TablesCount = schema.Tables.Count();
            dataSource.ATLProjectId = atlId;
            return dataSource;
        }

        private void Decompress(FileInfo fileToDecompress)
        {
            using (FileStream originalFileStream = fileToDecompress.OpenRead())
            {
                string currentFileName = fileToDecompress.FullName;
                string newFileName = currentFileName.Remove(currentFileName.Length - fileToDecompress.Extension.Length);

                using (FileStream decompressedFileStream = File.Create(newFileName))
                {
                    using (GZipStream decompressionStream = new GZipStream(originalFileStream, CompressionMode.Decompress))
                    {
                        decompressionStream.CopyTo(decompressedFileStream);
                        Console.WriteLine($"Decompressed: {fileToDecompress.Name}");
                    }
                }
            }
        }
        private void UnZipFile()
        {
            using (MemoryStream srcMemoryStream = new MemoryStream())
            {
                using (MemoryStream targetMemoryStream = new MemoryStream())
                {
                    // to have a byte array, I just read a file and store it into a memory stream
                    using (FileStream sourceZipFile = new FileStream(@"f:\source-file.zip", FileMode.Open))
                    {
                        sourceZipFile.CopyTo(srcMemoryStream);
                    }

                    using (ZipArchive srcArchive = new ZipArchive(srcMemoryStream, ZipArchiveMode.Read))
                    {
                        using (ZipArchive destArchive = new ZipArchive(targetMemoryStream, ZipArchiveMode.Create, true))
                        {

                            srcArchive.Entries
                                .Where(entry => entry.FullName.Contains("dist/"))
                                .ToList()
                                .ForEach((entry) =>
                                {
                                    // i simply create the same folder with the same structure in other archive
                                    // if you want to change the structure, you have to rename or remove parts of 
                                    // the path like below
                                    ///  var newEntryName = entry.FullName.Replace("files/dist/", "new-dist/");
                                    ///  ZipArchiveEntry newEntry = destArchive.CreateEntry(newEntryName);
                                    ZipArchiveEntry newEntry = destArchive.CreateEntry(entry.FullName);
                                    using (Stream srcEntry = entry.Open())
                                    {
                                        using (Stream destEntry = newEntry.Open())
                                        {
                                            srcEntry.CopyTo(destEntry);
                                        }
                                    }
                                });
                        }
                    }

                    // i just write the zip file on disk to make sure that it works, your desire state is already achieved
                    //// before this line of code, and the result byte Array is inside the targetMemoryStream memory stream
                    //using (FileStream fs = new FileStream(@"f:/destination-file.zip", FileMode.Create))
                    //{
                    //    targetMemoryStream.WriteTo(fs);
                    //    targetMemoryStream.Flush();
                    //    fs.Flush(true);
                    //}

                }
            }
        }
        public class Validator : AbstractValidator<AddSchemaToATLCommand>
        {
            public Validator()
            {
                RuleFor(x => x.AddSchemaToATLRequest.Schema.Name).NotEmpty().WithMessage(DataSourceErrors.NAME_REQUIRED);
            }
        }

        #endregion
    }
}