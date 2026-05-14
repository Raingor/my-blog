# gzip配置

```bash
http { 
	gzip on; 
	gzip_comp_level 6; 
	gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/rss+xml text/javascript;
	gzip_min_length 1k; 
	gzip_buffers 4 16k; 
}
```