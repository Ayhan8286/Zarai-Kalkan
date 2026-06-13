// ============================================
// ZARAI KALKAN — Mock Data
// Realistic Pakistani rural demo data
// ============================================

// ---- USERS ----
export const users = {
  farmer: {
    id: 'user_farmer_1',
    name: 'Ahmed Khan',
    urduName: 'احمد خان',
    role: 'farmer',
    village: 'Chak 57, Bahawalpur',
    phone: '0301-2345678',
    accountType: 'Farmer',
    verified: true,
    avatar: 'AK',
    joinDate: '2025-11-15',
  },
  shopkeeper: {
    id: 'user_shop_1',
    name: 'Muhammad Aslam',
    urduName: 'محمد اسلم',
    role: 'shopkeeper',
    village: 'Multan',
    businessName: 'Al-Rehman Kiryana Store',
    phone: '0302-9876543',
    accountType: 'Shopkeeper',
    verified: true,
    avatar: 'MA',
    joinDate: '2025-09-20',
  },
  women: {
    id: 'user_women_1',
    name: 'Ayesha Bibi',
    urduName: 'عائشہ بی بی',
    role: 'women',
    village: 'Rahim Yar Khan',
    businessName: 'Handmade Embroidery',
    phone: '0303-1112233',
    accountType: 'Women Entrepreneur',
    verified: true,
    avatar: 'AB',
    joinDate: '2026-01-10',
  },
  ngo: {
    id: 'user_ngo_1',
    name: 'Al Noor Foundation',
    urduName: 'النور فاؤنڈیشن',
    role: 'ngo',
    village: 'Lahore',
    phone: '042-35781234',
    accountType: 'NGO / Welfare',
    verified: true,
    avatar: 'AN',
    joinDate: '2025-06-01',
  },
  admin: {
    id: 'user_admin_1',
    name: 'Zarai Kalkan Admin',
    urduName: 'زرعی کلکن ایڈمن',
    role: 'admin',
    village: 'Islamabad',
    phone: '051-9876543',
    accountType: 'Administrator',
    verified: true,
    avatar: 'ZK',
    joinDate: '2025-01-01',
  },
};

// ---- TRANSACTIONS (Farmer) ----
export const farmerTransactions = [
  { id: 'txn_1', date: '2026-06-12', type: 'sale', description: 'Wheat Sale', category: 'Crops', amount: 12000 },
  { id: 'txn_2', date: '2026-06-10', type: 'expense', description: 'Fertilizer Purchase', category: 'Farming', amount: -5000 },
  { id: 'txn_3', date: '2026-06-07', type: 'expense', description: 'Labor Payment', category: 'Labor', amount: -3500 },
  { id: 'txn_4', date: '2026-06-04', type: 'sale', description: 'Milk Sale', category: 'Dairy', amount: 2500 },
  { id: 'txn_5', date: '2026-06-02', type: 'expense', description: 'Pesticide Spray', category: 'Farming', amount: -1800 },
  { id: 'txn_6', date: '2026-05-30', type: 'sale', description: 'Vegetable Sale', category: 'Crops', amount: 4200 },
  { id: 'txn_7', date: '2026-05-28', type: 'expense', description: 'Water Pump Repair', category: 'Equipment', amount: -2500 },
  { id: 'txn_8', date: '2026-05-25', type: 'sale', description: 'Cotton Sale', category: 'Crops', amount: 18000 },
  { id: 'txn_9', date: '2026-05-22', type: 'expense', description: 'Seeds Purchase', category: 'Farming', amount: -3200 },
  { id: 'txn_10', date: '2026-05-20', type: 'sale', description: 'Milk Sale', category: 'Dairy', amount: 2800 },
  { id: 'txn_11', date: '2026-05-18', type: 'expense', description: 'Diesel for Tractor', category: 'Equipment', amount: -4500 },
  { id: 'txn_12', date: '2026-05-15', type: 'sale', description: 'Wheat Sale', category: 'Crops', amount: 15000 },
  { id: 'txn_13', date: '2026-05-12', type: 'expense', description: 'Labor Payment', category: 'Labor', amount: -6000 },
  { id: 'txn_14', date: '2026-05-10', type: 'debt', description: 'Loan Repayment', category: 'Loan', amount: -5000 },
  { id: 'txn_15', date: '2026-05-08', type: 'sale', description: 'Sugarcane Sale', category: 'Crops', amount: 22000 },
];

