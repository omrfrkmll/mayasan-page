# MA-YA-SAN Website Project

This project is a multi-page website specifically designed for the metalworking industry, featuring a modern WordPress backend and a React frontend integration. It includes Apple-style scroll-driven video storytelling and modular e-commerce functionalities to enhance the user experience.

### Features:

*   **Modern Design & UX:** Minimalist, elegant, and user-friendly interface. Supports dark/light mode, rounded corners, hover animations, parallax effects, and smooth transitions. Incorporates noisy blur effects for visual depth and ambiance.
*   **Multi-Page Structure:** Includes Home, About Us, Services, Service Details, Blog, Products, Product Details, Cart, Checkout, Order Confirmation, User Profile, and Contact pages.
*   **Video Storytelling Module:** On the homepage, scroll-driven videos narrate metal processing techniques (Laser Cutting, Press Brake Bending, CNC Lathe, CNC Milling). Videos are vertically centered, with a slight darkening and noisy blur filters applied. Glassmorphism-style cards are positioned asynchronously over the videos. Videos transition with a right-to-left sliding effect.
*   **Animated Keyword Marquee:** A continuously scrolling animation strip at the bottom of the page, featuring metalworking-related keywords and glassmorphism-style icons.
*   **WooCommerce Integration:** Integration with WooCommerce REST API for retail product sales. Includes product listing, detail pages, cart, and checkout processes.
*   **Modular E-commerce Features:** General e-commerce features such as product search, filtering, user profiles, and order history can be easily enabled or disabled via the `src/config/features.js` file.
*   **Technology Stack:** React 18+, Typescript, React Router, Axios, Framer Motion (for animations), Tailwind CSS (for dynamic themes based on mode switcher style), Three.js (infrastructure for 3D models, currently replaced by video), GSAP (for complex animations).
*   **WordPress Integration:** WordPress is used solely for content management (CMS), with content fetched into the React application via WordPress REST API or WPGraphQL (optional).
*   **Responsive Design:** Seamless viewing and usability across all devices.
*   **Performance-Oriented:** Lazy loading and caching/optimization for API data calls.
*   **Clean Code:** Well-commented, understandable, clean, and standard-compliant code structure.

### Setup Instructions:

1.  **Requirements:** Node.js (v18+), pnpm (or npm/yarn), WordPress installation (with WooCommerce plugin active).

2.  **Project Setup:**

    ```bash
    # Navigate to the project directory
    cd mayasan-page
    # Install dependencies
    pnpm install
    ```

3.  **Environment Variables (`.env`):**

    Copy the `.env.example` file as `.env.production` for the production environment and update the following variables:

    ```env
    VITE_WORDPRESS_API_URL=https://example.com/wp-json/wp/v2
    VITE_WOOCOMMERCE_API_URL=https://example.com/wp-json/wc/v3
    VITE_WOOCOMMERCE_CONSUMER_KEY=ck_YOUR_CONSUMER_KEY
    VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_YOUR_CONSUMER_SECRET
    ```

    *   `VITE_WORDPRESS_API_URL`: Your WordPress site's REST API URL.
    *   `VITE_WOOCOMMERCE_API_URL`: WooCommerce REST API URL.
    *   `VITE_WOOCOMMERCE_CONSUMER_KEY` and `VITE_WOOCOMMERCE_CONSUMER_SECRET`: API keys obtained from WooCommerce settings. (Refer to `woocommerce_setup_guide.md`).

4.  **WordPress Backend Setup:**

    *   Ensure your WordPress installation and WooCommerce plugin are active.
    *   Enable the WooCommerce REST API and generate the Consumer Key and Consumer Secret to be used in the `.env` file above. (Refer to `woocommerce_setup_guide.md`).
    *   Create necessary pages (Services, Products, Blog, etc.) from the WordPress panel and enter their content.

5.  **Starting Development Server:**

    ```bash
    pnpm run dev
    ```

    Visit `http://localhost:5173/` in your browser.

6.  **Building for Production:**

    ```bash
    pnpm run build
    ```

    This command will create optimized production files in the `dist` folder.

### Deployment Guides:

Refer to `hosting_deployment_notes.md` for deployment steps on different hosting platforms.

### Modular Feature Configuration:

Refer to `FEATURES_CONFIGURATION.md` for enabling/disabling e-commerce and other modular features.

### Testing and Quality Control:

Refer to `TESTING.md` for manual and automated test scenarios.

### Logo and Icon Updates:

*   **Logo:** To activate the logo placeholder in the Header component, set the `showLogo` variable to `true` in `src/components/Header.jsx` and place your `public/logo.svg` (or desired format) file.
*   **Glassmorphism Icons:** You can download your preferred icons from `icons8.com/icons/all--style-liquid-glass` and place them in the `public/icons` folder, then update the icon imports in `VideoStorytellingModule.jsx` and `KeywordMarquee.jsx` files. Currently, Lucide React icons are used with a glassmorphism wrapper.