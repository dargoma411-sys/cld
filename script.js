"use strict";
/* ==================================================================
   FLUX · личный финансовый трекер
   HTML + CSS + JS, без фреймворков. Данные — localStorage.
   ================================================================== */

/* ============================ ICON LIBRARY ============================ */
const ICONS = {
  wallet:'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
  cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  car:'<path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM21 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path d="M3 17V12l2-5h14l2 5v5"/>',
  film:'<rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
  phone:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  shirt:'<path d="M16 3l4 4-4 4V21H8V11L4 7l4-4 4 4 4-4z"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/>',
  briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  gift:'<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  trending:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  percent:'<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  coffee:'<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  plane:'<path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  dollar:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
  activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  check:'<path d="M20 6L9 17l-5-5"/>'
};

const ICON_KEYS = Object.keys(ICONS);
const COLORS = ['#8b5cf6','#3b82f6','#4ade80','#f87171','#facc15','#22d3ee','#f472b6','#fb923c','#a3e635','#c084fc','#2dd4bf','#e879f9'];

const DEFAULT_CATEGORIES = [
  { id:'c_salary', name:'Зарплата', type:'income', icon:'briefcase', color:'#4ade80' },
  { id:'c_freelance', name:'Подработка', type:'income', icon:'zap', color:'#22d3ee' },
  { id:'c_gift_in', name:'Подарок', type:'income', icon:'gift', color:'#c084fc' },
  { id:'c_sale', name:'Продажа', type:'income', icon:'tag', color:'#fb923c' },
  { id:'c_interest', name:'Проценты', type:'income', icon:'percent', color:'#4ade80' },
  { id:'c_other_in', name:'Другое', type:'income', icon:'dollar', color:'#94a3b8' },
  { id:'c_groceries', name:'Продукты', type:'expense', icon:'cart', color:'#f87171' },
  { id:'c_transport', name:'Транспорт', type:'expense', icon:'car', color:'#fb923c' },
  { id:'c_entertainment', name:'Развлечения', type:'expense', icon:'film', color:'#c084fc' },
  { id:'c_communication', name:'Связь', type:'expense', icon:'phone', color:'#22d3ee' },
  { id:'c_housing', name:'Жильё', type:'expense', icon:'home', color:'#3b82f6' },
  { id:'c_health', name:'Здоровье', type:'expense', icon:'heart', color:'#f472b6' },
  { id:'c_clothes', name:'Одежда', type:'expense', icon:'shirt', color:'#a3e635' },
  { id:'c_education', name:'Образование', type:'expense', icon:'book', color:'#8b5cf6' },
  { id:'c_other_out', name:'Другое', type:'expense', icon:'tag', color:'#94a3b8' }
];

const CURRENCIES = {
  RUB:{ symbol:'₽', code:'RUB', label:'Рубль',     labelEn:'Ruble' },
  USD:{ symbol:'$', code:'USD', label:'Доллар',    labelEn:'US Dollar' },
  EUR:{ symbol:'€', code:'EUR', label:'Евро',      labelEn:'Euro' },
  KZT:{ symbol:'₸', code:'KZT', label:'Тенге',     labelEn:'Tenge' },
  UAH:{ symbol:'₴', code:'UAH', label:'Гривна',    labelEn:'Hryvnia' },
  BYN:{ symbol:'Br',code:'BYN', label:'Бел. рубль',labelEn:'Belarusian Ruble' },
  GBP:{ symbol:'£', code:'GBP', label:'Фунт',      labelEn:'Pound' },
  CNY:{ symbol:'¥', code:'CNY', label:'Юань',      labelEn:'Yuan' },
  JPY:{ symbol:'¥', code:'JPY', label:'Иена',      labelEn:'Yen' },
  TRY:{ symbol:'₺', code:'TRY', label:'Лира',      labelEn:'Lira' },
  AED:{ symbol:'د.إ', code:'AED', label:'Дирхам',  labelEn:'Dirham' },
  CHF:{ symbol:'₣', code:'CHF', label:'Франк',     labelEn:'Franc' },
  PLN:{ symbol:'zł',code:'PLN', label:'Злотый',    labelEn:'Zloty' },
  CAD:{ symbol:'C$',code:'CAD', label:'Кан. доллар',labelEn:'Canadian Dollar' }
};

// rate[X] = сколько единиц X за 1 единицу базовой валюты
const DEFAULT_RATES = {
  RUB:1, USD:0.011, EUR:0.010, KZT:5.5, UAH:0.45, BYN:0.036,
  GBP:0.0085, CNY:0.08, JPY:1.7, TRY:0.38, AED:0.04, CHF:0.0095, PLN:0.045, CAD:0.015
};

const PLAN_PRIORITIES = ['high','medium','low'];

const I18N = {
  ru:{
    overview:'Обзор', transactions:'Транзакции', categories:'Категории',
    goals:'Цели', plan:'План', settings:'Настройки', add:'Добавить',
    plan_title:'План покупок', plan_sub:'Запланированные траты и крупные цели',
    plan_add:'Добавить покупку',
    plan_total:'Всего запланировано', plan_count:'Покупок в плане',
    plan_next:'Ближайшая', plan_none:'Пусто',
    plan_mark_bought:'Отметить как куплено', plan_edit:'Изменить',
    plan_delete:'Удалить', plan_bought:'Куплено',
    plan_due:'до', plan_priority:'Приоритет',
    prio_high:'Высокий', prio_medium:'Средний', prio_low:'Низкий',
    set_lang:'Язык интерфейса', set_lang_desc:'Русский или английский',
    set_base:'Базовая валюта', set_base_desc:'В ней ведётся учёт; остальные — по курсу',
    set_rates:'Курсы валют', set_rates_desc:'Сколько единиц валюты за 1 единицу базовой',
    rates_title:'Курсы валют', rates_hint:'1 единица базовой валюты = указанное число единиц валюты справа'
  },
  en:{
    overview:'Overview', transactions:'Transactions', categories:'Categories',
    goals:'Goals', plan:'Plan', settings:'Settings', add:'Add',
    plan_title:'Purchase plan', plan_sub:'Planned expenses and big purchases',
    plan_add:'Add purchase',
    plan_total:'Total planned', plan_count:'Items in plan',
    plan_next:'Next', plan_none:'None',
    plan_mark_bought:'Mark as bought', plan_edit:'Edit',
    plan_delete:'Delete', plan_bought:'Bought',
    plan_due:'due', plan_priority:'Priority',
    prio_high:'High', prio_medium:'Medium', prio_low:'Low',
    set_lang:'Interface language', set_lang_desc:'Russian or English',
    set_base:'Base currency', set_base_desc:'All amounts are stored in it; others by rate',
    set_rates:'Currency rates', set_rates_desc:'Units of currency per 1 unit of base',
    rates_title:'Currency rates', rates_hint:'1 unit of base currency = N units of target currency'
  }
};
function t(key){ return (I18N[state.settings.lang]||I18N.ru)[key] || key; }

const STORAGE_KEY = 'flux_finance_v1';

