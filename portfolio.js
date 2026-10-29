/**
 * Public Portfolio Controller
 * Renders Bhautik Vekariya's portfolio sections dynamically with live sync
 */

import { DataService } from './data-service.js';
import { AuthService } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize dynamic portfolio sections
  await loadProfile();
  await loadProjects();
  await loadExperience();
  await loadSkills();
  await loadCertificates();
  await loadEducation();

  // Setup event listeners
  setupContactForm();
  setupAdminLoginModal();
  setupFilterButtons();
  setupScrollTracking();
  setupMobileNavAutoClose();
});

// 1. Load Profile & Bio
async function loadProfile() {
  try {
    const profile = await DataService.getProfile();
    
    // Header & Hero
    document.querySelectorAll('.profile-name').forEach(el => el.textContent = profile.displayName || 'Parth Ranpariya');
    const heroTitleEl = document.getElementById('hero-title');
    if (heroTitleEl) {
      heroTitleEl.innerHTML = `Hi, I'm <span class="text-gradient">${profile.displayName || 'Parth Ranpariya'}</span>`;
    }
    const heroSubtitleEl = document.getElementById('hero-subtitle');
    if (heroSubtitleEl) heroSubtitleEl.textContent = profile.heroSubtitle || profile.title;
    
    // About Me
    const aboutTextEl = document.getElementById('about-text');
    if (aboutTextEl) aboutTextEl.textContent = profile.about;

    // Contact details
    const emailEl = document.getElementById('contact-email-link');
    if (emailEl) {
      emailEl.href = `mailto:${profile.email}`;
      emailEl.textContent = profile.email;
    }
    const phoneEl = document.getElementById('contact-phone');
    if (phoneEl) {
      phoneEl.textContent = profile.phone || '+91 9723198913';
      phoneEl.href = `tel:${(profile.phone || '+919723198913').replace(/\s+/g, '')}`;
    }
    const locationEl = document.getElementById('contact-location');
    if (locationEl) locationEl.textContent = profile.location || 'Ahmedabad, Gujarat, India';

    // Social links
    if (profile.github) {
      document.querySelectorAll('.link-github').forEach(el => el.href = profile.github);
    }
    if (profile.linkedin) {
      document.querySelectorAll('.link-linkedin').forEach(el => el.href = profile.linkedin);
    }
    if (profile.kaggle) {
      document.querySelectorAll('.link-kaggle').forEach(el => el.href = profile.kaggle);
    }
    if (profile.resumeUrl && profile.resumeUrl !== '#') {
      const resumeBtn = document.getElementById('resume-btn');
      if (resumeBtn) resumeBtn.href = profile.resumeUrl;
    }

    // Avatar Image
    const heroAvatarImg = document.getElementById('hero-avatar-img');
    const heroAvatarFallback = document.getElementById('hero-avatar-fallback');
    const avatarUrl = profile.avatarUrl || '/assets/aistudio/parth_4b9116ca.jpeg';
    if (heroAvatarImg && avatarUrl) {
      heroAvatarImg.src = avatarUrl;
      heroAvatarImg.style.display = 'block';
      if (heroAvatarFallback) heroAvatarFallback.style.display = 'none';
    }

    // Footer text
    const footerTextEl = document.getElementById('footer-custom-text');
    if (footerTextEl) footerTextEl.textContent = profile.footerText;
  } catch (err) {
    console.error('Error loading profile:', err);
  }
}

// 2. Load Projects
let allProjects = [];
async function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  try {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-cyan" role="status">
          <span class="visually-hidden">Loading projects...</span>
        </div>
      </div>
    `;

    allProjects = await DataService.getProjects(true);

    if (allProjects.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5 text-muted-custom">
          <i class="bi bi-folder2-open display-4 mb-3 d-block text-dim"></i>
          <p>No published projects available at this time.</p>
        </div>
      `;
      return;
    }

    renderProjects(allProjects);
  } catch (err) {
    console.error('Error loading projects:', err);
    container.innerHTML = `<div class="col-12 text-center py-4 text-danger">Unable to load projects.</div>`;
  }
}

