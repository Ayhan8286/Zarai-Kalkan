// ============================================
// ZARAI KALKAN — Settings & Profile Page
// ============================================

import store from '../store.js';
import { setLanguage, getCurrentLang, languages } from '../i18n.js';
import { showToast } from '../components/toast.js';
import { t } from '../i18n.js';

export default function settingsPage(container) {
  function render() {
    const state = store.getState();
    const currentUser = state.currentUser || {};
    const currentLang = getCurrentLang();

    container.innerHTML = `
      <div class="settings-page animate-fade-in" style="max-width: 680px; margin: 0 auto;">
        <!-- Page Header -->
        <div class="mb-6 text-center">
          <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navSettings') || 'Settings & Profile'}</h2>
          <p class="text-xs text-muted">Update your rural business card profile, change language, or switch user accounts roles.</p>
        </div>

        <!-- Language Selection Card -->
        <div class="card mb-6" style="padding: var(--space-5);">
          <h3 class="font-bold mb-3" style="font-size: var(--text-sm);">App Display Language</h3>
          <p class="text-xs text-muted mb-4">Choose your preferred local Pakistani regional language. The interface direction will adjust automatically.</p>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            ${languages.map(lang => {
              const isActive = lang.code === currentLang;
              return `
                <button class="btn ${isActive ? 'btn-primary' : 'btn-secondary'} lang-selection-btn" data-lang="${lang.code}" style="justify-content: flex-start; gap: 12px; height: 50px; font-size: var(--text-sm);">
                  <span style="font-size: 1.4rem;">${lang.flag}</span>
                  <div style="text-align: start;">
                    <div><strong>${lang.nativeName}</strong></div>
                    <div class="text-xs ${isActive ? '' : 'text-muted'}" style="font-size: 10px; opacity: 0.9;">${lang.name}</div>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Personal Info Form Card -->
        <div class="card mb-6" style="padding: var(--space-5);">
          <h3 class="font-bold mb-4" style="font-size: var(--text-sm);">Profile & Business Card Card</h3>
          <form id="settings-profile-form">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="profile-name" value="${currentUser.name || ''}" required>
            </div>
            
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-input" id="profile-phone" value="${currentUser.phone || ''}" required>
            </div>

            <div class="form-group">
              <label class="form-label">Village / City Location</label>
              <input type="text" class="form-input" id="profile-village" value="${currentUser.village || ''}" required>
            </div>

            ${state.currentRole === 'shopkeeper' || state.currentRole === 'women' ? `
              <div class="form-group">
                <label class="form-label">Business / Shop Name</label>
                <input type="text" class="form-input" id="profile-business" value="${currentUser.businessName || ''}" required>
              </div>
            ` : ''}

            <button type="submit" class="btn btn-primary btn-block mt-2">Save Profile Updates</button>
          </form>
        </div>

        <!-- System Account Control Card -->
        <div class="card mb-6" style="padding: var(--space-5);">
          <h3 class="font-bold mb-2" style="font-size: var(--text-sm);">System Account Access</h3>
          <p class="text-xs text-muted mb-4">You are currently logged in as a <strong>${state.currentRole?.toUpperCase()}</strong> user.</p>
          
          <div class="flex justify-between items-center" style="background: var(--color-bg); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md);">
            <div class="text-xs text-muted">To switch to another profile dashboard:</div>
            <button class="btn btn-danger btn-sm" id="btn-logout-role">Change User Role Profile</button>
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    container.querySelectorAll('.lang-selection-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-lang');
        setLanguage(code);
        showToast('Language updated successfully!', 'success');
        
        // Re-render full app layout (to flip direction)
        if (window.renderApp) {
          window.renderApp();
          // We must navigate back to settings after layout re-render
          window.router.navigate('/settings');
        }
      });
    });

    document.getElementById('settings-profile-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('profile-name').value;
      const phone = document.getElementById('profile-phone').value;
      const village = document.getElementById('profile-village').value;
      
      const updates = { name, phone, village };
      
      const busInput = document.getElementById('profile-business');
      if (busInput) {
        updates.businessName = busInput.value;
      }

      store.setState({
        currentUser: {
          ...currentUser,
          ...updates
        }
      });

      showToast('Profile credentials saved successfully!', 'success');
      render();
    });

    document.getElementById('btn-logout-role').addEventListener('click', () => {
      // Clear role state and log out
      store.setState({
        currentRole: null,
        currentUser: null
      });
      showToast('Logged out of role profile', 'info');
      
      if (window.renderApp) {
        window.renderApp();
      }
    });
  }

  render();
}
