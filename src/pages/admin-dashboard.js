// ============================================
// ZARAI KALKAN — Admin Dashboard Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { formatCurrency, generateId, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function adminDashboardPage(container) {
  let activeTab = 'users'; // 'users', 'campaigns', 'listings', 'alerts'

  // Mock list of platform users
  let platformUsers = [
    { id: 'u_1', name: 'Ahmed Khan', role: 'Farmer', location: 'Chak 57, Bahawalpur', phone: '0301-2345678', status: 'Active' },
    { id: 'u_2', name: 'Muhammad Aslam', role: 'Shopkeeper', location: 'Multan', phone: '0302-9876543', status: 'Active' },
    { id: 'u_3', name: 'Ayesha Bibi', role: 'Women Entrepreneur', location: 'Rahim Yar Khan', phone: '0303-1112233', status: 'Active' },
    { id: 'u_4', name: 'Al Noor NGO', role: 'NGO / Welfare', location: 'Lahore', phone: '042-35781234', status: 'Active' },
    { id: 'u_5', name: 'Khalid Mahmood', role: 'District Advisor', location: 'Bahawalpur', phone: '0305-5556677', status: 'Active' }
  ];

  function render() {
    const state = store.getState();
    const campaigns = state.donationCampaigns || [];
    const products = state.products || [];
    const alerts = state.weatherAlerts || [];

    // Stats
    const totalUsers = platformUsers.length + 3120; // Simulating active base
    const totalVol = 4850000; // Simulated txn volume in Rs.
    const activeListings = products.length;
    const systemAlerts = alerts.length;

    let tabContent = '';
    if (activeTab === 'users') {
      tabContent = renderUsersTable();
    } else if (activeTab === 'campaigns') {
      tabContent = renderCampaignsTable(campaigns);
    } else if (activeTab === 'listings') {
      tabContent = renderListingsTable(products);
    } else if (activeTab === 'alerts') {
      tabContent = renderAlertsCreator(alerts);
    }

    container.innerHTML = `
      <div class="admin-page animate-fade-in">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">Platform Administrator Console</h2>
            <p class="text-xs text-muted">Monitor Pakistan rural users registration activity, moderate listings, audit NGO payouts, and issue weather emergency alerts.</p>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          ${renderStatsCard('Platform Registered Users', totalUsers.toLocaleString(), '', 'blue', 'users')}
          ${renderStatsCard('Financial Volume Logged', formatCurrency(totalVol), '', 'green', 'trendingUp', 'positive')}
          ${renderStatsCard('Marketplace Listings', activeListings, '', 'amber', 'package')}
          ${renderStatsCard('System Warnings Active', systemAlerts, '', 'red', 'shield', 'negative')}
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button class="tab ${activeTab === 'users' ? 'active' : ''}" id="admin-tab-users">User Directory</button>
          <button class="tab ${activeTab === 'campaigns' ? 'active' : ''}" id="admin-tab-campaigns">NGO Campaigns Audit</button>
          <button class="tab ${activeTab === 'listings' ? 'active' : ''}" id="admin-tab-listings">Moderate Marketplace</button>
          <button class="tab ${activeTab === 'alerts' ? 'active' : ''}" id="admin-tab-alerts">Publish Warning Alert</button>
        </div>

        <!-- Tab content panel -->
        <div id="admin-tab-panel">
          ${tabContent}
        </div>
      </div>
    `;

    // Tab Event Listeners
    document.getElementById('admin-tab-users').addEventListener('click', () => { activeTab = 'users'; render(); });
    document.getElementById('admin-tab-campaigns').addEventListener('click', () => { activeTab = 'campaigns'; render(); });
    document.getElementById('admin-tab-listings').addEventListener('click', () => { activeTab = 'listings'; render(); });
    document.getElementById('admin-tab-alerts').addEventListener('click', () => { activeTab = 'alerts'; render(); });

    // Inner tab event bindings
    if (activeTab === 'users') {
      container.querySelectorAll('.toggle-user-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          platformUsers = platformUsers.map(u => {
            if (u.id === id) {
              const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
              showToast(`User ${u.name} status set to ${nextStatus}`, nextStatus === 'Active' ? 'success' : 'error');
              return { ...u, status: nextStatus };
            }
            return u;
          });
          render();
        });
      });
    } else if (activeTab === 'campaigns') {
      container.querySelectorAll('.archive-camp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          // Update in store
          const updated = state.donationCampaigns.filter(c => c.id !== id);
          store.setState({ donationCampaigns: updated });
          showToast('Campaign archived successfully', 'info');
          render();
        });
      });
    } else if (activeTab === 'listings') {
      container.querySelectorAll('.delete-listing-admin-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          store.removeFromArray('products', id);
          showToast('Product listing deleted by moderator', 'success');
          render();
        });
      });
    } else if (activeTab === 'alerts') {
      document.getElementById('admin-alert-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('alert-title').value;
        const level = document.getElementById('alert-level').value;
        const desc = document.getElementById('alert-desc').value;

        const newAlert = {
          id: generateId(),
          date: new Date().toISOString().split('T')[0],
          title,
          level,
          description: desc,
          tips: ['Check advisory details on Weather screen', 'Consult district officers for emergency rescue']
        };

        store.addToArray('weatherAlerts', newAlert);
        showToast('System emergency advisory warning alert published!', 'success');
        
        // Reset form inputs
        document.getElementById('alert-title').value = '';
        document.getElementById('alert-desc').value = '';
        render();
      });
    }
  }

  function renderUsersTable() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-header-title">Platform Users Directory</h3>
        </div>
        <div class="card-body-full">
          ${renderDataTable(
            [
              { key: 'name', label: 'User Name', render: r => `<strong>${r.name}</strong>` },
              { key: 'role', label: 'Assigned Role', render: r => renderBadge(r.role, 'primary') },
              { key: 'location', label: 'Location' },
              { key: 'phone', label: 'Phone' },
              { key: 'status', label: 'System Access', render: r => {
                  const type = r.status === 'Active' ? 'success' : 'danger';
                  return renderBadge(r.status, type);
                }
              },
              { key: 'actions', label: 'Mod Action', style: 'text-align: center; width: 140px;', render: r => `
                  <button class="btn btn-outline btn-sm toggle-user-btn" data-id="${r.id}">
                    ${r.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                `
              }
            ],
            platformUsers
          )}
        </div>
      </div>
    `;
  }

  function renderCampaignsTable(campaigns) {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-header-title">NGO Crowdfunding Campaigns Audit</h3>
        </div>
        <div class="card-body-full">
          ${renderDataTable(
            [
              { key: 'title', label: 'Campaign Title', render: r => `<strong>${r.title}</strong>` },
              { key: 'location', label: 'District' },
              { key: 'category', label: 'Type', render: r => renderBadge(r.category, 'neutral') },
              { key: 'progress', label: 'Funding Progress', render: r => `${formatCurrency(r.amountRaised)} / ${formatCurrency(r.amountNeeded)}` },
              { key: 'actions', label: 'Moderation', style: 'text-align: center; width: 100px;', render: r => `
                  <button class="btn btn-danger btn-sm archive-camp-btn" data-id="${r.id}">Archive</button>
                `
              }
            ],
            campaigns
          )}
        </div>
      </div>
    `;
  }

  function renderListingsTable(products) {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-header-title">Moderate Hub Marketplace Listings</h3>
        </div>
        <div class="card-body-full">
          ${renderDataTable(
            [
              { key: 'title', label: 'Product Title', render: r => `<strong>${r.title}</strong>` },
              { key: 'category', label: 'Category', render: r => renderBadge(r.category, 'neutral') },
              { key: 'price', label: 'Price', render: r => `${formatCurrency(r.price)} / ${r.unit}` },
              { key: 'sellerName', label: 'Seller Partner' },
              { key: 'location', label: 'Location' },
              { key: 'actions', label: 'Moderation', style: 'text-align: center; width: 100px;', render: r => `
                  <button class="btn btn-danger btn-sm delete-listing-admin-btn" data-id="${r.id}">Delete</button>
                `
              }
            ],
            products
          )}
        </div>
      </div>
    `;
  }

  function renderAlertsCreator(alerts) {
    return `
      <div class="grid grid-cols-3 gap-6">
        <!-- Alert Creation Form -->
        <div class="card col-span-1" style="padding: var(--space-5);">
          <h4 class="font-bold mb-4" style="font-size: var(--text-sm);">Publish New Emergency Advisory</h4>
          <form id="admin-alert-form">
            <div class="form-group">
              <label class="form-label">Alert Header Title</label>
              <input type="text" class="form-input" id="alert-title" placeholder="e.g. Heavy Locust Swarm Warning" required>
            </div>
            <div class="form-group">
              <label class="form-label">Risk Severity Level</label>
              <select class="form-select" id="alert-level">
                <option value="green">🟢 Green (Safe / Normal Agronomic Condition)</option>
                <option value="yellow">🟡 Yellow (Moderate Risk Weather Alert)</option>
                <option value="red">🔴 Red (High Emergency Pest/Flood Danger)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Advisory Advisory Warnings Text</label>
              <textarea class="form-textarea" id="alert-desc" placeholder="Irrigation recommendation, spray times, safety coordinates..." required></textarea>
            </div>
            <button type="submit" class="btn btn-danger btn-block mt-2">Publish System Alert</button>
          </form>
        </div>

        <!-- Alert Warnings Board list -->
        <div class="card col-span-2">
          <div class="card-header">
            <h3 class="card-header-title">System-wide Alerts Active Board</h3>
          </div>
          <div class="card-body-full">
            ${renderDataTable(
              [
                { key: 'date', label: 'Date Issued', render: r => formatDate(r.date) },
                { key: 'title', label: 'Alert Title', render: r => `<strong>${r.title}</strong>` },
                { key: 'level', label: 'Severity', render: r => {
                    const type = r.level === 'green' ? 'success' : (r.level === 'red' ? 'danger' : 'warning');
                    return renderBadge(r.level.toUpperCase(), type);
                  }
                },
                { key: 'description', label: 'Advisory Message', render: r => `<span class="truncate" style="max-width: 280px; display: inline-block;">${r.description}</span>` }
              ],
              alerts
            )}
          </div>
        </div>
      </div>
    `;
  }

  // Initial render
  render();
}
