using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public class GraphicsCard : Entity
    {
        [Required]
        [JsonProperty("chipProducer")]
        public string ChipProducer { get; set; }
        [Required]
        [JsonProperty("vendor")]
        public string Vendor { get; set; }
        [Required]
        [JsonProperty("model")]
        public string Model { get; set; }
        [Required]
        [JsonProperty("version")]
        public string Version { get; set; }
    }
}
