
# CareerLeap AI for Engineering Students

A personal AI-powered career co-pilot designed to guide engineering students through their academic and career journey.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-blue)](https://nextjs.org/)
[![Genkit](https://img.shields.io/badge/Genkit-v1-orange)](https://firebase.google.com/docs/genkit)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

---

## About the Project

CareerLeap AI is an innovative platform designed to assist engineering students. It provides personalized, AI-driven guidance to help students make informed decisions about their specialization, career pathway, and future opportunities.

This project aims to solve the critical challenge students face in navigating the complex landscape of educational and career choices by providing a centralized, intelligent, and user-friendly co-pilot.

**Who is it for?**
- Engineering college students.
- Career counselors and educators in the engineering space.
- Parents seeking guidance for their children pursuing engineering.

---

## Key Features

- **🤖 AI-Powered Specialization Guidance**: An interactive quiz that assesses a student's interests and personality to recommend a suitable engineering branch (Computer Science, Mechanical, etc.).
- **🗺️ Personalized Career Pathways**: Generates a step-by-step visual timeline with milestones like courses, projects, and internships to guide students toward their career goals.
- **📄 AI Resume Summary**: Helps students craft a professional and concise summary for their resume by analyzing their existing resume content.
- **💬 AI Engineering Career Mentor**: A chat interface where students can ask career-related questions and receive personalized advice from an AI mentor.
- **🎓 Engineering College Directory**: A searchable directory of top engineering colleges in India (currently mock data).
- **🏆 Leaderboard & Gamification**: Engages students with points and badges to motivate them on their learning journey.
- **🎨 Light & Dark Mode**: A modern, themeable interface for a comfortable user experience.
- **✨ Pro Subscription Model**: A premium subscription flow showcasing features and pricing tiers.

*(Screenshots of the application would go here)*

---

## Installation & Setup

Follow these steps to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- `npm` or `yarn`

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    - Create a file named `.env` in the root of your project.
    - Add your Google AI for Developers API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Add your Firebase project configuration keys.
      ```env
      GEMINI_API_KEY=YOUR_API_KEY_HERE
      
      NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_KEY"
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_DOMAIN"
      NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_BUCKET"
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
      NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
      ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

---

## Usage

Once the application is running, you can explore its various features:

-   Navigate to the **Guidance** section to take the specialization assessment.
-   Use the **Career Pathway** section to generate a personalized career roadmap.
-   Improve your resume on the **Resume Builder** section.
-   Chat with the **AI Mentor** for personalized advice.
-   Browse mock engineering college data on the **Colleges** section.

---

## Configuration

The primary configuration happens in the `.env` file, which is used to store the `GEMINI_API_KEY` required for the generative AI features powered by Genkit and Google AI, and the Firebase project credentials.

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Genkit](https://firebase.google.com/docs/genkit)
- [Lucide Icons](https://lucide.dev/)

---

## Contact

Project Link: [https://github.com/your_username/your_project_name](https://github.com/vishupal-24)

If you have questions or need support, please open an issue in the repository's "Issues" tab.
