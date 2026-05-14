# Up-Down-Change场景

在 Phinx 中，
- `up` 方法用于执行数据库的升级操作，例如创建新表、添加字段、添加索引等，以实现数据库结构的正向变更；
- `down` 方法用于执行相反的操作，即回滚到之前的版本，撤销 `up` 方法所做的更改；
- `change` 方法则用于执行一些既有可能是升级也有可能是回滚的操作，它可以根据具体的情况在方法内部判断是进行正向还是反向的操作。
```php
<?php
use Phinx\Migration\AbstractMigration;

class MyMigration extends AbstractMigration
{
    public function change()
    {
        if ($this->hasColumn('my_table', 'new_column')) {
            $this->table('my_table')->dropColumn('new_column')->save();
        } else {
            $table = $this->table('my_table');
            $table->addColumn('new_column', 'tring')->save();
        }
    }
}

```