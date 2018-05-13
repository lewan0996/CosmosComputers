using System.ComponentModel.DataAnnotations;

namespace CosmosComputers.Contract.Model
{
    public class Processor : Entity
    {
        [Required]
        public string Producer { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Socket { get; set; }
    }
}
