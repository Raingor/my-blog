# pymysql

使用 `pymysql` 操作 MySQL 的增删改查（CRUD）可以参考以下示例：

### 1. 连接到数据库

```python
import pymysql

# 连接到 MySQL 数据库
connection = pymysql.connect(
    host='localhost',
    user='your_username',
    password='your_password',
    database='your_database'
)
```

### 2. 创建（Insert）

```python
def create_user(name, age):
    with connection.cursor() as cursor:
        cursor.execute('INSERT INTO users (name, age) VALUES (%s, %s)', (name, age))
    connection.commit()
```

### 3. 读取（Select）

```python
def read_users():
    with connection.cursor() as cursor:
        cursor.execute('SELECT * FROM users')
        return cursor.fetchall()
```

### 4. 更新（Update）

```python
def update_user(user_id, new_name, new_age):
    with connection.cursor() as cursor:
        cursor.execute('UPDATE users SET name = %s, age = %s WHERE id = %s', (new_name, new_age, user_id))
    connection.commit()
```

### 5. 删除（Delete）

```python
def delete_user(user_id):
    with connection.cursor() as cursor:
        cursor.execute('DELETE FROM users WHERE id = %s', (user_id,))
    connection.commit()
```

### 6. 使用示例

```python
# 创建用户
create_user('Alice', 30)
create_user('Bob', 25)

# 读取用户
users = read_users()
print(users)

# 更新用户
update_user(1, 'Alice Smith', 31)

# 删除用户
delete_user(2)

# 关闭连接
connection.close()
```

这样就可以实现对 MySQL 数据库的基本增删改查操作。根据需要，调整表名和字段。