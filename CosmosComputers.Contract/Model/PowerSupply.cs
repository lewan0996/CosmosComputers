namespace CosmosComputers.Contract.Model
{
    public class PowerSupply : Entity
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public bool IsModular { get; set; }
        public int Power { get; set; }
    }
}
