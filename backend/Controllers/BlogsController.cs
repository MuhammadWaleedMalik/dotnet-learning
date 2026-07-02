using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BlogsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
    {
        var blogs = await _context.Blogs.ToListAsync();

        return Ok(blogs);
    }
    [HttpGet("single/{id}")]
public async Task<ActionResult<Blog>> GetBlog(int id)
{
    var blog = await _context.Blogs.FindAsync(id);

    if (blog == null)
    {
        return NotFound();
    }

    return Ok(blog);
}
    [HttpPost]
    public async Task<ActionResult<Blog>> CreateBlog(CreateBlogDto dto)
    {
        var blog = new Blog
        {
            Title = dto.Title,
            Content = dto.Content
        };

        _context.Blogs.Add(blog);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBlogs), new { id = blog.Id }, blog);
    }
}