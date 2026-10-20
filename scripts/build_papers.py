# coding:utf-8
"""Reviewed exam blueprints. Reuse complete worked solutions; new English MCs are authored."""
from pathlib import Path
import json,re
p=Path(__file__).resolve().parents[1]/'practice'
d=json.loads((p/'catalog.json').read_text('utf8')); answers=json.loads((p/'answers.json').read_text('utf8'))
qs={q['id']:q for q in d['questions']}; banks={b['id']:b for b in d['banks']}; pool={}
def original(id):
 q=qs[id]
 pool[id]={'id':id,'topic':q['topic'],'markdown':q['markdown'],'answer':answers[id],'source':banks[q['bank']]['name']+' · 第 '+str(q['page'])+' 页 · '+q['label'],'kind':'题库原题','sourceId':id}
 return id
def slot(points,*ids):return {'points':points,'candidates':[original(id) if id in qs else id for id in ids]}
def section(name,slots):return {'name':name,'slots':slots}
def authored(id,topic,body,answer,source):
 pool[id]={'id':id,'topic':topic,'markdown':body,'answer':answer,'source':source,'kind':'依据考点新编'}
 return id
# New problems supply alternative, unambiguous sufficient-statistic / Bayesian models.
authored('paper-sufficient-poisson','st-sufficient',r'设 $X_1,\ldots,X_n$ 独立同分布于 $P(\lambda)$，$\lambda>0$。证明 $T=\sum X_i$ 是 $\lambda$ 的充分统计量。',r'**1. 写联合分布。** $p_\lambda(x_1,\ldots,x_n)=e^{-n\lambda}\lambda^{\sum x_i}/\prod x_i!$，支持集是非负整数向量，与参数无关。\n\n**2. 因子分解。** 取 $g_\lambda(T)=e^{-n\lambda}\lambda^T$，$h(x)=1/\prod x_i!$。参数与样本的联系只通过 $T$，由因子分解定理，$T$ 充分。'.replace('\\n','\n'),'参照 2017 年卷充分性证明题型；Poisson 模型新编')
authored('paper-bayes-normal','st-bayes',r'设给定 $\mu$ 时，$X_1,\ldots,X_n$ 独立同分布于 $N(\mu,4)$，先验为 $\mu\sim N(1,4)$。求 $\mu$ 的后验分布及平方损失下的 Bayes 估计。',r'**1. 似然乘先验。** 忽略与 $\mu$ 无关的因子，后验核为 $\exp\{-[\sum_i(x_i-\mu)^2+(\mu-1)^2]/8\}$。\n\n**2. 配方。** 二次项系数为 $n+1$，一次项为 $-2(\sum x_i+1)\mu$。因此 $\mu\mid x\sim N((n\bar x+1)/(n+1),4/(n+1))$。\n\n**3. 点估计。** 平方损失的 Bayes 估计为后验均值 $(n\bar x+1)/(n+1)$，是样本均值与先验均值的加权平均。'.replace('\\n','\n'),'改编自 2017 年卷正态后验题，调整先验均值与方差')
subjects={}
subjects['numerical']={'name':'数值分析','minutes':150,'note':'依据 2020 年卷的求根、LU、插值、拟合、求积与常微分方程主线，补入题库选择题及迭代法。2020 原卷不是三类题型，以下为按本项目要求调整的 100 分综合模拟格式，非历年原卷复刻；不含优化补充专题。','sections':[
 section('一、选择题（每题 3 分，共 15 分）',[slot(3,'b2-p1-1','b2-p18-1'),slot(3,'b2-p1-3'),slot(3,'b2-p18-3'),slot(3,'b2-p18-extra6'),slot(3,'b2-p18-5')]),
 section('二、填空题（每题 3 分，共 15 分；多空均分）',[slot(3,'b0-p1-2','b1-p8-1'),slot(3,'b1-p8-2','b0-p1-7'),slot(3,'b0-p1-3','b1-p8-3'),slot(3,'b0-p1-9','b0-p1-12'),slot(3,'b0-p1-13')]),
 section('三、计算与证明（每题 10 分，共 70 分）',[slot(10,'b3-p1-extra2','sup-review-5'),slot(10,'b1-p1-7','b3-p1-3'),slot(10,'b1-p8-9','sup-review-11'),slot(10,'sup-review-13','sup-review-12'),slot(10,'b3-p2-1','sup-review-17'),slot(10,'b1-p2-3','sup-review-19'),slot(10,'b3-p2-4','sup-review-24')])]}