// ---- TRANSACTIONS (Shopkeeper) ----
export const shopkeeperTransactions = [
  { id: 'stxn_1', date: '2026-06-12', type: 'sale', description: 'Grocery Sales', category: 'Daily Sales', amount: 4800 },
  { id: 'stxn_2', date: '2026-06-11', type: 'expense', description: 'Inventory Purchase', category: 'Stock', amount: -10000 },
  { id: 'stxn_3', date: '2026-06-10', type: 'sale', description: 'Customer Payment Received', category: 'Khata', amount: 1500 },
  { id: 'stxn_4', date: '2026-06-09', type: 'sale', description: 'Grocery Sales', category: 'Daily Sales', amount: 3200 },
  { id: 'stxn_5', date: '2026-06-08', type: 'expense', description: 'Electricity Bill', category: 'Utilities', amount: -2800 },
  { id: 'stxn_6', date: '2026-06-07', type: 'sale', description: 'Grocery Sales', category: 'Daily Sales', amount: 5100 },
  { id: 'stxn_7', date: '2026-06-06', type: 'expense', description: 'Shop Rent', category: 'Rent', amount: -8000 },
  { id: 'stxn_8', date: '2026-06-05', type: 'sale', description: 'Wholesale Order', category: 'Wholesale', amount: 12000 },
];

// ---- TRANSACTIONS (Women Entrepreneur) ----
export const womenTransactions = [
  { id: 'wtxn_1', date: '2026-06-12', type: 'sale', description: 'Embroidery Shawl Sale', category: 'Handicrafts', amount: 1800 },
  { id: 'wtxn_2', date: '2026-06-10', type: 'sale', description: 'Handmade Bags (3)', category: 'Handicrafts', amount: 3600 },
  { id: 'wtxn_3', date: '2026-06-08', type: 'expense', description: 'Thread & Material', category: 'Materials', amount: -1200 },
  { id: 'wtxn_4', date: '2026-06-06', type: 'sale', description: 'Bangles Set', category: 'Jewelry', amount: 2250 },
  { id: 'wtxn_5', date: '2026-06-04', type: 'sale', description: 'Embroidery Shawl Sale', category: 'Handicrafts', amount: 1800 },
  { id: 'wtxn_6', date: '2026-06-02', type: 'expense', description: 'Fabric Purchase', category: 'Materials', amount: -2500 },
  { id: 'wtxn_7', date: '2026-05-30', type: 'sale', description: 'Custom Order - Dress', category: 'Clothing', amount: 4500 },
  { id: 'wtxn_8', date: '2026-05-28', type: 'sale', description: 'Bangles Bulk Order', category: 'Jewelry', amount: 5850 },
];

// ---- CROPS ----
export const crops = [
  { id: 'crop_1', name: 'Wheat', area: '5 Acres', status: 'Healthy', statusColor: 'success', icon: '🌾' },
  { id: 'crop_2', name: 'Cotton', area: '3 Acres', status: 'Moderate Risk', statusColor: 'warning', icon: '🏵️' },
  { id: 'crop_3', name: 'Vegetables', area: '1 Acre', status: 'Healthy', statusColor: 'success', icon: '🥬' },
];

