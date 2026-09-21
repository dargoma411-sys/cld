"use strict";
/* ==================================================================
   СЛЬДО · личный финансовый трекер
   HTML + CSS + JS, без фреймворков. Данные — localStorage.
   ================================================================== */

/* ---------- 1. ИКОНКИ (только SVG, тонкие штрихи) ---------- */
const I = {
  pie:'<path d="M12 3a9 9 0 1 0 9 9h-9Z"/><path d="M14.6 3.4A9.4 9.4 0 0 1 20.6 9.4h-6Z"/>',
  swap:'<path d="M4 8h14l-3.4-3.4M20 16H6l3.4 3.4"/>',
  grid:'<rect x="3.5" y="3.5" width="7.4" height="7.4" rx="2.2"/><rect x="13.1" y="3.5" width="7.4" height="7.4" rx="2.2"/><rect x="3.5" y="13.1" width="7.4" height="7.4" rx="2.2"/><rect x="13.1" y="13.1" width="7.4" height="7.4" rx="2.2"/>',
  target:'<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/>',
  sliders:'<path d="M4 7.5h9M18.5 7.5H20M4 16.5h3.5M13 16.5h7"/><circle cx="15.5" cy="7.5" r="2.4"/><circle cx="10" cy="16.5" r="2.4"/>',
  plus:'<path d="M12 5.5v13M5.5 12h13"/>',
  minus:'<path d="M5.5 12h13"/>',
  trash:'<path d="M3.8 6.4h16.4"/><path d="M9 6.4V4.6h6v1.8"/><path d="M6.2 6.4 7.4 20h9.2l1.2-13.6"/><path d="M10.2 10.4v5.6M13.8 10.4v5.6"/>',
  pencil:'<path d="M12.6 20.4H20.5"/><path d="M16.4 3.9a2.2 2.2 0 0 1 3.1 3.1L7.6 18.9l-4.1 1 1-4.1Z"/>',
  x:'<path d="M17.8 6.2 6.2 17.8M6.2 6.2l11.6 11.6"/>',
  check:'<path d="m19.4 6.6-10.2 10.8-4.6-4.4"/>',
  checkCircle:'<circle cx="12" cy="12" r="8.8"/><path d="m8.2 12.3 2.6 2.6 5-5.4"/>',
  alert:'<path d="M12 4.2 2.9 19.8h18.2Z"/><path d="M12 10v4.2M12 17.3v.1"/>',
  info:'<circle cx="12" cy="12" r="8.8"/><path d="M12 11.2v5M12 8.1v.1"/>',
  search:'<circle cx="11" cy="11" r="6.8"/><path d="m20.2 20.2-4.4-4.4"/>',
  filter:'<path d="M3.8 5.2h16.4l-6.4 7.6v6.2l-3.6-1.9v-4.3Z"/>',
  cal:'<rect x="3.4" y="5.2" width="17.2" height="15.4" rx="3"/><path d="M3.4 10.2h17.2M8.2 3.4v3.4M15.8 3.4v3.4"/>',
  clock:'<circle cx="12" cy="12" r="8.8"/><path d="M12 7.4V12l3.2 1.9"/>',
  chevL:'<path d="m14.6 18.4-6.4-6.4 6.4-6.4"/>',
  chevR:'<path d="m9.4 5.6 6.4 6.4-6.4 6.4"/>',
  chevD:'<path d="m5.6 9.4 6.4 6.4 6.4-6.4"/>',
  arrR:'<path d="M4.5 12h15M13.4 6l6 6-6 6"/>',
  arrUR:'<path d="M7 17 17 7M8.4 7H17v8.6"/>',
  arrDR:'<path d="M7 7l10 10M17 8.4V17H8.4"/>',
  trendUp:'<path d="M3.4 17.2 9.6 11l3.8 3.6 7-7.2"/><path d="M14.6 7.4h5.8v5.8"/>',
  trendDown:'<path d="M3.4 6.8 9.6 13l3.8-3.6 7 7.2"/><path d="M14.6 16.6h5.8v-5.8"/>',
  download:'<path d="M12 3.4v12.2"/><path d="m7 10.6 5 5 5-5"/><path d="M4 20.4h16"/>',
  upload:'<path d="M12 20.6V8.4"/><path d="m7 13.4 5-5 5 5"/><path d="M4 3.6h16"/>',
  refresh:'<path d="M3.4 12a8.6 8.6 0 1 1 2.9 6.4"/><path d="M3.4 19.4v-5h5"/>',
  zap:'<path d="M13.2 3 5.6 13.6h4.8L10.4 21l7.9-10.9h-4.9Z"/>',
  sun:'<circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>',
  moon:'<path d="M20.4 14.6A8.8 8.8 0 0 1 9.4 3.6a8.8 8.8 0 1 0 11 11Z"/>',
  wallet:'<path d="M3.2 8.2A2.8 2.8 0 0 1 6 5.4h11.6a2 2 0 0 1 2 2v.8"/><path d="M3.2 8.2V17a3.4 3.4 0 0 0 3.4 3.4h11.6a1.4 1.4 0 0 0 1.4-1.4v-2.6"/><path d="M20.6 10.6h-3.9a2.7 2.7 0 0 0 0 5.4h3.9a1 1 0 0 0 1-1v-3.4a1 1 0 0 0-1-1Z"/>',
  banknote:'<rect x="2.4" y="6" width="19.2" height="12" rx="2.8"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/>',
  piggy:'<path d="M4.4 11.6c0-3.2 3.3-5.6 7.4-5.6 3.3 0 6.1 1.7 7.1 4.1l1.7.5v3.2l-1.8.4c-.3 1-.9 1.9-1.7 2.6v1.8h-3v-1.4a11 11 0 0 1-2.4 0v1.4H6.4v-2a6.5 6.5 0 0 1-2-3.2H3.2v-2.4Z"/><path d="M8.6 8.2 7.4 6.4"/><circle cx="16.4" cy="12" r=".9" fill="currentColor" stroke="none"/>',
  keyboard:'<rect x="2.4" y="6" width="19.2" height="12" rx="3"/><path d="M6.6 10h.01M10.2 10h.01M13.8 10h.01M17.4 10h.01M7 14h10"/>',
  dots:'<circle cx="5.2" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="18.8" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
  arrowRightCircle:'<circle cx="12" cy="12" r="8.8"/><path d="M8.6 12h6.6M12.6 9l2.6 3-2.6 3"/>',
  layers:'<path d="m12 3.2 8.4 4.4-8.4 4.4-8.4-4.4Z"/><path d="m3.6 12 8.4 4.4 8.4-4.4"/><path d="m3.6 16.4 8.4 4.4 8.4-4.4"/>',
  db:'<ellipse cx="12" cy="6.2" rx="7.2" ry="2.9"/><path d="M4.8 6.2v5.3c0 1.6 3.2 2.9 7.2 2.9s7.2-1.3 7.2-2.9V6.2"/><path d="M4.8 11.5v5.4c0 1.6 3.2 2.9 7.2 2.9s7.2-1.3 7.2-2.9v-5.4"/>',
  flag:'<path d="M5.4 20.6V4.2"/><path d="M5.4 5.2h12.2l-2.4 3.8 2.4 3.8H5.4"/>',
  /* категорийные */
  cart:'<circle cx="9.6" cy="19.6" r="1.5"/><circle cx="17.6" cy="19.6" r="1.5"/><path d="M3 4.2h2.4l2.5 11.2h11.2l2.1-7.8H6.4"/>',
  bus:'<rect x="4" y="4.2" width="16" height="12.6" rx="2.8"/><path d="M4 11.4h16"/><circle cx="8.2" cy="14" r="1"/><circle cx="15.8" cy="14" r="1"/><path d="M7 20v-3.2M17 20v-3.2"/>',
  film:'<rect x="3.2" y="4.4" width="17.6" height="15.2" rx="2.8"/><path d="M8.4 4.4v15.2M15.6 4.4v15.2M3.2 9.4h5.2M3.2 14.6h5.2M15.6 9.4h5.2M15.6 14.6h5.2"/>',
  phone:'<path d="M6.8 3.6 9.4 3l1.5 3.7-2.1 1.4a11.4 11.4 0 0 0 5.9 5.9l1.4-2.1 3.7 1.5-.6 2.6a2.1 2.1 0 0 1-2.3 1.6A14 14 0 0 1 5.2 7.9a2.1 2.1 0 0 1 1.6-4.3Z"/>',
  home:'<path d="m3.4 10.6 8.6-7 8.6 7"/><path d="M5.6 9.4v11h12.8v-11"/><path d="M9.8 20.4v-5.6h4.4v5.6"/>',
  heart:'<path d="M12 20.2s-7.6-4.6-7.6-9.8A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.6 2.8c0 5.2-7.6 9.8-7.6 9.8Z"/>',
  pulse:'<path d="M20.4 12.2h-4.1l-2.2 5.6-3.4-11-2.1 5.4H3.6"/>',
  shirt:'<path d="M8.4 3.4 4 6l1.7 4.1 2.3-1.1v11.6h8V9l2.3 1.1L20 6l-4.4-2.6a3.8 3.8 0 0 1-7.2 0Z"/>',
  book:'<path d="M4 4.6h5.2a3 3 0 0 1 3 3v12.4a2.4 2.4 0 0 0-2.4-2.4H4Z"/><path d="M20 4.6h-5.2a3 3 0 0 0-3 3v12.4a2.4 2.4 0 0 1 2.4-2.4H20Z"/>',
  box:'<path d="m12 3.2 8.2 4.4v8.8L12 20.8l-8.2-4.4V7.6Z"/><path d="m3.8 7.6 8.2 4.4 8.2-4.4M12 12v8.8"/>',
  briefcase:'<rect x="2.8" y="7.4" width="18.4" height="12.2" rx="2.8"/><path d="M8.8 7.4V5.8a2 2 0 0 1 2-2h2.4a2 2 0 0 1 2 2v1.6"/><path d="M2.8 12.6h18.4"/><path d="M11 12.6v2h2v-2"/>',
  laptop:'<rect x="4.4" y="4.8" width="15.2" height="10.4" rx="2"/><path d="M2.4 18.8h19.2"/><path d="M10.6 18.8h2.8"/>',
  gift:'<rect x="3.4" y="8.4" width="17.2" height="12" rx="2.4"/><path d="M3.4 13h17.2M12 8.4V20.4"/><path d="M12 8.4S10.4 3.6 8 4.4 9.6 8.4 12 8.4Zm0 0s1.6-4.8 4-4-1.6 4-4 4Z"/>',
  tag:'<path d="M11.4 3.6h8.4v8.4l-8.1 8.1a2 2 0 0 1-2.8 0L3.9 15.1a2 2 0 0 1 0-2.8Z"/><circle cx="16" cy="8" r="1.3"/>',
  percent:'<path d="M18.6 5.4 5.4 18.6"/><circle cx="8.2" cy="8.2" r="2.6"/><circle cx="15.8" cy="15.8" r="2.6"/>',
  coins:'<ellipse cx="12" cy="6.4" rx="7" ry="2.9"/><path d="M5 6.4v5c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-5"/><path d="M5 11.4v5c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-5"/>',
  card:'<rect x="2.4" y="5" width="19.2" height="14" rx="2.8"/><path d="M2.4 9.8h19.2"/><path d="M6 14.6h4.2"/>',
  coffee:'<path d="M3.6 8.2h12.2v5.4a5.4 5.4 0 0 1-10.8 0Z"/><path d="M15.8 9.2h2.4a2.6 2.6 0 0 1 0 5.2h-2.4"/><path d="M3.6 20.6h12.2"/>',
  plane:'<path d="m20.8 3.6-8.4 17-2.2-6.8-6.8-2.2Z"/><path d="M20.8 3.6 10.2 13.8"/>',
  dumbbell:'<path d="M6.6 6.4v11.2M3.8 9v6M17.4 6.4v11.2M20.2 9v6M6.6 12h10.8"/>',
  music:'<path d="M9.4 17.8V5.6l10-1.8v12"/><circle cx="7" cy="18" r="2.4"/><circle cx="17" cy="16" r="2.4"/>',
  utensils:'<path d="M6.4 3.4v6.2a2.4 2.4 0 0 0 4.8 0V3.4"/><path d="M8.8 9.6v11"/><path d="M16.4 3.4c-1.6 1.4-2.4 3.2-2.4 5.6 0 1.8.8 2.8 2.4 3.2v8.4"/>',
  sprout:'<path d="M12 20.6v-8"/><path d="M12 12.6C12 9.4 9.4 7 6 7c0 3.2 2.6 5.6 6 5.6Z"/><path d="M12 12.6c0-3.8 2.8-6.6 6.4-6.6 0 3.8-2.8 6.6-6.4 6.6Z"/>',
  dog:'<path d="M4.6 9.4 6 4.8l3.4 2.4h5.2L18 4.8l1.4 4.6c0 5.4-3.4 11.2-7.4 11.2S4.6 14.8 4.6 9.4Z"/><circle cx="9.8" cy="11" r=".9" fill="currentColor" stroke="none"/><circle cx="14.2" cy="11" r=".9" fill="currentColor" stroke="none"/>'
};
const ICON_CHOICES = ['cart','bus','film','phone','home','heart','pulse','shirt','book','box','briefcase','laptop','gift','tag','percent','coins','card','coffee','plane','dumbbell','music','utensils','sprout','dog','piggy','wallet','banknote','flag'];
function svg(n, size=18, cls=''){ return '<svg class="ic '+cls+'" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(I[n]||I.box)+'</svg>'; }

/* ---------- 2. УТИЛИТЫ ---------- */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-'+Date.now()+'-'+Math.random().toString(36).slice(2,9));
const clamp = (v,a,b)=>Math.min(b,Math.max(a,v));
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const NBSP = '\u00A0';

const CUR = { RUB:{sym:'₽',name:'Рубль',code:'RUB'}, USD:{sym:'$',name:'Доллар',code:'USD'}, EUR:{sym:'€',name:'Евро',code:'EUR'}, KZG:{sym:'₸',name:'Тенге',code:'KZG'}, UAH:{sym:'₴',name:'Гривна',code:'UAH'} };
const PALETTE = ['#a855f7','#4f46e5','#38bdf8','#2dd4bf','#4ade80','#a3e635','#fbbf24','#f59e0b','#fb7185','#f472b6','#c084fc','#818cf8','#94a3b8','#64748b'];

function money(v, o={}){
  const abs = Math.abs(Number(v)||0);
  const dec = o.dec!=null ? o.dec : (Number.isInteger(abs) ? 0 : 2);
  const num = new Intl.NumberFormat('ru-RU',{minimumFractionDigits:dec,maximumFractionDigits:dec}).format(abs);
  const sym = (CUR[state.settings.currency]||CUR.RUB).sym;
  const sign = v<0 ? '−' : (o.plus && v>0 ? '+' : '');
  return sign + num + NBSP + sym;
}
function compact(v){
  const a=Math.abs(v), s=v<0?'−':'';
  if(a>=1e6) return s+trimNum(a/1e6)+NBSP+'млн';
  if(a>=1e3) return s+Math.round(a/1e3)+NBSP+'тыс.';
  return s+Math.round(a);
}
const trimNum = n => (Math.round(n*10)/10).toString().replace('.',',');
function pctTxt(v){ const s=v>0?'+':''; return s+(Math.round(Math.abs(v)<10 ? v*10 : v)/1||0)+''; }
function pctFmt(v){ if(!isFinite(v)) return '—'; const r=Math.round(Math.abs(v)<10?v*10:v); return (v>0?'+':'')+r+'%'; }
function plural(n, one, few, many){ const m=n%100, d=n%10; return (m>10&&m<20)?many:(d===1)?one:(d>1&&d<5)?few:many; }
function daysWord(n){ return n+' '+plural(Math.abs(n),'день','дня','дней'); }

const pad = n => String(n).padStart(2,'0');
const isoOf = d => d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const todayISO = () => isoOf(new Date());
const parseISO = s => { const [y,m,d]=String(s).split('-').map(Number); return new Date(y,(m||1)-1,d||1); };
const mKey = s => String(s).slice(0,7);
const curMK = () => todayISO().slice(0,7);
function shiftMK(k,n){ const [y,m]=k.split('-').map(Number); const d=new Date(y,m-1+n,1); return d.getFullYear()+'-'+pad(d.getMonth()+1); }
function mkTitle(k,cap=true){ const [y,m]=k.split('-').map(Number); const t=new Date(y,m-1,1).toLocaleDateString('ru-RU',{month:'long',year:'numeric'}).replace(/\s?г\.?$/,''); return cap?t[0].toUpperCase()+t.slice(1):t; }
function mkShort(k){ const [y,m]=k.split('-').map(Number); return new Date(y,m-1,1).toLocaleDateString('ru-RU',{month:'short'}).replace('.',''); }
function dayTitle(s){ const d=parseISO(s); return { d:d.toLocaleDateString('ru-RU',{day:'numeric',month:'long'}), w:d.toLocaleDateString('ru-RU',{weekday:'long'}), rel:relativeDay(s) }; }
function shortDate(s){ const d=parseISO(s); return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'short'})+', '+d.toLocaleDateString('ru-RU',{weekday:'short'}); }
function relativeDay(s){
  const diff = Math.round((parseISO(todayISO())-parseISO(s))/86400000);
  if(diff===0) return 'сегодня'; if(diff===1) return 'вчера'; if(diff===2) return 'позавчера';
  if(diff>2 && diff<7) return diff+' '+plural(diff,'день','дня','дней')+' назад';
  return '';
}
function weekStartISO(weekStart, ref=new Date()){
  const d=new Date(ref.getFullYear(),ref.getMonth(),ref.getDate());
  const wd=(d.getDay()+7-(weekStart||1))%7;
  d.setDate(d.getDate()-wd);
  return isoOf(d);
}
const parseAmount = s => Math.round((Number(String(s).replace(/\s|\u00A0/g,'').replace(',','.'))||0)*100)/100;
function niceMax(v){ if(v<=0) return 100; const e=Math.pow(10,Math.floor(Math.log10(v))); const f=v/e; const n=f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10; return n*e; }
function download(name, text, type){
  const blob=new Blob([text],{type:type||'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob); const a=document.createElement('a');
  a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
}

/* ---------- 3. ХРАНИЛИЩЕ ---------- */
const LS='saldo.v1';
const DEF_EXPENSE = [
  ['groceries','Продукты','cart','#f59e0b'], ['transport','Транспорт','bus','#38bdf8'],
  ['fun','Развлечения','film','#f472b6'], ['comms','Связь','phone','#a78bfa'],
  ['home','Жильё','home','#60a5fa'], ['health','Здоровье','pulse','#2dd4bf'],
  ['clothes','Одежда','shirt','#fb7185'], ['edu','Образование','book','#818cf8'],
  ['other_e','Другое','box','#94a3b8']
];
const DEF_INCOME = [
  ['salary','Зарплата','briefcase','#4ade80'], ['side','Подработка','laptop','#22c55e'],
  ['gift','Подарок','gift','#a3e635'], ['sell','Продажа','tag','#2dd4bf'],
  ['interest','Проценты','percent','#c084fc'], ['other_i','Другое','coins','#86efac']
];
function defaultState(){
  return {
    v:1,
    settings:{ currency:'RUB', weekStart:1, theme:'dark' },
    categories:[
      ...DEF_EXPENSE.map(([id,name,icon,color])=>({id,name,type:'expense',icon,color})),
      ...DEF_INCOME.map(([id,name,icon,color])=>({id,name,type:'income',icon,color}))
    ],
    transactions:[],
    goals:[]
  };
}
let state = defaultState();
function load(){
  try{
    const raw=localStorage.getItem(LS);
    if(!raw) return false;
    const p=JSON.parse(raw);
    const d=defaultState();
    state={
      v:1,
      settings:Object.assign(d.settings, p.settings||{}, {theme:p.settings?.theme||'dark'}),
      categories:Array.isArray(p.categories)&&p.categories.length?p.categories.map(normalizeCat).filter(Boolean):d.categories,
      transactions:Array.isArray(p.transactions)?p.transactions.map(normalizeTx).filter(Boolean):[],
      goals:Array.isArray(p.goals)?p.goals.map(normalizeGoal).filter(Boolean):[]
    };
    return true;
  }catch(e){ console.warn('Не удалось прочитать хранилище',e); return false; }
}
function normalizeCat(c){
  if(!c||typeof c.name!=='string') return null;
  return { id:c.id||uid(), name:c.name.slice(0,32), type:c.type==='income'?'income':'expense',
    icon:I[c.icon]?c.icon:'box', color:/^#[0-9a-f]{6}$/i.test(c.color)?c.color:'#a855f7' };
}
function normalizeTx(t){
  if(!t) return null;
  const amount=Math.round((Number(t.amount)||0)*100)/100;
  if(!(amount>0) || !/^\d{4}-\d{2}-\d{2}$/.test(String(t.date))) return null;
  return { id:t.id||uid(), type:t.type==='income'?'income':'expense', amount, date:t.date,
    categoryId:String(t.categoryId||''), comment:String(t.comment||'').slice(0,140), created:Number(t.created)||Date.now() };
}
function normalizeGoal(g){
  if(!g||typeof g.name!=='string'||!g.name.trim()) return null;
  return { id:g.id||uid(), name:g.name.slice(0,60), target:Math.max(1,Math.round((Number(g.target)||0)*100)/100),
    saved:Math.max(0,Math.round((Number(g.saved)||0)*100)/100), deadline:/^\d{4}-\d{2}-\d{2}$/.test(String(g.deadline))?g.deadline:'', created:Number(g.created)||Date.now() };
}
let saveT;
function save(){ clearTimeout(saveT); saveT=setTimeout(()=>{ try{ localStorage.setItem(LS,JSON.stringify(state)); }catch(e){ toast('Хранилище переполнено','danger',{desc:'Освободите место в localStorage'}); } },120); }

/* ---------- 4. UI-СОСТОЯНИЕ ---------- */
const ui = {
  view:'overview',
  month:curMK(),
  tx:{ type:'all', cat:'all', period:'month', q:'', sort:'desc', limit:40 },
  catTab:'expense'
};
const VIEWS = [
  {id:'overview',    label:'Обзор',      icon:'pie',    title:'Обзор',        sub:'Баланс, динамика и структура расходов'},
  {id:'transactions',label:'Транзакции', icon:'swap',   title:'Транзакции',   sub:'Все операции, фильтры и поиск'},
  {id:'categories',  label:'Категории',  icon:'grid',   title:'Категории',    sub:'Как раскладываются доходы и расходы'},
  {id:'goals',       label:'Цели',       icon:'target', title:'Финансовые цели', sub:'Прогресс по накоплениям'},
  {id:'settings',    label:'Настройки',  icon:'sliders',title:'Настройки',    sub:'Валюта, данные и оформление'}
];

/* ---------- 5. АГРЕГАТЫ ---------- */
const catById = id => state.categories.find(c=>c.id===id) || null;
const catsByType = t => state.categories.filter(c=>c.type===t);
const unknownCat = {id:'',name:'Без категории',icon:'box',color:'#64748b'};
const txCat = t => catById(t.categoryId)||unknownCat;
const byDateDesc = (a,b)=> a.date<b.date?1:a.date>b.date?-1:(b.created||0)-(a.created||0);
function inPeriod(t, period){
  if(period==='all') return true;
  if(period==='week'){ const s=weekStartISO(state.settings.weekStart); const e=new Date(parseISO(s)); e.setDate(e.getDate()+6); return parseISO(t.date)>=parseISO(s)&&parseISO(t.date)<=e; }
  if(period==='month') return mKey(t.date)===curMK();
  if(period==='prev') return mKey(t.date)===shiftMK(curMK(),-1);
  return mKey(t.date)===period;
}
function sums(list){
  let inc=0, exp=0;
  for(const t of list){ if(t.type==='income') inc+=t.amount; else exp+=t.amount; }
  return {inc:Math.round(inc*100)/100, exp:Math.round(exp*100)/100, net:Math.round((inc-exp)*100)/100};
}
const balanceAll = () => sums(state.transactions).net;
function balanceBefore(isoExclusive){
  return sums(state.transactions.filter(t=>t.date<isoExclusive)).net;
}
function monthBounds(k){ const [y,m]=k.split('-').map(Number); const s=new Date(y,m-1,1); const e=new Date(y,m,0); return [isoOf(s),isoOf(e)]; }
function txInMonth(k){ const [s,e]=monthBounds(k); return state.transactions.filter(t=>t.date>=s&&t.date<=e); }
function catTotals(k, type){
  const map=new Map();
  for(const t of txInMonth(k)){ if(t.type!==type) continue; map.set(t.categoryId,(map.get(t.categoryId)||0)+t.amount); }
  return map;
}
function allMonths(){
  const set=new Set([curMK()]);
  state.transactions.forEach(t=>set.add(mKey(t.date)));
  return Array.from(set).sort().reverse();
}
function storageBytes(){ try{ return new Blob([localStorage.getItem(LS)||'']).size; }catch(e){ return 0; } }

/* ---------- 6. ЧИСЛА С АНИМАЦИЕЙ ---------- */
const shown = new Map();
function countTo(node, value, fmt){
  if(!node) return;
  const key=node.dataset.k||node.id;
  const from = shown.has(key)?shown.get(key):value;
  shown.set(key,value);
  if(RM || from===value){ node.textContent=fmt(value); return; }
  const t0=performance.now(), dur=760;
  function step(now){
    const p=clamp((now-t0)/dur,0,1), e=1-Math.pow(1-p,3);
    node.textContent=fmt(from+(value-from)*e);
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- 7. REVEAL ---------- */
let io;
function reveals(root){
  const nodes=$$('[data-reveal]',root||document).filter(n=>!n.dataset.ro);
  if(!nodes.length) return;
  nodes.forEach((n,i)=>{ n.style.transitionDelay=Math.min(i*45,320)+'ms'; n.dataset.ro='1'; });
  if(RM){ nodes.forEach(n=>n.classList.add('in')); return; }
  if(!io) io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold:.08,rootMargin:'0px 0px -40px'});
  nodes.forEach(n=>io.observe(n));
}

/* ---------- 8. TOAST ---------- */
function toast(title, kind='ok', o={}){
  const colors={ok:'var(--income)',info:'var(--acc-3)',warn:'var(--gold)',danger:'var(--expense)'};
  const icons={ok:'checkCircle',info:'info',warn:'alert',danger:'alert'};
  const wrap=$('#toasts');
  const el=document.createElement('div');
  el.className='toast'; el.style.setProperty('--c',colors[kind]||colors.ok);
  const dur=o.duration||4000;
  el.innerHTML='<span class="ti">'+svg(icons[kind]||'info',16)+'</span><div style="min-width:0"><b>'+esc(title)+'</b>'+
    (o.desc?'<span>'+esc(o.desc)+'</span>':'')+'</div>'+
    (o.action?'<button class="undo" type="button">'+esc(o.action.label)+'</button>':'')+'<i class="pg" style="--d:'+dur+'ms"></i>';
  wrap.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('in'));
  const kill=()=>{ el.classList.add('out'); setTimeout(()=>el.remove(),320); };
  const timer=setTimeout(kill,dur);
  if(o.action) el.querySelector('.undo').addEventListener('click',()=>{ clearTimeout(timer); o.action.fn(); kill(); });
  el.addEventListener('mouseenter',()=>{clearTimeout(timer);el.querySelector('.pg').style.animationPlayState='paused';});
  el.addEventListener('mouseleave',()=>{ el.querySelector('.pg').style.animationPlayState='running'; setTimeout(kill,1400); });
}

/* ---------- 9. МОДАЛКИ ---------- */
const modalStack=[];
function openModal(cfg){
  const root=$('#modalRoot');
  root.classList.add('open');
  const bd=document.createElement('div'); bd.className='backdrop';
  const m=document.createElement('div');
  m.className='modal '+(cfg.size||'');
  m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true'); m.id='md'+modalStack.length+'-'+Date.now();
  const titleId=m.id+'-t';
  m.setAttribute('aria-labelledby',titleId);
  m.innerHTML=
    '<div class="modal-h"><div style="min-width:0"><h2 id="'+titleId+'">'+esc(cfg.title)+'</h2>'+
      (cfg.sub?'<p>'+esc(cfg.sub)+'</p>':'')+'</div>'+
      '<button class="icon-btn x" type="button" data-close aria-label="Закрыть">'+svg('x',16)+'</button></div>'+
    '<div class="modal-b">'+cfg.body+'</div>'+
    (cfg.footer?'<div class="modal-f">'+cfg.footer+'</div>':'');
  root.appendChild(bd); root.appendChild(m);
  const api={el:m,bd,close(open){
    m.classList.remove('in'); bd.classList.remove('in');
    setTimeout(()=>{ m.remove(); bd.remove(); if(!modalStack.length) root.classList.remove('open'); },240);
    if(open) open.focus?.();
  }};
  const idx=modalStack.push(api)-1;
  api.idx=idx;
  bd.addEventListener('click',()=>closeModal(api));
  m.querySelector('[data-close]').addEventListener('click',()=>closeModal(api));
  requestAnimationFrame(()=>{ bd.classList.add('in'); m.classList.add('in'); });
  setTimeout(()=>{
    const f=m.querySelector('input:not([type=hidden]),select,button.primary,button');
    (cfg.focus?m.querySelector(cfg.focus):f)?.focus();
  },90);
  cfg.onMount?.(m,api);
  return api;
}
function closeModal(api){
  const i=modalStack.indexOf(api); if(i<0) return;
  modalStack.splice(i,1); api.close();
}
function closeTopModal(){ const a=modalStack[modalStack.length-1]; if(a) closeModal(a); }
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&modalStack.length){ e.preventDefault(); closeTopModal(); return; }
  if(e.key==='Tab'&&modalStack.length){
    const m=modalStack[modalStack.length-1].el;
    const f=$$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea,[tabindex]:not([tabindex="-1"])',m).filter(x=>x.offsetParent!==null);
    if(!f.length) return;
    const first=f[0], last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
    return;
  }
  const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||'')||document.activeElement?.isContentEditable;
  if(typing) return;
  const k=e.key.toLowerCase();
  if(k==='n'&&!e.metaKey&&!e.ctrlKey){ e.preventDefault(); txModal(); }
  else if(k==='/'){ e.preventDefault(); if(ui.view!=='transactions') go('transactions'); setTimeout(()=>$('#txSearch')?.focus(),260); }
  else if(k==='t'){ toggleTheme(); }
  else if(k==='?'){ e.preventDefault(); shortcutsModal(); }
  else if(/^[1-5]$/.test(k)){ e.preventDefault(); go(VIEWS[+k-1].id); }
});
function confirmDlg(o){
  return new Promise(res=>{
    const api=openModal({
      title:o.title, sub:o.sub||'',
      body:'<div style="display:flex;gap:14px;align-items:flex-start">'+
             '<div class="confirm-ico">'+svg(o.icon||'alert',20)+'</div>'+
             '<div style="font-size:13.6px;color:var(--muted);line-height:1.55">'+o.text+'</div></div>',
      footer:'<button class="btn ghost" data-r="0">'+esc(o.cancel||'Отмена')+'</button>'+
             '<button class="btn '+(o.danger?'danger':'primary')+'" data-r="1">'+esc(o.confirm||'Подтвердить')+'</button>',
      focus:'[data-r="1"]'
    });
    api.el.querySelector('.modal-f').addEventListener('click',e=>{
      const b=e.target.closest('[data-r]'); if(!b) return;
      closeModal(api); res(b.dataset.r==='1');
    });
    api.bd.addEventListener('click',()=>res(false));
  });
}

