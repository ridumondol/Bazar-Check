// Data served by the built-in /api/bazardor endpoints.
// Prices are sample values (not verified live market prices) — edit this file to change what the API returns.
// category ids (e.g. "chal") are what /api/bazardor/categories/:id and /products?category=:id use.

export const categories = [
  {"id":"chal","name":"চাল","emoji":"🍚"},
  {"id":"dal","name":"ডাল","emoji":"🫘"},
  {"id":"tel","name":"তেল","emoji":"🛢️"},
  {"id":"sobji","name":"সবজি","emoji":"🥬"},
  {"id":"mach","name":"মাছ","emoji":"🐟"},
  {"id":"mangsho","name":"মাংস","emoji":"🍗"},
  {"id":"dim-dudh","name":"ডিম-দুধ","emoji":"🥚"},
  {"id":"moshla","name":"মসলা","emoji":"🌶️"},
];

// change = % change vs yesterday, yesterday = yesterday's price (BDT)
export const products = [
  {"id":1,"name":"স্বর্ণমাছি চাল","category":"chal","unit":"কেজি","price":148,"change":2.1,"yesterday":145,"emoji":"🍚"},
  {"id":2,"name":"মিনিকেট চাল","category":"chal","unit":"কেজি","price":99,"change":-2.9,"yesterday":102,"emoji":"🍚"},
  {"id":3,"name":"নাজির চাল","category":"chal","unit":"কেজি","price":74,"change":0,"yesterday":74,"emoji":"🍚"},
  {"id":4,"name":"বাটাম সাইজ চাল","category":"chal","unit":"কেজি","price":66,"change":3.1,"yesterday":64,"emoji":"🍚"},
  {"id":5,"name":"মসুর ডাল","category":"dal","unit":"কেজি","price":142,"change":2.9,"yesterday":138,"emoji":"🫘"},
  {"id":6,"name":"মুগ ডাল","category":"dal","unit":"কেজি","price":135,"change":-1.6,"yesterday":137,"emoji":"🫘"},
  {"id":7,"name":"ছোলা","category":"dal","unit":"কেজি","price":120,"change":-2.4,"yesterday":123,"emoji":"🫘"},
  {"id":8,"name":"আমন ডাল (খোসাসিলা)","category":"dal","unit":"কেজি","price":156,"change":2.6,"yesterday":152,"emoji":"🫘"},
  {"id":9,"name":"সরিষার তেল","category":"tel","unit":"লিটার","price":192,"change":1.1,"yesterday":190,"emoji":"🛢️"},
  {"id":10,"name":"পাম তেল","category":"tel","unit":"লিটার","price":168,"change":2.3,"yesterday":164,"emoji":"🛢️"},
  {"id":11,"name":"ঘানি ভাঙা সরিষার তেল","category":"tel","unit":"লিটার","price":215,"change":0.9,"yesterday":213,"emoji":"🛢️"},
  {"id":12,"name":"পেঁয়াজ","category":"sobji","unit":"কেজি","price":54,"change":12.5,"yesterday":48,"emoji":"🧅"},
  {"id":13,"name":"আদা","category":"sobji","unit":"কেজি","price":85,"change":9,"yesterday":78,"emoji":"🫚"},
  {"id":14,"name":"বেগুন","category":"sobji","unit":"কেজি","price":44,"change":4.8,"yesterday":42,"emoji":"🍆"},
  {"id":15,"name":"কাঁচামরিচ","category":"sobji","unit":"কেজি","price":92,"change":-12.4,"yesterday":105,"emoji":"🌶️"},
  {"id":16,"name":"রসুন","category":"sobji","unit":"কেজি","price":125,"change":-7.4,"yesterday":135,"emoji":"🧄"},
  {"id":17,"name":"আলু","category":"sobji","unit":"কেজি","price":30,"change":-6.2,"yesterday":32,"emoji":"🥔"},
  {"id":18,"name":"ঢেঁড়স","category":"sobji","unit":"কেজি","price":38,"change":1.8,"yesterday":37,"emoji":"🥬"},
  {"id":19,"name":"রুই মাছ","category":"mach","unit":"কেজি","price":46,"change":4.5,"yesterday":44,"emoji":"🐟"},
  {"id":20,"name":"কাতলা মাছ","category":"mach","unit":"কেজি","price":43,"change":-4.4,"yesterday":45,"emoji":"🐟"},
  {"id":21,"name":"তেলাপিয়া","category":"mach","unit":"কেজি","price":36,"change":-1.5,"yesterday":37,"emoji":"🐟"},
  {"id":22,"name":"ইলিশ মাছ","category":"mach","unit":"কেজি","price":1850,"change":2.2,"yesterday":1810,"emoji":"🐟"},
  {"id":23,"name":"চিংড়ি মাছ (খোলা)","category":"mach","unit":"কেজি","price":330,"change":-0.8,"yesterday":333,"emoji":"🦐"},
  {"id":24,"name":"মুরগির মাংস","category":"mangsho","unit":"কেজি","price":225,"change":-1.3,"yesterday":228,"emoji":"🍗"},
  {"id":25,"name":"গরুর মাংস","category":"mangsho","unit":"কেজি","price":790,"change":1.2,"yesterday":781,"emoji":"🍗"},
  {"id":26,"name":"হাঁসের মাংস","category":"mangsho","unit":"কেজি","price":285,"change":-3.4,"yesterday":295,"emoji":"🍗"},
  {"id":27,"name":"খাসির মাংস","category":"mangsho","unit":"কেজি","price":1290,"change":-3,"yesterday":1330,"emoji":"🍗"},
  {"id":28,"name":"ডিম","category":"dim-dudh","unit":"ডজন","price":158,"change":3.9,"yesterday":152,"emoji":"🥚"},
  {"id":29,"name":"মাখন (১০০ গ্রাম)","category":"dim-dudh","unit":"পিস","price":145,"change":3.6,"yesterday":140,"emoji":"🧈"},
  {"id":30,"name":"দুধ","category":"dim-dudh","unit":"লিটার","price":102,"change":2,"yesterday":100,"emoji":"🥛"},
  {"id":31,"name":"দই","category":"dim-dudh","unit":"কেজি","price":140,"change":1.5,"yesterday":138,"emoji":"🥛"},
  {"id":32,"name":"মরিচ গুঁড়া","category":"moshla","unit":"কেজি","price":245,"change":-2,"yesterday":250,"emoji":"🌶️"},
  {"id":33,"name":"ধনেপাতা গুঁড়া","category":"moshla","unit":"কেজি","price":265,"change":0.5,"yesterday":264,"emoji":"🌶️"},
];
