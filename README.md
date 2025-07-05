# 🛍️ Collaborative Product Wishlist App

A real-time shared wishlist application where multiple users can create, manage, and interact with wishlists — ideal for group shopping, family planning, or gift sharing.

---

## 🔧 Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React.js + Firebase Auth |
| Backend    | Node.js + Express.js     |
| Database   | MongoDB + Mongoose       |
| Auth       | Firebase Authentication  |
| Styling    | CSS3                     |
| Optional   | Firebase Hosting or Render for deployment |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/wishlist-app.git
cd wishlist-app
```

### 2. Backend Setup (`/server`)

```bash
cd server
npm install
# Ensure MongoDB is running locally or update MONGODB_URI in index.js
npm start
```

### 3. Frontend Setup (`/client`)

```bash
cd ../client
npm install
npm start
```

> 🌐 App will be live at: http://localhost:3000

---

## 🔑 Firebase Configuration

Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com) and enable **Authentication → Google Sign-In**.

Replace `firebase.js` with your config:

```js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwIIi4LfkdRy7H9X-23z7q02fp7fOD11Q",
  authDomain: "wishlist-app-54d53.firebaseapp.com",
  projectId: "wishlist-app-54d53",
  storageBucket: "wishlist-app-54d53.appspot.com",
  messagingSenderId: "800245253475",
  appId: "1:800245253475:web:1117628ce8f89f543fff56",
  measurementId: "G-GLPLKEZ46F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
```

---

## 📸 Screenshots

### 🔐 Login Page
![Login Page](./SS_1.png)

### 📝 Wishlist Overview
![Wishlist Overview](./SS_2.png)

### 🛒 Wishlist Details with Product, Reactions, Comments
![Wishlist Details](./SS_3.png)

---

## 📌 Assumptions & Limitations

- 🔹 User invitations are **mocked**, not actual email-based sharing.
- 🔹 Real-time updates via **WebSockets/Firebase Realtime DB** are not implemented (bonus).
- 🔹 Comments and emoji reactions are **local state only**, not stored in DB yet.
- 🔹 Products can only be added and deleted (editing not yet supported).

---

## 🚀 Future Improvements

- 🔁 Realtime sync using **Socket.IO** or **Firebase Realtime DB**
- ✏️ Product **editing functionality**
- 📧 Actual **email-based invite and share**
- 🔐 User **roles and access control**
- 🌍 Deployment using **Firebase Hosting**, **Render**, or **Vercel**
- 🧪 Add **unit and integration tests**
- 📱 Better **mobile responsiveness**, animations, and UX polish

---

## 👨‍💻 Author

**Manikanta**

> Built with ❤️ using React, Node.js, MongoDB, and Firebase.

---