let state = {
  transactions: [],
  categories: [],
  goals: [],
  plan: [],
  rates: Object.assign({}, DEFAULT_RATES),
  settings: { currency:'RUB', weekStart:1, theme:'dark', lang:'ru' }
};
let editingTxId = null;
let editingGoalId = null;
let editingPlanId = null;

/* ============================ UTILS ============================ */
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
function todayISO(){ const d=new Date(); return d.toISOString().slice(0,10); }
function monthKey(iso){ return iso.slice(0,7); }

function formatMoney(n){
  const cur = CURRENCIES[state.settings.currency] || CURRENCIES.RUB;
  const sign = n < 0 ? '−' : '';
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString('ru-RU',{ minimumFractionDigits:0, maximumFractionDigits:2 });
  return sign + formatted + ' ' + cur.symbol;
}
function formatMoneyShort(n){
  const cur = CURRENCIES[state.settings.currency] || CURRENCIES.RUB;
  if (Math.abs(n) >= 1000000) return (n/1000000).toFixed(1).replace('.0','') + 'м ' + cur.symbol;
  if (Math.abs(n) >= 1000) return (n/1000).toFixed(1).replace('.0','') + 'к ' + cur.symbol;
  return Math.round(n) + ' ' + cur.symbol;
}
function formatDate(iso){
  const d = new Date(iso + 'T00:00:00');
  const months = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}
function monthLabel(key){
  const [y,m] = key.split('-');
  const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  return months[parseInt(m)-1] + ' ' + y;
}
function monthLabelShort(key){
  const [y,m] = key.split('-');
  const months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
  return months[parseInt(m)-1];
}
function currentMonthKey(){ return todayISO().slice(0,7); }
function prevMonthKey(key){
  const [y,m] = key.split('-').map(Number);
  const d = new Date(y, m-2, 1);
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
}
function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function iconSvg(name, size){
  const path = ICONS[name] || ICONS.tag;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ${size?`width="${size}" height="${size}"`:''}>${path}</svg>`;
}

/* Конвертация (для отображения в другой валюте) */
function convertTo(amount, targetCode){
  const base = state.settings.currency;
  if(targetCode === base) return amount;
  const r = state.rates[targetCode];
  if(!r) return amount;
  return amount * r;
}
function convertFrom(amount, fromCode){
  const base = state.settings.currency;
  if(fromCode === base) return amount;
  const r = state.rates[fromCode];
  if(!r) return amount;
  return amount / r;
}

/* ============================ STORAGE ============================ */
function save(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch(e){ console.warn('save error', e); }
}
function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      state.transactions = Array.isArray(parsed.transactions) ? parsed.transactions : [];
      state.categories = Array.isArray(parsed.categories) && parsed.categories.length ? parsed.categories : DEFAULT_CATEGORIES.slice();
      state.goals = Array.isArray(parsed.goals) ? parsed.goals : [];
      state.plan = Array.isArray(parsed.plan) ? parsed.plan : [];
      state.rates = Object.assign({}, DEFAULT_RATES, parsed.rates||{});
      state.settings = Object.assign({ currency:'RUB', weekStart:1, theme:'dark', lang:'ru' }, parsed.settings||{});
    } else {
      state.categories = DEFAULT_CATEGORIES.slice();
      state.rates = Object.assign({}, DEFAULT_RATES);
      state.plan = [];
      seedDemo();
    }
  }catch(e){
    state.categories = DEFAULT_CATEGORIES.slice();
  }
}
function seedDemo(){
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const mk = (monthOffset, day) => {
    const d = new Date(y, m + monthOffset, day);
    return d.toISOString().slice(0,10);
  };
  const demo = [
    { type:'income', amount:85000, categoryId:'c_salary', date:mk(0,5), comment:'Зарплата' },
    { type:'expense', amount:12400, categoryId:'c_groceries', date:mk(0,6), comment:'Продукты на неделю' },
    { type:'expense', amount:3200, categoryId:'c_transport', date:mk(0,7), comment:'Метро и такси' },
    { type:'expense', amount:15000, categoryId:'c_housing', date:mk(0,8), comment:'Аренда' },
    { type:'income', amount:12000, categoryId:'c_freelance', date:mk(-1,20), comment:'Подработка' },
    { type:'expense', amount:5600, categoryId:'c_entertainment', date:mk(-1,14), comment:'Кино и кафе' },
    { type:'income', amount:85000, categoryId:'c_salary', date:mk(-1,5), comment:'Зарплата' },
    { type:'expense', amount:9800, categoryId:'c_groceries', date:mk(-2,10), comment:'Продукты' }
  ];
  state.transactions = demo.map(t => Object.assign({ id: uid() }, t));
  state.goals = [
    { id: uid(), name:'Отпуск', target:120000, current:45000, deadline: new Date(y, m+4, 1).toISOString().slice(0,10) },
    { id: uid(), name:'Новый ноутбук', target:90000, current:90000, deadline: new Date(y, m+2, 1).toISOString().slice(0,10) }
  ];
  state.plan = [
    { id:uid(), name:'Новый ноутбук', amount:90000, deadline:new Date(y, m+2, 1).toISOString().slice(0,10), categoryId:'c_other_out', priority:'high', bought:false },
    { id:uid(), name:'Отпуск', amount:150000, deadline:new Date(y, m+4, 1).toISOString().slice(0,10), categoryId:'c_entertainment', priority:'medium', bought:false },
    { id:uid(), name:'Наушники', amount:12000, deadline:'', categoryId:'c_other_out', priority:'low', bought:false }
  ];
  save();
}

/* ============================ COMPUTED ============================ */
function totalBalance(){
  return state.transactions.reduce((s,t) => s + (t.type==='income' ? t.amount : -t.amount), 0);
}
function monthTotals(key){
  let income=0, expense=0;
  state.transactions.forEach(t => {
    if(monthKey(t.date) === key){
      if(t.type==='income') income += t.amount; else expense += t.amount;
    }
  });
  return { income, expense, net: income - expense };
}
function categoryById(id){ return state.categories.find(c => c.id===id); }
function categoryTotalsForMonth(key, type){
  const map = {};
  state.transactions.forEach(t => {
    if(t.type!==type) return;
    if(monthKey(t.date)!==key) return;
    map[t.categoryId] = (map[t.categoryId]||0) + t.amount;
  });
  return map;
}
function last12Months(){
  const arr = [];
  const d = new Date();
  for(let i=11;i>=0;i--){
    const dt = new Date(d.getFullYear(), d.getMonth()-i, 1);
    arr.push(dt.getFullYear() + '-' + String(dt.getMonth()+1).padStart(2,'0'));
  }
  return arr;
}
function changePercent(){
  const cur = monthTotals(currentMonthKey());
  const prev = monthTotals(prevMonthKey(currentMonthKey()));
  if(prev.net === 0) return cur.net === 0 ? 0 : null;
  return ((cur.net - prev.net) / Math.abs(prev.net)) * 100;
}

/* ============================ NAVIGATION ============================ */
function switchScreen(name){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-'+name);
  if(el) el.classList.add('active');
  document.querySelectorAll('[data-screen]').forEach(b => {
    b.classList.toggle('active', b.dataset.screen===name);
  });
  if(name==='overview') renderOverview();
  if(name==='transactions') renderTransactions();
  if(name==='categories') renderCategories();
  if(name==='goals') renderGoals();
  if(name==='plan') renderPlan();
  if(name==='settings') renderSettings();
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-screen]').forEach(btn => {
  btn.addEventListener('click', () => switchScreen(btn.dataset.screen));
});
const goTxBtn = document.querySelector('[data-action="go-transactions"]');
if(goTxBtn) goTxBtn.addEventListener('click', () => switchScreen('transactions'));

/* ============================ RENDER: OVERVIEW ============================ */
function renderOverview(){
  const bal = totalBalance();
  animateNumber(document.getElementById('balanceValue'), bal, formatMoney);

  const cur = monthTotals(currentMonthKey());
  const ch = changePercent();
  const changeEl = document.getElementById('balanceChange');
  if(ch===null){
    changeEl.innerHTML = `<span class="balance-change flat">Нет данных за прошлый месяц</span>`;
  } else {
    const up = ch >= 0;
    changeEl.innerHTML = `<span class="balance-change ${up?'up':'down'}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${up?'<path d="M12 19V5M5 12l7-7 7 7"/>':'<path d="M12 5v14M5 12l7 7 7-7"/>'}</svg>
      ${up?'+':''}${ch.toFixed(1)}% за месяц
    </span>`;
  }

  animateNumber(document.getElementById('statIncome'), cur.income, formatMoney);
  animateNumber(document.getElementById('statExpense'), cur.expense, formatMoney);
  animateNumber(document.getElementById('statSaving'), cur.net, formatMoney);

  renderBarChart();
  renderDonut();
  renderRecent();
  document.getElementById('overviewSub').textContent = monthLabel(currentMonthKey());
}

function animateNumber(el, to, fmt){
  if(!el) return;
  const from = parseFloat(el.dataset.val || '0') || 0;
  el.dataset.val = to;
  const dur = 600;
  const start = performance.now();
  function step(now){
    const p = Math.min((now-start)/dur, 1);
    const eased = 1 - Math.pow(1-p, 3);
    const val = from + (to-from)*eased;
    el.textContent = fmt(val);
    if(p<1) requestAnimationFrame(step);
    else el.textContent = fmt(to);
  }
  requestAnimationFrame(step);
}

function renderBarChart(){
  const wrap = document.getElementById('barChart');
  if(!wrap) return;
  const months = last12Months();
  const data = months.map(k => monthTotals(k));
  const max = Math.max(1, ...data.map(d => Math.max(d.income, d.expense)));
  const W = 700, H = 240, padL = 8, padR = 8, padT = 10, padB = 34;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const groupW = innerW / months.length;
  const barW = Math.min(14, groupW/3.2);
  const gap = 3;

  let bars = '';
  data.forEach((d, i) => {
    const cx = padL + groupW*i + groupW/2;
    const hIn = (d.income/max)*innerH;
    const hEx = (d.expense/max)*innerH;
    const yIn = padT + innerH - hIn;
    const yEx = padT + innerH - hEx;
    if(d.income>0) bars += `<rect class="bar" x="${cx-barW-gap/2}" y="${yIn}" width="${barW}" height="${hIn}" rx="3" fill="url(#barIncome)" />`;
    if(d.expense>0) bars += `<rect class="bar" x="${cx+gap/2}" y="${yEx}" width="${barW}" height="${hEx}" rx="3" fill="url(#barExpense)" />`;
    bars += `<text x="${cx}" y="${H-12}" text-anchor="middle" font-size="10" fill="var(--muted-2)" font-family="Inter">${monthLabelShort(months[i])}</text>`;
  });

  let grid = '';
  for(let i=0;i<=4;i++){
    const y = padT + (innerH/4)*i;
    grid += `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="var(--line)" stroke-width="1" stroke-dasharray="3 4"/>`;
  }

  wrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="График доходов и расходов">
    ${grid}
    ${bars}
  </svg>
  <div style="display:flex;gap:18px;justify-content:center;margin-top:6px;font-size:12px;color:var(--muted)">
    <span style="display:flex;align-items:center;gap:6px"><span style="width:10px;height:10px;border-radius:3px;background:url(#barIncome)"></span>Доходы</span>
    <span style="display:flex;align-items:center;gap:6px"><span style="width:10px;height:10px;border-radius:3px;background:url(#barExpense)"></span>Расходы</span>
  </div>`;
}

