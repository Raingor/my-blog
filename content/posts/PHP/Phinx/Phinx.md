# Phinx

### 数据库迁移工具
```bash
php version > 8.1
```

##### [PHP项目安装依赖](https://book.cakephp.org/phinx/0/en/migrations.html)
```bash
composer require robmorgan/phinx
```

- 初始化
	- ` vendor/bin/phinx init  `
- 创建迁移文件
	- ` vendor/bin/phinx create MyNewMigration`

##### [ThinkPHP8 项目安装依赖](https://doc.thinkphp.cn/v8_0/think-migration.html)
`composer require topthink/think-migration`
- 创建迁移文件
```bash
//执行命令,创建一个操作文件,一定要用大驼峰写法,如下 php think migrate:create AnyClassNameYouWant //执行完成后,会在项目根目录多一个database目录,这里面存放类库操作文件 //文件名类似/database/migrations/20190615151716_any_class_name_you_want.php
```
- 执行迁移工具
	- `php think migrate:run`