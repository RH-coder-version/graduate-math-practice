const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const storage=new Map(),c={localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},console};
vm.createContext(c);for(const f of ['papers-data.js','papers.js'])vm.runInContext(fs.readFileSync('practice/'+f,'utf8'),c);
const data=JSON.parse(fs.readFileSync('practice/papers.json','utf8'));
assert.equal(vm.runInContext('JSON.stringify(PAPERS)',c),JSON.stringify(data));
for(const subject of Object.keys(data.subjects)){
 const signatures=new Set();for(let seed=0;seed<200;seed++){
 const sections=vm.runInContext(`PaperPractice.build('${subject}',true,${seed})`,c),qs=sections.flatMap(s=>s.items);
 assert.equal(qs.reduce((n,q)=>n+q.points,0),100);assert.equal(new Set(qs.map(q=>q.id)).size,qs.length);
 assert(qs.every(q=>q.answer&&q.markdown&&q.source));
 assert.deepEqual(sections.map(s=>s.items.length),vm.runInContext(`PAPERS.subjects.${subject}.sections.map(s=>s.slots.length)`,c));
 if(subject==='numerical')assert.equal(new Set(qs.map(q=>q.topic)).size,8);
 signatures.add(qs.map(q=>q.id).join('|'));
 }
 assert(signatures.size>150,subject+' must vary question selection');
 const fixed=vm.runInContext(`PaperPractice.build('${subject}',false,1)`,c);
 assert.equal(JSON.stringify(fixed),vm.runInContext(`JSON.stringify(PaperPractice.build('${subject}',false,42))`,c));
}
global.markdownit=require('../practice/vendor/node_modules/markdown-it');global.katex=require('../practice/vendor/node_modules/katex');vm.runInThisContext(fs.readFileSync('practice/markdown-render.js','utf8'));
for(const [id,q]of Object.entries(data.questions)){for(const text of [q.markdown,q.answer])assert(!renderMarkdown(text).includes('katex-error'),id+' invalid formula')}
assert.throws(()=>vm.runInContext('PaperPractice.validateImport({version:1,attempts:[{}]})',c));
console.log('PASS: 600 random papers, 100-point totals, stable section sizes, no duplicate IDs, numerical topic coverage, random diversity, fixed papers, formula rendering, invalid import rejection');
