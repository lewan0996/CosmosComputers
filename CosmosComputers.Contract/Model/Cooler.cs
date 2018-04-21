using CosmosComputers.Contract.Enums;

namespace CosmosComputers.Contract.Model
{
    public class Cooler : Entity
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public CoolerType Type { get; set; }
    }
}
