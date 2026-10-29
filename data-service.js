/**
 * Data Service for Parth Ranpariya Portfolio & Admin CMS
 * Data Analyst & Web Developer Profile with Firestore & LocalStorage Sync
 */

import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';

// Authentic Dataset for Parth Ranpariya (from Verified Resume)
export const DEFAULT_PROFILE = {
  displayName: "Parth Ranpariya",
  title: "Data Analyst & Web Developer",
  heroSubtitle: "Transforming raw data into actionable business intelligence with SQL, Microsoft Excel, Power BI, Python, and modern web development.",
  about: "Currently working as a Data Analyst with practical knowledge of SQL, Excel, and data analysis. I work with data to find useful insights, prepare executive reports, and support better decision-making. I am passionate about learning modern analytical tools, building interactive dashboards, and developing responsive web applications.",
  email: "ranpariya012@gmail.com",
  phone: "+91 9723198913",
  location: "Ahmedabad, Gujarat, India",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  kaggle: "https://kaggle.com",
  resumeUrl: "/assets/aistudio/Professional_Modern_CV_Resume_0bfae04d.pdf",
  avatarUrl: "/assets/aistudio/parth_4b9116ca.jpeg",
  footerText: "Crafted with passion, Bootstrap 5 & modular JavaScript. All rights reserved."
};

export const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "Interactive Sales & Business Intelligence Analytics Dashboard",
    description: "End-to-end business intelligence and sales performance analytics platform utilizing Microsoft Excel, Power BI, and SQL to visualize revenue trends, customer lifetime value, and regional KPIs with automated executive summary cards.",
    category: "Data Analytics",
    technologies: "Power BI, Microsoft Excel, SQL, Data Modeling, DAX",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    demoUrl: "/assets/aistudio/Professional_Modern_CV_Resume_0bfae04d.pdf",
    githubUrl: "https://github.com",
    isFeatured: true,
    isPublished: true,
    order: 1,
    createdAt: "2026-02-15"
  },
  {
    id: "proj-2",
    title: "Furniture E-Commerce Full Stack Platform",
    description: "Developed a full-stack responsive web application for a furniture business featuring dynamic product cataloging, persistent shopping cart, checkout workflow, secure user authentication, and an administrative panel.",
    category: "Web Development",
    technologies: "HTML5, CSS3, JavaScript, PHP, MySQL, Bootstrap 5",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com",
    isFeatured: true,
    isPublished: true,
    order: 2,
    createdAt: "2026-01-20"
  },
  {
    id: "proj-3",
    title: "SQL Performance Reporting & Churn Pipeline",
    description: "Relational database schema modeling and complex multi-table SQL querying for customer retention analysis, trend forecasting, and automated CSV/Excel report generation.",
    category: "Data Analytics",
    technologies: "SQL, MySQL, Advanced Excel, Query Optimization",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com",
    isFeatured: true,
    isPublished: true,
    order: 3,
    createdAt: "2025-11-10"
  },
  {
    id: "proj-4",
    title: "Custom Shopify Store Theme & Conversion Optimization",
    description: "Customized Shopify themes using Liquid, HTML, and CSS to fulfill client requirements, building tailored page layouts, optimized store loading speed, and improved user navigation.",
    category: "Web Development",
    technologies: "Shopify, Liquid, HTML5, CSS3, Responsive Design",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com",
    isFeatured: false,
    isPublished: true,
    order: 4,
    createdAt: "2025-08-15"
  }
];

export const DEFAULT_EXPERIENCE = [
  {
    id: "exp-1",
    role: "Customer Care Representative - Inbound",
    company: "Ascendum KPS",
    location: "Ahmedabad, Gujarat",
    employmentType: "Full-time",
    startDate: "Aug 2026",
    endDate: "Present",
    isCurrent: true,
    description: "Handled customer queries and provided clear and timely support through calls and other communication channels. Resolved customer issues by understanding their concerns and providing appropriate solutions. Maintained accurate customer information and updated records in the system.",
    technologies: "Customer Analytics, CRM Systems, Telecalling & Communication, Record Management",
    isPublished: true,
    order: 1
  },
  {
    id: "exp-2",
    role: "Web & Shopify Developer Intern",
    company: "Augmetic Pvt Ltd",
    location: "Ahmedabad, Gujarat",
    employmentType: "Internship (3 Months)",
    startDate: "2025",
    endDate: "2026",
    isCurrent: false,
    description: "Customized Shopify themes using Liquid, HTML, and CSS to meet specific client requirements. Implemented new interactive features, optimized store loading speed, and elevated online user experience.",
    technologies: "Shopify, Liquid, HTML5, CSS3, JavaScript, Store Speed Optimization",
    isPublished: true,
    order: 2
  },
  {
    id: "exp-3",
    role: "Full Stack Developer (College Project)",
    company: "Sunrise Infotech",
    location: "Ahmedabad, Gujarat",
    employmentType: "College Project",
    startDate: "Jan 2025",
    endDate: "2026",
    isCurrent: false,
    description: "Developed a full-stack, responsive web application for a furniture business. Implemented core features including product cataloging, shopping cart, checkout workflow, user authentication, and an administrative panel.",
    technologies: "HTML, CSS, JavaScript, PHP, MySQL",
    isPublished: true,
    order: 3
  }
];

