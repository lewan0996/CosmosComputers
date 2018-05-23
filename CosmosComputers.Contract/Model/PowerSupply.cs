using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public class PowerSupply : Entity
    {
        [Required]
        [JsonProperty("producer")]
        public string Producer { get; set; }
        [Required]
        [JsonProperty("model")]
        public string Model { get; set; }
        [Required]
        public bool IsModular { get; set; }
        [Required]
        [JsonProperty("power")]
        public int Power { get; set; }
    }
}
