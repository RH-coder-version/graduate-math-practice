'use strict';
// Concise coverage map aligned with every topic in the local catalog and lessons.
const KNOWLEDGE_MAP={
error:['观测误差、截断误差、舍入误差；绝对误差与相对误差；有效数字。','用末位半单位估计输入误差；用微分传播误差；区分条件数与算法稳定性。','接近零时慎用相对误差；相近数相减易丢失有效数字。'],
root:['二分法、不动点迭代、Newton 法；根的存在唯一性与收敛阶。','先找变号区间；检查区间映射与压缩条件；Newton：$x_{k+1}=x_k-f(x_k)/f^{\\prime}(x_k)$。','Newton 二阶收敛需要单根等条件；相邻迭代差不自动等于真误差。'],
direct:['高斯消元、列主元、Doolittle / Crout 分解；向量与矩阵范数、条件数。','先分解，再前代与回代；$\\kappa(A)=\\|A\\|\\|A^{-1}\\|$ 衡量问题敏感程度。','分清哪个三角矩阵对角为 1；换行后记住置换；病态与算法不稳定不同。'],
iteration:['Jacobi、Gauss–Seidel；迭代矩阵、谱半径；幂法求主特征值。','写成 $x^{(k+1)}=Bx^{(k)}+g$；任意初值收敛的充要条件为 $\\rho(B)<1$。','GS 立即使用本轮新分量；严格对角占优是充分条件；幂法需主特征值及初向量条件。'],
interpolation:['Lagrange、Newton 差商、Hermite、分段线性与三次样条。','互异节点唯一确定次数不超过 n 的插值多项式；余项用导数与节点乘积；重节点对应导数条件。','差商不是普通差分；Hermite 余项要计重数；样条须补边界条件。'],
fitting:['离散最小二乘、连续最佳平方逼近、正交多项式；非线性模型线性化。','最小化残差平方和，解正规方程；连续情形用积分内积，误差与逼近空间正交。','拟合不要求穿过数据点；对数变换改变误差尺度；MSE 与无偏方差估计分母不同。'],
integration:['梯形、Simpson、复化求积、待定系数与代数精度；Gauss、Romberg；数值微分。','逐个检验单项式确定精度；由误差限反推步长；差分近似导数，外推消去低阶误差。','复化 Simpson 子区间数须为偶数；节点数比区间数多 1；微分步长过小会放大舍入误差。'],
ode:['显式/隐式 Euler、改进 Euler、梯形、Runge–Kutta、多步法。','先写递推再列表；Taylor 展开判阶；用测试方程判断绝对稳定域，多步法还需根条件。','单步残差阶与全局精度不同；隐式格式要解新时刻未知量；精度高不代表稳定。'],
other:['补充优化：线性规划标准型、单纯形、对偶；梯度与 Newton 优化方向；跨章节综合题。','先识别变量、目标与约束，再选算法；最速下降方向为负梯度，Newton 方向解 Hessian 方程。','优化补充是否考试以课程范围为准；此目录也含待校核题，先核对原题条件。'],
'st-basic':['条件概率、独立性、全概率与 Bayes 公式；分布函数、密度、期望方差；统计量、样本均值与方差。','先辨抽样方式和分布；独立样本均值方差为 $\\sigma^2/n$，无偏样本方差分母为 $n-1$。','互斥不等于独立；统计量不能含未知参数；概率密度不是单点概率。'],
'st-sampling':['正态样本均值与方差独立；正态、卡方、t、F 抽样分布；最大/最小次序统计量。','标准化均值；$(n-1)S^2/\\sigma^2\\sim\\chi^2(n-1)$；独立标准正态与卡方构造 t，两个独立卡方构造 F。','记录分位数是上尾还是下尾；交换 F 分子分母要交换自由度；最大值分布函数为 $F(x)^n$。'],
'st-sufficient':['充分性：压缩样本而保留参数信息；完备性：期望恒为零推出统计函数几乎处处为零。','因子分解证明充分；用恒等式证明完备；Rao–Blackwell 改进估计，充分完备统计量给出唯一 UMVU。','充分不自动完备；支持集依赖参数时不能丢弃指示函数；无偏性仍需验证。'],
'st-point':['矩估计、极大似然；无偏性、相合性、有效性、均方误差；Fisher 信息与 Cramér–Rao 界。','用理论矩等于样本矩；写似然、求极值并检查边界；$MSE=\\operatorname{Var}+\\text{偏差}^2$。','极值点未必极大；MLE 不一定无偏；使用信息不等式须检查正则条件。'],
'st-bayes':['先验 × 似然 → 后验；共轭更新；损失函数与 Bayes 决策。','正态模型配方；平方损失取后验均值，绝对损失取后验中位数。','先验方差与总体方差分开；后验密度须归一化；不能一概把后验众数当 Bayes 估计。'],
'st-interval':['正态总体均值、方差；两总体均值差与方差比；置信水平与区间宽度。','构造枢轴量并反解：均值用 Z/t，方差用卡方，方差比用 F；检查独立性及等方差前提。','双侧用两端分位数；反解不等式注意倒数方向；频率学置信度指区间构造的覆盖率。'],
'st-test':['原假设与备择、第一/二类错误、显著性水平、功效、p 值；Z/t/卡方/F 检验。','写假设 → 选统计量 → 定拒绝域 → 代数据 → 回答实际问题；先定单侧还是双侧。','未拒绝不等于证明原假设；p 值不是原假设为真的概率；方差已知与未知不能混用。'],
'st-nonparam':['Pearson 拟合优度；分类频数与期望频数；符号检验、秩检验的基本思想。','拟合优度用 $\\sum(O-E)^2/E$；常规自由度为类别数减 1 再减估计参数数。','期望频数过小需合理合并类别；合并后重算自由度；非参数不等于无前提。'],
'st-anova':['单因素与双因素方差分析；平方和分解、自由度、均方与 F 比。','单因素 $SST=SSA+SSE$，$F=MS_A/MS_E$；检查独立、正态、等方差假定。','显著只说明不全相等；无重复双因素加性模型不能单独分离交互作用与误差。'],
'st-regression':['一元线性回归、相关系数、残差；回归显著性检验；均值响应区间与个体预测区间。','斜率 $\\hat\\beta_1=L_{xy}/L_{xx}$，截距 $\\bar y-\\hat\\beta_1\\bar x$；用平方和表和 t/F 检验评估模型。','相关不等于因果；个体预测区间更宽；谨慎向观测范围之外外推。'],
'st-design':['正交表、因素、水平、列分配；水平和/均值、极差、因素排序与组合选优。','按水平分组求均值与极差；“看一看”挑已测最佳组，“算一算”拼各因素最佳水平。','先判断指标越大还是越小越好；极差相等应并列；新组合需确认试验，极差不等于显著性。'],
'st-other':['综合主线：总体与抽样 → 统计量分布 → 参数估计 → 区间与检验 → 实际解释。','先列已知/未知参数、样本条件、分布假定、分位数约定，再选公式。','这是综合检查清单，当前没有独立题目；不要把前提不同的公式直接拼接。'],
'en-words':['U1—U4 A/B 篇词汇；词义与搭配；名词单复数、动词时态/语态、形容词与副词、否定词缀。','先看空格语法位置，再用上下文定词义，最后改词形并通读全句。','选词正确也可能词形错误；助动词后、完成时、被动语态分别检查；注意固定介词搭配。'],
'en-translation':['英译汉：主干、修饰语、指代与逻辑；定语/名词性从句、分词、并列与插入成分。','先找主谓，再分层处理从句；落实逻辑和指代，最后调整中文语序并查漏译。','保留否定、程度、可能性和比较关系；术语按语境处理；译文通顺不能以丢失信息为代价。'],
'en-syntax':['长难句：否定词前置倒装、条件倒装、强调句、形式主语、嵌套定语从句、with 复合结构。','找限定动词和主句；还原倒装/强调结构；逐层标出从句修饰对象与连接关系。','不要把分词当独立谓语；区分 while 的转折/让步；区分强调句 it 与形式主语 it。']
};
function renderKnowledgeMap(){
 state.knowledgeChecks=state.knowledgeChecks||{};
 const scoped=topics.filter(t=>KNOWLEDGE_MAP[t.id]),missing=state.mapOnlyMissing===true;
 const checked=scoped.filter(t=>state.knowledgeChecks[t.id]).length;
 const routes={numerical:[['error','root'],['error','direct','iteration'],['interpolation','fitting','integration','ode'],['other']],statistics:[['st-basic','st-sampling','st-sufficient'],['st-point','st-bayes','st-interval','st-test'],['st-nonparam','st-anova','st-regression','st-design'],['st-other']],english:[['en-words','en-syntax','en-translation']]};
 $('#mapWorkspace').innerHTML=`<div class="map-intro"><h2>${subjectName()} · 考前知识图谱</h2><p>按现有题库与讲义整理，箭头表示建议复习顺序；不等同于完整考试大纲。先遮住讲义口述方法，再标记自查通过。</p><div class="map-routes">${routes[subject].map(route=>`<div>${route.map(id=>`<a href="#map-${id}" data-map-jump="${id}">${esc(topics.find(t=>t.id===id).name)}</a>`).join('<span aria-hidden="true"> → </span>')}</div>`).join('')}</div><div class="map-controls"><strong>自查通过 ${checked} / ${scoped.length} 类</strong><label><input id="mapMissing" type="checkbox" ${missing?'checked':''}> 只看待复习</label><span>自查标记保存在本机，与做题完成状态分开</span></div></div><div class="map-grid">${scoped.filter(t=>!missing||!state.knowledgeChecks[t.id]).map(t=>{const pool=questions.filter(q=>q.topic===t.id),wrong=pool.filter(q=>rec(q.id).wrong).length;return `<article class="map-card" id="map-${t.id}"><h3>${esc(t.name)}</h3>${KNOWLEDGE_MAP[t.id].map((text,i)=>`<div class="map-point"><strong>${['核心内容','必会方法','易错提醒'][i]}</strong><div class="markdown-body">${renderMarkdown(text)}</div></div>`).join('')}<div class="map-card-actions"><label><input type="checkbox" data-map-check="${t.id}" ${state.knowledgeChecks[t.id]?'checked':''}> 自查通过</label><button class="secondary" data-map-practice="${t.id}" ${pool.length?'':'disabled'}>${pool.length?`去练习 ${pool.length} 题`:'暂无独立题目'}${wrong?` · 错题 ${wrong}`:''}</button></div><details class="map-lesson"><summary>展开知识讲解与例题</summary><div class="markdown-body">${renderMarkdown(KNOWLEDGE[t.id])}</div></details></article>`}).join('')||'<p class="map-empty">本学科已全部标记自查通过，取消“只看待复习”可再次检查。</p>'}</div>`;
 $$('[data-map-jump]').forEach(el=>el.onclick=e=>{e.preventDefault();state.mapOnlyMissing=false;persist();renderKnowledgeMap();$('#map-'+el.dataset.mapJump).scrollIntoView({behavior:'smooth',block:'start'})});
 $('#mapMissing').onchange=e=>{state.mapOnlyMissing=e.target.checked;persist();renderKnowledgeMap()};
 $$('[data-map-check]').forEach(el=>el.onchange=()=>{state.knowledgeChecks[el.dataset.mapCheck]=el.checked;persist();renderKnowledgeMap()});
 $$('[data-map-practice]').forEach(el=>el.onclick=()=>{topic=el.dataset.mapPractice;mode='practice';bank='all';filter='all';search='';index=0;refresh();$('#questionCard').scrollIntoView({behavior:'smooth',block:'start'})});
}
