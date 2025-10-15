# BookItNow Frontend

Frontend applications for BookItNow - Multi-tenant appointment management system built with Vue.js 3.

## 🏗️ Architecture

This monorepo contains:

- **web/** - Vue.js 3 web application
- **mobile/** - Vue.js 3 + Capacitor mobile app (iOS & Android)
- **shared/** - Shared components, services, and utilities

## 🚀 Features

- Modern Vue.js 3 with Composition API
- Responsive design with TailwindCSS
- State management with Pinia
- Internationalization (Spanish/English)
- Clerk authentication integration
- Mobile app with Capacitor
- Comprehensive testing setup

## 🛠️ Technology Stack

- Vue.js 3 (Composition API)
- Vite
- TailwindCSS
- Pinia (state management)
- Vue Router
- Vue I18n
- Capacitor (mobile)
- Vitest (testing)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/joel-izaguirre/bookitnow-frontend.git
   cd bookitnow-frontend
   ```

2. **Install dependencies**
   ```bash
   # Web app
   cd web
   npm install
   
   # Mobile app
   cd ../mobile
   npm install
   ```

3. **Run development server**
   ```bash
   # Web app
   cd web
   npm run dev
   
   # Mobile app
   cd mobile
   npm run dev
   ```

## 📱 Mobile Development

### Setup Capacitor

1. **Add platforms**
   ```bash
   cd mobile
   npx cap add ios
   npx cap add android
   ```

2. **Build and sync**
   ```bash
   npm run build
   npx cap sync
   ```

3. **Open in native IDEs**
   ```bash
   npx cap open ios
   npx cap open android
   ```

## 🧪 Testing

Run unit tests:
```bash
cd web
npm run test:unit
```

Run E2E tests:
```bash
cd web
npm run test:e2e
```

## 🌐 Internationalization

The application supports Spanish (default) and English:

- Translation files: `src/i18n/locales/`
- Language switching in user preferences
- Localized date/time formatting

## 🎨 UI Components

The application uses a design system with:

- TailwindCSS utility classes
- Custom component library
- Responsive design patterns
- Accessibility compliance (WCAG 2.1 AA)

## 🔐 Authentication

Authentication is handled by Clerk:

- JWT token management
- User session handling
- Protected routes
- Role-based UI rendering

## 📊 State Management

State is managed with Pinia stores:

- `authStore` - User authentication state
- `tenantStore` - Current tenant and business data
- `appointmentStore` - Appointment management
- `userStore` - User profile and preferences

## 🚀 Deployment

### Web Application
- Static site deployment (Vercel, Netlify, AWS S3)
- Environment variables configuration
- Build optimization

### Mobile Applications
- iOS App Store distribution
- Google Play Store distribution
- Code signing setup

## 📝 Environment Variables

Create `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
VITE_APP_NAME=BookItNow
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

