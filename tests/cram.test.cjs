const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const load=n=>JSON.parse(fs.readFileSync(`practice/${n}.json`,'utf8'));
const d=load('catalog'),a=load('answers'),c=load('cram'),q=new Map(d.questions.map(x=>[x.id,x]));
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('practice/cram.js','utf8')+';this.exported=CRAM',ctx);
assert.deepEqual(JSON.parse(JSON.stringify(ctx.exported)),c,'browser and JSON selections must match');
const seen=new Set();
for(const [subject,plan] of Object.entries(c.subjects)){
 assert(plan.items.length>0);
 for(const item of plan.items){
  assert(q.has(item.id),`missing question: ${item.id}`);assert(!seen.has(item.id),`duplicate: ${item.id}`);seen.add(item.id);
  assert.equal(q.get(item.id).subject,subject);assert.equal(q.get(item.id).topic,item.topic);
  assert(a[item.id]?.trim(),`answer missing: ${item.id}`);assert(item.reason&&item.skills.length&&item.minutes>0);
 }
 const actual=new Set(plan.items.map(i=>i.topic));
 const expected=new Set(d.questions.filter(x=>x.subject===subject).map(x=>x.topic));
 assert.deepEqual(actual,expected,`${subject}: every populated chapter needs a representative`);
}
const englishBanks=new Set(c.subjects.english.items.map(i=>q.get(i.id).bank));
assert.equal(englishBanks.size,8,'all eight English source texts represented');
assert(seen.size<d.questions.length/5,'sprint should be substantially smaller than full bank');
console.log(`PASS: ${seen.size} curated questions; topic coverage, unique IDs, answers, source breadth and JS parity`);