// ---- KHATA BOOK (Customers) ----
export const khataCustomers = [
  { id: 'kh_1', name: 'Ali Ahmed', phone: '0301-1111111', totalDue: 2500, lastPayment: 500, lastPaymentDate: '2026-06-05', status: 'pending', transactions: [
    { id: 'kht_1', date: '2026-05-15', type: 'debt', amount: 3000, description: 'Grocery items' },
    { id: 'kht_2', date: '2026-06-05', type: 'payment', amount: 500, description: 'Partial payment' },
  ]},
  { id: 'kh_2', name: 'Bashir Khan', phone: '0302-2222222', totalDue: 1000, lastPayment: 2000, lastPaymentDate: '2026-06-01', status: 'pending', transactions: [
    { id: 'kht_3', date: '2026-05-20', type: 'debt', amount: 3000, description: 'Seeds and fertilizer' },
    { id: 'kht_4', date: '2026-06-01', type: 'payment', amount: 2000, description: 'Payment received' },
  ]},
  { id: 'kh_3', name: 'Akram Shah', phone: '0303-3333333', totalDue: 3500, lastPayment: 0, lastPaymentDate: null, status: 'overdue', transactions: [
    { id: 'kht_5', date: '2026-04-10', type: 'debt', amount: 3500, description: 'Feed for livestock' },
  ]},
  { id: 'kh_4', name: 'Bilal Hussain', phone: '0304-4444444', totalDue: 2500, lastPayment: 1500, lastPaymentDate: '2026-05-28', status: 'pending', transactions: [
    { id: 'kht_6', date: '2026-05-10', type: 'debt', amount: 4000, description: 'Shop supplies' },
    { id: 'kht_7', date: '2026-05-28', type: 'payment', amount: 1500, description: 'Cash payment' },
  ]},
  { id: 'kh_5', name: 'Fatima Bibi', phone: '0305-5555555', totalDue: 0, lastPayment: 1800, lastPaymentDate: '2026-06-10', status: 'cleared', transactions: [
    { id: 'kht_8', date: '2026-05-05', type: 'debt', amount: 1800, description: 'Embroidery materials' },
    { id: 'kht_9', date: '2026-06-10', type: 'payment', amount: 1800, description: 'Full payment' },
  ]},
];

// ---- INSURANCE POLICIES ----
export const insurancePolicies = [
  { id: 'ins_1', type: 'Crop Insurance', icon: '🌾', coverage: 100000, premium: 500, status: 'active', startDate: '2026-01-01', endDate: '2026-12-31', provider: 'Pak Agri Insurance', takaful: true, details: 'Protection against floods, storms, droughts, and pest attacks for wheat and cotton crops.' },
  { id: 'ins_2', type: 'Livestock Insurance', icon: '🐄', coverage: 80000, premium: 350, status: 'active', startDate: '2026-01-01', endDate: '2026-12-31', provider: 'National Insurance', takaful: false, details: 'Coverage for 4 cows against disease, injury, and natural disasters.' },
  { id: 'ins_3', type: 'Shop Insurance', icon: '🏪', coverage: 50000, premium: 250, status: 'pending_renewal', startDate: '2025-06-01', endDate: '2026-05-31', provider: 'Rural Shield Insurance', takaful: true, details: 'Protection for shop inventory, equipment, and structure against fire, theft, and natural disasters.' },
  { id: 'ins_4', type: 'Health Micro-Insurance', icon: '🏥', coverage: 30000, premium: 200, status: 'active', startDate: '2026-03-01', endDate: '2027-02-28', provider: 'HealthGuard Pakistan', takaful: false, details: 'Basic emergency health coverage including hospitalization and accident cover.' },
];

// ---- INSURANCE CLAIMS ----
export const insuranceClaims = [
  { id: 'claim_1', policyId: 'ins_1', type: 'Crop Loss', date: '2026-03-15', amount: 25000, status: 'approved', description: 'Crop damage due to unexpected hailstorm in March 2026', resolvedDate: '2026-04-02' },
  { id: 'claim_2', policyId: 'ins_2', type: 'Livestock Injury', date: '2026-01-20', amount: 12000, status: 'completed', description: 'Cow injury requiring veterinary treatment', resolvedDate: '2026-02-10' },
];

// ---- INSURANCE PLANS (Browse) ----
export const insurancePlans = [
  { id: 'plan_1', name: 'Basic Crop Shield', type: 'Crop', coverage: 50000, premium: 300, duration: '6 months', features: ['Flood protection', 'Storm damage', 'Basic pest coverage'], takaful: true },
  { id: 'plan_2', name: 'Premium Crop Shield', type: 'Crop', coverage: 150000, premium: 750, duration: '12 months', features: ['All natural disasters', 'Pest & disease', 'Drought coverage', 'Replanting support'], takaful: true },
  { id: 'plan_3', name: 'Livestock Basic', type: 'Livestock', coverage: 40000, premium: 200, duration: '12 months', features: ['Disease coverage', 'Accident protection', 'Up to 2 animals'], takaful: false },
  { id: 'plan_4', name: 'Livestock Premium', type: 'Livestock', coverage: 100000, premium: 500, duration: '12 months', features: ['Full health coverage', 'Theft protection', 'Up to 6 animals', 'Veterinary support'], takaful: true },
  { id: 'plan_5', name: 'Shop Guard', type: 'Shop', coverage: 75000, premium: 400, duration: '12 months', features: ['Fire protection', 'Theft coverage', 'Natural disaster', 'Inventory loss'], takaful: false },
  { id: 'plan_6', name: 'Family Health', type: 'Health', coverage: 50000, premium: 350, duration: '12 months', features: ['Emergency hospitalization', 'Accident cover', 'Basic medicines', 'Family of 4'], takaful: true },
];

