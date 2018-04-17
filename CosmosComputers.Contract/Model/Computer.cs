using System.Collections.Generic;

namespace SBDCosmosDBSQL.Contract.Model
{
    public class Computer
    {
        public string Description { get; set; }
        public Motherboard Motherboard { get; set; }
        public Processor Processor { get; set; }
        public ICollection<GraphicsCard> GraphicsCards { get; set; }
        public Cooler Cooler { get; set; }
        public Case Case { get; set; }
        public PowerSupply PowerSupply { get; set; }
        public ICollection<Disc> Discs { get; set; }
        public ICollection<MemoryModule> MemoryModules { get; set; }
    }
}
