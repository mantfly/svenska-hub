from pathlib import Path
import base64,json
root=Path(__file__).resolve().parent
reference='data:image/png;base64,'+base64.b64encode((root/'avatars-3d.png').read_bytes()).decode()
banner='data:image/png;base64,'+base64.b64encode((root/'banner.png').read_bytes()).decode()
css=(root/'theme.css').read_text()
covers={}
rows=json.loads((root/'records.json').read_text())+json.loads((root/'books.json').read_text())+json.loads((root/'learning-websites.json').read_text())+json.loads((root/'shows.json').read_text())+json.loads((root/'shows-xhs.json').read_text())+json.loads((root/'shadowing.json').read_text())['resources']
for m in json.loads((root/'cover-manifest.json').read_text()):
 if m.get('file'):
  row=next((r for r in rows if r['id']==m['id']),{})
  covers[m['id']]={'title':row.get('title',''),'category':row.get('category',''),'image':'data:'+m['mime']+';base64,'+base64.b64encode((root/m['file']).read_bytes()).decode()}
app=(root/'app.js').read_text().replace('__BANNER__',banner).replace('__COVERS__',json.dumps(covers,ensure_ascii=False)).replace('__SHADOWING__',(root/'shadowing.json').read_text()).replace('__SFI_DIRECTORY__',(root/'sfi-directory.json').read_text()).replace('__YOUTUBE_POPULAR__',(root/'youtube-popular.json').read_text()).replace('__XHS_SHOWS__',(root/'shows-xhs.json').read_text()).replace('__SHOWS__',(root/'shows.json').read_text()).replace('__BOOKS__',(root/'books.json').read_text()).replace('__LEARNING_SITES__',(root/'learning-websites.json').read_text()).replace('__PODCAST_UPDATES__',(root/'podcast-updates.json').read_text()).replace('__NOTES__',(root/'notes.js').read_text())
s=(root/'shell.html').read_text().replace('__AVATAR_SHEET__',reference).replace('__CSS__',css).replace('__DATA__',(root/'resources.js').read_text()).replace('__JS__',app)
out=root.parent/'svenska-hub-cream-3d.html'
out.write_text(s)
(root.parent/'index.html').write_text(s)
print(str(out),len(s.encode()),'bytes')