// ---- WEATHER DATA ----
export const weatherData = {
  current: {
    location: 'Bahawalpur',
    temperature: 37,
    humidity: 52,
    wind: 12,
    rainChance: 10,
    condition: 'sunny',
    riskLevel: 'green', // green, yellow, red
    riskText: 'No severe weather expected',
  },
  alerts: [
    { id: 'alert_1', date: '2026-06-11', title: 'Heatwave Warning', level: 'yellow', description: 'Temperature expected to exceed 45°C in coming days. Protect crops and livestock.', tips: ['Increase water supply to crops', 'Provide shade for livestock', 'Avoid field work during peak hours'] },
    { id: 'alert_2', date: '2026-06-05', title: 'Flood Watch', level: 'green', description: 'Minor flood risk in low-lying areas near river. No immediate action required.', tips: ['Monitor water levels', 'Keep emergency supplies ready'] },
    { id: 'alert_3', date: '2026-05-28', title: 'Pest Alert - Locust', level: 'yellow', description: 'Locust swarms reported in neighboring district. Apply preventive measures.', tips: ['Apply pesticide spray', 'Report sightings to agriculture department', 'Cover vulnerable crops'] },
    { id: 'alert_4', date: '2026-05-15', title: 'Heavy Rain Expected', level: 'yellow', description: 'Heavy rainfall expected in next 48 hours. Secure harvested crops.', tips: ['Move livestock to safer area', 'Secure crop storage', 'Monitor local advisories'] },
  ],
};

// ---- LOAN PROGRAMS ----
export const loanPrograms = [
  { id: 'loan_1', name: 'Agricultural Growth Loan', provider: 'Zarai Taraqiati Bank', maxAmount: 150000, duration: '12 Months', interestRate: '8%', eligibility: 'Farmers with 6+ months financial history', description: 'Support for crop cultivation, seeds, and fertilizer purchases.', icon: '🌾' },
  { id: 'loan_2', name: 'Livestock Financing', provider: 'National Bank of Pakistan', maxAmount: 80000, duration: '18 Months', interestRate: '9%', eligibility: 'Livestock owners with verified records', description: 'Financing for purchasing cattle, feed, and veterinary care.', icon: '🐄' },
  { id: 'loan_3', name: 'Women Business Support', provider: 'Khushhali Microfinance Bank', maxAmount: 50000, duration: '10 Months', interestRate: '6%', eligibility: 'Women entrepreneurs with business records', description: 'Special low-interest loans for women-led home businesses.', icon: '👩‍💼' },
  { id: 'loan_4', name: 'Shop Expansion Loan', provider: 'Mobilink Bank', maxAmount: 100000, duration: '15 Months', interestRate: '10%', eligibility: 'Shopkeepers with 3+ months records', description: 'Expand your shop, increase inventory, or upgrade equipment.', icon: '🏪' },
  { id: 'loan_5', name: 'Emergency Relief Loan', provider: 'ZTBL', maxAmount: 30000, duration: '6 Months', interestRate: '4%', eligibility: 'Disaster-affected users with verified losses', description: 'Quick emergency loans for disaster recovery.', icon: '🆘' },
];

export const loanApplications = [
  { id: 'lapp_1', programId: 'loan_1', programName: 'Agricultural Growth Loan', amount: 100000, date: '2026-04-15', status: 'approved', provider: 'Zarai Taraqiati Bank' },
];

