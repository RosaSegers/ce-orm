using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AlumniSignup.Data;
using AlumniSignup.Model;
using AlumniSignup.Services;

namespace AlumniSignup.Controllers
{
    [Route("api/rsvp")]
    public class AlumniController : Controller
    {
        private readonly DatabaseContext _context;
        private readonly MailService _mailService;

        public AlumniController(DatabaseContext context, MailService mailService)
        {
            _context = context;
            _mailService = mailService;
        }

        [HttpGet("")]
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.Alumni.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Index([FromRoute] int id)
        {
            return Ok(await _context.Alumni.SingleOrDefaultAsync(x => x.Id == id));
        }

        [HttpPost("")]
        public async Task<IActionResult> Create([FromBody] Alumni alumni)
        {
            if (ModelState.IsValid)
            {
                NormalizeDateTimesToUtc(alumni);

                _context.Add(alumni);
                await _context.SaveChangesAsync();

                _mailService.SendEmail(alumni.Email, alumni.Name, alumni.Id);

                return RedirectToAction(nameof(Index));
            }
            return BadRequest(ModelState);
        }

        [HttpPut("")]
        public async Task<IActionResult> Edit(int id, [FromBody] Alumni alumni)
        {
            if (id != alumni.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    NormalizeDateTimesToUtc(alumni);

                    _context.Update(alumni);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AlumniExists(alumni.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var alumni = await _context.Alumni.FindAsync(id);
            if (alumni != null)
            {
                _context.Alumni.Remove(alumni);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        private bool AlumniExists(int id)
        {
            return _context.Alumni.Any(e => e.Id == id);
        }

        private void NormalizeDateTimesToUtc(Alumni alumni)
        {
            if (alumni.SignupDate.Kind != DateTimeKind.Utc)
            {
                alumni.SignupDate = alumni.SignupDate.ToUniversalTime();
            }
        }
    }
}
