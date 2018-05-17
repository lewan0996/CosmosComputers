using System.ComponentModel.DataAnnotations;

namespace CosmosComputers.Contract.Model
{
    public class PowerSupply : Entity
    {
        [Required]
        public string Producer { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public bool IsModular { get; set; }
        [Required]
        public int Power { get; set; }
    }
}
