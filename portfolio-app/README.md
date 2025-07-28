# 3D Portfolio Theme Selector

This is a React application that allows you to choose from a variety of 3D themes and customize them in real-time. It's designed to be a starting point for a portfolio website with a dynamic 3D element.

## Features

*   **Theme Selection:** Choose from a list of pre-defined themes, including basic shapes and GLB models.
*   **Real-time Customization:** Adjust the color, scale, and rotation of the 3D models using a simple admin panel.
*   **Powered by React Three Fiber:** Built on top of the popular `react-three-fiber` library for creating 3D scenes in React.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the development server:**
    ```bash
    npm start
    ```
    This will open the application in your browser at `http://localhost:3000`.

## How to Add New Themes

1.  **Add your 3D model:** Place your GLB model in the `public` directory.
2.  **Create a new component:** Create a new React component for your model in the `src/components` directory. You can use the existing `Fox.js`, `Planet.js`, or `Flower.js` components as a template.
3.  **Add the theme to the list:** In `App.js`, add a new entry to the `themes` array with a unique `id`, a `name` for your theme, and the `model` name you've chosen.
4.  **Render the new component:** In `App.js`, add a new conditional rendering block to display your new component when its theme is selected.
