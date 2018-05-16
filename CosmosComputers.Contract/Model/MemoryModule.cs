﻿using System.ComponentModel.DataAnnotations;
using CosmosComputers.Contract.Enums;
using Newtonsoft.Json;

namespace CosmosComputers.Contract.Model
{
    public class MemoryModule : Entity
    {
        [Required]
        public string Producer { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public int MemoryAmount { get; set; }
        [Required]
        [JsonProperty("type")]
        public MemoryType Type { get; set; }
    }
}
