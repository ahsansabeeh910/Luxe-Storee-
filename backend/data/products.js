const products = [
  {
    id:1,
    name:'Midnight Chronograph',
    brand:'AUREL',
    cat:'Accessories',
    price:549,
    oldPrice:699,
    rating:4.8,
    reviews:124,
    image:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',
    badge:'Sale',
    desc:'Swiss-movement timepiece with sapphire crystal glass and genuine leather strap. Water resistant to 50m.',
    sizes:['S','M','L','XL'],
    colors:['Black','Silver','Gold']
  },

  {
    id:2,
    name:'Cashmere Overcoat',
    brand:'MAISON',
    cat:'Apparel',
    price:899,
    oldPrice:null,
    rating:4.9,
    reviews:87,
    image:'https://images.unsplash.com/photo-1619603364904-c0498317e145',
    badge:'New',
    desc:'Pure cashmere blend overcoat with structured shoulders and double-button closure. Dry clean only.',
    sizes:['XS','S','M','L','XL'],
    colors:['Camel','Black','Navy']
  },

  {
    id:3,
    name:'Vetiver Noir Eau de Parfum',
    brand:'BOISÉ',
    cat:'Fragrance',
    price:285,
    oldPrice:null,
    rating:4.7,
    reviews:203,
    image:'https://images.unsplash.com/photo-1632928145408-ef47a7672964',
    badge:null,
    desc:'A deep woody fragrance with opening notes of bergamot, heart of vetiver and patchouli, base of amber.',
    sizes:['50ml','100ml'],
    colors:[]
  },

  {
    id:4,
    name:'Oxford Derby Shoes',
    brand:'BROGUES CO.',
    cat:'Footwear',
    price:445,
    oldPrice:580,
    rating:4.6,
    reviews:156,
    image:'https://images.unsplash.com/photo-1614253429340-98120bd6d753',
    badge:'Sale',
    desc:'Handcrafted Goodyear-welted derby shoes in full-grain calfskin leather.',
    sizes:['6','7','8','9','10','11'],
    colors:['Cognac','Black','Tan']
  },

  {
    id:5,
    name:'Classic Leather Wallet',
    brand:'NOIR',
    cat:'Accessories',
    price:199,
    oldPrice:249,
    rating:4.6,
    reviews:121,
    image:'https://plus.unsplash.com/premium_photo-1681589453747-53fd893fa420',
    badge:'Sale',
    desc:'Premium handcrafted leather wallet.',
    sizes:['Standard'],
    colors:['Black','Brown']
  },

  {
    id:6,
    name:'Luxury Sunglasses',
    brand:'VELOR',
    cat:'Accessories',
    price:349,
    oldPrice:null,
    rating:4.8,
    reviews:96,
    image:'https://images.unsplash.com/photo-1577803645773-f96470509666',
    badge:'New',
    desc:'UV-protected premium designer sunglasses.',
    sizes:['Standard'],
    colors:['Black','Gold']
  },

  {
    id:7,
    name:'Diamond Bracelet',
    brand:'ÉTOILE',
    cat:'Accessories',
    price:899,
    oldPrice:999,
    rating:4.9,
    reviews:72,
    image:'https://images.unsplash.com/photo-1590156118437-baa48141e3be',
    badge:'Sale',
    desc:'Elegant luxury bracelet with crystal detailing.',
    sizes:['S','M','L'],
    colors:['Silver','Gold']
  },

  {
    id:8,
    name:'Premium Hoodie',
    brand:'MAISON',
    cat:'Apparel',
    price:299,
    oldPrice:null,
    rating:4.5,
    reviews:145,
    image:'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77',
    badge:'New',
    desc:'Soft cotton oversized premium hoodie.',
    sizes:['S','M','L','XL'],
    colors:['Black','Grey']
  },

  {
    id:9,
    name:'Formal Blazer',
    brand:'LUXORA',
    cat:'Apparel',
    price:699,
    oldPrice:850,
    rating:4.8,
    reviews:84,
    image:'https://images.unsplash.com/photo-1592343516109-362f7bd871aa',
    badge:'Sale',
    desc:'Tailored luxury blazer for formal occasions.',
    sizes:['M','L','XL'],
    colors:['Navy','Black']
  },

  {
    id:10,
    name:'Silk Evening Dress',
    brand:'ÉLITE',
    cat:'Apparel',
    price:799,
    oldPrice:null,
    rating:4.9,
    reviews:61,
    image:'https://images.unsplash.com/photo-1779816145902-8c4ea7d35c7c',
    badge:'New',
    desc:'Elegant silk dress with premium finish.',
    sizes:['S','M','L'],
    colors:['Red','Black']
  },

  {
    id:11,
    name:'Ocean Breeze Perfume',
    brand:'LUMIÈRE',
    cat:'Fragrance',
    price:249,
    oldPrice:299,
    rating:4.7,
    reviews:188,
    image:'https://images.unsplash.com/photo-1632928145408-ef47a7672964',
    badge:'Sale',
    desc:'Fresh aquatic fragrance with citrus notes.',
    sizes:['50ml','100ml'],
    colors:[]
  },

  {
    id:12,
    name:'Royal Oud',
    brand:'BOISÉ',
    cat:'Fragrance',
    price:599,
    oldPrice:null,
    rating:4.9,
    reviews:210,
    image:'https://images.unsplash.com/photo-1632928145408-ef47a7672964',
    badge:'New',
    desc:'Luxury oud fragrance with woody undertones.',
    sizes:['100ml'],
    colors:[]
  },

  {
    id:13,
    name:'Velvet Musk',
    brand:'AUREL',
    cat:'Fragrance',
    price:399,
    oldPrice:499,
    rating:4.6,
    reviews:132,
    image:'https://images.unsplash.com/photo-1632928145408-ef47a7672964',
    badge:'Sale',
    desc:'Warm musk fragrance with amber finish.',
    sizes:['50ml'],
    colors:[]
  },

  {
    id:14,
    name:'Luxury Sneakers',
    brand:'BROGUES CO.',
    cat:'Footwear',
    price:549,
    oldPrice:null,
    rating:4.7,
    reviews:176,
    image:'https://images.unsplash.com/photo-1608256246200-53e635b5b65f',
    badge:'New',
    desc:'Premium streetwear sneakers.',
    sizes:['7','8','9','10'],
    colors:['White','Black']
  },

  {
    id:15,
    name:'Leather Boots',
    brand:'NOIR',
    cat:'Footwear',
    price:699,
    oldPrice:850,
    rating:4.8,
    reviews:93,
    image:'https://images.unsplash.com/photo-1608256246200-53e635b5b65f',
    badge:'Sale',
    desc:'Handcrafted leather boots.',
    sizes:['8','9','10'],
    colors:['Brown','Black']
  },

  {
    id:16,
    name:'Classic Heels',
    brand:'ÉTOILE',
    cat:'Footwear',
    price:499,
    oldPrice:null,
    rating:4.6,
    reviews:68,
    image:'https://plus.unsplash.com/premium_photo-1676234844384-82e1830af724',
    badge:'New',
    desc:'Elegant designer heels.',
    sizes:['6','7','8'],
    colors:['Red','Black']
  },

  {
    id:17,
    name:'Luxury Candle Set',
    brand:'VELORA',
    cat:'Wellness',
    price:199,
    oldPrice:null,
    rating:4.5,
    reviews:101,
    image:'https://images.unsplash.com/photo-1603905179139-db12ab535ca9',
    badge:'New',
    desc:'Aromatic candle collection.',
    sizes:['Standard'],
    colors:['White']
  },

  {
    id:18,
    name:'Organic Skincare Kit',
    brand:'PUREL',
    cat:'Wellness',
    price:349,
    oldPrice:420,
    rating:4.8,
    reviews:134,
    image:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
    badge:'Sale',
    desc:'Complete luxury skincare routine.',
    sizes:['Kit'],
    colors:[]
  },

  {
    id:19,
    name:'Spa Essential Oils',
    brand:'ZENITH',
    cat:'Wellness',
    price:259,
    oldPrice:null,
    rating:4.7,
    reviews:89,
    image:'https://images.unsplash.com/photo-1581514439794-f9777f7c22eb',
    badge:'New',
    desc:'Relaxing essential oils for spa therapy.',
    sizes:['100ml'],
    colors:[]
  }
];

module.exports = products;