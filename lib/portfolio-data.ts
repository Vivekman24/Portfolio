// Canonical public portfolio facts, shared by the UI and assistant.
export const experience = [
  {
    "title": "Clinical Study Start-Up Automation Intern",
    "company": "Regeneron",
    "location": "Warren, NJ | Onsite",
    "period": "June 2026 – August 2026",
    "description": [
      "Developed production-ready enterprise AI agents in Microsoft Copilot Studio using Power Automate Agent Flows and M365 integrations to automate Clinical Study/Site Start-Up (SSU) processes and eliminate repetitive manual work",
      "Engineered SSU Data Steward FilePilot, an end-to-end automation solution that processes Jira ticket data, updates Excel workbooks using Python, JavaScript, and TypeScript scripts, and publishes files to SharePoint, saving 5+ hours daily",
      "Built AI-powered site/clinical operations solutions reducing site intelligence report preparation time by 50% and developed PQ DraftPilot, a multi-agent workflow accelerating Performance Qualification Script generation by 75%"
    ]
  },
  {
    "title": "Full-Stack Developer Intern",
    "company": "Gogentic AI",
    "location": "Houston, TX | Remote",
    "period": "July 2025 – August 2025",
    "description": [
      "Developed NeuroVault, an AI memory system that turns audio and thoughts into structured intelligence, building the frontend with React, TypeScript, and Tailwind CSS. Optimized performance with Vite, reducing load times by 30% while increasing user engagement",
      "Engineered the backend with FastAPI and Python, designing RESTful endpoints for audio/PDF processing and integrating SQLite/Neo4j for local-first storage, significantly reducing cloud costs while achieving sub-200ms latency",
      "Implemented RAG pipelines using ChromaDB, OpenAI embeddings, and LangChain, enabling semantic search across 10K+ documents and boosting query accuracy by 25%",
      "Streamlined deployment with Docker (40% faster) and collaborated in Agile sprints to ensure timely feature rollouts"
    ]
  },
  {
    "title": "Software Developer Intern",
    "company": "Aroopa, Inc",
    "location": "Monroe Township, NJ",
    "period": "June 2025 – August 2025",
    "description": [
      "Built a production-ready MERN stack (React + Node.js/Express) that scaled to support 8K+ monthly users",
      "Created and implemented responsive UI components using HTML, Tailwind CSS, and React, boosting user engagement by 15% and improving overall user experience",
      "Architected MongoDB schemas and REST APIs using Postman, achieving higher reliability, and 40% faster data retrieval through query optimization",
      "Conducted unit and integration testing, resolving 10+ functional issues ensuring a scalable application"
    ]
  },
  {
    "title": "Software Engineering Intern",
    "company": "Memorial Sloan Kettering Cancer Center",
    "location": "New York, NY | Hybrid",
    "period": "June 2024 – August 2024",
    "description": [
      "Engineered a Conditional GAN model that generates synthetic clinical data for testing, reducing manual data creation by 30% while maintaining data privacy and high fidelity to real patient data",
      "Optimized machine learning pipelines using TensorFlow, Keras, and Scikit-learn, improving computational efficiency by 25% by integrating OneHotEncoder for complex datasets and ensuring machine-readable formats",
      "Automated data preprocessing workflows with Pandas and Scikit-learn, significantly reducing ETL process runtime and enhancing data transformation accuracy",
      "Containerized the development environment using Docker and integrated it into a CI/CD pipeline, ensuring faster deployments, reproducibility, and reduced configuration discrepancies"
    ]
  }
];

export const education = [
  {
    "degree": "M.S. in Computer Science",
    "school": "Rutgers University, New Brunswick, NJ",
    "period": "Fall 2025 – May 2027",
    "focus": "Brain-Inspired Computing, Data Structures and Algorithms, Introduction to AI, Database Systems for Data Science, Natural Language Processing, Massive Data Mining, Artificial Intelligence for Visual Computing, Machine Learning I, Programming Finance"
  },
  {
    "degree": "B.S. in Computer Science and Data Science",
    "school": "Rutgers University, New Brunswick, NJ",
    "period": "Sep. 2022 – May 2025",
    "focus": "Algorithms, Data Structures, Computer Architecture, Software Methodology, Databases, Statistical Inference for Data Science, Data Management for Data Science, Applied Statistical Learning, Regression Methods, Machine Learning Principles, Information Visualization"
  }
];

export const skills = {
  "Languages": {
    "General Purpose": [
      "Java",
      "Python",
      "C",
      "C++"
    ],
    "Web Development": [
      "JavaScript",
      "TypeScript",
      "HTML/CSS"
    ],
    "Query & Data": [
      "SQL",
      "R"
    ]
  },
  "Frameworks & Libraries": {
    "Frontend": [
      "React",
      "Redux",
      "JavaFX",
      "Three.js",
      "React Three Fiber"
    ],
    "Backend": [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "FastAPI",
      "Flask",
      "Django"
    ],
    "Testing": [
      "JUnit"
    ]
  },
  "AI & Machine Learning": {
    "ML Frameworks": [
      "TensorFlow",
      "PyTorch",
      "Keras",
      "Scikit-Learn"
    ],
    "LLM & NLP": [
      "OpenAI",
      "LangChain",
      "Hugging Face",
      "OpenAI Whisper",
      "Tesseract.js"
    ],
    "Data Processing": [
      "Pandas",
      "NumPy"
    ],
    "Vector & Graph DBs": [
      "ChromaDB",
      "Neo4j"
    ]
  },
  "DevOps & Tools": {
    "Version Control": [
      "Git",
      "GitHub"
    ],
    "Containerization & CI/CD": [
      "Docker/Docker Compose",
      "Kubernetes",
      "Jenkins"
    ],
    "IDEs & Editors": [
      "IntelliJ IDEA",
      "Android Studio",
      "VS Code",
      "RStudio"
    ],
    "API & Testing": [
      "Postman",
      "REST APIs"
    ],
    "Data Visualization": [
      "Tableau",
      "Power BI"
    ],
    "Other": [
      "MATLAB",
      "Apache Tomcat"
    ]
  },
  "Cloud & Databases": {
    "Cloud Platforms": [
      "AWS",
      "GCP",
      "Azure"
    ],
    "SQL Databases": [
      "MySQL",
      "PostgreSQL",
      "SQL Server",
      "SQLite"
    ],
    "NoSQL Databases": [
      "MongoDB",
      "DynamoDB"
    ]
  }
};

