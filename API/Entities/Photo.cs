using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }

    // navigation properties
    public string MemberId { get; set; } = null!;
    [JsonIgnore]
    public Member Member { get; set; } = null!;
  
}
