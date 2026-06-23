# 🌌 Capsule — Keep Your Moments Safe in Time

> **Capsule** is a time-keeper for your memories.

Store your moments — with sound, image, or text — inside a capsule, set the time when it should open again, and let it rest... until the day you come back to it.

For yourself, for someone special, or maybe for someone you haven't even met yet.

🔗 [Visit Site](https://www.capsule-memo.ir) · [فارسی](./README.fa.md)

---

## ✨ Features

- ⏳ Create time capsules with text, image, or audio attachments
- 🎧 Attach custom sounds or personal recordings to each capsule
- 🗓️ Set the exact date & time when the capsule unlocks
- 🔒 Capsules stay hidden until their scheduled release moment
- 🛎️ Admin dashboard with notification and user management
- 🔑 JWT-based authentication with protected routes
- 🖥️ Clean, minimal dashboard interface
- 📱 Fully responsive — tested from 320px to 1440px

---

## 📁 Screenshots

| 🏠 Home Page | 🧭 Dashboard |
|---|---|
| ![Home Page](./Site-Screen-Shots/Home%20Page.png) | ![Dashboard](./Site-Screen-Shots/Dashboard.png) |

| 🔑 Login Page | 🌐 Public Capsules |
|---|---|
| ![Login Page](./Site-Screen-Shots/Login.png) | ![Public Capsules](./Site-Screen-Shots/Public%20Capsules.png) |

| 🛎️ Admin Notifications | 📱 Mobile View |
|---|---|
| ![Admin Notifications](./Site-Screen-Shots/dashboard_admin_notifications.png) | ![Mobile View](./Site-Screen-Shots/Mobile_1.png) |

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| State | Redux Toolkit |
| Styling | Tailwind CSS + shadcn/ui |
| Forms | React Hook Form |
| API | Axios |
| Deployment | Vercel |

---

## ⚡ Technical Highlights

- **Performance**: Lighthouse 90+ via Next.js Image optimization, dynamic imports, and route-based code splitting
- **Architecture**: Feature-based folder structure with Redux Toolkit slices per domain (capsules, auth, notifications)
- **Forms**: React Hook Form for all user inputs with client-side validation
- **API layer**: Centralized Axios instance with interceptors for auth token injection and unified error handling
- **Auth**: JWT-based authentication with role-based route protection (User / Admin)
- **Responsive**: Mobile-first layout, fully functional across all screen sizes

---

## 📁 Project Structure

```
app/
├── (site)/          # Public routes — home, about, capsules
├── (dashboard)/     # Protected user dashboard
├── login/           # Authentication pages
├── components/      # Reusable UI components
├── lib/             # Utilities and helpers
├── store/           # Redux slices and store configuration
└── services/        # Axios instance and API service layer
```

---

## ⚙️ Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/mostafakm78/Capsule.git

# Navigate to project directory
cd Capsule

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Roadmap

### ✅ Shipped
- [x] JWT authentication with protected routes
- [x] Role-based access — User & Admin
- [x] Admin notification dashboard
- [x] Capsule creation with text, image & audio
- [x] Timed unlock mechanism
- [x] Public capsule browsing

### 🔜 Upcoming
- [ ] Capsule sharing via public links
- [ ] Email notification on capsule unlock
- [ ] Capsule reactions and comments

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

---

## 🧑‍💻 Author

**Mostafa Kamari** — Frontend Developer · React & Next.js

[GitHub](https://github.com/mostafakm78) · [LinkedIn](https://linkedin.com/in/mostafa-kamari) · [Portfolio](https://portfolio-immostafakamari.vercel.app)
