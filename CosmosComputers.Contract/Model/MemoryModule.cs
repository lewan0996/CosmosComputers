namespace CosmosComputers.Contract.Model
{
    public class MemoryModule : Entity
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public int MemoryAmount { get; set; }
        public MemoryType Type { get; set; }
    }
}
