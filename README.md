# FIPE Query

A modern React application for querying vehicle prices from Brazil's FIPE table. Built with TypeScript, Vite, and a clean, responsive design that provides instant access to official vehicle valuations.

## Requirements

- Node.js 18.0 or higher
- npm 9.0 or higher
- Modern web browser with ES2020 support

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/fipc-react.git
cd fipc-react
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Basic Vehicle Query

1. Select your vehicle type (Cars, Motorcycles, or Trucks)
2. Choose the brand from the dropdown menu
3. Select the specific model
4. Pick the manufacturing year
5. Click "Search" to get the current FIPE value

### Authentication Features

The application includes a complete authentication system:

```typescript
// Login example
const { login, isAuthenticated } = useAuthStore();
await login({ email: 'user@example.com', password: 'password' });
```

### Building for Production

```bash
npm run build
npm run preview
```

### Running Tests

```bash
npm test
npm run test:coverage
```

## Related Projects

- [FIPE API](https://deividfortuna.github.io/fipe/) - Official FIPE table API
- [React Query](https://tanstack.com/query) - For advanced data fetching patterns
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

This project stands out by providing a modern, TypeScript-first approach with comprehensive authentication and a responsive design system.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style conventions and includes appropriate tests.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

Built with ❤️ for the Brazilian automotive community.
