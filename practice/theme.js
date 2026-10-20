'use strict';
// Apply before styles load so a saved choice does not flash the default theme.
(() => {
 const names={"blue": "西安工程蓝", "purple": "紫色", "green": "绿色", "teal": "青色", "amber": "橙色", "rose": "玫红", "red": "红色", "indigo": "靛蓝", "cyan": "湖蓝", "brown": "棕色", "olive": "橄榄绿", "graphite": "石墨灰", "black": "黑色"};
 const key='study-color-theme';
 let chosen='blue';
 try{const stored=localStorage.getItem(key);if(Object.hasOwn(names,stored))chosen=stored;}catch{}
 document.documentElement.dataset.theme=chosen;
 document.addEventListener('DOMContentLoaded',()=>{
  const buttons=[...document.querySelectorAll('[data-theme-choice]')];
  function apply(value){
   chosen=value;document.documentElement.dataset.theme=value;
   document.getElementById('themeName').textContent=names[value];
   buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===value)));
  }
  buttons.forEach(button=>button.addEventListener('click',()=>{
   apply(button.dataset.themeChoice);
   try{localStorage.setItem(key,chosen);}catch{}
  }));
  apply(chosen);
  const panel=document.getElementById('themePicker');
  try{panel.open=localStorage.getItem('study-color-panel-open')==='true';}catch{}
  panel.addEventListener('toggle',()=>{
   try{localStorage.setItem('study-color-panel-open',String(panel.open));}catch{}
  });
 });
})();
