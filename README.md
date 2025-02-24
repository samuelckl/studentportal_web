# Student Portal Frontend
A React-based Student Study Management Portal that allows users to create accounts, enroll in study groups, and manage their profiles.

## Overview
This frontend application interacts with a backend API to provide a seamless student portal experience. Users can:
  - Register and log in
  - Enroll in subject study groups
  - View classmates in the same study group
  - Update their profile
  - Easily navigate via a sidebar
The UI is designed with simplicity and usability in mind, ensuring an intuitive experience.

## Tech Stack
- React 19 (Frontend framework)
- Vite (Fast development bundler)
- TailwindCSS (Modern styling framework)
- Axios (HTTP client for API communication)
- React Router (For navigation & routing)

## Features

### Authentication
  - Register/Login pages
  - Secure session storage for user authentication
  - Logout button in the header with a red warning color

### Navigation & User Interface
  - Left Sidebar (visible after login)
  - Home → Shows enrolled study groups
  - Profile → Allows name updates
  - Enrollment → Lists available subjects
  - Dynamic Buttons:
  - If enrolled, button turns red (Unenroll)
  - If not enrolled, button turns green (Enroll)

### Home (Study Groups)
  - Displays all enrolled subjects and their availability
  - Shows classmates who are in the same group

### Profile Management
  - Users can update their name
  - UI provides instant feedback on changes

### Enrollment Management
  - Lists all subjects and their available time slots
  - Users can enroll/unenroll with a single click

### User Interface
  - Minimalistic 3-level gray theme for a clean student-oriented design
  - Clear call-to-action buttons to guide users
  - Welcoming message upon login

## Setup and Installation
- clone the repo
- run below in terminal
  - npm install
  - npm run dev ( in app folder)
 
## API integration
This frontend interacts with the Student Portal Backend, which is built with Spring Boot.
- POST	/users/register	Register a new user
- POST	/users/login	User login
- GET	/enrollments/user-groups	Get user’s enrolled study groups
- POST	/enrollments/	Enroll in a subject
- DELETE	/enrollments/	Unenroll from a subject


