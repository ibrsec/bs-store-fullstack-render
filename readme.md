<a name="readme-top"></a>
 
 
<!-- PROJECT LOGO -->
<br />
<div align="center">
   
  <a href="https://bs-store-fullstack-render.onrender.com/api-doc/">
    <img src="./client/public/logo.png" alt="Logo" width="250"   >
  </a>

  <h3 align="center">Full stack BS Store App</h3>

  <p align="center">
    An awesome Full-stack BS Store App
    <!-- <a href="https://github.com/ibrsec/stock-app"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <a href="https://bs-store-fullstack-render.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/ibrsec/bs-store-fullstack-render/tree/main/client">Frontend Repo</a>
    ·
    <a href="https://bs-store-backend.vercel.app/api-doc/">Backend Swagger</a>
    <!-- ·
    <a href="https://bs-store-fullstack-render.onrender.com/api/v1/documents/redoc">Backend Redoc</a> -->
    ·
    <a href="https://github.com/ibrsec/bs-store-fullstack-render/issues">Report Bug</a>
    ·
    <a href="https://github.com/ibrsec/bs-store-fullstack-render/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>📎 Table of Contents 📎 </summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
     <!-- <li><a href="#figma">Figma</a></li> -->
     <li><a href="#overview">Overview</a></li>
     <li><a href="#quick-setup">Quick Setup</a></li>
     <li><a href="#directory-structure">Directory structure</a></li>
     <li><a href="#built-with">Built With</a></li>
    <!-- <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li> -->

    
  </ol>
</details>





---

<!-- ABOUT THE PROJECT -->
<a name="about-the-project"></a>
## ℹ️ About The Project

