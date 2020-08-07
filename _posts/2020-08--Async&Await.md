---
layout: post
title:  "Javascript 中的 Async 和 Await 是什麼"
subtitle: "也是一個非同步的相關技術喔"
date:   2020-08-09 11:54:08 +0800
categories: jekyll update
---

<br>

## Async？ Await？ 翻譯翻譯！

Async：非同步

Await：等待

所以"非同步"和"等待"在 `Javascript` 中又扮演著什麼樣的角色呢？

## 什麼是 Async 和 Await？

在 `Javascript` 的 ES7 中出現了 async、await，主要目的就和 `ES6` 出現的 `promise` 一樣，為了讓這些非同步的語法寫得更易讀懂而出現。

## Async 和 await 的寫法

```js
async function a(){
  await b();
  ...       // 等 b() 完成後才會執行
  await c();
  ...       // 等 c() 完成後才會執行
  await new Promise(resolve=>{
    ...
  });
  ...       // 上方的 promise 完成後才會執行
}
a();
a().then(()=>{
  ...       // 等 a() 完成後接著執行
});
```

將 `async` 放在任意的 `function` 之前，此函式便會宣告為非同步函式，並且會回傳 `Promise` 物件

就表示裡頭可以撰寫 await 的同步語法，而 await 顧名思義就是「等待」，它會確保一個 promise 物件都解決 ( resolve ) 或出錯 ( reject ) 後才會進行下一步，當 async function 的內容全都結束後，會返回一個 promise，這表示後方可以使用.then語法來做連接，基本的程式長相就像下面這樣：


Await 關鍵字
在 async 函式中使用 await 關鍵字意味者：「我們請 JavaScript 等待這個非同步的作業完成，才展開後續的動作」
👉換句話說：await 讓 async 函式的執行動作暫停，等到它獲得回傳的 Promise 物件後--無論執行成功（fulfilled）或失敗（rejected）--才恢復執行 async 函式
👍優點 1：可以直接將使用 await 後獲得的回傳值存於一個變數中做後續使用，而不是再呼叫 then() 方法一個串一個：這讓程式碼看起來更像平常在處理「同步程式碼」一般，提升了易讀性與可維護性
👍優點 2：承接優點 1，由於我們將回傳的結果存於一個變數中，這個變數將可以在後續自由的被使用；然而若是透過 then() 方法獲取值來使用，這個值將無法再被帶往下個 then() 方法中使用--要的話也很麻煩
