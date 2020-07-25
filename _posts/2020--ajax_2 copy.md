---
layout: post
title:  "AJAX fetch"
subtitle: "隨著Ajax的技術成熟，一些簡化Ajax使用方法的程式庫也相繼問世，其中你又知道了多少呢？"
date:   2020-07-25 17:18:05 +0800
categories: jekyll update
---

<br>

## 前言

隨著Ajax的技術成熟，一些簡化Ajax使用方法的程式庫也相繼問世。AJAX的方法也演進到不只單純的要求與回應，甚至還要能進一步的做資料處理，然而XHR的非同步程式結構並沒有提供這種方法。

接下來將介紹 Fetch

## 什麼是 Fetch

Fetch 是由 WHATWG（網頁超文字應用技術工作小組）制定的 HTML5 API。Fetch 提供了一個全域的 `fetch()` 方法，需填上網址和對應的屬性設定，執行後就會送出 `request`，並且回傳一個帶有 `response` 物件的 `promise`  `ReadableStream` 實體，再使用 `then()` 接收資料或將回傳值傳遞下去，而後使用 `catch()` 接收錯誤資料。

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


fetch get

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

fetch post

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
