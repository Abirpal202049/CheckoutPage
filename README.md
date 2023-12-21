# Groww Checkout Page with Next.js and Zustand
## Overview
This project is a checkout page built using Next.js 14, leveraging the App Router for seamless navigation. It incorporates Tailwind CSS with dynamic styling to dynamically update theme colors fetched from an API. Additionally, the project utilizes the Tanstack Query library for local caching of API data, Zustand for state management, and React Hook Form for handling form input and validations. The React Credit Card Validation library is employed for credit card validation.

## Features
- Next.js 14 App Router: Utilize the latest version of Next.js for efficient page navigation and optimized performance.

- Tailwind CSS with Dynamic Styling: Leverage Tailwind CSS for a utility-first approach to styling, with dynamic theming capabilities. The theme colors are fetched from an API and injected into CSS variables.

- Tanstack Query (React Query): Implement local caching of API data for improved performance and a smoother user experience.

- Zustand for State Management: Utilize Zustand to manage state in a simple and efficient way, ensuring that components have access to the data they need.

- React Hook Form: Employ React Hook Form for managing form input and validations, streamlining the handling of user data.

- React Credit Card Validation: Integrate the React Credit Card Validation library to validate credit card information on the client side for a secure and user-friendly checkout experience.

## Challenge's faced during the
### Challenge 1: Integrating API in tailwind.config.js
The initial attempt to call the API directly within the tailwind.config.js file to dynamically set theme colors proved unsuccessful. A different approach was taken by creating a ThemeWrapper component around the global layout. Using vanilla JavaScript, the theme properties were set before rendering, resolving the integration issue.

### Challenge 2: Dynamic Logo Integration
Integrating a dynamic logo from an API posed a challenge due to asynchronous loading requirements. The solution involved creating a Component that asynchronously fetched the logo URL from the API and updated the source once the API call was successful. This approach ensured proper handling of dynamic logos in the checkout page.

## Getting Started
1. Clone the Repository:

```
git clone https://github.com/your-username/checkout-page.git
```

```
cd checkout-page
```

```
npm install
```

```
npm run dev
```
The application will be accessible at http://localhost:3000.

## Configuration
Adjust the API endpoints and other configuration parameters in the appropriate files to suit your specific requirements.

## Dependencies
- Next.js
- Tailwind CSS
- React Query
- Zustand
- React Hook Form
- React Credit Card Validation

