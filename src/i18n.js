// ============================================
// ZARAI KALKAN — Internationalization (i18n)
// Multilingual translation system
// ============================================

import store from './store.js';

const translations = {
  en: {
    // App
    appName: 'Zarai Kalkan',
    appTagline: 'Agricultural Shield',
    appSubtitle: 'Protecting, Connecting, and Empowering Rural Pakistan',

    // Navigation
    navDashboard: 'Dashboard',
    navAccounting: 'Accounting',
    navKhataBook: 'Khata Book',
    navReports: 'Reports',
    navInsurance: 'Insurance',
    navWeather: 'Weather Alerts',
    navLoans: 'Loans',
    navSupport: 'Support Network',
    navMarketplace: 'Village Business Hub',
    navKnowledge: 'Knowledge Center',
    navSettings: 'Settings',
    navAdmin: 'Admin Panel',
    navSMS: 'SMS Demo',

    // Section Labels
    sectionMain: 'Main',
    sectionFinance: 'Financial',
    sectionProtection: 'Protection',
    sectionCommunity: 'Community',
    sectionSystem: 'System',

    // Common
    search: 'Search',
    searchPlaceholder: 'Search products, reports, alerts...',
    filter: 'Filter',
    sortBy: 'Sort by',
    all: 'All',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    close: 'Close',
    view: 'View',
    download: 'Download',
    print: 'Print',
    status: 'Status',
    date: 'Date',
    amount: 'Amount',
    actions: 'Actions',
    total: 'Total',
    active: 'Active',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    completed: 'Completed',
    loading: 'Loading...',
    noData: 'No data found',
    notifications: 'Notifications',
    profile: 'Profile',
    logout: 'Logout',
    language: 'Language',

    // Dashboard
    welcomeGreeting: 'Assalam-o-Alaikum',
    thisMonth: 'This Month',
    income: 'Income',
    expenses: 'Expenses',
    profit: 'Estimated Profit',
    outstandingDebt: 'Outstanding Debt',
    recentTransactions: 'Recent Transactions',
    cropOverview: 'Crop Overview',
    weatherAlerts: 'Weather Alerts',
    insuranceStatus: 'Insurance Status',
    quickActions: 'Quick Actions',
    addExpense: 'Add Expense',
    addSale: 'Add Sale',
    addIncome: 'Add Income',
    generateReport: 'Generate Report',
    viewInsurance: 'View Insurance',
    requestSupport: 'Request Support',

    // Accounting
    addTransaction: 'Add Transaction',
    transactionType: 'Transaction Type',
    sale: 'Sale',
    purchase: 'Purchase',
    expense: 'Expense',
    debt: 'Debt',
    description: 'Description',
    category: 'Category',
    profitLoss: 'Profit & Loss',
    cashFlow: 'Cash Flow',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    netProfit: 'Net Profit',

    // Khata Book
    addCustomer: 'Add Customer',
    customerName: 'Customer Name',
    amountDue: 'Amount Due',
    lastPayment: 'Last Payment',
    recordPayment: 'Record Payment',
    recordDebt: 'Record Debt',
    markCleared: 'Mark as Cleared',
    overdue: 'Overdue',
    cleared: 'Cleared',
    totalDue: 'Total Due',

    // Insurance
    cropInsurance: 'Crop Insurance',
    livestockInsurance: 'Livestock Insurance',
    shopInsurance: 'Shop Insurance',
    healthInsurance: 'Health Insurance',
    coverage: 'Coverage',
    premium: 'Premium',
    submitClaim: 'Submit Claim',
    claimHistory: 'Claim History',
    browsePlans: 'Browse Plans',
    activePolicies: 'Active Policies',
    underReview: 'Under Review',
    takafulAvailable: 'Takaful Available',

    // Weather
    currentWeather: 'Current Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    wind: 'Wind',
    rainChance: 'Rain Chance',
    riskLevel: 'Risk Level',
    safe: 'Safe',
    warning: 'Warning',
    emergency: 'Emergency',
    emergencyTips: 'Emergency Tips',

    // Loans
    financialScore: 'Financial Profile Score',
    goodStanding: 'Good Standing',
    availablePrograms: 'Available Programs',
    maxAmount: 'Max Amount',
    repayment: 'Repayment',
    applyNow: 'Apply Now',
    applicationHistory: 'Application History',

    // Donations
    activeCampaigns: 'Active Campaigns',
    affectedFamilies: 'Affected Families',
    fundsNeeded: 'Funds Needed',
    fundsRaised: 'Funds Raised',
    donate: 'Donate',
    sponsor: 'Sponsor',
    transparencyReport: 'Transparency Report',
    recentDonations: 'Recent Donations',
    emergencyCampaign: 'Emergency Campaign',

    // Marketplace
    productsListed: 'Products Listed',
    activeSellers: 'Active Sellers',
    addListing: 'Add Listing',
    contactSeller: 'Contact Seller',
    productName: 'Product Name',
    price: 'Price',
    seller: 'Seller',
    location: 'Location',

    // Knowledge
    financialLiteracy: 'Financial Literacy',
    farmingTips: 'Farming Tips',
    insuranceGuide: 'Insurance Guide',
    loanGuide: 'Loan Guide',
    womenBusiness: "Women's Business",
    markComplete: 'Mark Complete',
    savedLessons: 'Saved Lessons',
    progress: 'Progress',

    // Roles
    farmer: 'Farmer',
    shopkeeper: 'Shopkeeper',
    womenEntrepreneur: 'Women Entrepreneur',
    ngo: 'NGO / Welfare',
    admin: 'Administrator',
    selectRole: 'Select Your Role',
    continueAs: 'Continue as',

    // Months
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },

  ur: {
    // App
    appName: 'زرعی کلکن',
    appTagline: 'زرعی ڈھال',
    appSubtitle: 'دیہی پاکستان کی حفاظت، رابطہ اور بااختیاری',

    // Navigation
    navDashboard: 'ڈیش بورڈ',
    navAccounting: 'حساب کتاب',
    navKhataBook: 'کھاتا بک',
    navReports: 'رپورٹس',
    navInsurance: 'بیمہ',
    navWeather: 'موسمی الرٹس',
    navLoans: 'قرضے',
    navSupport: 'سپورٹ نیٹ ورک',
    navMarketplace: 'گاؤں بزنس ہب',
    navKnowledge: 'نالج سینٹر',
    navSettings: 'ترتیبات',
    navAdmin: 'ایڈمن پینل',
    navSMS: 'ایس ایم ایس ڈیمو',

    // Section Labels
    sectionMain: 'مرکزی',
    sectionFinance: 'مالیاتی',
    sectionProtection: 'تحفظ',
    sectionCommunity: 'کمیونٹی',
    sectionSystem: 'سسٹم',

    // Common
    search: 'تلاش',
    searchPlaceholder: 'مصنوعات، رپورٹس، الرٹس تلاش کریں...',
    filter: 'فلٹر',
    sortBy: 'ترتیب',
    all: 'سب',
    add: 'شامل کریں',
    edit: 'ترمیم',
    delete: 'حذف',
    save: 'محفوظ کریں',
    cancel: 'منسوخ',
    submit: 'جمع کریں',
    close: 'بند کریں',
    view: 'دیکھیں',
    download: 'ڈاؤن لوڈ',
    print: 'پرنٹ',
    status: 'حالت',
    date: 'تاریخ',
    amount: 'رقم',
    actions: 'اقدامات',
    total: 'کل',
    active: 'فعال',
    pending: 'زیر التوا',
    approved: 'منظور شدہ',
    rejected: 'مسترد',
    completed: 'مکمل',
    loading: 'لوڈ ہو رہا ہے...',
    noData: 'کوئی ڈیٹا نہیں ملا',
    notifications: 'اطلاعات',
    profile: 'پروفائل',
    logout: 'لاگ آؤٹ',
    language: 'زبان',

    // Dashboard
    welcomeGreeting: 'السلام علیکم',
    thisMonth: 'اس ماہ',
    income: 'آمدنی',
    expenses: 'اخراجات',
    profit: 'تخمینی منافع',
    outstandingDebt: 'واجب الادا قرض',
    recentTransactions: 'حالیہ لین دین',
    cropOverview: 'فصلوں کا جائزہ',
    weatherAlerts: 'موسمی الرٹس',
    insuranceStatus: 'بیمہ کی حالت',
    quickActions: 'فوری اقدامات',
    addExpense: 'خرچہ شامل کریں',
    addSale: 'فروخت شامل کریں',
    addIncome: 'آمدنی شامل کریں',
    generateReport: 'رپورٹ بنائیں',
    viewInsurance: 'بیمہ دیکھیں',
    requestSupport: 'مدد کی درخواست',

    // Accounting
    addTransaction: 'لین دین شامل کریں',
    transactionType: 'لین دین کی قسم',
    sale: 'فروخت',
    purchase: 'خریداری',
    expense: 'خرچہ',
    debt: 'قرض',
    description: 'تفصیل',
    category: 'زمرہ',
    profitLoss: 'نفع و نقصان',
    cashFlow: 'نقد بہاؤ',
    totalIncome: 'کل آمدنی',
    totalExpenses: 'کل اخراجات',
    netProfit: 'خالص منافع',

    // Khata Book
    addCustomer: 'گاہک شامل کریں',
    customerName: 'گاہک کا نام',
    amountDue: 'واجب الادا رقم',
    lastPayment: 'آخری ادائیگی',
    recordPayment: 'ادائیگی درج کریں',
    recordDebt: 'قرض درج کریں',
    markCleared: 'صاف شدہ نشان زد کریں',
    overdue: 'واجب الادا',
    cleared: 'صاف شدہ',
    totalDue: 'کل واجب الادا',

    // Insurance
    cropInsurance: 'فصل کا بیمہ',
    livestockInsurance: 'مویشیوں کا بیمہ',
    shopInsurance: 'دکان کا بیمہ',
    healthInsurance: 'صحت کا بیمہ',
    coverage: 'کوریج',
    premium: 'پریمیم',
    submitClaim: 'دعویٰ جمع کریں',
    claimHistory: 'دعووں کی تاریخ',
    browsePlans: 'پلانز دیکھیں',
    activePolicies: 'فعال پالیسیاں',
    underReview: 'زیر جائزہ',
    takafulAvailable: 'تکافل دستیاب ہے',

    // Weather
    currentWeather: 'موجودہ موسم',
    temperature: 'درجہ حرارت',
    humidity: 'نمی',
    wind: 'ہوا',
    rainChance: 'بارش کا امکان',
    riskLevel: 'خطرے کی سطح',
    safe: 'محفوظ',
    warning: 'انتباہ',
    emergency: 'ایمرجنسی',
    emergencyTips: 'ایمرجنسی مشورے',

    // Loans
    financialScore: 'مالیاتی پروفائل سکور',
    goodStanding: 'اچھی حیثیت',
    availablePrograms: 'دستیاب پروگرام',
    maxAmount: 'زیادہ سے زیادہ رقم',
    repayment: 'واپسی',
    applyNow: 'ابھی درخواست دیں',
    applicationHistory: 'درخواستوں کی تاریخ',

    // Donations
    activeCampaigns: 'فعال مہمات',
    affectedFamilies: 'متاثرہ خاندان',
    fundsNeeded: 'مطلوبہ فنڈز',
    fundsRaised: 'جمع شدہ فنڈز',
    donate: 'عطیہ دیں',
    sponsor: 'کفالت کریں',
    transparencyReport: 'شفافیت رپورٹ',
    recentDonations: 'حالیہ عطیات',
    emergencyCampaign: 'ایمرجنسی مہم',

    // Marketplace
    productsListed: 'درج مصنوعات',
    activeSellers: 'فعال فروخت کنندگان',
    addListing: 'فہرست شامل کریں',
    contactSeller: 'فروخت کنندہ سے رابطہ',
    productName: 'مصنوعات کا نام',
    price: 'قیمت',
    seller: 'فروخت کنندہ',
    location: 'مقام',

    // Knowledge
    financialLiteracy: 'مالیاتی خواندگی',
    farmingTips: 'کاشتکاری کے مشورے',
    insuranceGuide: 'بیمہ گائیڈ',
    loanGuide: 'قرض گائیڈ',
    womenBusiness: 'خواتین کاروبار',
    markComplete: 'مکمل نشان زد کریں',
    savedLessons: 'محفوظ اسباق',
    progress: 'پیش رفت',

    // Roles
    farmer: 'کسان',
    shopkeeper: 'دکاندار',
    womenEntrepreneur: 'خاتون کاروباری',
    ngo: 'این جی او / فلاحی',
    admin: 'ایڈمنسٹریٹر',
    selectRole: 'اپنا کردار منتخب کریں',
    continueAs: 'بطور جاری رکھیں',

    // Months
    months: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'],
  },
};

// Get current language
export function getCurrentLang() {
  return store.getState().language || 'en';
}

// Translate a key
export function t(key) {
  const lang = getCurrentLang();
  return translations[lang]?.[key] || translations['en']?.[key] || key;
}

// Set language
export function setLanguage(lang) {
  const html = document.documentElement;
  const rtlLangs = ['ur', 'pa', 'sd', 'ps', 'sk'];

  if (rtlLangs.includes(lang)) {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', lang);
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  }

  localStorage.setItem('zk-lang', lang);
  store.setState({ language: lang });
}

// Initialize language on app start
export function initLanguage() {
  const saved = localStorage.getItem('zk-lang') || 'en';
  setLanguage(saved);
}

// Available languages
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'pa', name: 'Punjabi', nativeName: 'پنجابی', flag: '🇵🇰' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سندھی', flag: '🇵🇰' },
  { code: 'ps', name: 'Pashto', nativeName: 'پشتو', flag: '🇵🇰' },
  { code: 'sk', name: 'Saraiki', nativeName: 'سرائیکی', flag: '🇵🇰' },
];

export default { t, setLanguage, initLanguage, getCurrentLang, languages };