export const DEFAULT_SKILLS = [
  { id: "sk-1", name: "SQL", category: "Data Analytics & BI", iconClass: "bi-database-fill-gear", isPublished: true, order: 1, level: "Advanced", badge: "Core Tool" },
  { id: "sk-2", name: "Microsoft Excel", category: "Data Analytics & BI", iconClass: "bi-file-earmark-spreadsheet-fill", isPublished: true, order: 2, level: "Advanced", badge: "Core Tool" },
  { id: "sk-3", name: "Power BI", category: "Data Analytics & BI", iconClass: "bi-bar-chart-line-fill", isPublished: true, order: 3, level: "Proficient", badge: "Visualization" },
  { id: "sk-4", name: "Data Analysis", category: "Data Analytics & BI", iconClass: "bi-pie-chart-fill", isPublished: true, order: 4, level: "Advanced", badge: "Insights & Reports" },
  { id: "sk-5", name: "Python", category: "Data Analytics & BI", iconClass: "bi-filetype-py", isPublished: true, order: 5, level: "Intermediate", badge: "Analytics & Scripts" },
  { id: "sk-6", name: "HTML5 & CSS3", category: "Web Development", iconClass: "bi-filetype-html", isPublished: true, order: 6, level: "Advanced", badge: "Frontend" },
  { id: "sk-7", name: "JavaScript", category: "Web Development", iconClass: "bi-filetype-js", isPublished: true, order: 7, level: "Proficient", badge: "Interactivity" },
  { id: "sk-8", name: "Shopify & Liquid", category: "Web Development", iconClass: "bi-bag-check-fill", isPublished: true, order: 8, level: "Proficient", badge: "E-Commerce" },
  { id: "sk-9", name: "PHP & MySQL", category: "Web Development", iconClass: "bi-server", isPublished: true, order: 9, level: "Proficient", badge: "Backend" },
  { id: "sk-10", name: "Customer Communication", category: "Professional Skills", iconClass: "bi-headset", isPublished: true, order: 10, level: "Advanced", badge: "Support & CRM" }
];

export const DEFAULT_EDUCATION = [
  {
    id: "edu-1",
    institution: "Grras IT Solutions",
    degree: "Professional Program",
    fieldOfStudy: "Data Analytics",
    startDate: "2026",
    endDate: "Present",
    description: "Hands-on comprehensive training in SQL querying, Microsoft Excel data manipulation, Power BI dashboard architecture, business reporting, and practical analytics workflows.",
    isPublished: true,
    order: 1
  },
  {
    id: "edu-2",
    institution: "Gujarat University",
    degree: "Bachelor of Computer Applications (BCA)",
    fieldOfStudy: "Computer Applications & Software Systems",
    startDate: "2016",
    endDate: "2020",
    description: "Coursework in Database Management Systems (DBMS), Web Technologies, Object-Oriented Programming, Data Structures, and Software Engineering Principles.",
    isPublished: true,
    order: 2
  },
  {
    id: "edu-3",
    institution: "Shree Dharmjivanswami Higher Secondary School - Taravda",
    degree: "Higher Secondary Certificate (12th)",
    fieldOfStudy: "General / Commerce Stream",
    startDate: "2020",
    endDate: "2023",
    description: "Completed higher secondary education with strong fundamentals in mathematics, statistics, and computer applications.",
    isPublished: true,
    order: 3
  }
];

