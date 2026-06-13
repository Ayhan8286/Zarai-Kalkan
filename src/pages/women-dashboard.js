// ============================================
// ZARAI KALKAN — Women Entrepreneur Dashboard
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { formatCurrency, formatDate, generateId, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function womenDashboard(container) {
  // Add theme class to parent wrapper
  const appLayout = document.getElementById('app');
  if (appLayout) {
    appLayout.classList.add('women-theme');
  }

  function render() {
    const state = store.getState();
    const allTxns = state.transactions || [];
    const products = state.products || [];
    const currentUser = state.currentUser || {};

    // Filter own products
    const ownProducts = products.filter(p => p.sellerId === currentUser.id);

    // Calculate dynamic stats
    const totalEarnings = allTxns.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const activeListingsCount = ownProducts.length;
    const completedLessonsCount = state.completedLessons ? state.completedLessons.length : 2;

    container.innerHTML = `
      <div class="dashboard-page animate-fade-in women-theme">
        <!-- Hero Banner -->
        <div class="hero-banner">
          <div class="hero-content">
            <div class="hero-greeting">${t('greeting') || 'Assalam-o-Alaikum'},</div>
            <h2 class="hero-name">${currentUser.name || 'Ayesha Bibi'}</h2>
            <div class="hero-meta">
              <div class="hero-meta-item">
                <span>📍</span>
                <span>${currentUser.village || 'Rahim Yar Khan'}</span>
              </div>
              <div class="hero-meta-item">
                <span>🏬</span>
                <span>${currentUser.businessName || 'Handmade Embroidery'}</span>
              </div>
              <div class="hero-badge">
                <span>Verified Business Partner 🛡️</span>
              </div>
            </div>
          </div>
          <div class="hero-illustration">
            <svg viewBox="0 0 64 64" width="100" height="100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: rgba(255,255,255,0.9);">
              <path d="M12 12 Q32 4 52 12 Q60 32 52 52 Q32 60 12 52 Q4 32 12 12 Z" stroke="currentColor" stroke-width="2.5"/>
              <circle cx="32" cy="32" r="14" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4,4"/>
              <path d="M22 22 L42 42" stroke="currentColor" stroke-width="2"/>
              <path d="M42 22 L22 42" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
        </div>

        <!-- Quick Actions Row -->
        <div class="mb-6">
          <h4 class="font-semibold mb-2" style="font-size: var(--text-sm); color: #7B1FA2;">Business Actions</h4>
          <div class="quick-actions">
            <button class="quick-action-btn" id="action-add-listing-women" style="background: rgba(123, 31, 162, 0.08); color: #7B1FA2; border-color: rgba(123, 31, 162, 0.2);">
              ${icons.plus} List New Product
            </button>
            <button class="quick-action-btn" id="action-record-sale-women" style="background: rgba(123, 31, 162, 0.08); color: #7B1FA2; border-color: rgba(123, 31, 162, 0.2);">
              ${icons.trendingUp} Record Cash Sale
            </button>
            <button class="quick-action-btn" id="action-learn-crafts" style="background: rgba(123, 31, 162, 0.08); color: #7B1FA2; border-color: rgba(123, 31, 162, 0.2);">
              📚 Embroidery Tutorials
            </button>
            <button class="quick-action-btn" id="action-reports-women" style="background: rgba(123, 31, 162, 0.08); color: #7B1FA2; border-color: rgba(123, 31, 162, 0.2);">
              ${icons.fileText} Business Statements
            </button>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          ${renderStatsCard('Total Business Income', formatCurrency(totalEarnings), '', 'purple', 'trendingUp', 'positive')}
          ${renderStatsCard('Active Listings Listed', activeListingsCount, '', 'purple', 'package')}
          ${renderStatsCard('Completed Lessons', completedLessonsCount, '', 'purple', 'award')}
          <!-- Badges achievement card -->
          <div class="stat-card">
            <div class="stat-card-header">
              <span class="stat-card-label">My Achievements</span>
              <span style="font-size: 1.2rem;">🏆</span>
            </div>
            <div class="flex gap-1 flex-wrap mt-1">
              ${renderBadge('First Sale 🥇', 'success')}
              ${renderBadge('Listed 5+ 🛍️', 'info')}
              ${renderBadge('Verified 🛡️', 'primary')}
            </div>
          </div>
        </div>

        <!-- Two column layout -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <!-- Active Listings Manager -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">My Hub Store Listings</h3>
              <span class="card-header-action" id="action-view-marketplace-women">Go to Hub</span>
            </div>
            <div class="card-body-full">
              ${renderDataTable(
                [
                  { key: 'title', label: 'Product Name', render: r => `<strong>${r.title}</strong>` },
                  { key: 'price', label: 'Unit Price', render: r => `${formatCurrency(r.price)} / ${r.unit}` },
                  {
                    key: 'actions',
                    label: 'Manage',
                    style: 'width: 80px; text-align: center;',
                    render: r => `<button class="btn btn-ghost btn-icon btn-sm delete-own-product" data-id="${r.id}">${icons.trash}</button>`
                  }
                ],
                ownProducts,
                { emptyMessage: 'No products listed yet. Click "List New Product" above to list on Village Hub.' }
              )}
            </div>
          </div>

          <!-- Embroidery and handicrafts learning recommendations -->
          <div class="card" style="background: linear-gradient(135deg, #512da8 0%, #673ab7 100%); color: white;">
            <div class="card-header" style="border: none;">
              <h3 class="card-header-title" style="color: white;">Business & Craft Development</h3>
            </div>
            <div class="card-body">
              <h4 class="font-bold text-xs" style="color: #d1c4e9; text-transform: uppercase;">Recommended Lesson</h4>
              <h3 class="font-bold mt-1" style="font-size: var(--text-base); color: white;">Marketing Handmade Crafts Online</h3>
              <p class="text-xs mt-2 opacity-85" style="line-height: 1.5;">Learn how to photograph embroidery shawls, write compelling descriptions, and talk to wholesale city buyers via WhatsApp.</p>
              
              <button class="btn btn-accent btn-sm mt-4" id="btn-start-lesson-women" style="background: #e040fb; color: white;">
                Start Learning (5 Mins)
              </button>
            </div>
          </div>
        </div>

        <!-- Recent Sales -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-header-title">Recent Customer Sales Receipts</h3>
          </div>
          <div class="card-body-full">
            ${renderDataTable(
              [
                { key: 'date', label: 'Sales Date', render: r => formatDate(r.date) },
                { key: 'description', label: 'Product Sold Details' },
                { key: 'category', label: 'Sales Channel', render: r => renderBadge(r.category, 'primary') },
                { key: 'amount', label: 'Inflow Amount', style: 'text-align: right;', render: r => {
                    return `<span class="text-success font-semibold">${formatCurrency(r.amount)}</span>`;
                  }
                }
              ],
              allTxns.filter(t => t.amount > 0).slice(0, 5),
              { emptyMessage: 'No sales recorded yet. Record a sale to start earning badges!' }
            )}
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    document.getElementById('action-add-listing-women')?.addEventListener('click', openAddProductModal);
    document.getElementById('action-record-sale-women')?.addEventListener('click', openRecordSaleModal);
    document.getElementById('action-learn-crafts')?.addEventListener('click', () => window.router.navigate('/knowledge-center'));
    document.getElementById('action-reports-women')?.addEventListener('click', () => window.router.navigate('/reports'));
    document.getElementById('action-view-marketplace-women')?.addEventListener('click', () => window.router.navigate('/marketplace'));
    document.getElementById('btn-start-lesson-women')?.addEventListener('click', () => window.router.navigate('/knowledge-center'));

    container.querySelectorAll('.delete-own-product').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        store.removeFromArray('products', id);
        showToast('Listing removed from marketplace', 'success');
        render();
      });
    });
  }

  function openAddProductModal() {
    const state = store.getState();
    const currentUser = state.currentUser || {};

    const content = `
      <form id="women-add-prod-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Product Name</label>
          <input type="text" class="form-input" id="women-title" placeholder="e.g. Handmade Phulkari Shawl (Red)" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Price (Rs.)</label>
            <input type="number" class="form-input" id="women-price" min="1" placeholder="e.g. 2500" required>
          </div>
          <div class="form-group">
            <label class="form-label">Unit</label>
            <input type="text" class="form-input" id="women-unit" value="piece" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <input type="text" class="form-input" value="Handicrafts" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Details / Fabric Quality</label>
          <textarea class="form-textarea" id="women-desc" placeholder="Specify color thread, fabric base (cotton/silk), and dimensions..." required></textarea>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary" style="background: #7B1FA2; color: white;">Publish Listing</button>
        </div>
      </form>
    `;

    openModal('List Handmade Product for Sale', content);

    document.getElementById('women-add-prod-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('women-title').value;
      const price = parseFloat(document.getElementById('women-price').value);
      const unit = document.getElementById('women-unit').value;
      const desc = document.getElementById('women-desc').value;

      const newListing = {
        id: generateId(),
        title,
        category: 'Handicrafts',
        price,
        unit,
        location: currentUser.village || 'Rahim Yar Khan',
        description: desc,
        sellerId: currentUser.id,
        sellerName: currentUser.name,
        sellerPhone: currentUser.phone || '0303-1112233',
        datePosted: new Date().toISOString().split('T')[0]
      };

      store.addToArray('products', newListing);
      showToast('Phulkari product listed in Village Hub!', 'success');
      closeModal();
      render();
    });
  }

  function openRecordSaleModal() {
    const content = `
      <form id="women-record-sale-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Description of items sold</label>
          <input type="text" class="form-input" id="women-sale-desc" placeholder="e.g. Sold 2 embroidered cushions" required>
        </div>
        <div class="form-group">
          <label class="form-label">Total Cash Earned (Rs.)</label>
          <input type="number" class="form-input" id="women-sale-amount" min="1" placeholder="e.g. 1800" required>
        </div>
        <div class="form-group">
          <label class="form-label">Transaction Date</label>
          <input type="date" class="form-input" id="women-sale-date" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary" style="background: #7B1FA2; color: white;">Save Receipt</button>
        </div>
      </form>
    `;

    openModal('Record Handicraft Cash Sale', content);

    document.getElementById('women-record-sale-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = document.getElementById('women-sale-desc').value;
      const amount = parseFloat(document.getElementById('women-sale-amount').value);
      const date = document.getElementById('women-sale-date').value;

      const newTxn = {
        id: generateId(),
        date,
        description: desc,
        category: 'Handicrafts Sale',
        amount: amount,
        type: 'Sale'
      };

      store.addToArray('transactions', newTxn);
      showToast('Cash receipt recorded in ledger!', 'success');
      closeModal();
      render();
    });
  }

  // Initial render
  render();

  // Cleanup: remove the theme class when leaving
  return () => {
    if (appLayout) {
      appLayout.classList.remove('women-theme');
    }
  };
}
