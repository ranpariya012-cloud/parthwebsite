/**
 * Administrator CMS Dashboard Controller
 * Full CRUD for Projects, Certificates, Experience, Skills, Education, Profile & Messages
 */

import { AuthService } from './auth.js';
import { DataService } from './data-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Guard check
  if (!AuthService.isAuthenticated()) {
    window.location.href = '/admin/login.html';
    return;
  }

  // 2. Setup user info and logout
  const currentUser = AuthService.getCurrentUser();
  if (currentUser) {
    const emailEl = document.getElementById('admin-user-email');
    if (emailEl) emailEl.textContent = currentUser.email;
  }

  const logoutBtn = document.getElementById('btn-admin-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await AuthService.signOut();
      window.location.href = '/admin/login.html';
    });
  }

  // 3. Initialize tabs & data
  setupTabNavigation();
  await refreshDashboardStats();
  await loadAdminProjects();
  await loadAdminCertificates();
  await loadAdminExperience();
  await loadAdminSkills();
  await loadAdminEducation();
  await loadAdminProfile();
  await loadAdminMessages();

  // 4. Setup modal forms
  setupProjectModal();
  setupCertificateModal();
  setupExperienceModal();
  setupSkillModal();
  setupEducationModal();
  setupProfileForm();
});

// Tab Navigation
function setupTabNavigation() {
  const navItems = document.querySelectorAll('.admin-nav-item[data-tab]');
  const tabPanes = document.querySelectorAll('.admin-tab-pane');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach(i => i.classList.remove('active'));
      tabPanes.forEach(p => p.classList.add('d-none'));

      item.classList.add('active');
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) activePane.classList.remove('d-none');
    });
  });
}

// Refresh Stat Counters
async function refreshDashboardStats() {
  try {
    const projects = await DataService.getProjects(false);
    const certs = await DataService.getCertificates(false);
    const exp = await DataService.getExperience(false);
    const skills = await DataService.getSkills(false);
    const msgs = await DataService.getContactMessages();

    const countProj = document.getElementById('stat-total-projects');
    if (countProj) countProj.textContent = projects.length;

    const countCert = document.getElementById('stat-total-certs');
    if (countCert) countCert.textContent = certs.length;

    const countExp = document.getElementById('stat-total-exp');
    if (countExp) countExp.textContent = exp.length;

    const countSkills = document.getElementById('stat-total-skills');
    if (countSkills) countSkills.textContent = skills.length;

    const countMsgs = document.getElementById('stat-total-messages');
    if (countMsgs) countMsgs.textContent = msgs.length;

    const badgeNewMsgs = document.getElementById('badge-new-messages');
    if (badgeNewMsgs) {
      const newCount = msgs.filter(m => m.status === 'new').length;
      badgeNewMsgs.textContent = newCount;
      badgeNewMsgs.style.display = newCount > 0 ? 'inline-block' : 'none';
    }
  } catch (err) {
    console.error('Error refreshing stats:', err);
  }
}

