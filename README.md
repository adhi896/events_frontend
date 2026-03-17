# EVENTS_FRONTEND

React frontend application for Events Management — connects with the events_backend API for user login, event listing, creation, and interaction.

## 🚀 About

This is the frontend client for an event management system built using React.js. It provides a responsive interface for users to:

Register / Login

View events

RSVP / Participate

Create and manage events (if applicable)

It communicates with the FastAPI backend API you built at events_backend.

## 🧠 Tech Stack

React – UI library

React Router – routing/navigation

Axios / Fetch – API calls

CSS / Tailwind / Styled Components – styling (adjust based on your app)

JWT – token stored in localStorage/sessionStorage

Environment Variables via .env

Swap specific libraries with what your app actually uses if different (e.g., Redux, Context API, Chakra UI, Tailwind).

## 📥 Installation

Clone the repo:

git clone https://github.com/adhi896/events_frontend.git
cd events_frontend

Install dependencies:

npm install

Or if you use Yarn:

yarn install
## ⚙️ Environment Setup

Create a .env file in the root directory:

REACT_APP_API_BASE_URL=http://127.0.0.1:8000

Replace the URL with your deployed API domain if deployed.

## 🚀 Run in Dev Mode
npm start

or

yarn start

This launches the app at http://localhost:3000 (default). The page auto‑reloads when you make edits.

## 📦 Build for Production
npm run build

or

yarn build

This outputs a production build in the build/ directory.

## 🔗 Features (Typical)

This section you can update to match your actual UI:

User Authentication – Login & Signup

Event Listing – Browse all events from backend

Protected Routes – Requires JWT token to access user‑specific UI

RSVP Functionality – Users can RSVP for events

Responsive UI – Works on desktop & mobile

Add relevant screenshots here once you have them!

## 📁 Project Structure



src/
├── components/    
├── pages/         
├── services/      
├── context/       
├── utils/         
├── App.js
├── index.js
.env
package.json
## 📌 Connecting to Backend

When making API calls, include the JWT token stored in localStorage like:

axios.get('/events', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

Adjust depending on how your frontend manages auth.

## 🧪 Testing

If you have tests (Jest/React Testing Library):

npm test

or

yarn test
🗂 Deployment

You can deploy this frontend on platforms like Vercel, Netlify, Firebase Hosting, or GitHub Pages.

Example (Netlify):

npm run build
netlify deploy --dir=build
