using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rat.Core.InterpolationMethod
{
    public class IDWC
    {
        public double[] X { get; set; }
        public double[] Y { get; set; }
        public double[] T { get; set; }
        double d;

        public IDWC(double[] x, double[] y, double[] t)
        {
            X = x;
            Y = y;
            T = t;
            d = 0.005;
        }

        public double Predict(double x, double y)
        {
            int length = T.Length;
            for (int i = 0; i < length; i++)
            {
                if (X[i] == x && Y[i] == y)
                {
                    return T[i];
                }
            }
            double asum = 0, sum = 0;
            double xi, yi, a;
            for (int i = 0; i < length; i++)
            {
                xi = X[i] - x;
                yi = Y[i] - y;
                a = 1 / (xi * xi + yi * yi);
                asum += a;
                sum += a * T[i];
            }
            return sum / asum;
        }

        public double PredictFixedSearchRadius(double x, double y)
        {
            int length = T.Length;
            for (int i = 0; i < length; i++)
            {
                if (X[i] == x && Y[i] == y)
                {
                    return T[i];
                }
            }
            double asum = 0, sum = 0;
            double xi, yi, a;
            for (int i = 0; i < length; i++)
            {
                xi = X[i] - x;
                yi = Y[i] - y;
                a = 1 / (xi * xi + yi * yi);
                if (a >= d)
                {
                    asum += a;
                    sum += a * T[i];
                }
            }
            return sum / asum;
        }

        public void CalculateD()
        {
            int length = T.Length;
            Random rand = new Random();
            double x = X[(int)Math.Floor(length * rand.NextDouble())], y = Y[(int)Math.Floor(length * rand.NextDouble())];
            double xi, yi;
            List<double> list = new List<double>();
            for (int i = 0; i < length; i++)
            {
                xi = X[i] - x;
                yi = Y[i] - y;
                list.Add(1 / (xi * xi + yi * yi));
            }
            list.Sort();
            d = list[(int)Math.Round(length * 0.9)];
            //d = list[length - 20];
        }
    }
}
