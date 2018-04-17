namespace SBDCosmosDBSQL.Contract.Model
{
    public class PowerSupply
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public bool IsModular { get; set; }
        public int Power { get; set; }
    }
}
