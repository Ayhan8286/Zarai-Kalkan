// ============================================
// ZARAI KALKAN — Insurance Dashboard Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { formatCurrency, formatDate, generateId, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function insurancePage(container) {
  let activeTab = 'active-policies'; // 'active-policies', 'browse-plans', 'claim-history'
  let planFilter = 'all'; // 'all', 'Crop', 'Livestock', 'Shop', 'Health'

  // Fallback plans if not in mock data
  const insurancePlansList = [
    { id: 'pl_1', name: 'Standard Crop Takaful', type: 'Crop', coverage: 150000, premium: 750, duration: '6 Months', features: ['Wheat/Cotton coverage', 'Pest infestation damage protection', 'Excessive rain compensation'], takaful: true },
    { id: 'pl_2', name: 'Livestock Wellness Shield', type: 'Livestock', coverage: 120000, premium: 600, duration: '12 Months', features: ['Cattle/Dairy cows protection', 'Foot-and-mouth disease cover', 'Accidental death benefit'], takaful: true },
    { id: 'pl_3', name: 'Micro-retailer Protection', type: 'Shop', coverage: 80000, premium: 450, duration: '12 Months', features: ['Shop fire damage protection', 'Theft and break-in coverage', 'Stock damage compensation'], takaful: false },
    { id: 'pl_4', name: 'Rural Family Health Cover', type: 'Health', coverage: 200000, premium: 900, duration: '12 Months', features: ['Hospitalization cash benefit', 'Emergency transport cover', 'Doctor consult subsidies'], takaful: true }
  ];

  function render() {
    const state = store.getState();
    const policies = state.insurancePolicies || [];
    const claims = state.insuranceClaims || [];

    // Calculate Stats
    const totalCoverage = policies.reduce((sum, p) => sum + (p.coverage || 0), 0);
    const activePoliciesCount = policies.length;
    const claimsFiled = claims.length;
    const claimsApproved = claims.filter(c => c.status === 'Approved' || c.status === 'Approved/Paid').length;

    // Filter plans for Browse Plans tab
    const filteredPlans = insurancePlansList.filter(p => planFilter === 'all' || p.type === planFilter);

    // Tab Contents
    let tabContentHtml = '';
    if (activeTab === 'active-policies') {
      tabContentHtml = renderActivePolicies(policies);
    } else if (activeTab === 'browse-plans') {
      tabContentHtml = renderBrowsePlans(filteredPlans);
    } else if (activeTab === 'claim-history') {
      tabContentHtml = renderClaimHistory(claims, policies);
    }

    container.innerHTML = `
      <div class="insurance-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navInsurance') || 'Agri-Fin Protection & Takaful'}</h2>
            <p class="text-xs text-muted">Browse Islamic crop insurance, livestock takaful plans, and file claims for weather losses.</p>
          </div>
          <button class="btn btn-primary" id="btn-browse-plans-shortcut">
            ${icons.plus || '➕'} Subscribe to New Plan
          </button>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          ${renderStatsCard('Total Value Insured', formatCurrency(totalCoverage), '', 'green', 'shield', 'positive')}
          ${renderStatsCard('Active Policies', activePoliciesCount, '', 'blue', 'fileText')}
          ${renderStatsCard('Claims Filed', claimsFiled, '', 'amber', 'clock')}
          ${renderStatsCard('Claims Settled', claimsApproved, '', 'green', 'award', 'positive')}
        </div>

        <!-- Tab Controls -->
        <div class="tabs">
          <button class="tab ${activeTab === 'active-policies' ? 'active' : ''}" id="tab-active-policies">Active Policies</button>
          <button class="tab ${activeTab === 'browse-plans' ? 'active' : ''}" id="tab-browse-plans">Browse Protection Plans</button>
          <button class="tab ${activeTab === 'claim-history' ? 'active' : ''}" id="tab-claim-history">Claims History</button>
        </div>

        <!-- Dynamic Tab Panel -->
        <div id="tab-panel">
          ${tabContentHtml}
        </div>
      </div>
    `;

    // Tab bindings
    document.getElementById('tab-active-policies').addEventListener('click', () => { activeTab = 'active-policies'; render(); });
    document.getElementById('tab-browse-plans').addEventListener('click', () => { activeTab = 'browse-plans'; render(); });
    document.getElementById('tab-claim-history').addEventListener('click', () => { activeTab = 'claim-history'; render(); });
    document.getElementById('btn-browse-plans-shortcut').addEventListener('click', () => { activeTab = 'browse-plans'; render(); });

    // Inner tab event bindings
    if (activeTab === 'active-policies') {
      container.querySelectorAll('.claim-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const policy = policies.find(p => p.id === id);
          if (policy) openClaimModal(policy);
        });
      });
    } else if (activeTab === 'browse-plans') {
      document.getElementById('plan-type-filter')?.addEventListener('change', (e) => {
        planFilter = e.target.value;
        render();
      });

      container.querySelectorAll('.subscribe-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const plan = insurancePlansList.find(p => p.id === id);
          if (plan) openSubscribeModal(plan);
        });
      });
    } else if (activeTab === 'claim-history') {
      document.getElementById('btn-new-claim')?.addEventListener('click', () => {
        if (policies.length === 0) {
          showToast('You must have an active policy to file a claim.', 'warning');
          return;
        }
        openClaimModal(policies[0]);
      });
    }
  }

  function renderActivePolicies(policies) {
    if (policies.length === 0) {
      return `
        <div class="empty-state card" style="padding: var(--space-8);">
          <div class="empty-state-icon">🛡️</div>
          <h3 class="empty-state-title">No Active Policies</h3>
          <p class="empty-state-text">Protect your hard work today. Browse our low-cost, shariah-compliant Takaful plans.</p>
          <button class="btn btn-primary mt-4" onclick="document.getElementById('tab-browse-plans').click()">Browse Plans</button>
        </div>
      `;
    }

    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-4);">
        ${policies.map(p => {
          const isTakaful = p.takaful ?? true;
          return `
            <div class="card" style="border: 1px solid var(--color-border-light); display: flex; flex-direction: column; justify-content: space-between;">
              <div class="card-body-full">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-bold" style="font-size: var(--text-base);">${p.name}</h4>
                    <p class="text-xs text-muted">ID: ${p.policyNumber || p.id}</p>
                  </div>
                  ${renderBadge('Active', 'success')}
                </div>
                
                <div style="margin: var(--space-4) 0; padding: var(--space-3); background: var(--color-bg); border-radius: var(--radius-md);">
                  <div class="flex justify-between items-center text-xs mb-1">
                    <span class="text-muted">Coverage:</span>
                    <strong class="text-primary">${formatCurrency(p.coverage)}</strong>
                  </div>
                  <div class="flex justify-between items-center text-xs mb-1">
                    <span class="text-muted">Premium:</span>
                    <span>${formatCurrency(p.premium)} / Month</span>
                  </div>
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-muted">Ends on:</span>
                    <span>${p.endDate ? formatDate(p.endDate) : '15 Nov 2026'}</span>
                  </div>
                </div>

                ${isTakaful ? `
                  <div style="display: inline-flex; align-items: center; gap: 4px; background: #FFF9C4; color: #F57F17; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; margin-bottom: var(--space-2);">
                    🕌 Shariah-Compliant Takaful
                  </div>
                ` : ''}
              </div>
              <div class="card-footer" style="background: var(--color-bg-alt); padding: var(--space-3) var(--space-4);">
                <button class="btn btn-outline btn-sm claim-btn" data-id="${p.id}">Submit Claim</button>
                <button class="btn btn-ghost btn-sm" onclick="showToast('Viewing policy terms and conditions...', 'info')">Details</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderBrowsePlans(plans) {
    return `
      <div class="mb-4">
        <select class="filter-select" id="plan-type-filter">
          <option value="all" ${planFilter === 'all' ? 'selected' : ''}>All Categories</option>
          <option value="Crop" ${planFilter === 'Crop' ? 'selected' : ''}>Crop Protection</option>
          <option value="Livestock" ${planFilter === 'Livestock' ? 'selected' : ''}>Livestock Insurance</option>
          <option value="Shop" ${planFilter === 'Shop' ? 'selected' : ''}>Shopkeeper Insurance</option>
          <option value="Health" ${planFilter === 'Health' ? 'selected' : ''}>Health Takaful</option>
        </select>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: var(--space-4);">
        ${plans.map(p => {
          return `
            <div class="card" style="border: 1px solid var(--color-border-light); display: flex; flex-direction: column; justify-content: space-between;">
              <div class="card-body-full">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-bold" style="font-size: var(--text-base);">${p.name}</h4>
                    ${renderBadge(p.type, 'primary')}
                  </div>
                  ${p.takaful ? `<span class="badge" style="background: #E8F5E9; color: #2E7D32;">Takaful</span>` : ''}
                </div>

                <div style="margin: var(--space-4) 0; font-size: var(--text-xs); color: var(--color-text-secondary);">
                  <div class="flex justify-between mb-1">
                    <span>Coverage Amount:</span>
                    <strong style="color: var(--color-primary);">${formatCurrency(p.coverage)}</strong>
                  </div>
                  <div class="flex justify-between mb-1">
                    <span>Premium Cost:</span>
                    <strong>${formatCurrency(p.premium)} / ${p.duration.includes('Month') ? 'month' : 'plan'}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Duration:</span>
                    <span>${p.duration}</span>
                  </div>
                </div>

                <ul style="padding-inline-start: 18px; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-2);">
                  ${p.features.map(f => `<li style="margin-bottom: 2px;">✔️ ${f}</li>`).join('')}
                </ul>
              </div>
              <div class="card-footer" style="padding: var(--space-3) var(--space-4); background: var(--color-bg-alt);">
                <button class="btn btn-primary btn-sm btn-block subscribe-btn" data-id="${p.id}">Subscribe Plan</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderClaimHistory(claims, policies) {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-header-title">Submitted Insurance Claims</h3>
          <button class="btn btn-primary btn-sm" id="btn-new-claim">${icons.plus || '➕'} File Loss Claim</button>
        </div>
        <div class="card-body-full">
          ${renderDataTable(
            [
              { key: 'date', label: 'Filed Date', render: r => formatDate(r.date) },
              { key: 'policy', label: 'Policy Coverage', render: r => {
                  const policy = policies.find(p => p.id === r.policyId);
                  return policy ? policy.name : 'Crop Insurance';
                }
              },
              { key: 'amount', label: 'Claim Amount', render: r => formatCurrency(r.amount) },
              { key: 'status', label: 'Settlement Status', render: r => {
                  const type = r.status === 'Approved' || r.status === 'Completed' || r.status === 'Approved/Paid' ? 'success' : (r.status === 'Rejected' ? 'danger' : 'warning');
                  return renderBadge(r.status, type);
                }
              },
              { key: 'description', label: 'Incident Description', render: r => `<span class="truncate" style="max-width: 200px; display: inline-block;">${r.description}</span>` }
            ],
            claims,
            { emptyMessage: 'No insurance claims submitted yet.' }
          )}
        </div>
      </div>
    `;
  }

  function openSubscribeModal(plan) {
    const content = `
      <div class="animate-fade-in">
        <div style="background: var(--color-bg); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-4);">
          <h4 class="font-bold">${plan.name}</h4>
          <p class="text-xs text-muted">${plan.type} Insurance Policy</p>
          <div class="flex justify-between mt-2 text-xs">
            <span>Coverage: <strong>${formatCurrency(plan.coverage)}</strong></span>
            <span>Premium: <strong>${formatCurrency(plan.premium)}/month</strong></span>
          </div>
        </div>
        
        <p class="text-xs text-muted mb-4">
          By clicking "Confirm Subscription", you agree to pay the premium monthly. In case of certified crop or livestock loss, you will receive compensation up to the full coverage amount.
        </p>

        <div class="modal-footer" style="padding: 0; border: none;">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-sub">Confirm Subscription</button>
        </div>
      </div>
    `;

    openModal('Confirm Subscription Plan', content);
    
    document.getElementById('btn-confirm-sub').addEventListener('click', () => {
      const newPolicy = {
        id: generateId(),
        policyNumber: `ZK-${plan.type.substring(0,3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
        name: plan.name,
        type: plan.type,
        coverage: plan.coverage,
        premium: plan.premium,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString().split('T')[0],
        takaful: plan.takaful,
        status: 'Active'
      };

      store.addToArray('insurancePolicies', newPolicy);
      showToast(`Successfully subscribed to ${plan.name}!`, 'success');
      closeModal();
      render();
    });
  }

  function openClaimModal(policy) {
    const state = store.getState();
    const activePolicies = state.insurancePolicies || [];

    const content = `
      <form id="claim-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Select Active Policy</label>
          <select class="form-select" id="claim-policy-id" required>
            ${activePolicies.map(p => `
              <option value="${p.id}" ${p.id === policy.id ? 'selected' : ''}>${p.name} (Max: ${formatCurrency(p.coverage)})</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Estimated Loss Amount (Rs.)</label>
          <input type="number" class="form-input" id="claim-amount" placeholder="e.g. 50000" min="1" required>
        </div>
        <div class="form-group">
          <label class="form-label">Loss Description & Details</label>
          <textarea class="form-textarea" id="claim-desc" placeholder="Please describe what caused the crop/livestock loss (e.g. Heavy rain damage on cotton field, locust attack on 3 acres of wheat, cattle disease)" required></textarea>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">File Loss Claim</button>
        </div>
      </form>
    `;

    openModal('Submit Loss Insurance Claim', content);

    document.getElementById('claim-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const pId = document.getElementById('claim-policy-id').value;
      const amount = parseFloat(document.getElementById('claim-amount').value);
      const desc = document.getElementById('claim-desc').value;

      const newClaim = {
        id: generateId(),
        policyId: pId,
        date: new Date().toISOString().split('T')[0],
        amount,
        description: desc,
        status: 'Under Review'
      };

      store.addToArray('insuranceClaims', newClaim);
      showToast('Insurance claim submitted for review.', 'warning');
      closeModal();
      activeTab = 'claim-history';
      render();
    });
  }

  // Initial render
  render();
}