function renderDonut(){
  const wrap = document.getElementById('donutChart');
  const legend = document.getElementById('donutLegend');
  if(!wrap || !legend) return;
  const map = categoryTotalsForMonth(currentMonthKey(), 'expense');
  const entries = Object.entries(map).map(([id,val]) => ({ cat: categoryById(id), val })).filter(e => e.cat && e.val>0);
  const total = entries.reduce((s,e) => s+e.val, 0);

  if(!entries.length){
    wrap.innerHTML = `<div class="empty" style="padding:20px"><div class="empty-title">Нет расходов</div><div class="empty-sub">Добавьте транзакции</div></div>`;
    legend.innerHTML = '';
    return;
  }

  const size = 180, r = 70, cx = size/2, cy = size/2, stroke = 22;
  const circ = 2*Math.PI*r;
  let offset = 0;
  let arcs = '';
  entries.sort((a,b) => b.val-a.val).forEach(e => {
    const frac = e.val/total;
    const len = frac*circ;
    arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${e.cat.color}" stroke-width="${stroke}"
      stroke-dasharray="${len} ${circ-len}" stroke-dashoffset="${-offset}"
      transform="rotate(-90 ${cx} ${cy})" stroke-linecap="butt">
      <title>${escapeHtml(e.cat.name)}: ${formatMoney(e.val)}</title>
    </circle>`;
    offset += len;
  });

  wrap.innerHTML = `<svg viewBox="0 0 ${size} ${size}" width="180" height="180" role="img" aria-label="Круговая диаграмма расходов">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/>
    ${arcs}
    <text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="Inter">Всего</text>
    <text x="${cx}" y="${cy+14}" text-anchor="middle" font-size="13" fill="var(--text)" font-family="JetBrains Mono" font-weight="700">${formatMoneyShort(total)}</text>
  </svg>`;

  legend.innerHTML = entries.sort((a,b)=>b.val-a.val).slice(0,6).map(e => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${e.cat.color}"></span>
      <span class="legend-name">${escapeHtml(e.cat.name)}</span>
      <span class="legend-val">${formatMoney(e.val)}</span>
    </div>
  `).join('');
}

function renderRecent(){
  const list = document.getElementById('recentList');
  if(!list) return;
  const recent = state.transactions.slice().sort((a,b) => (b.date+b.id).localeCompare(a.date+a.id)).slice(0,5);
  if(!recent.length){
    list.innerHTML = `<div class="empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
      <div class="empty-title">Пока нет операций</div>
      <div class="empty-sub">Добавьте первую транзакцию</div>
    </div>`;
    return;
  }
  list.innerHTML = recent.map(t => {
    const cat = categoryById(t.categoryId) || { name:'Без категории', color:'#94a3b8', icon:'tag' };
    const sign = t.type==='income' ? '+' : '−';
    return `<div class="tx-item">
      <div class="tx-cat-icon" style="background:${cat.color}22;color:${cat.color}">${iconSvg(cat.icon)}</div>
      <div class="tx-info">
        <div class="tx-cat">${escapeHtml(cat.name)}</div>
        <div class="tx-comment">${escapeHtml(t.comment || '—')}</div>
      </div>
      <div class="tx-date">${formatDate(t.date)}</div>
      <div class="tx-amount ${t.type}">${sign}${formatMoney(t.amount)}</div>
    </div>`;
  }).join('');
}

/* ============================ RENDER: TRANSACTIONS ============================ */
function populateFilters(){
  const catFilter = document.getElementById('txCatFilter');
  const monthFilter = document.getElementById('txMonthFilter');
  if(!catFilter || !monthFilter) return;
  const curCat = catFilter.value;
  const curMonth = monthFilter.value;

  catFilter.innerHTML = '<option value="all">Все категории</option>' +
    state.categories.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');

  const months = Array.from(new Set(state.transactions.map(t => monthKey(t.date)))).sort().reverse();
  monthFilter.innerHTML = '<option value="all">Все месяцы</option>' +
    months.map(m => `<option value="${m}">${monthLabel(m)}</option>`).join('');

  catFilter.value = curCat && catFilter.querySelector(`option[value="${curCat}"]`) ? curCat : 'all';
  monthFilter.value = curMonth && monthFilter.querySelector(`option[value="${curMonth}"]`) ? curMonth : 'all';
}

function getFilteredTransactions(){
  const q = (document.getElementById('txSearch')?.value || '').trim().toLowerCase();
  const type = document.getElementById('txTypeFilter')?.value || 'all';
  const cat = document.getElementById('txCatFilter')?.value || 'all';
  const month = document.getElementById('txMonthFilter')?.value || 'all';

  return state.transactions.filter(t => {
    if(type!=='all' && t.type!==type) return false;
    if(cat!=='all' && t.categoryId!==cat) return false;
    if(month!=='all' && monthKey(t.date)!==month) return false;
    if(q && !(t.comment||'').toLowerCase().includes(q)) return false;
    return true;
  }).sort((a,b) => (b.date+b.id).localeCompare(a.date+a.id));
}

function renderTransactions(){
  populateFilters();
  const list = getFilteredTransactions();
  const table = document.getElementById('txTable');
  const cnt = document.getElementById('txCount');
  if(!table) return;
  if(cnt) cnt.textContent = state.transactions.length + ' операций';

  if(!list.length){
    table.innerHTML = `<div class="empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
      <div class="empty-title">${state.transactions.length ? 'Ничего не найдено' : 'Пока нет операций'}</div>
      <div class="empty-sub">${state.transactions.length ? 'Измените фильтры или поиск' : 'Добавьте первую транзакцию'}</div>
    </div>`;
    return;
  }

  table.innerHTML = list.map(t => {
    const cat = categoryById(t.categoryId) || { name:'Без категории', color:'#94a3b8', icon:'tag' };
    const sign = t.type==='income' ? '+' : '−';
    return `<div class="tx-row" data-id="${t.id}">
      <div class="row-date">${formatDate(t.date)}</div>
      <div class="row-cat"><span class="dot" style="background:${cat.color}"></span><span>${escapeHtml(cat.name)}</span></div>
      <div class="row-comment">${escapeHtml(t.comment || '—')}</div>
      <div class="row-amount ${t.type}">${sign}${formatMoney(t.amount)}</div>
      <div class="row-actions">
        <button class="btn-icon" data-edit="${t.id}" aria-label="Редактировать">${iconSvg('book','14')}</button>
        <button class="btn-icon" data-del="${t.id}" aria-label="Удалить">${iconSvg('scissors','14')}</button>
      </div>
    </div>`;
  }).join('');
}

/* ============================ RENDER: CATEGORIES ============================ */
let catTab = 'expense';
document.querySelectorAll('[data-cat-tab]').forEach(t => {
  t.addEventListener('click', () => {
    catTab = t.dataset.catTab;
    document.querySelectorAll('[data-cat-tab]').forEach(x => x.classList.toggle('active', x===t));
    renderCategories();
  });
});

function renderCategories(){
  const grid = document.getElementById('catGrid');
  if(!grid) return;
  const cats = state.categories.filter(c => c.type===catTab);
  const totals = categoryTotalsForMonth(currentMonthKey(), catTab);

  if(!cats.length){
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <div class="empty-title">Нет категорий</div>
      <div class="empty-sub">Добавьте первую категорию</div>
    </div>`;
    return;
  }

  grid.innerHTML = cats.map(c => {
    const sum = totals[c.id] || 0;
    const used = state.transactions.some(t => t.categoryId===c.id);
    return `<div class="cat-card">
      <div class="tx-cat-icon" style="background:${c.color}22;color:${c.color}">${iconSvg(c.icon)}</div>
      <div class="cat-info">
        <div class="cat-name">${escapeHtml(c.name)}</div>
        <div class="cat-sum">${sum ? formatMoney(sum) + ' за месяц' : 'Нет операций в этом месяце'}</div>
      </div>
      <button class="btn-icon" data-del-cat="${c.id}" aria-label="Удалить категорию" ${used?'disabled style="opacity:.35;cursor:not-allowed"':''}>
        ${iconSvg('scissors','14')}
      </button>
    </div>`;
  }).join('');
}

/* ============================ RENDER: GOALS ============================ */
function renderGoals(){
  const grid = document.getElementById('goalsGrid');
  if(!grid) return;
  if(!state.goals.length){
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>
      <div class="empty-title">Пока нет целей</div>
      <div class="empty-sub">Добавьте первую финансовую цель</div>
    </div>`;
    return;
  }
  grid.innerHTML = state.goals.map(g => {
    const pct = Math.min(100, (g.current / g.target) * 100);
    const done = g.current >= g.target;
    return `<div class="card goal-card ${done?'done':''}" data-goal="${g.id}">
      <div class="goal-head">
        <div>
          <div class="goal-name">${escapeHtml(g.name)}</div>
          <div class="goal-deadline">до ${formatDate(g.deadline)}</div>
        </div>
        ${done ? `<div class="goal-check">${iconSvg('check','15')}</div>` : ''}
      </div>
      <div class="goal-amounts">
        <span class="cur">${formatMoney(g.current)}</span>
        <span class="target">из ${formatMoney(g.target)}</span>
      </div>
      <div class="progress"><div class="progress-bar" style="width:0"></div></div>
      <div class="goal-pct">${pct.toFixed(1)}%</div>
      <div style="display:flex;gap:8px;margin-top:14px">
        <button class="btn btn-ghost" style="flex:1;padding:8px" data-goal-add="${g.id}">Пополнить</button>
        <button class="btn btn-danger" style="padding:8px 12px" data-goal-del="${g.id}">Удалить</button>
      </div>
    </div>`;
  }).join('');

  requestAnimationFrame(() => {
    grid.querySelectorAll('.progress-bar').forEach((bar, i) => {
      const g = state.goals[i];
      const pct = Math.min(100, (g.current/g.target)*100);
      bar.style.width = pct + '%';
    });
  });
}

/* ============================ RENDER: PLAN ============================ */
function renderPlan(){
  const grid = document.getElementById('planGrid');
  const summary = document.getElementById('planSummary');
  if(!grid || !summary) return;

  const active = state.plan.filter(p => !p.bought);
  const total = active.reduce((s,p) => s + p.amount, 0);
  const next = active.slice().sort((a,b) => (a.deadline||'9999').localeCompare(b.deadline||'9999'))[0];

  summary.innerHTML = `
    <div class="card">
      <div class="lbl">${t('plan_total')}</div>
      <div class="val">${formatMoney(total)}</div>
    </div>
    <div class="card">
      <div class="lbl">${t('plan_count')}</div>
      <div class="val">${active.length}</div>
    </div>
    <div class="card">
      <div class="lbl">${t('plan_next')}</div>
      <div class="val" style="font-size:15px">${next ? escapeHtml(next.name) : t('plan_none')}</div>
    </div>
  `;

  if(!state.plan.length){
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <div class="empty-title">${t('plan_none')}</div>
      <div class="empty-sub">${t('plan_add')}</div>
    </div>`;
    return;
  }

  grid.innerHTML = state.plan.slice().sort((a,b) => {
    if(a.bought !== b.bought) return a.bought ? 1 : -1;
    return (a.deadline||'9999').localeCompare(b.deadline||'9999');
  }).map(p => {
    const cat = categoryById(p.categoryId);
    const prio = t('prio_'+p.priority);
    const prioCls = p.priority==='high'?'hi':p.priority==='medium'?'mid':'lo';
    return `<div class="plan-card ${p.bought?'bought':''}" data-plan="${p.id}">
      <div class="plan-head">
        <div>
          <div class="plan-name">${escapeHtml(p.name)}</div>
          <div class="plan-cat">${cat?escapeHtml(cat.name):''}</div>
        </div>
      </div>
      <div class="plan-amount">${formatMoney(p.amount)}</div>
      <div class="plan-meta">
        ${p.deadline?`<span class="chip-mini">${t('plan_due')} ${formatDate(p.deadline)}</span>`:''}
        <span class="chip-mini ${prioCls}">${prio}</span>
      </div>
      <div class="plan-actions">
        ${p.bought
          ? `<button class="btn btn-ghost" disabled>${t('plan_bought')}</button>`
          : `<button class="btn btn-primary" data-plan-buy="${p.id}">${t('plan_mark_bought')}</button>`}
        <button class="btn btn-ghost" data-plan-edit="${p.id}">${t('plan_edit')}</button>
        <button class="btn btn-danger" data-plan-del="${p.id}">${t('plan_delete')}</button>
      </div>
    </div>`;
  }).join('');
}

/* ============================ RENDER: SETTINGS ============================ */
function renderSettings(){
  const langEl = document.getElementById('setLang');
  const curEl = document.getElementById('setCurrency');
  const wsEl = document.getElementById('setWeekStart');
  if(langEl) langEl.value = state.settings.lang;
  if(curEl) curEl.value = state.settings.currency;
  if(wsEl) wsEl.value = state.settings.weekStart;
}

/* ============================ LANG ============================ */
function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    const v = t(k);
    if(v) el.textContent = v;
  });
  document.getElementById('themeLabel').textContent =
    state.settings.theme==='dark'
      ? (state.settings.lang==='en' ? 'Light theme' : 'Светлая тема')
      : (state.settings.lang==='en' ? 'Dark theme' : 'Тёмная тема');
}

/* ============================ MODAL ============================ */
const overlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalFoot = document.getElementById('modalFoot');

function openModal(){
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  const first = modalBody.querySelector('input,select,button');
  if(first) setTimeout(() => first.focus(), 80);
}
function closeModal(){
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  editingTxId = null;
  editingGoalId = null;
  editingPlanId = null;
}
overlay.addEventListener('click', e => { if(e.target===overlay) closeModal(); });
document.querySelectorAll('[data-action="close-modal"]').forEach(b => b.addEventListener('click', closeModal));
document.addEventListener('keydown', e => {
  if(e.key==='Escape' && overlay.classList.contains('open')) closeModal();
  if((e.key==='n' || e.key==='N') && !overlay.classList.contains('open') && !/input|select|textarea/i.test(document.activeElement.tagName)){
    e.preventDefault();
    openTransactionModal();
  }
});

/* --- Transaction modal --- */
function openTransactionModal(tx){
  editingTxId = tx ? tx.id : null;
  modalTitle.textContent = tx ? 'Редактировать транзакцию' : 'Новая транзакция';

  let type = tx ? tx.type : 'expense';
  const cats = () => state.categories.filter(c => c.type===type);

  modalBody.innerHTML = `
    <div class="form-group">
      <label class="form-label">Тип</label>
      <div class="seg" id="txTypeSeg">
        <button type="button" class="seg-btn ${type==='income'?'active income':''}" data-type="income">
          ${iconSvg('trending','15')} Доход
        </button>
        <button type="button" class="seg-btn ${type==='expense'?'active expense':''}" data-type="expense">
          ${iconSvg('cart','15')} Расход
        </button>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label" for="txAmount">Сумма</label>
      <input class="form-input" id="txAmount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="0" value="${tx?tx.amount:''}">
      <div class="form-error" id="errAmount">Введите сумму больше нуля</div>
    </div>
    <div class="form-group">
      <label class="form-label" for="txDate">Дата</label>
      <input class="form-input" id="txDate" type="date" max="${todayISO()}" value="${tx?tx.date:todayISO()}">
      <div class="form-error" id="errDate">Дата не может быть в будущем</div>
    </div>
    <div class="form-group">
      <label class="form-label" for="txCategory">Категория</label>
      <select class="form-input" id="txCategory">
        <option value="">Выберите категорию</option>
        ${cats().map(c => `<option value="${c.id}" ${tx&&tx.categoryId===c.id?'selected':''}>${escapeHtml(c.name)}</option>`).join('')}
      </select>
      <div class="form-error" id="errCategory">Выберите категорию</div>
    </div>
    <div class="form-group">
      <label class="form-label" for="txComment">Комментарий</label>
      <input class="form-input" id="txComment" type="text" maxlength="120" placeholder="Необязательно" value="${tx?escapeHtml(tx.comment||''):''}">
    </div>
  `;

  modalFoot.innerHTML = `
    <button class="btn btn-ghost" data-action="close-modal">Отмена</button>
    <button class="btn btn-primary" id="saveTx">${tx?'Сохранить':'Добавить'}</button>
  `;

  modalBody.querySelectorAll('#txTypeSeg .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      type = btn.dataset.type;
      modalBody.querySelectorAll('#txTypeSeg .seg-btn').forEach(b => {
        b.classList.toggle('active', b===btn);
        b.classList.toggle('income', b.dataset.type==='income' && b===btn);
        b.classList.toggle('expense', b.dataset.type==='expense' && b===btn);
      });
      const sel = document.getElementById('txCategory');
      sel.innerHTML = '<option value="">Выберите категорию</option>' +
        state.categories.filter(c => c.type===type).map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
    });
  });

  document.getElementById('saveTx').addEventListener('click', () => saveTransaction(type));
  document.querySelectorAll('#modalFoot [data-action="close-modal"]').forEach(b => b.addEventListener('click', closeModal));
  openModal();
}

function saveTransaction(type){
  const amountEl = document.getElementById('txAmount');
  const dateEl = document.getElementById('txDate');
  const catEl = document.getElementById('txCategory');
  const commentEl = document.getElementById('txComment');

  let ok = true;
  const amount = parseFloat(amountEl.value);
  const errAmount = document.getElementById('errAmount');
  if(!amount || amount <= 0){ amountEl.classList.add('error'); errAmount.classList.add('show'); ok=false; }
  else { amountEl.classList.remove('error'); errAmount.classList.remove('show'); }

  const date = dateEl.value;
  const errDate = document.getElementById('errDate');
  if(!date || date > todayISO()){ dateEl.classList.add('error'); errDate.classList.add('show'); ok=false; }
  else { dateEl.classList.remove('error'); errDate.classList.remove('show'); }

  const catId = catEl.value;
  const errCategory = document.getElementById('errCategory');
  if(!catId){ catEl.classList.add('error'); errCategory.classList.add('show'); ok=false; }
  else { catEl.classList.remove('error'); errCategory.classList.remove('show'); }

  if(!ok) return;

  if(editingTxId){
    const tx = state.transactions.find(t => t.id===editingTxId);
    Object.assign(tx, { type, amount, date, categoryId:catId, comment:commentEl.value.trim() });
    toast('Транзакция обновлена', 'success');
  } else {
    state.transactions.push({ id:uid(), type, amount, date, categoryId:catId, comment:commentEl.value.trim() });
    toast('Транзакция добавлена', 'success');
  }
  save();
  closeModal();
  refreshAll();
}

/* --- Category modal --- */
function openCategoryModal(){
  modalTitle.textContent = 'Новая категория';
  let type = catTab;
  let icon = 'tag';
  let color = COLORS[0];

  modalBody.innerHTML = `
    <div class="form-group">
      <label class="form-label">Тип</label>
      <div class="seg" id="catTypeSeg">
        <button type="button" class="seg-btn ${type==='income'?'active income':''}" data-type="income">${iconSvg('trending','15')} Доход</button>
        <button type="button" class="seg-btn ${type==='expense'?'active expense':''}" data-type="expense">${iconSvg('cart','15')} Расход</button>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label" for="catName">Название</label>
      <input class="form-input" id="catName" type="text" maxlength="40" placeholder="Например: Спорт">
      <div class="form-error" id="errCatName">Введите название</div>
    </div>
    <div class="form-group">
      <label class="form-label">Иконка</label>
      <div class="icon-picker" id="iconPicker">
        ${ICON_KEYS.map(k => `<button type="button" class="icon-opt ${k===icon?'active':''}" data-icon="${k}" aria-label="${k}">${iconSvg(k,'18')}</button>`).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Цвет</label>
      <div class="color-picker" id="colorPicker">
        ${COLORS.map(c => `<button type="button" class="color-opt ${c===color?'active':''}" data-color="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}
      </div>
    </div>
  `;

  modalFoot.innerHTML = `
    <button class="btn btn-ghost" data-action="close-modal">Отмена</button>
    <button class="btn btn-primary" id="saveCat">Создать</button>
  `;

  modalBody.querySelectorAll('#catTypeSeg .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      type = btn.dataset.type;
      modalBody.querySelectorAll('#catTypeSeg .seg-btn').forEach(b => {
        b.classList.toggle('active', b===btn);
        b.classList.toggle('income', b.dataset.type==='income' && b===btn);
        b.classList.toggle('expense', b.dataset.type==='expense' && b===btn);
      });
    });
  });
  modalBody.querySelectorAll('#iconPicker .icon-opt').forEach(b => {
    b.addEventListener('click', () => {
      icon = b.dataset.icon;
      modalBody.querySelectorAll('#iconPicker .icon-opt').forEach(x => x.classList.toggle('active', x===b));
    });
  });
  modalBody.querySelectorAll('#colorPicker .color-opt').forEach(b => {
    b.addEventListener('click', () => {
      color = b.dataset.color;
      modalBody.querySelectorAll('#colorPicker .color-opt').forEach(x => x.classList.toggle('active', x===b));
    });
  });

  document.getElementById('saveCat').addEventListener('click', () => {
    const name = document.getElementById('catName').value.trim();
    const err = document.getElementById('errCatName');
    if(!name){ document.getElementById('catName').classList.add('error'); err.classList.add('show'); return; }

    const exists = state.categories.some(c => c.type===type && c.name.toLowerCase()===name.toLowerCase());
    if(exists){
      err.textContent = 'Категория с таким названием уже есть в этом типе';
      err.classList.add('show');
      document.getElementById('catName').classList.add('error');
      return;
    }
    const crossType = state.categories.some(c => c.type!==type && c.name.toLowerCase()===name.toLowerCase());
    if(crossType){
      err.textContent = 'Название уже используется в другом типе';
      err.classList.add('show');
      document.getElementById('catName').classList.add('error');
      return;
    }

    state.categories.push({ id:uid(), name, type, icon, color });
    save();
    closeModal();
    renderCategories();
    toast('Категория создана', 'success');
  });

  document.querySelectorAll('#modalFoot [data-action="close-modal"]').forEach(b => b.addEventListener('click', closeModal));
  openModal();
}

/* --- Goal modal --- */
function openGoalModal(goal){
  editingGoalId = goal ? goal.id : null;
  modalTitle.textContent = goal ? 'Редактировать цель' : 'Новая цель';
  modalBody.innerHTML = `
    <div class="form-group">
      <label class="form-label" for="goalName">Название</label>
      <input class="form-input" id="goalName" type="text" maxlength="60" placeholder="Например: Отпуск" value="${goal?escapeHtml(goal.name):''}">
      <div class="form-error" id="errGoalName">Введите название</div>
    </div>
    <div class="form-group">
      <label class="form-label" for="goalTarget">Целевая сумма</label>
      <input class="form-input" id="goalTarget" type="number" min="1" step="1" placeholder="100000" value="${goal?goal.target:''}">
      <div class="form-error" id="errGoalTarget">Введите сумму больше нуля</div>
    </div>
    <div class="form-group">
      <label class="form-label" for="goalDeadline">Дедлайн</label>
      <input class="form-input" id="goalDeadline" type="date" value="${goal?goal.deadline:''}">
      <div class="form-error" id="errGoalDeadline">Выберите дату</div>
    </div>
  `;
  modalFoot.innerHTML = `
    <button class="btn btn-ghost" data-action="close-modal">Отмена</button>
    <button class="btn btn-primary" id="saveGoal">${goal?'Сохранить':'Создать'}</button>
  `;
  document.getElementById('saveGoal').addEventListener('click', () => {
    const name = document.getElementById('goalName').value.trim();
    const target = parseFloat(document.getElementById('goalTarget').value);
    const deadline = document.getElementById('goalDeadline').value;
    let ok = true;
    if(!name){ document.getElementById('goalName').classList.add('error'); document.getElementById('errGoalName').classList.add('show'); ok=false; }
    if(!target || target<=0){ document.getElementById('goalTarget').classList.add('error'); document.getElementById('errGoalTarget').classList.add('show'); ok=false; }
    if(!deadline){ document.getElementById('goalDeadline').classList.add('error'); document.getElementById('errGoalDeadline').classList.add('show'); ok=false; }
    if(!ok) return;

    if(editingGoalId){
      const g = state.goals.find(x => x.id===editingGoalId);
      Object.assign(g, { name, target, deadline });
      toast('Цель обновлена', 'success');
    } else {
      state.goals.push({ id:uid(), name, target, current:0, deadline });
      toast('Цель создана', 'success');
    }
    save();
    closeModal();
    renderGoals();
  });
  document.querySelectorAll('#modalFoot [data-action="close-modal"]').forEach(b => b.addEventListener('click', closeModal));
  openModal();
}

/* --- Goal top-up --- */
function openGoalTopUp(goal){
  modalTitle.textContent = 'Пополнить цель';
  modalBody.innerHTML = `
    <div class="form-group">
      <label class="form-label">Цель</label>
      <div style="font-weight:600">${escapeHtml(goal.name)}</div>
    </div>
    <div class="form-group">
      <label class="form-label" for="topUpAmount">Сумма пополнения</label>
      <input class="form-input" id="topUpAmount" type="number" min="1" step="1" placeholder="1000">
    </div>
  `;
  modalFoot.innerHTML = `
    <button class="btn btn-ghost" data-action="close-modal">Отмена</button>
    <button class="btn btn-primary" id="doTopUp">Пополнить</button>
  `;
  document.getElementById('doTopUp').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('topUpAmount').value);
    if(!val || val<=0) return;
    goal.current += val;
    save();
    closeModal();
    renderGoals();
    toast('Цель пополнена', 'success');
  });
  document.querySelectorAll('#modalFoot [data-action="close-modal"]').forEach(b => b.addEventListener('click', closeModal));
  openModal();
}

