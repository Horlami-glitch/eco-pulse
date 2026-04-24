# 🌍 EcoPulse — Sustainability Dashboard

## 📌 Overview

**EcoPulse** is a modern, interactive **Single Page Application (SPA)** designed to visualize real-time environmental data through a clean, responsive dashboard interface.

The application integrates external APIs to deliver **live weather insights, forecasts, and dynamic data visualizations**, enabling users to explore sustainability-related metrics in an intuitive and engaging way.

This project demonstrates **standard frontend development practices**, including:

* API integration
* Component-based architecture
* State management
* Data visualization
* Responsive UI/UX design

---

## 🚀 Live URL

🔗 **Live Application:**
[https://eco-pulse-group3.vercel.app](https://eco-pulse-group3.vercel.app)

📂 **GitHub Repository:**
[https://github.com/Horlami-glitch/eco-pulse](https://github.com/Horlami-glitch/eco-pulse)

---

## 🎯 Core Features

### 🌦️ Real-Time Weather Data

* Fetches live environmental data using **OpenWeather API**
* Displays:

  * Current weather conditions
  * Forecast insights
* Supports dynamic city-based queries

---

### 📊 Interactive Data Visualization

* Powered by **Chart.js**
* Responsive charts (Line & Bar)
* Visualizes:

  * Temperature trends
  * Humidity levels
  * Wind speed patterns

---

### 🔍 Advanced Search & Filtering

* Search weather data by city
* Filter data by:

  * Weather condition (Rain, Clouds, Clear)
  * Data type (Temperature, Wind, Pressure, Humidity)
* Instant UI updates without page reload (SPA behavior)

---

### 📱 Fully Responsive Design

* Mobile-first approach
* Built using **CSS Grid & Flexbox**
* Optimized for:

  * Mobile
  * Tablet
  * Desktop

---

### 💾 Persistent User Preferences

* Saves user settings using **LocalStorage**
* Features:

  * Favorite cities ⭐
  * Dark/Light mode 🌙☀️
* Maintains state across sessions

---

## 🛠 Tech Stack

| Category         | Technology           |
| ---------------- | -------------------- |
| Framework        | React (Vite)         |
| Styling          | CSS (Flexbox + Grid) |
| State Management | React Context API    |
| Charts           | Chart.js             |
| API              | OpenWeather API      |
| Storage          | LocalStorage         |
| Deployment       | Vercel               |

---

## 🎨 UI/UX Design

The interface was designed using **Figma** prior to development to ensure consistency and usability.

### Design Highlights:

* Clean, modern dashboard layout
* Sidebar navigation system
* Strong visual hierarchy
* Responsive grid-based structure

---

## 🔀 Git Workflow (Professional Practice)

This project follows a **feature-branch workflow**, accurately reflecting how the application was developed.

### 🌿 Branch Strategy

The project uses feature branches mapped directly to implemented components and functionalities:

* `feature/ui-components` → Sidebar & WeatherCard components
* `feature/filter-system` → FilterPills (search & filtering logic)
* `feature/chart-visualization` → WeatherBarChart (data visualization)
* `feature/dashboard-core` → App.jsx (API integration & core logic)
* `feature/weather-api` → Weather service and data fetching

This approach demonstrates a real-world workflow where each feature is independently developed, tested, and merged.

---

### 🔁 Workflow Process

* Each feature was developed in its own dedicated branch
* Changes were pushed to GitHub and merged using Pull Requests
* Each Pull Request represents a specific feature or improvement
* Maintains a clean, traceable, and professional commit history aligned with industry practices

---

## 📊 Performance Report

Performance evaluated using Lighthouse / PageSpeed Insights:

* ⚡ **Performance:** 90+ (Optimized)
* ♿ **Accessibility:** 90+ (Inclusive design)
* ✅ **Best Practices:** Passed
* 🔍 **SEO:** Optimized

 *Screenshot included in submission*


## 📁 Project Structure

```bash
src/
│
├── components/
│   ├── Sidebar.jsx
│   ├── ForecastCard.jsx
│   ├── WeatherCard.jsx
│   ├── WeatherChart.jsx
│   ├── WeatherOverview.jsx
│   ├── FilterPills.jsx
│   ├── WeatherBarChart.jsx
│
├── services/
│   └── weatherService.js
│
├── App.jsx
├── App.css
├── globals.css
├── main.jsx
└── index.css
```


## ⚙️ Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```


## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_openweather_api_key
```


## 📌 Deliverables Checklist

✔ Live deployed application (Vercel)
✔ GitHub repository with clean documentation
✔ Lighthouse performance report
✔ Branches & Pull Requests (collaboration workflow)

---

## 🏁 Conclusion

EcoPulse represents a **complete modern frontend application**, combining real-time data integration, interactive visualizations, and responsive UI design.

It successfully fulfills all requirements of **SWD 413: Frontend Development**, while demonstrating **scalable architecture and professional development workflow** aligned with industry standards.

---

 👨‍💻 Author

Developed by Oyedeji Oluwaseun Olamilekan (Group 3 Leader) 
Frontend Developer | Software & Web Development
