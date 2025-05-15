# Currency Converter

A modern, responsive currency converter web application built with Next.js, React, and TypeScript. This application allows users to convert between different currencies using real-time exchange rates from the Frankfurter API.

![Currency Converter App](https://taskin.studio/images/currency-converter-preview.png)

## Features

- 💱 Real-time currency conversion
- 🌓 Light and dark theme support
- 📱 Responsive design for all devices
- ⚡ Fast and efficient with Next.js and TurboPack
- 🔄 Bidirectional conversion (convert from and to any currency)
- 🔁 Currency swap functionality
- 🔄 Manual refresh of exchange rates
- 🌐 Offline detection

## Technologies Used

- **Frontend Framework**: Next.js 15.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI with Shadcn UI
- **State Management**: React Hooks + TanStack Query
- **API**: Frankfurter Exchange Rate API
- **Theming**: next-themes

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/currency-converter.git
   cd currency-converter
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:9002](http://localhost:9002) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router files
├── components/       # Reusable UI components
│   ├── ui/           # Basic UI components
│   └── ...           # Feature-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and libraries
└── types/            # TypeScript type definitions
```

## API Integration

This application uses the [Frankfurter API](https://www.frankfurter.app/) to fetch real-time currency exchange rates. The API provides:

- List of available currencies
- Latest exchange rates
- Historical exchange rates

## Deployment

This application can be deployed to platforms like Vercel or Netlify:

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Exchange rates provided by [Frankfurter API](https://www.frankfurter.app/)
- Designed and developed by [TaskIn Studio](https://taskin.studio)
