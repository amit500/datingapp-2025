using System;

namespace API.DTOs;

public class LoginDTo
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}
