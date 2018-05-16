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
        public Motherboard Motherboard { get; set; }
        public Processor Processor { get; set; }
        public GraphicsCard GraphicsCard { get; set; }
        public Cooler Cooler { get; set; }
        public Case Case { get; set; }
        public PowerSupply PowerSupply { get; set; }
        public Disc Disc { get; set; }
        public ICollection<MemoryModule> MemoryModules { get; set; }
    }
}