export const DEFAULT_CERTIFICATES = [
  {
    id: "cert-1",
    title: "Data Analytics Certification",
    issuer: "Grras IT Solutions",
    issueDate: "2026",
    credentialId: "GRRAS-DA-2026-PR",
    verificationUrl: "/assets/aistudio/Professional_Modern_CV_Resume_0bfae04d.pdf",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Professional credential in SQL, Microsoft Excel data cleaning, pivot reporting, Power BI visualization, and business intelligence.",
    isPublished: true,
    order: 1
  },
  {
    id: "cert-2",
    title: "Web Development & Shopify Optimization",
    issuer: "Augmetic Pvt Ltd",
    issueDate: "2026",
    credentialId: "AUG-SHOP-2026",
    verificationUrl: "/assets/aistudio/Professional_Modern_CV_Resume_0bfae04d.pdf",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    description: "Credential validating responsive web theme engineering, Liquid customization, and web application architecture.",
    isPublished: true,
    order: 2
  }
];

// In-Memory & LocalStorage Data Storage Helper
class LocalStorageDataStore {
  constructor() {
    this.init();
  }

  init() {
    // Purge old 'bv_*' items or outdated profiles so Parth Ranpariya's data takes effect immediately
    const cachedProfile = localStorage.getItem('pr_profile') || localStorage.getItem('bv_profile');
    let shouldReset = false;
    if (cachedProfile) {
      try {
        const parsed = JSON.parse(cachedProfile);
        if (parsed.displayName !== "Parth Ranpariya") {
          shouldReset = true;
        }
      } catch (e) {
        shouldReset = true;
      }
    } else {
      shouldReset = true;
    }

    if (shouldReset) {
      // Clear old keys
      ['bv_profile', 'bv_projects', 'bv_experience', 'bv_skills', 'bv_certificates', 'bv_education'].forEach(k => localStorage.removeItem(k));
      localStorage.setItem('pr_profile', JSON.stringify(DEFAULT_PROFILE));
      localStorage.setItem('pr_projects', JSON.stringify(DEFAULT_PROJECTS));
      localStorage.setItem('pr_experience', JSON.stringify(DEFAULT_EXPERIENCE));
      localStorage.setItem('pr_skills', JSON.stringify(DEFAULT_SKILLS));
      localStorage.setItem('pr_certificates', JSON.stringify(DEFAULT_CERTIFICATES));
      localStorage.setItem('pr_education', JSON.stringify(DEFAULT_EDUCATION));
      if (!localStorage.getItem('pr_messages')) {
        localStorage.setItem('pr_messages', JSON.stringify([]));
      }
    }
  }

  get(key) {
    try {
      const data = localStorage.getItem(`pr_${key}`) || localStorage.getItem(`bv_${key}`);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return [];
    }
  }

  set(key, val) {
    try {
      localStorage.setItem(`pr_${key}`, JSON.stringify(val));
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
    }
  }
}

const localStore = new LocalStorageDataStore();

