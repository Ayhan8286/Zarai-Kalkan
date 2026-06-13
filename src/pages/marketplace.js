// ============================================
// ZARAI KALKAN — Village Business Hub Marketplace
// ============================================

import store from '../store.js';
import { renderBadge } from '../components/badge.js';
import { renderFilterBar } from '../components/filter-bar.js';
import { formatCurrency, generateId, debounce, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function marketplacePage(container) {
  let searchQuery = '';
  let selectedCategory = 'all';

  function render() {
    const state = store.getState();
    const products = state.products || [];
    const currentUser = state.currentUser || {};

    // Filter products
    const filteredProducts = products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCat = true;
      if (selectedCategory !== 'all') {
        matchesCat = p.category === selectedCategory;
      }

      return matchesSearch && matchesCat;
    });

    container.innerHTML = `
      <div class="marketplace-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navMarketplace') || 'Village Business Hub'}</h2>
            <p class="text-xs text-muted">Direct farmer-to-farmer agricultural marketplace. Buy seeds, sell produce, trade livestock, or buy tools without middleman margins.</p>
          </div>
          <button class="btn btn-primary" id="btn-create-listing">
            ${icons.plus || '➕'} List Product for Sale
          </button>
        </div>

        <!-- Filter Bar -->
        <div class="card mb-6">
          <div class="card-body-full">
            ${renderFilterBar({
              searchPlaceholder: 'Search products, livestock, tools...',
              searchValue: searchQuery,
              filters: [
                {
                  id: 'filter-market-cat',
                  label: 'Category',
                  selected: selectedCategory,
                  options: [
                    { value: 'all', label: 'All Categories' },
                    { value: 'Farm Produce', label: '🌾 Farm Produce' },
                    { value: 'Seeds & Fertilizer', label: '🌱 Seeds & Fertilizer' },
                    { value: 'Livestock', label: '🐄 Livestock' },
                    { value: 'Handicrafts', label: '🧵 Handmade Crafts' },
                    { value: 'Tools', label: '🔧 Farm Tools' }
                  ]
                }
              ]
            })}

            <!-- Product Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-4); margin-top: var(--space-4);">
              ${filteredProducts.map(p => {
                const isOwnProduct = p.sellerId === currentUser.id;
                
                // Get display emoji based on category
                let emoji = '📦';
                if (p.category === 'Farm Produce') emoji = '🌾';
                else if (p.category === 'Livestock') emoji = '🐄';
                else if (p.category === 'Seeds & Fertilizer') emoji = '🌱';
                else if (p.category === 'Handicrafts') emoji = '🧵';
                else if (p.category === 'Tools') emoji = '🔧';

                return `
                  <div class="product-card card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                      <div class="product-card-image">
                        ${emoji}
                      </div>
                      <div class="product-card-body">
                        <div class="flex justify-between items-start mb-1">
                          <h4 class="product-card-title font-bold" style="font-size: var(--text-sm); line-height: 1.3;">${p.title}</h4>
                        </div>
                        <div class="product-card-price">${formatCurrency(p.price)} <span class="text-xs text-muted" style="font-weight: normal;">/ ${p.unit || 'unit'}</span></div>
                        
                        <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: var(--space-2);">
                          <div class="flex justify-between">
                            <span class="text-muted">Seller:</span>
                            <strong>${p.sellerName}</strong>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-muted">Location:</span>
                            <span>📍 ${p.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="product-card-footer">
                      ${isOwnProduct ? `
                        <button class="btn btn-danger btn-sm btn-block delete-listing-btn" data-id="${p.id}">Remove Listing</button>
                      ` : `
                        <button class="btn btn-primary btn-sm btn-block contact-seller-btn" data-id="${p.id}">Contact Seller</button>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}

              ${filteredProducts.length === 0 ? `
                <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
                  <div class="empty-state-title">No products listed</div>
                  <p class="empty-state-text">No listings match your filter or search query.</p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Bindings
    document.getElementById('btn-create-listing')?.addEventListener('click', openCreateListingModal);

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value;
        render();
      }, 300));
    }

    document.getElementById('filter-market-cat')?.addEventListener('change', (e) => {
      selectedCategory = e.target.value;
      render();
    });

    container.querySelectorAll('.contact-seller-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const prod = products.find(p => p.id === id);
        if (prod) openContactSellerModal(prod);
      });
    });

    container.querySelectorAll('.delete-listing-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        store.removeFromArray('products', id);
        showToast('Listing removed successfully', 'success');
        render();
      });
    });
  }

  function openContactSellerModal(product) {
    const content = `
      <div class="animate-fade-in">
        <div style="background: var(--color-bg); padding: var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-4); text-align: center;">
          <h4 class="font-bold">${product.title}</h4>
          <h3 class="text-primary font-bold mt-1" style="font-size: var(--text-lg);">${formatCurrency(product.price)}</h3>
          <p class="text-xs text-muted mt-2">Seller: <strong>${product.sellerName}</strong> • Location: 📍 ${product.location}</p>
        </div>

        <div class="form-group">
          <label class="form-label">Seller Phone Number</label>
          <input type="text" class="form-input" style="font-size: var(--text-base); font-weight: bold; text-align: center;" value="${product.sellerPhone || '0301-2345678'}" readonly>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-4">
          <button class="btn btn-secondary btn-block" onclick="showToast('Simulating WhatsApp chat redirect...', 'info')">💬 Chat on WhatsApp</button>
          <button class="btn btn-primary btn-block" onclick="showToast('Calling seller... Dialing number', 'success')">📞 Direct Voice Call</button>
        </div>

        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none; margin-top: var(--space-4);">
          <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;

    openModal('Contact Agriculture Seller', content);
  }

  function openCreateListingModal() {
    const state = store.getState();
    const currentUser = state.currentUser || {};

    const content = `
      <form id="create-listing-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Product / Listing Title</label>
          <input type="text" class="form-input" id="list-title" placeholder="e.g. Fresh Sindhri Mangoes (Premium)" required>
        </div>
        <div class="form-group">
          <label class="form-label">Product Category</label>
          <select class="form-select" id="list-cat">
            <option value="Farm Produce">Farm Produce</option>
            <option value="Seeds & Fertilizer">Seeds & Fertilizer</option>
            <option value="Livestock">Livestock</option>
            <option value="Handicrafts">Handicrafts</option>
            <option value="Tools">Tools</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Price (Rs.)</label>
            <input type="number" class="form-input" id="list-price" min="1" placeholder="e.g. 250" required>
          </div>
          <div class="form-group">
            <label class="form-label">Unit</label>
            <input type="text" class="form-input" id="list-unit" placeholder="e.g. kg, 40kg, animal" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Seller Location</label>
          <input type="text" class="form-input" id="list-loc" value="${currentUser.village || 'Bahawalpur'}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Product Description</label>
          <textarea class="form-textarea" id="list-desc" placeholder="Describe the quality, color, age (for livestock), or chemical composition (for seeds/fertilizer) of your product..." required></textarea>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Publish Listing</button>
        </div>
      </form>
    `;

    openModal('List Product on Village Hub', content);

    document.getElementById('create-listing-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('list-title').value;
      const category = document.getElementById('list-cat').value;
      const price = parseFloat(document.getElementById('list-price').value);
      const unit = document.getElementById('list-unit').value;
      const location = document.getElementById('list-loc').value;
      const desc = document.getElementById('list-desc').value;

      const newListing = {
        id: generateId(),
        title,
        category,
        price,
        unit,
        location,
        description: desc,
        sellerId: currentUser.id || 'user_1',
        sellerName: currentUser.name || 'Anonymous Farmer',
        sellerPhone: currentUser.phone || '0300-1234567',
        datePosted: new Date().toISOString().split('T')[0]
      };

      store.addToArray('products', newListing);
      showToast('Your product listing is now live!', 'success');
      closeModal();
      render();
    });
  }

  // Initial render
  render();
}
