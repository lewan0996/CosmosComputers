namespace SBDCosmosDBSQL.Contract.Model
{
    public class Disc
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public int MemoryAmount { get; set; }
        public DiscType Type { get; set; }
        public DiscConnector Connector { get; set; }
    }
}
