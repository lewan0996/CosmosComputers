using System.ComponentModel.DataAnnotations;
using CosmosComputers.Contract.Enums;

namespace CosmosComputers.Contract.Model
{
    public class Motherboard : Entity
    {
        [Required]
        public string Producer { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Chipset { get; set; }
        [Required]
        public string CpuSocket { get; set; }
        [Required]
        public MemoryType MemoryType { get; set; }
    }
}
