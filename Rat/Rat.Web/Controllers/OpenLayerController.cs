using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Rat.Web.Controllers
{
    public class OpenLayerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
