# 🎬 Netflix Clone (MERN Stack)

Welcome to the **Netflix Clone** project! This is a full-featured streaming platform built using the **MERN stack** with modern authentication, video streaming UI, and responsive design — just like Netflix! 🍿

## 🚀 Live Demo

🔗 [Link To Website](https://mywatchserver.onrender.com/) 

![Preview](/frontend/public/image.png)


---
## 🛠️ Tech Stack

- ⚛️ **React** – Frontend UI  
- 🌐 **Node.js & Express** – Backend & API  
- 🍃 **MongoDB** – Database  
- 🔐 **JWT** – Authentication  
- 🧠 **Redux / Zustand** – State Management  
- 💅 **Styled Components / TailwindCSS** – Styling  
- 🎥 **TMDB API** – Movie Data *(Optional)*

---

## 📸 Features

- 🧑‍💻 User Authentication (Signup/Login with JWT)
- 🎞️ Browse & Search Movies
- ❤️ Add to Favorites / Watchlist
- 📱 Responsive Design (Mobile, Tablet, Desktop)
- 💡 Clean and modern UI
- 🔐 Protected Routes & Role-based Access
- 🧩 Integration with TMDB or your own content

---

## 📁 Folder Structure

netflix-clone/
├── client/ # React frontend
│ ├── src/
│ ├── public/
├── server/ # Node.js backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── config/
│ └── utils/

yaml
Copier
Modifier

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Aym-Aymen777/netflix-clone.git
cd netflix-clone
2. Set up Backend
bash
Copier
Modifier
cd server
npm install
cp .env.example .env  # Add your MongoDB URI and JWT Secret
npm start
3. Set up Frontend
bash
Copier
Modifier
cd client
npm install
npm start
🔐 .env Example
env
Copier
Modifier
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
📦 Dependencies
Frontend
react

react-router-dom

axios

zustand or redux-toolkit

tailwindcss or styled-components

Backend
express

mongoose

bcryptjs

jsonwebtoken

dotenv

cors

🧪 Optional Improvements
🔁 Video Playback (HLS or static videos)

📊 Admin Dashboard

🌍 Multi-language support

💬 User comments/reviews

🔎 Enhanced filtering/sorting

🙌 Contributing
Contributions are welcome! Feel free to fork this repo and submit a PR. Let’s build something amazing. 🛠️


👨‍💻 Author
Built with ❤️ by C.Aymen

pgsql
Copier
Modifier

Would you like a downloadable version of this file or help customizing it with your actual project name and links?
