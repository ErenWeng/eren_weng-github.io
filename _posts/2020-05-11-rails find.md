---
layout: post
title:  "Rails find, find_by, take, where?"
subtitle: "想從資料庫找到資料但方法還是搞不清楚嗎？"
date:   2020-05-11 10:50:58 +0800
categories: jekyll update
---

### find

- 由物件的id，也就是主鍵（primary key）來尋找物件

{% highlight ruby %}
Client.find(10)
=> #<Client id: 10, first_name: "Ryan">

Items.find(params[:id])
=> #
{% endhighlight %}

- 但我想要找多個id呢？放上陣列吧

{% highlight ruby %}
Client.find([1, 10])
=> [#<Client id: 1, first_name: "Lifo">, #<Client id: 10, first_name: "Ryan">]
{% endhighlight %}

> 若是find找不到物件，就會拋出 ActiveRecord::RecordNotFound 異常。

### take

- 取出幾筆資料，所以後面可以放參數決定找幾筆，不做排序

{% highlight ruby %}
Client.take(2)
# => [
  #<Client id: 1, first_name: "Lifo">,
  #<Client id: 2, first_name: "Sara">
]
{% endhighlight %}

### find_by

- 找出第一筆符合條件的資料

{% highlight ruby %}
Client.find_by first_name: 'Lifo'
=> #<Client id: 1, first_name: "Lifo">
 
Client.find_by first_name: 'Jon'
=> nil

@item = Items.find(id: params[:id])
=> #
{% endhighlight %}

> 若是find_by找不到物件，只會回傳nil，不會有錯誤訊息。

### where

和 SQL 中的 WHERE 類似，可設定篩選條件，條件可以是字串、陣列、Hash

1.字串條件

{% highlight ruby %}
Client.where("orders_count = '2'")
{% endhighlight %}

> 使用字串會有被 SQL injection 攻擊的風險，不建議使用

2.陣列條件

陣列可以帶入字串條件中的 ? 和符號

{% highlight ruby %}
#帶入?
Client.where("orders_count = ?", params[:orders])

#帶入符號
Client.where("created_at >= :start_date AND created_at <= :end_date",
 {start_date: params[:start_date], end_date: params[:end_date]})
{% endhighlight %}

3.Hash條件

Hash的值不能是符號，只有是否相等、什麼範圍、子集合可使用此形式

- 相等

Hash的Key可以是符號和字串

{% highlight ruby %}
Client.where(locked: true)
Client.where('locked' => true)
{% endhighlight %}

- 範圍

在範圍內查詢

{% highlight ruby %}
Client.where(created_at: (Time.now.midnight - 1.day)..Time.now.midnight)
{% endhighlight %}

- 子集合

限縮條件查詢

{% highlight ruby %}
Client.where(orders_count: [1,3,5])
{% endhighlight %}

- NOT

相反條件查詢

{% highlight ruby %}
Article.where.not(author: author)
{% endhighlight %}