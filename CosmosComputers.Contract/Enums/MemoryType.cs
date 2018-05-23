using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CosmosComputers.Contract.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum MemoryType
    {
        DDR2 = 0,
        DDR3 = 1,
        DDR4 = 2
    }
}