/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        skin: {
          background: withOpacity('--color-background'),
          foreground: withOpacity('--color-foreground'),
          primary: withOpacity('--color-primary'),
          "primary-foreground": withOpacity('--color-primary-foreground'),
        },
      },
      textColor: {
        skin: {
          foreground: withOpacity('--color-foreground'),
          "primary-foreground": withOpacity('--color-primary-foreground'),
        },
      },
      backgroundColor: {
        skin: {
          background: withOpacity('--color-background'),
          primary: withOpacity('--color-primary'),
        },
      },
    },
  },
  plugins: [],
};