// ---- DONATION CAMPAIGNS ----
export const donationCampaigns = [
  { id: 'camp_1', title: 'Flood Relief — Rajanpur', status: 'active', level: 'red', affectedFamilies: 43, estimatedLoss: 680000, fundsNeeded: 350000, fundsRaised: 195000, description: 'Emergency flood relief for 43 farming families in Rajanpur district. Crops destroyed, livestock lost.', startDate: '2026-05-20', location: 'Rajanpur, South Punjab', type: 'Emergency Disaster' },
  { id: 'camp_2', title: 'Monsoon Insurance Sponsorship', status: 'active', level: 'yellow', affectedFamilies: 100, estimatedLoss: 0, fundsNeeded: 150000, fundsRaised: 87000, description: 'Sponsor crop insurance for 100 small farmers before monsoon season begins.', startDate: '2026-06-01', location: 'Multiple Districts', type: 'Insurance Sponsorship' },
  { id: 'camp_3', title: 'Women Business Support — RYK', status: 'active', level: 'green', affectedFamilies: 25, estimatedLoss: 0, fundsNeeded: 125000, fundsRaised: 42000, description: 'Support 25 women entrepreneurs in Rahim Yar Khan with business starter kits and training.', startDate: '2026-05-10', location: 'Rahim Yar Khan', type: 'Women Business Support' },
  { id: 'camp_4', title: 'Drought Recovery — Tharparkar', status: 'completed', level: 'red', affectedFamilies: 67, estimatedLoss: 920000, fundsNeeded: 500000, fundsRaised: 500000, description: 'Drought recovery assistance for farming communities in Tharparkar.', startDate: '2026-02-15', location: 'Tharparkar, Sindh', type: 'Emergency Disaster' },
];

// ---- DONATIONS ----
export const donations = [
  { id: 'don_1', campaignId: 'camp_1', donor: 'Al Noor Foundation', amount: 25000, date: '2026-06-10', type: 'NGO' },
  { id: 'don_2', campaignId: 'camp_1', donor: 'Ahmed Ali', amount: 5000, date: '2026-06-08', type: 'Individual' },
  { id: 'don_3', campaignId: 'camp_1', donor: 'CSR Agriculture Fund', amount: 50000, date: '2026-06-05', type: 'Corporate' },
  { id: 'don_4', campaignId: 'camp_2', donor: 'Zakat Foundation', amount: 35000, date: '2026-06-09', type: 'Zakat' },
  { id: 'don_5', campaignId: 'camp_1', donor: 'Rural Support Program', amount: 30000, date: '2026-06-03', type: 'NGO' },
  { id: 'don_6', campaignId: 'camp_3', donor: 'Women Empowerment Trust', amount: 20000, date: '2026-06-07', type: 'NGO' },
  { id: 'don_7', campaignId: 'camp_2', donor: 'Muhammad Usman', amount: 8000, date: '2026-06-06', type: 'Individual' },
  { id: 'don_8', campaignId: 'camp_1', donor: 'Pakistan Agri Corp', amount: 40000, date: '2026-05-30', type: 'Corporate' },
];

