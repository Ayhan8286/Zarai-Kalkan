// ============================================
// ZARAI KALKAN — NGO Operations Command Centre
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { renderProgressBar } from '../components/progress-bar.js';
import { formatCurrency, formatDate, generateId, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';

export default function ngoDashboard(container) {
  // District status list
  const districts = [
    { name: 'Rajanpur', status: 'red', farmers: 124, women: 34, shopkeepers: 56, pendingRequests: 12, approvedRequests: 15, completedRequests: 38 },
    { name: 'Bahawalpur', status: 'green', farmers: 234, women: 89, shopkeepers: 78, pendingRequests: 5, approvedRequests: 23, completedRequests: 67 },
    { name: 'Multan', status: 'green', farmers: 312, women: 124, shopkeepers: 156, pendingRequests: 8, approvedRequests: 34, completedRequests: 89 },
    { name: 'Tharparkar', status: 'yellow', farmers: 89, women: 45, shopkeepers: 23, pendingRequests: 15, approvedRequests: 28, completedRequests: 21 },
    { name: 'Jacobabad', status: 'red', farmers: 67, women: 23, shopkeepers: 15, pendingRequests: 22, approvedRequests: 12, completedRequests: 8 },
    { name: 'Swat', status: 'green', farmers: 178, women: 56, shopkeepers: 45, pendingRequests: 3, approvedRequests: 18, completedRequests: 42 }
  ];

  // Simulated verification requests
  let verificationRequests = [
    { id: 'req_1', date: '2026-06-12', farmerName: 'Imran Malik', district: 'Rajanpur', category: 'Flood Relief Seed Aid', amount: 35000, status: 'Pending' },
    { id: 'req_2', date: '2026-06-10', farmerName: 'Shazia Bibi', district: 'Tharparkar', category: 'Solar Pump Grant', amount: 80000, status: 'Pending' },
    { id: 'req_3', date: '2026-06-09', farmerName: 'Zahid Ali', district: 'Jacobabad', category: 'Livestock Feeds Purchase', amount: 20000, status: 'Pending' }
  ];

  function render() {
    const state = store.getState();
    const campaigns = state.donationCampaigns || [];

    // Stats
    const pendingVerifications = verificationRequests.filter(r => r.status === 'Pending').length;
    const totalNGOFundsRaised = campaigns.reduce((sum, c) => sum + c.amountRaised, 0);
    const activeCampaignsCount = campaigns.length;
    const verifiedFarmersCount = districts.reduce((sum, d) => sum + d.farmers, 0);

    container.innerHTML = `
      <div class="ngo-page animate-fade-in">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">NGO Command Center (Al Noor Foundation)</h2>
            <p class="text-xs text-muted">Coordinate regional relief operations, audit community crowdfunding transparency, and certify farmer verifications.</p>
          </div>
          <button class="btn btn-primary" id="btn-create-campaign-ngo">
            ${icons.plus || '➕'} Launch Campaign Aid
          </button>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          ${renderStatsCard('Pending Verifications', pendingVerifications, '', 'amber', 'clock')}
          ${renderStatsCard('NGO Funds Disbursed', formatCurrency(totalNGOFundsRaised), '', 'green', 'trendingUp', 'positive')}
          ${renderStatsCard('Registered Farmers', verifiedFarmersCount, '', 'blue', 'users')}
          ${renderStatsCard('Active Campaigns', activeCampaignsCount, '', 'purple', 'fileText')}
        </div>

        <!-- District Risk Status Monitoring Map and Cards Grid -->
        <div class="grid grid-cols-3 gap-6 mb-6">
          <!-- District Map Visual Indicator -->
          <div class="card col-span-2">
            <div class="card-header">
              <h3 class="card-header-title">Pakistan Districts Risk Monitoring Board</h3>
            </div>
            <div class="card-body-full" style="padding: var(--space-5);">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: var(--space-4);">
                ${districts.map(d => {
                  const levelClass = d.status === 'green' ? 'success' : (d.status === 'red' ? 'danger' : 'warning');
                  const desc = d.status === 'green' ? 'Normal Conditions' : (d.status === 'red' ? 'Emergency Loss' : 'Moderate Weather Alert');
                  
                  return `
                    <div style="padding: var(--space-4); border: 1.5px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-card); transition: all var(--transition-fast);">
                      <div class="flex justify-between items-center mb-2">
                        <strong style="font-size: var(--text-sm);">${d.name}</strong>
                        ${renderBadge(d.status.toUpperCase(), levelClass)}
                      </div>
                      <div style="font-size: 11px; color: var(--color-text-secondary);">
                        <div>Farmers Registered: <strong>${d.farmers}</strong></div>
                        <div>Assistance Requests: <strong>${d.pendingRequests}</strong></div>
                        <div class="mt-2 text-xs opacity-80" style="color: ${d.status === 'red' ? 'var(--color-danger)' : (d.status === 'yellow' ? 'var(--color-accent-dark)' : 'var(--color-safe)')};">${desc}</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Quick Campaign summary panel -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">Live Aid Campaigns</h3>
            </div>
            <div class="card-body" style="max-height: 300px; overflow-y: auto;">
              <div class="flex flex-col gap-4">
                ${campaigns.slice(0, 3).map(c => {
                  const pct = Math.round(c.amountNeeded > 0 ? (c.amountRaised / c.amountNeeded) * 100 : 0);
                  return `
                    <div>
                      <div class="flex justify-between items-center text-xs mb-1">
                        <strong>${c.title}</strong>
                        <span>${pct}%</span>
                      </div>
                      ${renderProgressBar(pct)}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Verification Requests Table -->
        <div class="card mb-6">
          <div class="card-header">
            <h3 class="card-header-title">Farmer Micro-Credit & Sponsorship Verification Requests</h3>
          </div>
          <div class="card-body-full">
            ${renderDataTable(
              [
                { key: 'date', label: 'Requested Date', render: r => formatDate(r.date) },
                { key: 'farmerName', label: 'Farmer / Applicant', render: r => `<strong>${r.farmerName}</strong>` },
                { key: 'district', label: 'District' },
                { key: 'category', label: 'Support Category', render: r => renderBadge(r.category, 'neutral') },
                { key: 'amount', label: 'Target Funding', render: r => formatCurrency(r.amount) },
                { key: 'status', label: 'Audit Status', render: r => {
                    const type = r.status === 'Verified' ? 'success' : (r.status === 'Rejected' ? 'danger' : 'warning');
                    return renderBadge(r.status, type);
                  }
                },
                {
                  key: 'actions',
                  label: 'Actions',
                  style: 'text-align: center; width: 180px;',
                  render: r => r.status === 'Pending' ? `
                    <div class="table-actions" style="justify-content: center;">
                      <button class="btn btn-primary btn-sm verify-btn" data-id="${r.id}">Approve Aid</button>
                      <button class="btn btn-danger btn-sm reject-btn" data-id="${r.id}">Decline</button>
                    </div>
                  ` : `<span class="text-xs text-muted">Audited</span>`
                }
              ],
              verificationRequests,
              { emptyMessage: 'No pending farmer verification requests.' }
            )}
          </div>
        </div>
      </div>
    `;

    // Bindings
    document.getElementById('btn-create-campaign-ngo')?.addEventListener('click', openCreateCampaignModal);

    container.querySelectorAll('.verify-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const req = verificationRequests.find(r => r.id === id);
        if (req) approveVerificationRequest(req);
      });
    });

    container.querySelectorAll('.reject-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        verificationRequests = verificationRequests.map(r => r.id === id ? { ...r, status: 'Rejected' } : r);
        showToast('Farmer request declined', 'error');
        render();
      });
    });
  }

  function approveVerificationRequest(req) {
    // 1. Mark request as Verified
    verificationRequests = verificationRequests.map(r => r.id === req.id ? { ...r, status: 'Verified' } : r);
    
    // 2. Launch a donation campaign automatically!
    const newCampaign = {
      id: generateId(),
      title: `${req.farmerName}'s ${req.category} Assistance`,
      location: req.district,
      amountNeeded: req.amount,
      amountRaised: 0,
      category: req.category,
      description: `Funding support verified and audited by Al Noor Foundation for farmer ${req.farmerName} in ${req.district}.`,
      status: 'Active'
    };

    store.addToArray('donationCampaigns', newCampaign);
    showToast(`Farmer verification approved! Spawned new sponsorship campaign: "${newCampaign.title}"`, 'success');
    render();
  }

  function openCreateCampaignModal() {
    const content = `
      <form id="create-camp-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Campaign Title</label>
          <input type="text" class="form-input" id="camp-title" placeholder="e.g. Rajanpur Wheat Seeds Distribution" required>
        </div>
        <div class="form-group">
          <label class="form-label">Target Location (District)</label>
          <input type="text" class="form-input" id="camp-loc" placeholder="e.g. Rajanpur" required>
        </div>
        <div class="form-group">
          <label class="form-label">Required Funding Goal (Rs.)</label>
          <input type="number" class="form-input" id="camp-amt" placeholder="e.g. 150000" min="5000" required>
        </div>
        <div class="form-group">
          <label class="form-label">Relief Category</label>
          <select class="form-select" id="camp-cat">
            <option value="Flood Seeds Relief">Flood Seeds Relief</option>
            <option value="Community Water Supply">Community Water Supply</option>
            <option value="Livestock Takaful Fund">Livestock Takaful Fund</option>
            <option value="Rural Women Grants">Rural Women Grants</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Campaign Description</label>
          <textarea class="form-textarea" id="camp-desc" placeholder="Describe the crisis details, how many families are impacted, and what supplies will be bought..." required></textarea>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Publish Campaign</button>
        </div>
      </form>
    `;

    openModal('Launch NGO Aid Campaign', content);

    document.getElementById('create-camp-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('camp-title').value;
      const location = document.getElementById('camp-loc').value;
      const amountNeeded = parseFloat(document.getElementById('camp-amt').value);
      const category = document.getElementById('camp-cat').value;
      const description = document.getElementById('camp-desc').value;

      const newCampaign = {
        id: generateId(),
        title,
        location,
        amountNeeded,
        amountRaised: 0,
        category,
        description,
        status: 'Active'
      };

      store.addToArray('donationCampaigns', newCampaign);
      showToast('Aid campaign published successfully', 'success');
      closeModal();
      render();
    });
  }

  // Initial render
  render();
}
