# Version Control - Git
Git是文件版本管理工具，本质在管理一下三类东西：
- 文件当前版本
- 提交了哪些修改
- 保存的历史版本
- 补充：在团队协作层面，他还管理远端仓库有什么

## 核心对象
核心对象包括：working tree/ staging/ commit/ branch/ remote

### working tree - 工作区
- 即当前目录看得见的，能直接改的文件
- 例如：打开Backend.java更改了1行注释，这个改动首先只存在于working tree，Git并没有记录他
- working tree 就相当于草稿区和施工现场，作出改动但并未记录
- 常见状态：
    - 文件刚被创建，还没被git管理：untracked
    - 文件之前已被Git管理，后被修改：modified
- 相关命令
```bash
git status # 会显示git的状态
```

### staging area - 暂存区
- Git允许更改多个文件但只提交某几个文件的修改，所以出现了暂存区
- 暂存区不是直接commit，而是用于存放你想要提交修改的文件
- 例如：你修改了Backend.java和Frontend.java，你可以选择只提交其中一个文件的修改，那么在commit之前，你可以将要修改的文件放入残存区
- 相关命令
```bash
git add Backend.java # 将Backend.java放入暂存区
git add . # 将所有修改文件放入暂存区
```
- Tips：git add 在commit前可多次叠加

### commit - 提交
- commit会把staging area的内容保存成一个正式版本
- commit可以理解成一个有ID、可以评论标记的存档和可回溯版本
- 每个commit都指向前一个commit，会形成一个链
- 相关命令
```bash
git commit -m "fix Backend bugs" # -m后的引号里写你对于这次改动的描述
```

### branch - 分支
- branch可以理解成指向某个commit的可移动指针
- branch允许你在不同开发线并行进行，隔离不同功能的改动，最后再merge回来
- 常见命令
```bash
git branch # 查看本地分支
git branch -a # 查看本地+远程分支
git branch -r # 查看远程分支
git branch -v # 查看每个分支最后指向，会输出分支名、最新commit的哈希前几位、最新commit消息
git branch new-branch # 创建新分支，但不切换回去
git checkout branch-name # 切换到已有分支
git checkout -b new-branch # 创建并切换到新分支
git branch -d branch-name #删除已合并的本地分支
git branch -m new-name # 重命名当前分支
git branch -m old-name new-name # 重命名指定分支
git merge frontend # 合并分支，这里的frontend是被合并分支
git push -u origin branch-name # 推送本地新分支到远程
git push # 把本地提交上传到远程仓库（推送已有跟踪关系的分支）
git pull origin main # 把远程仓库的更新拉到本地仓库
git push origin --delete branch-name # 删除远程分支
```

### remote - 远程仓库
- remote是团队共享的仓库位置
- 常见命名是origin，指向的是某个远端地址，如gitlab或github

## 基本流程
一般git流程如下：
```bash
git status
git add .
git commit -m "···"
git push
git pull
```
### 第一步：git status
- 查看当前状态
    - 当前在哪个分支
    - 有哪些文件改了
    - 哪些在暂存，哪些没有
    - 有没有untracked的文件
    - 本地分支和远端是ahead还是behind

### 第二步：git add
- 将修改文件放入暂存区
    - git add Main.java # 将Main.java这一个文件放入暂存
    - git add file_1.txt file_2.txt file_3.txt # 将这三个文件放入暂存，空格分割文件
    - git add . # 将所有新增改动放入暂存，方便但容易提交不该提交的东西

### 第三步：git commit
- 将暂存内容写入正式版本
- commit要写message，一个好的message要表达清晰

### git push
- 将本地的commit推送到远端
- 只能推送commit的，如果只add在暂存区没有commit不行

### git pull
- 拉取远端更新到本地
- git pull = git fetch + git merge

## 分支与合并(branch & merge)

### feature branch 工作流
- 例如backend/frontend分支并行开发
- main保持相对稳定，每个新功能在独立分支上独立开发，功能完成后合并回main
- 这种做法可以：隔离风险；便于并行开发；便于review

### 相关命令
上一部分已写出，不再赘述

## 冲突解决：冲突标记、选择策略、再次提交
### 冲突原因
你和别人改了同样位置的代码，git在pull/merge时不知道保留谁的

### 冲突标记
```text
<<<<<<< HEAD
这是你当前分支的版本
=======
这是合并进来的版本
>>>>>>> abc1234
```
- 含义:
    - <<<<<<< HEAD：当前分支版本开始
    - =======：分隔线
    - >>>>>>> abc1234：另一边版本结束

### 解决冲突
- 打开冲突文件查看差异
- 决定保留哪部分
    - 保留你的，删除对方的
    - 保留对方的，删除你的
    - 将两边手动整合
- 删除三种冲突标记
- 保存文件，然后add、commit、push

## 日志与定位
### git log
- 用于查看提交历史
- 常用命令
```bash
git log # 最常用，会显示commit hash、作者、时间、message
git log --oneline # 压缩视图
git log --graph --oneline --all # 可以看到分支怎么分叉、merge在哪发生、哪个分支领先
```

### git diff
- 比较文件差异
- 常用命令
```bash
git diff # working tree vs staging area
git diff --stage # staging area vs latest commit
git diff commit1 commit2 # commit1 vs commit2
```

### git blame
- 用于定位代码来源
- 会显示这一行最后是谁改的，是哪个commit
- 常用命令：
```bash
git blame Main.java
```
- 示例输出：
```text
a1b2c3d4 (Alice 2026-03-10 10:15:22 -0500 1) public class Main {
e5f6g7h8 (Bob   2026-03-11 14:20:01 -0500 2)     public static void main(String[] args) {
e5f6g7h8 (Bob   2026-03-11 14:20:01 -0500 3)         System.out.println("Hello");
a1b2c3d4 (Alice 2026-03-10 10:15:22 -0500 4)     }
a1b2c3d4 (Alice 2026-03-10 10:15:22 -0500 5) }
```
