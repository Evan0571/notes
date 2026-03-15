# Bash

## Bash是什么
- Bash = Bourne Again SHell
- 本质是一个shell，即命令解释器，当用户在终端输入命令，Bash会读取你输入的内容，再调用系统执行
- Linux以及macOS使用Bash，Windows使用CMD和powershell

## 基础命令

### pwd

- 作用：输出你当前所在文件夹以及其绝对路径

- 输入：
```bash
pwd
```
- 输出：
```text
/home/song372
```

### ls

- 作用：列出当前目录下的内容

- 常见写法：
```bash
ls # 列出当前文件夹包含的文件
ls home # 列出home文件夹包含的文件
ls -l # 列出详细信息 
ls -a # 显示隐藏文件(以. 开头)
ls -la # 列出详细信息和隐藏文件
```
- 输出：
```text
A02.BashIntroduction/  A06.Make/       P104.RedBlackTree/ 
A03.JUnit/             A07.Lambda/     P105.CodeReview/  
A04.FirstGit/          junit5.jar      P106.Iterator/
A05.SecondGit/         P103.RoleCode/  P107.Integration/
```

### cd

- 作用：切换目录

- 常见写法：
```bash
cd A06.Make/ # 切换到指定的A06.Make文件夹
cd .. # 回到上级文件夹
cd ~ # 回到家目录(home directory, 等价于cd /home/你的用户名)
cd - # 回到上一次所在目录
```
### mkdir

- 作用：创建目录

- 常见写法：
```bash
mkdir folder # 新建folder文件夹
mkdir grandpa/father/son # 沿改路径新建son文件夹，但是如果中间目录不存在会报错
mkdir -p grandpa/father/son # -p 解决了中间路径不存在会报错的问题，当grandpa或father不存在时，会一起创建
```

### cp

- 作用：复制文件或目录

- 常见用法：
```bash
cp old.txt new.txt # 复制old.txt并改名new.txt，new内容与old相同，若new.txt已存在，则用复制来的内容覆盖new原内容
cp -i old.txt new.txt # 与上面作用相同，-i用来防止覆盖，若有同名会询问是否override
cp important.txt backup/ # 复制important.txt到目录backup/，文件名不变
cp -r src_dir dst_dir # 复制目录要加-r 
```

### mv 

- 作用：移动文件，或重命名

- 常见用法：
```bash
mv old.txt new.txt # 重命名old为new
mv file.txt folder/ # 将file.txt移入folder文件夹
```

### rm

- 作用：删除文件

- 常见用法：
```bash
rm file.txt # 删除file.txt文件
rm -r folder # 删除文件夹，-r表示递归删除
rm -rf folder # 强制删除，-f代表强制删除，不提示确认
```

### cat

- 作用：直接输出文件内容

- 常见用法：
```bash
cat file.txt # 会输出file.txt里的具体内容
```

### less

- 作用：分页读长文件，catch适合读短文件，less适合读长文件

- 常见用法
```bash
less bigFile.txt # 分页读取bigFile.txt
```

- 分页后操作，less bigFile.txt之后，终端会显示具体代码界面，底部可以输入进行一些操作：
    - 空格：往下翻一整页
    - b：往上翻一整页
    - Enter：下一行
    - ↓/↑：下一行/上一行
    - /关键词：标注所有关键词，没找到会显示not found
        - n：搜索完之后按n会跳转到下一个搜索结果
        - N：搜索完之后按N会跳转到上一个搜索结果
    - q：退出less界面

### head/tail

- 作用：看文件开头或结尾

- 常见用法：
```bash
head file.txt # 显示文件开头，默认前10行
tail file.txt # 显示文件结尾，默认最后10行
head -n 20 file.txt # 显示前20行，-n代表自定义行数
tail -n 30 file.txt # 显示最后30行，-n表示自定义行数
tail -f logfile.txt # 先输出最后10行然后持续跟踪输出，-f用于持续跟踪输出，可以用于查看log，Ctrl+C退出tail -f
```

### grep

- 作用：按关键词搜索文本

- 常见用法：
```bash
grep "main" file.txt # 默认用法
grep -n "main" file.txt # 显示file.txt中有“main”的行和行号，-H强制显示文件路径
grep -r "TODO" folder/ #递归搜索folder文件夹中所有带“TODO”的行，输出会显示文件路径，-h强制隐藏文件路径
grep -i "error" log.txt # 忽略大小写搜索log.txt里的“error”
``` 

### find

- 作用：按条件查找文件

- 常见用法：
```bash
find . -name "*.java" # 找到从当前文件夹开始名字带".java"的文件然后输出文件路径，"."代表从当前文件夹开始，它可以替换成其他起始位置（如果上级的目录要写绝对路径），-name是查找条件
find . -name "Makefile" # 从当前文件夹开始找到叫"Makefile"的文件，这里和grep不同，无需-r就能递归查找
find . -type d # 查找当前文件夹开始下的文件夹
find . -type f # 查找当前文件夹开始下的普通文件
```

## 重定向和管道（redirection & pipe）

### ">"输出重定向

- 作用：把命令输出写到文件里，覆盖原内容。

- 常见用法：
```bash
ls > files.txt # 把ls输出写到files.txt，若原来有内容则会覆盖；终端不会有输出
```

### ">>"追加重定向

- 作用：把输出追加到文件末尾，不覆盖原内容。

- 常见用法：
```bash
echo "new line" >> files.txt # 在files.txt原本的文本末尾加一行"new line"，echo是用来打印文本的
```

### "<" 输入重定向

- 作用：将文件作为命令输入

- 常见用法：
```bash
program < input.txt # 将input.txt的内容输入program运行，比如program是计算两数之和，input.txt是3和5，那执行该命令可以不用在终端手动输数字就能得到计算结果8
```
- Tips：输入、输出重定向可以一起用
```bash
program < input.txt > output.txt # 输入来自 input.txt, 输出写入 output.txt
```

### "|"管道

- 作用：将左边命令的输出，直接作为右边命令的输入

- 常见用法：
```bash
find . -name "*.java" | less # 找所有 Java 文件并分页
cat log.txt | grep error # 查找包含 error 的日志
```

- Tips: 管道可以连续使用
    - 例子：
    ```bash
    ls | grep ".java" | wc -l # 输出当前目录 java 文件数量
    ```
    - 流程：
    ```text
    ls 列出文件
        ↓
    grep 只保留 .java
        ↓
    wc -l 统计行数 # wc即word count，默认输出"行数  单词数  字节数  文件名", -l表示显示行数，-w显示单词数，-c显示字节数
    ```
