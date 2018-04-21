namespace CosmosComputers.Contract.Model
{
    public class Motherboard : Entity
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public string Chipset { get; set; }
        public string CpuSocket { get; set; }
        public MemoryType MemoryType { get; set; }
    }
}
