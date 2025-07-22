# Business Nexus - Investor & Entrepreneur Platform

A comprehensive networking platform that connects investors and entrepreneurs to facilitate business growth and funding opportunities.

## 🚀 Features

### For Investors
- **Profile Management**: Complete investor profiles with investment criteria, experience, and terms
- **Entrepreneur Discovery**: Browse and search for promising entrepreneurs and startups
- **Real-time Chat**: Direct messaging with entrepreneurs
- **Deal Tracking**: Monitor investment opportunities and conversations
- **Portfolio Management**: Track previous investments and deals

### For Entrepreneurs
- **Startup Profiles**: Showcase your business, funding needs, and pitch deck
- **Investor Matching**: Find investors that match your industry and funding requirements
- **Collaboration Requests**: Manage incoming investment inquiries
- **Pitch Presentation**: Present your business to potential investors
- **Funding Tracking**: Monitor funding progress and investor communications

### For Admins
- **User Management**: Oversee all registered users and their profiles
- **Content Moderation**: Review and manage user-generated content
- **Analytics Dashboard**: Monitor platform usage and success metrics
- **Contact Management**: Handle user inquiries and support requests
- **Verification System**: Verify user credentials and maintain platform integrity

### General Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes based on user preference
- **Real-time Chat**: Instant messaging between users
- **Search & Filtering**: Advanced search capabilities for finding the right connections
- **Professional UI**: Clean, modern interface with smooth animations
- **Security**: Secure authentication and data protection

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Custom JSON-based auth system
- **Data Storage**: JSON files (for demo purposes)
- **State Management**: React Context API
- **Icons**: Lucide React
- **Animations**: CSS animations and transitions

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd business-nexus
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

### Investor Account
- **Email**: investor@imeer.ai
- **Password**: investor

### Entrepreneur Account
- **Email**: entrepreneur@imeer.ai
- **Password**: entrepreneur

### Admin Account
- **Email**: admin@imeer.ai
- **Password**: Admin123

## 📁 Project Structure

\`\`\`
business-nexus/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboards
│   ├── admin/             # Admin panel
│   ├── profile/           # Profile management
│   ├── chat/              # Chat functionality
│   ├── docs/              # Documentation page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── footer.tsx        # Footer component
│   └── ...
├── contexts/             # React contexts
│   └── auth-context.tsx  # Authentication context
├── data/                 # JSON data files
│   ├── users.json        # User data
│   ├── chats.json        # Chat messages
│   ├── reviews.json      # User reviews
│   └── ...
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
\`\`\`

## 🌐 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

3. **Data Handling**
   Since this demo uses JSON files for data storage, the data will be read-only in production. For a production deployment, consider:
   - Using a database (PostgreSQL, MongoDB, etc.)
   - Implementing proper API endpoints
   - Adding server-side authentication

## 🙏 Acknowledgments

- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Development**: Powered by [imeer.ai](https://imeer.ai)

## 📞 Support

For support, email support@businessnexus.com or join our community discussions.

---

**Built with ❤️ by the LAIBA RAFIQUE**
