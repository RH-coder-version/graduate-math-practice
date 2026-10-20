from pathlib import Path
import re,hashlib
p=Path('practice/index.html');s=p.read_text('utf-8-sig')
def version(m):
 attr,path=m.groups();clean=path.split('?')[0];f=p.parent/clean
 if f.is_file():return f'{attr}="{clean}?v={hashlib.sha256(f.read_bytes()).hexdigest()[:12]}"'
 return m[0]
s=re.sub(r'(src|href)="([^"#]+\.(?:js|css)(?:\?[^\"]*)?)"',version,s)
s=s.replace('本地预览版','Markdown 完整题面版')
p.write_text(s,'utf-8')
print('Versioned all scripts and styles')
