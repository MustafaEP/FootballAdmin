﻿using Microsoft.AspNetCore.Mvc;

namespace WebUI.Areas.Manager.Controllers
{
    [Area("Manager")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}