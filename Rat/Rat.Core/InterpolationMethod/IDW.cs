using System;
using System.Collections.Generic;
using System.Text;

namespace Rat.Core.InterpolationMethod
{
    public class IDW
    {
        public double[] X { get; set; }
        public double[] Y { get; set; }
        public double[] T { get; set; }
        public double P { get; set; }
        public double Radius { get; set; }

        public IDW(double[] x, double[] y, double[] t, double p, double radius)
        {
            X = x;
            Y = y;
            T = t;
            P = p;
            Radius = radius;
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
            double radius, a, xi, yi;
            if (Radius == 0)
            {
                for (int i = 0; i < length; i++)
                {
                    xi = X[i] - x;
                    yi = Y[i] - y;
                    radius = Math.Sqrt(xi * xi + yi * yi);
                    a = Math.Pow(radius, -P);
                    asum += a;
                    sum += a * T[i];
                }
            }
            else
            {
                for (int i = 0; i < length; i++)
                {
                    xi = X[i] - x;
                    yi = Y[i] - y;
                    radius = Math.Sqrt(xi * xi + yi * yi);
                    if (radius <= Radius)
                    {
                        a = Math.Pow(radius, -P);
                        asum += a;
                        sum += a * T[i];
                    }
                }
            }
            return sum / asum;
        }
    }
}