// ---- MARKETPLACE PRODUCTS ----
export const marketplaceProducts = [
  { id: 'prod_1', name: 'Fresh Wheat', price: 3200, unit: '40kg bag', category: 'Farm Produce', seller: 'Ahmed Khan', location: 'Bahawalpur', image: '🌾', description: 'Premium quality wheat from irrigated fields.', listed: '2026-06-10' },
  { id: 'prod_2', name: 'Fresh Milk', price: 220, unit: 'per liter', category: 'Dairy Products', seller: 'Rashid Ali', location: 'Sahiwal', image: '🥛', description: 'Pure buffalo milk, fresh daily.', listed: '2026-06-12' },
  { id: 'prod_3', name: 'Handmade Shawl', price: 1800, unit: 'piece', category: 'Handicrafts', seller: 'Ayesha Bibi', location: 'Rahim Yar Khan', image: '🧣', description: 'Beautiful hand-embroidered shawl with traditional designs.', listed: '2026-06-08' },
  { id: 'prod_4', name: 'Fresh Mangoes', price: 220, unit: 'per kg', category: 'Farm Produce', seller: 'Imran Malik', location: 'Multan', image: '🥭', description: 'Chaunsa mangoes, export quality.', listed: '2026-06-11' },
  { id: 'prod_5', name: 'Handmade Bags', price: 1200, unit: 'piece', category: 'Handicrafts', seller: 'Ayesha Bibi', location: 'Rahim Yar Khan', image: '👜', description: 'Handcrafted fabric bags with embroidery.', listed: '2026-06-05' },
  { id: 'prod_6', name: 'Organic Vegetables', price: 150, unit: 'per kg', category: 'Farm Produce', seller: 'Hamid Shah', location: 'Bahawalpur', image: '🥬', description: 'Fresh organic vegetables from family farm.', listed: '2026-06-09' },
  { id: 'prod_7', name: 'Traditional Bangles', price: 450, unit: 'set of 12', category: 'Handicrafts', seller: 'Ayesha Bibi', location: 'Rahim Yar Khan', image: '💍', description: 'Colorful traditional bangles, perfect for gifts.', listed: '2026-06-07' },
  { id: 'prod_8', name: 'Honey (Pure)', price: 1500, unit: 'per kg', category: 'Farm Produce', seller: 'Tariq Mehmood', location: 'Swat', image: '🍯', description: 'Pure mountain honey from Swat valley.', listed: '2026-06-06' },
  { id: 'prod_9', name: 'Desi Ghee', price: 2200, unit: 'per kg', category: 'Dairy Products', seller: 'Rashid Ali', location: 'Sahiwal', image: '🧈', description: 'Pure desi ghee from buffalo milk.', listed: '2026-06-04' },
  { id: 'prod_10', name: 'Cotton Bales', price: 15000, unit: 'per bale', category: 'Farm Produce', seller: 'Ahmed Khan', location: 'Bahawalpur', image: '🏵️', description: 'High-quality cotton bales for textile industry.', listed: '2026-06-03' },
  { id: 'prod_11', name: 'Embroidery Dupatta', price: 950, unit: 'piece', category: 'Clothing', seller: 'Nazia Begum', location: 'Hyderabad', image: '🧵', description: 'Traditional Sindhi embroidered dupatta.', listed: '2026-06-02' },
  { id: 'prod_12', name: 'Brown Eggs', price: 350, unit: 'dozen', category: 'Farm Produce', seller: 'Karim Bux', location: 'Larkana', image: '🥚', description: 'Farm fresh brown eggs, free range.', listed: '2026-06-01' },
];

// ---- KNOWLEDGE CENTER LESSONS ----
export const lessons = [
  { id: 'les_1', title: 'How to Save Money', category: 'Financial Literacy', duration: '5 min', image: '💰', description: 'Learn simple money saving techniques for rural households.', content: 'Track every expense, set aside 10% of earnings, avoid unnecessary debt.' },
  { id: 'les_2', title: 'Understanding Crop Insurance', category: 'Insurance Guide', duration: '8 min', image: '🛡️', description: 'Everything you need to know about protecting your crops.', content: 'Crop insurance protects against weather damage, pest attacks, and natural disasters.' },
  { id: 'les_3', title: 'Basic Bookkeeping', category: 'Financial Literacy', duration: '10 min', image: '📒', description: 'Keep simple records of your income and expenses.', content: 'Write down every sale, purchase, and debt. Calculate profit by subtracting expenses from income.' },
  { id: 'les_4', title: 'How Loans Work', category: 'Loan Guide', duration: '7 min', image: '🏦', description: 'Understanding interest rates, repayment, and eligibility.', content: 'Banks lend money with interest. Pay back on time to maintain good financial standing.' },
  { id: 'les_5', title: 'Pest Control Methods', category: 'Farming Tips', duration: '6 min', image: '🐛', description: 'Natural and chemical methods to protect your crops.', content: 'Use integrated pest management: crop rotation, natural predators, and targeted spraying.' },
  { id: 'les_6', title: 'Livestock Health Care', category: 'Farming Tips', duration: '8 min', image: '🐄', description: 'Keep your animals healthy and productive.', content: 'Regular vaccination, clean water, proper feed, and shelter are essential.' },
  { id: 'les_7', title: 'Starting a Home Business', category: "Women's Business", duration: '12 min', image: '👩‍💼', description: 'Steps to start earning from home.', content: 'Identify your skill, calculate costs, set fair prices, find customers locally.' },
  { id: 'les_8', title: 'Product Pricing Guide', category: "Women's Business", duration: '6 min', image: '🏷️', description: 'How to price your products for profit.', content: 'Add material cost + labor cost + 30% profit margin = selling price.' },
  { id: 'les_9', title: 'Water Management', category: 'Farming Tips', duration: '7 min', image: '💧', description: 'Efficient irrigation and water saving techniques.', content: 'Drip irrigation saves 40% water. Water early morning or evening to reduce evaporation.' },
  { id: 'les_10', title: 'Understanding Zakat', category: 'Financial Literacy', duration: '5 min', image: '🕌', description: 'Zakat calculation and distribution basics.', content: 'Zakat is 2.5% of savings above nisab. It helps those in need and purifies wealth.' },
  { id: 'les_11', title: 'Flood Preparation', category: 'Insurance Guide', duration: '6 min', image: '🌊', description: 'How to prepare your farm for flood season.', content: 'Elevate storage, secure livestock, keep emergency supplies, know evacuation routes.' },
  { id: 'les_12', title: 'Avoiding Scams', category: 'Financial Literacy', duration: '5 min', image: '⚠️', description: 'Protect yourself from financial fraud.', content: 'Never share OTP, verify before sending money, avoid too-good-to-be-true offers.' },
];