subjects['statistics']={'name':'数理统计','minutes':120,'note':'沿用 2017 级《数理统计理论与方法》卷结构：填空 20 分、选择 15 分、六道大题 10+10+10+10+10+15 分。保留充分性、点估计、区间、后验、检验、正交设计主线；题目从已整理资料精选或改编。非参数检验和回归等请继续用完整题库复习，本卷不声称覆盖所有考点。','sections':[
 section('一、填空题（共 20 分；各题分值见题旁，多空均分）',[slot(6,'s1-p1-1'),slot(4,'s1-p1-2'),slot(4,'s1-p1-3'),slot(2,'s1-p1-4'),slot(4,'s1-p1-5')]),
 section('二、选择题（每题 3 分，共 15 分）',[slot(3,'s1-p1-6','s2-p1-1'),slot(3,'s1-p2-1','s2-p1-4'),slot(3,'s1-p2-2','s2-p2-1'),slot(3,'s1-p2-3','s2-p1-8'),slot(3,'s2-p2-6','s2-p2-5')]),
 section('三、计算与证明（前五题各 10 分，末题 15 分，共 65 分）',[slot(10,'s1-p2-5','paper-sufficient-poisson'),slot(10,'s2-p4-3','s2-p4-5'),slot(10,'s2-p4-7','s2-p4-8'),slot(10,'s1-p2-8','paper-bayes-normal'),slot(10,'s1-p3-1','sup-stat2014-7'),slot(15,'s1-p3-2','s2-p5-4')])]}
