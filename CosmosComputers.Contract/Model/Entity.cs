using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public abstract class Entity
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("discriminator")]
        public virtual string Discriminator => GetType().Name;
        [Required]
        public float Price { get; set; }
    }
}
