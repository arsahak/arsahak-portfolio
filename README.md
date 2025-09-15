# AR Sahak Portfolio

[![Live Website](https://img.shields.io/badge/Live-Website-blue)](https://www.arsahak.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/arsahak/arsahak-portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)](https://vercel.com/)

A modern, full-stack portfolio website built with Next.js 14, featuring a dynamic blog system, portfolio showcase, and admin dashboard. Deployed at [www.arsahak.com](https://www.arsahak.com).

## 🌟 Features

### 🎨 Frontend

- **Modern Design**: Clean, responsive UI with Tailwind CSS
- **Interactive Animations**: Framer Motion animations and smooth transitions
- **Blog System**: Dynamic blog with categories, search, and pagination
- **Portfolio Showcase**: Project gallery with detailed case studies
- **Contact Forms**: Interactive contact and inquiry forms
- **SEO Optimized**: Meta tags, sitemap, and robots.txt

### 🔧 Admin Dashboard

- **Content Management**: Create, edit, and manage blog posts
- **Portfolio Management**: Add and update portfolio projects
- **Media Library**: Cloudinary integration for image management
- **Note System**: Personal note-taking system
- **Category Management**: Organize content with categories

### 🚀 Technical Stack

- **Framework**: Next.js 14 with App Router
- **Database**: MongoDB Atlas with Prisma ORM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Images**: Cloudinary integration
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **TypeScript**: Full type safety

## 🏗️ Architecture

```
arsahak-portfolio/
├── app/                    # Next.js 13+ app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Admin dashboard
│   ├── (website)/         # Public website pages
│   └── api/              # API routes
├── components/           # Reusable React components
├── lib/                 # Utility functions & database
├── prisma/              # Database schema
├── public/              # Static assets
└── config/              # App configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account (optional, for media management)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/arsahak/arsahak-portfolio.git
   cd arsahak-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"

   # Cloudinary (optional)
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"

   # NextAuth (if using authentication)
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_secret_key"
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

### Pages

- **Homepage** (`/`): Hero section, skills, portfolio preview
- **About** (`/about`): Professional background and experience
- **Portfolio** (`/portfolio`): Project showcase with case studies
- **Blog** (`/blog`): Technical articles and insights
- **Contact** (`/contact`): Contact form and information

### API Routes

- `/api/blog` - Blog CRUD operations
- `/api/portfolio` - Portfolio management
- `/api/media` - Media file management
- `/api/note` - Note-taking system
- `/api/health` - Health check endpoint

### Database Schema

- **Blog**: Articles with categories, tags, and metadata
- **Portfolio**: Project details with images and technologies
- **Media**: File metadata for Cloudinary integration
- **Note**: Personal note management
- **User**: Authentication and user management

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:generate  # Generate Prisma client
```

### Code Style

- **ESLint**: Configured for Next.js and React
- **Prettier**: Code formatting
- **TypeScript**: Type safety where applicable

## 🚀 Deployment

The application is deployed on [Vercel](https://vercel.com/) at [www.arsahak.com](https://www.arsahak.com).

### Deploy Your Own

1. **Fork this repository**
2. **Connect to Vercel**
3. **Set environment variables** in Vercel dashboard
4. **Deploy automatically** on every push to main branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/arsahak/arsahak-portfolio)

## 🔧 Configuration

### Database

- Uses MongoDB Atlas with Prisma ORM
- Optimized for serverless deployment
- Direct MongoDB connections for better performance

### Performance

- Image optimization with Next.js Image component
- Cloudinary integration for media management
- Static generation where possible
- API route optimization for Vercel

## 📱 Features in Detail

### Blog System

- **Rich Text Editor**: TinyMCE integration
- **Categories & Tags**: Organize content
- **Search & Filter**: Find articles easily
- **SEO Optimization**: Meta descriptions and structured data

### Portfolio Showcase

- **Project Details**: Comprehensive case studies
- **Technology Stack**: Display used technologies
- **Live Demos**: Links to live projects
- **GitHub Integration**: Source code links

### Admin Dashboard

- **Content Management**: Full CRUD operations
- **Media Library**: Image upload and management
- **Analytics**: Track content performance
- **User Management**: Role-based access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**AR Sahak**

- Website: [www.arsahak.com](https://www.arsahak.com)
- GitHub: [@arsahak](https://github.com/arsahak)
- LinkedIn: [AR Sahak](https://linkedin.com/in/arsahak)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Prisma](https://prisma.io/) - Database toolkit
- [Cloudinary](https://cloudinary.com/) - Media management
- [Vercel](https://vercel.com/) - Deployment platform

---

⭐ **Star this repository if you found it helpful!**
