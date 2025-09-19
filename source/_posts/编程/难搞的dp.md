---
title: 难搞的dp
date: 2025-09-07 14:41
tags: [编程，竞赛]
categories: [编程，《算法竞赛入门经典》]  
---

本文例题均来自于刘汝佳老师的《算法竞赛入门经典》，均可在 [UVa](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=827) 提交

## 引入

### DAG上的动态规划

#### Tips 1

很多动规的问题都可以转化为DAG上的动态规划，如：前一个矩形X可以嵌套进后一个Y，可以表示为X到Y有一条有向边，且构成的图是无环的。

#### Tips 2

如何输出字典序最小的满足条件的路径   ——  将所以dp[i]计算出来，然后从头开始遍历选择最大d[i]对应的最小i。

#### Tips 3

**填表法** → “DP 填表，每格依赖前格，按公式严格计算”

**刷表法** → “暴力/预处理，把所有可能的值算出来存表，不用公式严格依赖”

#### Tips 4

先找出当前状态有几个可以考虑的因素。

在判断定义dp数组为几维时，只需思考当前状态下什么或哪几个因素会影响到下一状态，然后定义出初始状态，并思考下一决策的可能情况。

### 例题

##### [UVa 1025 城市里的间谍](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=847&page=show_problem&problem=3466)

下一状态由当前状态的所处车站位置及已经过去的时间决定，则我们定义：`dp[i][j]：在时刻i位于车站最少还需要等待的时间`(保证可以成功会面即`i`最多为`t`)

边界条件：`dp[T][n]=0` ----- 已经到达目的地不需要再等待

输出数值：`dp[0][1]` ----- 从0时刻位于1站台最少等待时间

下一决策（考虑影响因素的变化情况）：

- 在该车站等一分钟 → `dp[i][j]=dp[i+1][j]+1`  → 计算`i`时刻必须要先知道`i+1`时刻，因此时间必须倒序考虑

- 搭往右走的火车 → `dp[i][j]=min(dp[i+a[j]][j+1],dp[i][j]`

- 搭往左走的火车 → `dp[i][j]=min(dp[i+a[j-1]][j-1],dp[i][j]` → 而站台序号则可正序可倒序

  即`dp[i][j]=min()`

```c++
for(int i=t-1;i>=0;i--){
	for(int j=1;j<=n;j++){
		dp[i][j]=min(dp[i+1][j]+1,dp[i][j]);
		if(j<n&&has_train[i][j][0]&&i+a[j]<=t) dp[i][j]=min(dp[i][j],dp[i+a[j]][j+1]);
		if(j>1&&has_train[i][j][1]&&i+a[j-1]<=t) dp[i][j]=min(dp[i][j],dp[i+a[j-1]][j-1]);
	}
}
```

其中，`has_train[i][j][1]`代表在i时刻的j站台有向左的火车可以搭，该数组可在输入左右火车的出发时间时进行统计。

```c++
 for (int i = 1; i <= m1; i++) {  //考虑每辆向右行驶的火车
            cin >> l[i];
            if (l[i] <= t) has_train为1[l[i]][1][0] = 1; // 设置站台1的停靠时间（一开始忘记了）
            int depart = l[i];  //该火车出发的时间
            for (int j = 1; j < n; j++) {  //该火车到达每个站台的时间，只要没超时就代表has_train为1
                depart += a[j];
                if (depart <= t) has_train[depart][j + 1][0] = 1;
                else break;
            }
        }
```

完整AC代码如下：