[![stock-app](./client/public/project.gif)](https://bs-store-fullstack-render.onrender.com/)
<!-- ---
<b>ERD:</b>
[![stock-app-erd](./erdStockAPI.png)](https://bs-store-fullstack-render.onrender.com/) -->




<p align="right">(<a href="#readme-top">back to top</a>)</p>


---

<!-- ## Figma 

<a href="https://www.figma.com/file/ePyCHKsx2ODB32uLgyUEEd/bootstrap-home-page?type=design&node-id=0%3A1&mode=design&t=edDzadCB9Ev5FS1a-1">Figma Link</a>  

  <p align="right">(<a href="#readme-top">back to top</a>)</p>




--- -->
<a name="overview"></a>
## 👀 Overview

📦 A Fullstack BS-Store App Project</br>
🏀 [Frontend Live](https://bs-store-fullstack-render.onrender.com/) || [Backend Swagger](https://bs-store-fullstack-render.onrender.com/api-doc/) </br></br>
FRONTEND:

<b>🎯 React Development:</b> Built a responsive frontend using React.js, ensuring a seamless user experience.</br>

<b>🛠 State Management:</b> Managed application state with Redux Toolkit and Redux Persist, providing consistent state management across sessions.</br>

<b>🚀 Routing:</b> Integrated React Router DOM for smooth navigation between key pages like login, product listings, and admin dashboard.</br>

<b>🔒 Authentication:</b> Implemented JWT token authentication for secure user login and access control.</br>

<b>🔩 CRUD Operations:</b> Enabled full CRUD operations for products and categories, accessible to admin users only.</br>

<b>🔔 User Notifications:</b> Integrated React Toastify for real-time feedback on user actions such as login, registration, and CRUD operations.</br>

<b>💪 User Roles:</b> Normal users can only list products, while admin users have full access to create, update, and delete products and categories.</br>

<b>🌱 Admin Access:</b> Admin credentials are pre-populated on the login page for easy access to administrative functions.</br></br>

BACKEND:

<b>🎯 Express.js Framework:</b> Developed a robust backend with Express.js, handling secure and efficient product and category management.</br>

<b>🖥 Database Management:</b> Utilized MongoDB with Mongoose for flexible and consistent data modeling and querying.</br>

<b>🔒 Authentication & Authorization:</b> Used JWT tokens for secure user authentication and authorization throughout the application.</br>

<b>📄 API Documentation:</b> Created comprehensive API documentation with Swagger for easy testing and understanding of endpoints.</br>

<b>🔩 CRUD Operations:</b> Implemented full CRUD functionality for products and categories, with role-based access control ensuring only admins can modify data.</br>

<b>🛠 Middleware & Error Handling:</b> Employed express-async-errors and custom middleware for consistent error handling and validation across the application.</br>

<b>🌐 CORS Handling:</b> Configured CORS to allow secure cross-origin requests between the frontend and backend.</br>


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="quick-setup"></a>
## 🛫 Quick Setup

```sh
# clone the project
git clone https://github.com/ibrsec/bs-store-fullstack-render.git

# enter the project directory
cd stockapp-fullstack-render

# install dependency
# linux
npm run setup-production
# windows
npm run setup-production-windows

# run
node index.js

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ## 🐞 Debug

![stock-app.gif](/stock-app.gif) -->








<a name="directory-structure"></a>
## 📂 Directory structure 

```diff
+ bs-store-fullstack-render  (folder)  
      |---client (folder)   
      |      |          
      |      |---public (folder) 
      |      |                
+     |      |---src (folder) 
      |      |     |---pages (folder)       
      |      |     |           
      |      |     |---components (folder) 
      |      |     |    
      |      |     |---app (folder) ---store.jsx      
      |      |     |    └--features (folder)       
      |      |     |        |---authSlice.jsx  
      |      |     |        └---stockSlice.jsx       
      |      |     |          
      |      |     |          
      |      |     |---router (folder)         
      |      |     |          
      |      |     |---services (folder)              
      |      |     |          
      |      |     |---helper (folder)          
      |      |     |          
      |      |     |---App.js 
      |      |     |---Index.js
      |      |     └---Index.css
      |      |      
      |      |----.dockerignore
      |      |----dockerfile
      |      |----package.json
      |      |----yarn.lock 
      |      └----readme.md 
      |      
+     |---src (folder) 
      |     |---config (folder)       
      |     |           
      |     |---controllers (folder)  
      |     |    
      |     |---helpers (folder)      
      |     |          
      |     |---middlewares (folder)      
      |     |          
      |     |---models (folder)           
      |     |          
      |     └---routes (folder)  
      |      
      |----.env
      |----.gitignore
      |----index.js
      |----package-lock.json
      |----package.json
      |----.dockerignore
      |----dockerfile
      |----swaggerAutogen.js
      └----readme.md 
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a name="built-with"></a>
### 🏗️ Built With
<b>Frontend</b>
 
<!-- https://dev.to/envoy_/150-badges-for-github-pnk  search skills-->


<!-- https://dev.to/envoy_/150-badges-for-github-pnk  search skills-->

 <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
 <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white&color=red"> 
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
 <!-- <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Vite-AB4BFE?style=for-the-badge&logo=vite&logoColor=FFC920">  -->
 <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> 
 <!-- <img src="https://img.shields.io/badge/Next-20232A?style=for-the-badge&logo=next&logoColor=61DAFB">  -->
 <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"> 
 <!-- <img src="https://img.shields.io/badge/App-Router-CA4245?style=for-the-badge&logo=app-router&logoColor=white">  -->

  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">  
 <img src="https://img.shields.io/badge/Redux Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white"> 
 <img src="https://img.shields.io/badge/Redux--Persist -593D88?style=for-the-badge&logo=redux&logoColor=white"> 
 <!-- <img src="https://img.shields.io/badge/Context API-593D88?style=for-the-badge&logo=context&logoColor=white">  -->


 <img src="https://img.shields.io/badge/Axios-593D88?style=for-the-badge&logo=axios&logoColor=white"> 

 <!-- <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">  -->

 <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white"> 
 <!-- <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Formik-172B4D?style=for-the-badge&logo=formik&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Yup-172B4D?style=for-the-badge&logo=yup&logoColor=white">  -->
 <img src="https://img.shields.io/badge/Toastify-45CC11?style=for-the-badge&logo=toastify-ui&logoColor=white"> 


---

<b>Backend</b>


 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> 
 <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"> 
 <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> 
 <img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"> 
 <img src="https://img.shields.io/badge/Swagger-4EA94B?style=for-the-badge&logo=swagger&logoColor=white"> 
 <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> 
 <img src="https://img.shields.io/badge/Express%20async%20errors-000000?style=for-the-badge&logo=expressasyncerrors&logoColor=white"> 
 <img src="https://img.shields.io/badge/dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white"> 
 <img src="https://img.shields.io/badge/cors-000000?style=for-the-badge&logo=cors&logoColor=white"> 
 <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> 



 
<p align="right">(<a href="#readme-top">back to top</a>)</p>




