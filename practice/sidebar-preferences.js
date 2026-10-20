'use strict';
(() => {
 document.addEventListener('DOMContentLoaded',()=>{
  for(const id of ['learningSection','knowledgeSection','reminderSection']){
   const panel=document.getElementById(id),key='study-sidebar-'+id+'-open';
   try{const value=localStorage.getItem(key);if(value!==null)panel.open=value==='true'}catch{}
   panel.addEventListener('toggle',()=>{try{localStorage.setItem(key,String(panel.open))}catch{}});
  }
 });
})();
