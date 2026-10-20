// Integration tests run the shipped UI handlers in an isolated DOM/storage model.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const storage=new Map();let nodes,c;
function el(id){if(!nodes.has(id))nodes.set(id,{textContent:'',innerHTML:'',hidden:false,value:'',dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},setCustomValidity(s){this.validation=s},querySelector(){return null},querySelectorAll(selector){const attribute=selector.slice(1,-1);return [...this.innerHTML.matchAll(new RegExp(attribute+'="([^"]+)"','g'))].map(m=>{const n=el(attribute+'='+m[1]);const key=attribute.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase());n.dataset[key]=m[1];return n})},scrollIntoView(){}});return nodes.get(id)}
function boot(){nodes=new Map();c={document:{querySelector:el,querySelectorAll:()=>[],body:el('body')},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout(){},renderMarkdown:s=>s,console};vm.createContext(c);for(const f of ['data.js','answers.js','knowledge.js','cram.js','papers-data.js','papers.js','app.js'])vm.runInContext(fs.readFileSync('practice/'+f,'utf8'),c)}
const run=s=>vm.runInContext(s,c), saved=()=>JSON.parse(storage.get('study-paper-attempts-v1'));
boot();run("mode='mock';switchSubject('numerical')");assert.equal(run('mode'),'mock');assert.equal(el('#workspace').hidden,true);assert.equal(el('.stats').hidden,true);
let a=saved().attempts[0],id=a.sections[0].items[0].id;
assert(!el('#paperWorkspace').innerHTML.includes('查看本题答案与步骤'));
let note=el('data-paper-note='+id);note.value='测试推导记录';note.oninput();assert.equal(saved().attempts[0].notes[id],'测试推导记录');
boot();assert.equal(run('mode'),'mock');assert(el('#paperWorkspace').innerHTML.includes('测试推导记录'));assert(!el('#paperWorkspace').innerHTML.includes('查看本题答案与步骤'));
el('#paperSubmit').onclick();assert(el('#paperWorkspace').innerHTML.includes('查看本题答案与步骤'));let score=el('data-paper-score='+id);score.value='3';score.oninput();assert.equal(saved().attempts[0].scores[id],3);score.value='999';score.oninput();assert.equal(saved().attempts[0].scores[id],3);assert(score.validation);
const wrong=el('data-paper-wrong='+id);wrong.checked=true;wrong.onchange();assert.equal(saved().attempts[0].wrong[id],true);
run("mode='randomPaper';refresh()");const oldRandom=saved().attempts[0];el('#newPaper').onclick();assert.equal(saved().attempts.length,3);assert.notEqual(saved().attempts[0].id,oldRandom.id);assert.notDeepEqual(saved().attempts[0].sections,oldRandom.sections);assert.equal(saved().attempts.find(x=>x.id===a.id).notes[id],'测试推导记录');
run("switchSubject('english')");assert.equal(run('mode'),'randomPaper');assert(el('#paperWorkspace').innerHTML.includes('22 题'));run("switchSubject('statistics')");assert(el('#paperWorkspace').innerHTML.includes('16 题'));
run("mode='mock';switchSubject('numerical')");assert(el('#paperWorkspace').innerHTML.includes('测试推导记录'));assert(el('#paperScore').textContent.includes('3 / 100'));assert.equal(run('Object.keys(state.records).length'),0);
const valid=saved();c.imported=valid;assert(run('PaperPractice.validateImport(imported)'));
console.log('PASS: paper mode and subject switching, auto-save, reload restoration, answers gated by submission, scores bounded, wrong flags, previous attempts preserved, independent bank records, backup validation');