```c++
#include<iostream>
#include<cstring>
using namespace std;
int n, t;
int a[55]; //相邻两站台间的耗时
int m1, m2;
int l[55], r[55];
int dp[500][55];//dp[i][j]---时刻i位于站台j 到达站台n的最短时间
bool has_train[500][55][2];
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int index = 1;
    while (cin >> n && n) {
        cin >> t;
        a[0] = 0;
        for (int i = 1; i < n; i++) cin >> a[i];
        cin >> m1;
        memset(has_train, 0, sizeof(has_train));
        for (int i = 1; i <= m1; i++) {
            cin >> l[i];
            if (l[i] <= t) has_train[l[i]][1][0] = 1; // 设置站台1的停靠时间
            int depart = l[i];
            for (int j = 1; j < n; j++) {
                depart += a[j];
                if (depart <= t) has_train[depart][j + 1][0] = 1;
                else break;
            }
        }
        cin >> m2;
        for (int i = 1; i <= m2; i++) {
            cin >> r[i];
            if (r[i] <= t) has_train[r[i]][n][1] = 1; // 设置站台n的停靠时间
            int depart = r[i];
            for (int j = n; j > 1; j--) {
                depart += a[j - 1];
                if (depart <= t) has_train[depart][j - 1][1] = 1;
                else break;
            }
        }
        for (int i = 0; i <= t; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = 1e9;
        dp[t][n] = 0;
        for (int i = t - 1; i >= 0; i--)
            for (int j = 1; j <= n; j++) {
                dp[i][j] = min(dp[i][j], dp[i + 1][j] + 1);
                if (j < n && has_train[i][j][0] && i + a[j] <= t)
                    dp[i][j] = min(dp[i][j], dp[i + a[j]][j + 1]);
                if (j > 1 && has_train[i][j][1] && i + a[j - 1] <= t)
                    dp[i][j] = min(dp[i][j], dp[i + a[j - 1]][j - 1]);
            }
        cout << "Case Number " << index++ << ": ";
        if (dp[0][1] != 1e9) cout << dp[0][1] << endl;
        else cout << "impossible" << endl;
    }
    return 0;
}
```

##### [UVa 437 巴比伦塔](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=847&page=show_problem&problem=378)

砖的摆放很明显是完全随机的，唯一要满足的条件就是：上面的砖的底面长、宽必须严格小于下面砖的地面长、宽。

由于砖的尺度是三维，如果考虑用尺度来建dp数组（`dp[i][j][k]-长宽高分别为i,j,k的砖在顶部`）的话会很麻烦，因此我们考虑将尺度的三维减小维数，同时，由于砖的摆放限制条件很少，一块砖可以有三种摆放情况，考虑将每块砖的三种摆放情况都存入某数组，第三维的变量做高，这里为了方便，我们设定长>宽的条件。例如：砖(a,b,c)，假定`a>b>c`，则将其考虑为三块不同的砖`(a,b,c) (b,c,a) (a,c,b)`。并将所有的砖按长降序排列，若长相同则按宽降序排列。

定义`dp[i]`：排序后的第i块砖做顶砖时可以到达的最大高度。

转移条件：如果第`j(j<i)`块砖的长、宽严格大于第`i`块砖则`dp[i]=max(dp[i],dp[j]+i.height)`

初始状态：`dp[i]=i.height`，每块砖做顶砖时至少高度都为自己本身的高度

```c++
#include<iostream>
using namespace std;
#include<vector>
#include<cstring>
#include<algorithm>
struct block {
	int x, y, z;
};
bool cmp(const block& a,const block& b){
	if (a.x == b.x) return a.y > b.y;
	else return a.x > b.x;
}
int main() {
	int n;
	int index = 1;
	while (cin >> n && n) {
		vector<block> a;
		for (int i = 0; i < n; i++) {
			int x, y, z;
			cin >> x >> y >> z;
			a.push_back({ max(x,y),min(x,y),z });
			a.push_back({ max(x,z),min(x,z),y });
			a.push_back({ max(z,y),min(z,y),x });
		}
		int dp[90];
		sort(a.begin(), a.end(), cmp);
		for (int i = 0; i < a.size(); i++) dp[i] = a[i].z;
		for (int i = 0; i < a.size(); i++) {
			for (int j = 0; j < i; j++) {
				if (a[j].x > a[i].x && a[j].y > a[i].y) dp[i] = max(dp[i], dp[j] + a[i].z);
			}

		}
		int ans = 0;
		for (int i = 0; i < a.size(); i++) ans = max(ans, dp[i]);
		cout << "Case " << index++ << ": maximum height = " << ans << endl;
	}

	return 0;
}
```

##### [UVa 1347 旅行](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4093)

在解决此题前，先要了解下TSP问题的解法，然后变形为双人TSP问题。

###### TSP问题

给定图中n个点，从一个起点出发，要求访问所有点（每个点仅访问一次），求最短路径。
遍历顶点，找到最小值：

