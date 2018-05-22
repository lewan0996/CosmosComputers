using System.ComponentModel.DataAnnotations;
using CosmosComputers.Contract.Enums;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public class Motherboard : Entity
    {
        [Required]
        [JsonProperty("producer")]
        public string Producer { get; set; }
        [Required]
        [JsonProperty("model")]
        public string Model { get; set; }
        [Required]
        public string Chipset { get; set; }
        [Required]
        public string CpuSocket { get; set; }
        [Required]
        public MemoryType MemoryType { get; set; }
    }
}
