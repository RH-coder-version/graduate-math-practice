'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let saved={};try{saved=JSON.parse(localStorage.getItem('numerical-study-v1')||'{}')}catch{}
let state={records:{},last:null,...saved};let mode='practice',topic='all',bank='all',filter='all',search='',index=0,shown=false,refBank='b0',refPage=1;
let subject=state.subject||'statistics';
const migratedIds={'b1-p8-8':'b1-p8-7','b4-p1-8':'b4-p1-7','b6-p1-8':'b6-p1-7','b1-p5-2':'b1-p5-1'};
for(const [oldId,newId] of Object.entries(migratedIds)){const a=state.records[oldId],b=state.records[newId];if(a){state.records[newId]={...a,...b,done:!!(a.done||b?.done),wrong:!!(a.wrong||b?.wrong),note:[b?.note,a.note].filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).join('\n\n')};delete state.records[oldId];}}

state.lastBySubject=state.lastBySubject||{numerical:state.last};
let list=[],topics=[],questions=[],banks=[];
function subjectName(){return subject==='statistics'?'数理统计':'数值分析'}
function selectData(){topics=DATA.topics.filter(t=>(t.subject||'numerical')===subject);questions=DATA.questions.filter(q=>(q.subject||'numerical')===subject);banks=DATA.banks.filter(b=>(b.subject||'numerical')===subject);}
function syncSubjectControls(){
 $('#downloadMarkdown').href='markdown/'+subjectName()+'题库.md';
 $$('#subjectFilter').forEach(x=>x.value=subject);
 $$('[data-subject]').forEach(x=>{x.classList.toggle('active',x.dataset.subject===subject);x.setAttribute('aria-pressed',String(x.dataset.subject===subject))});
 $('#bankFilter').innerHTML='<option value="all">全部题库</option>'+banks.filter(b=>questions.some(q=>q.bank===b.id)).map(b=>`<option value="${b.id}">${esc(b.name)}</option>`).join('');
 $('#topicFilter').innerHTML='<option value="all">全部知识点</option>'+topics.map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('');
 $('#coverage').innerHTML=`${subjectName()}收录 ${banks.length} 份资料，共 ${banks.reduce((n,b)=>n+b.pages,0)} 页。<br>题面已转写为 Markdown，支持复制。<br>每题附 Markdown 详解，点击后展开。`;
 $('#subtitle').textContent=subject==='statistics'?'从抽样分布到估计、检验与回归，沿着知识点逐步练习。':'按知识点循序练习，也可以回到熟悉的那份试卷。';
}
function switchSubject(value){subject=value;state.subject=value;selectData();mode='practice';topic=bank='all';filter='all';search='';index=0;refBank=banks[0].id;refPage=1;filtered();const i=list.findIndex(q=>q.id===state.lastBySubject[subject]);if(i>=0)index=i;persist();refresh();}
selectData();refBank=banks[0].id;
$$('[data-subject]').forEach(x=>x.onclick=()=>switchSubject(x.dataset.subject));
function rec(id){return state.records[id]||{}}
function persist(){try{localStorage.setItem('numerical-study-v1',JSON.stringify(state))}catch{toast('浏览器存储不可用，请导出记录备份')}}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2300)}
function stats(){let all=questions.map(q=>rec(q.id));$('#total').textContent=questions.length;$('#doneCount').textContent=all.filter(r=>r.done).length;$('#wrongCount').textContent=$('#wrongStat').textContent=all.filter(r=>r.wrong).length;$('#donePercent').textContent=`完成 ${Math.round(all.filter(r=>r.done).length/questions.length*100)||0}% · 保持自己的节奏`;}
function chapters(){let html=`<button class="chapter ${topic==='all'?'active':''}" data-topic="all"><span class="number">◎</span> 全部知识点 <b>${questions.length}</b></button>`;topics.forEach((t,i)=>{let n=questions.filter(q=>q.topic===t.id).length;html+=`<button class="chapter ${topic===t.id?'active':''}" data-topic="${t.id}"><span class="number">${String(i+1).padStart(2,'0')}</span>${esc(t.name)}<b>${n}</b></button>`});$('#chapters').innerHTML=html;$$('[data-topic]').forEach(b=>b.onclick=()=>{topic=b.dataset.topic;mode='practice';index=0;refresh()})}
function filtered(){list=questions.filter(q=>(topic==='all'||q.topic===topic)&&(bank==='all'||q.bank===bank)&&(mode!=='wrong'||rec(q.id).wrong)&&(filter!=='todo'||!rec(q.id).done)&&(filter!=='done'||rec(q.id).done)&&(filter!=='answer'||ANSWERS[q.id]||q.answer||q.answerImages?.length)&&(!search||[q.title,q.text,q.label,banks.find(b=>b.id===q.bank)?.name,topics.find(t=>t.id===q.topic)?.name].join(' ').toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>topics.findIndex(t=>t.id===a.topic)-topics.findIndex(t=>t.id===b.topic)||a.order-b.order);if(bank!=='all')list.sort((a,b)=>a.order-b.order);index=Math.min(index,Math.max(list.length-1,0));$('#resultCount').textContent=`${list.length} 道练习`;}
function refresh(){syncSubjectControls();stats();chapters();$$('.nav').forEach(x=>x.classList.toggle('active',x.dataset.mode===mode));$('#modeCrumb').textContent={practice:'知识点练习',banks:'按题库刷题',wrong:'我的错题',reference:'资料原页'}[mode];$('#title').innerHTML=mode==='wrong'?'每一道错题，都是进步<span>。</span>':mode==='banks'?'从熟悉的题库，开始练习<span>。</span>':mode==='reference'?'翻开原页，随时对照<span>。</span>':topic==='all'?subjectName()+'，逐题掌握<span>。</span>':esc(topics.find(t=>t.id===topic)?.name)+'<span>。</span>';$('#workspace').hidden=['banks','reference'].includes(mode);$('#library').hidden=!$('#workspace').hidden;$('#topicFilter').value=topic;$('#bankFilter').value=bank;$('#statusFilter').value=filter;$('#search').value=search;if(mode==='banks')renderBanks();else if(mode==='reference')renderReference();else{filtered();shown=false;renderQuestion()}}
function renderKnowledge(id){
 const selected=topics.find(t=>t.id===id)||topics[0];
 $('#knowledgeTitle').textContent=selected.name;
 $('#knowledgeTopic').innerHTML=topics.map(t=>`<option value="${t.id}" ${t.id===selected.id?'selected':''}>${esc(t.name)}</option>`).join('');
 const lesson=KNOWLEDGE[selected.id]||'';const marker='### 配套例题 · 分步解析';const start=lesson.indexOf(marker);
 if(start>=0){const tail=lesson.indexOf('### 自测',start);$('#knowledgeContent').innerHTML=renderMarkdown(lesson.slice(0,start))+`<details class="worked-example"><summary>配套例题与解析（点击展开）</summary>${renderMarkdown(lesson.slice(start,tail<0?undefined:tail))}</details>`+(tail<0?'':renderMarkdown(lesson.slice(tail)));}else $('#knowledgeContent').innerHTML=renderMarkdown(lesson);
 $('#knowledgeDownload').href='markdown/'+subjectName()+'知识点复习.md';
 $('#knowledgeTopic').onchange=e=>renderKnowledge(e.target.value);
 $('#followQuestion').onclick=()=>renderKnowledge(list[index]?.topic||(topic==='all'?topics[0].id:topic));
}
function renderQuestion(){stats();renderKnowledge(list[index]?.topic||(topic==='all'?topics[0].id:topic));$('#position').textContent=list.length?`${index+1} / ${list.length}`:'0 / 0';if(!list.length){$('#questionCard').innerHTML=`<div class="empty"><h2>${mode==='wrong'?'错题本还是空的':'没有符合条件的题目'}</h2><p>${mode==='wrong'?'做题时点击“标记错题”，就能在这里集中复习。':'换一个知识点、题库或搜索词，再试一次。'}</p><button class="secondary" id="resetFilters">查看全部练习</button></div>`;$('#resetFilters').onclick=()=>{mode='practice';topic=bank='all';filter='all';search='';refresh()};$('#questionGrid').innerHTML='';$('#gridPaging').innerHTML='';return}
const q=list[index],r=rec(q.id),b=banks.find(b=>b.id===q.bank),t=topics.find(t=>t.id===q.topic);state.last=q.id;state.lastBySubject[subject]=q.id;state.subject=subject;persist();
$('#questionCard').innerHTML=`<div class="q-top"><div class="q-tags"><span class="tag">${esc(t?.name)}</span><span class="tag outline">${esc(q.type||'综合练习')}</span>${q.review?'<span class="tag outline">拆题 / 分类待校核</span>':''}</div><h2>${esc(q.title)}</h2><div class="source">来源：${esc(b.name)} · 第 ${q.page} 页 · ${esc(q.label)} <button class="text-btn" id="openSource">查看原页 ↗</button></div></div><div class="q-body">${q.annotated?'<div class="notice">原卷含手写批注，题图可能带有解答痕迹。批注仅供参考。</div>':''}<div class="markdown-body">${renderMarkdown(q.markdown||q.text)}</div><div class="question-tools"><button id="copyMarkdown" class="text-btn">复制本题 Markdown</button><span>文字题面 · 公式完整排版</span></div><label class="write-label" for="notes">我的作答 / 思路记录 <span id="saveState">自动保存在此浏览器</span></label><textarea id="notes" placeholder="在这里记录计算过程、答案或卡住的地方…">${esc(r.note||'')}</textarea><div class="q-actions"><button id="answerToggle" class="primary">${shown?'收起答案 ↑':'查看参考答案 ↓'}</button><button id="markWrong" class="secondary ${r.wrong?'is-wrong':''}">${r.wrong?'◆ 已加入错题':'◇ 标记错题'}</button><button id="markDone" class="secondary ${r.done?'is-done':''}">${r.done?'✓ 已完成':'✓ 标记完成'}</button></div><div id="answer" class="answer" ${shown?'':'hidden'}><h3>参考答案</h3><div class="answer-notice">先核对解题思路，再检查结果；原题有歧义时，下文会说明采用的条件。</div><div class="markdown-body answer-markdown">${renderMarkdown(ANSWERS[q.id]||'本题答案暂缺。')}</div><div class="answer-tools"><button id="copyAnswer" class="text-btn">复制本题 Markdown 详解</button><a class="text-btn" download href="markdown/${subjectName()}题库详解.md">下载本科目完整详解 ↓</a></div></div></div><div class="q-bottom"><button id="prev" ${index===0?'disabled':''}>← 上一题</button><span>第 ${index+1} 题 / 共 ${list.length} 题</span><button id="next" ${index===list.length-1?'disabled':''}>下一题 →</button></div>`;
$('#copyMarkdown').onclick=async()=>{try{await navigator.clipboard.writeText(q.markdown);toast('本题 Markdown 已复制')}catch{toast('复制失败，可下载完整 Markdown 文件')}};
$('#notes').oninput=e=>{state.records[q.id]={...rec(q.id),note:e.target.value};persist();$('#saveState').textContent='已保存'};
$('#copyAnswer').onclick=async()=>{try{await navigator.clipboard.writeText(ANSWERS[q.id]);toast('本题详解已复制')}catch{toast('复制失败，可下载本科目完整详解')}};
$('#answerToggle').onclick=()=>{shown=!shown;$('#answer').hidden=!shown;$('#answerToggle').textContent=shown?'收起答案 ↑':'查看参考答案 ↓'};
$('#markWrong').onclick=()=>markQuestion(q.id,'wrong');
$('#markDone').onclick=()=>markQuestion(q.id,'done');
$('#prev').onclick=()=>move(-1);$('#next').onclick=()=>move(1);$('#openSource').onclick=()=>showImage(`assets/${q.bank}_p${q.page}.jpg`);
$$('.zoom').forEach(im=>im.onclick=()=>showImage(im.src));renderGrid();}
function markQuestion(id,field){
 const adding=!rec(id)[field];
 // Capture the next question before the current one can leave the filtered list.
 const nextId=list[index+1]?.id;
 const oldIndex=index;
 state.records[id]={...rec(id),[field]:adding};persist();
 filtered();
 const currentIndex=list.findIndex(q=>q.id===id);
 const nextIndex=list.findIndex(q=>q.id===nextId);
 if(adding&&nextIndex>=0)index=nextIndex;
 else if(currentIndex>=0)index=currentIndex;
 else index=Math.min(oldIndex,Math.max(0,list.length-1));
 shown=false;renderQuestion();
 const message=field==='done'?(adding?'已标记完成':'已取消完成'):(adding?'已加入错题本':'已移出错题本');
 toast(message+(adding?(nextIndex>=0?'，已进入下一题':'，已到本组最后一题'):''));
 if(adding&&nextIndex>=0)$('#questionCard').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderGrid(){const start=Math.floor(index/30)*30;$('#questionGrid').innerHTML=list.slice(start,start+30).map((q,j)=>`<button class="grid-btn ${rec(q.id).done?'done':''} ${rec(q.id).wrong?'wrong':''} ${start+j===index?'current':''}" data-index="${start+j}" aria-label="第${start+j+1}题${rec(q.id).done?'，已完成':''}${rec(q.id).wrong?'，错题':''}">${start+j+1}</button>`).join('');$$('[data-index]').forEach(b=>b.onclick=()=>{index=Number(b.dataset.index);shown=false;renderQuestion()});$('#gridPaging').innerHTML=list.length>30?`<button id="gridPrev" ${start===0?'disabled':''}>← 上组</button><span>${Math.floor(start/30)+1} / ${Math.ceil(list.length/30)}</span><button id="gridNext" ${start+30>=list.length?'disabled':''}>下组 →</button>`:'';if($('#gridPrev')){$('#gridPrev').onclick=()=>{index=start-30;shown=false;renderQuestion()};$('#gridNext').onclick=()=>{index=start+30;shown=false;renderQuestion()}}}
function move(d){if(index+d<0||index+d>=list.length)return;index+=d;shown=false;renderQuestion();$('#workspace').scrollIntoView({behavior:'smooth',block:'start'})}
function showImage(src){$('#viewerImage').src=src;$('#viewer').showModal()}
$('#closeViewer').onclick=()=>$('#viewer').close();$('#viewer').onclick=e=>{if(e.target===$('#viewer'))$('#viewer').close()};
function renderBanks(){$('#library').innerHTML=`<div class="notice">${subject==='statistics'?'已扫描 6 份资料。复习题优先使用无批注 Word 版，PDF 批注与解答单独关联，避免重复练习。':'已扫描 13 个源文件；相同的 2020 试卷已合并。'} 全部练习题已转为 Markdown 文字与公式，原页可随时核对。</div><div class="library-grid">${banks.map(b=>{const n=questions.filter(q=>q.bank===b.id).length;return `<div class="bank-card"><div class="book-icon">▤</div><h3>${esc(b.name)}</h3><p>${b.pages} 页原文 · ${n?n+' 道已拆分练习':'参考资料'}${b.aliases.length?'<br>已合并 1 份重复文件':''}</p>${n?`<button class="primary bank-start" data-bank="${b.id}">开始练习 →</button>`:''}<button class="text-btn bank-read" data-bank="${b.id}">查阅原页 ↗</button></div>`}).join('')}</div>`;$$('.bank-start').forEach(x=>x.onclick=()=>{bank=x.dataset.bank;topic='all';mode='practice';index=0;search='';filter='all';refresh()});$$('.bank-read').forEach(x=>x.onclick=()=>{refBank=x.dataset.bank;refPage=1;mode='reference';refresh()})}
function renderReference(){const b=banks.find(b=>b.id===refBank)||banks[0];$('#library').innerHTML=`<div class="reference-controls"><select id="refBank" aria-label="选择原资料">${banks.map(b=>`<option value="${b.id}" ${b.id===refBank?'selected':''}>${esc(b.name)}</option>`).join('')}</select><button id="refPrev" ${refPage===1?'disabled':''}>←</button><span>${refPage} / ${b.pages} 页</span><button id="refNext" ${refPage===b.pages?'disabled':''}>→</button></div><img class="ref-image" src="assets/${refBank}_p${refPage}.jpg" alt="原资料第${refPage}页">`;$('#refBank').onchange=e=>{refBank=e.target.value;refPage=1;renderReference()};$('#refPrev').onclick=()=>{refPage--;renderReference()};$('#refNext').onclick=()=>{refPage++;renderReference()};$('.ref-image').onclick=e=>showImage(e.target.src)}
$$('.nav').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;topic=bank='all';search='';filter='all';index=0;refresh()});$('#bankFilter').innerHTML='<option value="all">全部题库</option>'+banks.filter(b=>questions.some(q=>q.bank===b.id)).map(b=>`<option value="${b.id}">${esc(b.name)}</option>`).join('');$('#bankFilter').onchange=e=>{bank=e.target.value;index=0;refresh()};$('#statusFilter').onchange=e=>{filter=e.target.value;index=0;refresh()};$('#search').oninput=e=>{search=e.target.value;index=0;filtered();shown=false;renderQuestion()};$('#shuffle').onclick=()=>{if(list.length){index=list.length>1?(index+1+Math.floor(Math.random()*(list.length-1)))%list.length:0;shown=false;renderQuestion()}};$('#order').onclick=()=>{index=0;shown=false;renderQuestion()};
$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({version:1,...state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='研习题库-两科学习记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('学习记录已导出')};$('#import').onclick=()=>$('#importFile').click();$('#importFile').onchange=async e=>{try{let d=JSON.parse(await e.target.files[0].text());if(d.version!==1||!d.records||typeof d.records!=='object')throw Error();const ids=new Set(DATA.questions.map(q=>q.id));for(const [id,r]of Object.entries(d.records)){if(ids.has(id)&&r&&typeof r==='object')state.records[id]={note:typeof r.note==='string'?r.note:'',done:r.done===true,wrong:r.wrong===true}}persist();refresh();toast('学习记录已导入')}catch{toast('导入失败：请选择本站导出的记录文件')}e.target.value=''};
$('#coverage').innerHTML=`收录 ${banks.length} 份不同资料，共 ${banks.reduce((n,b)=>n+b.pages,0)} 页。<br>题目按 OCR 初步分类；有疑问请对照原页。<br>答案以原附答案为主，未附答案明确标注。`;
$('#topicFilter').innerHTML='<option value="all">全部知识点</option>'+topics.map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('');$('#topicFilter').onchange=e=>{topic=e.target.value;index=0;refresh()};
filtered();if(state.lastBySubject[subject]){const i=list.findIndex(q=>q.id===state.lastBySubject[subject]);if(i>=0)index=i}refresh();

function syncSidebar(){
 const collapsed=state.sidebarCollapsed===true;
 document.body.classList.toggle('sidebar-collapsed',collapsed);
 const button=$('#sidebarToggle');
 button.textContent=collapsed?'☰':'‹';
 button.title=collapsed?'展开侧栏':'收起侧栏';
 button.setAttribute('aria-label',button.title);
 button.setAttribute('aria-expanded',String(!collapsed));
 $('#studySidebar').inert=collapsed;
}
$('#sidebarToggle').onclick=()=>{state.sidebarCollapsed=!state.sidebarCollapsed;persist();syncSidebar()};
syncSidebar();
