import { NextRequest, NextResponse } from 'next/server';

// Resume data structured for RAG
const RESUME_DATA = {
  personal: {
    name: "Vivek Sai Manthri",
    email: "manthrivivek@gmail.com",
    phone: "+1 (248) 759-7187",
    location: "South Brunswick, NJ",
    linkedin: "linkedin.com/in/vivek-sai-manthri",
    github: "github.com/Vivekman24"
  },
  education: [
    {
      degree: "M.S. in Computer Science",
      school: "Rutgers University, New Brunswick, NJ",
      period: "Fall 2025 – May 2027",
      focus: "Computer Structures, Topics in AI, Brain-Inspired Computing, Programming Languages And Compilers I"
    },
    {
      degree: "B.S. in Computer Science and Data Science",
      school: "Rutgers University, New Brunswick, NJ", 
      period: "Sep. 2022 – May 2025",
      focus: "Algorithms, Data Structures, Computer Architecture, Software Methodology, Databases, Statistical Inference for Data Science, Data Management for Data Science, Applied Statistical Learning, Regression Methods, Machine Learning Principles, Information Visualization"
    }
  ],
  experience: [
    {
      title: "Full-Stack Developer Intern",
      company: "Gogentic AI",
      location: "Houston, TX | Remote",
      period: "July 2025 – August 2025",
      achievements: [
        "Developed NeuroVault, an AI memory system that turns audio and thoughts into structured intelligence",
        "Built frontend with React, TypeScript, and Tailwind CSS, optimized performance with Vite (33% faster load times)",
        "Engineered backend with FastAPI and Python, designed RESTful endpoints for audio/PDF processing",
        "Implemented RAG pipelines using ChromaDB, OpenAI embeddings, and LangChain, enabling semantic search across 10K+ documents with 37% improved query accuracy",
        "Integrated SQLite/Neo4j for local-first storage, cutting cloud costs by 40% with sub-200ms latency",
        "Dockerized dev pipelines reducing deployment time by 42%"
      ]
    },
    {
      title: "Software Developer Intern", 
      company: "Aroopa, Inc",
      location: "Monroe Township, NJ",
      period: "June 2025 – August 2025",
      achievements: [
        "Built MERN stack applications, linking React frontend with Node.js and Express backend",
        "Designed responsive UI components using HTML, Tailwind CSS, and React, boosting user engagement by 15%",
        "Developed MongoDB schemas and RESTful APIs using Postman, improving API reliability by 20%",
        "Conducted unit and integration testing, resolving 10+ functional issues"
      ]
    },
    {
      title: "Software Engineering Intern",
      company: "Memorial Sloan Kettering Cancer Center", 
      location: "New York, NY | Hybrid",
      period: "June 2024 – August 2024",
      achievements: [
        "Designed Conditional GAN model for synthetic clinical data generation, reducing manual data creation by 30%",
        "Optimized ML pipelines using TensorFlow, Keras, and Scikit-learn, improving computational efficiency by 25%",
        "Automated data preprocessing workflows with Pandas and Scikit-learn, reducing ETL process runtime by 20%",
        "Containerized development environment using Docker, ensuring 30% faster deployments"
      ]
    }
  ],
  projects: [
    {
      name: "NeuroVault AI Memory System",
      description: "An AI memory system that transforms audio and thoughts into structured intelligence",
      technologies: ["React", "TypeScript", "FastAPI", "Python", "ChromaDB", "OpenAI", "LangChain", "Neo4j"],
      features: [
        "Audio and PDF processing capabilities",
        "RAG pipelines with semantic search", 
        "33% reduced load times with Vite optimization",
        "40% cloud cost reduction with local-first storage",
        "37% improved query accuracy"
      ]
    },
    {
      name: "Online Auction System",
      description: "A secure web-based auction platform with user authentication, real-time bidding, and automated notifications",
      technologies: ["JavaScript", "Java", "MySQL", "JSP", "JDBC", "HTML/CSS", "AWS (EC2, RDS)", "Apache Tomcat"],
      features: [
        "User authentication and real-time bidding system",
        "Advanced search and filtering functionalities", 
        "Administrative tools for detailed sales reports",
        "AWS cloud deployment with 40% reduced latency",
        "Enhanced user experience by 25%"
      ]
    },
    {
      name: "Cafe Bliss App",
      description: "An Android application following the MVC design pattern for menu browsing and order management",
      technologies: ["Java", "JavaFX", "Android Studio"],
      features: [
        "MVC design pattern implementation",
        "Dynamic cart updates and custom quantities",
        "Multi-screen navigation",
        "Modern UI components with RecyclerView",
        "Singleton Pattern for efficient data handling"
      ]
    }
  ],
  skills: {
    languages: {
      general_purpose: ["Java", "Python", "C", "C++"],
      web_development: ["JavaScript", "TypeScript", "HTML/CSS"],
      query_data: ["SQL", "R"]
    },
    frameworks: {
      frontend: ["React", "Redux", "JavaFX", "Three.js", "React Three Fiber"],
      backend: ["Node.js", "Express.js", "Spring Boot", "FastAPI", "Flask", "Django"],
      testing: ["JUnit"]
    },
    ai_ml: {
      ml_frameworks: ["TensorFlow", "PyTorch", "Keras", "Scikit-Learn"],
      llm_nlp: ["OpenAI", "LangChain", "Hugging Face", "OpenAI Whisper", "Tesseract.js"],
      data_processing: ["Pandas", "NumPy"],
      vector_graph_dbs: ["ChromaDB", "Neo4j"]
    },
    devops_tools: {
      version_control: ["Git", "GitHub"],
      containerization_cicd: ["Docker/Docker Compose", "Kubernetes", "Jenkins"],
      ides_editors: ["IntelliJ IDEA", "Android Studio", "VS Code", "RStudio"],
      api_testing: ["Postman", "REST APIs"],
      data_visualization: ["Tableau", "Power BI"],
      other: ["MATLAB", "Apache Tomcat"]
    },
    cloud_db: {
      cloud_platforms: ["AWS", "GCP", "Azure"],
      sql_databases: ["MySQL", "PostgreSQL", "SQL Server", "SQLite"],
      nosql_databases: ["MongoDB", "DynamoDB"]
    }
  },
  interests: [
    "Exploring latest AI research papers",
    "Contributing to open-source projects", 
    "Working out and playing basketball and pickleball",
    "Creating innovative solutions that combine technology and innovation"
  ]
};