# Two original sentences per unit, one unambiguous correct word and grammatical distractors.
rows=[
('u1a','The invention achieved an ______ level of efficiency.','unprecedented',['skeptical','finite','thermal'],'前所未有的效率；unprecedented 表示从未有过的，修饰 level。','Scientists remain ______ about claims unsupported by evidence.','skeptical',['thermal','metabolic','finite'],'skeptical about 是“对……持怀疑态度”，remain 后接形容词。'),
('u1b','Heavy ______ brought enough rain for the crops.','precipitation',['extraction','permeability','dissipation'],'precipitation 指降水，与 rain 和 crops 的语境一致。','A material that allows water to pass through it is ______.','permeable',['viable','staggering','favorable'],'permeable 表示可渗透的；题干给出的定义就是允许水穿过。'),
('u2a','Factories must reduce carbon ______ to slow climate change.','emissions',['incomes','salaries','predictions'],'carbon emissions 指碳排放；reduce 后接名词复数。','The release of greenhouse gases is called an ______.','emission',['allocation','income','equation'],'emission 是排放；题干给出 release of gases 的定义。'),
('u2b','Using resources faster than nature replaces them is ______.','unsustainable',['renewable','balanced','sustainable'],'消耗超过自然补充速度，因此不可持续，un- 表示否定。','A plan that can continue without exhausting resources is ______.','sustainable',['unsustainable','impossible','temporary'],'不耗尽资源并能持续，符合 sustainable（可持续）的定义。'),
('u3a','Three hours have ______ since the experiment began.','elapsed',['allocated','trimmed','extracted'],'时间流逝用 elapse；have 后用过去分词 elapsed。','Only a minute had ______ before the alarm rang.','elapsed',['distributed','inherited','allocated'],'主语是时间，搭配 elapse；过去完成时 had elapsed。'),
('u3b','The bushes were ______ to keep them neat and short.','trimmed',['elapsed','inherited','allocated'],'修剪灌木用 trim；were 后的 trimmed 构成被动语态。','We ______ the hedge yesterday to remove its excess growth.','trimmed',['elapsed','inherited','allocated'],'去掉多余枝叶是修剪；yesterday 要求过去式 trimmed。'),
('u4a','Funds have been ______ to the new research project.','allocated',['elapsed','eroded','inherited'],'allocate funds to 表示向……分配资金，have been 后接过去分词。','The committee ______ money to each laboratory last week.','allocated',['elapsed','eroded','dissipated'],'给各实验室分配资金是 allocate；last week 用过去式。'),
('u4b','The statement is ______ false; the evidence clearly disproves it.','blatantly',['genetically','thermally','metabolically'],'blatantly 表示明显地、公然地，修饰 false；其余为专业方式副词。','He ______ ignored the rule in front of everyone.','blatantly',['genetically','thermally','metabolically'],'当着所有人的面公然忽视规则，用 blatantly 修饰 ignored。')]
mc=[]
for unit,sentence,word,distractors,why,s2,w2,d2,why2 in rows:
 ids=[]
 for j,(stem,w,ds,explain) in enumerate([(sentence,word,distractors,why),(s2,w2,d2,why2)]):
  options=ds[:]; k=(len(mc)+j)%4;options.insert(k,w);letter='ABCD'[k]
  id='paper-en-'+unit+'-'+str(j)
  authored(id,'en-words',stem+'\n\n'+'\n'.join('- '+a+'. '+b for a,b in zip('ABCD',options)),f'**答案：{letter}. {w}。**\n\n1. 根据句意判断：{explain}\n2. 核对词性与句法位置，再把词填回句子。\n\n'+stem.replace('______',w),f'新探索 {unit.upper()} 词汇考点新编；不是原课件原句')
  ids.append(id)
 mc.append(slot(2,*ids))
fill=[slot(3,'en-'+u+'-p1-1','en-'+u+'-p1-2') for u in ['u1a','u1b','u2a','u2b','u3a','u3b','u4a','u4b']]
# Prefer complementary vocabulary sentences in the fixed paper.
subjects['english']={'name':'英语','minutes':90,'note':'现有英语资料是新探索 U1—U4 的 A/B 篇练习及句式讲解，没有可核实的历年考试卷。此处为课程资料综合模拟格式：8 道词汇选择 16 分、8 道选词填空 24 分、4 道英译汉 40 分、2 道句式分析 20 分。词汇题覆盖八篇课文，翻译与长难句练分层理解。','sections':[section('一、词汇选择（每题 2 分，共 16 分）',mc),section('二、选词填空（每题 3 分，共 24 分）',fill),section('三、英译汉（每题 10 分，共 40 分）',[slot(10,'en-u1a-p3-2','en-u1a-p3-1'),slot(10,'en-u2b-p3-1','en-u2a-p3-1'),slot(10,'en-u3a-p4-3','en-u3a-p3-1'),slot(10,'en-u4b-p4-4','en-u4a-p3-1')]),section('四、句式分析（每题 10 分，共 20 分）',[slot(10,'en-u1b-p5-analysis','en-u2b-p6-analysis'),slot(10,'en-u3a-p8-analysis','en-u3b-p8-analysis')])]}


