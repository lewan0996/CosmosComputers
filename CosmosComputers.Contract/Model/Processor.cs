namespace CosmosComputers.Contract.Model
{
    public class Processor : Entity
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public string Socket { get; set; }
    }
}
