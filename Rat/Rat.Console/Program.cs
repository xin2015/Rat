using Rat.Core.InterpolationMethod;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.Json.Serialization;

namespace Rat.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            //string[] filePaths = Directory.GetFiles("D:\\1006");
            //foreach (string filePath in filePaths)
            //{
            //    if (filePath.Contains(".txt"))
            //    {
            //        string jsonFilePath = filePath.Replace(".txt", ".json");
            //        if (!filePaths.Contains(jsonFilePath))
            //        {
            //            Parse(filePath);
            //        }
            //    }
            //}

            //Random rand = new Random();
            //string fileName = string.Format("{0}.txt", DateTime.Now.ToString("yyyyMMddHHmmssfff"));
            //string[] texts = new string[14];
            //for (var i = 1; i <= 14; i++)
            //{
            //    string text = (450000 + i).ToString();
            //    for (var j = 0; j < 9; j++)
            //    {
            //        text += " " + rand.NextDouble().ToString("F1");
            //    }
            //    texts[i - 1] = text;
            //}
            //File.WriteAllLines(fileName, texts);

            DrawImageTest(100);
            DrawImageTest(300);
            DrawImageTest(500);
            DrawImageTest(1000);
            DrawImageTest(1500);

            System.Console.ReadLine();
        }

        /// <summary>
        /// 直接相乘VS幂函数（直接相乘节约60%左右的时间）
        /// </summary>
        static void MultiplyVSPow()
        {
            Random rand = new Random();
            int n = (int)Math.Pow(10, 8);
            double r, s;
            Stopwatch sw = new Stopwatch();
            sw.Start();
            for (int i = 0; i < n; i++)
            {
                s = Math.Pow(rand.NextDouble(), 2);
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                r = rand.NextDouble();
                s = r * r;
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                s = Math.Pow(rand.NextDouble(), 2);
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                r = rand.NextDouble();
                s = r * r;
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                s = Math.Pow(rand.NextDouble(), 2);
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                r = rand.NextDouble();
                s = r * r;
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            System.Console.ReadLine();
        }

        /// <summary>
        /// 直接相除VS幂函数（直接相除节约60%左右的时间）
        /// </summary>
        static void DivideVSPow()
        {
            Random rand = new Random();
            int n = (int)Math.Pow(10, 8);
            double s;
            Stopwatch sw = new Stopwatch();
            sw.Start();
            for (int i = 0; i < n; i++)
            {
                s = Math.Pow(rand.NextDouble(), -1);
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                s = 1 / rand.NextDouble();
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                s = Math.Pow(rand.NextDouble(), -1);
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                s = 1 / rand.NextDouble();
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                s = Math.Pow(rand.NextDouble(), -1);
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < n; i++)
            {
                s = 1 / rand.NextDouble();
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            System.Console.ReadLine();
        }

        /// <summary>
        /// 直接调用VS委托调用（影响不大）
        /// </summary>
        static void DirectlyVSFunction()
        {
            Random rand = new Random();
            int n = 500;
            double[] X = new double[n], Y = new double[n], T = new double[n];
            for (int i = 0; i < n; i++)
            {
                X[i] = rand.NextDouble() * 180;
                Y[i] = rand.NextDouble() * 90;
                T[i] = rand.Next(300);
            }
            IDWC idwc = new IDWC(X, Y, T);
            double t;
            Func<double, double, double> func = idwc.Predict;
            Stopwatch sw = new Stopwatch();
            sw.Start();
            for (int i = 0; i < 720; i++)
            {
                double x = rand.NextDouble() * 180;
                for (int j = 0; j < 360; j++)
                {
                    double y = rand.NextDouble() * 90;
                    t = idwc.Predict(x, y);
                }
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < 720; i++)
            {
                double x = rand.NextDouble() * 180;
                for (int j = 0; j < 360; j++)
                {
                    double y = rand.NextDouble() * 90;
                    t = func(x, y);
                }
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < 720; i++)
            {
                double x = rand.NextDouble() * 180;
                for (int j = 0; j < 360; j++)
                {
                    double y = rand.NextDouble() * 90;
                    t = idwc.Predict(x, y);
                }
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < 720; i++)
            {
                double x = rand.NextDouble() * 180;
                for (int j = 0; j < 360; j++)
                {
                    double y = rand.NextDouble() * 90;
                    t = func(x, y);
                }
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < 720; i++)
            {
                double x = rand.NextDouble() * 180;
                for (int j = 0; j < 360; j++)
                {
                    double y = rand.NextDouble() * 90;
                    t = idwc.Predict(x, y);
                }
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            sw.Restart();
            for (int i = 0; i < 720; i++)
            {
                double x = rand.NextDouble() * 180;
                for (int j = 0; j < 360; j++)
                {
                    double y = rand.NextDouble() * 90;
                    t = func(x, y);
                }
            }
            sw.Stop();
            System.Console.WriteLine(sw.Elapsed);
            System.Console.ReadLine();
        }

        static void DrawImageTest(int n)
        {
            Random rand = new Random();
            double[] X = new double[n], Y = new double[n], T = new double[n];
            for (int i = 0; i < n; i++)
            {
                X[i] = rand.NextDouble() * 180;
                Y[i] = rand.NextDouble() * 90;
                T[i] = rand.Next(300);
            }
            IDWC idwc = new IDWC(X, Y, T);
            idwc.CalculateD();
            int width = 720, height = 360;
            double lon, lat;
            double t;
            Bitmap bitmap;
            Color[] colors = new Color[] { Color.FromArgb(0, 228, 0), Color.FromArgb(255, 255, 0), Color.FromArgb(255, 126, 0), Color.FromArgb(255, 0, 0), Color.FromArgb(153, 0, 76), Color.FromArgb(126, 0, 35) };
            Stopwatch sw = new Stopwatch();
            sw.Start();
            for (int a = 0; a < 3; a++)
            {
                sw.Restart();
                bitmap = new Bitmap(width, height);
                for (int i = 0; i < width; i++)
                {
                    lon = i * 0.25;
                    for (int j = 0; j < height; j++)
                    {
                        lat = j * 0.25;
                        t = Math.Round(idwc.Predict(lon, lat));
                        bitmap.SetPixel(i, j, colors[GetIndex(t)]);
                        //int v = (int)t;
                        //bitmap.SetPixel(i, j, Color.FromArgb(v / 256 / 256, v / 256 % 256, v % 256));
                    }
                }
                bitmap.Save(DateTime.Now.ToString("yyyyMMddHHmmssfff") + ".png");
                bitmap.Dispose();
                sw.Stop();
                System.Console.WriteLine(sw.Elapsed);

                sw.Restart();
                bitmap = new Bitmap(width, height);
                for (int i = 0; i < width; i++)
                {
                    lon = i * 0.25;
                    for (int j = 0; j < height; j++)
                    {
                        lat = j * 0.25;
                        t = Math.Round(idwc.PredictFixedSearchRadius(lon, lat));
                        bitmap.SetPixel(i, j, colors[GetIndex(t)]);
                        //int v = (int)t;
                        //bitmap.SetPixel(i, j, Color.FromArgb(v / 256 / 256, v / 256 % 256, v % 256));
                    }
                }
                bitmap.Save(DateTime.Now.ToString("yyyyMMddHHmmssfff") + ".png");
                bitmap.Dispose();
                sw.Stop();
                System.Console.WriteLine(sw.Elapsed);
            }
            System.Console.ReadLine();
        }

        static int GetIndex(double t)
        {
            return (int)Math.Floor(t / 50);
        }


        static void Parse(string path)
        {
            string[] lines = File.ReadAllLines(path);
            Dictionary<string, double>[] data = new Dictionary<string, double>[lines.Length];
            for (int i = 0; i < lines.Length; i++)
            {
                string[] texts = lines[i].Split(' ').Where(o => !string.IsNullOrWhiteSpace(o)).ToArray();
                Dictionary<string, double> dic = new Dictionary<string, double>();
                dic["lon"] = double.Parse(texts[0]);
                dic["lat"] = double.Parse(texts[1]);
                dic["value"] = double.Parse(texts[2]);
                data[i] = dic;
            }
            string jsonStr = System.Text.Json.JsonSerializer.Serialize<Dictionary<string, double>[]>(data);
            File.WriteAllText(path.Replace(".txt", ".json"), jsonStr);
        }
    }
}