/* --- Plan modal --- */
function openPlanModal(item){
  editingPlanId = item ? item.id : null;
  modalTitle.textContent = item ? t('plan_edit') : t('plan_add');
  const cats = state.categories.filter(c => c.type==='expense');
  modalBody.innerHTML = `
    <div class="form-group">
      <label class="form-label">Название</label>
      <input class="form-input" id="planName" type="text" maxlength="80" value="${item?escapeHtml(item.name):''}" placeholder="Новый телефон">
    </div>
    <div class="plan-form-row">
      <div class="form-group">
        <label class="form-label">Сумма</label>
        <input class="form-input" id="planAmount" type="number" min="1" step="1" value="${item?item.amount:''}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('plan_due')}</label>
        <input class="form-input" id="planDeadline" type="date" value="${item&&item.deadline?item.deadline:''}">
      </div>
    </div>
    <div class="plan-form-row">
      <div class="form-group">
        <label class="form-label">Категория</label>
        <select class="form-input" id="planCategory">
          <option value="">—</option>
          ${cats.map(c => `<option value="${c.id}" ${item&&item.categoryId===c.id?'selected':''}>${escapeHtml(c.name)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">${t('plan_priority')}</label>
        <select class="form-input" id="planPriority">
          ${PLAN_PRIORITIES.map(p => `<option value="${p}" ${(item&&item.priority===p)||(!item&&p==='medium')?'selected':''}>${t('prio_'+p)}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
  modalFoot.innerHTML = `
    <button class="btn btn-ghost" data-action="close-modal">Отмена</button>
    <button class="btn btn-primary" id="savePlan">${item?'Сохранить':'Создать'}</button>
  `;
  document.getElementById('savePlan').addEventListener('click', () => {
    const name = document.getElementById('planName').value.trim();
    const amount = parseFloat(document.getElementById('planAmount').value);
    const deadline = document.getElementById('planDeadline').value;
    const categoryId = document.getElementById('planCategory').value;
    const priority = document.getElementById('planPriority').value;
    if(!name || !amount || amount<=0) return;

    if(editingPlanId){
      const p = state.plan.find(x => x.id===editingPlanId);
      Object.assign(p, { name, amount, deadline, categoryId, priority });
      toast('План обновлён', 'success');
    } else {
      state.plan.push({ id:uid(), name, amount, deadline, categoryId, priority, bought:false });
      toast('Покупка добавлена в план', 'success');
    }
    save();
    closeModal();
    renderPlan();
  });
  document.querySelectorAll('#modalFoot [data-action="close-modal"]').forEach(b => b.addEventListener('click', closeModal));
  openModal();
}

/* --- Rates modal --- */
function openRatesModal(){
  modalTitle.textContent = t('rates_title');
  const base = state.settings.currency;
  modalBody.innerHTML = `
    <p style="font-size:13px;color:var(--muted);margin-bottom:14px">${t('rates_hint')} (${CURRENCIES[base].symbol} ${base})</p>
    <div style="display:grid;gap:10px">
      ${Object.keys(CURRENCIES).filter(c=>c!==base).map(c=>`
        <div style="display:flex;align-items:center;gap:10px">
          <span style="min-width:70px;font-family:'JetBrains Mono',monospace;font-size:12px">${CURRENCIES[c].symbol} ${c}</span>
          <input class="form-input" type="number" step="0.0001" min="0"
                 data-rate="${c}" value="${state.rates[c]||1}" style="flex:1">
        </div>
      `).join('')}
    </div>
  `;
  modalFoot.innerHTML = `
    <button class="btn btn-ghost" data-action="close-modal">Отмена</button>
    <button class="btn btn-primary" id="saveRates">Сохранить</button>
  `;
  document.getElementById('saveRates').addEventListener('click', () => {
    modalBody.querySelectorAll('input[data-rate]').forEach(inp => {
      const v = parseFloat(inp.value);
      if(v>0) state.rates[inp.dataset.rate] = v;
    });
    state.rates[state.settings.currency] = 1;
    save();
    closeModal();
    refreshAll();
    toast('Курсы сохранены', 'success');
  });
  document.querySelectorAll('#modalFoot [data-action="close-modal"]').forEach(b => b.addEventListener('click', closeModal));
  openModal();
}

/* ============================ EVENTS ============================ */
document.addEventListener('click', e => {
  const newTx = e.target.closest('[data-action="new-tx"]');
  if(newTx){ openTransactionModal(); return; }
  const newCat = e.target.closest('[data-action="new-category"]');
  if(newCat){ openCategoryModal(); return; }
  const newGoal = e.target.closest('[data-action="new-goal"]');
  if(newGoal){ openGoalModal(); return; }
  const newPlan = e.target.closest('[data-action="new-plan"]');
  if(newPlan){ openPlanModal(); return; }

  const edit = e.target.closest('[data-edit]');
  if(edit){
    const tx = state.transactions.find(t => t.id===edit.dataset.edit);
    if(tx) openTransactionModal(tx);
    return;
  }
  const del = e.target.closest('[data-del]');
  if(del){
    const id = del.dataset.del;
    const row = document.querySelector(`.tx-row[data-id="${id}"]`);
    if(row) row.classList.add('removing');
    setTimeout(() => {
      state.transactions = state.transactions.filter(t => t.id!==id);
      save();
      refreshAll();
      toast('Транзакция удалена', 'info');
    }, 220);
    return;
  }
  const delCat = e.target.closest('[data-del-cat]');
  if(delCat && !delCat.disabled){
    state.categories = state.categories.filter(c => c.id!==delCat.dataset.delCat);
    save();
    renderCategories();
    toast('Категория удалена', 'info');
    return;
  }
  const goalAdd = e.target.closest('[data-goal-add]');
  if(goalAdd){
    const g = state.goals.find(x => x.id===goalAdd.dataset.goalAdd);
    if(g) openGoalTopUp(g);
    return;
  }
  const goalDel = e.target.closest('[data-goal-del]');
  if(goalDel){
    state.goals = state.goals.filter(g => g.id!==goalDel.dataset.goalDel);
    save();
    renderGoals();
    toast('Цель удалена', 'info');
    return;
  }

  // PLAN actions
  const planBuy = e.target.closest('[data-plan-buy]');
  if(planBuy){
    const p = state.plan.find(x => x.id===planBuy.dataset.planBuy);
    if(p){
      state.transactions.push({
        id:uid(), type:'expense', amount:p.amount,
        date: todayISO(), categoryId: p.categoryId || '',
        comment: p.name
      });
      p.bought = true;
      save(); refreshAll();
      toast('Куплено — транзакция создана', 'success');
    }
    return;
  }
  const planEdit = e.target.closest('[data-plan-edit]');
  if(planEdit){
    const p = state.plan.find(x => x.id===planEdit.dataset.planEdit);
    if(p) openPlanModal(p);
    return;
  }
  const planDel = e.target.closest('[data-plan-del]');
  if(planDel){
    state.plan = state.plan.filter(x => x.id!==planDel.dataset.planDel);
    save(); renderPlan();
    toast('Удалено из плана', 'info');
    return;
  }
});

['txSearch','txTypeFilter','txCatFilter','txMonthFilter'].forEach(id => {
  const el = document.getElementById(id);
  if(!el) return;
  el.addEventListener('input', renderTransactions);
  el.addEventListener('change', renderTransactions);
});

document.getElementById('setLang').addEventListener('change', e => {
  state.settings.lang = e.target.value;
  save();
  applyLang();
  refreshAll();
});

document.getElementById('setCurrency').addEventListener('change', e => {
  const oldBase = state.settings.currency;
  const newBase = e.target.value;
  if(oldBase === newBase) return;

  const oldR = state.rates[oldBase] || 1;
  const newR = state.rates[newBase] || 1;
  const factor = newR / oldR;

  state.transactions.forEach(t => t.amount = +(t.amount * factor).toFixed(2));
  state.goals.forEach(g => {
    g.target  = +(g.target  * factor).toFixed(2);
    g.current = +(g.current * factor).toFixed(2);
  });
  state.plan.forEach(p => p.amount = +(p.amount * factor).toFixed(2));

  state.settings.currency = newBase;
  save();
  refreshAll();
  toast(t('set_base')+': '+(CURRENCIES[newBase]?.symbol||''), 'info');
});

document.getElementById('setWeekStart').addEventListener('change', e => {
  state.settings.weekStart = parseInt(e.target.value);
  save();
  toast('Настройка сохранена', 'info');
});
document.getElementById('setThemeBtn').addEventListener('click', toggleTheme);
document.getElementById('editRatesBtn').addEventListener('click', openRatesModal);

document.getElementById('exportBtn').addEventListener('click', () => {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'flux-data-' + todayISO() + '.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('Данные экспортированы', 'success');
});

document.getElementById('importInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const parsed = JSON.parse(reader.result);
      if(!parsed || typeof parsed!=='object') throw new Error('bad');
      state.transactions = Array.isArray(parsed.transactions) ? parsed.transactions : [];
      state.categories = Array.isArray(parsed.categories) && parsed.categories.length ? parsed.categories : DEFAULT_CATEGORIES.slice();
      state.goals = Array.isArray(parsed.goals) ? parsed.goals : [];
      state.plan = Array.isArray(parsed.plan) ? parsed.plan : [];
      state.rates = Object.assign({}, DEFAULT_RATES, parsed.rates||{});
      state.settings = Object.assign({ currency:'RUB', weekStart:1, theme:'dark', lang:'ru' }, parsed.settings||{});
      save();
      applyTheme();
      applyLang();
      refreshAll();
      toast('Данные импортированы', 'success');
    }catch(err){
      toast('Ошибка импорта: неверный файл', 'error');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if(!confirm('Удалить все данные? Это действие нельзя отменить.')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = {
    transactions:[], categories:DEFAULT_CATEGORIES.slice(), goals:[], plan:[],
    rates:Object.assign({}, DEFAULT_RATES),
    settings:{ currency:'RUB', weekStart:1, theme:state.settings.theme, lang:state.settings.lang }
  };
  save();
  refreshAll();
  toast('Данные сброшены', 'info');
});

function toggleTheme(){
  const next = state.settings.theme==='dark' ? 'light' : 'dark';
  state.settings.theme = next;
  save();
  applyTheme();
}
function applyTheme(){
  document.documentElement.setAttribute('data-theme', state.settings.theme);
  applyLang();
}
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);

/* ============================ TOAST ============================ */
function toast(msg, type){
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = 'toast';
  const icon = type==='success' ? 'check' : type==='error' ? 'scissors' : 'activity';
  el.innerHTML = `
    <div class="toast-icon ${type||'info'}">${iconSvg(icon,'16')}</div>
    <div class="toast-msg">${escapeHtml(msg)}</div>
  `;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

/* ============================ PAGE PROGRESS ============================ */
function pageProgress(){
  const bar = document.getElementById('pageProgress');
  if(!bar) return;
  bar.style.opacity = '1';
  bar.style.width = '30%';
  setTimeout(() => bar.style.width = '70%', 120);
  setTimeout(() => bar.style.width = '100%', 350);
  setTimeout(() => { bar.style.opacity = '0'; }, 650);
  setTimeout(() => { bar.style.width = '0%'; }, 900);
}

/* ============================ REFRESH ============================ */
function refreshAll(){
  renderOverview();
  renderTransactions();
  renderCategories();
  renderGoals();
  renderPlan();
  renderSettings();
}

/* ============================ INIT ============================ */
function init(){
  load();
  applyTheme();
  applyLang();
  pageProgress();
  refreshAll();
  switchScreen('overview');
}
init();
