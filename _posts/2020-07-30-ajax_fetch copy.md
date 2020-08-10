---
layout: post
title:  "Javascript 中的 fetch 是什麼"
subtitle: "隨著Ajax的技術成熟，一些簡化Ajax使用方法的程式庫也相繼問世..."
date:   2020-07-30 18:54:08 +0800
categories: jekyll update
---

<br>

## 前言

隨著Ajax的技術成熟，一些簡化Ajax使用方法的程式庫也相繼問世。AJAX的方法也演進到不只單純的要求與回應，甚至還要能進一步的做資料處理，然而XHR的非同步程式結構並沒有提供這種方法。

接下來將介紹 Fetch

## 什麼是 Fetch

Fetch 是由 WHATWG（網頁超文字應用技術工作小組）制定的 HTML API。他包含了四個物件（Headers、Body、Request、Response），及一個一個全域的 `fetch()` 方法，必須填上一個 `資源路徑/網址` 的參數，可附加對應的屬性設定。

執行後就會送出 `request`，無論成功與否都會回傳一個帶有 `response` 的 `promise` 物件，回傳後再使用 `then()` 接收資料來使用或將回傳值傳遞下去，而後可以使用 `catch()` 接收錯誤資料。

<br>


<div style="display:none">

- Body

- Header

- Request

- Response

- Fetch request 屬性


|屬性|設定|預設|
|:-|:-|:-|
|url|網址，fetch裡第一個參數 ||
|method|發出請求方法 |get|
|headers|headers 相關物件 |{ }|
|mode|cors、no-cors、same-origin、navigate |cors|
|referrer|no-referer、client、某網址 |client|
|credentials|omit、same-origin、include |omit|
|redirect|follow、error、manual |預設 manual|
|cache|default、no-store、reload、no-cache、force-cache |預設 default|
|body |要加到邀求中的內容| |

Response 物件中的 body 屬性提供了一個 ReadableStream 的實體
這個階段我們無法直接讀取資料內容，而 ReadableStream 物件中可用以下對應的方法來取得資料


https://jsonplaceholder.typicode.com/
</div>

這次使用的資料是：

[https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)

試著印出fetch看會是什麼：
```js
console.log((fetch('https://jsonplaceholder.typicode.com/todos/1')
```

結果會得到一個Promise物件
```js
Promise {<pending>}
```

<br>

我們嘗試來接收資料（fetch預設為get）：

```js
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
```

印出的結果：

```json
{userId: 1, id: 1, title: "delectus aut autem", completed: false}
```

<br>
---
<br>

fetch get 的寫法

```js
fetch('https://sample.com/api/')
// API，預設為 get 方法
  .then(res => res.json())
  // 轉換 ReadableStream 物件
  .then(data => console.log(data))
  // 成功則執行此函式
  .catch(err => console.log(err));
  // 失敗則執行此函式
```

fetch post 的寫法

```js
fetch('https://sample.com/api/', {
  method: 'POST',
  // 將方法改為 POST
  headers: { 'Content-Type': 'application/json' },
  // 設定 Header
  body: JSON.stringify(data),
  // 將資料內容轉換為 JSON 字串
}).then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

為什麼回傳的要是 `Promise` 物件呢？

## Promise

>Promise 是用來改善中 JavaScript 非同步的程式碼結構，讓程式碼更易讀。

在 Ajax 的行為中，需要確保擷取到遠端資料才繼續往下執行時，如果程式碼是依序撰寫，就會無法正確呈現資料，這時只能使用 `callback function` ，當 `callback function` 的層數越多時，就會出現難以讀懂的 `Callback hell`，而不是以then、catch這樣順序接下去。

```js
a(function(FromA){
  ...
  b(FromA, function(FromB){
    ...
    c(FromB, function(FromC){
      ...
      d(FromC, function(FromD){
        ...
        console.log(FromD)
      })
    })
  })
});
```
