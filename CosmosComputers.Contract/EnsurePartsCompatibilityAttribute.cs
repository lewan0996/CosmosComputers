using System.ComponentModel.DataAnnotations;
using System.Linq;
using CosmosComputers.Contract.Model;

namespace CosmosComputers.Contract
{
    public class EnsurePartsCompatibilityAttribute :ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var computer = (Computer)validationContext.ObjectInstance;

            if (computer.Motherboard.CpuSocket != computer.Processor.Socket)
            {
                return new ValidationResult("Processor is not compatible with the motherboard");
            }

            if (computer.MemoryModules.Any(m => m.Type != computer.Motherboard.MemoryType))
            {
                return new ValidationResult("At least one memory module is not compatible with the motherboard");
            }

            return ValidationResult.Success;
        }
    }
}