// ---- NOTIFICATIONS ----
export const notifications = [
  { id: 'notif_1', title: 'Weather Alert', message: 'Heavy rain expected in Bahawalpur district', time: '2026-06-13T10:30:00', type: 'warning', read: false },
  { id: 'notif_2', title: 'Insurance Reminder', message: 'Shop insurance policy renewal due in 5 days', time: '2026-06-13T09:00:00', type: 'info', read: false },
  { id: 'notif_3', title: 'Payment Received', message: 'Rs. 500 received from Ali Ahmed (Khata)', time: '2026-06-12T16:45:00', type: 'success', read: true },
  { id: 'notif_4', title: 'New Donation', message: 'Al Noor Foundation donated Rs. 25,000 to Flood Relief campaign', time: '2026-06-12T14:20:00', type: 'success', read: true },
  { id: 'notif_5', title: 'Crop Alert', message: 'Pest activity reported near your area. Check cotton crops.', time: '2026-06-11T11:00:00', type: 'warning', read: true },
];

// ---- PLATFORM STATS (Admin) ----
export const platformStats = {
  registeredFarmers: 2384,
  womenEntrepreneurs: 786,
  shopkeepers: 1142,
  ngos: 23,
  insurancePartners: 4,
  monthlyTransactions: 18520,
  totalRecordedIncome: 47800000,
  totalRecordedExpenses: 32400000,
  greenAreas: 62,
  yellowAreas: 11,
  redAreas: 3,
  marketplaceListings: 148,
  activeSellers: 62,
  monthlyMarketTransactions: 189,
};

// ---- RECENT REGISTRATIONS (Admin) ----
export const recentRegistrations = [
  { id: 'reg_1', name: 'Ahmed Khan', role: 'Farmer', location: 'Bahawalpur', date: '2026-06-12' },
  { id: 'reg_2', name: 'Ayesha Bibi', role: 'Women Entrepreneur', location: 'Rahim Yar Khan', date: '2026-06-11' },
  { id: 'reg_3', name: 'Muhammad Aslam', role: 'Shopkeeper', location: 'Multan', date: '2026-06-10' },
  { id: 'reg_4', name: 'Fatima Khatoon', role: 'Women Entrepreneur', location: 'Hyderabad', date: '2026-06-09' },
  { id: 'reg_5', name: 'Karim Bux', role: 'Farmer', location: 'Larkana', date: '2026-06-08' },
  { id: 'reg_6', name: 'Nadia Bibi', role: 'Shopkeeper', location: 'Peshawar', date: '2026-06-07' },
  { id: 'reg_7', name: 'Shahbaz Gill', role: 'Farmer', location: 'Faisalabad', date: '2026-06-06' },
];

// ---- LOW STOCK (Shopkeeper) ----
export const lowStockItems = [
  { id: 'ls_1', name: 'Cooking Oil', remaining: 6, unit: 'Units', icon: '🫗' },
  { id: 'ls_2', name: 'Sugar', remaining: 12, unit: 'Kg', icon: '🍬' },
  { id: 'ls_3', name: 'Tea Packets', remaining: 8, unit: 'Units', icon: '🍵' },
  { id: 'ls_4', name: 'Flour', remaining: 15, unit: 'Kg', icon: '🌾' },
];

