using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CreateBlogDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;
}