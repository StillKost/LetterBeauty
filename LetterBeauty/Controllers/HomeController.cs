using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LetterBeauty.Models;
using System.IO;
using System.Net.Mail;
using System.Net;

namespace LetterBeauty.Controllers
{
    public class HomeController : Controller
    {
        #region Views
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error(string exception)
        {
            ViewBag.Message = exception;
            return View();
        }

        public IActionResult Constructor()
        {
            return View();
        }

        public IActionResult SendLetter()
        {
            return View();
        }
        #endregion

        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////
        [HttpPost]
        [Route("home/sendletter")]
        public void SendLetter(string sendType, string letter, string adressFrom, string adressTo, string password)
        {
            try
            {
                if(sendType == "myAddress")
                {
                    MailAddress from = new MailAddress(adressFrom);
                    MailAddress to = new MailAddress(adressTo);
                    MailMessage m = new MailMessage(from, to);
                    // тема письма
                    m.Subject = "Hello!";
                    m.Body = letter;
                    m.IsBodyHtml = true;
                    SmtpClient smtp = new SmtpClient("SMTP.mail.RU", 25);
                    smtp.Credentials = new NetworkCredential(from.ToString(), password);
                    smtp.EnableSsl = true;
                    smtp.Send(m);
                }
                else
                {
                    adressFrom = "letter.beauty@inbox.ru";
                    password = "I_PErTkary38";
                    MailAddress from = new MailAddress(adressFrom);
                    MailAddress to = new MailAddress(adressTo);
                    MailMessage m = new MailMessage(from, to);
                    // тема письма
                    m.Subject = "Hello!";
                    m.Body = letter;
                    m.IsBodyHtml = true;
                    SmtpClient smtp = new SmtpClient("SMTP.mail.RU", 25);
                    smtp.Credentials = new NetworkCredential(from.ToString(), password);
                    smtp.EnableSsl = true;
                    smtp.Send(m);
                }
            }
            catch(Exception ex)
            {
                Error(ex.Message);
            }

        }

    }
}
