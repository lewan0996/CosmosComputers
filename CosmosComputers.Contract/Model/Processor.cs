using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public class Processor : Entity
    {
        [Required]
        public string Producer { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        [JsonProperty("socket")]
        public string Socket { get; set; }
    }
}
