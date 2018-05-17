using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CosmosComputers.Contract.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum DiscConnector
    {
        SATA2 = 0,
        SATA3 = 1,
        M2 = 2,
        PCIe = 3
    }
}