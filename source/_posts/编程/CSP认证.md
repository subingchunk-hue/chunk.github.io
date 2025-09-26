---
title: CSP认证
date: 2025-08-30 9:23:00
tags: [CSP认证，洛谷，编程]
categories: [CSP认证，编程]
---

## 第36次CSP认证

#### [移动](https://sim.csp.thusaac.com/contest/36/problem/0)

```c++
#include<iostream>
using namespace std;
int dx = 0, dy = 0;
int main() {

    int n, k;
    cin >> n >> k;
    while (k--) {
        int x, y;
        string s;
        cin >> x >> y >> s;
        dx = x;
        dy = y;
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == 'f') dy = y + 1;
            else if (s[i] == 'b') dy = y - 1;
            else if (s[i] == 'l') dx = x - 1;
            else if (s[i] == 'r') dx = x + 1;

            if (dx <= n && dx >= 1 && dy <= n && dy >= 1) {
                x = dx;
                y = dy;
            }
            else {
                dx = x;
                dy = y;
            }
        }
        cout << x << " " << y << endl;
    }
    return 0;
}
```

#### [梦境巡查](https://sim.csp.thusaac.com/contest/36/problem/1)

每个区域要给出的：$a_0,a_1,a_2,...,a_n$

每个区域能得到的：$b_0,b_1,b_2,...,b_n$，其中$b_0=0$

初始能量$w_0=w$，在每个区域要保证$w_{i}-a_i+b_i≥0$，其中$w_i=w-∑(a_i-b_i),i∈[0,i-1]$

即w的最小值为$max(∑(a_i-b_i)),i∈[0,i]$，也就是$c[i]=a[i]-b[i]$的最大前缀和

如果$b[i]$变为0，对$[0,i-1]$区间内的最大值没有影响，而对$[i,n]$区间内，要加上$b[i]$（必须要多带这么多才能保证都大于0）

如何更新这个最大值-------用$premax[i]$存前$[0,i]$个里最大的$pre[i]$，但当$b[i]=0$时，我们需要找到$[i,n]$内的最大值，可以再用一个$sufmax[i]$存该区间内的最大的$pre[i]$，最后统计w的最大值时考虑$sufmax[i]+b[i]与premax[i-1]$的最大值。

##### [前缀和]()

```c++
#include<iostream>
#include<vector>
#include<algorithm>
#include<climits>
using namespace std;
using ll = long long;
int main() {
	ios::sync_with_stdio(0);
	cin.tie(0); cout.tie(0);

	int n;
	cin >> n;
	vector<int> a(n + 1, 0);
	vector<int> b(n + 1, 0);
	vector<ll> pre(n + 1, 0);
	for (int i = 0; i <= n; i++) cin >> a[i];
	pre[0] = a[0];
	for (int i = 1; i <= n; i++) {
		cin >> b[i];
		pre[i] = pre[i-1] + a[i] - b[i];
	}
	vector<ll> premax(n + 2, LLONG_MIN);
	vector<ll> sufmax(n + 1, 0);
	premax[0] = pre[0];
	sufmax[n] = pre[n];
	for (int i = 1; i <= n; i++) premax[i] = max(premax[i - 1], pre[i]);
	for (int i = n-1; i>=0; i--) sufmax[i] = max(sufmax[i + 1], pre[i]);

	for (int i = 1; i <= n; i++)	cout << max(premax[i - 1], sufmax[i] + b[i]) << " ";


	return 0;
}
```

#### [缓存模拟](https://sim.csp.thusaac.com/contest/36/problem/2)

略~~

#### [跳房子](https://sim.csp.thusaac.com/contest/36/problem/3)

考虑dp，对于每个格子，第一次跳到他时的步数肯定是最小的，即在一次变动之后，只有当此处还没更新最小步数时才会动规$dp[v]=dp[u]+1$，即由u到v。

使用set将未被访问过的格子存起来。

对每次前进，可能前进的范围大小为$[i+1,min(n,i+k[i])]$，在这范围之间的格子，如果没被访问过则他的最小步数一定是$dp[i]+1$，用队列存入已经走过的格子，广度搜索。