# Resolve known defects before these items can be used in a scored paper.
q=pool['b2-p1-3'];q['markdown']=q['markdown'].replace('- D. $l_0(x_0)=1,\ l_1(x_1)=1$','- D. $l_0(x_0)=1,\ l_1(x_1)=0$').replace('\n\n> 原文 C、D 相同。','');q['answer']=r'**答案：C。** 两个互异节点下，$l_0(x)=(x-x_1)/(x_0-x_1)$，$l_1(x)=(x-x_0)/(x_1-x_0)$。代入各自节点得到 $l_0(x_0)=l_1(x_1)=1$；代入另一节点则为 0。本卷修正了原题重复选项。';q['kind']='原题勘误改编'
q=pool['b0-p1-2'];q['markdown']+='\n\n约定：两个输入都是近似数，各自绝对误差不超过末位单位的一半；求按误差上界能够保证的有效数字位数。';q['kind']='原题补充误差约定'
q=pool['b1-p8-1'];q['markdown']=r'设 $x$ 是 $\sqrt{2021}$ 的 $n$ 位有效数字近似值，采用误差上界 $|x-\sqrt{2021}|\le \frac12\times10^{2-n}$。要求由该误差上界保证相对误差小于 $0.1\%$，至少取 $n=$ ______。';q['kind']='原题明确误差上界改编'
q=pool['s2-p2-1'];q['markdown']=r'正态总体方差 $\sigma^2$ 已知，置信度不变。将独立样本量由 $n$ 增为 $4n$，总体均值的双侧置信区间长度变为原来的（　）。'+'\n\n- A. 2 倍\n- B. 1/2\n- C. 1/4\n- D. 不变';q['answer']=r'**答案：B。** 区间为 $\bar X\pm z_{1-\alpha/2}\sigma/\sqrt n$（此处 $z_p$ 为下侧累积概率 $p$ 的分位数），长度 $L=2z_{1-\alpha/2}\sigma/\sqrt n$。新长度除以旧长度为 $\sqrt n/\sqrt{4n}=1/2$。样本均值影响中心，不影响已知方差时的长度。';q['kind']='依据原题区间长度考点改编'
q=pool['s2-p2-5'];q['markdown']='显著性水平用于控制下列哪一种错误的概率上界？\n\n- A. 原假设为假却不拒绝\n- B. 原假设为真却拒绝\n- C. 原假设为真且不拒绝\n- D. 原假设为假且拒绝';q['answer']=r'**答案：B。** 第一类错误是 $H_0$ 真时拒绝 $H_0$，显著性水平 $\alpha$ 控制这一概率的上界；A 是第二类错误，C、D 是正确决策。';q['kind']='原题明确概率含义改编'
q=pool['sup-review-13'];q['answer']=q['answer'].replace('设所求多项式系数为未知量，把题给函数值及导数值逐一代入。',r'由 $P(0)=P^{\prime}(0)=0$，设 $P(x)=ax^4+bx^3+cx^2$。其余条件给出 $a+b+c=1$、$4a+3b+2c=1$、$16a+8b+4c=1$。第二式减去第一式的两倍得 $2a+b=-1$；第三式减去第一式的四倍得 $12a+4b=-3$，故 $a=1/4,b=-3/2,c=9/4$。')
q=pool['s1-p3-2'];q['answer']=q['answer'].replace('I、II、III','I、II').replace('|---|---|---|---|---|','|---|---|---|---|---|').replace('|1.0|','|1|').replace('|2.0|','|2|').replace('C > A > B > D','C > A > B = D').replace('$A_1.0$$B_1.0$$C_2.0$$D_2.0$',r'$A_1B_1C_2D_2$');q['answer']=re.sub(r'(?<=\|)\n\s*\n(?=\|)','\n',q['answer']);q['kind']='题库原题，参考解答勘误'

