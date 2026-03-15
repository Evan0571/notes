# Lambda Expression
Lambda Expression本质是一种匿名函数(anonymous function)，有以下特点：
- 无函数名
- 可以直接作为参数传递
- 代码更短
- Quick Comparation：
    - 传统Java匿名类写法
    ```
    Comparator<Integer> cmp = new Comparator<Integer>() {
        public int compare(Integer a, Integer b) {
            return a - b;
        }
    };
    ```
    - Lambda 写法
    ```
    Comparator<Integer> cmp = (a, b) -> a - b;
    ```

## Lambda的语法结构
```
(parameters) -> expression
```
或
```
(parameters) -> { statements }
```
`->` 表示 **输入** -> **输出**

## 三种常见写法

### 最简单表达式
```
x -> x * x
```
### 多参数
```
(a, b) -> a + b
```
### 多行代码
```
(a, b) -> {
    int result = a + b;
    return result;
}
```

## Lambda 必须依赖 Functional Interface
Lambda不能单独存在，必须要有函数式接口（只有一个抽象方法的接口）
- 例如
```
interface MathOperation {
    int operate(int a, int b);
}
```
- Lambda实现
```
MathOperation add = (a, b) -> a + b;
```
- 调用
```
add.operate(3,5);
```