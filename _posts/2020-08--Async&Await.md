---
layout: post
title:  "Javascript 中的 Async 和 Await 是什麼"
subtitle: "也是一個非同步的相關技術喔"
date:   2020-08-08 11:54:08 +0800
categories: jekyll update
---

<br>

## Async？ Await？ 翻譯翻譯！

Async：非同步

Await：等待

所以"非同步"和"等待"在 `Javascript` 中又扮演著什麼樣的角色呢？

## 什麼是 Async 和 Await？

在 `Javascript` 的 ES7 中出現了 async、await，主要目的就和 `ES6` 出現的 `promise` 一樣，為了讓這些非同步的語法寫得更易讀懂而出現。

## Async 的寫法

```js
async function a(){
  await b();
  .....       // 等 b() 完成後才會執行
  await c();
  .....       // 等 c() 完成後才會執行
  await new Promise(resolve=>{
    .....
  });
  .....       // 上方的 promise 完成後才會執行
}
a();
a().then(()=>{
  .....       // 等 a() 完成後接著執行
});
```

只要 function 標記為 async，就表示裡頭可以撰寫 await 的同步語法，而 await 顧名思義就是「等待」，它會確保一個 promise 物件都解決 ( resolve ) 或出錯 ( reject ) 後才會進行下一步，當 async function 的內容全都結束後，會返回一個 promise，這表示後方可以使用.then語法來做連接，基本的程式長相就像下面這樣：