// Function to find relevant information based on user query
function findRelevantInfo(query: string): string {
  const lowerQuery = query.toLowerCase();
  let relevantInfo = "";
  
  // Check for specific project mentions
  if (lowerQuery.includes('neurovault') || lowerQuery.includes('ai memory')) {
    const project = RESUME_DATA.projects.find(p => p.name.includes('NeuroVault'));
    relevantInfo = `Project: ${project?.name}\nDescription: ${project?.description}\nTechnologies: ${project?.technologies.join(', ')}\nKey Features: ${project?.features.join(', ')}`;
  } else if (lowerQuery.includes('auction') || lowerQuery.includes('online auction')) {
    const project = RESUME_DATA.projects.find(p => p.name.includes('Auction'));
    relevantInfo = `Project: ${project?.name}\nDescription: ${project?.description}\nTechnologies: ${project?.technologies.join(', ')}\nKey Features: ${project?.features.join(', ')}`;
  } else if (lowerQuery.includes('cafe bliss') || lowerQuery.includes('cafe') || lowerQuery.includes('android')) {
    const project = RESUME_DATA.projects.find(p => p.name.includes('Cafe'));
    relevantInfo = `Project: ${project?.name}\nDescription: ${project?.description}\nTechnologies: ${project?.technologies.join(', ')}\nKey Features: ${project?.features.join(', ')}`;
  }
  
  // Check for company mentions
  else if (lowerQuery.includes('gogentic') || lowerQuery.includes('gogentic ai')) {
    const exp = RESUME_DATA.experience.find(e => e.company.includes('Gogentic'));
    relevantInfo = `Company: ${exp?.company}\nPosition: ${exp?.title}\nPeriod: ${exp?.period}\nKey Achievements: ${exp?.achievements.join('; ')}`;
  } else if (lowerQuery.includes('aroopa') || lowerQuery.includes('aroopa inc')) {
    const exp = RESUME_DATA.experience.find(e => e.company.includes('Aroopa'));
    relevantInfo = `Company: ${exp?.company}\nPosition: ${exp?.title}\nPeriod: ${exp?.period}\nKey Achievements: ${exp?.achievements.join('; ')}`;
  } else if (lowerQuery.includes('memorial sloan') || lowerQuery.includes('sloan kettering') || lowerQuery.includes('cancer center')) {
    const exp = RESUME_DATA.experience.find(e => e.company.includes('Memorial'));
    relevantInfo = `Company: ${exp?.company}\nPosition: ${exp?.title}\nPeriod: ${exp?.period}\nKey Achievements: ${exp?.achievements.join('; ')}`;
  }
  
  // Check for general categories
  else if (lowerQuery.includes('project') || lowerQuery.includes('build') || lowerQuery.includes('develop')) {
    relevantInfo = `Projects: ${RESUME_DATA.projects.map(p => `${p.name} - ${p.description}`).join('; ')}`;
  } else if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('internship')) {
    relevantInfo = `Experience: ${RESUME_DATA.experience.map(e => `${e.title} at ${e.company} (${e.period})`).join('; ')}`;
  } else if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
    const flattenSkills = (obj: Record<string, string[]>) => Object.values(obj).flat().join(', ');
    relevantInfo = `Skills: Languages: ${flattenSkills(RESUME_DATA.skills.languages)}; Frameworks: ${flattenSkills(RESUME_DATA.skills.frameworks)}; AI/ML: ${flattenSkills(RESUME_DATA.skills.ai_ml)}; DevOps/Tools: ${flattenSkills(RESUME_DATA.skills.devops_tools)}; Cloud/Databases: ${flattenSkills(RESUME_DATA.skills.cloud_db)}`;
  } else if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university')) {
    relevantInfo = `Education: ${RESUME_DATA.education.map(e => `${e.degree} at ${e.school} (${e.period})`).join('; ')}`;
  } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone')) {
    relevantInfo = `Contact: Email: ${RESUME_DATA.personal.email}, Phone: ${RESUME_DATA.personal.phone}, Location: ${RESUME_DATA.personal.location}, LinkedIn: ${RESUME_DATA.personal.linkedin}, GitHub: ${RESUME_DATA.personal.github}`;
  }
  
  return relevantInfo;
}

