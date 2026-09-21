/**
 * FinTrack Application Logic - Fixed Version
 */

const App = (() => {
    // --- State Management ---
    const STORAGE_KEY = 'fintrack_data_v1';
    
    let state = {
        transactions: [],
        categories: [
            { id: 'food', name: 'Продукты', color: '#f87171' },
            { id: 'transport', name: 'Транспорт', color: '#60a5fa' },
            { id: 'entertainment', name: 'Развлечения', color: '#a78bfa' },
            { id: 'housing', name: 'Жильё', color: '#34d399' },
            { id: 'salary', name: 'Зарплата', color: '#4ade80' },
            { id: 'other', name: 'Другое', color: '#9ca3af' }
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
        
        // Initial render of everything
        renderAllViews();
        
        // Setup keyboard shortcuts
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
                state = { ...state, ...parsed };
                if (!Array.isArray(state.transactions)) state.transactions = [];
                if (!Array.isArray(state.categories)) state.categories = [];
                if (!Array.isArray(state.goals)) state.goals = [];
            } catch (e) {
                console.error("Failed to parse local storage", e);
            }
        }
    }

    // --- Event Listeners ---
    function bindEvents() {
        // Navigation
        els.navItems.forEach(item => {
            item.addEventListener('click', () => switchView(item.dataset.view));
        });
        els.mobileToggle.addEventListener('click', () => {
            els.sidebar.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !els.sidebar.contains(e.target) && 
                !els.mobileToggle.contains(e.target) &&
                els.sidebar.classList.contains('open')) {
                els.sidebar.classList.remove('open');
            }
        });

        // Global Actions
        els.addTxBtn.addEventListener('click', () => openTxModal());
        els.closeTxModal.addEventListener('click', closeTxModal);
        els.cancelTxBtn.addEventListener('click', closeTxModal);
        els.txModal.addEventListener('click', (e) => {
            if (e.target === els.txModal) closeTxModal();
        });

        // Type Switcher in Modal
        els.txTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                els.txTypeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                els.txTypeInput.value = btn.dataset.type;
                updateCategoryOptionsForType(btn.dataset.type);
            });
        });

        // Form Submissions
        els.txForm.addEventListener('submit', handleTxSubmit);
        els.categoryForm.addEventListener('submit', handleCatSubmit);
        els.goalForm.addEventListener('submit', handleGoalSubmit);

        // Filters
        els.txSearch.addEventListener('input', renderTransactionsTable);
        els.txTypeFilter.addEventListener('change', renderTransactionsTable);
        els.txCategoryFilter.addEventListener('change', renderTransactionsTable);

        // Settings
        els.currencySelect.addEventListener('change', (e) => {
            state.settings.currency = e.target.value;
            saveData();
            renderDashboardStats();
            renderTransactionsTable();
            showToast('Валюта обновлена', 'success');
        });

        els.exportBtn.addEventListener('click', exportData);
        els.importInput.addEventListener('change', importData);
        els.resetBtn.addEventListener('click', resetData);
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeTxModal();
            if (e.key.toLowerCase() === 'n' && !isInputFocused()) {
                e.preventDefault();
                openTxModal();
            }
        });
    }

    function isInputFocused() {
        const tag = document.activeElement.tagName;
        return ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag);
    }

    // --- Core Logic: Transactions ---
    function openTxModal(txId = null) {
        els.txForm.reset();
        els.txTypeInput.value = 'expense';
        els.txTypeBtns.forEach(b => b.classList.remove('active'));
        document.querySelector(`.type-btn[data-type="expense"]`).classList.add('active');
        
        els.txDateInput.valueAsDate = new Date();
        updateCategoryOptionsForType('expense');

        if (txId) {
            const tx = state.transactions.find(t => t.id === txId);
            if (tx) {
                document.getElementById('modalTitle').textContent = 'Редактировать транзакцию';
                document.getElementById('txId').value = tx.id;
                document.getElementById('txAmount').value = tx.amount;
                document.getElementById('txComment').value = tx.comment || '';
                
                els.txTypeInput.value = tx.type;
                els.txTypeBtns.forEach(b => {
                    b.classList.toggle('active', b.dataset.type === tx.type);
                });
                updateCategoryOptionsForType(tx.type);
                document.getElementById('txCategory').value = tx.categoryId;
                document.getElementById('txDate').value = tx.date;
            }
        } else {
            document.getElementById('modalTitle').textContent = 'Новая транзакция';
            document.getElementById('txId').value = '';
        }

        els.txModal.classList.add('open');
        setTimeout(() => document.getElementById('txAmount').focus(), 100);
    }

    function closeTxModal() {
        els.txModal.classList.remove('open');
    }

    function updateCategoryOptionsForType(type) {
        els.txCategorySelect.innerHTML = '';
        state.categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = cat.name;
            els.txCategorySelect.appendChild(opt);
        });
    }

    function handleTxSubmit(e) {
        e.preventDefault();
        
        const id = document.getElementById('txId').value;
        const amount = parseFloat(document.getElementById('txAmount').value);
        const categoryId = document.getElementById('txCategory').value;
        const date = document.getElementById('txDate').value;
        const comment = document.getElementById('txComment').value.trim();
        const type = els.txTypeInput.value;

        if (isNaN(amount) || amount <= 0) {
            showToast('Сумма должна быть больше нуля', 'error');
            return;
        }
        if (!categoryId) {
            showToast('Выберите категорию', 'error');
            return;
        }
        if (!date) {
            showToast('Укажите дату', 'error');
            return;
        }
        
        const today = new Date();
        today.setHours(0,0,0,0);
        if (new Date(date) > today) {
             showToast('Дата не может быть в будущем', 'error');
             return;
        }

        const txObj = {
            id: id || generateUUID(),
            amount,
            categoryId,
            date,
            comment,
            type,
            createdAt: id ? undefined : new Date().toISOString()
        };

        if (id) {
            const idx = state.transactions.findIndex(t => t.id === id);
            if (idx !== -1) {
                state.transactions[idx] = { ...state.transactions[idx], ...txObj };
                showToast('Транзакция обновлена', 'success');
            }
        } else {
            state.transactions.push(txObj);
            showToast('Транзакция добавлена', 'success');
        }

        saveData();
        renderAllViews(); // Re-render everything after change
        closeTxModal();
    }

    function deleteTransaction(id) {
        if(confirm('Удалить эту транзакцию?')) {
            state.transactions = state.transactions.filter(t => t.id !== id);
            saveData();
            renderAllViews();
            showToast('Транзакция удалена', 'info');
        }
    }

    // --- Core Logic: Categories ---
    function handleCatSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('catName').value.trim();
        const color = document.getElementById('catColor').value;
        
        if(!name) return;
        
        const newCat = {
            id: generateUUID(),
            name,
            color
        };
        
        state.categories.push(newCat);
        saveData();
        renderCategories(); // Only re-render categories list
        populateFilters();  // Update dropdowns elsewhere
        showToast('Категория добавлена', 'success');
        e.target.reset();
    }

    function deleteCategory(id) {
        const usedInTx = state.transactions.some(t => t.categoryId === id);
        if (usedInTx) {
            showToast('Нельзя удалить категорию с транзакциями', 'error');
            return;
        }
        
        if(confirm('Удалить категорию?')) {
            state.categories = state.categories.filter(c => c.id !== id);
            saveData();
            renderCategories();
            populateFilters();
            showToast('Категория удалена', 'info');
        }
    }

    // --- Core Logic: Goals ---
    function handleGoalSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('goalName').value.trim();
        const target = parseFloat(document.getElementById('goalTarget').value);
        const deadline = document.getElementById('goalDeadline').value;
        
        if(!name || isNaN(target) || target <= 0) return;
        
        const newGoal = {
            id: generateUUID(),
            name,
            target,
            current: 0,
            deadline,
            completed: false
        };
        
        state.goals.push(newGoal);
        saveData();
        renderGoals(); // Only re-render goals
        showToast('Цель создана', 'success');
        e.target.reset();
    }

    function updateGoalProgress(id, change) {
        const goal = state.goals.find(g => g.id === id);
        if(goal) {
            goal.current += change;
            if(goal.current >= goal.target) {
                goal.completed = true;
                goal.current = goal.target;
            } else {
                goal.completed = false;
            }
            if(goal.current < 0) goal.current = 0;
            
            saveData();
            renderGoals();
        }
    }

    // --- Rendering Functions ---

    function switchView(viewName) {
        els.navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });
        
        els.views.forEach(v => v.classList.remove('active'));
        const targetView = document.getElementById(`view-${viewName}`);
        if(targetView) targetView.classList.add('active');
        
        const titles = {
            dashboard: 'Обзор',
            transactions: 'Транзакции',
            categories: 'Категории',
            goals: 'Цели',
            settings: 'Настройки'
        };
        els.viewTitle.textContent = titles[viewName] || 'FinTrack';
        
        // FORCE RE-RENDER SPECIFIC SECTIONS ON SWITCH
        if(viewName === 'dashboard') {
            renderDashboardStats();
            renderDashboardCharts();
            renderRecentTransactions();
        }
        if(viewName === 'transactions') {
            renderTransactionsTable();
        }
        if(viewName === 'categories') {
            renderCategories();
        }
        if(viewName === 'goals') {
            renderGoals();
        }
        if(viewName === 'settings') {
            syncSettingsUI();
        }
        
        els.sidebar.classList.remove('open');
    }

    function renderAllViews() {
        renderDashboardStats();
        renderDashboardCharts();
        renderRecentTransactions();
        renderTransactionsTable();
        renderCategories();
        renderGoals();
        populateFilters();
        syncSettingsUI();
    }

    // --- Dashboard Renderers ---
    
    function getMonthRange(dateStr) {
        const d = new Date(dateStr);
        const year = d.getFullYear();
        const month = d.getMonth();
        const start = new Date(year, month, 1).getTime();
        const end = new Date(year, month + 1, 0, 23, 59, 59).getTime();
        return { start, end };
    }

    function calculateStats() {
        const now = new Date();
        const currentMonthRange = getMonthRange(now.toISOString());
        const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevMonthRange = getMonthRange(prevMonthDate.toISOString());

        let totalBalance = 0;
        let currentIncome = 0;
        let currentExpense = 0;
        let prevIncome = 0;
        let prevExpense = 0;

        state.transactions.forEach(tx => {
            const val = tx.type === 'income' ? tx.amount : -tx.amount;
            totalBalance += val;

            const txTime = new Date(tx.date).getTime();
            
            if (txTime >= currentMonthRange.start && txTime <= currentMonthRange.end) {
                if (tx.type === 'income') currentIncome += tx.amount;
                else currentExpense += tx.amount;
            } else if (txTime >= prevMonthRange.start && txTime <= prevMonthRange.end) {
                if (tx.type === 'income') prevIncome += tx.amount;
                else prevExpense += tx.amount;
            }
        });

        const netChangeCurrent = currentIncome - currentExpense;
        const netChangePrev = prevIncome - prevExpense;
        
        let trendPercent = 0;
        if (netChangePrev !== 0) {
            trendPercent = ((netChangeCurrent - netChangePrev) / Math.abs(netChangePrev)) * 100;
        } else if (netChangeCurrent > 0) {
            trendPercent = 100;
        }

        const savingsRate = currentIncome > 0 ? ((currentIncome - currentExpense) / currentIncome) * 100 : 0;

        return { totalBalance, currentIncome, currentExpense, trendPercent, savingsRate };
    }

    function formatMoney(amount) {
        const cur = currencies[state.settings.currency];
        return `${amount.toLocaleString('ru-RU')} ${cur.symbol}`;
    }

    function renderDashboardStats() {
        const stats = calculateStats();
        
        animateValue(els.totalBalance, parseFloat(els.totalBalance.innerText.replace(/\D/g,'')) || 0, stats.totalBalance, 500, formatMoney);
        els.monthIncome.textContent = formatMoney(stats.currentIncome);
        els.monthExpense.textContent = formatMoney(stats.currentExpense);
        els.savingsRate.textContent = `${Math.round(stats.savingsRate)}%`;
        
        const sign = stats.trendPercent >= 0 ? '+' : '';
        els.balanceTrend.textContent = `${sign}${stats.trendPercent.toFixed(1)}%`;
        els.balanceTrend.className = `trend-badge ${stats.trendPercent >= 0 ? 'positive' : 'negative'}`;
    }

    function animateValue(obj, start, end, duration, formatter) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentVal = Math.floor(progress * (end - start) + start);
            obj.innerHTML = formatter(currentVal);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function renderRecentTransactions() {
        els.recentTxList.innerHTML = '';
        const sorted = [...state.transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        
        if(sorted.length === 0) {
            els.recentTxList.innerHTML = '<div class="empty-state" style="padding:20px;"><p>Нет операций</p></div>';
            return;
        }

        sorted.forEach(tx => {
            const cat = state.categories.find(c => c.id === tx.categoryId) || { name: '?', color: '#fff' };
            const isIncome = tx.type === 'income';
            const sign = isIncome ? '+' : '-';
            const colorClass = isIncome ? 'green' : 'red';
            
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.padding = '10px 0';
            div.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            
            div.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:8px; height:8px; border-radius:50%; background:${cat.color};"></div>
                    <div>
                        <div style="font-weight:500; font-size:0.9rem;">${cat.name}</div>
                        <div style="font-size:0.75rem; color:var(--text-dim);">${new Date(tx.date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="${colorClass}" style="font-weight:600;">${sign}${formatMoney(tx.amount)}</div>
            `;
            els.recentTxList.appendChild(div);
        });
    }

    // --- Charts (Custom Canvas Implementation) ---
    
    function renderDashboardCharts() {
        drawExpenseDonut();
    }

    function drawExpenseDonut() {
        const canvas = els.expenseDonutCanvas;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        const innerRadius = radius * 0.6;

        ctx.clearRect(0, 0, width, height);

        const now = new Date();
        const range = getMonthRange(now.toISOString());
        
        const catTotals = {};
        let grandTotal = 0;

        state.transactions.forEach(tx => {
            if (tx.type === 'expense') {
                const tTime = new Date(tx.date).getTime();
                if (tTime >= range.start && tTime <= range.end) {
                    catTotals[tx.categoryId] = (catTotals[tx.categoryId] || 0) + tx.amount;
                    grandTotal += tx.amount;
                }
            }
        });

        els.donutTotal.textContent = formatMoney(grandTotal);
        els.expenseLegend.innerHTML = '';

        if (grandTotal === 0) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = '#2a2a35';
            ctx.lineWidth = radius - innerRadius;
            ctx.stroke();
            return;
        }

        let startAngle = -0.5 * Math.PI; 
        
        Object.keys(catTotals).forEach(catId => {
            const amount = catTotals[catId];
            const percentage = amount / grandTotal;
            const sliceAngle = percentage * 2 * Math.PI;
            const endAngle = startAngle + sliceAngle;
            
            const cat = state.categories.find(c => c.id === catId);
            const color = cat ? cat.color : '#ccc';

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            
            const li = document.createElement('li');
            li.className = 'legend-item';
            li.innerHTML = `<span class="legend-dot" style="background:${color}"></span>${cat?.name || 'Unknown'} (${Math.round(percentage*100)}%)`;
            els.expenseLegend.appendChild(li);

            startAngle = endAngle;
        });
    }

    // --- Transactions Table Renderer ---
    
    function renderTransactionsTable() {
        const tbody = els.txTableBody;
        tbody.innerHTML = '';
        
        const search = els.txSearch.value.toLowerCase();
        const typeFilter = els.txTypeFilter.value;
        const catFilter = els.txCategoryFilter.value;
        
        let filtered = state.transactions.filter(tx => {
            const matchesSearch = tx.comment.toLowerCase().includes(search) || 
                                  (state.categories.find(c=>c.id===tx.categoryId)?.name || '').toLowerCase().includes(search);
            const matchesType = typeFilter === 'all' || tx.type === typeFilter;
            const matchesCat = catFilter === 'all' || tx.categoryId === catFilter;
            return matchesSearch && matchesType && matchesCat;
        });

        filtered.sort((a,b) => new Date(b.date) - new Date(a.date));

        if (filtered.length === 0) {
            els.emptyStateTx.classList.remove('hidden');
            return;
        }
        els.emptyStateTx.classList.add('hidden');

        filtered.forEach(tx => {
            const cat = state.categories.find(c => c.id === tx.categoryId) || { name: 'Без имени', color: '#999' };
            const isIncome = tx.type === 'income';
            const sign = isIncome ? '+' : '-';
            const colorClass = isIncome ? 'green' : 'red';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(tx.date).toLocaleDateString()}</td>
                <td>
                    <span class="tx-category-pill">
                        <span class="legend-dot" style="background:${cat.color}; width:8px; height:8px;"></span>
                        ${cat.name}
                    </span>
                </td>
                <td style="color:var(--text-muted); font-size:0.9rem;">${tx.comment || '-'}</td>
                <td class="right ${colorClass}" style="font-weight:600;">${sign}${formatMoney(tx.amount)}</td>
                <td class="center">
                    <div class="action-icons">
                        <svg class="icon action-icon edit" onclick="App.editTx('${tx.id}')"><use href="#icon-edit"></use></svg>
                        <svg class="icon action-icon delete" onclick="App.deleteTx('${tx.id}')"><use href="#icon-trash"></use></svg>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function populateFilters() {
        const sel = els.txCategoryFilter;
        const currentVal = sel.value;
        sel.innerHTML = '<option value="all">Все категории</option>';
        state.categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = cat.name;
            sel.appendChild(opt);
        });
        sel.value = currentVal;
    }

    // Expose functions for inline handlers
    window.App = {
        editTx: (id) => openTxModal(id),
        deleteTx: deleteTransaction,
        deleteCat: deleteCategory,
        updateGoal: (id, amt) => updateGoalProgress(id, amt),
        delGoal: (id) => {
            if(confirm('Удалить цель?')) {
                state.goals = state.goals.filter(g => g.id !== id);
                saveData();
                renderGoals();
            }
        }
    };

    // --- Categories Renderer ---
    function renderCategories() {
        els.categoryList.innerHTML = '';
        if (state.categories.length === 0) {
            els.categoryList.innerHTML = '<li style="color:var(--text-dim)">Нет категорий</li>';
            return;
        }
        state.categories.forEach(cat => {
            const li = document.createElement('li');
            li.className = 'cat-item';
            li.innerHTML = `
                <div class="cat-info">
                    <span class="cat-dot" style="background:${cat.color}"></span>
                    <strong>${cat.name}</strong>
                </div>
                <svg class="icon cat-delete" onclick="App.deleteCat('${cat.id}')"><use href="#icon-trash"></use></svg>
            `;
            els.categoryList.appendChild(li);
        });
    }

    // --- Goals Renderer ---
    function renderGoals() {
        els.goalsContainer.innerHTML = '';
        if(state.goals.length === 0) {
            els.goalsContainer.innerHTML = '<div class="empty-state"><p>Нет активных целей. Создайте первую!</p></div>';
            return;
        }

        state.goals.forEach(goal => {
            const percent = Math.min((goal.current / goal.target) * 100, 100);
            const isComplete = goal.completed;
            
            const div = document.createElement('div');
            div.className = `goal-card ${isComplete ? 'goal-complete' : ''}`;
            div.innerHTML = `
                <div class="goal-header">
                    <h4 style="margin:0;">${goal.name} ${isComplete ? '<svg class="icon small gold"><use href="#icon-check"></use></svg>' : ''}</h4>
                    <span class="mono" style="font-size:0.8rem; color:var(--text-dim);">
                        До: ${goal.deadline ? new Date(goal.deadline).toLocaleDateString() : '—'}
                    </span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${percent}%"></div>
                </div>
                <div class="goal-stats">
                    <span>${formatMoney(goal.current)} из ${formatMoney(goal.target)}</span>
                    <span>${Math.round(percent)}%</span>
                </div>
                <div style="margin-top:10px; display:flex; gap:5px;">
                     <button class="btn btn-xs btn-outline" style="padding:2px 8px; font-size:0.7rem;" onclick="App.updateGoal('${goal.id}', 100)">+100</button>
                     <button class="btn btn-xs btn-outline" style="padding:2px 8px; font-size:0.7rem;" onclick="App.updateGoal('${goal.id}', 1000)">+1k</button>
                     <button class="btn btn-xs btn-danger" style="padding:2px 8px; font-size:0.7rem; margin-left:auto;" onclick="App.delGoal('${goal.id}')">Удалить</button>
                </div>
            `;
            els.goalsContainer.appendChild(div);
        });
    }

    // --- Settings Helpers ---
    function syncSettingsUI() {
        els.currencySelect.value = state.settings.currency;
    }

    function exportData() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "fintrack_backup.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        showToast('Данные экспортированы', 'success');
    }

    function importData(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const imported = JSON.parse(event.target.result);
                if(imported.transactions && Array.isArray(imported.transactions)) {
                    state = imported;
                    saveData();
                    renderAllViews();
                    showToast('Данные импортированы успешно', 'success');
                } else {
                    throw new Error('Invalid structure');
                }
            } catch(err) {
                showToast('Ошибка чтения файла', 'error');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }

    function resetData() {
        if(confirm('Вы уверены? Все данные будут удалены безвозвратно.')) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    }

    // --- Utils ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function showToast(msg, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>${msg}</span>`;
        els.toastContainer.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