```c++
#include<iostream>
using namespace std;
#include<set>
#include<algorithm>
#include<queue>
#include<cstring>
#include<cmath>
const int N = 1e5+5;
typedef long long ll;
int dp[N];

ll a[N], k[N];
ll n;
int main() {
	cin >> n;
	for (int i = 1; i <= n; i++) cin >> a[i];
	for (int i = 1; i <= n; i++) cin >> k[i];
	memset(dp, -1, sizeof(dp));
	dp[1] = 0;
	queue<int> q;
	q.push(1);
	set<int> p;
	for (int i = 2; i <= n; i++) p.insert(i);
	while (!q.empty()) {
		ll u = q.front();
		q.pop();
		ll l = u + 1, r = min(n, u + k[u]);
		if (l > r) continue;
		auto it = p.lower_bound(l);
		while (it != p.end() && *it <= r) {
			ll j = *it;
			ll pos = j - a[j];
			if (dp[pos] == -1) {
				dp[pos] = dp[u] + 1;
				q.push(pos);
			}
			it = p.erase(it);
		}
	}
	cout << dp[n];
	return 0;
}
```

#### [梦魔](https://sim.csp.thusaac.com/contest/36/problem/4)

（现在解不了）

## 第35次CSP认证

#### [密码](https://sim.csp.thusaac.com/contest/35/problem/0)

```c++
#include<iostream>
using namespace std;
#include<unordered_map>
int main() {
	unordered_map<char, int> a;
	int n;
	cin >> n;
	while (n--) {
		string s;
		cin >> s;
		bool flag = false;
		bool flag1 = false, flag2 = false, flag3 = false;
		a.clear();
		for (int i = 0; i < s.size(); i++) {
			auto it = a.find(s[i]);
			if (it != a.end()) a[s[i]]++;
			else a.insert({ s[i],1 });
			if (a[s[i]] > 2) flag = true;
			if (s[i] >= 'a' && s[i] <= 'z') flag1 = true;
			else if (s[i] >= 'A' && s[i] <= 'Z') flag1 = true;
			else if (s[i] >= '0' && s[i] <= '9') flag2 = true;
			else flag3 = true;
		}
		if (flag1 && flag2 && flag3) {
			if (flag) cout << "1" << endl;
			else cout << "2" << endl;
		}
		else cout << "0" << endl;
	}


	return 0;
}
```

#### [字符串变换](https://sim.csp.thusaac.com/contest/35/problem/1)

求k次变换后的结果，可以想到用快速幂优化！

字符串映射用哈希表存储，问题在于如何写函数的快速幂计算。

即已知$f[u]=v$后，我们需要存储$f(f(u))=f(v)$，这里就是对u进行了两次f变换

```c++
#include<iostream>
using namespace std;
#include<unordered_map>
using ll = long long;
string s;
unordered_map<char, char> f;
string solve(int k) {
	string res = s;
	unordered_map<char, char> cur_map = f;
	while (k) {
		if (k & 1) {
			for (int i = 0; i < res.size(); i++) 
				res[i] = cur_map[res[i]];
		}
		unordered_map<char, char> next_map;  //处理平方映射
		for (auto& e : cur_map) next_map[e.first] = cur_map[e.second];
		cur_map = next_map;
		k >>= 1;
	}
	return "#"+res+"#";
}
int main() {

	int n;
	getline(cin, s);
	s = s.substr(1, s.size() - 2);
	cin >> n;
	string tmp;
	getline(cin, tmp); // 处理换行
	for (char ch = 'a'; ch <= 'z'; ch++) f[ch] = ch;
	for (char ch = 'A'; ch <= 'Z'; ch++) f[ch] = ch;
	for (char ch = '0'; ch <= '9'; ch++) f[ch] = ch;
	f[' '] = ' ';
	for (int i = 1; i <= n; i++) {
		string line;
		getline(cin, line);
		f[line[1]] = line[2];
	}
	int m;
	cin >> m;
	while (m--) {
		ll k;
		cin >> k;
		cout << solve(k) << endl;
	}

	return 0;
}
```

#### [补丁应用](https://sim.csp.thusaac.com/contest/35/problem/2)

（还是不喜欢这种题，难啊）

#### [通讯延迟](https://sim.csp.thusaac.com/contest/35/problem/3)

根据题意很容易看出做法为建图用迪杰斯特拉算法求最短路径。

但如果考虑简单建图，会把基站覆盖的点两两相连每个基站覆盖 $k$个点时建$ O(k^2)$条边，当k很大时复杂度会很高。

则我们考虑用**[虚拟节点]()**：(通俗点说，就是bfs里的节点定义变一下) 