const SYSTEM_PROMPT = `You are Vivek Sai Manthri's AI assistant. You are knowledgeable about his background, experience, projects, and skills. Here is the information about Vivek:

Be conversational, helpful, and enthusiastic about Vivek's work. If someone greets you, respond warmly and ask how you can help them learn about Vivek.`;


// Function to generate intelligent responses without external AI
function generateIntelligentResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  
  // Handle greetings
  const greetingPatterns = /^(hi|hello|hey|howdy|greetings|sup|what's up|yo)[\s,!?.]*$/i;
  const startsWithGreeting = /^(hi|hello|hey|howdy|sup)\b/i.test(lowerMessage);
  const isOnlyGreeting = greetingPatterns.test(lowerMessage) || (startsWithGreeting && lowerMessage.split(' ').length <= 3);
  
  if (isOnlyGreeting) {
    return "Hi there! 👋 I'm Vivek's AI assistant. I can help you learn about his background, experience, projects, skills, hobbies, or anything else you'd like to know. What would you like to learn about Vivek?";
  }

  // Handle "who are you" / "what are you" questions
  if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you') || lowerMessage.includes('introduce yourself')) {
    return "I'm Vivek's personal AI assistant! I'm here to help you learn everything about Vivek - his professional experience, technical skills, projects, education, hobbies, and more. Feel free to ask me anything about him!";
  }

  // Handle "who is vivek" / "tell me about vivek"
  if (lowerMessage.includes('who is vivek') || lowerMessage.includes('tell me about vivek') || lowerMessage.includes('about vivek') || lowerMessage.includes('who\'s vivek')) {
    return "Vivek Sai Manthri is a passionate software developer and AI enthusiast currently pursuing his M.S. in Computer Science at Rutgers University. He has a strong background in full-stack development and AI/ML, with internship experience at Gogentic AI, Aroopa Inc., and Memorial Sloan Kettering Cancer Center. He's skilled in Python, Java, React, and various AI technologies, and loves building innovative solutions that make a real-world impact!";
  }

  // ============ HOBBIES & FUN ============
  if (lowerMessage.includes('hobby') || lowerMessage.includes('hobbies') || lowerMessage.includes('fun') || lowerMessage.includes('free time') || lowerMessage.includes('spare time') || lowerMessage.includes('outside of work') || lowerMessage.includes('for fun') || lowerMessage.includes('pastime') || lowerMessage.includes('leisure')) {
    return "When Vivek isn't coding, he loves staying active by working out at the gym and playing pickleball 🏓. He also enjoys playing video games 🎮, watching TV shows, exploring new technologies, and reading about the latest developments in AI. He believes in maintaining a healthy work-life balance!";
  }

  // ============ FAVORITE INTERNSHIP ============
  if ((lowerMessage.includes('favorite') || lowerMessage.includes('favourite') || lowerMessage.includes('best') || lowerMessage.includes('enjoyed most') || lowerMessage.includes('liked most')) && (lowerMessage.includes('internship') || lowerMessage.includes('job') || lowerMessage.includes('company') || lowerMessage.includes('work experience'))) {
    return "Vivek's favorite internship was at Memorial Sloan Kettering Cancer Center! 🏥 It was incredibly meaningful to him because he was able to make a real-world impact by helping analyze patient data. Working on healthcare technology and knowing his work could potentially help cancer patients made it an unforgettable experience. He developed a Conditional GAN model for synthetic clinical data generation that reduced manual data creation by 30%.";
  }

  // ============ FRONTEND FRAMEWORKS ============
  if ((lowerMessage.includes('frontend') || lowerMessage.includes('front-end') || lowerMessage.includes('front end') || lowerMessage.includes('ui') || lowerMessage.includes('user interface')) && (lowerMessage.includes('framework') || lowerMessage.includes('know') || lowerMessage.includes('use') || lowerMessage.includes('work') || lowerMessage.includes('experience') || lowerMessage.includes('skill'))) {
    return "Vivek is highly proficient in frontend development! His primary framework is React ⚛️, which he's used extensively with TypeScript across multiple projects including NeuroVault. He's also skilled in Next.js (which powers this portfolio!), Redux for state management, Tailwind CSS for styling, and has experience with JavaFX for desktop applications. He's built responsive, user-friendly interfaces that have boosted user engagement by up to 15%!";
  }

  // ============ BACKEND FRAMEWORKS ============
  if ((lowerMessage.includes('backend') || lowerMessage.includes('back-end') || lowerMessage.includes('back end') || lowerMessage.includes('server') || lowerMessage.includes('api')) && (lowerMessage.includes('framework') || lowerMessage.includes('know') || lowerMessage.includes('use') || lowerMessage.includes('work') || lowerMessage.includes('experience') || lowerMessage.includes('skill'))) {
    return "Vivek has strong backend development skills! He's worked extensively with FastAPI and Python (used in NeuroVault), Node.js with Express.js for MERN stack applications at Aroopa, and has experience with Flask, Django, and Spring Boot. He's designed RESTful APIs, implemented authentication systems, and optimized database queries to achieve sub-200ms latency. He's comfortable with both Python and JavaScript/Node.js backends!";
  }

  // ============ BEST/PROFICIENT PROGRAMMING LANGUAGE ============
  if ((lowerMessage.includes('best') || lowerMessage.includes('proficient') || lowerMessage.includes('strongest') || lowerMessage.includes('favorite') || lowerMessage.includes('favourite') || lowerMessage.includes('main') || lowerMessage.includes('primary') || lowerMessage.includes('most comfortable')) && (lowerMessage.includes('language') || lowerMessage.includes('programming') || lowerMessage.includes('coding'))) {
    return "Vivek's most proficient programming languages are Python 🐍 and Java ☕! He uses Python extensively for AI/ML work, backend development with FastAPI, and data science tasks. Java is his go-to for building robust applications - he's used it for Android development (Cafe Bliss App), the Online Auction System, and various academic projects. He's also very comfortable with JavaScript/TypeScript for full-stack web development!";
  }

  // ============ AI/ML EXPERIENCE ============
  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('deep learning') || lowerMessage.includes('neural network')) {
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('project') || lowerMessage.includes('know') || lowerMessage.includes('skill')) {
      return "Vivek has extensive AI/ML experience! 🤖 At Memorial Sloan Kettering, he designed a Conditional GAN model for synthetic clinical data generation. At Gogentic AI, he implemented RAG pipelines using ChromaDB, OpenAI embeddings, and LangChain for semantic search. He's proficient in TensorFlow, Keras, Scikit-Learn, PyTorch, Hugging Face, and has worked with OpenAI APIs. His M.S. concentration is in AI/ML, and he's passionate about building intelligent applications!";
    }
    return "Vivek is deeply passionate about AI and machine learning! He's currently pursuing his M.S. in Computer Science with a concentration in AI/ML at Rutgers. He's worked on projects involving GANs, RAG pipelines, semantic search, and has experience with TensorFlow, Keras, Scikit-Learn, OpenAI, LangChain, and more. Ask me about specific AI projects or his ML experience!";
  }

  // ============ DATABASES ============
  if (lowerMessage.includes('database') || lowerMessage.includes('sql') || lowerMessage.includes('mongodb') || lowerMessage.includes('postgresql') || lowerMessage.includes('mysql')) {
    return "Vivek has extensive database experience! He's worked with both SQL databases (MySQL, PostgreSQL, SQL Server, SQLite) and NoSQL databases (MongoDB, DynamoDB, Neo4j for graph data, ChromaDB for vector embeddings). At Aroopa, he architected MongoDB schemas and optimized queries for 40% faster data retrieval. He's comfortable designing database schemas, writing complex queries, and optimizing for performance!";
  }

  // ============ CLOUD EXPERIENCE ============
  if (lowerMessage.includes('cloud') || lowerMessage.includes('aws') || lowerMessage.includes('azure') || lowerMessage.includes('gcp') || lowerMessage.includes('devops') || lowerMessage.includes('deployment')) {
    return "Vivek has solid cloud and DevOps experience! ☁️ He's worked with AWS (EC2, RDS for the Online Auction System), GCP, and Azure. He's proficient in Docker and containerization - he Dockerized the NeuroVault development pipelines, reducing deployment time by 42%. He also has experience with Kubernetes, Jenkins for CI/CD, and has deployed production applications to cloud infrastructure!";
  }

  // ============ SPECIFIC PROJECT QUESTIONS ============
  if (lowerMessage.includes('neurovault') || lowerMessage.includes('ai memory')) {
    return "NeuroVault is Vivek's most impressive project! 🧠 It's an AI memory system that transforms audio and thoughts into structured intelligence. He developed this at Gogentic AI using React, TypeScript, FastAPI, Python, SQLite, Neo4j, and ChromaDB. The system features RAG pipelines for semantic search across 10K+ documents and achieved 37% improved query accuracy. He optimized performance with Vite, reducing load times by 33%, and cut cloud costs by 40% with local-first storage!";
  }
  
  if (lowerMessage.includes('auction') || lowerMessage.includes('online auction') || lowerMessage.includes('bidding')) {
    return "The Online Auction System is a secure, full-stack auction platform Vivek built! 🔨 It features user authentication, real-time bidding, automated notifications, and admin tools for sales reports. Built with JavaScript, Java, MySQL, JSP, and JDBC, and deployed on AWS (EC2 + RDS). The system achieved 40% reduced latency and enhanced user experience by 25%. Check it out on his GitHub!";
  }
  
  if ((lowerMessage.includes('cafe') && lowerMessage.includes('bliss')) || (lowerMessage.includes('android') && lowerMessage.includes('app'))) {
    return "Cafe Bliss App is an Android application Vivek built following the MVC design pattern! ☕ It provides seamless menu browsing and order management with dynamic cart updates, custom quantities, and multi-screen navigation. Built with Java and JavaFX, it features modern UI components with RecyclerView and uses the Singleton Pattern for efficient data handling. It showcases his mobile development skills!";
  }

  // ============ COMPANY-SPECIFIC QUESTIONS ============
  if (lowerMessage.includes('gogentic')) {
    return "At Gogentic AI (July-August 2025), Vivek worked as a Full-Stack Developer Intern! 🚀 He developed NeuroVault, an AI memory system that transforms audio into structured intelligence. He built the React/TypeScript frontend, FastAPI/Python backend, and implemented RAG pipelines using ChromaDB, OpenAI embeddings, and LangChain. He achieved 33% faster load times, 37% better query accuracy, and 40% cloud cost reduction!";
  }
  
  if (lowerMessage.includes('aroopa')) {
    return "At Aroopa, Inc. (June-August 2025), Vivek worked as a Software Developer Intern building MERN stack applications! He connected React frontends with Node.js/Express backends, designed responsive UI components that boosted user engagement by 15%, and developed MongoDB schemas with RESTful APIs that improved reliability by 20%. He also conducted thorough testing, resolving 10+ functional issues!";
  }
  
  if (lowerMessage.includes('memorial') || lowerMessage.includes('sloan') || lowerMessage.includes('kettering') || lowerMessage.includes('cancer') || lowerMessage.includes('msk')) {
    return "Memorial Sloan Kettering Cancer Center (June-August 2024) was Vivek's favorite internship! 🏥 As a Software Engineering Intern, he made real-world impact by designing a Conditional GAN model for synthetic clinical data generation, reducing manual data creation by 30%. He optimized ML pipelines with TensorFlow, Keras, and Scikit-learn (25% efficiency improvement), and containerized the environment with Docker for 30% faster deployments!";
  }

  // ============ INTERNSHIP QUESTIONS ============
  if (lowerMessage.includes('internship') || lowerMessage.includes('intern')) {
    if (lowerMessage.includes('first')) {
      return "Vivek's first internship was at Memorial Sloan Kettering Cancer Center (June-August 2024) as a Software Engineering Intern! It was a transformative experience where he worked on AI/ML projects for healthcare, including designing a Conditional GAN model for synthetic clinical data generation. This experience sparked his passion for using technology to make real-world impact!";
    }
    if (lowerMessage.includes('second')) {
      return "Vivek's second internship was at Aroopa, Inc. (June-August 2025) as a Software Developer Intern! He built MERN stack applications, designed responsive UI components with React and Tailwind CSS, and developed MongoDB schemas with RESTful APIs. He boosted user engagement by 15% and improved API reliability by 20%!";
    }
    if (lowerMessage.includes('third') || lowerMessage.includes('latest') || lowerMessage.includes('recent') || lowerMessage.includes('last')) {
      return "Vivek's most recent internship was at Gogentic AI (July-August 2025) as a Full-Stack Developer Intern! He developed NeuroVault, an AI memory system using React, TypeScript, FastAPI, Python, and RAG pipelines. He achieved 33% faster load times, 37% better query accuracy, and 40% cloud cost reduction. It was an amazing experience working on cutting-edge AI technology!";
    }
    if (lowerMessage.includes('how many') || lowerMessage.includes('number')) {
      return "Vivek has completed 3 internships: 1️⃣ Memorial Sloan Kettering Cancer Center (2024) - Software Engineering Intern, 2️⃣ Aroopa, Inc. (2025) - Software Developer Intern, and 3️⃣ Gogentic AI (2025) - Full-Stack Developer Intern. Each gave him valuable experience in different areas of software development!";
    }
    return "Vivek has completed 3 internships: Gogentic AI (Full-Stack Developer), Aroopa, Inc. (Software Developer), and Memorial Sloan Kettering Cancer Center (Software Engineering). His favorite was MSK because he made real-world impact helping analyze patient data. Ask me about any specific internship for more details!";
  }

  // ============ EXPERIENCE/WORK QUESTIONS ============
  if (lowerMessage.includes('experience') || lowerMessage.includes('work history') || lowerMessage.includes('background')) {
    return "Vivek has diverse professional experience! He's worked at: 1️⃣ Gogentic AI - developing AI memory systems with React and FastAPI, 2️⃣ Aroopa, Inc. - building MERN stack applications, and 3️⃣ Memorial Sloan Kettering Cancer Center - creating ML models for healthcare. Combined with his M.S. in Computer Science at Rutgers, he has a strong foundation in full-stack development, AI/ML, and cloud technologies!";
  }

  // ============ PROJECTS GENERAL ============
  if (lowerMessage.includes('project')) {
    if (lowerMessage.includes('how many') || lowerMessage.includes('number')) {
      return "Vivek has 3 main projects showcased in his portfolio: 1️⃣ NeuroVault AI Memory System - an AI-powered memory and search system, 2️⃣ Online Auction System - a full-stack auction platform on AWS, and 3️⃣ Cafe Bliss App - an Android application for order management. He's also worked on many more academic and personal projects!";
    }
    if (lowerMessage.includes('best') || lowerMessage.includes('favorite') || lowerMessage.includes('impressive') || lowerMessage.includes('proud')) {
      return "Vivek's most impressive project is NeuroVault! 🧠 It's an AI memory system he developed at Gogentic AI that transforms audio and thoughts into structured intelligence. It uses cutting-edge technologies like RAG pipelines, ChromaDB for vector embeddings, LangChain, and Neo4j for graph storage. It achieved 37% better query accuracy and 40% cloud cost reduction!";
    }
    return "Vivek's main projects include: 1️⃣ NeuroVault AI Memory System - transforms audio into structured intelligence using RAG pipelines, 2️⃣ Online Auction System - a secure bidding platform on AWS, and 3️⃣ Cafe Bliss App - an Android app following MVC pattern. Each showcases different skills from AI/ML to full-stack to mobile development!";
  }

  // ============ SKILLS/TECHNOLOGY QUESTIONS ============
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('know') || lowerMessage.includes('proficient')) {
    return "Vivek has a diverse tech stack! 💻 Languages: Python, Java, JavaScript, TypeScript, SQL, C/C++. Frontend: React, Next.js, Redux, Tailwind CSS. Backend: FastAPI, Node.js, Express, Flask, Django. AI/ML: TensorFlow, Keras, Scikit-Learn, LangChain, OpenAI. Databases: MongoDB, MySQL, PostgreSQL, Neo4j, ChromaDB. Cloud: AWS, GCP, Azure, Docker, Kubernetes. He's a true full-stack developer with AI expertise!";
  }

  // ============ PROGRAMMING LANGUAGES ============
  if (lowerMessage.includes('programming language') || lowerMessage.includes('coding language') || lowerMessage.includes('languages does') || lowerMessage.includes('languages do')) {
    return "Vivek is proficient in many programming languages! His strongest are Python 🐍 and Java ☕, which he uses for most of his work. He's also very comfortable with JavaScript/TypeScript for web development, SQL for databases, and has experience with C, C++, and R. Python is his go-to for AI/ML work, while Java is his choice for robust backend applications!";
  }

  // ============ EDUCATION ============
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('college') || lowerMessage.includes('school') || lowerMessage.includes('study') || lowerMessage.includes('studying') || lowerMessage.includes('rutgers')) {
    return "Vivek is currently pursuing his M.S. in Computer Science at Rutgers University (2025-2027) with focus on AI/ML, Brain-Inspired Computing, and Programming Languages! 🎓 He completed his B.S. in Computer Science and Data Science at Rutgers (2022-2025), where he studied Algorithms, Data Structures, Machine Learning, Databases, and more. Go Scarlet Knights!";
  }

  // ============ CONTACT INFORMATION ============
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach') || lowerMessage.includes('linkedin') || lowerMessage.includes('github')) {
    return "You can reach Vivek at: 📧 manthrivivek@gmail.com, 📱 +1 (248) 759-7187, 📍 South Brunswick, NJ. Connect with him on LinkedIn: linkedin.com/in/vivek-sai-manthri or check out his code on GitHub: github.com/Vivekman24. He'd love to hear from you!";
  }

  // ============ LOCATION ============
  if (lowerMessage.includes('where') && (lowerMessage.includes('live') || lowerMessage.includes('from') || lowerMessage.includes('located') || lowerMessage.includes('based'))) {
    return "Vivek is based in South Brunswick, New Jersey! 📍 He's currently studying at Rutgers University in New Brunswick, NJ. He's open to opportunities in the NYC metro area and is also comfortable with remote work!";
  }

  // ============ AVAILABILITY / HIRING ============
  if (lowerMessage.includes('available') || lowerMessage.includes('hire') || lowerMessage.includes('hiring') || lowerMessage.includes('job') || lowerMessage.includes('opportunity') || lowerMessage.includes('position') || lowerMessage.includes('open to')) {
    return "Vivek is open to new opportunities! 🎯 He's currently pursuing his M.S. in Computer Science at Rutgers (graduating May 2027) and is interested in full-stack development, AI/ML engineering, and software development roles. He's available for internships, part-time, or full-time positions. Feel free to reach out at manthrivivek@gmail.com!";
  }

  // ============ WHY HIRE / STRENGTHS ============
  if (lowerMessage.includes('why hire') || lowerMessage.includes('why should') || lowerMessage.includes('strength') || lowerMessage.includes('what makes') || lowerMessage.includes('stand out') || lowerMessage.includes('unique')) {
    return "What makes Vivek stand out? 🌟 He combines strong full-stack development skills with AI/ML expertise - a rare combination! He's delivered real impact at every internship (33% faster load times, 37% better query accuracy, 40% cost reduction). He's passionate about building innovative solutions, is a quick learner who adapts to new technologies, and has proven he can make meaningful contributions from day one!";
  }

  // ============ GOALS / FUTURE ============
  if (lowerMessage.includes('goal') || lowerMessage.includes('future') || lowerMessage.includes('aspire') || lowerMessage.includes('dream') || lowerMessage.includes('want to') || lowerMessage.includes('plan')) {
    return "Vivek's goal is to become a leader in AI-powered software development! 🚀 He's passionate about building intelligent applications that solve real-world problems. He wants to work on cutting-edge AI technologies, contribute to innovative products, and eventually lead engineering teams. His experience at MSK showed him the power of technology to make meaningful impact, and he wants to continue that journey!";
  }

  // ============ TEAMWORK / COLLABORATION ============
  if (lowerMessage.includes('team') || lowerMessage.includes('collaborate') || lowerMessage.includes('work with others') || lowerMessage.includes('communication')) {
    return "Vivek is a great team player! 🤝 At all his internships, he collaborated effectively with cross-functional teams using Agile methodologies. At Gogentic AI, he worked in sprints to ensure timely feature rollouts. He has strong communication skills - he can explain technical concepts to non-technical stakeholders and works well with designers, PMs, and other developers. He believes great software is built by great teams!";
  }

  // ============ PROBLEM SOLVING ============
  if (lowerMessage.includes('problem') || lowerMessage.includes('challenge') || lowerMessage.includes('difficult') || lowerMessage.includes('solve')) {
    return "Vivek loves tackling challenging problems! 💡 He approaches problems methodically - understanding requirements, researching solutions, prototyping, and iterating. At MSK, he solved the challenge of generating realistic synthetic clinical data using Conditional GANs. At Gogentic, he optimized query accuracy by 37% through innovative RAG pipeline design. He sees every challenge as an opportunity to learn and grow!";
  }

  // ============ LEARNING / GROWTH ============
  if (lowerMessage.includes('learn') || lowerMessage.includes('growth') || lowerMessage.includes('improve') || lowerMessage.includes('develop yourself')) {
    return "Vivek is a lifelong learner! 📚 He stays current by reading AI research papers, exploring new technologies, and building side projects. He taught himself RAG pipelines, LangChain, and vector databases for the NeuroVault project. He's pursuing his M.S. to deepen his AI/ML knowledge. He believes the tech field evolves rapidly, and continuous learning is essential for success!";
  }

  // ============ DOCKER / CONTAINERIZATION ============
  if (lowerMessage.includes('docker') || lowerMessage.includes('container') || lowerMessage.includes('kubernetes') || lowerMessage.includes('k8s')) {
    return "Vivek has solid containerization experience! 🐳 He's proficient in Docker and Docker Compose, which he used to containerize the NeuroVault development pipelines, reducing deployment time by 42%. At MSK, he containerized the ML development environment for consistent, reproducible deployments. He also has experience with Kubernetes for orchestration and Jenkins for CI/CD pipelines!";
  }

  // ============ REACT / FRONTEND ============
  if (lowerMessage.includes('react') || lowerMessage.includes('nextjs') || lowerMessage.includes('next.js')) {
    return "Vivek is highly skilled in React! ⚛️ He's built multiple production applications with React, including the NeuroVault frontend with TypeScript. He's also proficient in Next.js (this portfolio is built with it!), Redux for state management, and Tailwind CSS for styling. He's delivered responsive, performant UIs that boosted user engagement by up to 15%!";
  }

  // ============ PYTHON ============
  if (lowerMessage.includes('python')) {
    return "Python is one of Vivek's strongest languages! 🐍 He uses it extensively for AI/ML work with TensorFlow, Keras, and Scikit-Learn. He's also built backends with FastAPI (NeuroVault) and Flask. At MSK, he used Python with Pandas for data preprocessing and ML pipelines. He loves Python for its versatility - from data science to web development to automation!";
  }

  // ============ JAVA ============
  if (lowerMessage.includes('java')) {
    return "Java is one of Vivek's core languages! ☕ He's used it for the Online Auction System (with JSP, JDBC), the Cafe Bliss Android app (with JavaFX), and various academic projects. He's comfortable with Spring Boot for enterprise applications and JUnit for testing. Java's robustness and OOP principles make it his go-to for building scalable applications!";
  }

  // ============ THANK YOU / GOODBYE ============
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
    return "You're welcome! 😊 It was great chatting with you. If you have more questions about Vivek, feel free to ask anytime. You can also reach him directly at manthrivivek@gmail.com. Have a great day!";
  }

  // ============ FUNNY / CASUAL ============
  if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
    return "Why do programmers prefer dark mode? Because light attracts bugs! 😄 But seriously, Vivek would love to chat with you about his work. What would you like to know?";
  }

  if (lowerMessage.includes('cool') || lowerMessage.includes('awesome') || lowerMessage.includes('nice') || lowerMessage.includes('great')) {
    return "Thanks! 😊 Vivek has worked hard to build his skills and experience. Is there anything specific you'd like to know about his projects, experience, or skills?";
  }

  // ============ RESUME ============
  if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return "You can download Vivek's resume right from this portfolio! 📄 Just scroll to the Credentials section and click the 'Download Resume' button. It includes all his experience, education, skills, and projects in a clean, professional format!";
  }

  // ============ PORTFOLIO ============
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('website') || lowerMessage.includes('this site')) {
    return "This portfolio was built by Vivek using Next.js, React, TypeScript, and Tailwind CSS! ✨ It features smooth animations with Framer Motion, a custom AI chat (that's me!), and a beautiful dark theme. The AI chat uses a RAG-like system to answer questions about Vivek. Pretty cool, right?";
  }

  // ============ AGE ============
  if (lowerMessage.includes('how old') || lowerMessage.includes('age')) {
    return "Vivek graduated with his B.S. in May 2025 and is now pursuing his M.S. at Rutgers University! He's at an exciting point in his career - early enough to be hungry for growth and learning, but experienced enough to deliver real value from day one! 🎓";
  }

  // ============ DEFAULT INTELLIGENT RESPONSES ============
  // Try to give a helpful response based on keywords
  if (lowerMessage.includes('vivek')) {
    return "Vivek Sai Manthri is a passionate software developer and AI enthusiast! He's pursuing his M.S. in Computer Science at Rutgers, has completed 3 internships (Gogentic AI, Aroopa, and Memorial Sloan Kettering), and has built impressive projects like NeuroVault. What specific aspect would you like to know more about - his skills, experience, projects, or something else?";
  }

  // Default response with suggestions
  return "I'm Vivek's AI assistant! 🤖 I can tell you about his experience (3 internships at Gogentic AI, Aroopa, and MSK), his projects (NeuroVault, Online Auction System, Cafe Bliss App), his skills (Python, Java, React, AI/ML), his education (M.S. at Rutgers), or even his hobbies! What would you like to know?";
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // Check for API keys
    const hasGemini = process.env.GOOGLEGEMINI_API_KEY;
    const hasOpenAI = process.env.OPENAI_API_KEY;
    
    // Try Gemini API first (most reliable and free)
    if (hasGemini) {
      try {
        // Find relevant information from resume data
        const relevantInfo = findRelevantInfo(message);
        
        // Create context for the AI
        const context = relevantInfo ? 
          `Based on this specific information about Vivek: ${relevantInfo}\n\n` :
          `Based on Vivek's overall background: He's a Computer Science graduate student at Rutgers University with 3+ years of experience in full-stack development, AI/ML, and cloud technologies. He has worked at Gogentic AI, Aroopa, Inc., and Memorial Sloan Kettering Cancer Center.\n\n`;

        const systemPrompt = `You are Vivek Sai Manthri's AI assistant. You are knowledgeable, helpful, and enthusiastic about his work. 

${context}

Answer the user's question about Vivek in a conversational, friendly manner. Be specific and detailed when discussing his projects, experience, and skills. If the user asks about something not covered in the context, provide a helpful general response about Vivek's background.

Keep responses concise but informative (2-3 sentences typically). Be enthusiastic about Vivek's achievements and projects.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLEGEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${systemPrompt}\n\nUser: ${message}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 200,
            }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          
          if (aiResponse) {
            return NextResponse.json({ 
              response: aiResponse
            });
          }
        } else {
          console.error('Gemini API error:', response.status, await response.text());
        }
      } catch (apiError: any) {
        console.error('Gemini API error:', apiError);
      }
    }
    
    // Fallback to OpenAI if Gemini fails
    if (hasOpenAI) {
      try {
        // Find relevant information from resume data
        const relevantInfo = findRelevantInfo(message);
        
        // Create context for the AI
        const context = relevantInfo ? 
          `Based on this specific information about Vivek: ${relevantInfo}\n\n` :
          `Based on Vivek's overall background: He's a Computer Science graduate student at Rutgers University with 3+ years of experience in full-stack development, AI/ML, and cloud technologies. He has worked at Gogentic AI, Aroopa, Inc., and Memorial Sloan Kettering Cancer Center.\n\n`;

        const systemPrompt = `You are Vivek Sai Manthri's AI assistant. You are knowledgeable, helpful, and enthusiastic about his work. 

${context}

Answer the user's question about Vivek in a conversational, friendly manner. Be specific and detailed when discussing his projects, experience, and skills. If the user asks about something not covered in the context, provide a helpful general response about Vivek's background.

Keep responses concise but informative (2-3 sentences typically). Be enthusiastic about Vivek's achievements and projects.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices[0]?.message?.content?.trim() || '';
          
          if (aiResponse) {
            return NextResponse.json({ 
              response: aiResponse
            });
          }
        } else {
          console.error('OpenAI API error:', response.status, await response.text());
        }
      } catch (apiError: any) {
        console.error('OpenAI API error:', apiError);
      }
    }
    
    // Final fallback: Generate intelligent response using local logic
    const response = generateIntelligentResponse(message);
    
    return NextResponse.json({ 
      response: response
    });
    
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ 
      error: 'Invalid request',
      fallback: "Hi! I'm Vivek's AI assistant. He's a Computer Science graduate student at Rutgers University with experience in full-stack development, AI/ML, and cloud technologies. What would you like to know about his work?"
    });
  }
}