/* ---------- 10. НАВИГАЦИЯ / ТОПБАР ---------- */
function navHTML(){
  return '<span class="nav-lab">Рабочее пространство</span>'+VIEWS.map(v=>
    '<button class="nav-item" data-act="go" data-view="'+v.id+'" aria-current="'+(ui.view===v.id?'page':'false')+'">'+
      svg(v.icon,18)+'<span>'+v.label+'</span>'+
      (v.id==='transactions'&&state.transactions.length?'<span class="nav-badge">'+state.transactions.length+'</span>':'')+
      (v.id==='goals'&&state.goals.length?'<span class="nav-badge">'+state.goals.length+'</span>':'')+
    '</button>').join('');
}
function tabsHTML(){
  return VIEWS.map(v=>'<button class="tab" data-act="go" data-view="'+v.id+'" aria-current="'+(ui.view===v.id?'page':'false')+'">'+
    svg(v.icon,20)+'<span>'+v.label+'</span></button>').join('');
}
function renderChrome(){
  $('#nav').innerHTML=navHTML();
  $('#tabbar').innerHTML=tabsHTML();
  const v=VIEWS.find(x=>x.id===ui.view);
  $('#tbTitle').innerHTML='<h1>'+v.title+'</h1><p>'+v.sub+'</p>';
  $('#tbActs').innerHTML=
    '<button class="btn ghost sm" data-act="shortcuts" aria-label="Горячие клавиши" title="Горячие клавиши (?)">'+svg('keyboard',16)+'</button>'+
    '<button class="icon-btn" data-act="toggle-theme" aria-label="Переключить тему" title="Тема (T)">'+svg(state.settings.theme==='dark'?'sun':'moon',17)+'</button>'+
    '<button class="btn primary" data-act="new-tx">'+svg('plus',16)+'<span>Добавить</span></button>';
  $('#themeBtnSide').innerHTML=svg(state.settings.theme==='dark'?'sun':'moon',16)+(state.settings.theme==='dark'?'Светлая тема':'Тёмная тема');
  document.title=v.title+' — Сальдо';
  renderGauge();
}
function renderGauge(){
  const k=curMK(), s=sums(txInMonth(k));
  const rate=s.inc>0?clamp(Math.round(s.net/s.inc*100),-100,100):null;
  const R=17, C=2*Math.PI*R, val=rate!=null?clamp(rate,0,100):0;
  const col=rate==null?'var(--dim)':rate>=25?'var(--income)':rate>=10?'var(--gold)':'var(--expense)';
  $('#gaugeCard').innerHTML=
    '<svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" style="flex:none">'+
      '<circle cx="22" cy="22" r="'+R+'" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="4"/>'+
      '<circle class="ring-fg" cx="22" cy="22" r="'+R+'" fill="none" stroke="'+col+'" stroke-width="4" stroke-linecap="round" '+
        'stroke-dasharray="'+C+'" stroke-dashoffset="'+C+'" transform="rotate(-90 22 22)" style="filter:drop-shadow(0 0 6px '+col+')"/>'+
    '</svg>'+
    '<div class="gauge-txt"><small>Норма сбережений</small><b style="color:'+col+'">'+(rate==null?'—':rate+'%')+'</b>'+
      '<span>'+mkTitle(curMK())+'</span></div>';
  requestAnimationFrame(()=>{ const rg=$('#gaugeCard .ring-fg'); if(rg) rg.style.strokeDashoffset=C*(1-val/100); });
}
function topline(){
  const t=$('#topline'), f=$('#topFill');
  t.classList.add('on'); f.style.transition='none'; f.style.transform='scaleX(0)';
  requestAnimationFrame(()=>{ f.style.transition='transform .42s cubic-bezier(.3,.9,.2,1)'; f.style.transform='scaleX(1)'; });
  setTimeout(()=>{ t.classList.remove('on'); setTimeout(()=>{f.style.transform='scaleX(0)';},260); },460);
}
function go(view){
  if(ui.view===view){ topline(); return; }
  ui.view=view;
  $$('.view').forEach(s=>s.classList.toggle('on',s.id==='v-'+view));
  if(view==='overview'&&ui.month!==curMK()) ui.month=curMK();
  renderChrome(); render();
  window.scrollTo({top:0,behavior:RM?'auto':'smooth'});
  topline();
}

