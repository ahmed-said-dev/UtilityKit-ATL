using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;
using UtilityKit.Components.Atl.Application.Shared.Interfaces;
using UtilityKit.Components.Atl.Application.Shared.Models;
using Microsoft.AspNetCore.Http;
using System.Globalization;
namespace UtilityKit.Components.Atl.Infrastrcuture.Services;
public class CSVFileService : IFileService
{
    public FileData<TClass> Read<TClass>(IFormFile file) where TClass : HasRowNum
    {
        var fildData = new FileData<TClass>();
        var row = 0;
        using (var reader = new StreamReader(file.OpenReadStream()))
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                DetectDelimiter = true,
                TrimOptions = TrimOptions.Trim,
                HeaderValidated = ValidateHeaders(fildData),
                ReadingExceptionOccurred = occuredException =>
                {
                    if (occuredException.Exception is TypeConverterException)
                    {
                        var data = ((TypeConverterException)occuredException.Exception).Text;
                        data = data is null || data == "" ? "empty field" : data;
                        var col = ((TypeConverterException)occuredException.Exception).MemberMapData.Member.Name;
                        fildData.BadFileDataInfo.Add(new BadFileDataInfo()
                        {
                            ColumnName = col,
                            RowNum = row,
                            Value = data
                        });
                    }
                    return false;
                }
            };
            using (var csv = new CsvReader(reader, config))
            {
                csv.Context.RegisterClassMap<Map<TClass>>();
                while (csv.Read())
                {
                    row++;
                    var record = csv.GetRecord<TClass>();
                    if (record is not null)
                    {
                        record.RowNum = row;
                        fildData.Data.Add(record);
                    }
                }
            }
        }
        return fildData;
    }
    private HeaderValidated ValidateHeaders<TClass>(FileData<TClass> fildData) where TClass : HasRowNum
    {
        return missing =>
        {
            if (missing.InvalidHeaders is not null)
            {
                fildData.MissingColumns.AddRange(missing.InvalidHeaders.Select(x => x.Names[0]));
            }
        };
    }
    private class Map<TClass> : ClassMap<TClass> where TClass : HasRowNum
    {
        public Map()
        {
            AutoMap(CultureInfo.InvariantCulture);
            Map(m => m.RowNum).Ignore();
        }
    }
}