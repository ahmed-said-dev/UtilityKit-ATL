using UtilityKit.Components.Atl.Application.Shared.Models;
using Microsoft.AspNetCore.Http;

namespace UtilityKit.Components.Atl.Application.Shared.Interfaces;

/// <summary>
/// ifile service may have multiple implementations,
/// so use ServiceResolver to specify which implementation to use
/// </summary>
public interface IFileService
{
    FileData<TClass> Read<TClass>(IFormFile file) where TClass : HasRowNum;
}
