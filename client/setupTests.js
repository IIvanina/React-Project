import '@testing-library/jest-dom';

// Mock `import.meta.env` for Vite
globalThis.import = {
  meta: {
    env: {
      VITE_API_URL: 'http://localhost:3000',
    },
  },
};

// Optionally, mock other global variables or APIs if needed
