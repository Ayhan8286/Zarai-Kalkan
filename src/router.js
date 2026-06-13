// ============================================
// ZARAI KALKAN — Router Configuration
// SPA routing with Navigo
// ============================================

import Navigo from 'navigo';
import store from './store.js';
import { updateSidebarActive } from './components/sidebar.js';

const router = new Navigo('/');

// Track current page cleanup function
let currentCleanup = null;

// Helper to load a page module and render it
async function loadPage(moduleLoader, pageName) {
  // Run cleanup from previous page
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  const content = document.getElementById('page-content');
  if (!content) return;

  // Show loading
  content.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 400px;">
      <div style="text-align: center;">
        <div class="skeleton" style="width: 48px; height: 48px; border-radius: 50%; margin: 0 auto var(--space-4);"></div>
        <div class="skeleton" style="width: 160px; height: 16px; margin: 0 auto;"></div>
      </div>
    </div>
  `;

  try {
    const module = await moduleLoader();
    const page = module.default || module;
    store.setState({ currentPage: pageName });
    updateSidebarActive(pageName);

    // Render page and capture cleanup if returned
    const cleanup = page(content);
    if (typeof cleanup === 'function') {
      currentCleanup = cleanup;
    }
  } catch (err) {
    console.error(`Failed to load page: ${pageName}`, err);
    content.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3 class="empty-state-title">Page Load Error</h3>
        <p class="empty-state-text">Failed to load this page. Please try again.</p>
        <button class="btn btn-primary mt-4" onclick="location.reload()">Reload</button>
      </div>
    `;
  }
}

export function setupRouter() {
  // Landing / Role Selection
  router.on('/', () => {
    const state = store.getState();
    if (state.currentRole) {
      store.setState({ currentRole: null, currentUser: null });
      if (window.renderApp) {
        window.renderApp();
      }
      loadPage(() => import('./pages/landing.js'), '/');
    } else {
      loadPage(() => import('./pages/landing.js'), '/');
    }
  });

  // Farmer Dashboard
  router.on('/farmer-dashboard', () => {
    loadPage(() => import('./pages/farmer-dashboard.js'), '/farmer-dashboard');
  });

  // Shopkeeper Dashboard
  router.on('/shopkeeper-dashboard', () => {
    loadPage(() => import('./pages/shopkeeper-dashboard.js'), '/shopkeeper-dashboard');
  });

  // Women Entrepreneur Dashboard
  router.on('/women-dashboard', () => {
    loadPage(() => import('./pages/women-dashboard.js'), '/women-dashboard');
  });

  // Accounting
  router.on('/accounting', () => {
    loadPage(() => import('./pages/accounting.js'), '/accounting');
  });

  // Khata Book
  router.on('/khata-book', () => {
    loadPage(() => import('./pages/khata-book.js'), '/khata-book');
  });

  // Reports
  router.on('/reports', () => {
    loadPage(() => import('./pages/reports.js'), '/reports');
  });

  // Insurance
  router.on('/insurance', () => {
    loadPage(() => import('./pages/insurance.js'), '/insurance');
  });

  // Weather & Emergency
  router.on('/weather', () => {
    loadPage(() => import('./pages/weather.js'), '/weather');
  });

  // Loans
  router.on('/loans', () => {
    loadPage(() => import('./pages/loans.js'), '/loans');
  });

  // Donations & Sponsorship
  router.on('/donations', () => {
    loadPage(() => import('./pages/donations.js'), '/donations');
  });

  // Village Business Hub / Marketplace
  router.on('/marketplace', () => {
    loadPage(() => import('./pages/marketplace.js'), '/marketplace');
  });

  // Knowledge Center
  router.on('/knowledge-center', () => {
    loadPage(() => import('./pages/knowledge-center.js'), '/knowledge-center');
  });

  // NGO Dashboard
  router.on('/ngo-dashboard', () => {
    loadPage(() => import('./pages/ngo-dashboard.js'), '/ngo-dashboard');
  });

  // Admin Dashboard
  router.on('/admin-dashboard', () => {
    loadPage(() => import('./pages/admin-dashboard.js'), '/admin-dashboard');
  });

  // SMS Demo
  router.on('/sms-demo', () => {
    loadPage(() => import('./pages/sms-simulation.js'), '/sms-demo');
  });

  // Settings
  router.on('/settings', () => {
    loadPage(() => import('./pages/settings.js'), '/settings');
  });

  // 404
  router.notFound(() => {
    loadPage(() => import('./pages/not-found.js'), '/404');
  });

  router.resolve();
}

export { router };
export default router;
