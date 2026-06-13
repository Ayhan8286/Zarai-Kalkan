// ============================================
// ZARAI KALKAN — State Management Store
// Pub/Sub reactive store pattern
// ============================================

function createStore(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();

  return {
    getState() {
      return state;
    },

    setState(partial) {
      const prevState = { ...state };
      state = { ...state, ...partial };
      listeners.forEach(listener => {
        try {
          listener(state, prevState);
        } catch (e) {
          console.error('Store listener error:', e);
        }
      });
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    select(key) {
      return state[key];
    },

    // Update a nested array by adding an item
    addToArray(key, item) {
      const arr = [...(state[key] || [])];
      arr.unshift(item);
      this.setState({ [key]: arr });
    },

    // Update a nested array by removing an item by id
    removeFromArray(key, id) {
      const arr = (state[key] || []).filter(item => item.id !== id);
      this.setState({ [key]: arr });
    },

    // Update an item in a nested array
    updateInArray(key, id, updates) {
      const arr = (state[key] || []).map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      this.setState({ [key]: arr });
    },
  };
}

// Initialize store with default state
export const store = createStore({
  // Current user & role
  currentRole: null, // 'farmer', 'shopkeeper', 'women', 'ngo', 'admin'
  currentUser: null,

  // UI State
  sidebarOpen: false,
  currentPage: '/',
  language: localStorage.getItem('zk-lang') || 'en',
  notificationsOpen: false,
  languageMenuOpen: false,

  // Data arrays (populated from mock-data on role select)
  transactions: [],
  customers: [],       // khata book
  crops: [],
  insurancePolicies: [],
  insuranceClaims: [],
  loanApplications: [],
  products: [],        // marketplace
  donationCampaigns: [],
  donations: [],
  supportRequests: [],
  lessons: [],
  completedLessons: [],
  notifications: [],
  weatherAlerts: [],
});

export default store;
