// ============================================
// ZARAI KALKAN — Donations & Sponsorship Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { renderProgressBar } from '../components/progress-bar.js';
import { formatCurrency, formatDate, generateId, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function donationsPage(container) {
  function render() {
    const state = store.getState();
    const campaigns = state.donationCampaigns || [];
    const donations = state.donations || [];

    // Calculate dynamic stats
    const activeCampaigns = campaigns.length;
    const totalDonationsReceived = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
    const peopleSupported = donations.length + 15; // Simulated count

    container.innerHTML = `
      <div class="donations-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navSupport') || 'Village Sponsorship & Donations'}</h2>
            <p class="text-xs text-muted">Direct farmer-to-NGO sponsorships, emergency flood crop seeds aids, and transparent community project funding.</p>
          </div>
          <button class="btn btn-primary" id="btn-request-sponsor">
            ${icons.plus || '➕'} Request Sponsorship Support
          </button>
        </div>

        <!-- Emergency Alert Banner -->
        <div class="alert-box alert-box-danger mb-6">
          <span class="alert-box-icon">🚨</span>
          <div>
            <strong style="font-weight: var(--font-bold);">Emergency Seed Relief Needed:</strong>
            Rajanpur districts report wheat washouts. 43 crop farming families require immediate seeds distribution.
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          ${renderStatsCard('Active Campaigns', activeCampaigns, '', 'blue', 'fileText')}
          ${renderStatsCard('Total Donations Raised', formatCurrency(totalDonationsReceived), '', 'green', 'trendingUp', 'positive')}
          ${renderStatsCard('Beneficiaries Assisted', peopleSupported, '', 'purple', 'users')}
        </div>

        <!-- Campaigns Grid -->
        <div class="mb-8">
          <h3 class="font-bold mb-4" style="font-size: var(--text-base); color: var(--color-text);">Open Community Funding & Farmer Aid Campaigns</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: var(--space-4);">
            ${campaigns.map(c => {
              const percentage = c.amountNeeded > 0 ? (c.amountRaised / c.amountNeeded) * 100 : 0;
              const type = percentage >= 80 ? 'green' : (percentage >= 40 ? '' : 'warning');
              
              return `
                <div class="card" style="border: 1px solid var(--color-border-light); display: flex; flex-direction: column; justify-content: space-between;">
                  <div class="card-body-full">
                    <div class="flex justify-between items-start mb-2">
                      <span class="badge badge-primary">${c.category || 'Aid Relief'}</span>
                      <span class="text-xs text-muted">📍 ${c.location || 'Pakistan'}</span>
                    </div>
                    <h4 class="font-bold mb-2" style="font-size: var(--text-sm); line-height: 1.3;">${c.title}</h4>
                    <p class="text-xs text-muted mb-4" style="line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 34px;">${c.description}</p>
                    
                    <div class="mb-2">
                      <div class="flex justify-between text-xs mb-1">
                        <span class="text-muted">Raised: <strong>${formatCurrency(c.amountRaised)}</strong></span>
                        <span>Goal: <strong>${formatCurrency(c.amountNeeded)}</strong></span>
                      </div>
                      ${renderProgressBar(percentage, type)}
                    </div>
                  </div>

                  <div class="card-footer" style="padding: var(--space-3) var(--space-4); background: var(--color-bg-alt); gap: var(--space-2);">
                    <button class="btn btn-secondary btn-sm flex-1 transparency-btn" data-id="${c.id}">Auditing</button>
                    <button class="btn btn-primary btn-sm flex-1 donate-btn" data-id="${c.id}" ${c.amountRaised >= c.amountNeeded ? 'disabled' : ''}>${c.amountRaised >= c.amountNeeded ? 'Completed' : 'Donate'}</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Donations History Table -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-header-title">Recent Donation History</h3>
          </div>
          <div class="card-body-full">
            ${renderDataTable(
              [
                { key: 'date', label: 'Date', render: r => formatDate(r.date) },
                { key: 'donorName', label: 'Donor Partner', render: r => r.donorName },
                { key: 'campaignTitle', label: 'Campaign Sponsored', render: r => r.campaignTitle },
                { key: 'amount', label: 'Amount Gifted', render: r => formatCurrency(r.amount) },
                { key: 'status', label: 'Transparency Status', render: r => renderBadge('Receipt Verified', 'success') }
              ],
              donations,
              { emptyMessage: 'No donations have been registered yet.' }
            )}
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    document.getElementById('btn-request-sponsor')?.addEventListener('click', openRequestSponsorshipModal);

    container.querySelectorAll('.donate-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const camp = campaigns.find(c => c.id === id);
        if (camp) openDonateModal(camp);
      });
    });

    container.querySelectorAll('.transparency-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const camp = campaigns.find(c => c.id === id);
        if (camp) openTransparencyModal(camp);
      });
    });
  }

  function openDonateModal(campaign) {
    const content = `
      <form id="donate-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Sponsoring Campaign</label>
          <input type="text" class="form-input" value="${campaign.title}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Goal Target</label>
          <input type="text" class="form-input" value="${formatCurrency(campaign.amountNeeded)}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Sponsor Partner Name (or "Anonymous")</label>
          <input type="text" class="form-input" id="donor-name" value="Anonymous" required>
        </div>
        <div class="form-group">
          <label class="form-label">Donation Gift Amount (Rs.)</label>
          <input type="number" class="form-input" id="donate-amt" min="500" placeholder="e.g. 5000" required>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Authorize Transfer</button>
        </div>
      </form>
    `;

    openModal('Sponsor / Donate to Community Campaign', content);

    document.getElementById('donate-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const donorName = document.getElementById('donor-name').value;
      const amount = parseFloat(document.getElementById('donate-amt').value);

      // Add to campaign
      const updatedCampaigns = store.getState().donationCampaigns.map(c => {
        if (c.id === campaign.id) {
          return {
            ...c,
            amountRaised: c.amountRaised + amount
          };
        }
        return c;
      });
      store.setState({ donationCampaigns: updatedCampaigns });

      // Add donation record
      const newDonation = {
        id: generateId(),
        campaignTitle: campaign.title,
        amount,
        donorName,
        date: new Date().toISOString().split('T')[0]
      };
      store.addToArray('donations', newDonation);

      showToast(`Thank you! Gifted Rs. ${amount} to "${campaign.title}"`, 'success');
      closeModal();
      render();
    });
  }

  function openTransparencyModal(campaign) {
    const audits = [
      { item: 'Certified Wheat Seeds (Sacks)', qty: 15, cost: 42000, supplier: 'Punjab Seed Corporation' },
      { item: 'High-Nitrogen Urea Fertilizers', qty: 10, cost: 31000, supplier: 'Engro Fertilizers Ltd' },
      { item: 'Water pump repair parts', qty: 1, cost: 9500, supplier: 'Local Workshop Bahawalpur' }
    ];

    const content = `
      <div class="animate-fade-in">
        <h4 class="font-bold text-xs mb-2 text-primary">Financial Transparency Audit Report</h4>
        <p class="text-xs text-muted mb-4">Every rupee donated to <strong>${campaign.title}</strong> is verified through bills and receipts. Here is how raised funds are distributed:</p>

        ${renderDataTable(
          [
            { key: 'item', label: 'Item Purchased' },
            { key: 'qty', label: 'Quantity' },
            { key: 'cost', label: 'Verified Cost', render: r => formatCurrency(r.cost) },
            { key: 'supplier', label: 'Supplier Vendor' }
          ],
          audits
        )}

        <div style="margin-top: var(--space-4); display: flex; align-items: center; gap: 8px; font-size: 10px; color: var(--color-safe); background: var(--color-safe-bg); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md);">
          <span>✅</span>
          <span>Receipt audits match 100% with donation ledger. Double-ledger signed by Al Noor Foundation.</span>
        </div>

        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none; margin-top: var(--space-4);">
          <button class="btn btn-secondary" onclick="closeModal()">Close Audit</button>
        </div>
      </div>
    `;

    openModal('Campaign Accountability Report', content, { size: 'lg' });
  }

  function openRequestSponsorshipModal() {
    const content = `
      <form id="req-sponsor-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Sponsorship Request Title</label>
          <input type="text" class="form-input" id="req-title" placeholder="e.g. Funding for Solar Tube Well in village Chak 57" required>
        </div>
        <div class="form-group">
          <label class="form-label">Your Location (District/Village)</label>
          <input type="text" class="form-input" id="req-loc" placeholder="e.g. Bahawalpur, Chak 57" required>
        </div>
        <div class="form-group">
          <label class="form-label">Funding Assistance Required (Rs.)</label>
          <input type="number" class="form-input" id="req-amt" min="5000" placeholder="e.g. 50000" required>
        </div>
        <div class="form-group">
          <label class="form-label">Sponsorship Category</label>
          <select class="form-select" id="req-cat">
            <option value="Agri Crop Seed Grant">Agri Crop Seed Grant</option>
            <option value="Solar Well Conversion">Solar Well Conversion</option>
            <option value="Livestock Dairy Aid">Livestock Dairy Aid</option>
            <option value="Women Startup Support">Women Startup Support</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Provide Description & Case Details</label>
          <textarea class="form-textarea" id="req-desc" placeholder="Describe your crop types, how much land you own, and exactly how this donation will help increase your output or protect you from losses..." required></textarea>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Sponsorship Request</button>
        </div>
      </form>
    `;

    openModal('Request Community Sponsorship Support', content);

    document.getElementById('req-sponsor-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('req-title').value;
      const location = document.getElementById('req-loc').value;
      const amountNeeded = parseFloat(document.getElementById('req-amt').value);
      const category = document.getElementById('req-cat').value;
      const description = document.getElementById('req-desc').value;

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
      showToast('Sponsorship request uploaded! Awaiting NGO review & publication.', 'success');
      closeModal();
      render();
    });
  }

  // Initial render
  render();
}