/* ---------- 11. ГЛАВНЫЙ РЕНДЕР ---------- */
function render(){
  ({overview:renderOverview,transactions:renderTransactions,categories:renderCategories,goals:renderGoals,settings:renderSettings})[ui.view]();
  reveals();
}

/* ===== 11.1 ОБЗОР ===== */
function renderOverview(){
  const host=$('#v-overview');
  const root=state.transactions.length===0;
  const k=ui.month;
  const [s,e]=monthBounds(k);
  const monthTx=txInMonth(k);
  const ms=sums(monthTx);
  const balance=balanceAll();
  const prevBal=balanceBefore(s);
  const endBal=balanceBefore(shiftMK(k,1)+'-01');
  const delta=endBal-prevBal;
  const dpct=prevBal!==0?(delta/Math.abs(prevBal))*100:(delta!==0?100:0);
  const series=[];
  for(let i=7;i>=0;i--){ const mk=shiftMK(k,-i); const ss=sums(txInMonth(mk)); series.push({key:mk,income:ss.inc,expense:ss.exp,net:ss.net}); }
  const ct=catTotals(k,'expense');
  const donut=catsByType('expense').map(c=>({id:c.id,name:c.name,color:c.color,icon:c.icon,val:ct.get(c.id)||0}))
    .filter(x=>x.val>0).sort((a,b)=>b.val-a.val);
  const otherSum=Array.from(ct.entries()).filter(([id])=>!state.categories.find(c=>c.id===id)).reduce((a,[,v])=>a+v,0);
  if(otherSum>0) donut.push({id:'',name:'Без категории',color:'#64748b',icon:'box',val:otherSum});
  const donutTotal=donut.reduce((a,b)=>a+b.val,0);
  const recent=[...state.transactions].sort(byDateDesc).slice(0,5);
  const goals=state.goals.slice().sort((a,b)=>(b.saved/b.target)-(a.saved/a.target)).slice(0,3);

  host.innerHTML=
  /* HERO */
  '<div class="hero" data-reveal><div class="hero-in">'+
    '<div class="hero-top">'+
      '<div style="min-width:220px">'+
        '<div class="hero-lab">'+svg('wallet',14)+'Текущий баланс</div>'+
        '<div class="balance mono'+(balance<0?' neg':'')+'"><span id="balanceVal" data-k="bal">0</span><span class="cur">'+(CUR[state.settings.currency]||CUR.RUB).sym+'</span></div>'+
        '<div class="delta '+(delta>0?'pos':delta<0?'neg':'')+'">'+
          svg(delta>=0?'arrUR':'arrDR',14)+
          '<b class="mono">'+(isFinite(dpct)?pctFmt(dpct):'—')+'</b>'+
          '<span>за '+esc(mkTitle(k,false))+'</span></div>'+
      '</div>'+
      '<div class="spark-wrap" id="sparkWrap"></div>'+
    '</div>'+
    '<div class="hero-meta">'+
      '<div class="hm"><small>Доход за период</small><b class="i mono">'+money(ms.inc,{plus:true})+'</b></div>'+
      '<div class="hm"><small>Расход за период</small><b class="e mono">'+money(-ms.exp)+'</b></div>'+
      '<div class="hm"><small>Операций</small><b class="mono">'+monthTx.length+'</b></div>'+
      '<div class="hm"><small>Средний чек</small><b class="mono">'+(ms.exp?money(Math.round(ms.exp/(monthTx.filter(t=>t.type==='expense').length||1))):'—')+'</b></div>'+
    '</div>'+
  '</div></div>'+

  /* ПЕРИОД */
  '<div class="period" data-reveal style="margin:20px 0 14px">'+
    '<div class="period-nav">'+
      '<button class="pbtn" data-act="month" data-dir="-1" aria-label="Предыдущий месяц"'+(k>=curMK()?' disabled':'')+'>'+svg('chevL',16)+'</button>'+
      '<span class="period-label" aria-live="polite">'+esc(mkTitle(k))+'</span>'+
      '<button class="pbtn" data-act="month" data-dir="1" aria-label="Следующий месяц"'+(k>=curMK()?' disabled':'')+'>'+svg('chevR',16)+'</button>'+
    '</div>'+
    (k!==curMK()?'<button class="btn ghost sm" data-act="month-now">'+svg('clock',15)+'Вернуться к текущему</button>':'')+
    '<span class="tag" style="margin-left:auto">'+svg('cal',13)+state.transactions.length+' записей всего</span>'+
  '</div>'+

  /* СТАТ */
  '<div class="grid-stats" data-reveal>'+
    statCard('income','Доходы за месяц','trendUp','var(--income)',ms.inc, series.length?shareTxt(ms.inc,series[series.length-1].income,'рост'):null, ms.inc, Math.max(ms.inc,ms.exp))+
    statCard('expense','Расходы за месяц','trendDown','var(--expense)',ms.exp,null,ms.exp,Math.max(ms.inc,ms.exp))+
    statCard('savings','Накопления','piggy',ms.net>=0?'var(--acc-3)':'var(--expense)',ms.net,
      'норма '+(ms.inc>0?Math.round(ms.net/ms.inc*100):0)+'%', Math.max(0,ms.net), Math.max(ms.inc,1))+
  '</div>'+

  /* ГРАФИКИ */
  '<div class="charts" style="margin-top:18px" data-reveal>'+
    '<div class="card lift">'+
      '<div class="card-h"><div><h3>Доходы и расходы</h3><p>8 месяцев до '+esc(mkTitle(k,false))+'</p></div>'+
        '<div class="r chart-legend-inline"><i><span class="dot" style="--c:var(--income)"></span>Доход</i><i><span class="dot" style="--c:var(--expense)"></span>Расход</i></div></div>'+
      '<div class="card-b"><div class="chart-wrap" id="barChart"></div></div>'+
    '</div>'+
    '<div class="card lift">'+
      '<div class="card-h"><div><h3>Структура расходов</h3><p>по категориям · '+esc(mkTitle(k,false))+'</p></div></div>'+
      '<div class="card-b">'+
        (donut.length?
          '<div class="donut-holder">'+
            '<div class="donut" id="donut"></div>'+
            '<div class="donut-center" id="donutCenter"><small>Потрачено</small><b class="mono">'+compact(donutTotal)+'</b><span>'+(CUR[state.settings.currency]||CUR.RUB).sym+' · '+donut.length+' '+plural(donut.length,'категория','категории','категорий')+'</span></div>'+
          '</div>'+
          '<div class="legend" id="donutLegend"></div>'
          :emptyBlock('box','Нет расходов за месяц','Добавьте операции — диаграмма построится автоматически')+
        )+
      '</div>'+
    '</div>'+
  '</div>'+

  /* НИЖНИЙ РЯД */
  '<div class="bottom-row" style="margin-top:18px" data-reveal>'+
    '<div class="card">'+
      '<div class="card-h"><div><h3>Последние операции</h3><p>5 самых свежих записей</p></div>'+
        '<div class="r"><button class="btn ghost sm" data-act="go" data-view="transactions">Все операции'+svg('arrR',15)+'</button></div></div>'+
      (recent.length?'<div>'+recent.map(txRowHTML).join('')+'</div>':
        emptyBlock('swap','Пока нет операций','Добавьте первую — она появится здесь и в графиках',
          '<button class="btn primary sm" data-act="new-tx">'+svg('plus',15)+'Добавить операцию</button>'+
          (root?'<button class="btn ghost sm" data-act="demo">'+svg('zap',15)+'Загрузить демо</button>':'')))+
    '</div>'+
    '<div class="card">'+
      '<div class="card-h"><div><h3>Цели</h3><p>'+(state.goals.length?state.goals.length+' '+plural(state.goals.length,'цель','цели','целей'):'накопления по целям')+'</p></div>'+
        '<div class="r"><button class="icon-btn" data-act="new-goal" aria-label="Новая цель" title="Новая цель">'+svg('plus',16)+'</button></div></div>'+
      '<div class="card-b" style="display:grid;gap:14px">'+
        (goals.length?goals.map(g=>goalMiniHTML(g)).join('')+
          (state.goals.length>3?'<button class="btn ghost sm wide" data-act="go" data-view="goals">Все цели'+svg('arrR',15)+'</button>':'')
          :emptyBlock('target','Целей пока нет','Поставьте цель отпуска, резерва или покупки','<button class="btn primary sm" data-act="new-goal">'+svg('plus',15)+'Создать цель</button>'))+
      '</div>'+
    '</div>'+
  '</div>';

  /* анимация числа баланса */
  countTo($('#balanceVal'), balance, v=>money(v).replace(/\s?\S+$/,''));
  mountSpark($('#sparkWrap'), k);
  if(donut.length) mountDonut($('#donut'), donut, donutTotal);
  requestAnimationFrame(()=>mountBars($('#barChart'), series));
  if(root) setTimeout(()=>toast('Добро пожаловать в Сальдо','info',{desc:'Нажмите N, чтобы добавить операцию',duration:6000}),900);
}
function shareTxt(cur,prev,label){
  if(!prev) return 'нет данных за прошлый месяц';
  const p=((cur-prev)/Math.abs(prev))*100;
  return '<span style="color:'+(p>=0?'var(--income)':'var(--expense)')+';font-weight:700" class="mono">'+pctFmt(p)+'</span> к прошлому месяцу';
}
function statCard(id,title,icon,color,val,sub,barVal,barMax){
  const w=clamp(Math.round((barVal/(barMax||1))*100),0,100);
  return '<div class="card lift stat" style="--c:'+color+'">'+
    '<div class="stat-top"><span class="ico-chip">'+svg(icon,18)+'</span><h4>'+title+'</h4></div>'+
    '<b class="stat-val mono '+(id==='income'?'i':id==='expense'?'e':'')+'" data-stat="'+id+'">'+money(id==='savings'?val:Math.abs(val)*(id==='expense'?-1:1),{plus:id!=='expense'})+'</b>'+
    '<div class="stat-sub">'+(sub||'за '+esc(mkTitle(ui.month,false)))+'</div>'+
    '<div class="mbar"><i data-w="'+w+'"></i></div>'+
  '</div>';
}
function goalMiniHTML(g){
  const p=clamp(Math.round(g.saved/g.target*100),0,100);
  return '<button class="lg-row" data-act="go" data-view="goals" style="--c:'+(p>=100?'var(--gold)':'var(--acc-3)')+'">'+
    '<span class="ico-chip" style="width:30px;height:30px;border-radius:10px;background:color-mix(in srgb,var(--c) 15%,transparent);color:var(--c);border:1px solid color-mix(in srgb,var(--c) 30%,transparent)">'+svg(p>=100?'check':'target',15)+'</span>'+
    '<span style="min-width:0;text-align:left"><span class="lg-name">'+esc(g.name)+'</span>'+
      '<span class="prog" style="margin-top:7px"><i data-w="'+p+'"></i></span></span>'+
    '<span class="lg-amt mono">'+p+'%</span></button>';
}
function emptyBlock(icon,title,text,acts){
  return '<div class="empty">'+
    '<svg class="empty-art" viewBox="0 0 96 76" aria-hidden="true">'+
      '<rect x="6" y="12" width="84" height="52" rx="8" class="dash"/>'+
      '<path d="M6 28h84"/><circle cx="16" cy="20" r="2.4"/><circle cx="25" cy="20" r="2.4"/>'+
      '<path d="M22 46h20M52 46h22M22 54h34"/>'+
    '</svg>'+
    '<h4>'+esc(title)+'</h4><p>'+esc(text)+'</p>'+
    (acts?'<div class="empty-acts">'+acts+'</div>':'')+'</div>';
}