// ---- WOMEN ACHIEVEMENTS ----
export const womenAchievements = [
  { id: 'ach_1', title: 'First Sale', icon: '🎉', earned: true, earnedDate: '2026-01-20' },
  { id: 'ach_2', title: '10 Products Sold', icon: '⭐', earned: true, earnedDate: '2026-03-15' },
  { id: 'ach_3', title: 'Verified Seller', icon: '✅', earned: true, earnedDate: '2026-02-01' },
  { id: 'ach_4', title: '50 Products Sold', icon: '🏆', earned: false, earnedDate: null },
  { id: 'ach_5', title: 'Top Rated', icon: '💎', earned: false, earnedDate: null },
];

// ---- SUPPORT REQUESTS (NGO) ----
export const supportRequests = [
  { id: 'sr_1', requester: 'Ahmed Khan', type: 'Flood Recovery', village: 'Chak 57, Bahawalpur', date: '2026-06-10', status: 'pending', urgency: 'high', description: '3 acres of wheat destroyed by flood water. Need seeds and equipment support.', verifiedBy: 'Village Cooperative' },
  { id: 'sr_2', requester: 'Fatima Bibi', type: 'Business Support', village: 'Rahim Yar Khan', date: '2026-06-08', status: 'approved', urgency: 'medium', description: 'Requesting sewing machine and initial materials for embroidery business.', verifiedBy: 'Community Leader' },
  { id: 'sr_3', requester: 'Karim Bux', type: 'Livestock Replacement', village: 'Larkana', date: '2026-06-05', status: 'completed', urgency: 'high', description: '2 cows lost to disease. Requesting livestock replacement support.', verifiedBy: 'Veterinary Officer' },
  { id: 'sr_4', requester: 'Bashir Khan', type: 'Equipment Assistance', village: 'Rajanpur', date: '2026-06-03', status: 'pending', urgency: 'low', description: 'Water pump broken. Need repair or replacement assistance.', verifiedBy: null },
];

// ---- NGO DISTRICTS ----
export const ngoDistricts = [
  { name: 'Rajanpur', status: 'red', farmers: 43, women: 18, shopkeepers: 11, pendingRequests: 29, approvedRequests: 24, completedRequests: 13 },
  { name: 'Rahim Yar Khan', status: 'yellow', farmers: 156, women: 67, shopkeepers: 43, pendingRequests: 12, approvedRequests: 45, completedRequests: 38 },
  { name: 'Bahawalpur', status: 'green', farmers: 234, women: 89, shopkeepers: 78, pendingRequests: 5, approvedRequests: 23, completedRequests: 67 },
  { name: 'Multan', status: 'green', farmers: 312, women: 124, shopkeepers: 156, pendingRequests: 8, approvedRequests: 34, completedRequests: 89 },
  { name: 'Tharparkar', status: 'yellow', farmers: 89, women: 45, shopkeepers: 23, pendingRequests: 15, approvedRequests: 28, completedRequests: 21 },
  { name: 'Jacobabad', status: 'red', farmers: 67, women: 23, shopkeepers: 15, pendingRequests: 22, approvedRequests: 12, completedRequests: 8 },
  { name: 'Swat', status: 'green', farmers: 178, women: 56, shopkeepers: 45, pendingRequests: 3, approvedRequests: 18, completedRequests: 42 },
];

// ---- MONTHLY DATA FOR CHARTS ----
export const monthlyData = {
  income: [35000, 42000, 38000, 45000, 52000, 48500],
  expenses: [22000, 28000, 25000, 30000, 35000, 31200],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
};

export const expenseCategories = [
  { name: 'Farming', amount: 12500, color: '#2E7D32' },
  { name: 'Labor', amount: 9500, color: '#8D6E63' },
  { name: 'Equipment', amount: 7000, color: '#F9A825' },
  { name: 'Utilities', amount: 2200, color: '#2196F3' },
];

// ---- FINANCIAL SCORE ----
export const financialScore = {
  score: 72,
  maxScore: 100,
  label: 'Good Standing',
  factors: [
    { name: 'Transaction History', score: 85, description: '6 months of consistent records' },
    { name: 'Income Stability', score: 78, description: 'Regular income from multiple sources' },
    { name: 'Debt Management', score: 65, description: 'Some outstanding debts but manageable' },
    { name: 'Insurance Coverage', score: 60, description: 'Active crop and livestock insurance' },
  ],
};
