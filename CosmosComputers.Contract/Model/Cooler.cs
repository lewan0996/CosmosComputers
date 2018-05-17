using System.ComponentModel.DataAnnotations;
using CosmosComputers.Contract.Enums;

namespace CosmosComputers.Contract.Model
{
    public class Cooler : Entity
    {
        [Required]
        public string Producer { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public CoolerType Type { get; set; }
    }
}