```c++
#include<iostream>
#include<vector>
#include<algorithm>
#include<queue>
#include<climits>
using namespace std;
using ll = long long;
struct station {
	ll x, y, r, t;
};
using pii = pair<ll, int>;
struct edge {
	ll to, w;
};
int main() {

	int n, m;
	cin >> n >> m;
	vector<ll> x(n + 1), y(n + 1);
	for (int i = 1; i <= n; i++) cin >> x[i] >> y[i];
	vector<station> sta(m + 1);
	for (int i = 1; i <= m; i++) cin >> sta[i].x >> sta[i].y >> sta[i].r >> sta[i].t;
	int N = n + m;
	vector<vector<edge>> adj(N + 1);
	for (int i = 1; i <= m; i++) {
		int virtual_id = n + i;
		ll x1 = sta[i].x - sta[i].r, x2 = sta[i].x + sta[i].r, y1 = sta[i].y - sta[i].r, y2 = sta[i].y + sta[i].r;
		for (int j = 1; j <= n; j++) {
			if (x[j] >= x1 && x[j] <= x2 && y[j] >= y1 && y[j] <= y2) {
				adj[virtual_id].push_back({ j,sta[i].t});
				adj[j].push_back({ virtual_id,0 });
			}
		}
	}

	vector<ll> dist(N + 1, LLONG_MAX);
	dist[1] = 0;
	priority_queue<pii,vector<pii>,greater<pii>> pq;
	pq.push({ 0,1 });
	while (!pq.empty()) {
		ll d = pq.top().first;
		int u = pq.top().second;
		pq.pop();
		if (d != dist[u]) continue;
		if (u == n) continue;

		for (auto& e : adj[u]) {
			int v = e.to;
			ll w = e.w;
			if (dist[v] > w + dist[u]) {
				dist[v] = w + dist[u];
				pq.push({ dist[v] ,v});
			}
		}
	}
	if (dist[n] == LLONG_MAX) cout << "Nan";
	else cout << dist[n];
	return 0;
}
```

#### [木板切割](https://sim.csp.thusaac.com/contest/35/problem/4)

你会吗？我不会？留存~

## 第34次CSP认证

