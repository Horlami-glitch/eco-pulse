 🌍 EcoPulse — Sustainability Dashboard
 📌 Overview

**EcoPulse** is a modern, interactive single-page application (SPA) that visualizes real-time environmental data using external APIs. It provides weather insights, forecasts, and dynamic data visualization in a clean, responsive dashboard interface.

This project demonstrates professional frontend development practices including API integration, state management, responsive design, and interactive charts.


🚀 Live URL

👉 **Live Application:**
https://your-vercel-link.vercel.app
 🎯 Key Features

#🌦️ Real-Time Weather Data

i.  Fetches live data from OpenWeather API
ii. Displays current weather conditions and forecasts

📊 Interactive Data Visualization

i. Built with Chart.js
ii. Line & Bar charts for:

 Temperature trends
 Humidity levels
 Wind speed analysis

 🔍 Smart Search & Filtering
 Search weather by city
 Filter by:
   Weather condition (Rain, Clouds, Clear)
   Data type (Temperature, Wind, Pressure, Humidity)
   Instant UI updates (no page reload)

 Fully Responsive Design

i.  Mobile-first design approach
ii. CSS Grid + Flexbox layout system
iii. Optimized for all screen sizes

 💾 Persistent User Preferences
 Stores:
   Favorite cities ⭐
   Theme (Dark / Light mode 🌙☀️)
  Uses LocalStorage for persistence
   Auto-refresh system

Tech Stack

| Category         | Technology           |
| ---------------- | -------------------- |
| Framework        | React (Vite)         |
| Styling          | CSS (Flexbox + Grid) |
| State Management | React Context API    |
| Charts           | Chart.js             |
| API              | OpenWeather API      |
| Storage          | LocalStorage         |
| Deployment       | Vercel               |

 UI/UX Design

The interface was first designed using Figma before development to ensure layout consistency and usability.

Design Highlights:

 Clean dashboard layout
 Sidebar navigation system
 Weather-focused UI hierarchy
 Responsive grid structure

## 🔀 Git Workflow (Collaboration Simulation)

This project follows a real-world feature-branch workflow:

### Branch Strategy:

* `feature/weekly-forecast`
* `feature/chart-system`
* `feature/ui-polish`

### Workflow:

* Features developed in separate branches
* Changes merged using Pull Requests
* Clean commit history maintained

This demonstrates professional Git collaboration practices.

---

## 📊 Performance Report

Tested using PageSpeed Insight:

 ⚡ Performance: High
 ♿ Accessibility: High
 ✅ Best Practices: Passed
🔍 SEO: Optimized

📎 Report attached in submission (Screenshot)

 Project Structure

```bash
src/
│
├── components/
│   ├── Sidebar.jsx
│   ├── ForecastCard.jsx
│   ├── WeatherCard.jsx
│   ├── WeatherChart.jsx
│   ├── WeatherOvervew.jsx
│   ├── FilterPills.jsx
│   ├── WeatherBarChart.jsx
│
├── services/
│   └── weatherservice.js
│
├── App.jsx
├── App.css
├── globals.css
├── main.jsx
└── index.css
 Installation & Setup

```bash
 Install dependencies
npm install

Start development server
npm run dev

🔐 Environment Variables

Create a `.env` file:

```env
VITE_API_KEY=your_openweather_api_key

📌 Deliverables Checklist

✔ Live deployed application (Vercel)
✔ GitHub repository with clean documentation
✔ Lighthouse performance report
✔ Branches + Pull Requests evidence

 Conclusion
EcoPulse demonstrates a complete modern frontend system with real-time data visualization, responsive UI, and scalable architecture. It fulfills all requirements of SWD 413 and reflects practical industry-level development practices.