定义dp：`dp[mask][u]`----已经访问的点集合为`mask`，当前在点`u`的最小路径长度

初始化：`dp[1][0]=0; `  --- 从点0出发仅0被访问 

​               `             dp[mask][u]=INF;`  --- 初始化INF表示还未被计算

```c++
#include<iostream>
using namespace std;

const int INF = 1e9;
int n;
int cost[25][25];
int dp[1 << 20][25];  //顶点数不超过20

int main() {
    cin >> n;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            cin >> cost[i][j];
    int full = 1 << n;
    for (int mask = 0; mask < full; ++mask)
        for (int u = 0; u < n; ++u)
            dp[mask][u] = INF;
    dp[1][0] = 0;
	//遍历full种情况
    for (int mask = 0; mask < full; mask++)
        for (int u = 0; u < n; u++) { 
            if (!((mask >> u) & 1)) continue;  //选取在已访问点集中的点u
            for (int v = 0; v < n; v++) {  //从u点开始向外延申
                if (mask >> v & 1) continue;  //v被访问过了跳过
                int newmask = mask | 1 << v;  //更新点集
                dp[newmask][v] = min(dp[newmask][v], dp[mask][u] + cost[u][v]);  
            }
        }
    int res = INF;
    //1.必须回到起始点
    for (int u = 1; u < n; ++u)
        res = min(res, dp[full - 1][u] + cost[u][0]); //还要加上u回到原点的代价
	//2.只需要访问所有点，不用回到原点
	for (int u = 1; u < n; u++)
        res = min(res, dp[full - 1][u]);
    //3.指定终点为n-1
    res = dp[full - 1][n - 1];
    
    cout << res << endl;


    return 0;
}
```

###### 双人TSP问题

此题与一般TSP不同，指定必须要从左向右访问到最右边的结点再返回，而一般TSP的方向是任意的。

为了高效解决这个问题，我们将问题转化为：两个人从最左点同时出发，都严格向右移动，但沿着不同的路径访问点，最终都到达最右点。这样，两条路径覆盖所有点，且路径长度之和就是原问题中从最左点到最右点再返回最左点的总路径长度。

定义：`dp[i][j]--一个人到达第i个点，另一人到达第j个点，i<j（第一个人在前面），且前i个点都已经被访问了，此种状态下到达终点的最短路径`

转移条件：

- 第一个人继续往`i+1`个点走---`dp[i+1][j]=min(dp[i+1][j],dp[i][j]+cost[i][i+1])`
- 第二个人先去第`i+1`个点走---`dp[i+1][i]=min(dp[i+1][i],dp[i][j]+cost[j][i+1])`

初始条件：当i=n-2时，两个人的下一步都是到n-1的终点即

​                   `for(int j=0;j<n-2;j++) dp[n-2][j]=cost[n-2][n-1]+cost[j][n-1]`

```c++
#include<iostream>
#include<utility>
using namespace std;
#include<algorithm>
#include<vector>
#include<cmath>
#include<iomanip>
vector<pair<int,int>> a;
double func(pair<int, int> x, pair<int, int> y) {
	return sqrt((x.first - y.first) * (x.first - y.first) + (x.second - y.second) * (x.second - y.second));
}
int main() {
	int n;
	while (cin >> n) {
		a.resize(n);
		for (int i = 0; i < n; i++) cin >> a[i].first >> a[i].second;
		if (n == 1) cout << "0.00" << endl;
		else if (n == 2) cout << fixed << setprecision(2) << 2 * func(a[0], a[1]) << endl;
		else {
			vector<vector<double>> dp(n, vector<double>(n, 1e6));
			for (int j = 0; j < n - 2; j++) dp[n - 2][j] = func(a[n - 2], a[n - 1]) + func(a[j], a[n - 1]);
			for (int i = n - 3; i >= 1; i--)
				for (int j = 0; j < i; j++) {
					dp[i][j] = min(dp[i + 1][j] + func(a[i], a[i + 1]), dp[i + 1][i] + func(a[j], a[i + 1]));
				}
			cout << fixed << setprecision(2) << dp[1][0] + func(a[0], a[1]) << endl;
		}
	}

	return 0;
}
```

### 多阶段决策问题

