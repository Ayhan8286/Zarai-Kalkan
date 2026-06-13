// ============================================
// ZARAI KALKAN — Sidebar Component
// Navigation sidebar with role-based menu
// ============================================

import store from '../store.js';
import { t } from '../i18n.js';
import { icons } from '../utils/helpers.js';

// Get menu items based on role
function getMenuItems(role) {
  const common = [
    { section: t('sectionMain') },
    { id: 'dashboard', label: t('navDashboard'), icon: icons.home, path: getDashboardPath(role) },
  ];

  const finance = [
    { section: t('sectionFinance') },
    { id: 'accounting', label: t('navAccounting'), icon: icons.book, path: '/accounting' },
    { id: 'khata', label: t('navKhataBook'), icon: icons.creditCard, path: '/khata-book' },
    { id: 'reports', label: t('navReports'), icon: icons.barChart, path: '/reports' },
  ];

  const protection = [
    { section: t('sectionProtection') },
    { id: 'insurance', label: t('navInsurance'), icon: icons.shield, path: '/insurance' },
    { id: 'weather', label: t('navWeather'), icon: icons.cloud, path: '/weather', badge: '2' },
    { id: 'loans', label: t('navLoans'), icon: icons.landmark, path: '/loans' },
  ];

  const community = [
    { section: t('sectionCommunity') },
    { id: 'donations', label: t('navSupport'), icon: icons.heart, path: '/donations' },
    { id: 'marketplace', label: t('navMarketplace'), icon: icons.store, path: '/marketplace' },
    { id: 'knowledge', label: t('navKnowledge'), icon: icons.graduationCap, path: '/knowledge-center' },
  ];

  const system = [
    { section: t('sectionSystem') },
    { id: 'sms', label: t('navSMS'), icon: icons.phone, path: '/sms-demo' },
    { id: 'settings', label: t('navSettings'), icon: icons.settings, path: '/settings' },
  ];

  switch (role) {
    case 'farmer':
      return [...common, ...finance, ...protection, ...community, ...system];
    case 'shopkeeper':
      return [...common, ...finance, ...protection, ...community, ...system];
    case 'women':
      return [...common, ...finance, ...protection, ...community, ...system];
    case 'ngo':
      return [
        { section: t('sectionMain') },
        { id: 'dashboard', label: t('navDashboard'), icon: icons.home, path: '/ngo-dashboard' },
        ...protection,
        ...community,
        ...system,
      ];
    case 'admin':
      return [
        { section: t('sectionMain') },
        { id: 'dashboard', label: t('navDashboard'), icon: icons.home, path: '/admin-dashboard' },
        { id: 'admin', label: t('navAdmin'), icon: icons.users, path: '/admin-dashboard' },
        ...finance,
        ...protection,
        ...community,
        ...system,
      ];
    default:
      return [...common, ...finance, ...protection, ...community, ...system];
  }
}

function getDashboardPath(role) {
  switch (role) {
    case 'farmer': return '/farmer-dashboard';
    case 'shopkeeper': return '/shopkeeper-dashboard';
    case 'women': return '/women-dashboard';
    case 'ngo': return '/ngo-dashboard';
    case 'admin': return '/admin-dashboard';
    default: return '/farmer-dashboard';
  }
}

export function renderSidebar(container) {
  const state = store.getState();
  const role = state.currentRole || 'farmer';
  const user = state.currentUser || {};
  const menuItems = getMenuItems(role);
  const currentPath = state.currentPage || '/';

  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="sidebar-logo-icon">
    <path d="M32 4 L56 16 L56 36 Q56 52 32 60 Q8 52 8 36 L8 16 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
    <path d="M32 8 L52 18 L52 35 Q52 49 32 56 Q12 49 12 35 L12 18 Z" fill="#4CAF50" opacity="0.3"/>
    <ellipse cx="32" cy="20" rx="3.5" ry="7" fill="#F9A825"/>
    <ellipse cx="26" cy="24" rx="3" ry="6" fill="#F9A825" transform="rotate(-15 26 24)"/>
    <ellipse cx="38" cy="24" rx="3" ry="6" fill="#F9A825" transform="rotate(15 38 24)"/>
    <line x1="32" y1="20" x2="32" y2="48" stroke="#8D6E63" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 36 Q26 32 24 36" fill="none" stroke="#2E7D32" stroke-width="1.5"/>
    <path d="M32 36 Q38 32 40 36" fill="none" stroke="#2E7D32" stroke-width="1.5"/>
  </svg>`;

  let menuHtml = '';
  menuItems.forEach(item => {
    if (item.section) {
      menuHtml += `<div class="sidebar-section-label">${item.section}</div>`;
    } else {
      const isActive = currentPath === item.path ||
        (item.path !== '/' && currentPath.startsWith(item.path));
      menuHtml += `
        <a href="${item.path}" class="nav-item ${isActive ? 'active' : ''}" data-navigo data-nav-id="${item.id}">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
          ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
        </a>
      `;
    }
  });

  container.innerHTML = `
    <div class="sidebar-logo">
      ${logoSvg}
      <div class="sidebar-logo-text">
        <span class="sidebar-logo-title">${t('appName')}</span>
        <span class="sidebar-logo-subtitle">${t('appTagline')}</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      ${menuHtml}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="sidebar-user-avatar">${user.avatar || 'ZK'}</div>
        <div class="sidebar-user-info">
          <span class="sidebar-user-name">${user.name || 'User'}</span>
          <span class="sidebar-user-role">${user.accountType || 'Guest'}</span>
        </div>
      </div>
    </div>
  `;
}

export function updateSidebarActive(path) {
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    const isActive = path === href || (href !== '/' && path.startsWith(href));
    item.classList.toggle('active', isActive);
  });
}

export default { renderSidebar, updateSidebarActive };
