# Personal Portfolio

A modern personal portfolio website built with Next.js, Tailwind CSS, and TypeScript.

## Features

- Interactive 3D wireframe background
- Responsive design for all devices
- Dark mode theme
- Timeline-based education and experience section
- Tools and skills grid
- Music and project showcase
- Contact form

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/personal-portfolio.git
cd personal-portfolio
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### GitHub Pages

1. Update the `next.config.ts` file with your repository name:
```js
basePath: process.env.NODE_ENV === 'production' ? '/personal-portfolio' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-portfolio/' : '',
```

2. Push your code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

3. The GitHub Actions workflow will automatically build and deploy your site when you push to the main branch.

### Manual Deployment

1. Build the static site:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## License

This project is licensed under the MIT License - see the LICENSE file for details.
