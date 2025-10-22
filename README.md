# messenger 💬

[//]: # (Optional: Add an image/gif/screenshot of your application here)
A basic, real-time chat application built with a modern tech stack, designed to demonstrate core concepts of socket programming, state management, and robust backend services.

---

## ✨ Features

This application offers a seamless and interactive messaging experience with the following key features:

* **Real-Time Messaging:** Instantaneous, two-way communication using **Socket.IO** for a fluid chat experience.
* **User Authentication:** Secure user registration and login to ensure private and personalized chat sessions.
* **Message Storing:** Messages are persistently stored in a **PostgreSQL** database, ensuring you never lose a part of your conversation history.

---

## 🛠️ Tech Stack

The `messenger` app is built on a powerful, polyglot technology stack:

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **React** | Building a responsive and dynamic user interface. |
| **Backend** | **Spring Boot** | Creating a robust and scalable RESTful API and managing core application logic. |
| **WebSockets** | **Socket.IO** | Enabling real-time, low-latency communication between clients and the server. |
| **Database** | **PostgreSQL** | Primary relational database for storing user data and persistent message history. |
| **Caching/Broker** | **Redis** | Used for managing session data, caching, and potentially acting as a message broker for scaling. |

---

## 🚀 Getting Started

To get a copy of the project up and running on your local machine for development and testing, follow these steps.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/motionnblur/messenger.git
    cd messenger
    ```
2. **Create config files for docker compose:**
   
   These following files must be created: postgres.env, spring.env

   **postgres.env**:
   ```bash
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=1
   POSTGRES_DB=rest_server
   ```
   **spring.env**:
   ```bash
   SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/rest_server
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=1
   ```
3. **Start dev server:**
   ```bash
   docker compose --env-file postgres.env --env-file spring.env up
   ```

The React application should now be running on [http://localhost:3000](http://localhost:3000).

### Screenshots

<img width="1914" height="1042" alt="messenger" src="https://github.com/user-attachments/assets/7ac59f4e-2517-40c5-8f2f-1eeef2d0c677" />
