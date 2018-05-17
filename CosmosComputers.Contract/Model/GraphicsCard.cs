using System.ComponentModel.DataAnnotations;

namespace CosmosComputers.Contract.Model
{
    public class GraphicsCard : Entity
    {
        [Required]
        public string ChipProducer { get; set; }
        [Required]
        public string Vendor { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Version { get; set; }
    }
}
