---
layout: post
title:  "Ruby Symbol？Ruby 符號？"
subtitle: "剛開始看到符號時，可能會猜測這是什麼有特殊功能的變數嗎？或經過變異的字串？又或是什麼神奇的Ruby黑魔法呢？"
date:   2020-05-16 12:49:02 +0800
categories: jekyll update
---

剛開始看到符號時，可能會猜測這是什麼有特殊功能的變數嗎？或經過變異的字串？又或是什麼神奇的Ruby黑魔法呢？

Anyway，RTFM first。

---

## 在Ruby的世界中符號是什麼？ What is a Symbol in Ruby’s world?

> Symbol objects represent names inside the Ruby interpreter. They are generated using the :name and :”string” literals syntax…… . The same Symbol object will be created for a given name or string for the duration of a program’s execution, regardless of the context or meaning of that name. ……[ruby-doc][ruby-doc.org/Symbol]

在Ruby的世界裡，Symbol的語法是使用冒號加上某個給定的 :名字 或是 :"字串" 。然而Ruby並不在乎後面的名稱意義，只是在創建該 Symbol 這個物件時附帶上那個被給定的命名。

>A symbol looks like a variable name but it’s prefixed with a colon. ……You don’t have to pre-declare a symbol and they are guaranteed to be unique. There’s no need to assign some kind of value to a symbol… . Ruby also guarantees that no matter where it appears in your program, a particular symbol will have the same value.
\
>A symbol is the most basic Ruby object you can create. It’s just a name and an internal ID. Symbols are useful because a given symbol name refers to the same object throughout a Ruby program. ……you can consider the colon to mean “thing named” so :id is “the thing named id.”
[rubylearning][rubylearning.com/Ruby_symbols]

Symbol看起來像是變數加上冒號(不是結腸…)，但不同的是Symbol不需要被定義或給定一個值才能使用，並且不管Symbol在哪都會有一個相同的內部 ID。你可以將冒號 : 視為是被命名的一部分，因此 :id 就是 一個被命名為:id的東西 。

> Symbols are immutable, … By immutable I mean that every symbol is unique, and it can’t be changed.
> Symbols are not pointer to values, they are values themselves
> Symbols are for identity
> Symbol GC was introduced in Ruby 2.2 to clean up temporary symbols
[rubyguides][rubyguides]

Symbol就像是給了識別證一樣，不能被改變，並且本身就可以是一個值。Ruby 在2.2 之後加入了 Symbol GC(Garbage Collection)， 讓符號可以像其他物件一樣被回收而不是堆積在記憶體。
看完這些資料大致上就可以了解符號的特性，不過自己也要發揮實證精神，To see is too believe !


1.Symbol是一個物件？
Ruby在處理每個物件時，都會在記憶體中產生一個物件的object_id，所以只要是物件都有自己獨特的object_id。以符號:cat為例，可以使用object_id方法看到此符號的object_id。

{% highlight ruby %}
:cat.object_id
=> 1527388
(原來我在電腦裡養了一隻識別證是1527388的符號貓咪)
{% endhighlight %}

2.Symbol有相同的內部ID？
重複使用object_id方法可以看出每次取用:cat的object_id都相同，就像是一直在問:cat的身分證字號一樣（不同的是身分證字號會有人撞號，object_id不會），相對於其他的物件則會在每次取用都得到不同的object_id。

{% highlight ruby %}
:cat.object_id
=> 1527388
:cat.object_id
=> 1527388
"dog".object_id
=> 70368590631340
"dog".object_id
=> 70368590742760
(恩!這隻貓很乖不會亂跑)
{% endhighlight %}

3.Symbol不用被指定就可單獨使用？
如果只使用符號:cat，就可以單獨得到:cat。但如果將字串指定給符號會得到 SyntaxError 的錯誤訊息，符號並不能像變數一樣使用。

{% highlight ruby %}
:cat
=> :cat
:cat = "貓糧"
=> SyntaxError(syntax error, unexpect '=', expecting end-of-input)
(看來是因為沒給罐罐阿...)
{% endhighlight %}