[矩阵重塑一](https://sim.csp.thusaac.com/contest/34/problem/0)

```c++
#include<iostream>
#include<vector>
using namespace std;
int main() {

	int n, m, p, q;
	cin >> n >> m >> p >> q;
	vector<vector<int>> a(n, vector<int>(m));
	for (int i = 0; i < n; i++)
		for (int j = 0; j < m; j++)
			cin >> a[i][j];
	int count = 1;
	for(int i=0;i<n;i++){
		for (int j = 0; j < m; j++) {
			if ((count) % q == 0) cout << a[i][j] << endl;
			else cout << a[i][j] << " ";
			count++;
		}
	}

	return 0;
}
```

[矩阵重塑一](https://sim.csp.thusaac.com/contest/34/problem/1)

```c++
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, t;
    cin >> n >> m >> t;
    int N = n * m;
    vector<int> arr(N);
    for (int i = 0; i < N; i++) cin >> arr[i];

    int row = n, col = m;
    while (t--) {
        int op, a, b;
        cin >> op >> a >> b;
        if (op == 1) {
            row = a; col = b;
        } 
        else if (op == 2) {
            vector<int> tmp(N);
            for (int i = 0; i < row; i++) {
                for (int j = 0; j < col; j++) {
                    tmp[j * row + i] = arr[i * col + j];
                }
            }
            arr.swap(tmp);
            swap(row, col);
        } 
        else if (op == 3) {
            cout << arr[a * col + b] << "\n";
        }
    }
    return 0;
}
```

[文本分词](https://sim.csp.thusaac.com/contest/34/problem/2)

[货物调度](https://sim.csp.thusaac.com/contest/34/problem/3)

```c++

```

[哥德尔机](https://sim.csp.thusaac.com/contest/34/problem/4)





```
#include<iostream>
#include<vector>
#include<unordered_map>
using namespace std;
using ll = long long;

ll qmi(ll a, ll b) {
    ll ans = 1;
    while (b) {
        if (b & 1) {
            ans = ans * a;
        }
        a = a * a;
        b >>= 1;
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int q;
    cin >> q;
    while (q--) {
        ll n, k;
        cin >> n >> k;
        unordered_map<ll, ll> m;
        
        // 质因数分解
        for (ll i = 2; i <= n / i; i++) {
            if (n % i == 0) {
                while (n % i == 0) {
                    m[i]++;
                    n /= i;
                }
            }
        }
        if (n > 1) m[n]++;
        
        ll ans = 1;
        for (auto& p : m) {
            ll t = p.second;
            if (t >= k) {
                ans = ans * qmi(p.first, t);
            }
        }
        cout << ans << endl;
    }
    return 0;
}
```



---

[何以包邮？](https://www.acwing.com/problem/content/description/4703/)

0-1背包

```c++
#include<iostream>
#include<vector>
using namespace std;

int main() {

	int n, x;
	cin >> n >> x;
	vector<int> price(n, 0);
	int max_cost = 0;
	for (int i = 0; i < n; i++) {
		cin >> price[i];
		max_cost += price[i];
	}
	vector<bool> dp(max_cost+1, 0);
	dp[0] = 1;
	for (int i = 0; i < n; i++) {
		for (int j = max_cost; j >= price[i]; j--) {
			if (dp[j - price[i]]) dp[j] = 1;
		}
	}
	for (int i = x; i <= max_cost; i++)
		if (dp[i]) {
			cout << i;
			break;
		}
	return 0;
}
```

[未初始化警告](https://www.acwing.com/problem/content/4457/)

```c++
#include<iostream>
#include<unordered_map>
using namespace std;

int main() {
	int n, k;
	cin >> n >> k;
	unordered_map<int, int> m;
	int ans = 0;
	for (int i = 1; i <= k; i++) {
		int x, y;
		cin >> x >> y;
		if (m.find(y) == m.end()&&y!=0) ans++;
		m[x] = y;
	}
	cout << ans;

	return 0;
}
```

[邻域均值](https://www.acwing.com/problem/content/3415/)

```
#include<iostream>
#include<vector>
using namespace std;

int main() {
	int n, l, r, t;
	cin >> n >> l >> r >> t;
	vector<vector<int>> pre(n + 1, vector<int>(n + 1, 0));
	vector<vector<int>> arr(n + 1, vector<int>(n + 1, 0));
	for (int i = 1; i <= n; i++)
		for (int j = 1; j <= n; j++) {
			cin >> arr[i][j];
			pre[i][j] = pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1] + arr[i][j];
		}
	int ans = 0;
	for(int i=1;i <= n;i++)
		for (int j = 1; j <= n; j++) {
			int x1 = max(1, i - r), x2 = min(i + r, n);
			int y1 = max(1, j - r), y2 = min(j + r, n);
			int sum = pre[x2][y2] - pre[x1 - 1][y2] - pre[x2][y1 - 1] + pre[x1 - 1][y1 - 1];
			int count = (x2 - x1 + 1) * (y2 - y1 + 1);
			if (sum <= t * count) ans++;
		}
	cout << ans;
	return 0;
}
```

[如此编码](https://www.acwing.com/problem/content/4702/)

```
#include<iostream>
#include<vector>
using namespace std;

int main() {
	int n, m;
	cin >> n >> m;
	vector<int> a(n + 1, 0);
	vector<int> c(n + 1, 1);
	for (int i = 1; i <= n; i++) {
		cin >> a[i];
		c[i] = c[i - 1] * a[i];
	}
	vector<int> pre(n + 1, 0);
	for (int i = 1; i <= n; i++) {
		pre[i] = m % c[i];
	}
	for (int i = 1; i <= n; i++) cout << (pre[i] - pre[i - 1])/c[i-1] << " ";
	return 0;
}
```

[期末预测之安全指数](https://www.acwing.com/problem/content/3300/)

```c++
#include<iostream>
using namespace std;
const int N = 1e5 + 5;
int main() {

	int n;
	cin >> n;
	int w[N], score[N];
	int sum = 0;
	for (int i = 1; i <= n; i++) {
		cin >> w[i] >> score[i];
		sum += w[i] * score[i];
	}
	if (sum > 0) cout << sum;
	else cout << 0;
	return 0;
}
```

[出行计划](https://www.acwing.com/problem/content/description/4458/)

差分，把所有时刻可以满足的计划都存在b数组里（通过把区间内的数值+1）

真的很喜欢越界啊！！！！！！！！！！！！！！！！！！！

```c++
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

const int MAX = 200010;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    
    vector<int> t(n + 1), c(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> t[i] >> c[i];
    }
    vector<int> b(MAX + 10, 0);  
    
    for (int i = 1; i <= n; i++) {
        int l = t[i] - k - c[i] + 1;
        int r = t[i] - k;
        if (r < 1) continue;  
        l = max(1, l);
        r = min(MAX + 5, r); 
        if (l <= r) {  
            b[l]++;
            if (r + 1 < MAX + 10) {
                b[r + 1]--;
            }
        }
    }
    for (int i = 1; i < MAX + 10; i++)b[i] += b[i - 1];
    while (m--) {
        int q;
        cin >> q;
        if (q < 1 || q >= MAX + 10) {
            cout << 0 << endl;
        } else {
            cout << b[q] << endl;
        }
    }
    
    return 0;
}
```