# Add reasoning to the courseware translations instead of showing only a finished translation.
translation_steps={
'en-u1a-p3-2':('主干是 Soil erosion is a global problem。','破折号解释 erosion；the consequences of which 指这一全球问题的后果，采用“其后果……”顺译。'),
'en-u1a-p3-1':('主干是 A landmark new report was released，报告被发布。','on biodiversity and ecosystem 修饰 report；warning 为补充说明，译作“发出警告”，不要误当第二个独立谓语。'),
'en-u2b-p3-1':('主干为 the redistribution of income might achieve …。','not only … but also … 并列效果；for developing economies 只限定后面的减贫效果；保留 might 的可能性。'),
'en-u2a-p3-1':('主干为 City clusters and the intended urbanization may foster economic growth。','for 引出原因；with higher incomes 修饰城市居民；more than rural dwellers 比较的是消费，译文补出比较关系。'),
'en-u3a-p4-3':('第一句讲行为受基因差异影响；第二句主干为 The ways … are … functions of …。','in which 引出修饰 ways 的定语从句；to a large extent 表示程度；functions of 在此表示取决于，不能译为数学函数。'),
'en-u3a-p3-1':('主干为 Scientists have long hypothesized a connection。','第一个 which 指前述关联假说；on lead’s effects 修饰 research；第二个 which 修饰 research；that 引出研究内容，按层次分句翻译。'),
'en-u4b-p4-4':('主干为 this linked-health phenomenon was frequently found in couples。','who 修饰 couples；coinciding … 补充说明结果与既有研究一致；what 从句作 with 的宾语。'),
'en-u4a-p3-1':('主干是 Some experts say，that 从句给出专家的观点。','that 从句主语是 globalization and increasing automation；have led to 是已经导致；in some corners of the world 修饰发生范围，勿译成全部地区。')}
for id,steps in translation_steps.items():
 pool[id]['answer']='### 解题步骤\n\n1. '+steps[0]+'\n2. '+steps[1]+'\n3. 检查限定语、时态、指代和逻辑关系是否漏译，最后调整为通顺中文。\n\n'+pool[id]['answer']+'\n\n**自评建议（10 分）：** 主干准确 4 分，修饰与逻辑完整 4 分，表达通顺 2 分；合理同义译法均可。'
for id in ['en-u1b-p5-analysis','en-u2b-p6-analysis','en-u3a-p8-analysis','en-u3b-p8-analysis']:
 pool[id]['answer']+='\n\n**作答顺序：** 先写主句主语及谓语，再圈出从句引导词或倒装标志，最后说明修饰对象与逻辑关系。\n\n**自评建议（10 分）：** 主干 4 分，结构还原和指代 4 分，含义说明 2 分。'
# The passive construction has a subject and predicate, not an active SVO structure.
pool['en-u3b-p8-analysis']['answer']=pool['en-u3b-p8-analysis']['answer'].replace('此句为主谓宾结构','此句主干为被动结构：')

for sub,c in subjects.items():
 assert sum(s['points'] for section in c['sections'] for s in section['slots'])==100
 for section_ in c['sections']:
  for s in section_['slots']:
   for id in s['candidates']:assert id in pool and pool[id]['answer'],id
config={'version':2,'subjects':subjects,'questions':pool}
(p/'papers.json').write_text(json.dumps(config,ensure_ascii=False,indent=2),'utf8')
(p/'papers-data.js').write_text('const PAPERS='+json.dumps(config,ensure_ascii=False)+';','utf8')
for sub,c in subjects.items():
 paper=['# '+c['name']+' · 精选模拟押题卷',c['note'],f"满分 100 分；建议 {c['minutes']} 分钟。分值为复习模拟分配，非官方评分标准。"]
 solution=['# '+c['name']+' · 模拟卷参考解答','分步核对，自行评阅；以下解析不是官方评分细则。'];n=0
 for section_ in c['sections']:
  paper+=['## '+section_['name']]
  for s in section_['slots']:
   n+=1;q=pool[s['candidates'][0]];paper += [f"### {n}（{s['points']} 分）",q['markdown']];solution += [f'## {n}',q['answer'],'来源：'+q['source']]
 (p/'markdown'/ (c['name']+'模拟押题卷.md')).write_text('\n\n'.join(paper),'utf8')
 (p/'markdown'/ (c['name']+'模拟押题卷答案.md')).write_text('\n\n'.join(solution),'utf8')
print('Generated',len(pool),'reviewed pool items',[(s,sum(len(x['slots']) for x in c['sections'])) for s,c in subjects.items()])