/* ===== СПАРКЛАЙН (баланс за 30 дней) ===== */
function mountSpark(host, k){
  const end=k===curMK()?todayISO():monthBounds(k)[1];
  const start=new Date(parseISO(end)); start.setDate(start.getDate()-29);
  const pts=[]; let run=balanceBefore(isoOf(start));
  const days=[]; for(let i=0;i<30;i++){ const d=new Date(start); d.setDate(start.getDate()+i); days.push(d); }
  const byDay=new Map();
  for(const t of state.transactions){ if(t.date>=isoOf(start)&&t.date<=end) byDay.set(t.date,(byDay.get(t.date)||0)+(t.type==='income'?t.amount:-t.amount)); }
  for(const d of days){ const key=isoOf(d); run+=(byDay.get(key)||0); pts.push(run); }
  const W=320,H=88,P=6;
  const min=Math.min(...pts), max=Math.max(...pts), span=(max-min)||1;
  const xy=pts.map((v,i)=>({x:P+i*((W-P*2)/(pts.length-1)), y:H-P-((v-min)/span)*(H-P*2)}));
  const line=smooth(xy);
  const area=line+' L'+xy[xy.length-1].x+','+H+' L'+xy[0].x+','+H+' Z';
  const last=xy[xy.length-1];
  host.innerHTML='<svg viewBox="0 0 '+W+' '+H+' " preserveAspectRatio="none" aria-hidden="true" role="img">'+
    '<defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">'+
      '<stop offset="0" style="stop-color:var(--acc-3);stop-opacity:.38"/><stop offset="1" style="stop-color:var(--acc-3);stop-opacity:0"/></linearGradient></defs>'+
    '<path class="spark-area" d="'+area+'"/>'+
    '<path class="spark-line" d="'+line+'" vector-effect="non-scaling-stroke"/>'+
    '<circle class="spark-pulse" cx="'+last.x+'" cy="'+last.y+'" r="3" vector-effect="non-scaling-stroke"/>'+
    '<circle class="spark-dot" cx="'+last.x+'" cy="'+last.y+'" r="3.2"/></svg>'+
    '<div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--dim);margin-top:6px;font-family:var(--mono)">'+
      '<span>−30 дней</span><span>динамика баланса</span></div>';
  const p=host.querySelector('.spark-line');
  if(p&&!RM){ try{ const L=p.getTotalLength(); p.style.strokeDasharray=L; p.style.strokeDashoffset=L;
    requestAnimationFrame(()=>{ p.style.transition='stroke-dashoffset 1.3s cubic-bezier(.3,.9,.2,1)'; p.style.strokeDashoffset=0; }); }catch(e){} }
  host.classList.add('drawn');
}
function smooth(pt){
  if(pt.length<2) return 'M'+(pt[0]?.x||0)+','+(pt[0]?.y||0);
  let d='M'+pt[0].x+','+pt[0].y;
  for(let i=0;i<pt.length-1;i++){
    const p0=pt[i-1]||pt[i], p1=pt[i], p2=pt[i+1], p3=pt[i+2]||p2;
    const c1x=p1.x+(p2.x-p0.x)/6*.75, c1y=p1.y+(p2.y-p0.y)/6*.75;
    const c2x=p2.x-(p3.x-p1.x)/6*.75, c2y=p2.y-(p3.y-p1.y)/6*.75;
    d+=' C'+c1x.toFixed(1)+','+c1y.toFixed(1)+' '+c2x.toFixed(1)+','+c2y.toFixed(1)+' '+p2.x.toFixed(1)+','+p2.y.toFixed(1);
  }
  return d;
}

/* ===== СТОЛБЧАТЫЙ ГРАФИК ===== */
function mountBars(host, series){
  if(!host) return;
  const W=Math.max(320,host.clientWidth||600), H=W<560?206:248;
  const PL=W<520?38:52, PR=6, PT=14, PB=30;
  const pw=W-PL-PR, ph=H-PT-PB;
  const max=niceMax(Math.max(1,...series.flatMap(s=>[s.income,s.expense])));
  const gw=pw/series.length;
  const bw=clamp(gw*0.22,7,20), gap=Math.min(6,bw*0.4);
  let g='';
  for(let i=0;i<=4;i++){ const y=PT+ph-(ph*i/4);
    g+='<line class="grid-line" x1="'+PL+'" x2="'+(W-PR)+'" y1="'+y.toFixed(1)+'" y2="'+y.toFixed(1)+'"/>'+
       '<text class="axis-lab" x="'+(PL-8)+'" y="'+(y+3.5).toFixed(1)+'" text-anchor="end">'+compact(max*i/4)+'</text>'; }
  series.forEach((s,i)=>{
    const cx=PL+gw*i+gw/2;
    const h1=Math.max(2,(s.income/max)*ph), h2=Math.max(2,(s.expense/max)*ph);
    const y1=PT+ph-h1, y2=PT+ph-h2;
    g+='<g class="g-group" data-i="'+i+'">'+
       '<rect class="hit" x="'+(PL+gw*i)+'" y="'+PT+'" width="'+gw+'" height="'+ph+'"/>'+
       (s.income>0?'<path class="bar" style="transition-delay:'+(i*45)+'ms" fill="url(#gInc)" d="'+topBar(cx-bw-gap/2,y1,bw,h1,Math.min(5,bw/2))+'"/>':stub(cx-bw-gap/2,y1,bw))+
       (s.expense>0?'<path class="bar" style="transition-delay:'+(i*45+70)+'ms" fill="url(#gExp)" d="'+topBar(cx+gap/2,y2,bw,h2,Math.min(5,bw/2))+'"/>':stub(cx+gap/2,y2,bw))+
       '<text class="axis-lab mon" x="'+cx.toFixed(1)+'" y="'+(H-9)+'" text-anchor="middle">'+esc(mkShort(s.key))+'</text>'+
       '</g>';
  });
  host.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" height="'+H+'" role="img" aria-label="Доходы и расходы по месяцам">'+
    '<defs>'+
      '<linearGradient id="gInc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--income)"/><stop offset="1" style="stop-color:var(--income);stop-opacity:.35"/></linearGradient>'+
      '<linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--expense)"/><stop offset="1" style="stop-color:var(--expense);stop-opacity:.32"/></linearGradient>'+
    '</defs>'+
    '<line class="grid-line" x1="'+PL+'" x2="'+(W-PR)+'" y1="'+(PT+ph)+'" y2="'+(PT+ph)+'" style="stroke:var(--line-2)"/>'+g+'</svg>'+
    '<div class="tip" id="barTip"></div>';
  requestAnimationFrame(()=>host.parentElement.classList.add('drawn')||host.classList.add('drawn'));
  host.classList.add('drawn');
  const tip=host.querySelector('#barTip'), svgEl=host.querySelector('svg');
  host.querySelectorAll('.g-group').forEach(grp=>{
    const s=series[+grp.dataset.i];
    function show(){
      host.classList.add('dim'); grp.classList.add('hot');
      tip.innerHTML='<b>'+esc(mkTitle(s.key))+'</b>'+
        '<div class="tr"><span class="dot" style="--c:var(--income)"></span>Доход<b>'+money(s.income)+'</b></div>'+
        '<div class="tr"><span class="dot" style="--c:var(--expense)"></span>Расход<b>'+money(s.expense)+'</b></div>'+
        '<div class="tr" style="border-top:1px solid var(--line);margin-top:6px;padding-top:6px"><span class="dot" style="--c:var(--acc-3)"></span>Итог<b style="color:'+(s.net>=0?'var(--income)':'var(--expense)')+'">'+money(s.net,{plus:true})+'</b></div>';
      const r=svgEl.getBoundingClientRect(), hr=grp.querySelector('.hit').getBoundingClientRect();
      tip.style.left=(hr.left-r.left+hr.width/2)+'px';
      tip.style.top=(hr.top-r.top)+'px';
      tip.classList.add('on');
    }
    function hide(){ host.classList.remove('dim'); grp.classList.remove('hot'); tip.classList.remove('on'); }
    grp.addEventListener('mouseenter',show); grp.addEventListener('mousemove',show);
    grp.addEventListener('mouseleave',hide);
    grp.addEventListener('focus',show); grp.addEventListener('blur',hide);
    grp.setAttribute('tabindex','0'); grp.setAttribute('role','button');
    grp.setAttribute('aria-label',mkTitle(s.key)+': доход '+money(s.income)+', расход '+money(s.expense));
  });
}
const stub=(x,y,w)=>'<rect class="zero-stub" x="'+x+'" y="'+(y+w*0)+'" width="'+w+'" height="2" rx="1"/>';
function topBar(x,y,w,h,r){
  r=Math.min(r,w/2,h);
  return 'M'+x+','+(y+h)+' L'+x+','+(y+r)+' Q'+x+','+y+' '+(x+r)+','+y+' L'+(x+w-r)+','+y+' Q'+(x+w)+','+y+' '+(x+w)+','+(y+r)+' L'+(x+w)+','+(y+h)+' Z';
}

