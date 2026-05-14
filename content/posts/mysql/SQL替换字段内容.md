# SQL替换字段内容

好的，你的表名是 **ctmon_cms_page**，字段名是 **content**。

下面是专属 SQL：

---

## **✅** 

## **批量替换 /PC/ → /pc/**

  
### **最终 SQL**

```sql
UPDATE ctmon_cms_page
SET content = REPLACE(content, '/PC/', '/pc/')
WHERE content LIKE '%/PC/%';
```

---

## **🛡 建议：操作前先查看会被修改的记录**

```sql
SELECT id, content
FROM ctmon_cms_page
WHERE content LIKE '%/PC/%';
```

你可以先确认一下影响范围，再执行 UPDATE。

---

## 更换特殊服务号
```sql
UPDATE ctmon_products_content SET content = REPLACE( REPLACE( REPLACE( REPLACE(content, '&lt;', '<'), '&gt;', '>'), '&plusmn;', '±'), '&amp;', '&') WHERE content LIKE '%&lt;%' OR content LIKE '%&gt;%' OR content LIKE '%&plusmn;%' OR content LIKE '%&amp;%';
```

如需我帮你写 **TP8 一键替换脚本** 或增加其他条件，可以继续告诉我！