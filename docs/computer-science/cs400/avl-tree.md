# AVL Tree

## AVL-Tree的定义&性质
- AVL-Tree：全称Adelson-Velsky and Landis tree, 是由这两位数学家提出的自平衡二叉搜索树(self-balancing binary search tree)
- 性质：
    - 满足BST的所有性质
    - 树中每个节点的左右子树高度差不能超过1

## 平衡因子(Balance factor)与高度(height)定义
- 平衡因子 = 左子树高度 - 右子树高度
    - 在AVL-Tree中，平衡因子只能为-1，0，1
    - 一旦超出范围，会发生旋转以恢复平衡
- 高度：从该节点到最远叶子节点经历的边数

## 失衡(unbalance)检测
- 当平衡因子超出了{-1，0，1}的范围时为失衡
- 具体检验过程
    - 按照BST方法插入新节点
    - 从插入位置向上回溯
    - 对每个经过的祖先节点更新高度、计算平衡因子、判断是否失衡
    - 当某个节点平衡因子变2或-2，说明该节点失衡，需要旋转
- 失衡有4种结构：LL,LR,RL,RR

## 旋转(rotation)
- 对应4种失衡情况，有四种旋转处理方法
### 单旋转 - 处理LL和RR型
- 左旋 - 处理RR失衡
```
    z
     \
      y    
       \
        x
```
对z左旋
```
      y
     / \
    z   x
```

- 右旋 - 处理LL失衡
```
        z
       /
      y
     /
    x
```
对z右旋
```
      y
     / \
    x   z
```

- 完整情况下的左、右旋
    - 左旋
    ```
        z
       / \
      T1  y
         / \
        T2  T3
    ```
    对z左旋
    ```
          y
         / \
        z   T3
       / \
      T1  T2
    ```
    P.S.节点T2到z上的原因是AVLtree旋转后仍要保持BST的order，在这里是T1 < z < T2 < y < T3

    - 右旋
    ```
          z
         / \
        y   T4
       / \
      T1  T2
    ```
    对z右旋
    ```
          y
         / \
        T1  z
           / \
          T2  T4
    ```

### 双旋转 - 处理LR和RL型
- LR型 - 先左旋再右旋
```
      z
     /
    y
     \
      x
```
1. 先左旋y，将拐弯变直
```
      z
     /
    x
   /
  y
```
2. 再右旋z，恢复平衡
```
      x
     / \
    y   z
```
- RL型 - 先右旋再左旋
```
    z
     \
      y
     /
    x
```
1. 先右旋y
```
    z
     \
      y
       \
        x
```
2. 再左旋z，恢复1平衡
```
      x
     / \
    z   y
```


## 操作

### 插入
1. 像BST插入一样，找位置，比current小就往左，比current大就往右，找到空位置插入
2. 从新节点的父节点开始网上，更新每个祖先的高度
```
height(node)=1+max(height(node.left),height(node.right))
```
3. 对经过的每个节点计算平衡因子
```
balanceFactor=height(left)−height(right)
```
4. 失衡时时进行旋转操作
5. 旋转完之后继续往上检查失衡节点的祖父节点

### 删除
1. 和BST删除基本规则相同，不多赘述
2. 删除之后，对路径上的每个节点更新高度
```
height(node)=1+max(height(node.left),height(node.right))
```
3. 计算平衡因子
```
balance(node)=height(node.left)−height(node.right)
```
4. 按失衡情况旋转
5. 由于删除后会有子树变矮，所有修复完之后可能还要继续往上修，一路检查到根

## 时间复杂度和高度界
| Operation               | Time Complexity | 原因                                                   |
| ----------------------- | --------------: | ---------------------------------------------------- |
| Search                  |     (O(\log n)) | 最多沿一条根到叶的路径查找，路径长度等于树高，而 AVL 的高度是 (O(\log n))        |
| Insert                  |     (O(\log n)) | 先按 BST 找位置，再向上更新高度并检查失衡；路径长度是 (O(\log n))，旋转是 (O(1)) |
| Delete                  |     (O(\log n)) | 先按 BST 删除，再一路向上更新高度和重新平衡；最多检查到根，路径长度是 (O(\log n))    |
| Left Rotation           |          (O(1)) | 只修改常数个指针和节点高度                                        |
| Right Rotation          |          (O(1)) | 只修改常数个指针和节点高度                                        |
| Rebalancing at one node |          (O(1)) | 对单个失衡节点的修复只涉及一次单旋或一次双旋                               |
| Height of AVL Tree      |     (O(\log n)) | AVL 始终保持平衡，高度不会线性退化                                  |

- 高度界：\( h \leq 1.44\log_2(n+2) - 1.328 \)

## AVL-Tree VS RBT
- AVL更严格，高度界更小，结构也更平衡；但是每次更新操作之后，进行平衡操作频繁，开销变大
- RBT平衡条件更宽松，且频繁操作下的调整负担小
- 适用场景
    - search为主：AVL
    - Insert/Delete操作为主：RBT