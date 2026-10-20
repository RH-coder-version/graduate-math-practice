// Exercise real state transitions in an isolated in-memory DOM/storage harness.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes=new Map(),storage=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{textContent:'',innerHTML:'',hidden:false,value:'',dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},querySelector(){return null},scrollIntoView(){}});return nodes.get(id)}
function boot(){const c={document:{querySelector:el,querySelectorAll:()=>[],body:el('body')},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout(){},renderMarkdown:s=>s,console};vm.createContext(c);for(const f of ['data.js','answers.js','knowledge.js','cram.js','app.js'])vm.runInContext(fs.readFileSync('practice/'+f,'utf8'),c);return c}
let c=boot();const run=s=>vm.runInContext(s,c);
run("mode='cram';subject='numerical';selectData();topic=bank='all';filter='all';search='';index=0;refresh()");
assert.equal(run('list.length'),33);
const first=run('list[0].id'),second=run('list[1].id');
run("$('#notes').oninput({target:{value:'isolated test note'}})");run(`markQuestion(${JSON.stringify(first)},'done')`);
assert.equal(run('list[index].id'),second);assert.equal(run(`rec(${JSON.stringify(first)}).note`),'isolated test note');assert.equal(run('shown'),false);
run(`markQuestion(${JSON.stringify(second)},'wrong')`);assert.equal(run('list[index].id'),run('list[2].id'));
run("filter='wrong';index=0;refresh()");assert.equal(run('list.length'),1);assert.equal(run('list[0].id'),second);
run(`markQuestion(${JSON.stringify(second)},'wrong')`);assert.equal(run('list.length'),0);
run("filter='todo';index=0;refresh()");assert.equal(run('list.length'),32);
run("mode='practice';filter='all';refresh()");assert.equal(run('list.length'),364);assert(run(`rec(${JSON.stringify(first)}).done`));
run("mode='cram';filter='all';refresh();switchSubject('english')");assert.equal(run('mode'),'cram');assert.equal(run('list.length'),18);
run('index=5;renderQuestion()');const resume=run('list[index].id');c=boot();assert.equal(run('mode'),'cram');assert.equal(run('list[index].id'),resume);assert.equal(run('shown'),false);
run("index=list.length-1;renderQuestion();markQuestion(list[index].id,'done')");assert.equal(run('index'),17);
console.log('PASS: shared notes, completion, auto-next, wrong-only removal, todo filter, full-bank return, cross-subject mode, refresh resume, last-item boundary');
