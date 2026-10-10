
# 🛒 বাজার দর (BazarDor)

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a responsive web application that helps users explore essential product prices in Bangladesh. Users can browse products, filter products by category, compare price information, and access protected product details after signing in. The application supports email/password authentication along with Google and GitHub social login.

## ✨ Key Features

- **📱 Responsive Design:** Works across mobile phones, tablets, laptops, and desktop screens.
- **🏠 Interactive Homepage:** Includes a hero banner, today's price increases and decreases, and a complete product collection.
- **🛍️ Dynamic Product Listing:** Fetches product and category data from the BazarDor REST API.
- **📂 Category Filtering:** Browse products by category with loading states and empty-state messages.
- **↕️ Product Sorting:** Sort products by default order, lowest price, or highest price using numeric price comparisons.
- **📊 Product Details:** View product summaries, price information, and market-based price comparisons on protected detail pages.
- **🔐 Authentication:** Register and sign in using email/password, Google, or GitHub with Better Auth.
- **👤 Profile Management:** View profile information and update the user's name.
- **🔔 Toast Notifications:** Receive feedback for authentication actions, validation errors, and sign-out.
- **🚦 Custom 404 Pages:** Show friendly error pages for invalid routes and unavailable products or categories.
- **🦶 Informative Footer:** Includes a project description and a notice explaining that prices may change with market conditions.

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

## 🌐 Live Website

**Production URL:** https://bazardor-ceu6.vercel.app

The application is deployed on Vercel. Updates pushed to the connected GitHub branch are automatically deployed when the Vercel Git integration is configured.

## 🌐 API Configuration

BazarDor uses the BazarDor REST API to retrieve product and category data.
**Primary API:**

https://openapi.programming-hero.com/api/bazardor

**Alternative API 1:**

https://api.abcz.workers.dev/api/bazardor

**Alternative API 2:**

https://api.api-store.workers.dev/api/bazardor

The alternative API can be used if the primary API is unavailable, provided it remains accessible and compatible with the application.

### Available Endpoints

| Endpoint | Description |
|---|---|
| `/products` | Retrieve all products |
| `/products?category=chal` | Retrieve products filtered by category |
| `/products/1` | Retrieve a single product |
| `/categories` | Retrieve all categories |
| `/categories/chal` | Retrieve a single category |

The application should use the endpoint paths and response format supported by the selected API.

## 🔐 Authentication

BazarDor uses Better Auth to manage user authentication and sessions.

Supported authentication features include:

- Email and password registration.
- Email and password sign-in.
- Google OAuth sign-in and registration.
- GitHub OAuth sign-in and registration.
- Sign-out and session management.
- Protected product detail pages.
- User profile information and name updates.

### Authentication Behavior

- Successful registration redirects users to the sign-in page.
- Successful sign-in redirects users to the homepage.
- Unauthenticated users attempting to access protected product details are redirected to sign in.
- Authentication actions and validation errors provide feedback through toast notifications.

### Environment and OAuth Configuration

The following environment variables are required for the application's authentication and database configuration:

- `MONGODB_URI`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

For production, configure `BETTER_AUTH_URL` as:

`https://bazardor-ceu6.vercel.app`

Configure the following production callback URLs in the corresponding OAuth applications:

**Google OAuth callback URL:**

`https://bazardor-ceu6.vercel.app/api/auth/callback/google`

**GitHub OAuth callback URL:**

`https://bazardor-ceu6.vercel.app/api/auth/callback/github`

Keep the appropriate localhost callback URLs configured for local development.

**Security note:** Never commit database connection strings, OAuth client secrets, authentication secrets, or other private credentials to the GitHub repository. Store them in `.env.local` for local development and in Vercel Environment Variables for deployment.

## 📱 Main Pages and Routes

| Route | Description |
|---|---|
| `/` | Homepage with hero banner, price information, rising and falling prices, and product collection |
| `/category/[slug]` | Category-specific product listing with sorting |
| `/product/[slug]` | Protected product detail page |
| `/signin` | User sign-in page |
| `/signup` | User registration page |
| `/profile` | User profile page |
| `/profile/update` | Update profile information |
| `/not-found` | Not-found route, if implemented |

Next.js also supports a global custom 404 page through `app/not-found.tsx`. Invalid dynamic routes should display a friendly not-found experience when implemented.

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Kashpia-Tasnova/bazardor.git
cd bazardor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root directory and add the required variables:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secure_authentication_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the placeholder values with your own credentials.

**Important:**
- Use your actual MongoDB connection string.
- Generate a strong, unique value for `BETTER_AUTH_SECRET`.
- Obtain the Google credentials from Google Cloud Console.
- Obtain the GitHub credentials from GitHub Developer Settings.
- Configure localhost callback URLs in the OAuth applications for local development.
- Never commit `.env.local` to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open the application in your browser:

http://localhost:3000

### 5. Build for Production

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🚀 Deployment

BazarDor is deployed on Vercel.

**Live Website:** https://bazardor-ceu6.vercel.app

### Deployment Steps

1. Push the project source code to GitHub.
2. Import the GitHub repository into Vercel.
3. Configure the required environment variables in Vercel Project Settings.
4. Set `BETTER_AUTH_URL` to `https://bazardor-ceu6.vercel.app` for the Production environment.
5. Configure the Google and GitHub OAuth applications with the correct production callback URLs.
6. Ensure the MongoDB database allows connections from the deployed application.
7. Deploy the application and test the main routes, product fetching, authentication, and protected pages.

### Automatic Deployment

When the GitHub repository is connected to Vercel, pushing changes to the configured production branch automatically triggers a deployment.

Vercel environment variable changes require a new deployment before they take effect.

After deployment, verify that:

- The homepage loads successfully.
- Product and category information is retrieved correctly.
- Category filtering and product sorting work as expected.
- Email/password registration and sign-in work.
- Google and GitHub authentication work.
- Protected product detail pages enforce authentication.
- Profile pages and profile updates work.
- Invalid routes display a friendly not-found page.

## 📱 Responsive Design

The interface is designed to adapt to different screen sizes:

- **Mobile:** Single-column or compact product layouts and usable navigation.
- **Tablet:** Flexible navigation and multi-column product grids.
- **Desktop:** Spacious content sections and three- or four-column product grids.

Responsive Tailwind CSS utilities are used to maintain usability across devices.

## ⚠️ Price Disclaimer

All displayed prices are indicative and may change depending on market conditions, location, availability, and time. Prices shown by the application should not be considered guaranteed market prices.

## 👨‍💻 Project Information

- **Project Name:** বাজার দর (BazarDor)
- **Project Type:** Responsive web application
- **Purpose:** To make essential product price information easier to explore.
- **Frontend:** Next.js, React, TypeScript, and Tailwind CSS.
- **Authentication:** Better Auth with email/password, Google, and GitHub.
- **Database:** MongoDB.
- **Product Data:** BazarDor REST API.
- **Deployment:** Vercel.

---

