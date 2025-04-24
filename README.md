# Welcome to Lexin's Web App!
This project makes use of React Router 7, DataVysta CLI, Client, and React components, and Mantine UI components.

This project expects a .ENV file to be in the root of the project folder. Here is a sample of that file:

```
node_env="development"

VITE_REACT_APP_VYSTA_API_KEY="<Your Vysta API Key"
VITE_REACT_APP_VYSTA_BASE_URL="https://slipstreamdev.datavysta.com"
VITE_REACT_APP_VYSTA_API_URL="https://slipstreamdev.datavysta.com/api/rest"
VITE_REACT_APP_VYSTA_USERNAME="Your Vysta Username"
VITE_REACT_APP_VYSTA_PASSWORD="<Your Vysta Password"
```


## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

This template includes three Dockerfiles optimized for different package managers:

- `Dockerfile` - for npm
- `Dockerfile.pnpm` - for pnpm
- `Dockerfile.bun` - for bun

To build and run using Docker:

```bash
# For npm
docker build -t my-app .

# For pnpm
docker build -f Dockerfile.pnpm -t my-app .

# For bun
docker build -f Dockerfile.bun -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

Layout and styling should be done with Mantine components and using component properties for styling where possible.
Other styling should be done with inline styles. Though Tailwind CSS is enabled, using it should be avoided whenever possible.

---

Built with ❤️ using React Router.
