# Make
Make 本质上是一个“根据依赖关系自动执行命令”的工具。他的常见用途包括：
- 自动编译代码
- 只编译那些过期的代码
- 把复杂命令放在一个统一入口
- 给团队提供统一的build/run/test/clean命令

## 为什么要用Make？
正常编译要写的命令行很多，非常复杂，而是用Make把构建过程写成规则，则可以用简单命令一下子触发

## Makefile
Make默认读取一个叫做Makefile的文件
### Makefile的核心结构
- Makefile的基本单位叫rule
    - 一条rule有三个部分
    ```
    target: dependencies
        commands
    ```
        - target: 想执行的操作
        - dependencies: 在执行前要准备好的东西
        - commands: 真正执行的shell指令
        - Tips: Command前是Tab
    - 举例：
    ```
    CalcLibrary.class: CalcLibrary.java
    	javac CalcLibrary.java
    ```
    - 含义：
        - 目标是生成CalcLibrary.class
        - 它依赖 CalcLibrary.java
        - 达到目标要执行javac CalcLibrary.java

### Makefile内部rule执行顺序
执行command前要先递归实现所有的dependencies
- 例如：
```
run: CalcApp.class CalcLibrary.class
	java CalcApp
```
    - 当执行make run时，Make不会立即执行java CalApp
    - 他会先确认CalcApp.class有没有准备好；CalcLibrary.class有没有准备好
    - 如果没准备好，会先去找这两个target对应的rule，现执行他们，等他们执行完了再执行run里的
- 总结：想做某个target -> 先递归解决其依赖 -> 再解决本身

### 时间戳概念
Make会比较source file和target file的时间戳判断是否需要更新
- 举例：
```
CalcLibrary.class: CalcLibrary.java
	javac CalcLibrary.java
```
    - 如果CalcLibrary.class存在，且比CalcLibrary.java更新
    - 那么说明.class是最新的.java编译的
    - Make会判定他up to date，不会再重复编译
    - 反之，如果.java比.class新，Make就知道.class过期了，并重新编译

## 具体Makefile示例
```
build: CalcLibrary.class CalcApp.class

CalcLibrary.class: CalcLibrary.java
	javac CalcLibrary.java

CalcApp.class: CalcApp.java CalcLibrary.class junit5.jar
	javac -cp .:junit5.jar CalcApp.java

run: CalcLibrary.class CalcApp.class
	java CalcApp

test: CalcLibrary.class CalcApp.class junit5.jar
	java -jar junit5.jar -cp . -c CalcApp

clean:
	rm -f *.class
```
### `build` target: 统一编译入口
```
build: CalcLibrary.class CalcApp.class
```
- 这一句规则没有command，只有target和dependencies
- 目的是在执行build时，Make会确保这两个.class都存在并最新

### 编译`.class`规则
- 一般文件
```
CalcLibrary.class: CalcLibrary.java
	javac CalcLibrary.java
```
    - 好处是Make会比较时间戳来判定.class是不是最新的
- 主程序/测试类
```
CalcApp.class: CalcApp.java CalcLibrary.class junit5.jar
	javac -cp .:junit5.jar CalcApp.java
```
    - 第二句里的“.”代表当前文件夹
    - 第二句中多个classpath用“:”连接（Linux环境）

### `run` target: 运行程序
```
run: CalcLibrary.class CalcApp.class
	java CalcApp
```
- 目的是先确定class文件存在且最新再执行程序

### `test` target: 做测试
```
test: CalcLibrary.class CalcApp.class junit5.jar
	java -jar junit5.jar -cp . -c CalcApp
```
- 目的是先确定class文件都已编译再调用JUnit执行测试

### `clean` target: 清理编译产物
```
clean:
	rm -f *.class
```
- 删除所有.class文件，下次要重编译

## `.PHONY`命令
- 目前run、clean、test这些都是动作型target，而非文件
- 如果目录内真有叫clean的文件，那Make会误以为target `clean`已存在，于是不允许`clean`规则
- 此时我们需要用到`.PHONY`:
```
.PHONY: build run test clean
```
- 意思是`build`、`run`、`test`、`clean`都是伪目标
- 当该命令放在文件顶部，Make就能正确识别target

## `@`的作用
- 把`@`放在command前，在make执行command时，命令不会显示出来
- 例如：
```
clean:
	@rm -f *.class # make clean时终端不会显示改命令
```
