const photos = [
 'https://images.unsplash.com/photo-1634595947394-87012e7b12ba?auto=format&fit=crop&w=700&q=80',
 'https://images.unsplash.com/photo-1630512731154-ed3afce20505?auto=format&fit=crop&w=700&q=80',
 'https://images.unsplash.com/photo-1630512731371-a3747ab932ed?auto=format&fit=crop&w=700&q=80',
 'https://images.unsplash.com/photo-1708651145401-6be804cd02d4?auto=format&fit=crop&w=700&q=80',
 'https://images.unsplash.com/photo-1695345272166-4efd76dd7a21?auto=format&fit=crop&w=700&q=80'
];
let products = [
 ['Heritage 38','Classic',189,'Leather strap, minimalist dial, gold-tone case.'],
 ['Regent','Classic',215,'Roman numeral dial, brown leather, silver case.'],
 ['Oakwood','Classic',199,'Walnut-finish dial, mesh steel strap.'],
 ['Trailblazer','Sport',149,'Rugged silicone strap, luminous hands, 100m water resistance.'],
 ['Velocity','Sport',229,'Chronograph sub-dials, matte black case.'],
 ['Ridge GT','Sport',169,'Orange accent bezel, shock-resistant case.'],
 ['Apex Chrono','Chronograph',265,'Tri-dial layout, stainless steel bracelet.'],
 ['Meridian','Chronograph',289,'Blue dial chronograph, sapphire crystal.'],
 ['Skyline Racer','Chronograph',249,'Tachymeter bezel, racing-inspired.'],
 ['Slate','Minimalist',129,'No-numeral dial, ultra-thin case, vegan leather strap.'],
 ['Halo','Minimalist',139,'Single-hand minimalist design, matte white dial.'],
 ['Nordic','Minimalist',155,'Scandinavian-inspired, mesh strap, sandblasted case.'],
 ['Pulse','Smart',299,'Fitness tracking, heart-rate monitor, AMOLED display.'],
 ['Connect X','Smart',319,'GPS and notifications, 7-day battery.'],
 ['Aria Hybrid','Smart',259,'Analog face with smart notifications, 2-week battery.'],
 ['Eclipse 001','Limited Edition',349,'Numbered edition concept (1/500), black DLC coating.'],
 ['Aurora Special','Limited Edition',379,'Mother-of-pearl dial, rose gold case.'],
 ['Founders Series','Limited Edition',399,'Anniversary edition concept, engraved case-back, wood presentation box.']
].map(([name,category,price,description],id)=>({id,name:'Pika '+name,category,price,description,image:photos[id%photos.length],altImage:photos[(id+1)%photos.length]}));
const categories=['Classic','Sport','Chronograph','Smart','Minimalist','Limited Edition'];
if(typeof module!=='undefined') module.exports={products,categories};
