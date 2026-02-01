# HRFA.MA - Moroccan Artisans Marketplace 🇲🇦

HRFA.MA (Herfa) is a premium digital marketplace connecting skilled Moroccan artisans with clients seeking professional home services. The platform is built with modern technologies to ensure a fast, secure, and user-friendly experience.

## ✨ Features

- **Authentication & Roles**: Secure login for Clients, Artisans, and Admins using NextAuth.js.
- **Service Booking**: Easy multi-step booking flow for plumbing, electricity, carpentry, and more.
- **Micro-Dashboards**:
  - **Artisans**: Manage orders, view earnings, and update portfolios.
  - **Clients**: Track booking status and history.
  - **Admin**: Verify artisans and manage platform categories.
- **Search & Discovery**: Advanced filtering by city and trade.
- **Localization**: Full RTL support for Arabic (Darija) users.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io)
- **Authentication**: [NextAuth.js v5](https://authjs.dev)

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mohaaitbensaid-coder/hrfa.mab.git
    cd hrfa.mab
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file based on `.env.example` and add your database/auth secrets.

4.  **Run the development server**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📄 License

This project is proprietary property of HRFA.MA.