/* ===== ДОНАТ ===== */
function mountDonut(host, items, total){
  if(!host) return;
  const R=62, SW=20, C=2*Math.PI*R, cx=80, cy=80;
  let off=0, segs='';
  items.forEach((it,i)=>{
    const frac=it.val/(total||1);
    const len=Math.max(0,frac*C-2.5);
    segs+='<circle class="donut-seg" data-i="'+i+'" cx="'+cx+'" cy="'+cy+'" r="'+R+'" stroke="'+it.color+'" stroke-width="'+SW+'" '+
      'fill="none" stroke-dasharray="0 '+C+'" data-da="'+len+' '+(C-len)+'" transform="rotate('+(-90+off*360)+' '+cx+' '+cy+')" '+
      'style="filter:drop-shadow(0 0 8px '+it.color+'55)"/>';
    off+=frac;
  });
  host.innerHTML='<svg viewBox="0 0 160 160" role="img" aria-label="Расходы по категориям">'+
    '<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="none" stroke="rgba(255,255,255,.05)" stroke-width="'+SW+'"/>'+segs+'</svg>';
  requestAnimationFrame(()=>host.querySelectorAll('.donut-seg').forEach((s,i)=>{
    setTimeout(()=>{ s.style.strokeDasharray=s.dataset.da; }, RM?0:i*70);
  }));
  const legend=$('#donutLegend'), center=$('#donutCenter');
  if(legend) legend.innerHTML=items.map((it,i)=>{
    const p=Math.round(it.val/(total||1)*100);
    return '<button class="lg-row" data-act="cat-drill" data-cat="'+it.id+'" data-i="'+i+'">'+
      '<span class="dot" style="--c:'+it.color+'"></span>'+
      '<span class="lg-name">'+esc(it.name)+'</span>'+
      '<span class="lg-amt mono">'+money(it.val)+'</span>'+
      '<span class="lg-pct">'+p+'%</span></button>';
  }).join('');
  const svgEl=host.querySelector('svg');
  function hot(i){
    svgEl.classList.add('hov'); const d=host.querySelector('.donut');
    host.classList.add('hov');
    svgEl.querySelectorAll('.donut-seg').forEach(s=>s.classList.toggle('hot',+s.dataset.i===i));
    const it=items[i]; if(!it) return;
    center.innerHTML='<small>'+esc(it.name)+'</small><b class="mono">'+money(it.val)+'</b><span>'+Math.round(it.val/(total||1)*100)+'% от расходов</span>';
  }
  function cold(){
    host.classList.remove('hov');
    svgEl.querySelectorAll('.donut-seg').forEach(s=>s.classList.remove('hot'));
    center.innerHTML='<small>Потрачено</small><b class="mono">'+compact(total)+'</b><span>'+(CUR[state.settings.currency]||CUR.RUB).sym+' · '+items.length+' '+plural(items.length,'категория','категории','категорий')+'</span>';
  }
  host.addEventListener('mouseover',e=>{ const s=e.target.closest('.donut-seg'); if(s) hot(+s.dataset.i); });
  host.addEventListener('mouseout',e=>{ if(!e.relatedTarget||!e.relatedTarget.closest?.('.donut-seg')) cold(); });
  legend?.addEventListener('mouseover',e=>{ const r=e.target.closest('.lg-row'); if(r) hot(+r.dataset.i); });
  legend?.addEventListener('mouseout',cold);
  legend?.addEventListener('focusin',e=>{ const r=e.target.closest('.lg-row'); if(r) hot(+r.dataset.i); });
  legend?.addEventListener('focusout',cold);
}

/* ===== 11.2 ТРАНЗАКЦИИ ===== */
function filteredTx(){
  const f=ui.tx;
  let list=state.transactions.filter(t=>{
    if(f.type!=='all'&&t.type!==f.type) return false;
    if(f.cat!=='all'&&t.categoryId!==f.cat) return false;
    if(!inPeriod(t,f.period)) return false;
    if(f.q){ const q=f.q.toLowerCase();
      if(!String(t.comment).toLowerCase().includes(q)&&!txCat(t).name.toLowerCase().includes(q)) return false; }
    return true;
  });
  list.sort((a,b)=> f.sort==='desc'?byDateDesc(a,b):f.sort==='asc'?byDateDesc(b,a):(a.type==='income'?-1:1)-(b.type==='income'?-1:1)||b.amount-a.amount);
  return list;
}
function txRowHTML(t,opts={}){
  const c=txCat(t), inc=t.type==='income';
  return '<div class="tx" data-id="'+t.id+'" role="listitem">'+
    '<span class="ico-chip" style="--c:'+c.color+';width:38px;height:38px;border-radius:12px">'+svg(c.icon,17)+'</span>'+
    '<div style="min-width:0">'+
      '<div class="tx-cat">'+esc(c.name)+'</div>'+
      (t.comment?'<div class="tx-note">'+esc(t.comment)+'</div>':'')+
      (opts.hideDate?'':'<div class="tx-date">'+esc(shortDate(t.date))+(relativeDay(t.date)?' · '+esc(relativeDay(t.date)):'')+'</div>')+
    '</div>'+
    '<div class="tx-amt mono '+(inc?'i':'e')+'">'+money(inc?t.amount:-t.amount,{plus:inc})+'</div>'+
    '<div class="tx-acts">'+
      '<button class="act" data-act="tx-edit" data-id="'+t.id+'" aria-label="Редактировать операцию">'+svg('pencil',15)+'</button>'+
      '<button class="act del" data-act="tx-del" data-id="'+t.id+'" aria-label="Удалить операцию">'+svg('trash',15)+'</button>'+
    '</div>'+
  '</div>';
}
function renderTransactions(){
  const host=$('#v-transactions'), f=ui.tx;
  const list=filteredTx(), shownList=list.slice(0,f.limit);
  const s=sums(list);
  const months=allMonths();
  const periodOpts=[
    ['week','Текущая неделя'],['month','Текущий месяц'],['prev','Прошлый месяц'],['all','Всё время'],
    ...months.filter(m=>m!==curMK()).map(m=>[m,mkTitle(m)])
  ];
  const groups=[];
  let cur=null;
  for(const t of shownList){
    if(!cur||cur.date!==t.date){ cur={date:t.date,items:[],sum:0}; groups.push(cur); }
    cur.items.push(t); cur.sum+= t.type==='income'?t.amount:-t.amount;
  }
  host.innerHTML=
  '<div class="card" data-reveal>'+
    '<div class="card-h"><div><h3>Фильтры и поиск</h3><p>'+(list.length)+' '+plural(list.length,'операция','операции','операций')+' в выборке</p></div>'+
      '<div class="r">'+
        '<button class="btn ghost sm" data-act="csv">'+svg('download',15)+'CSV</button>'+
        '<button class="btn primary sm" data-act="new-tx">'+svg('plus',15)+'Добавить<span style="opacity:.6;font-family:var(--mono);font-size:11px;margin-left:2px">N</span></button>'+
      '</div></div>'+
    '<div class="filters">'+
      '<div class="f-row">'+
        '<div class="search">'+svg('search',16)+'<input class="inp" id="txSearch" type="search" placeholder="Поиск по комментарию или категории…  ( / )" value="'+esc(f.q)+'" aria-label="Поиск по транзакциям"></div>'+
        '<div class="seg" role="group" aria-label="Тип операций" data-seg="type">'+
          '<span class="seg-thumb"></span>'+
          [['all','Все'],['income','Доходы'],['expense','Расходы']].map(([v,l],i)=>
            '<button class="seg-btn" data-act="f-type" data-v="'+v+'" aria-pressed="'+(f.type===v)+'">'+l+'</button>').join('')+
        '</div>'+
      '</div>'+
      '<div class="f-row">'+
        '<div class="sel-wrap"><select class="inp" id="fCat" aria-label="Категория">'+
          '<option value="all">Все категории</option>'+
          ['expense','income'].map(tp=>'<optgroup label="'+(tp==='expense'?'Расходы':'Доходы')+'">'+
            catsByType(tp).map(c=>'<option value="'+c.id+'"'+(f.cat===c.id?' selected':'')+'>'+esc(c.name)+'</option>').join('')+'</optgroup>').join('')+
        '</select>'+svg('chevD',15)+'</div>'+
        '<div class="sel-wrap"><select class="inp" id="fPeriod" aria-label="Период">'+
          periodOpts.map(([v,l])=>'<option value="'+v+'"'+(f.period===v?' selected':'')+'>'+esc(l)+'</option>').join('')+
        '</select>'+svg('chevD',15)+'</div>'+
        '<div class="sel-wrap"><select class="inp" id="fSort" aria-label="Сортировка">'+
          [['desc','Сначала новые'],['asc','Сначала старые'],['amount','По сумме'] ].map(([v,l])=>'<option value="'+v+'"'+(f.sort===v?' selected':'')+'>'+l+'</option>').join('')+
        '</select>'+svg('chevD',15)+'</div>'+
        ((f.type!=='all'||f.cat!=='all'||f.q||f.period!=='month')?'<button class="btn ghost sm" data-act="f-clear">'+svg('x',15)+'Сбросить</button>':'')+
      '</div>'+
    '</div>'+
    '<div class="sum-strip">'+
      '<div>Доход <b style="color:var(--income)">'+money(s.inc,{plus:true})+'</b></div>'+
      '<div>Расход <b style="color:var(--expense)">'+money(-s.exp)+'</b></div>'+
      '<div>Итог <b style="color:'+(s.net>=0?'var(--income)':'var(--expense)')+'">'+money(s.net,{plus:true})+'</b></div>'+
      '<div style="margin-left:auto">Записей <b>'+list.length+'</b>'+(list.length>shownList.length?' из '+shownList.length:'')+'</div>'+
    '</div>'+
  '</div>'+

  '<div class="card" style="margin-top:18px" data-reveal>'+
    '<div class="card-h"><div><h3>Список операций</h3><p>сгруппировано по дням</p></div></div>'+
    (groups.length?
      groups.map(g=>'<div class="tx-group">'+
        '<div class="day-h"><b>'+esc(dayTitle(g.date).d)+'</b><small>'+esc(dayTitle(g.date).w)+'</small>'+
          (dayTitle(g.date).rel?'<small style="color:var(--acc-3)">'+esc(dayTitle(g.date).rel)+'</small>':'')+
          '<span class="sum">'+(g.sum>=0?'+':'')+money(g.sum).replace(/^\S/,'')+'</span></div>'+
        '<div role="list">'+g.items.map(t=>txRowHTML(t,{hideDate:true})).join('')+'</div>'+
      '</div>').join('')+
      (list.length>f.limit?'<div style="padding:16px;display:grid;place-items:center"><button class="btn ghost" data-act="more">'+svg('chevD',15)+'Показать ещё '+Math.min(40,list.length-f.limit)+'</button></div>':'')
      :emptyBlock('filter','Ничего не найдено','Измените фильтры или добавьте новую операцию',
        '<button class="btn primary sm" data-act="new-tx">'+svg('plus',15)+'Добавить операцию</button>'+
        '<button class="btn ghost sm" data-act="f-clear">'+svg('refresh',15)+'Сбросить фильтры</button>'))+
  '</div>';
  positionSegs(host);
  const inp=$('#txSearch');
  if(inp){ inp.addEventListener('input',debounce(e=>{ ui.tx.q=e.target.value.trim(); const pos=inp.selectionStart; renderTransactions(); const n=$('#txSearch'); n.focus(); n.setSelectionRange(pos,pos); },170)); }
  $('#fCat')?.addEventListener('change',e=>{ ui.tx.cat=e.target.value; renderTransactions(); });
  $('#fPeriod')?.addEventListener('change',e=>{ ui.tx.period=e.target.value; renderTransactions(); });
  $('#fSort')?.addEventListener('change',e=>{ ui.tx.sort=e.target.value; renderTransactions(); });
}
function debounce(fn,ms){ let t; return function(...a){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,a),ms); }; }
function positionSegs(root){
  $$('.seg',root||document).forEach(seg=>{
    const btns=$$('.seg-btn',seg), thumb=seg.querySelector('.seg-thumb');
    if(!thumb) return;
    const i=Math.max(0,btns.findIndex(b=>b.getAttribute('aria-pressed')==='true'));
    const b=btns[i]; if(!b) return;
    thumb.style.width=b.offsetWidth+'px';
    thumb.style.transform='translateX('+(b.offsetLeft-3)+'px)';
  });
}
window.addEventListener('resize',debounce(()=>{ positionSegs(); if(ui.view==='overview') mountBars($('#barChart'),overviewSeries()); else if(ui.view==='transactions') positionSegs(); },220));
function overviewSeries(){
  const out=[]; for(let i=7;i>=0;i--){ const mk=shiftMK(ui.month,-i); const s=sums(txInMonth(mk)); out.push({key:mk,income:s.inc,expense:s.exp,net:s.net}); } return out;
}

/* ===== 11.3 КАТЕГОРИИ ===== */
function renderCategories(){
  const host=$('#v-categories');
  const k=ui.month, tt=catTotals(k,'expense'), ti=catTotals(k,'income');
  const txCount=new Map(); state.transactions.forEach(t=>txCount.set(t.categoryId,(txCount.get(t.categoryId)||0)+1));
  const col=(type)=>{
    const cats=catsByType(type), map=type==='expense'?tt:ti;
    const total=Array.from(map.values()).reduce((a,b)=>a+b,0);
    const max=Math.max(1,...cats.map(c=>map.get(c.id)||0));
    return '<div class="card col-'+type+'" data-reveal>'+
      '<div class="card-h"><span class="ico-chip" style="--c:'+(type==='expense'?'var(--expense)':'var(--income)')+'">'+svg(type==='expense'?'trendDown':'trendUp',17)+'</span>'+
        '<div><h3>'+(type==='expense'?'Расходы':'Доходы')+'</h3><p>'+cats.length+' '+plural(cats.length,'категория','категории','категорий')+' · '+money(total)+' за '+esc(mkTitle(k,false))+'</p></div>'+
        '<div class="r"><button class="btn ghost sm" data-act="new-cat" data-type="'+type+'">'+svg('plus',15)+'Новая</button></div></div>'+
      (cats.length? '<div>'+cats.map(c=>{
          const v=map.get(c.id)||0, n=txCount.get(c.id)||0;
          return '<div class="cat-row" data-id="'+c.id+'" style="--c:'+c.color+'">'+
            '<span class="ico-chip" style="width:36px;height:36px;border-radius:11px">'+svg(c.icon,17)+'</span>'+
            '<div style="min-width:0"><div class="nm">'+esc(c.name)+'</div>'+
              '<div class="sub"><span>'+n+' '+plural(n,'операция','операции','операций')+'</span>'+
                (v&&total?'<span>· '+Math.round(v/total*100)+'% потока</span>':'')+'</div>'+
              '<div class="cat-share"><i data-w="'+Math.round(v/max*100)+'"></i></div></div>'+
            '<div style="display:flex;align-items:center;gap:6px">'+
              '<div class="cat-sum mono" style="color:'+(v?'var(--txt)':'var(--dim)')+'">'+(v?money(v):'—')+'</div>'+
              '<div class="cat-acts">'+
                '<button class="act" data-act="edit-cat" data-id="'+c.id+'" aria-label="Редактировать категорию '+esc(c.name)+'">'+svg('pencil',15)+'</button>'+
                '<button class="act del" data-act="del-cat" data-id="'+c.id+'" aria-label="Удалить категорию '+esc(c.name)+'"'+(n?' data-used="1"':'')+'>'+svg('trash',15)+'</button>'+
              '</div></div>'+
          '</div>';
        }).join('')+'</div>'
        :emptyBlock('grid','Категорий нет','Добавьте первую категорию для этого типа','<button class="btn primary sm" data-act="new-cat" data-type="'+type+'">'+svg('plus',15)+'Добавить</button>'))+
    '</div>';
  };
  host.innerHTML=
    '<div class="period" data-reveal style="margin-bottom:16px">'+
      '<div class="seg cat-tabs" style="display:none" role="group" aria-label="Тип категорий" data-seg="cattab">'+
        '<span class="seg-thumb"></span>'+
        '<button class="seg-btn" data-act="cat-tab" data-v="expense" aria-pressed="'+(ui.catTab==='expense')+'">Расходы</button>'+
        '<button class="seg-btn" data-act="cat-tab" data-v="income" aria-pressed="'+(ui.catTab==='income')+'">Доходы</button>'+
      '</div>'+
      '<span class="tag">'+svg('layers',13)+state.categories.length+' всего категорий</span>'+
      '<span class="tag">'+svg('cal',13)+esc(mkTitle(k))+'</span>'+
    '</div>'+
    '<div class="cat-cols" data-tab="'+ui.catTab+'">'+col('expense')+col('income')+'</div>';
  positionSegs(host);
}