function renderProjects(projectsList) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (projectsList.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5 text-muted-custom">
        <p>No projects match the selected category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projectsList.map(project => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="glass-card project-card">
        <div class="project-thumb">
          ${project.imageUrl ? `
            <img src="${escapeHtml(project.imageUrl)}" alt="${escapeHtml(project.title)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="project-thumb-fallback" style="display: none;"><i class="bi bi-code-slash"></i></div>
          ` : `
            <div class="project-thumb-fallback"><i class="bi bi-code-slash"></i></div>
          `}
        </div>
        <div class="project-content">
          <div class="project-category">${escapeHtml(project.category || 'Development')}</div>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-desc">${escapeHtml(project.description)}</p>
          <div class="project-tech">
            <i class="bi bi-cpu me-1 text-cyan"></i> ${escapeHtml(project.technologies || '')}
          </div>
          <div class="project-links mt-auto">
            ${project.demoUrl ? `
              <a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-cyan">
                <i class="bi bi-box-arrow-up-right"></i> Live Demo
              </a>
            ` : ''}
            ${project.githubUrl ? `
              <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-custom">
                <i class="bi bi-github"></i> Code
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function setupFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      if (category === 'all') {
        renderProjects(allProjects);
      } else {
        const filtered = allProjects.filter(p => p.category === category);
        renderProjects(filtered);
      }
    });
  });
}

// 3. Load Experience Timeline
async function loadExperience() {
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  try {
    const list = await DataService.getExperience(true);
    if (list.length === 0) {
      container.innerHTML = `<p class="text-muted-custom text-center py-4">No experience entries listed.</p>`;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="d-flex flex-wrap justify-content-between align-items-center mb-2">
            <h4 class="h5 mb-0 fw-bold text-white">${escapeHtml(item.role)}</h4>
            <span class="text-cyan font-mono text-sm">${escapeHtml(item.startDate)} - ${item.isCurrent ? 'Present' : escapeHtml(item.endDate || '')}</span>
          </div>
          <h5 class="text-muted-custom h6 mb-3">
            <i class="bi bi-buildings me-1 text-cyan"></i> ${escapeHtml(item.company)} 
            ${item.location ? `· <span class="text-dim">${escapeHtml(item.location)}</span>` : ''}
            ${item.employmentType ? `· <span class="badge bg-dark border border-secondary">${escapeHtml(item.employmentType)}</span>` : ''}
          </h5>
          <p class="text-muted-custom mb-3">${escapeHtml(item.description || '')}</p>
          ${item.technologies ? `
            <div class="text-dim text-xs">
              <i class="bi bi-tag me-1 text-cyan"></i> ${escapeHtml(item.technologies)}
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading experience:', err);
  }
}

// 4. Load Technical Skills
async function loadSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  try {
    const list = await DataService.getSkills(true);
    if (list.length === 0) {
      container.innerHTML = `<p class="text-muted-custom text-center py-4">No skills listed.</p>`;
      return;
    }

    container.innerHTML = list.map(skill => `
      <div class="col-6 col-md-4 col-lg-3 mb-3">
        <div class="skill-card p-3 text-start position-relative">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <i class="bi ${escapeHtml(skill.iconClass || 'bi-code')} skill-icon text-cyan fs-3"></i>
            ${skill.badge ? `<span class="badge bg-dark border border-secondary text-xs">${escapeHtml(skill.badge)}</span>` : ''}
          </div>
          <h4 class="skill-name text-white fs-6 fw-bold mb-1">${escapeHtml(skill.name)}</h4>
          <span class="text-dim text-xs d-block">${escapeHtml(skill.category)}</span>
          ${skill.level ? `<div class="mt-2 text-cyan text-xs font-mono"><i class="bi bi-stars me-1"></i>${escapeHtml(skill.level)}</div>` : ''}
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading skills:', err);
  }
}

// 5. Load Certificates
async function loadCertificates() {
  const container = document.getElementById('certificates-container');
  if (!container) return;

  try {
    const list = await DataService.getCertificates(true);
    if (list.length === 0) {
      container.innerHTML = `<p class="text-muted-custom text-center py-4">No certificates listed.</p>`;
      return;
    }

    container.innerHTML = list.map(cert => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="glass-card cert-card">
          <div class="cert-badge">
            <i class="bi bi-award"></i>
          </div>
          <h4 class="h5 fw-bold mb-2 text-white">${escapeHtml(cert.title)}</h4>
          <h5 class="text-cyan h6 mb-2">${escapeHtml(cert.issuer)}</h5>
          <div class="text-dim text-xs mb-3 font-mono">
            Issued: ${escapeHtml(cert.issueDate || 'Verified')} ${cert.credentialId ? `· ID: ${escapeHtml(cert.credentialId)}` : ''}
          </div>
          <p class="text-muted-custom text-sm flex-grow-1">${escapeHtml(cert.description || '')}</p>
          <div class="pt-2 mt-auto">
            ${cert.verificationUrl ? `
              <a href="${escapeHtml(cert.verificationUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-custom w-100">
                <i class="bi bi-shield-check"></i> Verify Credential
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading certificates:', err);
  }
}

// 6. Load Education
async function loadEducation() {
  const container = document.getElementById('education-container');
  if (!container) return;

  try {
    const list = await DataService.getEducation(true);
    if (list.length === 0) return;

    container.innerHTML = list.map(item => `
      <div class="col-md-12 mb-3">
        <div class="glass-card">
          <div class="d-flex flex-wrap justify-content-between align-items-center mb-2">
            <h4 class="h5 fw-bold text-white mb-0">${escapeHtml(item.degree)} in ${escapeHtml(item.fieldOfStudy)}</h4>
            <span class="text-cyan font-mono text-sm">${escapeHtml(item.startDate)} - ${escapeHtml(item.endDate || 'Present')}</span>
          </div>
          <h5 class="text-muted-custom h6 mb-3">
            <i class="bi bi-mortarboard me-1 text-cyan"></i> ${escapeHtml(item.institution)}
          </h5>
          <p class="text-muted-custom mb-0 text-sm">${escapeHtml(item.description || '')}</p>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading education:', err);
  }
}

// 7. Contact Form Handler
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('contact-form-alert');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showAlert(alertBox, 'Please complete all required fields.', 'danger');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Sending...`;

    try {
      await DataService.submitContactMessage({ name, email, subject, message });
      showAlert(alertBox, 'Thank you! Your message has been sent successfully.', 'success');
      form.reset();
    } catch (err) {
      console.error('Contact submission error:', err);
      showAlert(alertBox, 'Failed to send message. Please try again or email directly.', 'danger');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

function showAlert(element, message, type) {
  if (!element) return;
  element.className = `alert alert-${type} mt-3 py-2 text-sm`;
  element.textContent = message;
  element.classList.remove('d-none');
  setTimeout(() => {
    element.classList.add('d-none');
  }, 6000);
}

// 8. Admin Login Modal on Public Page
function setupAdminLoginModal() {
  const loginForm = document.getElementById('admin-modal-login-form');
  const errorBox = document.getElementById('admin-login-error');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (!username || !password) {
      showModalError(errorBox, 'Please enter username and password.');
      return;
    }

    const btn = loginForm.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Authenticating...`;

    try {
      await AuthService.signIn(username, password);
      // Success: redirect to dashboard
      window.location.href = '/admin/dashboard.html';
    } catch (err) {
      showModalError(errorBox, err.message || 'Authentication failed.');
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  });
}

function showModalError(box, message) {
  if (!box) return;
  box.textContent = message;
  box.classList.remove('d-none');
}

// 9. Navigation Active Tracking
function setupScrollTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// 10. Mobile Navigation Auto-close
function setupMobileNavAutoClose() {
  const navCollapse = document.getElementById('portfolioNav');
  if (!navCollapse) return;

  const links = navCollapse.querySelectorAll('.nav-link, .btn');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
        bsCollapse.hide();
      }
    });
  });
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
