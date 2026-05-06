# 🏢 Lumiere Stay - Premium Real Estate Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white" alt=".NET" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white" alt="SQL Server" />
</p>

**Lumiere Stay** is a comprehensive, modern real estate management system designed to seamlessly connect property owners and renters. Built with a robust **ASP.NET Core** backend and a dynamic **React/Vite** frontend, the platform provides an all-in-one ecosystem for property listing, secure digital rentals, community engagement, and administrative oversight.

---

## ✨ Key Features

### 👑 For Property Owners
- **Unit Management**: Fully manage property portfolios (rented or vacant units).
- **Advertisement Hub**: Create and publish high-quality advertisements for empty units to attract potential tenants.
- **Appointment Scheduling**: Provide and manage booking slots for prospective renters to tour advertised units.
- **Financial Tracking**: Monitor incoming rent payments and review detailed historical logs of past and current renters.
- **Private Community**: Communicate directly with tenants in dedicated community spaces through posts, comments, and reactions.
- **Property Transfer**: Seamlessly transfer unit ownership to other registered owners via administrative approval.

### 👥 For Renters
- **Discover Properties**: Browse active advertisements across all property owners to find the perfect home.
- **Digital Payments**: Pay rent easily and securely through the platform.
- **Community Engagement**: Connect with neighbors in the same compound or building area under the same property owner.
- **Review System**: Share experiences by adding reviews and ratings about the compounds or residential areas.

### 🤖 Smart Additions
- **AI-Powered Chatbot**: An integrated intelligent assistant to help users navigate the website, answer FAQs, and troubleshoot issues.
- **Admin Dashboard**: Comprehensive administrative controls for system moderation and ownership transfer approvals.

---

## 🛠️ Technology Stack

**Backend System (`BE-Project`)**
- Framework: **ASP.NET Core Web API (C#)**
- ORM: **Entity Framework Core**
- Database: **Microsoft SQL Server**
- Architecture: **Repository Pattern** with Dependency Injection

**Frontend System (`Frontend`)**
- Core: **React.js** (Bootstrapped with **Vite**)
- Styling: **Tailwind CSS / CSS Modules** (Customizable modern UI)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) (or newer)
- [Node.js](https://nodejs.org/) (v18+)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or LocalDB

### 1. Clone the Repository
```bash
git clone https://github.com/Babiboyy55/Lumiere-Stay.git
cd Lumiere-Stay
```

### 2. Backend Setup
```bash
cd BE-Project
# Open Lumiere.sln in Visual Studio or restore packages via CLI:
dotnet restore

# Update the connection string in `appsettings.json` to point to your local SQL Server instance.

# Run Entity Framework Migrations to set up the database
dotnet ef database update

# Start the API server
dotnet run
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd Frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

---

## 🤝 Contributing

We welcome contributions to **Lumiere Stay**! If you'd like to improve the platform:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request with a clear description of your enhancements.

---

*Transforming property management into a seamless, digital experience.*
