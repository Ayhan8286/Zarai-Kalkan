// ============================================
// ZARAI KALKAN — Loan Assistance Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { formatCurrency, formatDate, generateId, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { exportToPDF } from '../utils/pdf-export.js';

export default function loansPage(container) {
  const loanPrograms = [
    { id: 'prog_1', name: 'Zarai Crop Input Advance', limit: 80000, rate: '0% (Subsidy)', duration: '6 Months', type: 'Shariah Compliant Murabaha', desc: 'No markup interest. For seeds, fertilizer, and harvest inputs.', collateral: 'Land Revenue Record / Guarantor' },
    { id: 'prog_2', name: 'Livestock Development Program', limit: 150000, rate: '3.5%', duration: '18 Months', type: 'Mudaraba Financing', desc: 'Buy cows, feed, and dairy equipment. Pay in quarterly installments.', collateral: 'Cattle Verification / ID' },
    { id: 'prog_3', name: 'Solar Tube Well Subsidized Scheme', limit: 400000, rate: '4.0%', duration: '36 Months', type: 'Diminishing Musharaka', desc: 'Transition farm irrigation to zero-cost solar pumping. High collateral asset financing.', collateral: 'Solar System Equipment Mortgage' },
    { id: 'prog_4', name: 'Women Entrepreneur Startup Loan', limit: 100000, rate: '0% (Interest-Free)', duration: '24 Months', type: 'Qarz-e-Hasna Welfare', desc: 'Micro-credit assistance to kickstart home businesses and embroidery centers.', collateral: 'Guarantor / Local Committee' }
  ];

  function render() {
    const state = store.getState();
    const apps = state.loanApplications || [];

    // Calculate dynamic stats
    const creditScore = 72; // Out of 100
    const pendingApps = apps.filter(a => a.status === 'Pending').length;
    const activeLoanAmt = apps.filter(a => a.status === 'Disbursed' || a.status === 'Approved').reduce((sum, a) => sum + (a.amount || 0), 0);

    container.innerHTML = `
      <div class="loans-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navLoans') || 'Loan & Financial Assistance'}</h2>
            <p class="text-xs text-muted">Check your financial credit score, explore government micro-subsidies, and apply for interest-free loans.</p>
          </div>
          <button class="btn btn-outline" id="btn-export-profile">
            ${icons.fileText || '📄'} Export Financial Credit Profile
          </button>
        </div>

        <!-- Top Section: Stats + Credit Score Widget -->
        <div class="grid grid-cols-4 gap-6 mb-6">
          <!-- Credit Score Widget Card -->
          <div class="card flex flex-col items-center justify-center text-center" style="padding: var(--space-5);">
            <h4 class="font-bold mb-3" style="font-size: var(--text-xs); color: var(--color-text-muted);">Zarai Credit Bureau Score</h4>
            
            <div class="score-circle">
              <div class="score-circle-ring"></div>
              <div class="score-circle-progress" style="border-top-color: var(--color-primary); border-right-color: var(--color-primary); transform: rotate(45deg);"></div>
              <div class="score-value">${creditScore}</div>
              <div class="score-max">/ 100</div>
              <div class="score-label">Good Standing</div>
            </div>
            
            <p class="text-xs text-muted mt-3" style="font-size: 10px;">Based on your last 6 months transactions records.</p>
          </div>

          <!-- Stats Cards -->
          <div class="col-span-3 grid grid-cols-3 gap-4">
            ${renderStatsCard('Active Disbursed Loans', formatCurrency(activeLoanAmt), '', activeLoanAmt > 0 ? 'amber' : 'green', 'trendingUp')}
            ${renderStatsCard('Pending Loan Applications', pendingApps, '', 'blue', 'clock')}
            ${renderStatsCard('Approved Credit Limit', formatCurrency(180000), '', 'green', 'award', 'positive')}
          </div>
        </div>

        <!-- Loan Programs Grid -->
        <div class="mb-8">
          <h3 class="font-bold mb-4" style="font-size: var(--text-base); color: var(--color-text);">Available Government Subsidies & Shariah Programs</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: var(--space-4);">
            ${loanPrograms.map(prog => `
              <div class="card" style="border: 1px solid var(--color-border-light); display: flex; flex-direction: column; justify-content: space-between;">
                <div class="card-body-full">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold" style="font-size: var(--text-sm); line-height: 1.3;">${prog.name}</h4>
                  </div>
                  <span class="badge badge-primary mb-3">${prog.type}</span>
                  
                  <p class="text-xs text-muted mb-4" style="line-height: 1.4;">${prog.desc}</p>
                  
                  <div style="padding: var(--space-2) var(--space-3); background: var(--color-bg); border-radius: var(--radius-md); font-size: var(--text-xs); color: var(--color-text-secondary);">
                    <div class="flex justify-between mb-1">
                      <span>Max Credit Limit:</span>
                      <strong>${formatCurrency(prog.limit)}</strong>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span>Markup Profit Rate:</span>
                      <strong>${prog.rate}</strong>
                    </div>
                    <div class="flex justify-between">
                      <span>Repayment Period:</span>
                      <strong>${prog.duration}</strong>
                    </div>
                  </div>
                </div>

                <div class="card-footer" style="padding: var(--space-3) var(--space-4); background: var(--color-bg-alt);">
                  <button class="btn btn-primary btn-sm btn-block apply-loan-btn" data-id="${prog.id}">Apply Assistance</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Application History Table -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-header-title">Loan Application History</h3>
          </div>
          <div class="card-body-full">
            ${renderDataTable(
              [
                { key: 'date', label: 'Date Applied', render: r => formatDate(r.dateApplied) },
                { key: 'program', label: 'Assistance Scheme', render: r => r.programName },
                { key: 'amount', label: 'Requested Amount', render: r => formatCurrency(r.amount) },
                { key: 'period', label: 'Period', render: r => `${r.duration} Months` },
                { key: 'status', label: 'Approval Status', render: r => {
                    const type = r.status === 'Disbursed' || r.status === 'Approved' ? 'success' : (r.status === 'Rejected' ? 'danger' : 'warning');
                    return renderBadge(r.status, type);
                  }
                }
              ],
              apps,
              { emptyMessage: 'No loan applications submitted yet. Click "Apply Assistance" above to file one.' }
            )}
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    document.getElementById('btn-export-profile')?.addEventListener('click', () => {
      exportToPDF('Zarai_Farmer_Credit_Bureau_Report', { score: creditScore });
    });

    container.querySelectorAll('.apply-loan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const prog = loanPrograms.find(p => p.id === id);
        if (prog) openApplyModal(prog);
      });
    });
  }

  function openApplyModal(prog) {
    const content = `
      <form id="apply-loan-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Program Selected</label>
          <input type="text" class="form-input" value="${prog.name}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Financing Product Type</label>
          <input type="text" class="form-input" value="${prog.type}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Requested Amount (Rs.) - Max: ${formatCurrency(prog.limit)}</label>
          <input type="number" class="form-input" id="loan-amt" max="${prog.limit}" placeholder="e.g. ${prog.limit / 2}" min="1000" required>
        </div>
        <div class="form-group">
          <label class="form-label">Requested Repayment Duration (Months)</label>
          <input type="text" class="form-input" value="${prog.duration}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Collateral Details / Local Guarantor</label>
          <textarea class="form-textarea" id="loan-collateral" placeholder="Provide details about land registration numbers, livestock count, or names of local shopkeeper/community guarantors..." required>${prog.collateral}</textarea>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Application</button>
        </div>
      </form>
    `;

    openModal('Apply for Agri-Credit Assistance', content);

    document.getElementById('apply-loan-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('loan-amt').value);
      const collateral = document.getElementById('loan-collateral').value;

      const newApp = {
        id: generateId(),
        programName: prog.name,
        amount,
        duration: parseInt(prog.duration),
        collateral,
        dateApplied: new Date().toISOString().split('T')[0],
        status: 'Pending'
      };

      store.addToArray('loanApplications', newApp);
      showToast('Assistance application filed and sent for audit', 'warning');
      closeModal();
      render();
    });
  }

  // Initial render
  render();
}
