using System.ComponentModel.DataAnnotations;
using CosmosComputers.Contract.Enums;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public class Cooler : Entity
    {
        [Required]
        [JsonProperty("producer")]
        public string Producer { get; set; }
        [Required]
        [JsonProperty("model")]
        public string Model { get; set; }
        [Required]
        public CoolerType Type { get; set; }
    }
}
