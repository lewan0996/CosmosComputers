using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    [EnsurePartsCompatibility]
    public class Computer : Entity
    {
        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("motherboard")]
        public Motherboard Motherboard { get; set; }
        [JsonProperty("processor")]
        public Processor Processor { get; set; }
        [JsonProperty("graphicsCard")]
        public GraphicsCard GraphicsCard { get; set; }
        [JsonProperty("cooler")]
        public Cooler Cooler { get; set; }
        [JsonProperty("case")]
        public Case Case { get; set; }
        [JsonProperty("powerSupply")]
        public PowerSupply PowerSupply { get; set; }
        [JsonProperty("disc")]
        public Disc Disc { get; set; }
        [JsonProperty("memoryModules")]
        public ICollection<MemoryModule> MemoryModules { get; set; }
    }
}
