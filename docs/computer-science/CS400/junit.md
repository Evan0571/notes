# JUnit

## 基础概念

### 什么是Junit
- Junit是Java的单元测试框架，它可以自动检查某个方法是否返回正确结果，是否抛出预期异常

### 什么是“单元测试：
- 单元测试通常指很小的、可独立验证的代码单位，例如单独验证一个方法

## JUnit的基本结构
主要有test class，test method和assertion

### test class
- 测试类，专门放测试代码，例如：
```java
public class RedBlackTreeTest {
}
```
    - 测试类不是生产代码，仅用于测试
    - 一个测试类一般测一个类，或者测一组紧密相关的功能

### test method
- 测试方法，表示一个独立测试用例，只测试一个明确行为，如插入一个元素之后size变为1
- 在JUnit5中，test method要用@Test标记，例如：
```java
@Test
public void testInsertSingleValue() {
}
```

### assertion
- 断言就是“检查结果是否符合预期”
- 断言用于判断测试是否通过，例如：
```java
assertEquals(1,tree.size());
```
    - 断言tree.size()等于1
    - 如果不等于，则表示测试失败

## JUnit 常用注解(annotations) - 补充

### @Test
- 表示这是一个测试方法
```java
@Test
public void testSizeAfterInsert() {
    RedBlackTree<Integer> tree = new RedBlackTree<>();
    tree.insert(10);
    assertEquals(1, tree.size());
}
```

### @BeforeEach
- 表示每个测试方法方法执行之前都要运行一次
- 用于解决“测试隔离”
```java
private RedBlackTree<Integer> tree;

@BeforeEach
public void setUp() {
    tree = new RedBlackTree<>();
}
```
    - 此处表示每个测试开始都要重新创建一颗新树
    - 防止上一个测试插入的数据污染后面测试

### @AfterEach
- 每次测试后运行
- 一般用于清理资源

### @BeforeAll/ @AfterAll
- 在所有测试开始/结束前运行一次
- 初始化共享资源，一般不用

## 常见断言(assertion)

### assertEquals(expected, actual)
- 检查“预期值”与“实际值”是否相等。
- e.g.
```java
assertEquals(3, tree.size());
```
    - 预期=3，实际=tree.size()
    - 若tree.size() ≠ 3，表示测试失败
- 适用场景：size，height，返回值，traversal结果，例如：
```java
assertEquals("1 2 3", tree.inOrderTraversal());
```

### assertTrue(condition)
- 检查条件是否为true
- e.g.
```java
assertTrue(tree.contains(10));
```
    - 判断tree.contains(10)是否是true
    - 返回false则测试失败

### assertFalse(condition)
- 检查条件是否为false(比如删除某个数据之后，测试他还在不在)
- e.g.
```java
assertFalse(tree.contains(99));
```
    - 判断tree.contains(99)是否是false
    - 返回true则测试失败

### assertNull(value)
- 检查对象是否为null
- e.g.
```java
assertNull(node.leftChild);
```
    - 此处判断node.leftChild是不是null
    - 不是null的话测试失败

### assertNotNull（value）
- 检查对象是不是非null
- e.g.
```java
assertNotNull(tree.root);
```
    - 此处判断根节点是不是非null，即存在
    - 如果根节点是null则测试失败

### assertThrows(ExceptionType.class, () -> {...})
- 检查某段代码是否能抛出指定异常
- e.g.
```java
assertThrows(NullPointerException.class, () -> {
    tree.insert(null);
});
```
    - 预期tree.insert(null)会抛出NullPointerException异常
    - 如果没有抛出或者抛出别的异常，则测试失败
-适用场景：非法输入，空参数，越界 ···

## 完整JUnit示例
### 简单类
```java
public class Counter {
    private int count = 0;

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}
```
### 测试类
```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CounterTest {

    @Test
    public void testInitialCountIsZero() {
        Counter c = new Counter();
        assertEquals(0, c.getCount());
    }

    @Test
    public void testIncrement() {
        Counter c = new Counter();
        c.increment();
        assertEquals(1, c.getCount());
    }
}
```

## 测试用例设计

### 正常用例
- 即符和预期的常规操作
- 例如在BST/RBT中插入正常整数、查找存在元素、删除已有元素
- e.g.
```java
@Test
public void testContainsInsertedValue() {
    RedBlackTree<Integer> tree = new RedBlackTree<>();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);

    assertTrue(tree.contains(5));
    assertTrue(tree.contains(10));
    assertTrue(tree.contains(15));
}
```

### 边界用例
- 测试一些边界情况
- 例如空值，null等
- e.g. 
```java
// 空结构
assertEquals(0, tree.size());
assertFalse(tree.contains(1));
```

### 异常用例
- 测试非法输入或非法状态
- 例如删除不存在元素、访问非法索引等
- e.g. 
```java
@Test
public void testInsertNullThrowsException() {
    RedBlackTree<Integer> tree = new RedBlackTree<>();
    assertThrows(NullPointerException.class, () -> {
        tree.insert(null);
    });
}
```

## 树的测试测什么

### BST
- 中序遍历应该有序
- contains方法
- size方法

### AVL
- BST的排序性，中序
- 每个结点的平衡因子是否合法
- 高度更新是否正确
- 插入/删除后是否仍然平衡

### RBT
- BST的排序性
- 黑根
- 不红红
- 黑路同

## 常用测试写法(AAA结构)
- Arrange：准备数据
- Act：执行操作
- Assert：断言结果
- e.g.
```java
@Test
public void testRemoveLeafNode() {
    // Arrange
    BinarySearchTree<Integer> tree = new BinarySearchTree<>();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);

    // Act
    tree.remove(5);

    // Assert
    assertFalse(tree.contains(5));
    assertEquals(2, tree.size());
}
```

## JUnit在命令行的运行
### 第一步：编译
```bash
javac -cp junit5.jar:. HelloWorld.java
```
### 第二步：运行jar
```bash
java -jar junit5.jar -cp . -c HelloWorld
```
