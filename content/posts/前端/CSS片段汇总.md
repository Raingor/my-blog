# CSS 片段汇总

## 多行文字溢出省略号

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

## Swiper 轮播防卡顿

```css
.s8-box .swiper-wrapper {
    transition-timing-function: linear;
}
```

## 鸿蒙字体配置

字体上传到 dm@ctmon.com 的 oss，bucket：sjsdemo，目录：/font/hongmeng

```css
https://demoimg.ctmon.com.cn/font/hongmeng/HarmonyOS_Sans_SC.woff2
```

## 表格样式美化

```css
/* 表格整体美化 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
  font-size: 14px;
}

/* 表头样式 */
table th {
  background-color: #f2f2f2;
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

/* 表格内容样式 */
table td {
  border: 1px solid #ccc;
  padding: 8px;
}
```

## 恢复全局 margin/padding

```css
/* 恢复默认边距的区域 */
.restore-spacing * {
  margin: revert;
  padding: revert;
}
```
