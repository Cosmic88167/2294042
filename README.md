# React URL Shortener Web App

## Overview

This project is a user-friendly React-based URL Shortener web application with a Node.js/Express backend. It provides core URL shortening functionality along with analytical insights, all managed within the client-side application.

## Features

- Shorten long URLs with optional custom shortcodes.
- Set validity period for shortened URLs (default 30 minutes).
- View statistics for shortened URLs including click counts and detailed click data.
- Dynamic dark/light theme toggle for an attractive UI.
- Client-side validation for URL format and input correctness.
- Backend logging middleware for request tracking.
- Unique shortcodes ensured for all shortened URLs.
- Redirection from short URLs to original URLs with expiry handling.

## Technologies Used

- Frontend: React, Material-UI (MUI), React Router
- Backend: Node.js, Express, shortid
- HTTP Client: Axios
- Styling: Material-UI components and theming

## Project Structure

- `client/`: React frontend source code
  - `src/pages/ShortenPage.js`: URL shortening page with form and results display
  - `src/pages/StatsPage.js`: Statistics page showing URL analytics
  - `src/App.js`: Main app component with routing and theme toggle
- `server/`: Express backend source code
  - `index.js`: API endpoints for shortening, redirection, and stats; logging middleware

## Setup and Running

### Backend

1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   npm start
   ```
   The backend runs on port 5000.

### Frontend

1. Navigate to the `client` directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm start
   ```
   The frontend runs on port 3000.

## Usage

- Access the frontend at `http://localhost:3000`.
- Use the URL Shortener page to shorten URLs with optional validity and custom shortcode.
- View analytics on the Stats page.
- The app supports dynamic dark/light theme toggling.

## Notes

- The backend uses in-memory storage; data will reset on server restart.
- Logging middleware logs all incoming requests with timestamp, method, and path.
- Client-side validation ensures URL format and input correctness before API calls.

## License

This project is provided as-is for evaluation purposes.
