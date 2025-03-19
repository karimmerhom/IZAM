# Frontend Navigation Customization Task

## Overview
This project is a React/Next.js application where users can customize a navigation menu by reordering, renaming, and toggling the visibility of navigation items. The changes made to the navigation structure are tracked and stored locally.

## Features
- User-customizable navigation bar.
- Drag-and-drop functionality for reordering nav items.
- Responsive design with mobile-friendly navigation.
- Edit mode toggling for modifying nav items.
- Saves updated navigation state locally.

## Tech Stack
- **React.js / Next.js** 
- **React-DnD** for drag-and-drop functionality
- **MUI (Material UI)** for styling 
- **CSS Framework (Bootstrap, Tailwind, or SCSS)** for layout structure

## Getting Started

### Prerequisites
- Node.js installed (v16+ recommended)
- npm or yarn package manager

### Installation
1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Configuration
This project supports switching between local and deployed environments using environment variables. 

NEXT_PUBLIC_API_BASE_URL=http://localhost:8081  # Local environment
NEXT_PUBLIC_API_BASE_URL=https://production-api.inplace-eg.com  #  deployed environment
```
Modify this variable as needed to switch between environments.

### Running the Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.




