using System.Diagnostics;
using CallSystem.Models;
using Microsoft.AspNetCore.Mvc;


namespace CallSystem.Controllers
{
    public class CallsController : Controller
    {
        private readonly ILogger<CallsController> _logger;

        public CallsController(ILogger<CallsController> logger)
        {
            _logger = logger;
        }

        public IActionResult East()
        {
            return View();
        }

        public IActionResult West()
        {
            return View();
        }

     //   [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    
    }
}