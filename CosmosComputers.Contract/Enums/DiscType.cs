using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CosmosComputers.Contract.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum DiscType
    {
        SSD=0,
        HDD=1
    }
}