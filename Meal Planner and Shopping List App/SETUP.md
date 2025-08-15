# Setting Up Your React Project

This document provides instructions on how to set up a runnable React project for your Meal Planner application. The current codebase is a collection of React components and files, but it's missing a project structure with the necessary dependencies and build tools.

We will use **Vite** to create a new React project. Vite is a modern and fast build tool that is easy to set up and use.

## Step 1: Create a New Vite Project

First, you need to create a new React project using Vite. Open your terminal and run the following command:

```bash
npm create vite@latest my-meal-planner -- --template react-ts
```

This will create a new directory called `my-meal-planner` with a new React and TypeScript project.

## Step 2: Move Your Existing Files

Next, you need to move your existing files into the new project's `src` directory.

1.  **Delete the contents of the `src` directory** in your new `my-meal-planner` project.
2.  **Copy the following files and directories** from your `Meal Planner and Shopping List App` directory into the `my-meal-planner/src` directory:
    *   `App.tsx`
    *   `components/`
    *   `styles/`
    *   `mealData.ts`
    *   `shoppingListData.ts`
    *   `compliments.ts`
    *   `types.ts`

Your `my-meal-planner/src` directory should now look like this:

```
my-meal-planner/src/
├── App.tsx
├── components/
│   ├── custom/
│   │   ├── ChatBubble.tsx
│   │   ├── GroceryListTab.tsx
│   │   ├── Header.tsx
│   │   ├── MealPlanTab.tsx
│   │   └── RecipeTab.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       ├── ... (all your shadcn/ui components)
├── styles/
│   └── globals.css
├── mealData.ts
├── shoppingListData.ts
├── compliments.ts
└── types.ts
```

## Step 3: Install Dependencies

Now you need to install the dependencies that are used in your application. Open your terminal in the `my-meal-planner` directory and run the following commands:

```bash
npm install
npm install lucide-react class-variance-authority clsx tailwind-merge
```

These commands will install the necessary libraries for the UI components and icons.

## Step 4: Configure Tailwind CSS

Your project uses Tailwind CSS for styling. You need to configure it in your new Vite project.

1.  **Install Tailwind CSS:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

2.  **Configure your `tailwind.config.js`:** Replace the content of `tailwind.config.js` with the following:

    ```javascript
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

3.  **Update your `globals.css`:** Your `globals.css` file uses `@apply` which is a Tailwind CSS feature. You need to make sure it's being processed correctly. Your current `globals.css` looks fine, but you need to import it in your main `main.tsx` file.

4.  **Update `src/main.tsx`:** Replace the content of `src/main.tsx` with the following:

    ```typescript
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.tsx'
    import './styles/globals.css'

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
    ```

## Step 5: Handle Figma Assets

Your code uses a non-standard import syntax for Figma assets (`figma:asset/...`). This will not work with a standard Vite setup. You have two options to fix this:

**Option 1: Replace with Placeholder Images (Recommended)**

For now, the easiest solution is to replace the Figma assets with placeholder images. You can find placeholder image services online (e.g., [https://placeholder.com/](https://placeholder.com/)).

1.  **Update `components/figma/ImageWithFallback.tsx`:** Modify this component to use a standard `<img>` tag and pass a URL to it.
2.  **Update `components/custom/Header.tsx` and `components/custom/ChatBubble.tsx`:** Replace the `figma:asset` imports with URLs to placeholder images.

**Option 2: Export Assets from Figma**

If you have access to the original Figma file, you can export the assets as PNG or SVG files and include them in your project.

1.  **Export the assets** from Figma.
2.  **Place them in the `src/assets` directory** in your Vite project.
3.  **Update the import statements** in your components to point to the new asset files.

## Step 6: Run Your Application

You are now ready to run your application! In your terminal, in the `my-meal-planner` directory, run:

```bash
npm run dev
```

This will start the Vite development server, and you can view your application in your browser at the URL provided in the terminal (usually `http://localhost:5173`).

By following these steps, you will have a fully runnable React project that you can continue to develop and improve.
