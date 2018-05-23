using System.ComponentModel.DataAnnotations;
using CosmosComputers.Contract.Enums;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public class Disc : Entity
    {
        [Required]
        [JsonProperty("producer")]
        public string Producer { get; set; }
        [Required]
        [JsonProperty("model")]
        public string Model { get; set; }
        [Required]
        [JsonProperty("memoryAmount")]
        public int MemoryAmount { get; set; }
        [Required]
        public DiscType Type { get; set; }
        [Required]
        public DiscConnector Connector { get; set; }
    }
}
