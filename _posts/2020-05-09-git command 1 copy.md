---
layout: post
title:  "Git 常用指令 （本地篇）"
subtitle: "Git 是個好工具，只是拿來做版本存檔也很好用，在此附上個人筆記以防萬一"
date:   2020-05-09 11:56:58 +0800
categories: jekyll update
---

### 設定

- `git config --global user.name "newbie"` 設定姓名
- `git config --global user.email "newbie@email.com"` 設定 eamil
- `git config -l` 查看設定（list）
- `git config --global core.editor vim` 預設編輯器為 vim

> --global 參數可以讓所有的 git project 都採用這個預設值

### git 版控

- 版控流程

  1. `git init` 初始化現在位置的資料夾並且讓 git 來控制版本

     2-1. `git add <file>` 將修改的檔案由工作目錄 Working Directory/Tree 推送至暫存區域 Staging Area，向 git 說明即將要提交的檔案

     2-2. `git add .` 所有檔案推送至暫存

     2-3. `git rm <file>` 向 git 說明檔案將要移除，相當於`git add`

     2-4. `git add -u` 加入所有被修改過的檔案（包括刪除）

  2. `git commit -m "<message>"` 將修改由暫存區愈推送至本機儲存庫，並且會新增一個 commit 將 Head 貼紙一併移動至此（沒加訊息會跑到 vim 編輯器，可輸入`:q`離開）
  3. `git push` 將修改送到遠端儲存庫

- 脫離版控
  - `git rm <file> --cached` 單個檔案脫離為 Untracked
  - `rm -rf .git` 刪除所有 git 版控

### git status 檔案狀態建議

- Untracked files（未被追蹤的檔案）：

  - 使用`git add` 推進暫存

- Changes not staged for commit（被更動但尚未要提交的檔案）：

  - 使用`git add`暫存
  - 使用`git checkout <file>` 回到修改前的樣子

- Changes to be committed（將要提交的檔案，已 add 進暫存）
  - 使用`git reset Head <file>` 將檔案還原為尚未 add 的狀態

### 狀態、檢查

- `git status` 查詢現在這個目錄的「狀態」
- `git show` 查詢最後一次 commit 的修改內容
- `git show <commit>` 查詢某次 commit 的修改內容
- `git log` 查詢 commit 的歷史紀錄(時間、作者、做了什麼、貼紙位置、commit)
- `git log <file>` 只顯示此檔案之紀錄
- `git log -p <file>` 只顯示此檔案的修改紀錄(+是新增 -是刪除)
- `git log --name-status` 顯示檔案新增、更動、刪除等資訊情形
- `git log --stat` 顯示更動檔案的統計及摘要
- `git log --oneline` 只保留(貼紙、commit、做了什麼)
- `git log --oneline --author="a"` 只找 a 作者的 commit
- `git log --oneline --grep="WTF"` 只找 commit 訊息中有 WTF 的
- `git log --oneline --since="10am" --until="5pm" --after="2020-03"` 找到從 2020 年 3 月之後，每天早上 10 點到下午 5 點的 Commit
- `git log --oneline --graph` 可看到分支圖形
- `git log --oneline --graph --decorate --all` 可看到更美的分支圖形
- `git blame -L 1,10 <file>` 檢查此檔案中第 1~10 行的作者與時間
- `git diff <file>` 比較檔案最後一次 commit 的到現在已修改的工作目錄和索引
- `git diff <commit_or_branch> <commit_or_branch>` 比對兩版本
- `git diff -–name-only <commit_or_branch> <commit_or_branch>` 只想檢視此作者兩個版本的修改差別

### 還原

- 把刪掉的檔案救回 （可先用 git status 看一下那些被刪除，因為如果目錄也被刪掉就沒救了）
  - `git checkout .` 救回所有檔案
  - `git checkout <file>` 救回某檔案

> 如果有做過修改沒 commit 提交，checkout 會放棄此次工作目錄的修改並還原成上次提交版本，並從暫存區退回工作區域（此次修改會被覆蓋小心使用）

