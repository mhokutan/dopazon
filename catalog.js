// ===== DOPAZON SHARED PRODUCT CATALOG =====
// Single source of truth for the seed catalog. Loaded by shop.html and
// product.html so every product that appears in the grid also has a working
// detail page (previously product.html only knew 12 of the 85 products and
// silently rendered the wrong one for the other 73).

const DZ_CATALOG = [
  // Fashion
  {id:'s1',emoji:'👟',img:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80',title:'UltraRun Pro Sneakers — Responsive Foam, Wide Toe Box',price:189,category:'fashion',stars:4.8,reviews:12847,store_name:'SpeedShop'},
  {id:'s9',emoji:'👜',img:'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',title:'LuxCraft Structured Tote — Pebbled Leather',price:395,category:'fashion',stars:4.6,reviews:4123,store_name:'LuxBoutique'},
  {id:'sf3',emoji:'🕶️',img:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80',title:'Aviator Sunglasses — UV400 Polarized, Titanium Frame',price:129,category:'fashion',stars:4.7,reviews:8341,store_name:'LuxBoutique'},
  {id:'sf4',emoji:'⌚',img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',title:'Minimalist Watch — Sapphire Glass, 5ATM Waterproof',price:249,category:'fashion',stars:4.8,reviews:15023,store_name:'TimeKeeper'},
  {id:'sf5',emoji:'👠',img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',title:'Strappy Heeled Sandals — Block Heel, Cushioned Insole',price:119,category:'fashion',stars:4.5,reviews:6782,store_name:'LuxBoutique'},
  {id:'sf6',emoji:'🧥',img:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',title:'Puffer Jacket — 700 Fill Power Down, Packable',price:299,category:'fashion',stars:4.9,reviews:21045,store_name:'OutdoorPro'},
  // Electronics
  {id:'s2',emoji:'📱',img:'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=400&q=80',title:'Aplix ProMax Ultra — 6.9" OLED, Triple Camera',price:1299,category:'electronics',stars:4.7,reviews:8934,store_name:'TechVault'},
  {id:'s5',emoji:'🎧',img:'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',title:'SoundWave Elite Wireless — 40hr Battery, ANC',price:349,category:'electronics',stars:4.8,reviews:18923,store_name:'TechVault'},
  {id:'s10',emoji:'🎮',img:'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80',title:'VortexPlay Handheld Console — 10,000+ Games',price:199,category:'electronics',stars:4.8,reviews:15678,store_name:'TechVault'},
  {id:'se4',emoji:'⌨️',img:'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80',title:'MechType Pro Keyboard — Hot-Swap Switches, RGB',price:159,category:'electronics',stars:4.9,reviews:27891,store_name:'TechVault'},
  {id:'se5',emoji:'📷',img:'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&q=80',title:'MirrorPro Camera — 45MP, 8K Video, Dual IS',price:2499,category:'electronics',stars:4.8,reviews:5612,store_name:'TechVault'},
  {id:'se6',emoji:'🖥️',img:'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&q=80',title:'UltraWide Monitor — 34" Curved, 165Hz, HDR600',price:799,category:'electronics',stars:4.7,reviews:9204,store_name:'TechVault'},
  {id:'se7',emoji:'🎙️',img:'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80',title:'Studio Condenser Mic — XLR/USB, Cardioid Pattern',price:199,category:'electronics',stars:4.8,reviews:14337,store_name:'TechVault'},
  // Beauty
  {id:'s3',emoji:'💄',img:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',title:'GlowLux Vitamin C Serum — Brightening, Anti-Aging',price:68,category:'beauty',stars:4.9,reviews:23156,store_name:'GlowLab'},
  {id:'s11',emoji:'🧴',img:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',title:'DermaClear Retinol Night Cream — Clinically Tested',price:85,category:'beauty',stars:4.7,reviews:11234,store_name:'GlowLab'},
  {id:'sb3',emoji:'💅',img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',title:'Makeup Brush Set — 15pc Vegan, Rose Gold Handles',price:45,category:'beauty',stars:4.8,reviews:34512,store_name:'GlowLab'},
  {id:'sb4',emoji:'🌸',img:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',title:'Hyaluronic Acid Moisturizer — 72hr Hydration',price:52,category:'beauty',stars:4.9,reviews:41023,store_name:'GlowLab'},
  {id:'sb5',emoji:'🧖',img:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80',title:'Jade Roller & Gua Sha Set — Rose Quartz',price:35,category:'beauty',stars:4.6,reviews:18904,store_name:'GlowLab'},
  // Home
  {id:'s4',emoji:'☕',img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',title:'BrewMaster Pro Coffee Machine — 12-Cup, Built-in Grinder',price:249,category:'home',stars:4.6,reviews:5432,store_name:'HomeZen'},
  {id:'s8',emoji:'🌿',img:'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400&q=80',title:'ZenMist Essential Oil Diffuser — 7 LED Colors',price:45,category:'home',stars:4.5,reviews:9234,store_name:'HomeZen'},
  {id:'s12',emoji:'🛋️',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',title:'NapCloud Bean Bag — Memory Foam, Velvet',price:299,category:'home',stars:4.5,reviews:6789,store_name:'HomeZen'},
  {id:'sh4',emoji:'🕯️',img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',title:'Luxury Candle Set — 3 Scents, 60hr Burn Time',price:65,category:'home',stars:4.8,reviews:22341,store_name:'HomeZen'},
  {id:'sh5',emoji:'🪴',img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',title:'Ceramic Planter Set — 3 Sizes, Drainage Holes',price:49,category:'home',stars:4.7,reviews:12089,store_name:'HomeZen'},
  {id:'sh6',emoji:'🛏️',img:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80',title:'Weighted Blanket — 15lbs, Cooling Cotton',price:89,category:'home',stars:4.9,reviews:38204,store_name:'HomeZen'},
  {id:'sh7',emoji:'🍳',img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',title:'Cast Iron Skillet Set — Pre-Seasoned, 3 Sizes',price:119,category:'home',stars:4.8,reviews:17653,store_name:'HomeZen'},
  // Sports
  {id:'s7',emoji:'🏋️',img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',title:'FlexCore Adjustable Dumbbells — 5-52.5 lbs',price:429,category:'sports',stars:4.7,reviews:7823,store_name:'FitWorld'},
  {id:'ss2',emoji:'🧘',img:'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',title:'Premium Yoga Mat — 6mm Non-Slip, Alignment Lines',price:79,category:'sports',stars:4.8,reviews:29341,store_name:'FitWorld'},
  {id:'ss3',emoji:'🚴',img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',title:'Smart Exercise Bike — 22" Screen, Auto Resistance',price:1499,category:'sports',stars:4.7,reviews:6123,store_name:'FitWorld'},
  {id:'ss4',emoji:'🏊',img:'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',title:'Fitness Tracker Watch — GPS, Heart Rate, Sleep',price:249,category:'sports',stars:4.6,reviews:43201,store_name:'FitWorld'},
  {id:'ss5',emoji:'🥊',img:'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400&q=80',title:'Boxing Gloves — 16oz, Wrist Wrap Support',price:69,category:'sports',stars:4.8,reviews:11234,store_name:'FitWorld'},
  // Pets
  {id:'s6',emoji:'🐕',img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',title:'PawNutrition Premium Dog Food — Grain-Free Formula',price:89,category:'pets',stars:4.9,reviews:31024,store_name:'PetParadise'},
  {id:'sp2',emoji:'🐈',img:'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80',title:'Interactive Cat Tower — 5 Tiers, Sisal Posts',price:129,category:'pets',stars:4.7,reviews:19823,store_name:'PetParadise'},
  {id:'sp3',emoji:'🦮',img:'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&q=80',title:'Retractable Dog Leash — 26ft, Anti-Tangle',price:35,category:'pets',stars:4.8,reviews:54231,store_name:'PetParadise'},
  {id:'sp4',emoji:'🐾',img:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80',title:'Orthopedic Dog Bed — Memory Foam, Washable Cover',price:99,category:'pets',stars:4.9,reviews:28901,store_name:'PetParadise'},
  {id:'sp5',emoji:'🐠',img:'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&q=80',title:'Aquarium Starter Kit — 20 Gallon, LED, Filter',price:149,category:'pets',stars:4.6,reviews:8123,store_name:'PetParadise'},
  {id:'sp6',emoji:'🐦',img:'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80',title:'Bird Cage Deluxe — 3-Story, Stainless Bars',price:189,category:'pets',stars:4.7,reviews:5432,store_name:'PetParadise'},
  {id:'sp7',emoji:'🐱',img:'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80',title:'Premium Cat Food — Grain-Free Salmon & Tuna',price:55,category:'pets',stars:4.9,reviews:42301,store_name:'PetParadise'},
  {id:'sp8',emoji:'🦴',img:'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',title:'Dog Treat Variety Pack — 6 Flavors, No Artificial',price:29,category:'pets',stars:4.8,reviews:67890,store_name:'PetParadise'},
  // More Fashion
  {id:'sf7',emoji:'👒',img:'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&q=80',title:'Wide Brim Sun Hat — UPF 50+, Packable',price:58,category:'fashion',stars:4.7,reviews:9823,store_name:'LuxBoutique'},
  {id:'sf8',emoji:'🧣',img:'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80',title:'Cashmere Scarf — 100% Pure, 12 Colors',price:149,category:'fashion',stars:4.8,reviews:7234,store_name:'LuxBoutique'},
  {id:'sf9',emoji:'👗',img:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80',title:'Floral Wrap Dress — Midi Length, Adjustable Tie',price:89,category:'fashion',stars:4.6,reviews:14521,store_name:'LuxBoutique'},
  {id:'sf10',emoji:'🥿',img:'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80',title:'Leather Loafers — Hand-Stitched, Cushioned Sole',price:175,category:'fashion',stars:4.7,reviews:6341,store_name:'SpeedShop'},
  {id:'sf11',emoji:'🎒',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',title:'Travel Backpack — 40L, Anti-Theft, USB Charging',price:129,category:'fashion',stars:4.9,reviews:31045,store_name:'OutdoorPro'},
  {id:'sf12',emoji:'💍',img:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',title:'Sterling Silver Ring Set — 5 Stackable Bands',price:79,category:'fashion',stars:4.8,reviews:18723,store_name:'LuxBoutique'},
  {id:'sf13',emoji:'👔',img:'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80',title:'Slim Fit Dress Shirt — Non-Iron, Stretch Cotton',price:95,category:'fashion',stars:4.7,reviews:11023,store_name:'TimeKeeper'},
  {id:'sf14',emoji:'🩳',img:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80',title:'Athletic Shorts — 5" Inseam, Quick-Dry, Pockets',price:45,category:'fashion',stars:4.8,reviews:28901,store_name:'FitWorld'},
  // More Electronics
  {id:'se8',emoji:'🖨️',img:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80',title:'Wireless Laser Printer — Auto Duplex, 42ppm',price:329,category:'electronics',stars:4.6,reviews:12034,store_name:'TechVault'},
  {id:'se9',emoji:'📡',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',title:'WiFi 6E Router — Tri-Band, 10Gbps, Coverage 5000sqft',price:449,category:'electronics',stars:4.8,reviews:19823,store_name:'TechVault'},
  {id:'se10',emoji:'🔌',img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',title:'65W GaN Charger — 3-Port, Folds Flat, PD 3.0',price:49,category:'electronics',stars:4.9,reviews:87234,store_name:'TechVault'},
  {id:'se11',emoji:'🎵',img:'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80',title:'Bluetooth Speaker — 360° Sound, IP67, 24hr Battery',price:129,category:'electronics',stars:4.8,reviews:43201,store_name:'TechVault'},
  {id:'se12',emoji:'💻',img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',title:'UltraBook Pro — 14" OLED, Intel i9, 32GB RAM',price:1799,category:'electronics',stars:4.7,reviews:8234,store_name:'TechVault'},
  {id:'se13',emoji:'🎛️',img:'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&q=80',title:'Smart Home Hub — Works with Alexa, Google, Matter',price:99,category:'electronics',stars:4.6,reviews:15023,store_name:'TechVault'},
  {id:'se14',emoji:'📺',img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',title:'QLED TV 65" — 4K 120Hz, Dolby Vision, Gaming Mode',price:1299,category:'electronics',stars:4.8,reviews:6782,store_name:'TechVault'},
  {id:'se15',emoji:'🖱️',img:'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',title:'Wireless Gaming Mouse — 25600 DPI, 70hr Battery',price:79,category:'electronics',stars:4.9,reviews:34512,store_name:'TechVault'},
  // More Beauty
  {id:'sb6',emoji:'🧼',img:'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&q=80',title:'Luxury Bar Soap Set — 6 Scents, Shea Butter',price:38,category:'beauty',stars:4.7,reviews:23401,store_name:'GlowLab'},
  {id:'sb7',emoji:'💇',img:'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80',title:'Hair Mask Treatment — Keratin Repair, 4-Week Kit',price:65,category:'beauty',stars:4.8,reviews:31023,store_name:'GlowLab'},
  {id:'sb8',emoji:'🌞',img:'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=400&q=80',title:'SPF 50 Sunscreen — Invisible Finish, Water-Resistant',price:32,category:'beauty',stars:4.9,reviews:56782,store_name:'GlowLab'},
  {id:'sb9',emoji:'👄',img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',title:'Matte Lipstick Collection — 12 Shades, Long-Wear',price:58,category:'beauty',stars:4.7,reviews:19823,store_name:'GlowLab'},
  {id:'sb10',emoji:'🫧',img:'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',title:'Face Wash Foam Cleanser — AHA/BHA, Pore Minimizing',price:28,category:'beauty',stars:4.8,reviews:44231,store_name:'GlowLab'},
  {id:'sb11',emoji:'💜',img:'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80',title:'Eye Cream — Peptide Complex, Reduces Dark Circles',price:72,category:'beauty',stars:4.6,reviews:14523,store_name:'GlowLab'},
  {id:'sb12',emoji:'🧖‍♀️',img:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80',title:'LED Face Mask — 7 Color Therapy, Clinically Proven',price:199,category:'beauty',stars:4.7,reviews:9823,store_name:'GlowLab'},
  // More Home
  {id:'sh8',emoji:'🫖',img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',title:'Electric Kettle — 1.7L, Variable Temp, Keep Warm',price:79,category:'home',stars:4.8,reviews:32014,store_name:'HomeZen'},
  {id:'sh9',emoji:'🧹',img:'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80',title:'Robot Vacuum — LiDAR Mapping, Auto-Empty Base',price:549,category:'home',stars:4.7,reviews:14823,store_name:'HomeZen'},
  {id:'sh10',emoji:'🌬️',img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',title:'Air Purifier — H13 HEPA, 600sqft, Ultra Quiet',price:229,category:'home',stars:4.9,reviews:27301,store_name:'HomeZen'},
  {id:'sh11',emoji:'🪞',img:'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?w=400&q=80',title:'LED Vanity Mirror — 10x Magnifying, Dimmable Ring',price:89,category:'home',stars:4.8,reviews:18902,store_name:'HomeZen'},
  {id:'sh12',emoji:'🍷',img:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',title:'Wine Rack & Decanter Set — Holds 12 Bottles',price:69,category:'home',stars:4.6,reviews:9234,store_name:'HomeZen'},
  {id:'sh13',emoji:'🛁',img:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80',title:'Bamboo Bath Tray — Adjustable, Phone & Wine Holder',price:45,category:'home',stars:4.7,reviews:21045,store_name:'HomeZen'},
  {id:'sh14',emoji:'🌡️',img:'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80',title:'Smart Thermostat — Learning AI, Energy Saving, WiFi',price:179,category:'home',stars:4.8,reviews:33201,store_name:'HomeZen'},
  {id:'sh15',emoji:'🔪',img:'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&q=80',title:'Chef Knife Set — German Steel, Full Tang, 8-Piece',price:199,category:'home',stars:4.9,reviews:28341,store_name:'HomeZen'},
  {id:'sh16',emoji:'🧺',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',title:'Linen Duvet Cover Set — King, 400 Thread Count',price:139,category:'home',stars:4.7,reviews:16782,store_name:'HomeZen'},
  // More Sports
  {id:'ss6',emoji:'⛺',img:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80',title:'Camping Tent — 4-Person, Waterproof, Quick Setup',price:249,category:'sports',stars:4.8,reviews:12034,store_name:'OutdoorPro'},
  {id:'ss7',emoji:'🏄',img:'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&q=80',title:'Paddleboard Inflatable — 11ft, 350lb Capacity',price:699,category:'sports',stars:4.7,reviews:5823,store_name:'OutdoorPro'},
  {id:'ss8',emoji:'🎽',img:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80',title:'Compression Running Tights — Moisture-Wicking, Pockets',price:79,category:'sports',stars:4.8,reviews:24301,store_name:'FitWorld'},
  {id:'ss9',emoji:'🏈',img:'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&q=80',title:'Foam Roller Set — 3 Densities, Deep Tissue Relief',price:49,category:'sports',stars:4.9,reviews:38902,store_name:'FitWorld'},
  {id:'ss10',emoji:'🧗',img:'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&q=80',title:'Resistance Bands Set — 5 Levels, Fabric Anti-Slip',price:35,category:'sports',stars:4.8,reviews:61234,store_name:'FitWorld'},
  {id:'ss11',emoji:'🎾',img:'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80',title:'Tennis Racket Pro — Carbon Fiber, Vibration Dampener',price:189,category:'sports',stars:4.7,reviews:8123,store_name:'FitWorld'},
  {id:'ss12',emoji:'🏒',img:'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=400&q=80',title:'Pull-Up Bar — Doorframe, No Screws, 300lb Capacity',price:55,category:'sports',stars:4.8,reviews:42301,store_name:'FitWorld'},
  // Food
  {id:'fd1',emoji:'🫙',img:'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',title:'Organic Honey — Raw, Unfiltered, 32oz Jar',price:28,category:'food',stars:4.9,reviews:54231,store_name:'NatureBox'},
  {id:'fd2',emoji:'🫒',img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',title:'Extra Virgin Olive Oil — Cold Pressed, 1L, Italian',price:35,category:'food',stars:4.8,reviews:31023,store_name:'NatureBox'},
  {id:'fd3',emoji:'🍫',img:'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80',title:'Dark Chocolate Box — 72% Cacao, 24 Assorted Truffles',price:45,category:'food',stars:4.9,reviews:67890,store_name:'NatureBox'},
  {id:'fd4',emoji:'☕',img:'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',title:'Specialty Coffee Sampler — 6 Single Origins, Whole Bean',price:55,category:'food',stars:4.8,reviews:23401,store_name:'NatureBox'},
  {id:'fd5',emoji:'🍵',img:'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80',title:'Matcha Green Tea — Ceremonial Grade, 100g Tin',price:42,category:'food',stars:4.7,reviews:18902,store_name:'NatureBox'},
  {id:'fd6',emoji:'🥜',img:'https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=400&q=80',title:'Mixed Nut Variety Pack — No Salt, 6lb Bulk Bag',price:38,category:'food',stars:4.8,reviews:44231,store_name:'NatureBox'},
  {id:'fd7',emoji:'🫐',img:'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80',title:'Freeze-Dried Fruit Mix — 8 Fruits, No Sugar Added',price:29,category:'food',stars:4.7,reviews:32014,store_name:'NatureBox'},
  {id:'fd8',emoji:'🧄',img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',title:'Hot Sauce Collection — 12 Bottles, World Flavors',price:62,category:'food',stars:4.9,reviews:28341,store_name:'NatureBox'},
];

// Hand-written long-form detail for the flagship products. Anything not listed
// here is enriched generically by product.html (enrichProduct).
const DZ_DETAILS = [
  {id:'s1',emoji:'👟',title:'UltraRun Pro Sneakers — Responsive Foam, Wide Toe Box, Breathable Mesh Upper',price:189,category:'fashion',stars:4.8,reviews:12847,store:'SpeedShop',
    desc:'The UltraRun Pro combines cutting-edge foam technology with a wide toe box for natural foot movement. Designed for serious runners and casual wearers alike.',
    features:['Responsive foam midsole for energy return on every step','Wide toe box allows natural toe splay','Breathable engineered mesh keeps feet cool','Rubber outsole provides excellent traction','Available in 8 colorways','Machine washable'],
    specs:[['Brand','SpeedShop'],['Material','Engineered Mesh + Synthetic'],['Sole','Rubber'],['Closure','Lace-up'],['Weight','8.5 oz per shoe'],['Country','Made in Imagination'],['Warranty','Lifetime (everything is free)']]},
  {id:'s2',emoji:'📱',title:'Aplix ProMax Ultra — 6.9" OLED Display, Triple Camera System, 5G Ready',price:1299,category:'electronics',stars:4.7,reviews:8934,store:'TechVault',
    desc:'The most powerful smartphone that has never existed. Features an impossible battery life, a camera that does everything, and a screen so bright it can be seen from space.',
    features:['6.9" ProMotion OLED — 120Hz adaptive refresh','200MP triple camera system with AI enhancement','72-hour battery life on a single charge','Titanium aerospace-grade frame','Satellite connectivity included','Self-repairing screen technology'],
    specs:[['Display','6.9" OLED, 120Hz'],['Camera','200MP + 50MP + 12MP'],['Battery','7,500 mAh'],['Processor','DopaMind Ultra Chip'],['Storage','1TB + unlimited cloud'],['5G','Yes (and 6G, and 7G']]},
  {id:'s3',emoji:'💄',title:'GlowLux Vitamin C Serum — Brightening, Anti-Aging, Dermatologist Tested',price:68,category:'beauty',stars:4.9,reviews:23156,store:'GlowLab',
    desc:'Our most concentrated Vitamin C formula (20% stable L-Ascorbic Acid) combined with Hyaluronic Acid and Vitamin E to target dullness, uneven tone, and fine lines.',
    features:['20% stable L-Ascorbic Acid — highest concentration','Hyaluronic Acid for 24-hour hydration','Vitamin E for antioxidant protection','Lightweight, fast-absorbing formula','Dermatologist tested and approved','Cruelty-free and vegan formula'],
    specs:[['Skin Type','All skin types'],['Key Ingredient','20% Vitamin C (L-AA)'],['Volume','1 fl oz / 30ml'],['Texture','Lightweight serum'],['Scent','Fragrance-free'],['Tested','Dermatologist approved']]},
  {id:'s4',emoji:'☕',title:'BrewMaster Pro Coffee Machine — 12-Cup, Built-in Grinder, Smart Connect',price:249,category:'home',stars:4.6,reviews:5432,store:'HomeZen',
    desc:'The BrewMaster Pro grinds fresh beans and brews a perfect pot every time. Smart scheduling, temperature control, and self-cleaning make mornings easier.',
    features:['Built-in conical burr grinder — 5 grind settings','12-cup thermal carafe keeps coffee hot for 4 hours','Smart scheduling via app — wake up to fresh coffee','Precise brew temperature control (195–205°F)','Self-cleaning cycle with one button','Compatible with ground coffee too'],
    specs:[['Capacity','12 cups / 60 fl oz'],['Grinder','Conical burr, 5 settings'],['Carafe','Thermal stainless steel'],['Control','App + manual'],['Dimensions','14" H × 8" W × 12" D'],['Warranty','2 years (or forever, it\'s free)']]},
  {id:'s5',emoji:'🎧',title:'SoundWave Elite Wireless Headphones — 40hr Battery, Active Noise Cancellation',price:349,category:'electronics',stars:4.8,reviews:18923,store:'TechVault',
    desc:'Studio-quality sound meets all-day comfort. The SoundWave Elite features 40mm dynamic drivers, industry-leading ANC, and a 40-hour battery that keeps the music going.',
    features:['40-hour battery life with ANC on','Industry-leading active noise cancellation','40mm dynamic drivers for studio-quality audio','Auto-pause when headphones are removed','Multipoint connection — 2 devices simultaneously','Foldable design with premium carry case'],
    specs:[['Driver Size','40mm dynamic'],['Battery','40 hours ANC on / 60 hours off'],['Bluetooth','5.3, multipoint'],['ANC Levels','3 (Light, Full, Transparency)'],['Weight','254g'],['Charging','USB-C, 10 min = 3 hours']]},
  {id:'s6',emoji:'🐕',title:'PawNutrition Premium Dog Food — Grain-Free, Real Chicken & Sweet Potato',price:89,category:'pets',stars:4.9,reviews:31024,store:'PetParadise',
    desc:'Made with real chicken as the #1 ingredient. Our grain-free formula supports healthy digestion, a shiny coat, and strong muscles for dogs of all sizes.',
    features:['Real chicken is the #1 ingredient','Grain-free for sensitive stomachs','Added Omega-3 & 6 for skin and coat health','No artificial colors, flavors, or preservatives','Supports healthy digestion with prebiotics','Suitable for all life stages'],
    specs:[['Main Protein','Real chicken'],['Formula','Grain-free'],['Size','15 lb bag'],['Life Stage','All stages'],['Guaranteed Analysis','Min. 30% protein, 15% fat'],['Calories','360 kcal/cup']]},
  {id:'s8',emoji:'🌿',title:'ZenMist Essential Oil Diffuser — Ultrasonic, 7 Color LED, 500ml Tank',price:45,category:'home',stars:4.5,reviews:9234,store:'HomeZen',
    desc:'Transform your space with the ZenMist diffuser. Using ultrasonic technology, it converts water and essential oils into a fine, cool mist that fills your room with your favorite scents.',
    features:['500ml water tank — runs up to 10 hours','7 LED color options with brightness control','Ultra-quiet operation — perfect for bedroom','Auto shut-off when water runs low','Compatible with all essential oils','4 timer settings: 1h, 3h, 6h, continuous'],
    specs:[['Capacity','500ml'],['Run Time','Up to 10 hours'],['LED','7 colors'],['Noise Level','<30dB'],['Power','12W'],['Material','BPA-free plastic']]},
  {id:'s9',emoji:'👜',title:'LuxCraft Structured Tote Bag — Pebbled Leather, Gold Hardware',price:395,category:'fashion',stars:4.6,reviews:4123,store:'LuxBoutique',
    desc:'Handcrafted from premium pebbled leather, the LuxCraft Tote features a structured silhouette, gold-tone hardware, and a spacious interior designed for the modern professional.',
    features:['Premium pebbled leather exterior','Gold-tone magnetic snap closure','Interior zip pocket + 2 slip pockets','Removable crossbody strap included','Dust bag included','Fits 13" laptop'],
    specs:[['Material','Genuine pebbled leather'],['Hardware','Gold-tone zinc alloy'],['Dimensions','14"W × 11"H × 5"D'],['Interior','Fabric-lined with pockets'],['Strap Drop','10" handles / 22" crossbody'],['Closure','Magnetic snap']]},
  {id:'s10',emoji:'🎮',title:'VortexPlay Handheld Console — 10,000+ Built-in Games, HD Screen',price:199,category:'electronics',stars:4.8,reviews:15678,store:'TechVault',
    desc:'The VortexPlay packs over 10,000 retro and indie games into a sleek handheld form factor. With a 5" IPS display and 8-hour battery, it\'s the ultimate gaming companion.',
    features:['10,000+ pre-loaded games across 20+ systems','5" IPS display — 720p full lamination','8-hour battery life','Dual speakers with 3D surround sound','Wi-Fi for multiplayer + online leaderboards','USB-C charging'],
    specs:[['Display','5" IPS 720p'],['Storage','256GB built-in'],['Battery','8 hours'],['Connectivity','Wi-Fi, Bluetooth 5.0, USB-C'],['Weight','320g'],['Systems','NES, SNES, GBA, PS1, and more']]},
  {id:'s11',emoji:'🧴',title:'DermaClear Retinol Night Cream — Clinically Tested, 0.5% Retinol Complex',price:85,category:'beauty',stars:4.7,reviews:11234,store:'GlowLab',
    desc:'Formulated with a 0.5% encapsulated retinol complex and niacinamide, DermaClear smooths fine lines, fades dark spots, and improves skin texture — clinically proven in 8 weeks.',
    features:['0.5% encapsulated retinol for gradual, gentle release','Niacinamide (5%) fades dark spots and evens tone','Peptide complex for firmness and elasticity','Non-comedogenic — safe for acne-prone skin','Dermatologist tested and approved','Fragrance-free, paraben-free'],
    specs:[['Retinol %','0.5% encapsulated'],['Niacinamide','5%'],['Size','1.7 fl oz / 50ml'],['Texture','Rich cream'],['Skin Type','All types incl. sensitive'],['Tested','8-week clinical study']]},
  {id:'s12',emoji:'🛋️',title:'NapCloud Bean Bag Chair — Memory Foam Fill, Velvet Cover, XL',price:299,category:'home',stars:4.5,reviews:6789,store:'HomeZen',
    desc:'Sink into the NapCloud — filled with premium shredded memory foam that conforms to your body. The ultra-soft velvet cover is removable and machine washable.',
    features:['Premium shredded memory foam fill','Ultra-soft velvet cover — removable & washable','XL size fits adults comfortably','Durable double-stitched zipper closure','Refillable — add more foam over time','Available in 8 colors'],
    specs:[['Fill','Shredded memory foam'],['Cover','100% polyester velvet'],['Size','XL — 6ft diameter when flat'],['Weight','18 lbs'],['Washing','Machine wash cold, tumble dry low'],['Zipper','Heavy-duty YKK']]},
  {id:'s7',emoji:'🏋️',title:'FlexCore Adjustable Dumbbells — 5 to 52.5 lbs per Hand, Space-Saving Design',price:429,category:'sports',stars:4.7,reviews:7823,store:'FitWorld',
    desc:'Replace 15 sets of dumbbells with one. The FlexCore system adjusts from 5 to 52.5 lbs in 2.5-lb increments with a simple twist of the handle.',
    features:['Replaces 15 pairs of dumbbells (5–52.5 lbs)','Adjusts in 2.5-lb increments in seconds','Durable plastic tray stores all weight plates','Ergonomic handle with contoured grip','Safe locking mechanism prevents weight from slipping','2-year warranty on all components'],
    specs:[['Weight Range','5–52.5 lbs per dumbbell'],['Increments','2.5 lbs'],['Material','Steel plates, ABS housing'],['Length','17" at maximum weight'],['Tray Dimensions','24" × 8" × 9"'],['Sold As','Pair of 2 dumbbells']]},
];

// id -> rich detail lookup
const DZ_DETAIL_BY_ID = DZ_DETAILS.reduce((m, d) => { m[d.id] = d; return m; }, {});

// Merged view: every catalog product, with rich detail layered on when present.
// The catalog entry wins for img/emoji/store_name; the detail entry supplies
// the longer title, desc, features and specs.
// `store` is what product.html renders; `store_name` is what shop.html and the
// Supabase rows use. Keep both in sync so the seller shows up on both pages.
const DZ_PRODUCTS = DZ_CATALOG.map(p => {
  const d = DZ_DETAIL_BY_ID[p.id];
  const merged = d ? { ...p, ...d, img: p.img, emoji: p.emoji, store_name: p.store_name } : { ...p };
  merged.store = p.store_name || merged.store || 'Dopazon Store';
  return merged;
});

function dzFindProduct(id) {
  return DZ_PRODUCTS.find(p => p.id === id) || null;
}
