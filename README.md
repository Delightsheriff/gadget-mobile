# E-commerce Shop App

This is a full-stack mobile e-commerce application built with React Native (Expo) and Supabase. It provides a seamless shopping experience for users, from browsing products to placing orders.

## Features

*   **User Authentication:** Secure user sign-up and sign-in functionality using Supabase Auth.
*   **Product Browsing:** View a list of products with details, including images and prices.
*   **Categorization:** Products are organized into categories for easy navigation.
*   **Shopping Cart:** Add and manage products in a shopping cart.
*   **Order Placement:** A streamlined checkout process to place orders.
*   **Payment Integration:** Secure payments handled by Stripe.
*   **Order History:** Users can view their past orders and their statuses.
*   **Push Notifications:** Users receive notifications about their orders.

## Tech Stack

### Frontend

*   **React Native:** A framework for building native apps using React.
*   **Expo:** A platform for making universal React applications.
*   **Expo Router:** File-based routing for React Native apps.
*   **TypeScript:** A typed superset of JavaScript.
*   **TanStack Query (React Query):** For data fetching, caching, and state management.
*   **Zustand:** A small, fast, and scalable state-management solution.
*   **Stripe React Native SDK:** For handling payments with Stripe.

### Backend

*   **Supabase:** An open-source Firebase alternative.
    *   **PostgreSQL:** For the database.
    *   **Supabase Auth:** For user authentication.
    *   **Supabase Edge Functions:** For server-side logic (e.g., Stripe integration).
    *   **Supabase Storage:** For storing product images.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js and npm (or yarn)
*   Expo CLI
*   Supabase account and CLI

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following environment variables. You can rename the `.env.example` file to `.env` and fill in the values.

    You will need to create a new project on [Supabase](https://supabase.com/) to get these values.

    ```
    EXPO_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    EXPO_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY="YOUR_STRIPE_PUBLISHABLE_KEY"
    ```

    You also need to set up the environment variables for the Supabase functions. You can do this in the Supabase project dashboard or by using the Supabase CLI.

    ```
    STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
    STRIPE_PUBLISHABLE_KEY="YOUR_STRIPE_PUBLISHABLE_KEY"
    ```

4.  **Set up the database:**

    The database schema is defined in the `supabase/migrations` directory. You can apply these migrations to your Supabase project using the Supabase CLI.

    ```bash
    supabase login
    supabase link --project-ref <your-project-ref>
    supabase db push
    ```

5.  **Run the application:**

    ```bash
    expo start
    ```

    This will start the Metro bundler. You can then run the app on an Android emulator, iOS simulator, or on your physical device using the Expo Go app.
