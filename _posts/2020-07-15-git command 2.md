---
layout: post
title:  "Git 常用指令 （遠端篇）"
subtitle: "Git 是個好工具，拿來做版本控制跟存檔很好用，在此附上個人筆記以防萬一"
date:   2020-07-15 22:45:54 +0800
categories: jekyll update
---

<br>

### 拿取遠端資料

- 設定遠端節點

  - `git remote -v` 查看已經在資料庫註冊的節點
  - `git remote add|rm <remote> <url>` 增加｜刪除某 HTTPS/SSH 地址的節點
  - `git remote rename <old_remote> <new_remote>` 更換節點名稱

- 從遠端拿資料下來

  - `git clone <url>` 複製這個地址的資料，並且會自動新增節點(如果沒有的話)
  - `git fetch <remote> <branch>` 從節點上抓資料下來，並且建立一個名為`<remote>/<branch>` 的分支在同時新增的一個 commit 之上(前一個 commit 就是你原本的東西)
  - `git pull <remote> <branch>` 從節點上抓資料下來，和原資料 merge 合併為一個新的 commit
  - `git pull --rebase <remote> <branch>` 從節點抓資料下來，和原資料 rebase 合併為一個新的 commit

- 刪除本地分支

  - `git pull -p` 在本地刪除遠端已經刪除的分支

- 從遠端伺服器抓資料同步的四種方法（跟 merge 一樣可能會發生衝突）
  - `git pull <remote> <branch>`
  - `git fetch <remote> <branch>; git merge <remote>/<branch>` = `git pull origin master`
  - `git fetch <remote> <branch>; git rebase <remote>/<branch>`
  - `git fetch <remote> <branch>; git cherry-pick <remote>/<branch>`

### 送資料到遠端

- 將資料送到遠端

  - `git push remote <remote> <branch>` 第一次推東西到空的專案時，要記得先在建立 remote，通常為 origin master
  - `git push <remote> <branch_1>:<branch_2>` 將本地的分支 1 推往某節點，並且在遠端形成分支 2 (pull 也可以這樣做)
  - `git push <remote> <branch>` 上面的縮寫，分支不改變
  - `git push -u <remote> <branch>` 將推資料上去外，會將分支設定為預設
  - `git push` 推預設分支的資料上去（有設定才有）
  - `git push --all <remote>`
  - `git push -f <remote>` 將新的資料推上去後覆蓋所有歷史紀錄（小心使用）

- 刪除遠端分支

  - `git push <remote> :<branch>` 將沒東西推往分支，會刪除遠端分支
  - `git push origin --delete <branch>` 同上

  git push 的更新衝突解決方式

  1. `git pull <remote> <branch>` 拉下來成新的分支（然後就會有很多分支合併）
  2. 使用 GitHub 的 fork 功能來操作 Pull Request/issue，其中會遇到三個選項
     - `Create a merge commit` 就是 merge
     - `Rebase and merge` 就是 rebase
     - `Squash and merge` 擠壓成一個 commit 放進來（過程擠壓）
