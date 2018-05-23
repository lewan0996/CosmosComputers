using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CosmosComputers.Contract.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum CoolerType
    {
        Air = 0,
        AiO = 1
    }
}