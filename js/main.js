/**
 * FinTrack Application Logic
 * Pure Vanilla JS, No Frameworks
 */

const App = (() => {
    // --- State Management ---
    const STORAGE_KEY = 'fintrack_data_v1';
    
    let state = {
        transactions: [],
        categories: [
            { id: 'food', name: 'Продукты', color: '#f87171', icon: 'tag' },
            { id: 'transport', name: 'Транспорт', color: '#60a5fa', icon: 'list' },
            { id: 'entertainment', name: 'Развлечения', color: '#a78bfa', icon: 'target' },
            { id: 'housing', name: 'Жильё', color: '#34d399', icon: 'home' },
            { id: 'salary', name: 'Зарплата', color: '#4ade80', icon: 'arrow-up' },
            { id: 'other', name: 'Другое', color: '#9ca3af', icon: 'plus' }
        ],
        goals: [],
        settings: {
            currency: 'RUB',
            firstDayOfWeek: 1
        }
    };

    const currencies = {
        RUB: { symbol: '₽', code: 'RUB' },
        USD: { symbol: '$', code: 'USD' },
        EUR: { symbol: '€', code: 'EUR' },
        KZT: { symbol: '₸', code: 'KZT' },
        UAH: { symbol: '₴', code: 'UAH' }
    };

    // --- DOM Elements Cache ---
    const els = {};

    // --- Initialization ---
    function init() {
        cacheDOMElements();
        loadData();
        bindEvents();
        renderAllViews();
        setupKeyboardShortcuts();
    }

    function cacheDOMElements() {
        els.sidebar = document.getElementById('sidebar');
        els.mobileToggle = document.getElementById('mobileToggle');
        els.navItems = document.querySelectorAll('.nav-item');
        els.views = document.querySelectorAll('.view-section');
        els.viewTitle = document.getElementById('viewTitle');
        els.addTxBtn = document.getElementById('addTransactionBtn');
        
        // Modal
        els.txModal = document.getElementById('txModal');
        els.txForm = document.getElementById('txForm');
        els.closeTxModal = document.getElementById('closeTxModal');
        els.cancelTxBtn = document.getElementById('cancelTxBtn');
        els.txTypeBtns = document.querySelectorAll('.type-btn');
        els.txTypeInput = document.getElementById('txType');
        els.txCategorySelect = document.getElementById('txCategory');
        els.txDateInput = document.getElementById('txDate');
        
        // Dashboard
        els.totalBalance = document.getElementById('totalBalance');
        els.balanceTrend = document.getElementById('balanceTrend');
        els.monthIncome = document.getElementById('monthIncome');
        els.monthExpense = document.getElementById('monthExpense');
        els.savingsRate = document.getElementById('savingsRate');
        els.recentTxList = document.getElementById('recentTransactionsList');
        
        // Charts Canvases
        els.expenseDonutCanvas = document.getElementById('expenseDonut');
        els.donutTotal = document.getElementById('donutTotal');
        els.expenseLegend = document.getElementById('expenseLegend');
        
        // Transactions View
        els.txTableBody = document.getElementById('transactionsTableBody');
        els.txSearch = document.getElementById('txSearch');
        els.txTypeFilter = document.getElementById('txTypeFilter');
        els.txCategoryFilter = document.getElementById('txCategoryFilter');
        els.emptyStateTx = document.getElementById('emptyStateTx');
        
        // Categories View
        els.categoryList = document.getElementById('categoryList');
        els.categoryForm = document.getElementById('categoryForm');
        
        // Goals View
        els.goalsContainer = document.getElementById('goalsContainer');
        els.goalForm = document.getElementById('goalForm');
        
        // Settings
        els.currencySelect = document.getElementById('currencySelect');
        els.exportBtn = document.getElementById('exportDataBtn');
        els.importInput = document.getElementById('importFileInput');
        els.resetBtn = document.getElementById('resetDataBtn');
        
        // Toast
        els.toastContainer = document.getElementById('toastContainer');
    }

    // --- Data Persistence ---
    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            showToast('Ошибка сохранения данных', 'error');
        }
    }

    function loadData() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Merge with defaults to handle schema changes
                state = { ...state, ...parsed };
                // Ensure arrays exist
                if (!Array.isArray(state.transactions)) state.transactions = [];
                if (!Array.isArray(state.categories)) state.categories = [];
                if (!Array.isArray(state.goals)) state.goals = [];
            } catch (e) {
                console.error("
