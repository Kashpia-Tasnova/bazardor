
# 🛒 বাজার দর (BazarDor)

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a responsive web application that helps users explore essential product prices in Bangladesh. Users can browse products, filter products by category, view price information, and access protected product details after signing in. The application provides email/password authentication along with Google and GitHub social login.

## ✨ Key Features

- **📱 Responsive Design:** Works across mobile phones, tablets, laptops, and desktop screens.
- **🏠 Interactive Homepage:** Includes a hero banner, today's price increases and decreases, and a complete product collection.
- **🛍️ Dynamic Product Listing:** Fetches product and category data from the BazarDor API.
- **📂 Category Filtering:** Browse products by category with loading states and empty-state messages.
- **↕️ Product Sorting:** Sort products by default order, lowest price, or highest price, including correct numeric sorting.
- **📊 Product Details:** View product summaries, price information, and market-based price comparisons on protected detail pages.
- **🔐 Authentication:** Register and sign in using email and password, Google, or GitHub with Better Auth.
- **👤 Profile Management:** View profile information and update the user's name.
- **🔔 Toast Notifications:** Receive feedback for authentication, validation errors, and sign-out actions.
- **🚦 Custom 404 Pages:** Show friendly error pages for invalid routes and unavailable products or categories.
- **🦶 Informative Footer:** Include a project description and a notice explaining that prices may change with market conditions.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Building interactive user interfaces |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling and layout |
| Better Auth | Email/password and social authentication |
| MongoDB | Storing authentication-related data |
| Google OAuth | Google sign-in and registration |
| GitHub OAuth | GitHub sign-in and registration |
| Lucide React | Icons and interface elements |
| React Hot Toast | Success and error notifications |
| BazarDor REST API | Fetching product and category information |
| Git & GitHub | Version control and source code management |
| Vercel | Application deployment |

## 🌐 API Configuration

The application uses the BazarDor REST API to retrieve product and category data.

**Primary API:**
`https://api.api-store.workers.dev/api/bazardor`

**Alternative API:**
`https://api.abcz.workers.dev/api/bazardor`

### Available Endpoints

| Endpoint | Description |
|---|---|
| `/products` | Retrieve all products |
| `/products?category=chal` | Retrieve products filtered by category |
| `/products/1` | Retrieve a single product |
| `/categories` | Retrieve all categories |
| `/categories/chal` | Retrieve a single category |

The alternative API can be used if the primary API is unavailable.

## 🔐 Authentication

BazarDor uses Better Auth to manage user authentication.

Supported authentication methods:

- Email and password registration.
- Email and password sign-in.
- Google OAuth sign-in and registration.
- GitHub OAuth sign-in and registration.
- Sign-out and session management.
- Protected product detail pages.
- User profile information and name updates.

Successful registration redirects users to the sign-in page. Successful sign-in redirects users to the homepage. Unauthenticated users attempting to access protected product details are redirected to sign in.

**Security note:** OAuth credentials, database connection strings, and authentication secrets must be stored in environment variables and must never be committed to the repository.

## 📱 Main Pages and Routes

| Route | Description |
|---|---|
| `/` | Homepage with price ticker, hero banner, rising and falling prices, and all products |
| `/category/[slug]` | Category-specific product listing with sorting |
| `/product/[slug]` | Protected product detail page |
| `/signin` | User sign-in page |
| `/signup` | User registration page |
| `/profile` | User profile page |
| `/profile/update` | Update profile information |
| `/not-found` | Custom not-found page, where implemented |

Next.js also supports a global custom 404 page through `app/not-found.tsx`. Invalid dynamic routes should use the same friendly not-found experience.

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd bazardor
```

Replace `<your-github-repository-url>` with your actual GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add the required variables:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secure_authentication_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the placeholder values with your own credentials. Never commit `.env.local` to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🚀 Deployment

BazarDor can be deployed to Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure all required environment variables in the Vercel project settings.
4. Update `BETTER_AUTH_URL` to the deployed application's base URL.
5. Configure Google and GitHub OAuth callback URLs for the deployed domain.
6. Deploy the application and test all routes, authentication methods, product fetching, and page refreshes.

Make sure dynamic product and category routes work correctly after refreshing the page on the deployed website.

## 📱 Responsive Design

The interface is designed to adapt to different screen sizes:

- **Mobile:** Single-column or compact product layouts and usable navigation.
- **Tablet:** Flexible navigation and multi-column product grids.
- **Desktop:** Spacious content sections and three- or four-column product grids.

The layout uses responsive Tailwind CSS utilities to maintain usability across devices.

## ⚠️ Price Disclaimer

All displayed prices are indicative and may change depending on market conditions, location, availability, and time. Prices shown by the application should not be considered guaranteed market prices.

## 👨‍💻 Project Information

**Project Name:** বাজার দর (BazarDor)

**Project Type:** Responsive web application

**Purpose:** To make essential product price information easier to explore.

**Built With:** Next.js, React, TypeScript, Tailwind CSS, Better Auth, MongoDB, and the BazarDor REST API.

---