// ============================================================================
// 1. PROJECTS MODULE
// ============================================================================
let editingProjectId = null;
async function loadAdminProjects() {
  const tableBody = document.getElementById('admin-projects-tbody');
  if (!tableBody) return;

  const projects = await DataService.getProjects(false);
  if (projects.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No projects found. Click "Add Project" to create one.</td></tr>`;
    return;
  }

  tableBody.innerHTML = projects.map(p => `
    <tr>
      <td class="fw-bold">${escapeHtml(p.title)}</td>
      <td><span class="badge bg-dark border border-secondary">${escapeHtml(p.category || 'General')}</span></td>
      <td><small class="text-muted">${escapeHtml(p.technologies || '')}</small></td>
      <td>
        <span class="${p.isPublished ? 'badge-status-published' : 'badge-status-draft'}">
          ${p.isPublished ? 'Published' : 'Draft'}
        </span>
      </td>
      <td>${p.order || 0}</td>
      <td class="text-end">
        <button class="btn-action-icon me-1" onclick="window.editProject('${p.id}')" title="Edit Project">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn-action-icon me-1" onclick="window.togglePublishProject('${p.id}')" title="Toggle Publish">
          <i class="bi ${p.isPublished ? 'bi-eye-slash' : 'bi-eye'}"></i>
        </button>
        <button class="btn-action-icon danger" onclick="window.deleteProjectPrompt('${p.id}')" title="Delete Project">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function setupProjectModal() {
  const form = document.getElementById('project-form');
  const modalEl = document.getElementById('projectModal');
  if (!form || !modalEl) return;

  const bsModal = new bootstrap.Modal(modalEl);

  document.getElementById('btn-add-project')?.addEventListener('click', () => {
    editingProjectId = null;
    form.reset();
    document.getElementById('project-modal-title').textContent = 'Add New Project';
    document.getElementById('proj-preview-box').innerHTML = '<span class="text-muted text-xs">Preview</span>';
    bsModal.show();
  });

  // Image URL preview listener
  const imgInput = document.getElementById('proj-imageUrl');
  if (imgInput) {
    imgInput.addEventListener('input', () => {
      const val = imgInput.value.trim();
      const previewBox = document.getElementById('proj-preview-box');
      if (val) {
        previewBox.innerHTML = `<img src="${escapeHtml(val)}" alt="Thumbnail Preview" onerror="this.src=''; this.alt='Failed to load';" />`;
      } else {
        previewBox.innerHTML = '<span class="text-muted text-xs">Preview</span>';
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const projectData = {
      id: editingProjectId,
      title: form.title.value.trim(),
      category: form.category.value,
      description: form.description.value.trim(),
      technologies: form.technologies.value.trim(),
      imageUrl: form.imageUrl.value.trim(),
      demoUrl: form.demoUrl.value.trim(),
      githubUrl: form.githubUrl.value.trim(),
      isFeatured: form.isFeatured.checked,
      isPublished: form.isPublished.checked,
      order: parseInt(form.order.value, 10) || 0
    };

    await DataService.saveProject(projectData);
    bsModal.hide();
    await loadAdminProjects();
    await refreshDashboardStats();
  });

  // Global window methods for button actions
  window.editProject = async (id) => {
    const projects = await DataService.getProjects(false);
    const p = projects.find(item => item.id === id);
    if (!p) return;

    editingProjectId = id;
    form.title.value = p.title || '';
    form.category.value = p.category || 'Full Stack';
    form.description.value = p.description || '';
    form.technologies.value = p.technologies || '';
    form.imageUrl.value = p.imageUrl || '';
    form.demoUrl.value = p.demoUrl || '';
    form.githubUrl.value = p.githubUrl || '';
    form.isFeatured.checked = !!p.isFeatured;
    form.isPublished.checked = !!p.isPublished;
    form.order.value = p.order || 0;

    const previewBox = document.getElementById('proj-preview-box');
    if (p.imageUrl) {
      previewBox.innerHTML = `<img src="${escapeHtml(p.imageUrl)}" alt="Preview" />`;
    }

    document.getElementById('project-modal-title').textContent = 'Edit Project';
    bsModal.show();
  };

  window.togglePublishProject = async (id) => {
    const projects = await DataService.getProjects(false);
    const p = projects.find(item => item.id === id);
    if (!p) return;
    p.isPublished = !p.isPublished;
    await DataService.saveProject(p);
    await loadAdminProjects();
  };

  window.deleteProjectPrompt = async (id) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      await DataService.deleteProject(id);
      await loadAdminProjects();
      await refreshDashboardStats();
    }
  };
}

// ============================================================================
// 2. CERTIFICATES MODULE
// ============================================================================
let editingCertId = null;
async function loadAdminCertificates() {
  const tableBody = document.getElementById('admin-certs-tbody');
  if (!tableBody) return;

  const certs = await DataService.getCertificates(false);
  if (certs.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No certificates found. Click "Add Certificate" to register one.</td></tr>`;
    return;
  }

  tableBody.innerHTML = certs.map(c => `
    <tr>
      <td class="fw-bold">${escapeHtml(c.title)}</td>
      <td>${escapeHtml(c.issuer)}</td>
      <td><small class="font-mono text-muted">${escapeHtml(c.issueDate || '')}</small></td>
      <td>
        <span class="${c.isPublished ? 'badge-status-published' : 'badge-status-draft'}">
          ${c.isPublished ? 'Published' : 'Draft'}
        </span>
      </td>
      <td class="text-end">
        <button class="btn-action-icon me-1" onclick="window.editCert('${c.id}')" title="Edit">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn-action-icon me-1" onclick="window.togglePublishCert('${c.id}')" title="Toggle Publish">
          <i class="bi ${c.isPublished ? 'bi-eye-slash' : 'bi-eye'}"></i>
        </button>
        <button class="btn-action-icon danger" onclick="window.deleteCertPrompt('${c.id}')" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function setupCertificateModal() {
  const form = document.getElementById('cert-form');
  const modalEl = document.getElementById('certModal');
  if (!form || !modalEl) return;

  const bsModal = new bootstrap.Modal(modalEl);

  document.getElementById('btn-add-cert')?.addEventListener('click', () => {
    editingCertId = null;
    form.reset();
    document.getElementById('cert-modal-title').textContent = 'Add Certificate';
    bsModal.show();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const certData = {
      id: editingCertId,
      title: form.title.value.trim(),
      issuer: form.issuer.value.trim(),
      issueDate: form.issueDate.value.trim(),
      credentialId: form.credentialId.value.trim(),
      verificationUrl: form.verificationUrl.value.trim(),
      imageUrl: form.imageUrl.value.trim(),
      description: form.description.value.trim(),
      isPublished: form.isPublished.checked,
      order: parseInt(form.order.value, 10) || 0
    };

    await DataService.saveCertificate(certData);
    bsModal.hide();
    await loadAdminCertificates();
    await refreshDashboardStats();
  });

  window.editCert = async (id) => {
    const certs = await DataService.getCertificates(false);
    const c = certs.find(item => item.id === id);
    if (!c) return;

    editingCertId = id;
    form.title.value = c.title || '';
    form.issuer.value = c.issuer || '';
    form.issueDate.value = c.issueDate || '';
    form.credentialId.value = c.credentialId || '';
    form.verificationUrl.value = c.verificationUrl || '';
    form.imageUrl.value = c.imageUrl || '';
    form.description.value = c.description || '';
    form.isPublished.checked = !!c.isPublished;
    form.order.value = c.order || 0;

    document.getElementById('cert-modal-title').textContent = 'Edit Certificate';
    bsModal.show();
  };

  window.togglePublishCert = async (id) => {
    const certs = await DataService.getCertificates(false);
    const c = certs.find(item => item.id === id);
    if (!c) return;
    c.isPublished = !c.isPublished;
    await DataService.saveCertificate(c);
    await loadAdminCertificates();
  };

  window.deleteCertPrompt = async (id) => {
    if (confirm('Delete this certificate?')) {
      await DataService.deleteCertificate(id);
      await loadAdminCertificates();
      await refreshDashboardStats();
    }
  };
}

// ============================================================================
// 3. EXPERIENCE MODULE
// ============================================================================
let editingExpId = null;
async function loadAdminExperience() {
  const tableBody = document.getElementById('admin-exp-tbody');
  if (!tableBody) return;

  const exp = await DataService.getExperience(false);
  if (exp.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No experience entries.</td></tr>`;
    return;
  }

  tableBody.innerHTML = exp.map(e => `
    <tr>
      <td class="fw-bold">${escapeHtml(e.role)}</td>
      <td>${escapeHtml(e.company)}</td>
      <td><small class="font-mono">${escapeHtml(e.startDate)} - ${e.isCurrent ? 'Present' : escapeHtml(e.endDate || '')}</small></td>
      <td>
        <span class="${e.isPublished ? 'badge-status-published' : 'badge-status-draft'}">
          ${e.isPublished ? 'Published' : 'Draft'}
        </span>
      </td>
      <td class="text-end">
        <button class="btn-action-icon me-1" onclick="window.editExp('${e.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn-action-icon danger" onclick="window.deleteExpPrompt('${e.id}')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function setupExperienceModal() {
  const form = document.getElementById('exp-form');
  const modalEl = document.getElementById('expModal');
  if (!form || !modalEl) return;

  const bsModal = new bootstrap.Modal(modalEl);

  document.getElementById('btn-add-exp')?.addEventListener('click', () => {
    editingExpId = null;
    form.reset();
    document.getElementById('exp-modal-title').textContent = 'Add Work Experience';
    bsModal.show();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const item = {
      id: editingExpId,
      role: form.role.value.trim(),
      company: form.company.value.trim(),
      location: form.location.value.trim(),
      employmentType: form.employmentType.value,
      startDate: form.startDate.value.trim(),
      endDate: form.endDate.value.trim(),
      isCurrent: form.isCurrent.checked,
      description: form.description.value.trim(),
      technologies: form.technologies.value.trim(),
      isPublished: form.isPublished.checked,
      order: parseInt(form.order.value, 10) || 0
    };

    await DataService.saveExperience(item);
    bsModal.hide();
    await loadAdminExperience();
    await refreshDashboardStats();
  });

  window.editExp = async (id) => {
    const list = await DataService.getExperience(false);
    const item = list.find(e => e.id === id);
    if (!item) return;

    editingExpId = id;
    form.role.value = item.role || '';
    form.company.value = item.company || '';
    form.location.value = item.location || '';
    form.employmentType.value = item.employmentType || 'Full-time';
    form.startDate.value = item.startDate || '';
    form.endDate.value = item.endDate || '';
    form.isCurrent.checked = !!item.isCurrent;
    form.description.value = item.description || '';
    form.technologies.value = item.technologies || '';
    form.isPublished.checked = !!item.isPublished;
    form.order.value = item.order || 0;

    document.getElementById('exp-modal-title').textContent = 'Edit Experience';
    bsModal.show();
  };

  window.deleteExpPrompt = async (id) => {
    if (confirm('Delete this experience item?')) {
      await DataService.deleteExperience(id);
      await loadAdminExperience();
      await refreshDashboardStats();
    }
  };
}

// ============================================================================
// 4. SKILLS MODULE
// ============================================================================
let editingSkillId = null;
async function loadAdminSkills() {
  const tableBody = document.getElementById('admin-skills-tbody');
  if (!tableBody) return;

  const skills = await DataService.getSkills(false);
  tableBody.innerHTML = skills.map(s => `
    <tr>
      <td class="fw-bold"><i class="bi ${escapeHtml(s.iconClass || 'bi-code')} me-2 text-cyan"></i>${escapeHtml(s.name)}</td>
      <td><span class="badge bg-dark border border-secondary">${escapeHtml(s.category)}</span></td>
      <td><code>${escapeHtml(s.iconClass || '')}</code></td>
      <td>
        <span class="${s.isPublished ? 'badge-status-published' : 'badge-status-draft'}">
          ${s.isPublished ? 'Published' : 'Hidden'}
        </span>
      </td>
      <td class="text-end">
        <button class="btn-action-icon danger" onclick="window.deleteSkillPrompt('${s.id}')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function setupSkillModal() {
  const form = document.getElementById('skill-form');
  const modalEl = document.getElementById('skillModal');
  if (!form || !modalEl) return;

  const bsModal = new bootstrap.Modal(modalEl);

  document.getElementById('btn-add-skill')?.addEventListener('click', () => {
    editingSkillId = null;
    form.reset();
    bsModal.show();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const item = {
      id: editingSkillId,
      name: form.name.value.trim(),
      category: form.category.value,
      iconClass: form.iconClass.value.trim() || 'bi-code-square',
      isPublished: form.isPublished.checked,
      order: parseInt(form.order.value, 10) || 0
    };

    await DataService.saveSkill(item);
    bsModal.hide();
    await loadAdminSkills();
    await refreshDashboardStats();
  });

  window.deleteSkillPrompt = async (id) => {
    if (confirm('Delete this skill?')) {
      await DataService.deleteSkill(id);
      await loadAdminSkills();
      await refreshDashboardStats();
    }
  };
}

// ============================================================================
// 5. EDUCATION MODULE
// ============================================================================
let editingEduId = null;
async function loadAdminEducation() {
  const tableBody = document.getElementById('admin-edu-tbody');
  if (!tableBody) return;

  const edu = await DataService.getEducation(false);
  tableBody.innerHTML = edu.map(item => `
    <tr>
      <td class="fw-bold">${escapeHtml(item.degree)} in ${escapeHtml(item.fieldOfStudy)}</td>
      <td>${escapeHtml(item.institution)}</td>
      <td><small class="font-mono">${escapeHtml(item.startDate)} - ${escapeHtml(item.endDate || '')}</small></td>
      <td class="text-end">
        <button class="btn-action-icon danger" onclick="window.deleteEduPrompt('${item.id}')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function setupEducationModal() {
  const form = document.getElementById('edu-form');
  const modalEl = document.getElementById('eduModal');
  if (!form || !modalEl) return;

  const bsModal = new bootstrap.Modal(modalEl);

  document.getElementById('btn-add-edu')?.addEventListener('click', () => {
    editingEduId = null;
    form.reset();
    bsModal.show();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const item = {
      id: editingEduId,
      institution: form.institution.value.trim(),
      degree: form.degree.value.trim(),
      fieldOfStudy: form.fieldOfStudy.value.trim(),
      startDate: form.startDate.value.trim(),
      endDate: form.endDate.value.trim(),
      description: form.description.value.trim(),
      isPublished: form.isPublished.checked,
      order: parseInt(form.order.value, 10) || 0
    };

    await DataService.saveEducation(item);
    bsModal.hide();
    await loadAdminEducation();
  });

  window.deleteEduPrompt = async (id) => {
    if (confirm('Delete this education entry?')) {
      await DataService.deleteEducation(id);
      await loadAdminEducation();
    }
  };
}

// ============================================================================
// 6. PROFILE & SETTINGS MODULE
// ============================================================================
async function loadAdminProfile() {
  const form = document.getElementById('admin-profile-form');
  if (!form) return;

  const profile = await DataService.getProfile();
  form.displayName.value = profile.displayName || '';
  form.title.value = profile.title || '';
  form.heroSubtitle.value = profile.heroSubtitle || '';
  form.about.value = profile.about || '';
  form.email.value = profile.email || '';
  form.phone.value = profile.phone || '';
  form.location.value = profile.location || '';
  form.github.value = profile.github || '';
  form.linkedin.value = profile.linkedin || '';
  form.kaggle.value = profile.kaggle || '';
  form.avatarUrl.value = profile.avatarUrl || '/assets/aistudio/parth_4b9116ca.jpeg';
  form.resumeUrl.value = profile.resumeUrl || '';
  form.footerText.value = profile.footerText || '';

  const avatarPreview = document.getElementById('admin-profile-avatar-preview');
  if (avatarPreview && form.avatarUrl.value) {
    avatarPreview.src = form.avatarUrl.value;
  }
}

function setupProfileForm() {
  const form = document.getElementById('admin-profile-form');
  const alertBox = document.getElementById('profile-save-alert');
  if (!form) return;

  const avatarInput = document.getElementById('admin-profile-avatarUrl');
  const avatarPreview = document.getElementById('admin-profile-avatar-preview');
  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener('input', () => {
      if (avatarInput.value.trim()) {
        avatarPreview.src = avatarInput.value.trim();
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const updated = {
      displayName: form.displayName.value.trim(),
      title: form.title.value.trim(),
      heroSubtitle: form.heroSubtitle.value.trim(),
      about: form.about.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      location: form.location.value.trim(),
      github: form.github.value.trim(),
      linkedin: form.linkedin.value.trim(),
      kaggle: form.kaggle.value.trim(),
      avatarUrl: form.avatarUrl.value.trim() || '/assets/aistudio/parth_4b9116ca.jpeg',
      resumeUrl: form.resumeUrl.value.trim(),
      footerText: form.footerText.value.trim()
    };

    await DataService.updateProfile(updated);
    if (alertBox) {
      alertBox.className = 'alert alert-success mt-3 py-2 text-sm';
      alertBox.textContent = 'Profile settings successfully updated and synchronized!';
      alertBox.classList.remove('d-none');
      setTimeout(() => alertBox.classList.add('d-none'), 4000);
    }
  });
}

// ============================================================================
// 7. CONTACT MESSAGES MODULE
// ============================================================================
async function loadAdminMessages() {
  const container = document.getElementById('admin-messages-list');
  if (!container) return;

  const msgs = await DataService.getContactMessages();
  if (msgs.length === 0) {
    container.innerHTML = `<div class="text-center py-5 text-muted">No messages received yet.</div>`;
    return;
  }

  container.innerHTML = msgs.map(m => `
    <div class="admin-card p-3 mb-3 border ${m.status === 'new' ? 'border-info' : 'border-secondary'}">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h5 class="h6 mb-1 text-white fw-bold">${escapeHtml(m.name)} <small class="text-muted">(${escapeHtml(m.email)})</small></h5>
          <div class="text-cyan text-xs font-mono">Subject: ${escapeHtml(m.subject)} · Received: ${escapeHtml(m.createdAt)}</div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <select class="form-select form-select-sm bg-dark text-white border-secondary" style="width: 120px;" onchange="window.changeMsgStatus('${m.id}', this.value)">
            <option value="new" ${m.status === 'new' ? 'selected' : ''}>New</option>
            <option value="read" ${m.status === 'read' ? 'selected' : ''}>Read</option>
            <option value="archived" ${m.status === 'archived' ? 'selected' : ''}>Archived</option>
          </select>
          <button class="btn-action-icon danger" onclick="window.deleteMsgPrompt('${m.id}')" title="Delete Message">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <p class="text-muted-custom text-sm mb-0 bg-dark p-3 rounded">${escapeHtml(m.message)}</p>
    </div>
  `).join('');

  window.changeMsgStatus = async (id, status) => {
    await DataService.updateMessageStatus(id, status);
    await refreshDashboardStats();
  };

  window.deleteMsgPrompt = async (id) => {
    if (confirm('Delete this message?')) {
      await DataService.deleteContactMessage(id);
      await loadAdminMessages();
      await refreshDashboardStats();
    }
  };
}

// Global Demo Reset
window.resetAllDemoData = () => {
  if (confirm('Reset all portfolio content to default demo data for Bhautik Vekariya? Any custom changes will be overwritten.')) {
    DataService.resetDefaults();
    window.location.reload();
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
