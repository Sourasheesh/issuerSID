/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // Include all Next.js app dir files
    "./pages/**/*.{js,ts,jsx,tsx}",    // Include pages directory (if using)
    "./components/**/*.{js,ts,jsx,tsx}", // Include components
  ],
  theme: {
    extend: {
      colors: {
        // Example custom colors (edit as needed)
        primary: "#2563eb", // blue-600
        secondary: "#64748b", // slate-500
        accent: "#22c55e", // green-500
      },
      fontFamily: {
        // Example using Inter or other custom fonts
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        // Add extra rounded options if needed
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        // Example soft card shadow
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
