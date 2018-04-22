namespace CosmosComputers.Contract.Model
{
    public class GraphicsCard : Entity
    {
        public string ChipProducer { get; set; }
        public string Vendor { get; set; }
        public string Model { get; set; }
        public string Version { get; set; }
    }
}