export const certifications = [
  {
    "title": "Context Engineering Certification",
    "issuer": "Professional Certification",
    "file": "/Context Engineering Certification.pdf"
  }
];

export const projects = [
  {
    "title": "Online Auction System",
    "subtitle": "Full-stack bidding platform",
    "category": "FULL-STACK / CLOUD",
    "description": "A secure auction platform with real-time bidding, automated alerts, and advanced search.",
    "technologies": [
      "JavaScript",
      "Java",
      "MySQL",
      "JSP",
      "JDBC",
      "HTML/CSS",
      "AWS (EC2, RDS)",
      "Apache Tomcat"
    ],
    "problem": "Support secure bidding, searchable listings, and effective auction administration.",
    "approach": "Implemented authentication, real-time bidding, automated notifications, search and filters, and administrative sales reports. Deployed on AWS.",
    "results": [
      "40% reduced latency with AWS cloud deployment",
      "25% enhanced user experience"
    ],
    "github": "https://github.com/Vivekman24/OnlineAuction"
  },
  {
    "title": "Cafe Bliss App",
    "subtitle": "Android ordering experience",
    "category": "MOBILE / PRODUCT ENGINEERING",
    "description": "A thoughtfully structured app for menu browsing, custom orders, and seamless cart management.",
    "technologies": [
      "Java",
      "JavaFX",
      "Android Studio"
    ],
    "problem": "Make menu browsing and order management seamless across multiple screens.",
    "approach": "Used MVC architecture, dynamic cart updates, custom quantities, RecyclerView components, and the Singleton pattern for data handling.",
    "results": [
      "Multi-screen navigation",
      "Dynamic cart updates and custom quantities",
      "Structured MVC architecture"
    ],
    "github": "https://github.com/Vivekman24/CafeBlissApp"
  }
];

export const leadership = [
  {
    "title": "Student Volunteer",
    "organization": "South Brunswick Public Library",
    "location": "South Brunswick, NJ",
    "period": "Jun 2020 – Sep 2021",
    "duration": "1 yr 4 mos",
    "category": "Education",
    "color": "from-blue-500 to-blue-500",
    "description": [
      "Assigned jobs to juniors and led/helped them with their work",
      "Organized 5+ community events and helped with several book sale events",
      "Shelved and rearranged books around the library"
    ]
  },
  {
    "title": "Volunteer Staff",
    "organization": "Durga Temple",
    "location": "South Brunswick, NJ",
    "period": "Jun 2019 – Sep 2021",
    "duration": "2 yrs 4 mos",
    "category": "Arts and Culture",
    "color": "from-blue-500 to-blue-500",
    "description": [
      "Helped with the preparation and distribution of food",
      "Assisted junior volunteers set up food donations for priests",
      "Cleaning and sanitization of the lobby",
      "Arranged special event halls and helped move temple equipment"
    ]
  }
];

export const interests = [
  {
    "emoji": "☕",
    "title": "Coffee Enthusiast",
    "description": "Fueled by caffeine and curiosity",
    "color": "from-amber-500 to-blue-500"
  },
  {
    "emoji": "🏋️",
    "title": "Fitness Focused",
    "description": "Gym sessions keep me sharp",
    "color": "from-blue-500 to-blue-500"
  },
  {
    "emoji": "🎮",
    "title": "Gamer",
    "description": "Relaxing with video games",
    "color": "from-blue-500 to-indigo-500"
  },
  {
    "emoji": "📚",
    "title": "AI Research Reader",
    "description": "Always exploring new papers",
    "color": "from-blue-500 to-blue-500"
  },
  {
    "emoji": "🏀",
    "title": "Basketball Player",
    "description": "Love hitting the court",
    "color": "from-blue-500 to-blue-500"
  },
  {
    "emoji": "💡",
    "title": "Side Project Addict",
    "description": "Always building something new",
    "color": "from-blue-500 to-blue-500"
  }
];

export const personal = {
 name: 'Vivek Sai Manthri', email: 'manthrivivek@gmail.com', phone: '+1 (248) 759-7187', location: 'South Brunswick, NJ',
 github: 'https://github.com/Vivekman24', linkedin: 'https://linkedin.com/in/vivek-sai-manthri', resume: '/Vivek_Sai_Manthri_Resume.pdf',
 summary: 'Software developer and AI enthusiast pursuing an M.S. in Computer Science at Rutgers University. Interested in full-stack applications, machine learning, and practical software solutions.'
};
export const portfolio = { personal, experience, education, skills, certifications, projects, leadership, interests };