/* ===== 11.4 ЦЕЛИ ===== */
function renderGoals(){
  const host=$('#v-goals');
  const gs=state.goals.slice().sort((a,b)=>(b.saved/b.target)-(a.saved/a.target));
  const totSaved=gs.reduce((a,g)=>a+g.saved,0), totTarget=gs.reduce((a,g)=>a+g.target,0);
  const done=gs.filter(g=>g.saved>=g.target).length;
  host.innerHTML=
  '<div class="grid-stats" data-reveal style="grid-template-columns:repeat(auto-fit,minmax(210px,1fr))">'+
    statCard('savings','Всего отложено','piggy','var(--acc-3)',totSaved,'из цели '+money(totTarget),totSaved,Math.max(totTarget,1))+
    statCard('income','Достигнуто целей','checkCircle','var(--gold)',done,gs.length?done+' из '+gs.length+' '+plural(gs.length,'цели','целей','целей'):'целей пока нет',done,Math.max(gs.length,1))+
  '</div>'+
  '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:18px 0 14px" data-reveal>'+
    '<h3 style="font-size:15px;font-weight:800;letter-spacing:-.02em">Все цели</h3>'+
    '<span class="tag">'+svg('target',13)+gs.length+'</span>'+
    '<button class="btn primary sm" data-act="new-goal" style="margin-left:auto">'+svg('plus',15)+'Новая цель</button>'+
  '</div>'+
  (gs.length?'<div class="goal-grid" data-reveal>'+gs.map(goalCardHTML).join('')+'</div>'
    :'<div class="card" data-reveal>'+emptyBlock('target','Пока нет целей','Поставьте цель — накопления на отпуск, резерв, техника. Прогресс обновляется вручную или пополнением.','<button class="btn primary sm" data-act="new-goal">'+svg('plus',15)+'Создать цель</button>')+'</div>');
  requestAnimationFrame(()=>$$('.prog i,.mbar i,.cat-share i',host).forEach(el=>el.style.width=(el.dataset.w||0)+'%'));
}
function goalCardHTML(g){
  const p=clamp(g.saved/g.target*100,0,100), done=g.saved>=g.target;
  const dl=g.deadline?parseISO(g.deadline):null;
  const days=dl?Math.round((dl-new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()))/86400000):null;
  const remain=Math.max(0,g.target-g.saved);
  let dlChip='';
  if(dl){
    const cls=days<0?'late':days<=30?'soon':'';
    const txt=days<0?'просрочено на '+daysWord(-days):days===0?'дедлайн сегодня':daysWord(days);
    dlChip='<span class="dl '+cls+'">'+svg('cal',13)+esc(txt)+'</span>';
  }
  const speed=days&&days>0&&!done?remain/days:0;
  return '<div class="card lift goal'+(done?' done':'')+'" data-id="'+g.id+'" style="--c:'+(done?'var(--gold)':'var(--acc-3)')+'">'+
    '<div class="goal-h">'+
      '<span class="ico-chip" style="--c:'+(done?'var(--gold)':'var(--acc-3)')+'">'+svg(done?'checkCircle':'flag',18)+'</span>'+
      '<div style="min-width:0"><h4>'+esc(g.name)+'</h4>'+
        '<div style="font-size:12px;color:var(--muted);margin-top:2px">цель '+money(g.target)+'</div></div>'+
      (done?'<span class="goal-badge" title="Цель достигнута">'+svg('check',16)+'</span>':'')+
    '</div>'+
    '<div class="goal-nums"><b class="mono" style="color:'+(done?'var(--gold)':'inherit')+'">'+money(g.saved)+'</b>'+
      '<span>'+Math.round(p)+'%</span>'+
      (done?'<span style="color:var(--gold)">цель закрыта</span>':'<span>осталось '+money(remain)+'</span>')+'</div>'+
    '<div><div class="prog"><i data-w="'+p+'"></i></div>'+
      '<div class="prog-t"><span>'+(done?money(g.saved):money(g.saved)+' / '+money(g.target))+'</span><span>'+Math.round(p)+'%</span></div></div>'+
    '<div class="goal-foot">'+dlChip+
      (speed>0&&!done?'<span class="dl">'+svg('zap',13)+'по '+compact(speed)+' в день</span>':'')+
      '<div class="goal-acts">'+
        '<button class="btn ghost sm" data-act="deposit" data-id="'+g.id+'">'+svg('plus',14)+'Пополнить</button>'+
        '<button class="act" data-act="edit-goal" data-id="'+g.id+'" aria-label="Редактировать цель">'+svg('pencil',15)+'</button>'+
        '<button class="act del" data-act="del-goal" data-id="'+g.id+'" aria-label="Удалить цель">'+svg('trash',15)+'</button>'+
      '</div></div>'+
  '</div>';
}

/* ===== 11.5 НАСТРОЙКИ ===== */
function renderSettings(){
  const host=$('#v-settings');
  const bytes=storageBytes(), kb=(bytes/1024).toFixed(1);
  const used=clamp(bytes/(5*1024*1024)*100,0.4,100);
  host.innerHTML=
  '<div class="set-grid" data-reveal>'+
    '<div class="card">'+
      '<div class="card-h"><span class="ico-chip" style="--c:var(--acc-3)">'+svg('sliders',17)+'</span><div><h3>Валюта и период</h3><p>Влияет на формат чисел и границы недель</p></div></div>'+
      '<div class="set-row"><div class="t"><b>Валюта</b><span>Символ и форматирование сумм</span></div>'+
        '<div class="c"><div class="sel-wrap" style="min-width:190px"><select class="inp" id="setCur" aria-label="Валюта">'+
          Object.entries(CUR).map(([c,v])=>'<option value="'+c+'"'+(state.settings.currency===c?' selected':'')+'>'+v.name+' ('+v.sym+')</option>').join('')+
        '</select>'+svg('chevD',15)+'</div></div></div>'+
      '<div class="set-row"><div class="t"><b>Первый день недели</b><span>Используется в фильтре «Текущая неделя»</span></div>'+
        '<div class="c"><div class="seg" data-seg="ws" role="group" aria-label="Первый день недели"><span class="seg-thumb"></span>'+
          [[1,'Воскресенье'],[0,'Понедельник']].map(([v,l])=>'<button class="seg-btn" data-act="weekstart" data-v="'+v+'" aria-pressed="'+(state.settings.weekStart===+v)+'">'+l+'</button>').join('')+
        '</div></div></div>'+
      '<div class="set-row"><div class="t"><b>Оформление</b><span>Тёмная тема включена по умолчанию</span></div>'+
        '<div class="c"><div class="seg" data-seg="th" role="group" aria-label="Тема"><span class="seg-thumb"></span>'+
          [['dark','Тёмная'],['light','Светлая']].map(([v,l])=>'<button class="seg-btn" data-act="set-theme" data-v="'+v+'" aria-pressed="'+(state.settings.theme===v)+'">'+svg(v==='dark'?'moon':'sun',14)+l+'</button>').join('')+
        '</div></div></div>'+
    '</div>'+

    '<div class="card">'+
      '<div class="card-h"><span class="ico-chip" style="--c:var(--income)">'+svg('db',17)+'</span><div><h3>Данные</h3><span></span><p>Всё хранится локально в браузере</p></div></div>'+
      '<div class="set-row"><div class="t"><b>Экспорт</b><span>JSON со всеми записями или CSV для таблиц</span></div>'+
        '<div class="c"><button class="btn ghost sm" data-act="export">'+svg('download',15)+'JSON</button>'+
        '<button class="btn ghost sm" data-act="csv">'+svg('download',15)+'CSV</button></div></div>'+
      '<div class="set-row"><div class="t"><b>Импорт</b><span>Заменит текущие данные файлом JSON</span></div>'+
        '<div class="c"><button class="btn ghost sm" data-act="import">'+svg('upload',15)+'Загрузить файл</button></div></div>'+
      '<div class="set-row"><div class="t"><b>Демо-данные</b><span>6 месяцев операций и 3 цели для примеров графиков</span></div>'+
        '<div class="c"><button class="btn ghost sm" data-act="demo">'+svg('zap',15)+'Загрузить</button></div></div>'+
      '<div class="set-row"><div class="t"><b>Хранилище</b><span>'+state.transactions.length+' операций · '+state.goals.length+' целей · '+kb+NBSP+'КБ</span>'+
        '<div class="store-bar"><i style="width:'+used.toFixed(2)+'%"></i></div></div></div>'+
    '</div>'+

    '<div class="card danger-card">'+
      '<div class="card-h"><span class="ico-chip" style="--c:var(--expense)">'+svg('alert',17)+'</span><div><h3>Опасная зона</h3><p>Действия необратимы без экспорта</p></div></div>'+
      '<div class="set-row"><div class="t"><b>Удалить все транзакции</b><span>Категории, цели и настройки останутся</span></div>'+
        '<div class="c"><button class="btn ghost sm" data-act="wipe-tx">'+svg('trash',15)+'Очистить</button></div></div>'+
      '<div class="set-row"><div class="t"><b>Сбросить все данные</b><span>Полный возврат к заводскому состоянию</span></div>'+
        '<div class="c"><button class="btn danger sm" data-act="reset">'+svg('refresh',15)+'Сбросить всё</button></div></div>'+
    '</div>'+

    '<div class="card">'+
      '<div class="card-h"><span class="ico-chip" style="--c:var(--acc-3)">'+svg('keyboard',17)+'</span><div><h3>Горячие клавиши</h3><p>Работают, когда фокус не в поле ввода</p></div></div>'+
      '<div class="card-b"><div class="kbd-list">'+SHORTCUTS.map(s=>'<div class="kbd-row"><span>'+s[1]+'</span><span class="k">'+s[0].map(k=>'<kbd>'+k+'</kbd>').join('')+'</span></div>').join('')+'</div></div>'+
    '</div>'+

    '<div class="card">'+
      '<div class="card-h"><span class="ico-chip" style="--c:var(--acc-3)">'+svg('wallet',17)+'</span><div><h3>О Сальдо</h3><p>Локальный трекер без серверов и аккаунтов</p></div></div>'+
      '<div class="card-b" style="display:grid;gap:12px;font-size:13px;color:var(--muted);line-height:1.6">'+
        '<div>Версия <b class="mono" style="color:var(--txt)">1.0.0</b> · схема данных <b class="mono" style="color:var(--txt)">v1</b></div>'+
        '<div>Ключ хранилища: <span class="mono" style="color:var(--txt)">'+LS+'</span></div>'+
        '<div>Без фреймворков, без сети, без аналитики. Графики собраны на чистом SVG.</div>'+
      '</div>'+
    '</div>'+
  '</div>';
  positionSegs(host);
  $('#setCur').addEventListener('change',e=>{
    state.settings.currency=e.target.value; shown.clear(); save(); renderChrome(); render();
    toast('Валюта изменена','ok',{desc:'Формат чисел обновлён: '+(CUR[e.target.value]||{}).sym});
  });
}
const SHORTCUTS=[
  [['N'],'Новая транзакция'],[['/'],'Поиск по операциям'],[['1'],['…'],['5'],'Переход между разделами'],
  [['T'],'Светлая / тёмная тема'],[['?'],'Этот список'],['Esc'],'Закрыть окно'
];
function shortcutsModal(){
  openModal({title:'Горячие клавиши',sub:'Быстрые действия без мыши',
    body:'<div class="kbd-list">'+SHORTCUTS.map(s=>'<div class="kbd-row"><span>'+s[1]+'</span><span class="k">'+s[0].map(k=>'<kbd>'+k+'</kbd>').join('')+'</span></div>').join('')+'</div>',
    footer:'<button class="btn primary" data-close>Понятно</button>'});
}