- git checkout 的還原

  - `git checkout HEAD~2` 退回兩個版本前

- git reset 的還原

  - `git reset head` 還原 1 次版本
  - `git reset head <file>` 只還原某個檔案 1 次版本
  - `git reset <commit>` 回到某次 commit 的版本
  - `git reset <commit_or_branch>^` 退回此 commit/貼紙 1 次前的版本
  - `git reset <commit_or_branch>^^` 退回此 commit/貼紙 2 次前的版本
  - `git reset <commit_or_branch>~x` 退回此 commit/貼紙 x 次前的版本

  Reset 參數

  - `git reset --soft <commit_or_branch>` : 只移動 Head 和 branch，由儲存庫丟回暫存區，可用於更改 commit 訊息（重 commit 不需要再 add 一次）
  - `git reset --mixed <commit_or_branch>` : 預設，移動 HEAD 與其 Branch，將暫存區的內容移出
  - `git reset --hard <commit_or_branch>` : 直接移除暫存及工作目錄所有內容(但並沒有真的消失)

- git revert 的還原

  - `git revert HEAD --no-edit` 新增一個 commit 來原地覆蓋上一個不想要的 commit
  - `git revert <commit>` 新增一個和此 commit 相反的修改

- 看不見檔案且 commit 也忘了

  - `git reflog`來查看 head 的移動紀錄（每次 head 移動都會再 reflog 記上一筆 commit，保留 30 天），就會看到 commit，再用`git reset <commit> --hard`救回

  - 會使 head 發生改變
    - `git commit` head 移動到新的 commit
    - `git reset --hard <commit>` head 換到新的 commit
    - `git checkout <branch_or_commit>` head 切換到某貼紙或分支
    - `git merge/rebase` head 合併分支
    - `git cherry-pick/revert` 挑入/挑出 commit 時

- log 和 reflog 的差別

  - reflog 可以看到所有分支的操作紀錄
  - log 看不到已經刪除的 commit

- reset 和 checkout 的差別

  - checkout 是退回某版本，只會移動 head，分支不會跟著移動，常用於切換分支
  - reset：移動 head 和其 branch，會移出 commit，除了動到 head 還會移動 branch，如果分支沒有人管理就會形同隱形

### 修改

- --amend

  - `git commit --amend -m "add cat"` 將最後一次 commit 訊息改為 add cat

  - 將 Untracked 的檔案併入已發出的 commit (檔案忘記一起 commit 又不想再 commit 一次)
  - `git add <file>` 先推至暫存，`git commit --amend --no-edit` 再推入最後一次的 commit 並且不加說明文字

> 每次的--amend 都會被視為更改，而產生新的 commit，但實際上 commit 並沒有增加

- cherry-pick

  - 使用`git reset --hard <commit>`回到過去的某版本，再使用`git cherry-pick <commit>`把後面的版本一自己想要的順序加進來就可以調換順序，當然沒加的就不會顯示（形同刪除紀錄）

### 分支

- 查看、移動

  - `git branch` 查看分支及 head 的位置
  - `git checkout <branch_or_commit>` 將 head 切換到某分支/commit
  - `git branch -f <branch> <commit>` 移動某分支到某 commit（如果此分支不存在就會建立新的）

- 新增分支

  - `git branch <branch>` 新增分支
  - `git branch <branch> <commit>` 在某 commit 加上分支
  - `git checkout -b <branch>` 新增分支並且直接切換到新分支
  - `git branch -m <old_branch_name> <new_branch_name>` 改變分支名稱

- 刪除分支

  - `git branch -d <branch>` 可能會顯示你還沒合併的訊息
  - `git branch -D <branch>` 強制刪除

- 合併分支 (被合併貼紙的都是在新 commit 的下面)
  - `git merge <branch>` 合併分支
  - `git merge <branch> --no-ff` 保留分支原樣(不使用快轉模式 Fast Forward 合併)
  - `git rebase <branch>` 將當前分支接到某分支之後，並且會被重新分配一個 commit
  - `git rebase <branch_1> <branch_2>` 將分支 2 接到分之 1 之後