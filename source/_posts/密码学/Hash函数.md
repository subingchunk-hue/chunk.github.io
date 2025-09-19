---
title: Hash函数
date: 2025-04-03 13:01:00
tags: [密码学，笔记]
categories: [密码学]
---

#### 定义
###### Hash函数的定义
- 是一个高效的确定性函数，将一个长消息映射成固定长度的输出
- H:  M -> Y  (|M| >> |Y|)
- 输入称为消息，输出称为散列值

###### 碰撞的定义   
<img src="/chunk.github.io/images/e2c15ff3309e15af09a22730126e51ca.jpg" alt="e2c15ff3309e15af09a22730126e51ca" style="zoom:50%;" />

###### Hash函数的安全性
* 安全的Hash函数的性质
  - 原像稳固
    * 给定散列值 y ∈ Y ，要找到一个消息m ∈ M，使得 H(m)=y 是计算上不可行的
    *  单向性
  * 第二原像稳固
    * 给定一个消息m ∈ M，要找到另一个消息m’ ∈ M (m != m’) ，使得H(m)=H(m’) 是计算上不可行的
    * 弱抗碰撞性
  * 碰撞稳固
    * 找到一对消息 m, m’ ∈ M (m != m’) ，使得 H(m)=H(m’) 是计算上不可行的
    * 最容易找到的——若Hash满足该性质，则称为强抗碰撞性
* 抗碰撞Hash函数
  * 设 H 是 Hash函数，如果所有高效的攻击者 A 能够找到碰撞的概率是可忽略的，则称 H 为 抗碰撞Hash函数 
  * 具有的性质：碰撞稳固、第二原像稳固
  * 在实际应用中会同时设计成原像稳固的
* 若Hash函数设计的好，则不能绕过H算散列值
<img src="/chunk.github.io/images/913cd75c4986e285b7e1a3b2433936af.jpg" alt="913cd75c4986e285b7e1a3b2433936af" style="zoom:50%;" />

###### 全域Hash函数
     H：M->X（X为TDP的定义域）
#### 生日攻击—找到两个碰撞
- 目的
> 设散列值是n比特，构造两个不同的消息 m₀、m₁ ，使 m₀和m₁ 具有相同的散列值。
- 攻击步骤
   1. 随机产生k个消息，计算他们的散列值
   2. 如果存在两个不同消息是碰撞，则输出这两个消息，攻击结束
   3. 否则继续步骤1
- ==要达到 O(2ⁿ) 安全性，选择的Hash函数的散列值长度应该是2n比特==
#### 经典算法
1. MD5
   * MD5不是加密算法！
   * 不建议使用
2. SHA系列
   - 不建议使用SHA-0,SHA-1
   - 使用SHA2时，建议使用 SHA-512/224、SHA-512/256
#### Merkle-Damgard 迭代技术
`大多数实用的抗碰撞hash函数都是采用迭代技术构造的`
###### MD迭代
- 定义
>  利用处理短消息的抗碰撞Hash函数，通过迭代技术，构造可以处理长消息的抗碰撞Hash函数。
- 原理

  <img src="/chunk.github.io/images/250e6955e1a5e1959e1ddfe257e91876.jpg" alt="250e6955e1a5e1959e1ddfe257e91876" style="zoom:50%;" />

  <img src="/chunk.github.io/images/2130cb3262029735358924b7f1e9720f.jpg" alt="2130cb3262029735358924b7f1e9720f" style="zoom:50%;" />

  <img src="/chunk.github.io/images/2faec96dc25455e1687799cc9bf9f78d.jpg" alt="2faec96dc25455e1687799cc9bf9f78d" style="zoom:50%;" />

- 安全性
  * 如果压缩函数 h 是碰撞稳固的, MD迭代技术构造的 H 是抗碰撞Hash函数
  * 只需考虑如何构造碰撞稳固的压缩函数 h: T × X ⟶ T

###### Davies-Meyer压缩函数
- 构造
  <img src="/chunk.github.io/images/8ee0406acd8c652573eb3346b742d1e5.jpg" alt="8ee0406acd8c652573eb3346b742d1e5" style="zoom:50%;" />
- 例题
  `如果 h(Hᵢ, mᵢ) = E(mᵢ,Hᵢ) ，那么h就不是碰撞稳固的。`
          要找一对h的碰撞 (H₀, m₀) 和(H₁, m₁) ，可以选随机找 H₀, m₀和m₁ ，然后构造H₁ = _______________________。
  <img src="/chunk.github.io/images/7db57374fd9c0ec297e4ef03c2eaa5a2.jpg" alt="7db57374fd9c0ec297e4ef03c2eaa5a2" style="zoom: 50%;" />