/* ---------- 12. ФОРМЫ: ТРАНЗАКЦИЯ ---------- */
let draft={};
function txModal(id){
  const t=id?state.transactions.find(x=>x.id===id):null;
  draft={ type:t?t.type:'expense', cat:t?t.categoryId:'', date:t?t.date:todayISO() };
  const cats=catsByType(draft.type);
  openModal({
    title:t?'Редактирование операции':'Новая операция',
    sub:t?'Изменения сохранятся сразу':'Сумма, категория и дата',
    size:'wide',
    body:
    '<form id="txForm" novalidate>'+
      '<div class="seg lg" data-seg="dtx" role="group" aria-label="Тип операции" style="width:100%"><span class="seg-thumb"></span>'+
        '<button type="button" class="seg-btn" data-act="d-type" data-v="expense" aria-pressed="'+(draft.type==='expense')+'" style="flex:1;justify-content:center">'+svg('trendDown',15)+'Расход</button>'+
        '<button type="button" class="seg-btn" data-act="d-type" data-v="income" aria-pressed="'+(draft.type==='income')+'" style="flex:1;justify-content:center">'+svg('trendUp',15)+'Доход</button>'+
      '</div>'+
      '<div class="field" style="margin-top:16px" data-f="amount"><span class="lab">Сумма</span>'+
        '<div class="amount-in"><span class="cur mono">'+(CUR[state.settings.currency]||CUR.RUB).sym+'</span>'+
        '<input id="dAmount" inputmode="decimal" autocomplete="off" placeholder="0" value="'+(t?String(t.amount).replace('.',','):'')+'" aria-describedby="eAmount"></div>'+
        '<span class="err" id="eAmount">'+svg('alert',13)+'Введите сумму больше нуля</span></div>'+
      '<div class="row2" style="margin-top:16px">'+
        '<div class="field" data-f="date"><span class="lab">Дата</span>'+
          '<input class="inp" type="date" id="dDate" max="'+todayISO()+'" value="'+draft.date+'" aria-describedby="eDate">'+
          '<span class="err" id="eDate">'+svg('alert',13)+'Дата не может быть в будущем</span></div>'+
        '<div class="field"><span class="lab">Комментарий</span>'+
          '<input class="inp" id="dComment" maxlength="140" placeholder="Например, фермерский рынок" value="'+esc(t?t.comment:'')+'">'+
          '<span class="hint">необязательно · до 140 символов</span></div>'+
      '</div>'+
      '<div class="field" style="margin-top:16px" data-f="cat"><span class="lab">Категория</span>'+
        '<div class="cat-grid" id="dCats"></div>'+
        '<span class="err" id="eCat">'+svg('alert',13)+'Выберите категорию</span></div>'+
    '</form>',
    footer:'<button class="btn ghost" data-close>Отмена</button>'+
           (t?'<button class="btn danger" data-act="tx-del" data-id="'+t.id+'">'+svg('trash',15)+'Удалить</button>':'')+
           '<button class="btn primary" data-act="tx-save" form="txForm">'+svg('check',15)+(t?'Сохранить':'Добавить')+'</button>',
    focus:'#dAmount',
    onMount(m){ renderCatChips(); positionSegs(m); m.querySelector('#dAmount').addEventListener('input',e=>{ e.target.value=e.target.value.replace(/[^\d.,\s]/g,''); }); }
  });
}
function renderCatChips(){
  const host=$('#dCats'); if(!host) return;
  const cats=catsByType(draft.type);
  host.innerHTML=cats.map(c=>'<button type="button" class="chip" style="--c:'+c.color+'" data-act="d-cat" data-id="'+c.id+'" aria-pressed="'+(draft.cat===c.id)+'">'+
    svg(c.icon,15)+esc(c.name)+'</button>').join('')+
    '<button type="button" class="chip" style="--c:var(--dim);border-style:dashed" data-act="d-newcat" data-type="'+draft.type+'">'+svg('plus',15)+'Своя</button>';
}
function setDraftType(tp){
  if(draft.type===tp) return;
  draft.type=tp;
  if(!catsByType(tp).some(c=>c.id===draft.cat)) draft.cat='';   // сброс недопустимого выбора
  $$('#txForm .seg-btn[data-act="d-type"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===tp)));
  positionSegs($('#txForm'));
  renderCatChips();
}
function saveTx(id){
  const amtEl=$('#dAmount'), dateEl=$('#dDate'), comEl=$('#dComment');
  const amount=parseAmount(amtEl.value);
  let bad=false;
  const mark=(f,on)=>{ $(f).closest('[data-f]')?.classList.toggle('invalid',on); $(f).classList.toggle('on',on); if(on) bad=true; };
  mark('#eAmount',!(amount>0));
  mark('#eDate', !dateEl.value || dateEl.value>todayISO());
  mark('#eCat', !draft.cat);
  if(bad){ toast('Проверьте форму','warn',{desc:'Некоторые поля заполнены неверно'}); return; }
  const data={ type:draft.type, amount, date:dateEl.value, categoryId:draft.cat, comment:comEl.value.trim().slice(0,140) };
  if(id){
    const t=state.transactions.find(x=>x.id===id);
    Object.assign(t,data); save(); closeTopModal();
    toast('Операция обновлена','ok',{desc:txCat(t).name+' · '+money(t.amount)});
  }else{
    const t=Object.assign({id:uid(),created:Date.now()},data);
    state.transactions.push(t); save(); closeTopModal();
    if(mKey(t.date)!==ui.month) ui.month=mKey(t.date);
    toast('Транзакция добавлена','ok',{desc:txCat(t).name+' · '+money(t.amount,{plus:t.type==='income'})});
  }
  shown.clear(); renderChrome(); render();
}
function delTx(id){
  const i=state.transactions.findIndex(x=>x.id===id); if(i<0) return;
  const t=state.transactions[i];
  const row=$('.tx[data-id="'+id+'"]');
  const finish=()=>{
    state.transactions.splice(i,1); save();
    const api=modalStack.find(m=>m.el.querySelector('[form="txForm"]')); if(api) closeModal(api);
    shown.clear(); renderChrome(); render();
    toast('Операция удалена','danger',{action:{label:'Отменить',fn:()=>{ state.transactions.splice(i,0,t); save(); shown.clear(); renderChrome(); render(); toast('Восстановлено','ok'); }}, desc:txCat(t).name+' · '+money(t.amount)});
  };
  if(row){ row.classList.add('removing'); setTimeout(finish,RM?0:300); } else finish();
}

/* ---------- 13. ФОРМЫ: КАТЕГОРИЯ ---------- */
let cdraft={};
function catModal(type,id){
  const c=id?catById(id):null;
  cdraft={ type:c?c.type:(type||'expense'), name:c?c.name:'', color:c?c.color:PALETTE[Math.floor(Math.random()*PALETTE.length)], icon:c?c.icon:'box' };
  openModal({
    title:c?'Категория':'Новая категория', sub:c?'Название, цвет и иконка':'Тип, название, иконка и цвет',
    body:
    '<div class="field"><span class="lab">Тип</span>'+
      '<div class="seg" data-seg="dct" role="group" aria-label="Тип категории" style="width:100%"><span class="seg-thumb"></span>'+
        '<button type="button" class="seg-btn" data-act="d-ctype" data-v="expense" aria-pressed="'+(cdraft.type==='expense')+'" style="flex:1;justify-content:center">Расход</button>'+
        '<button type="button" class="seg-btn" data-act="d-ctype" data-v="income" aria-pressed="'+(cdraft.type==='income')+'" style="flex:1;justify-content:center">Доход</button>'+
      '</div></div>'+
    '<div class="field" data-f="name"><span class="lab">Название</span>'+
      '<input class="inp" id="cName" maxlength="32" placeholder="Например, Путешествия" value="'+esc(cdraft.name)+'">'+
      '<span class="err" id="eName">'+svg('alert',13)+'Введите название</span>'+
      '<span class="hint">Название не должно повторяться ни в доходах, ни в расходах</span></div>'+
    '<div class="field"><span class="lab">Цвет</span><div class="swatches" id="cSw">'+
      PALETTE.concat(['#e879f9','#7dd3fc','#fda4af','#bef264','#fcd34d','#cbd5e1']).map(col=>
        '<button type="button" class="sw" style="--c:'+col+'" data-act="d-ccol" data-v="'+col+'" aria-pressed="'+(cdraft.color===col)+'" aria-label="Цвет '+col+'"></button>').join('')+
    '</div></div>'+
    '<div class="field"><span class="lab">Иконка</span><div class="icons-grid" id="cIc">'+
      ICON_CHOICES.map(n=>'<button type="button" class="ic-pick" data-act="d-cicon" data-v="'+n+'" aria-pressed="'+(cdraft.icon===n)+'" aria-label="Иконка '+n+'">'+svg(n,19)+'</button>').join('')+
    '</div></div>'+
    '<div class="field"><span class="lab">Предпросмотр</span>'+
      '<div class="cat-row" style="--c:'+cdraft.color+';border:1px solid var(--line);border-radius:14px;padding:12px" id="cPreview"></div></div>',
    footer:'<button class="btn ghost" data-close>Отмена</button>'+
           '<button class="btn primary" data-act="cat-save" data-id="'+(c?c.id:'')+'">'+svg('check',15)+(c?'Сохранить':'Создать')+'</button>',
    focus:'#cName',
    onMount(m){ previewCat(); positionSegs(m); }
  });
}
function previewCat(){
  const p=$('#cPreview'); if(!p) return;
  p.style.setProperty('--c',cdraft.color);
  p.innerHTML='<span class="ico-chip" style="width:36px;height:36px;border-radius:11px">'+svg(cdraft.icon,17)+'</span>'+
    '<div><div class="nm">'+esc(cdraft.name||'Новая категория')+'</div>'+
    '<div class="sub">'+(cdraft.type==='expense'?'списания':'поступления')+'</div></div>'+
    '<div class="cat-sum mono">'+money(0)+'</div>';
}
function saveCat(id){
  const name=$('#cName').value.trim();
  const eN=$('#eName');
  const dup=state.categories.find(c=>c.id!==id&&c.name.toLowerCase()===name.toLowerCase());
  const fail=msg=>{ eN.innerHTML=svg('alert',13)+esc(msg); eN.classList.add('on'); $('#cName').closest('[data-f]').classList.add('invalid'); $('#cName').focus(); };
  if(!name){ return fail('Введите название категории'); }
  if(name.length>32){ return fail('Не длиннее 32 символов'); }
  if(dup){ return fail('Категория «'+dup.name+'» уже существует ('+(dup.type==='expense'?'расходы':'доходы')+')'); }
  const payload={name,type:cdraft.type,color:cdraft.color,icon:cdraft.icon};
  if(id){ Object.assign(catById(id),payload); toast('Категория обновлена','ok',{desc:name}); }
  else { state.categories.push(Object.assign({id:uid()},payload)); toast('Категория создана','ok',{desc:(payload.type==='expense'?'расходы':'доходы')+' · '+name}); }
  save(); closeTopModal(); render();
}
async function delCat(id){
  const c=catById(id); if(!c) return;
  const used=state.transactions.filter(t=>t.categoryId===id).length;
  if(used){ toast('Нельзя удалить категорию','warn',{desc:used+' '+plural(used,'операция','операции','операций')+' использует её',duration:5000}); return; }
  const ok=await confirmDlg({title:'Удалить категорию?',text:'Категория <b style="color:var(--txt)">«'+esc(c.name)+'»</b> будет удалена без следа. Транзакций с ней нет.',confirm:'Удалить',danger:true,icon:'trash'});
  if(!ok) return;
  state.categories=state.categories.filter(x=>x.id!==id); save(); render();
  toast('Категория удалена','danger');
}

/* ---------- 14. ФОРМЫ: ЦЕЛИ ---------- */
function goalModal(id){
  const g=id?state.goals.find(x=>x.id===id):null;
  openModal({
    title:g?'Редактирование цели':'Новая цель', sub:g?'Прогресс пересчитается автоматически':'Название, сумма и срок',
    body:
    '<form id="goalForm" novalidate>'+
      '<div class="field" data-f="gname"><span class="lab">Название</span>'+
        '<input class="inp" id="gName" maxlength="60" placeholder="Резервный фонд" value="'+esc(g?g.name:'')+'">'+
        '<span class="err" id="eGName">'+svg('alert',13)+'Введите название цели</span></div>'+
      '<div class="row2" style="margin-top:16px">'+
        '<div class="field" data-f="gtarget"><span class="lab">Целевая сумма</span>'+
          '<input class="inp mono" id="gTarget" inputmode="decimal" placeholder="0" value="'+(g?String(g.target).replace('.',','):'')+'">'+
          '<span class="err" id="eGTarget">'+svg('alert',13)+'Сумма должна быть больше нуля</span></div>'+
        '<div class="field" data-f="gsaved"><span class="lab">Уже накоплено</span>'+
          '<input class="inp mono" id="gSaved" inputmode="decimal" placeholder="0" value="'+(g?String(g.saved).replace('.',','):'')+'">'+
          '<span class="err" id="eGSaved">'+svg('alert',13)+'Не может быть отрицательным</span></div>'+
      '</div>'+
      '<div class="field" style="margin-top:16px" data-f="gdl"><span class="lab">Дедлайн</span>'+
        '<input class="inp" type="date" id="gDeadline" value="'+esc(g?g.deadline||'':'')+'">'+
        '<span class="err" id="eGdl">'+svg('alert',13)+'Проверьте дату</span>'+
        '<span class="hint">необязательно — покажем остаток дней и нужный темп</span></div>'+
    '</form>',
    footer:'<button class="btn ghost" data-close>Отмена</button>'+
           '<button class="btn primary" data-act="goal-save" data-id="'+(g?g.id:'')+'">'+svg('check',15)+(g?'Сохранить':'Создать цель')+'</button>',
    focus:'#gName'
  });
}
function saveGoal(id){
  const name=$('#gName').value.trim(), target=parseAmount($('#gTarget').value), saved=parseAmount($('#gSaved').value||'0'), dl=$('#gDeadline').value;
  let bad=false;
  const mark=(f,on,msg)=>{ const e=$(f); e.innerHTML=svg('alert',13)+esc(msg||e.textContent); e.classList.toggle('on',on); e.closest('[data-f]').classList.toggle('invalid',on); if(on) bad=true; };
  mark('#eGName',!name,'Введите название цели');
  mark('#eGTarget',!(target>0),'Сумма должна быть больше нуля');
  mark('#eGSaved',saved<0,'Не может быть отрицательным');
  mark('#eGdl',!!(dl&&!/^\d{4}-\d{2}-\d{2}$/.test(dl)),'Проверьте дату');
  if(bad) return;
  const data={name,target,saved:Math.max(0,saved),deadline:dl||''};
  if(id){ Object.assign(state.goals.find(x=>x.id===id),data); toast('Цель обновлена','ok',{desc:name}); }
  else { state.goals.push(Object.assign({id:uid(),created:Date.now()},data)); toast('Цель создана','ok',{desc:name+' · '+money(target)}); }
  save(); closeTopModal(); if(ui.view!=='goals') go('goals'); else render();
}
function depositModal(id){
  const g=state.goals.find(x=>x.id===id); if(!g) return;
  const remain=Math.max(0,g.target-g.saved);
  openModal({
    title:'Пополнить цель', sub:g.name+' · накоплено '+money(g.saved),
    body:'<div class="field" data-f="dep"><span class="lab">Сумма пополнения</span>'+
      '<div class="amount-in"><span class="cur mono">'+(CUR[state.settings.currency]||CUR.RUB).sym+'</span>'+
      '<input id="depAmount" inputmode="decimal" placeholder="0" autofocus></div>'+
      '<span class="err" id="eDep">'+svg('alert',13)+'Введите сумму больше нуля</span></div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">'+
        [0.1,0.25,0.5,1].map(f=>'<button type="button" class="chip" style="--c:var(--acc-3)" data-act="dep-quick" data-v="'+Math.round(remain*f)+'">'+(f===1?'остаток':Math.round(f*100)+'%')+' · '+compact(Math.round(remain*f))+'</button>').join('')+
      '</div>'+
      '<p class="hint" style="margin-top:14px">Пополнение цели учитывается отдельно и не создаёт операцию в транзакциях.</p>',
    footer:'<button class="btn ghost" data-close>Отмена</button><button class="btn primary" data-act="dep-save" data-id="'+g.id+'">'+svg('plus',15)+'Пополнить</button>',
    focus:'#depAmount'
  });
}
function delGoal(id){
  const g=state.goals.find(x=>x.id===id); if(!g) return;
  confirmDlg({title:'Удалить цель?',text:'Цель <b style="color:var(--txt)">«'+esc(g.name)+'»</b> с прогрессом '+money(g.saved)+' будет удалена.',confirm:'Удалить',danger:true,icon:'trash'})
  .then(ok=>{ if(!ok) return; state.goals=state.goals.filter(x=>x.id!==id); save(); render(); toast('Цель удалена','danger',{desc:g.name}); });
}

/* ---------- 15. ЭКСПОРТ / ИМПОРТ / ДЕМО ---------- */
function exportJSON(){
  download('saldo-backup-'+todayISO()+'.json', JSON.stringify({app:'saldo',version:1,exported:new Date().toISOString(),...state},null,2));
  toast('Экспорт готов','ok',{desc:'Файл JSON сохранён на устройство'});
}
function exportCSV(){
  if(!state.transactions.length){ toast('Нечего экспортировать','warn',{desc:'Список операций пуст'}); return; }
  const head=['Дата','Тип','Категория','Сумма','Комментарий'];
  const rows=[...state.transactions].sort(byDateDesc).map(t=>[t.date,t.type==='income'?'доход':'расход',txCat(t).name,String(t.amount).replace('.',','),'"'+String(t.comment).replace(/"/g,'""')+'"']);
  download('saldo-transactions-'+todayISO()+'.csv','\uFEFF'+[head.join(';'),...rows.map(r=>r.join(';'))].join('\n'),'text/csv;charset=utf-8');
  toast('CSV выгружен','ok',{desc:rows.length+' '+plural(rows.length,'строка','строки','строк')});
}
function importJSON(file){
  const fr=new FileReader();
  fr.onload=()=>{
    let p; try{ p=JSON.parse(fr.result); }catch(e){ return toast('Файл повреждён','danger',{desc:'Не удалось разобрать JSON'}); }
    const tx=(p.transactions||[]).map(normalizeTx).filter(Boolean);
    const cats=(p.categories||[]).map(normalizeCat).filter(Boolean);
    const goals=(p.goals||[]).map(normalizeGoal).filter(Boolean);
    if(!tx.length&&!goals.length&&!cats.length) return toast('Данных не найдено','warn',{desc:'Проверьте структуру файла'});
    confirmDlg({title:'Импортировать данные?',text:'В файле <b class="mono" style="color:var(--txt)">'+tx.length+'</b> операций, <b class="mono" style="color:var(--txt)">'+cats.length+'</b> категорий, <b class="mono" style="color:var(--txt)">'+goals.length+'</b> целей.<br>Текущие данные будут заменены.',confirm:'Импортировать',danger:true,icon:'upload'})
    .then(ok=>{
      if(!ok) return;
      state.transactions=tx; state.goals=goals;
      if(cats.length) state.categories=cats;
      if(p.settings) state.settings=Object.assign(state.settings,p.settings,{theme:state.settings.theme});
      save(); shown.clear(); renderChrome(); render();
      toast('Данные импортированы','ok',{desc:tx.length+' операций загружено'});
    });
  };
  fr.readAsText(file);
}
function mulberry(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function demoData(){
  const rnd=mulberry(20260922), today=new Date(), cid=n=>state.categories.find(c=>c.name===n)?.id;
  const push=(type,amount,date,cat,comment)=>{
    if(date>todayISO()) return;
    state.transactions.push({id:uid(),type,amount:Math.round(amount*100)/100,date,categoryId:cid(cat)||cid('Другое'),comment,created:Date.now()-Math.random()*1e6});
  };
  const D=(y,m,d)=>y+'-'+pad(m)+'-'+pad(d);
  for(let back=5;back>=0;back--){
    const base=new Date(today.getFullYear(),today.getMonth()-back,1);
    const y=base.getFullYear(), m=base.getMonth()+1, dim=new Date(y,m,0).getDate();
    push('income',168000+Math.round(rnd()*9000),D(y,m,5),'Зарплата','Оклад за '+mkTitle(y+'-'+pad(m),false));
    if(rnd()>.45) push('income',18000+Math.round(rnd()*26000),D(y,m,12+Math.floor(rnd()*8)),'Подработка','Фриланс-проект');
    if(rnd()>.6) push('income',4000+Math.round(rnd()*9000),D(y,m,19),'Продажа','Продал старое на маркетплейсе');
    push('income',1800+Math.round(rnd()*900),D(y,m,1),'Проценты','Купоны по облигациям');
    if(rnd()>.75) push('income',5000,D(y,m,22),'Подарок','Денежный подарок');
    push('expense',45000,D(y,m,3),'Жильё','Аренда квартиры');
    push('expense',820,D(y,m,12),'Связь','Мобильный + домашний интернет');
    if(rnd()>.5) push('expense',3990,D(y,m,14),'Развлечения','Подписка на стриминг');
    push('expense',1490,D(y,m,20),'Здоровье','Аптека');
    if(rnd()>.6) push('expense',12000+Math.round(rnd()*24000),D(y,m,8+Math.floor(rnd()*6)),'Образование','Онлайн-курс');
    if(rnd()>.55) push('expense',4500+Math.round(rnd()*11000),D(y,m,16+Math.floor(rnd()*7)),'Одежда','Сезонная покупка');
    for(let i=0;i<9;i++){ const d=1+Math.floor(rnd()*dim); push('expense',900+rnd()*3900,D(y,m,d),'Продукты',['Пятёрочка','Магнит','ВкусВилл','Самбери','Лента'][Math.floor(rnd()*5)]); }
    for(let i=0;i<11;i++){ const d=1+Math.floor(rnd()*dim); push('expense',80+rnd()*620,D(y,m,d),'Транспорт',['Такси','Метро','Каршеринг','Бензин'][Math.floor(rnd()*4)]); }
    for(let i=0;i<5;i++){ const d=1+Math.floor(rnd()*dim); push('expense',450+rnd()*3400,D(y,m,d),'Развлечения',['Кафе','Кино','Концерт','Бар','Игры'][Math.floor(rnd()*5)]); }
  }
  state.goals=[
    {id:uid(),name:'Резервный фонд',target:400000,saved:236000,deadline:D(today.getFullYear(),12,31),created:Date.now()},
    {id:uid(),name:'Путешествие в Грузию',target:180000,saved:97500,deadline:D(today.getFullYear()+1,5,1),created:Date.now()},
    {id:uid(),name:'Новый монитор',target:62000,saved:62000,deadline:'',created:Date.now()}
  ];
}
async function loadDemo(){
  if(state.transactions.length){
    const ok=await confirmDlg({title:'Загрузить демо-данные?',text:'Текущие операции и цели будут <b style="color:var(--expense)">заменены</b> демонстрационным набором за 6 месяцев. Настройки и категории останутся.',confirm:'Загрузить',danger:true,icon:'zap'});
    if(!ok) return;
  }
  state.transactions=[]; demoData(); save(); shown.clear(); ui.month=curMK(); renderChrome(); render();
  toast('Демо-данные загружены','ok',{desc:state.transactions.length+' операций за 6 месяцев'});
}
async function resetAll(){
  const ok=await confirmDlg({title:'Сбросить все данные?',text:'Будут удалены <b style="color:var(--txt)">'+state.transactions.length+'</b> операций, <b style="color:var(--txt)">'+state.goals.length+'</b> целей, категории вернутся к базовым, настройки — к значениям по умолчанию.<br><br>Действие необратимо. Сначала сделайте экспорт.',confirm:'Да, сбросить',danger:true,icon:'alert'});
  if(!ok) return;
  const theme=state.settings.theme;
  state=defaultState(); state.settings.theme=theme;
  localStorage.removeItem(LS); save(); shown.clear();
  ui.month=curMK(); ui.tx={type:'all',cat:'all',period:'month',q:'',sort:'desc',limit:40};
  renderChrome(); render();
  toast('Данные сброшены','danger',{desc:'Приложение вернулось к заводскому состоянию'});
}
function toggleTheme(){
  state.settings.theme=state.settings.theme==='dark'?'light':'dark';
  applyTheme(); save(); renderChrome(); if(ui.view==='settings') render();
}
function applyTheme(){ document.documentElement.dataset.theme=state.settings.theme==='light'?'light':'dark';
  const mt=document.querySelector('meta[name=theme-color]'); if(mt) mt.content=state.settings.theme==='light'?'#f3f4f9':'#0e0e14'; }

/* ---------- 16. ДЕЙСТВИЯ (делегирование) ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act],[data-close]'); if(!b) return;
  if(b.hasAttribute('data-close')){ const api=modalStack.find(m=>m.el.contains(b)); if(api) closeModal(api); return; }
  const a=b.dataset.act, id=b.dataset.id;
  switch(a){
    case 'go': go(b.dataset.view); break;
    case 'toggle-theme': toggleTheme(); break;
    case 'shortcuts': shortcutsModal(); break;
    case 'new-tx': txModal(); break;
    case 'tx-edit': txModal(id); break;
    case 'tx-del': delTx(id); break;
    case 'tx-save': e.preventDefault(); saveTx(id||null); break;
    case 'd-type': setDraftType(b.dataset.v); break;
    case 'd-cat': draft.cat=id; $$('#dCats .chip[data-act="d-cat"]').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.id===id))); $('#eCat').classList.remove('on'); $('#dCats').closest('[data-f]').classList.remove('invalid'); break;
    case 'd-newcat': catModal(draft.type); break;
    case 'new-cat': catModal(b.dataset.type); break;
    case 'edit-cat': catModal(id); break;
    case 'del-cat': delCat(id); break;
    case 'cat-save': saveCat(id||null); break;
    case 'd-ctype': cdraft.type=b.dataset.v; $$('.seg-btn[data-act="d-ctype"]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.v===cdraft.type))); positionSegs($('.modal.in')); previewCat(); break;
    case 'd-ccol': cdraft.color=b.dataset.v; $$('.sw').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.v===cdraft.color))); previewCat(); break;
    case 'd-cicon': cdraft.icon=b.dataset.v; $$('.ic-pick').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.v===cdraft.icon))); previewCat(); break;
    case 'new-goal': goalModal(); break;
    case 'edit-goal': goalModal(id); break;
    case 'del-goal': delGoal(id); break;
    case 'goal-save': saveGoal(id||null); break;
    case 'deposit': depositModal(id); break;
    case 'dep-quick': { const el=$('#depAmount'); el.value=String(+b.dataset.v||'').replace(/(\d)(?=(\d{3})+$)/g,'$1 '); el.focus(); break; }
    case 'dep-save': {
      const g=state.goals.find(x=>x.id===id), v=parseAmount($('#depAmount').value);
      const err=$('#eDep');
      if(!(v>0)){ err.classList.add('on'); $('#depAmount').closest('[data-f]').classList.add('invalid'); return; }
      g.saved=Math.round((g.saved+v)*100)/100; save(); closeTopModal(); render();
      toast(g.saved>=g.target?'Цель достигнута':'Цель пополнена', g.saved>=g.target?'warn':'ok', {desc:g.name+' · '+money(g.saved)+' из '+money(g.target)});
      break;
    }
    case 'month': { const d=+b.dataset.dir; const nk=shiftMK(ui.month,d); if(nk<=curMK()){ ui.month=nk; render(); } break; }
    case 'month-now': ui.month=curMK(); render(); break;
    case 'f-type': ui.tx.type=b.dataset.v; renderTransactions(); break;
    case 'f-clear': ui.tx={...ui.tx,type:'all',cat:'all',period:'all',q:'',sort:'desc',limit:40}; renderTransactions(); break;
    case 'more': ui.tx.limit+=40; renderTransactions(); break;
    case 'cat-tab': ui.catTab=b.dataset.v; renderCategories(); break;
    case 'cat-drill': ui.tx={...ui.tx,type:'expense',cat:b.dataset.cat||'all',period:ui.month,q:'',limit:40}; go('transactions'); break;
    case 'weekstart': state.settings.weekStart=+b.dataset.v; save(); renderChrome(); render(); toast('Первый день недели обновлён','info',{desc:+b.dataset.v===1?'воскресенье':'понедельник'}); break;
    case 'set-theme': if(state.settings.theme!==b.dataset.v) toggleTheme(); break;
    case 'export': exportJSON(); break;
    case 'csv': exportCSV(); break;
    case 'import': $('#filePicker').click(); break;
    case 'demo': loadDemo(); break;
    case 'reset': resetAll(); break;
    case 'wipe-tx': confirmDlg({title:'Удалить все операции?',text:'Будет удалено <b style="color:var(--txt)">'+state.transactions.length+'</b> транзакций. Категории, цели и настройки останутся.',confirm:'Удалить',danger:true,icon:'trash'}).then(ok=>{ if(!ok)return; state.transactions=[]; save(); shown.clear(); renderChrome(); render(); toast('Операции удалены','danger'); }); break;
  }
});
document.addEventListener('submit',e=>{ if(e.target.id==='txForm'){ e.preventDefault(); saveTx(e.submitter?.dataset.id||null); } });
$('#filePicker').addEventListener('change',e=>{ const f=e.target.files?.[0]; if(f) importJSON(f); e.target.value=''; });

/* ---------- 17. СТАРТ ---------- */
(function boot(){
  const had=load();
  applyTheme();
  renderChrome();
  $$('.view').forEach(s=>s.classList.toggle('on',s.id==='v-'+ui.view));
  render();
  const fill=$('#bootFill'), boot=$('#boot');
  let p=0;
  const tick=setInterval(()=>{ p=Math.min(100,p+16+Math.random()*22); fill.style.width=p+'%'; if(p>=100) clearInterval(tick); },70);
  setTimeout(()=>{
    fill.style.width='100%';
    boot.classList.add('off');
    setTimeout(()=>boot.remove(),520);
    topline();
    requestAnimationFrame(()=>{ positionSegs(); reveals(); });
    if(!had) setTimeout(()=>toast('Хранилище пусто','info',{desc:'Добавьте операцию (N) или загрузите демо-данные в настройках',duration:6000}),700);
  },720);
})();
/* мягкое появление mbar/прогрессов после отрисовки */
const mo=new MutationObserver(()=>{ requestAnimationFrame(()=>$$('.mbar i,.prog i,.cat-share i').forEach(el=>{ if(el.dataset.w!=null) el.style.width=el.dataset.w+'%'; })); });
mo.observe(document.getElementById('main'),{childList:true,subtree:true});