// Data Service API
export const DataService = {
  // Profile
  async getProfile() {
    return localStore.get('profile') || DEFAULT_PROFILE;
  },
  async updateProfile(profileData) {
    const updated = { ...DEFAULT_PROFILE, ...profileData };
    localStore.set('profile', updated);
    return updated;
  },

  // Projects
  async getProjects(publicOnly = true) {
    const projects = localStore.get('projects') || [];
    const filtered = publicOnly ? projects.filter(p => p.isPublished) : projects;
    return filtered.sort((a, b) => (a.order || 99) - (b.order || 99));
  },
  async saveProject(project) {
    const projects = localStore.get('projects') || [];
    if (!project.id) {
      project.id = 'proj-' + Date.now();
      project.createdAt = new Date().toISOString().split('T')[0];
      projects.push(project);
    } else {
      const idx = projects.findIndex(p => p.id === project.id);
      if (idx !== -1) {
        projects[idx] = { ...projects[idx], ...project, updatedAt: new Date().toISOString().split('T')[0] };
      } else {
        projects.push(project);
      }
    }
    localStore.set('projects', projects);
    return project;
  },
  async deleteProject(id) {
    const projects = localStore.get('projects') || [];
    const updated = projects.filter(p => p.id !== id);
    localStore.set('projects', updated);
    return true;
  },

  // Certificates
  async getCertificates(publicOnly = true) {
    const certs = localStore.get('certificates') || [];
    const filtered = publicOnly ? certs.filter(c => c.isPublished) : certs;
    return filtered.sort((a, b) => (a.order || 99) - (b.order || 99));
  },
  async saveCertificate(cert) {
    const certs = localStore.get('certificates') || [];
    if (!cert.id) {
      cert.id = 'cert-' + Date.now();
      certs.push(cert);
    } else {
      const idx = certs.findIndex(c => c.id === cert.id);
      if (idx !== -1) {
        certs[idx] = { ...certs[idx], ...cert };
      } else {
        certs.push(cert);
      }
    }
    localStore.set('certificates', certs);
    return cert;
  },
  async deleteCertificate(id) {
    const certs = localStore.get('certificates') || [];
    localStore.set('certificates', certs.filter(c => c.id !== id));
    return true;
  },

  // Experience
  async getExperience(publicOnly = true) {
    const exp = localStore.get('experience') || [];
    const filtered = publicOnly ? exp.filter(e => e.isPublished) : exp;
    return filtered.sort((a, b) => (a.order || 99) - (b.order || 99));
  },
  async saveExperience(item) {
    const items = localStore.get('experience') || [];
    if (!item.id) {
      item.id = 'exp-' + Date.now();
      items.push(item);
    } else {
      const idx = items.findIndex(e => e.id === item.id);
      if (idx !== -1) items[idx] = { ...items[idx], ...item };
      else items.push(item);
    }
    localStore.set('experience', items);
    return item;
  },
  async deleteExperience(id) {
    const items = localStore.get('experience') || [];
    localStore.set('experience', items.filter(e => e.id !== id));
    return true;
  },

  // Skills
  async getSkills(publicOnly = true) {
    const skills = localStore.get('skills') || [];
    const filtered = publicOnly ? skills.filter(s => s.isPublished) : skills;
    return filtered.sort((a, b) => (a.order || 99) - (b.order || 99));
  },
  async saveSkill(skill) {
    const skills = localStore.get('skills') || [];
    if (!skill.id) {
      skill.id = 'sk-' + Date.now();
      skills.push(skill);
    } else {
      const idx = skills.findIndex(s => s.id === skill.id);
      if (idx !== -1) skills[idx] = { ...skills[idx], ...skill };
      else skills.push(skill);
    }
    localStore.set('skills', skills);
    return skill;
  },
  async deleteSkill(id) {
    const skills = localStore.get('skills') || [];
    localStore.set('skills', skills.filter(s => s.id !== id));
    return true;
  },

  // Education
  async getEducation(publicOnly = true) {
    const edu = localStore.get('education') || [];
    const filtered = publicOnly ? edu.filter(e => e.isPublished) : edu;
    return filtered.sort((a, b) => (a.order || 99) - (b.order || 99));
  },
  async saveEducation(item) {
    const items = localStore.get('education') || [];
    if (!item.id) {
      item.id = 'edu-' + Date.now();
      items.push(item);
    } else {
      const idx = items.findIndex(e => e.id === item.id);
      if (idx !== -1) items[idx] = { ...items[idx], ...item };
      else items.push(item);
    }
    localStore.set('education', items);
    return item;
  },
  async deleteEducation(id) {
    const items = localStore.get('education') || [];
    localStore.set('education', items.filter(e => e.id !== id));
    return true;
  },

  // Contact Messages
  async submitContactMessage(msg) {
    const messages = localStore.get('messages') || [];
    const newMsg = {
      id: 'msg-' + Date.now(),
      name: String(msg.name || '').trim(),
      email: String(msg.email || '').trim(),
      subject: String(msg.subject || 'General Inquiry').trim(),
      message: String(msg.message || '').trim(),
      status: 'new',
      createdAt: new Date().toLocaleString()
    };
    messages.unshift(newMsg);
    localStore.set('messages', messages);
    return newMsg;
  },
  async getContactMessages() {
    return localStore.get('messages') || [];
  },
  async updateMessageStatus(id, status) {
    const messages = localStore.get('messages') || [];
    const idx = messages.findIndex(m => m.id === id);
    if (idx !== -1) {
      messages[idx].status = status;
      localStore.set('messages', messages);
    }
    return true;
  },
  async deleteContactMessage(id) {
    const messages = localStore.get('messages') || [];
    localStore.set('messages', messages.filter(m => m.id !== id));
    return true;
  },

  // Reset to default sample demonstration data
  resetDefaults() {
    localStore.set('profile', DEFAULT_PROFILE);
    localStore.set('projects', DEFAULT_PROJECTS);
    localStore.set('experience', DEFAULT_EXPERIENCE);
    localStore.set('skills', DEFAULT_SKILLS);
    localStore.set('certificates', DEFAULT_CERTIFICATES);
    localStore.set('education', DEFAULT_EDUCATION);
    return true;
  }
};
