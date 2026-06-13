// ============================================
// ZARAI KALKAN — Header Component
// Top header with search, notifications, language, profile
// ============================================

import store from '../store.js';
import { t, setLanguage, languages, getCurrentLang } from '../i18n.js';
import { icons, getRelativeTime } from '../utils/helpers.js';
import { notifications as mockNotifications } from '../mock-data.js';

export function renderHeader(container) {
  const state = store.getState();
  const user = state.currentUser || {};
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  container.innerHTML = `
    <button class="header-menu-btn" id="header-menu-btn">
      ${icons.menu}
    </button>

    <div class="header-search">
      <span class="header-search-icon">${icons.search}</span>
      <input type="text" class="header-search-input" placeholder="${t('searchPlaceholder')}" id="header-search" />
    </div>

    <div class="header-actions">
      <!-- Notifications -->
      <div class="dropdown" id="notification-dropdown">
        <button class="header-action-btn" id="notification-btn" title="${t('notifications')}">
          ${icons.bell}
          ${unreadCount > 0 ? '<span class="notification-dot"></span>' : ''}
        </button>
      </div>

      <!-- Language -->
      <div class="dropdown" id="language-dropdown">
        <button class="header-action-btn" id="language-btn" title="${t('language')}">
          ${icons.globe}
        </button>
      </div>

      <div class="header-divider"></div>

      <!-- Profile -->
      <div class="header-profile" id="header-profile">
        <div class="header-profile-avatar">${user.avatar || 'ZK'}</div>
        <div class="header-profile-info">
          <span class="header-profile-name">${user.name || 'User'}</span>
          <span class="header-profile-role">${user.accountType || 'Guest'}</span>
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  attachHeaderEvents();
}

function attachHeaderEvents() {
  // Mobile menu toggle
  const menuBtn = document.getElementById('header-menu-btn');
  menuBtn?.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('active');
  });

  // Notification dropdown
  const notifBtn = document.getElementById('notification-btn');
  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLangMenu();
    toggleNotificationPanel();
  });

  // Language dropdown
  const langBtn = document.getElementById('language-btn');
  langBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeNotifPanel();
    toggleLanguageMenu();
  });

  // Profile click -> settings
  const profileEl = document.getElementById('header-profile');
  profileEl?.addEventListener('click', () => {
    window.router?.navigate('/settings');
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    closeNotifPanel();
    closeLangMenu();
  });
}

function toggleNotificationPanel() {
  const dropdown = document.getElementById('notification-dropdown');
  const existing = dropdown.querySelector('.notification-panel');
  if (existing) {
    existing.remove();
    return;
  }

  const panel = document.createElement('div');
  panel.className = 'notification-panel';
  panel.innerHTML = `
    <div class="notification-panel-header">
      <span style="font-weight: var(--font-semibold); font-size: var(--text-base);">${t('notifications')}</span>
      <span style="font-size: var(--text-xs); color: var(--color-primary); cursor: pointer;">Mark all read</span>
    </div>
    ${mockNotifications.map(n => `
      <div class="notification-item ${n.read ? '' : 'unread'}">
        ${!n.read ? '<div class="notification-dot-indicator"></div>' : '<div style="width:8px"></div>'}
        <div class="notification-content">
          <div class="notification-text"><strong>${n.title}</strong> — ${n.message}</div>
          <div class="notification-time">${getRelativeTime(n.time)}</div>
        </div>
      </div>
    `).join('')}
  `;

  panel.addEventListener('click', (e) => e.stopPropagation());
  dropdown.appendChild(panel);
}

function closeNotifPanel() {
  document.querySelector('.notification-panel')?.remove();
}

function toggleLanguageMenu() {
  const dropdown = document.getElementById('language-dropdown');
  const existing = dropdown.querySelector('.lang-dropdown-menu');
  if (existing) {
    existing.remove();
    return;
  }

  const currentLang = getCurrentLang();
  const menu = document.createElement('div');
  menu.className = 'lang-dropdown-menu';
  menu.innerHTML = languages.map(lang => `
    <button class="lang-option ${lang.code === currentLang ? 'active' : ''}" data-lang="${lang.code}">
      <span>${lang.flag}</span>
      <span>${lang.nativeName}</span>
      <span style="color: var(--color-text-muted); font-size: var(--text-xs);">${lang.name}</span>
    </button>
  `).join('');

  menu.addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.target.closest('.lang-option');
    if (btn) {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      closeLangMenu();
      // Re-render the entire app with new language
      if (window.renderApp) window.renderApp();
    }
  });

  dropdown.appendChild(menu);
}

function closeLangMenu() {
  document.querySelector('.lang-dropdown-menu')?.remove();
}

export default { renderHeader };
