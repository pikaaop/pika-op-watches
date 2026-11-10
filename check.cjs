const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const context={};require('node:vm').runInNewContext(fs.readFileSync('./public/products.js','utf8')+';this.products=products;this.categories=categories;',context);const {products,categories}=context;
assert.equal(products.length,18);assert.equal(new Set(products.map(p=>p.id)).size,18);
for(const c of categories)assert.equal(products.filter(p=>p.category===c).length,3);
assert.equal(products.reduce((n,p)=>n+p.price,0),4380);
for(const p of products){assert.ok(p.price>0);assert.ok(p.name.startsWith('Pika '));assert.ok(p.description);assert.ok(p.image.startsWith('https://'));}
for(const name of ['index.html','style-tile.html']){const html=fs.readFileSync(path.join(__dirname,'public',name),'utf8');for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const ref=m[1].split('#')[0];if(!/^(https?:|data:|\/)/.test(ref))assert.ok(fs.existsSync(path.join(__dirname,'public',ref)),`Missing ${ref}`);}}
console.log('PASS: 18 unique products; six groups of three; prices; local asset references.');

