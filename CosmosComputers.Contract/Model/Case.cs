using System.ComponentModel.DataAnnotations;

namespace CosmosComputers.Contract.Model
{
    public class Case : Entity
    {
        [Required]
        public string Producer { get; set; }
        [Required]
        public string Model { get; set; }
    }
}
