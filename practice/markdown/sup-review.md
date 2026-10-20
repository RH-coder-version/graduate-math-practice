# 补充 · 数值分析复习参考

## sup-review-1 | error | 第1题 | 1

设 $x>0$，$x$ 的相对误差限为 $\delta$，求 $\ln x$ 的误差。

## sup-review-2 | error | 第2题 | 1

设 $x=-2.18$ 和 $y=2.1200$ 都是由准确值经四舍五入得到的近似值，求绝对误差限 $\varepsilon(x)$ 与 $\varepsilon(y)$。

## sup-review-3 | error | 第3题 | 1

设 $x_1=1.21,x_2=3.65,x_3=9.81$ 都具有三位有效数字，估计 $x_1(x_2+x_3)$ 的误差限和有效数字位数。

## sup-review-4 | root | 第4题 | 1

证明 $1-x-\sin x=0$ 在 $[0,1]$ 上有一根。用二分法求误差不大于 $\frac12\times10^{-4}$ 的根，需要二分多少次？

## sup-review-5 | root | 第5题 | 1

用牛顿迭代法求 $x^3-7=0$ 的近似值。取 $x_0=2$，当两次相邻迭代之差的绝对值小于 $0.0001$ 时停止。

## sup-review-6 | direct | 第6题 | 1

用 Doolittle 分解解 $Ax=b$，其中 $$A=\begin{pmatrix}1&2&1&-2\\2&5&3&-2\\-2&-2&3&5\\1&3&2&3\end{pmatrix},\quad b=\begin{pmatrix}4\\7\\-1\\0\end{pmatrix}.$$

## sup-review-7 | direct | 第7题 | 1

设 $P\in\mathbb R^{n\times n}$ 非奇异，$\|x\|$ 是 $\mathbb R^n$ 上的一种向量范数。定义 $\|x\|_P=\|Px\|$，证明它也是向量范数。

## sup-review-8 | direct | 第8题 | 1

设 $A=\begin{pmatrix}100&99\\99&98\end{pmatrix}$，求 $\operatorname{Cond}_1(A)$ 与 $\operatorname{Cond}_\infty(A)$。

## sup-review-9 | direct | 第9题 | 2

设 $A$ 为 $n$ 阶上三角矩阵，主对角线全为 $1$，严格上三角元素全为 $-1$，下三角元素为 $0$。令 $x=(1,1/2,1/4,\ldots,1/2^{n-1})^T$。求：（1）$Ax,\|Ax\|_2,\|x\|_2$；（2）$\|A^{-1}\|_\infty$；（3）$\operatorname{Cond}_\infty(A)$。

## sup-review-10 | iteration | 第10题 | 2

对方程组 $$\begin{cases}5x_1+2x_2+x_3=-12,\\-x_1+4x_2+2x_3=20,\\2x_1+3x_2+10x_3=3,\end{cases}$$ 写出 Jacobi 与 Gauss–Seidel 迭代格式，讨论收敛性。

## sup-review-11 | iteration | 第11题 | 2

设 $Ax=b$ 的系数矩阵为 $$A=\begin{pmatrix}a&1&3\\1&a&2\\-3&2&a\end{pmatrix}.$$ 求使 Jacobi 迭代收敛的实数 $a$ 的范围。

## sup-review-12 | interpolation | 第12题 | 2

已知数据 $(x_i,y_i)=(1,1),(2,3),(4,4),(5,2)$，求拉格朗日插值多项式、牛顿插值多项式及三次自然样条插值函数。

## sup-review-12-extra | interpolation | 第12-extra题 | 3

已知数据 $(x_i,y_i)=(-3,2),(-2,0),(1,3),(4,1)$，求三次自然样条插值函数。

## sup-review-13 | interpolation | 第13题 | 3

求次数不高于 $4$ 的多项式 $P(x)$，使 $P(0)=0,P\prime(0)=0,P(1)=1,P\prime(1)=1,P(2)=1$，并写出插值余项。

## sup-review-14 | interpolation | 第14题 | 4

设 $x_0,\ldots,x_n$ 为互异节点，$\omega(x)=\prod_{j=0}^n(x-x_j)$。证明 $$f[x_0,\ldots,x_n]=\sum_{k=0}^n\frac{f(x_k)}{\omega\prime(x_k)}.$$

## sup-review-15 | interpolation | 第15题 | 4

利用 $\sqrt{100}=10,\sqrt{121}=11$ 构造线性插值计算 $\sqrt{115}$，估计误差并指出有效数字位数。

## sup-review-16 | fitting | 第16题 | 4

用最小二乘法求解 $$\begin{cases}2x+4y=11,\\3x-5y=3,\\x+2y=6,\\4x+2y=14.\end{cases}$$

## sup-review-17 | fitting | 第17题 | 4

根据下表拟合 $\ln N=a+bt$（使用题给 $\ln N$ 数值）。

|$t$|1991|1992|1993|1994|1995|1996|
|---|---|---|---|---|---|---|
|$N$|11.58|11.72|11.85|11.98|12.11|12.24|
|$\ln N$|2.4493|2.4613|2.4723|2.4832|2.4940|2.5047|

## sup-review-18 | fitting | 第18题 | 4

数据为 $(x_i,y_i)=(1,10),(2,30),(3,50),(4,80)$。求最小二乘拟合函数 $P(x)=a+bx^2$。

## sup-review-19 | integration | 第19题 | 4

确定 $$\int_{-h}^h f(x)\,dx\approx A_{-1}f(-h)+A_0f(0)+A_1f(h)\quad(h>0)$$ 的系数，使代数精度尽可能高，并给出代数精度。

## sup-review-21 | integration | 第21题 | 4

计算 $\int_1^3\frac1y\,dy$，采用 Romberg 算法的 $R_1$。

> 原资料未定义 $R_1$ 的下标约定。解答列出完整外推表，并说明采用的记号。

## sup-review-23 | ode | 第23题 | 5

用改进欧拉法求 $y\prime=y-ty^2,\ y(0)=1$ 在 $[0,1]$ 上的数值解，步长 $h=0.1$。

## sup-review-24 | ode | 第24题 | 5

证明 $$y_{n+1}=\frac13(4y_n-y_{n-1})+\frac23h y\prime_{n+1}$$ 是二阶公式。

## sup-review-25 | ode | 第25题 | 5

分析线性多步法 $$y_{n+1}+(b-1)y_n-by_{n-1}=\frac h4[(b+3)f_{n+1}+(3b+1)f_{n-1}]$$ 的阶数。原资料声称“$b\ne1$ 时为二阶，$b=-1$ 时为三阶”，请用泰勒展开核对。

## sup-review-26 | ode | 第26题 | 5

取 $h=0.2$，用欧拉方法求 $$y\prime=-y-xy^2,\quad y(0)=1,\quad 0\le x\le1.$$
