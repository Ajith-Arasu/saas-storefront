Site URL: https://saas-storefront.vercel.app/login
username: admin@gmail.com
password: Admin@123

# E-Commerce Dashboard Application

This is a full-stack e-commerce dashboard application built with React, TypeScript, Material-UI (MUI), and a Node.js Express backend not integrated.  

---

## Features

- Responsive Navbar with:
  - Search input
  - Category filter dropdown
  - Shopping cart icon with badge count
  - Logout button

- Product listing with filtering and search
- Add to cart and view cart functionality
- User signup API with backend validation
- Backend API deployed as serverless functions on Vercel
- Axios instance with environment-configured base URL
- CORS enabled backend with support for credentials
- Form validation with React Hook Form and Yup

---

## Technologies

- **Frontend:** React, TypeScript, Material-UI (MUI), React Hook Form, Yup, Axios, CSS Modules
- **Deployment:** Vercel (frontend)
- **API Client:** Axios with instance configured from environment variables

---

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- Vercel account (for deployment)
- Git (for cloning repo)

---

### Setup Frontend

1. Clone the repository

```bash
git clone https://github.com/Ajith-Arasu/saas-storefront.git
cd your-frontend-folder

npm install
npm run dev