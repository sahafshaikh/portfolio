💼 Sahaf Shaikh – Developer Portfolio
A modern, responsive, and interactive portfolio website built with HTML, CSS, and JavaScript to showcase the professional profile, skills, and projects of Sahaf Shaikh, a passionate full-stack developer.

📌 Features
Responsive design with Bootstrap 5

Light/Dark theme toggle with local storage persistence

Canvas-based dynamic placeholder images

Typing animation with Typed.js

Filterable portfolio section using Isotope.js

Testimonial slider using Swiper.js

Smooth scroll navigation

Animated skill charts

Contact form with client-side validation

Fun facts with animated counters

Interactive map using Leaflet.js

Modular and maintainable codebase

🛠️ Tech Stack
Frontend
HTML5

CSS3 with custom variables

JavaScript (ES6+)

Bootstrap 5 and Bootstrap Icons

Font Awesome

Libraries & Tools
Typed.js

Swiper.js

Isotope.js

Leaflet.js

Google Fonts

LocalStorage for theme persistence

Canvas API for image placeholders

🎯 Sections
Hero: Intro, animated roles, social links

About: Profile, personal details

Resume: Education & experience timeline

Skills: Interactive charts grouped by category

Projects: Filterable, modal-based portfolio

Testimonials, Blog, Fun Facts, and Contact Form

🚀 Getting Started
Prerequisites
Any modern web browser

No server setup required

Running Locally
Clone the repository or download the files.

Open index.html in a browser.

bash
Copy
Edit
git clone https://github.com/sahaf-shaikh/portfolio.git
cd portfolio
open index.html
No build tools or dependencies needed—everything runs client-side.

📂 File Structure
pgsql
Copy
Edit
📁 portfolio/
├── index.html
├── styles.css
├── script.js
└── assets/
🌗 Theme Toggle
The theme is stored in localStorage and applied on page load. It dynamically changes canvas images and applies transitions.

js
Copy
Edit
localStorage.setItem("theme", "light" | "dark");
🖼️ Canvas Image System
All placeholder images (hero, about, projects, testimonials, etc.) are generated dynamically using the HTML5 Canvas API with consistent theme-aware styles.

📧 Contact Form
Includes client-side validation for:

Name

Email (regex validated)

Subject

Message

Displays success/failure feedback messages.

Note: Currently, the form does not submit to a backend. You can integrate with services like Formspree or EmailJS.

🧪 Animations
Circle skill meters animate when visible in viewport

Counters increment for fun facts

Canvas image glow and rotating border effects

Preloader fades out on page load

🗺️ Map Integration
Interactive map via Leaflet.js (initialized but no specific coordinates set—can be extended easily).

📸 Screenshots
You can add screenshots here like:

scss
Copy
Edit
![Homepage Preview](screenshots/home.png)
![Dark Mode](screenshots/dark-mode.png)
📄 License
This project is licensed under the MIT License.
