using System;

namespace Lab4
{
	internal struct Student
	{
		public string Id;
		public string FullName;
		public double Math;
		public double Physics;
		public double Chemistry;
		public double Average;
	}

	internal class Program
	{
		private static void Main()
		{
			int n = ReadIntInRange("Nhap so HSSV (5 < n < 50): ", 6, 49);

			Student[] students = new Student[n];
			for (int i = 0; i < n; i++)
			{
				Console.WriteLine($"\nNhap thong tin HSSV thu {i + 1}:");
				students[i].Id = ReadString("Ma HSSV (<=10 ky tu): ", 10);
				students[i].FullName = ReadString("Ho va ten (<=30 ky tu): ", 30);
				students[i].Math = ReadDouble("Diem Toan: ");
				students[i].Physics = ReadDouble("Diem Ly: ");
				students[i].Chemistry = ReadDouble("Diem Hoa: ");
				students[i].Average = (students[i].Math + students[i].Physics + students[i].Chemistry) / 3.0;
			}

			Console.WriteLine("\nDanh sach lop:");
			PrintHeader();
			for (int i = 0; i < n; i++)
			{
				PrintStudent(students[i]);
			}

			Student maxAvg = students[0];
			Student minAvg = students[0];
			double sumAvg = 0.0;

			for (int i = 0; i < n; i++)
			{
				if (students[i].Average > maxAvg.Average)
				{
					maxAvg = students[i];
				}

				if (students[i].Average < minAvg.Average)
				{
					minAvg = students[i];
				}

				sumAvg += students[i].Average;
			}

			Console.WriteLine("\nHSSV co diem TBC lon nhat:");
			PrintHeader();
			PrintStudent(maxAvg);

			Console.WriteLine("\nHSSV co diem TBC nho nhat:");
			PrintHeader();
			PrintStudent(minAvg);

			double classAvg = sumAvg / n;
			Console.WriteLine($"\nDiem TBC cua ca lop: {classAvg:F2}");

			Console.WriteLine("\nDanh sach HSSV co diem TBC < 5:");
			PrintHeader();
			bool found = false;
			for (int i = 0; i < n; i++)
			{
				if (students[i].Average < 5.0)
				{
					PrintStudent(students[i]);
					found = true;
				}
			}

			if (!found)
			{
				Console.WriteLine("Khong co HSSV nao co diem TBC < 5.");
			}
		}

		private static int ReadIntInRange(string prompt, int min, int max)
		{
			while (true)
			{
				Console.Write(prompt);
				string input = Console.ReadLine();
				if (int.TryParse(input, out int value) && value >= min && value <= max)
				{
					return value;
				}
				Console.WriteLine("Gia tri khong hop le. Vui long nhap lai.");
			}
		}

		private static double ReadDouble(string prompt)
		{
			while (true)
			{
				Console.Write(prompt);
				string input = Console.ReadLine();
				if (double.TryParse(input, out double value))
				{
					return value;
				}
				Console.WriteLine("Gia tri khong hop le. Vui long nhap lai.");
			}
		}

		private static string ReadString(string prompt, int maxLen)
		{
			while (true)
			{
				Console.Write(prompt);
				string input = Console.ReadLine() ?? string.Empty;
				input = input.Trim();
				if (input.Length > 0 && input.Length <= maxLen)
				{
					return input;
				}
				Console.WriteLine("Chuoi khong hop le. Vui long nhap lai.");
			}
		}

		private static void PrintHeader()
		{
			Console.WriteLine("{0,-12}{1,-32}{2,8}{3,8}{4,8}{5,8}",
				"Ma", "Ho va ten", "Toan", "Ly", "Hoa", "TBC");
		}

		private static void PrintStudent(Student s)
		{
			Console.WriteLine("{0,-12}{1,-32}{2,8:F2}{3,8:F2}{4,8:F2}{5,8:F2}",
				s.Id, s.FullName, s.Math, s.Physics, s.Chemistry, s.Average);
		}
	}
}
