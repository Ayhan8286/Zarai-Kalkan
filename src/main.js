// ============================================
// ZARAI KALKAN — Main Entry Point
// App bootstrap, layout rendering, router init
// ============================================

import './styles/index.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/rtl.css';

import store from './store.js';
import { initLanguage, t } from './i18n.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { setupRouter, router } from './router.js';
import { users, farmerTransactions, shopkeeperTransactions, womenTransactions, khataCustomers, insurancePolicies, insuranceClaims, weatherData, donationCampaigns, donations, marketplaceProducts, lessons, notifications } from './mock-data.js';

// Make router globally accessible for header profile click
window.router = router;

// Initialize language
initLanguage();

// Track if router is already initialized
let routerInitialized = false;

// Render full app layout
function renderApp() {
  const app = document.getElementById('app');
  const state = store.getState();

  // If no role selected, show landing page (no sidebar/header)
  if (!state.currentRole) {
    app.className = '';
    app.innerHTML = '<div id="page-content" class="page-content" style="margin:0; max-width:100%; padding:0;"></div>';
    
    if (!routerInitialized) {
      setupRouter();
      routerInitialized = true;
    }
    
    // Only navigate to '/' if we are not already at the root path to prevent interrupting loadPage
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && currentPath !== '') {
      router.navigate('/');
    }
    return;
  }

  // Full layout with sidebar + header
  app.className = 'app-layout';
  app.innerHTML = `
    <aside class="sidebar" id="sidebar"></aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <main class="main-content">
      <header class="header" id="header"></header>
      <div id="page-content" class="page-content"></div>
    </main>
  `;

  // Render sidebar
  renderSidebar(document.getElementById('sidebar'));

  // Render header
  renderHeader(document.getElementById('header'));

  // Sidebar overlay (mobile close)
  document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('active');
  });

  // Setup router if not initialized
  if (!routerInitialized) {
    setupRouter();
    routerInitialized = true;
  }
}

// Make renderApp globally accessible for language switch re-render
window.renderApp = renderApp;

// Handle role selection from landing page
window.selectRole = function(role) {
  const userMap = {
    farmer: users.farmer,
    shopkeeper: users.shopkeeper,
    women: users.women,
    ngo: users.ngo,
    admin: users.admin,
  };

  const user = userMap[role];

  // Set up mock data based on role
  let txns = farmerTransactions;
  if (role === 'shopkeeper') txns = shopkeeperTransactions;
  if (role === 'women') txns = womenTransactions;

  store.setState({
    currentRole: role,
    currentUser: user,
    transactions: [...txns],
    customers: [...khataCustomers],
    insurancePolicies: [...insurancePolicies],
    insuranceClaims: [...insuranceClaims],
    donationCampaigns: [...donationCampaigns],
    donations: [...donations],
    products: [...marketplaceProducts],
    lessons: [...lessons],
    completedLessons: ['les_1', 'les_3'],
    notifications: [...notifications],
    weatherAlerts: [...weatherData.alerts],
  });

  // Re-render full app with sidebar
  renderApp();

  // Navigate to appropriate dashboard
  const dashPaths = {
    farmer: '/farmer-dashboard',
    shopkeeper: '/shopkeeper-dashboard',
    women: '/women-dashboard',
    ngo: '/ngo-dashboard',
    admin: '/admin-dashboard',
  };
  router.navigate(dashPaths[role] || '/farmer-dashboard');
};

// Initial render
renderApp();
