module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this matches your file structure
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"], // Add Urbanist font here
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "58px": "58px", // Adding the specific font size for title
        "18px": "18px", // Adding the specific font size for description
      },
    },
  },
  plugins: [],
};
