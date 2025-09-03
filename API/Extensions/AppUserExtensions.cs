using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;
namespace API.Extensions;

public static class AppUserExtensions
{
    public static UserDTo AsDto(this AppUser user, ITokenService tokenService)
    {
        var token = tokenService.CreateToken(user);
        return new UserDTo
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = token
        };
    }
}
