# React + Vite Portfolio App

This is a modern portfolio website built with React and Vite, featuring a responsive design with Tailwind CSS, animations with Framer Motion, and backend integration with Supabase.

## Features

- Responsive design
- Admin panel for content management
- GitHub integration for projects
- Certifications display
- Contact form
- Dark/light theme toggle

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GITHUB_USERNAME=your_github_username
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

This is a static site that can be deployed to any static hosting service.

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Vercel will automatically detect it as a Vite app and build it

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to Netlify's deploy page
3. Or connect your GitHub repo and set build command to `npm run build` and publish directory to `dist`

### Other Platforms

- GitHub Pages: Use `gh-pages` package
- Firebase Hosting: `firebase deploy`
- Any static server

### Environment Variables

For production, set the environment variables in your hosting platform's dashboard.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
