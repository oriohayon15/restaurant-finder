**LocalEats**

LocalEats is a full-stack web application that enables users to discover local restaurants by location and cuisine preferences. Authenticated users can save and manage their favorite spots in a sleek, responsive interface built with modern web technologies.

---

⚠️ Disclaimer
Image Display Note: Due to Google Places API restrictions, restaurant images do not load on the deployed site. To experience the full functionality (including images), please run the project locally (see instructions below).


Watch the complete LocalEats experience (running in local environment): https://youtu.be/l9p6btj7nJ4

---

Tech Stack
Frontend:
- Next.js
- React
- Tailwind CSS
- Firebase Authentication
- Google Places API

Backend:
- Node.js
- Express.js
- PostgreSQL
- Hosted on Railway

---

Features

- Search for restaurants by location and category using the Google Places API
- View restaurant cards and redirect to Google Maps for full details
- Save restaurants to your favorites list (only visible when logged in)
- Remove from favorites directly in the saved tab
- User authentication 
- Clean UI built with Tailwind CSS

---

Live Website:
https://localeats-frontend.vercel.app/

---

Run Locally 
1. Clone the repository (git clone https://github.com/oriohayon15/restaurant-finder.git)
2. Set up environmental variables (Create a .env andinclude your Firebase config, Google API key, and database credentials.)
3. Install dependiencies (cd client && npm install, cd ../server && npm install)
4. Start the backend and frontend servers (Backend: cd server node server.js, Frontend: cd client npm run dev)
5. Visit http://localhost:3000 in your browser.

---

Developer: Ori Ohayon 
https://www.linkedin.com/in/ori-ohayon/
https://github.com/oriohayon15
