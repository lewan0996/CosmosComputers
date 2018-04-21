using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public class Entity
    {
        [JsonProperty("id")]
        public string Id { get; set; }
    }
}