4.Symbol不能被修改？
如果把Symbol當作字串來修改時，結果會顯示 NoMethodError 沒有這個方法的錯誤，因為Symbol 並沒有提供修改的方法。以下為嘗試將:cat的第一個字使用[]=方法修改為p。

{% highlight ruby %}
:cat[1]
=> "a"
:cat[1] = p
=> NoMethodError (undefined method `[]=' for :cat:Symbol)
(貓咪不可以亂拍拍...)
{% endhighlight %}

---

## 符號和字串有什麼不同？ What’s different between Symbol and String?

> Symbols are more efficient than strings. Two strings with the same contents are two different objects, but for any given name there is only one Symbol object. This can save both time and memory.
[rubylearning][rubylearning.com/Ruby_symbols]

符號比較有效率且省記憶體，因為每次取用的objects都相同。

>Symbols look better, they are immutable & if you benchmark string keys vs symbols keys you will find that string keys are about 1.70x slower.
[rubyguides][rubyguides/Ruby-symbols]

符號比較棒，他們有不可被改變的特性，並且在基準測試（評價性能的一個標準）上發現字串比符號慢了1.7倍。

> Therefore, when do we use a string versus a symbol?
\
  > If the contents (the sequence of characters) of the object are important, use a string.
  \
  > If the identity of the object is important, use a symbol.
[rubylearning][rubylearning.com/Ruby_symbols]

如果物件的內容是重要的，使用字串；如果物件的識別是重要的，使用符號

除了這幾篇內容還有上述的總結：
1. 符號不可被改變，字串可以被改變
2. 同個符號每次取用的object_id都相同，字串則都不同
3. 符號效能比字串略勝一籌
4. 字串的方法比符號多（去 https://ruby-doc.org/看就知道了）

---

## 講這麼多，符號到底怎麼用？
1.可以使用在雜湊
因為符號的不可變，讓其很適合當作Hash中的key（就像你開保險櫃拿東西要用到相對應的鑰匙）。第二種寫法是比較語意化的方式（Ruby 2.0之後），也是現在較常見的方式。

{% highlight ruby %}
hash1 = { "cat" => "Ruby" }
=> { "cat" => "Ruby" }
hash2 = { cat: "Ruby" }
=> { :cat => "Ruby" }
{% endhighlight %}

2.可以和字串互相轉換

符號 => 字串

{% highlight ruby %}
:name.to_s
=> "name"
:name.id2name
=> "name"
{% endhighlight %}


字串 => 符號

{% highlight ruby %}
"name".to_sym
=> :name
"name".intern
=> :name
%s(name)
=> :name
{% endhighlight %}


3.可以分享冷知識
[Ruby女孩：10萬.times { puts "為什麼？" }][Ruby女孩]
符號的三種服用方式

{% highlight ruby %}
:cat
=> :cat
:"cat"
=> :cat
:'cat'
=> :cat
(吸貓的三種方式)
{% endhighlight %}

如果要在符號裡放空格要加上引號，不然會出現 SyntaxError 語法錯誤

{% highlight ruby %}
"Ruby on rails"
=> "Ruby on rails"
'Ruby on rails'
=> "Ruby on rails"
:Ruby on rails
=> SyntaxError ((irb):3: syntax error, unexpected tIDENTIFIER, expecting end)
(吸貓的三種方式)
{% endhighlight %}

[ruby-doc.org/Symbol]: https://ruby-doc.org/core-2.7.0/Symbol.html
[rubylearning.com/Ruby_symbols]: http://rubylearning.com/satishtalim/ruby_symbols.html
[rubyguides/Ruby-symbols]: https://www.rubyguides.com/2018/02/ruby-symbols/
[Ruby女孩]: https://ithelp.ithome.com.tw/articles/10159660
[為自己學Ruby on rails]: https://railsbook.tw/chapters/06-ruby-basic-2.html