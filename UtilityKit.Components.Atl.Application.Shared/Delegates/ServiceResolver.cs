namespace UtilityKit.Components.Atl.Application.Shared.Delegates;
public delegate TInterface ServiceResolver<TInterface>(string key) where TInterface : class;