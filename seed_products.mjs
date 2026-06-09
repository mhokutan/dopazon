import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jtsifootrchbsgrldfxk.supabase.co';
// IMPORTANT: Replace with your SERVICE ROLE key from Supabase Settings > API
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0c2lmb290cmNoYnNncmxkZnhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDkzMzgyMSwiZXhwIjoyMDk2NTA5ODIxfQ.VVnDz1QFkKhrRUgQPvfsd6v45b7EhXQB_Eo-WNU6FEM';

const sb = createClient(SUPABASE_URL, SERVICE_KEY);

// ===== IMAGE POOLS PER CATEGORY =====
const IMGS = {
  fashion: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80',
    'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&q=80',
  ],
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&q=80',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80',
    'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&q=80',
    'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=400&q=80',
    'https://images.unsplash.com/photo-1586495777744-4e6232bf2177?w=400&q=80',
    'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80',
  ],
  home: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80',
    'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&q=80',
    'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?w=400&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    'https://images.unsplash.com/photo-1602607144537-e67b9d94adea?w=400&q=80',
  ],
  sports: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400&q=80',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80',
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80',
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80',
    'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&q=80',
    'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&q=80',
  ],
  pets: [
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
    'https://images.unsplash.com/photo-1601758174493-8c8ede4d8b01?w=400&q=80',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80',
  ],
  food: [
    'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
    'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80',
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
    'https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=400&q=80',
    'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80',
  ],
  health: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80',
    'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
  ],
  toys: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80',
    'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=400&q=80',
    'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80',
    'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80',
  ],
  gaming: [
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80',
    'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
  ],
  baby: [
    'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80',
    'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&q=80',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
    'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&q=80',
    'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80',
  ],
  books: [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80',
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
  ],
  tools: [
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80',
    'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80',
    'https://images.unsplash.com/photo-1581244277943-fe4a9c777540?w=400&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  ],
  automotive: [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&q=80',
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&q=80',
  ],
  garden: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80',
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=400&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  ],
  office: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80',
  ],
  travel: [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=400&q=80',
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&q=80',
    'https://images.unsplash.com/photo-1609143139664-60a3ec2b4069?w=400&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80',
  ],
  music: [
    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80',
    'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&q=80',
    'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80',
    'https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?w=400&q=80',
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  ],
  art: [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80',
    'https://images.unsplash.com/photo-1579762593175-20226054cad0?w=400&q=80',
    'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80',
    'https://images.unsplash.com/photo-1530435460869-d13625c69bbf?w=400&q=80',
  ],
  kitchen: [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&q=80',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',
  ],
};

// ===== PRODUCT TEMPLATES =====
const TEMPLATES = {
  fashion: [
    {t:'Running Sneakers',e:'👟',b:['ProFlex','AeroStep','SpeedRun','CloudWalk','UltraGlide'],s:['Responsive Foam','Breathable Mesh','Carbon Plate','Wide Toe Box','Arch Support'],p:[89,119,139,159,189,219,249]},
    {t:'Wireless Earbuds',e:'🎧',b:['SoundPod','AirBeat','PureTone','EchoFit','BassPro'],s:['ANC 40dB','30hr Battery','IPX7','Hi-Res Audio','Spatial Sound'],p:[49,79,99,129,149,179,199]},
    {t:'Leather Handbag',e:'👜',b:['LuxCraft','UrbanTote','PoshCarry','ChicBag','EliteLeather'],s:['Pebbled Leather','Gold Hardware','Crossbody Strap','Laptop Fits','Dust Bag Included'],p:[95,149,199,249,299,349,395]},
    {t:'Slim Fit Jeans',e:'👖',b:['DenimPro','UrbanFit','ClassicCut','StretchMax','PremiumDenim'],s:['Stretch Cotton','Slim Tapered','Mid Rise','5-Pocket','Machine Wash'],p:[49,69,89,99,119]},
    {t:'Down Jacket',e:'🧥',b:['ArcticPro','ThermoShield','PuffMaster','WarmLite','AlpineDown'],s:['700 Fill Power','Packable','Water Resistant','Recycled Material','YKK Zippers'],p:[149,199,249,299,349]},
    {t:'Minimalist Watch',e:'⌚',b:['TimeCraft','NordWatch','ElegantTime','ProTimer','UrbanFace'],s:['Sapphire Crystal','40mm Case','5ATM Water Resist','Mesh Strap','Auto Movement'],p:[149,199,249,299,349,399]},
    {t:'Sunglasses',e:'🕶️',b:['RayPro','ShadeMaster','PolarVision','UVShield','LuxShades'],s:['UV400 Polarized','Titanium Frame','Scratch-Resistant','Gradient Lens','Spring Hinges'],p:[49,79,99,129,149,179]},
    {t:'Leather Belt',e:'🪢',b:['BeltCraft','UrbanLeather','SlimBuckle','ClassicBelt','PremiumHide'],s:['Full Grain Leather','Reversible','35mm Width','Solid Brass Buckle','Sizes 30-44'],p:[35,45,55,65,79]},
    {t:'Graphic Tee',e:'👕',b:['ThreadCo','UrbanPrint','SoftWear','StyleBasic','PremiumCotton'],s:['100% Organic Cotton','Relaxed Fit','Pre-Shrunk','Reactive Dye','Ribbed Collar'],p:[19,25,29,35,39,45]},
    {t:'Athletic Shorts',e:'🩳',b:['FlexRun','AeroShort','SportFit','QuickDry','ProAthlete'],s:['Quick-Dry Fabric','5" Inseam','Side Pockets','Elastic Waist','Compression Liner'],p:[29,35,45,49,55,65]},
    {t:'Travel Backpack',e:'🎒',b:['PackPro','TravelMate','CarryAll','AdventureKit','UrbanPack'],s:['40L Capacity','Anti-Theft','USB Charging Port','Laptop Sleeve','TSA-Friendly'],p:[69,89,109,129,149,179]},
    {t:'Yoga Pants',e:'🧘',b:['FlexYoga','ZenWear','StretchFit','CorePants','ActiveLux'],s:['4-Way Stretch','High Waist','Squat-Proof','Moisture-Wicking','Pockets'],p:[39,49,59,69,79,89]},
  ],
  electronics: [
    {t:'Wireless Headphones',e:'🎧',b:['SoundWave','BeatsPro','AudioMaster','PureSound','EchoDrive'],s:['40hr Battery','ANC','Hi-Res Audio','Foldable','Multipoint Connect'],p:[79,99,149,199,249,299,349]},
    {t:'Smartphone',e:'📱',b:['Aplix','NovaTech','ProMax','UltraPhone','NexGen'],s:['6.7" AMOLED 120Hz','200MP Camera','5000mAh Battery','5G','IP68'],p:[399,499,599,799,999,1099,1299]},
    {t:'Laptop',e:'💻',b:['UltraBook','SwiftPro','ThinPad','ProDesk','SlimEdge'],s:['14" OLED','Intel Core i7','32GB RAM','1TB NVMe','12hr Battery'],p:[699,899,999,1199,1399,1599,1799]},
    {t:'Smart Watch',e:'⌚',b:['FitPulse','HealthTrack','SmartBand','WristPro','ActiveWatch'],s:['GPS Built-in','Heart Rate Monitor','Sleep Tracking','7-Day Battery','IP68'],p:[149,199,249,299,349,399]},
    {t:'Mechanical Keyboard',e:'⌨️',b:['MechType','KeyMaster','SwitchPro','TactilePro','ClackBoard'],s:['Hot-Swap Switches','RGB Backlit','Aluminum Frame','Wireless Option','USB-C'],p:[79,99,129,159,199,249]},
    {t:'Monitor',e:'🖥️',b:['UltraView','ProDisplay','ClearScreen','VividPro','SharpVue'],s:['27" IPS 144Hz','4K UHD','HDR600','USB-C 65W','Height Adjustable'],p:[249,349,449,549,649,799]},
    {t:'Gaming Mouse',e:'🖱️',b:['PrecisionPro','SwiftClick','AimBot','GlideMax','TurboClick'],s:['25600 DPI','70hr Battery','RGB Lighting','8 Programmable','Ergonomic Design'],p:[39,49,59,79,99,129]},
    {t:'Bluetooth Speaker',e:'🔊',b:['BassBoom','SoundBox','PortaPlay','EchoMini','TravelSound'],s:['360° Sound','IP67 Waterproof','24hr Battery','Party Mode','USB-C Charge'],p:[49,69,89,99,129,149,179]},
    {t:'Tablet',e:'📱',b:['SlateX','TabPro','PadMaster','DrawBoard','DigitalPad'],s:['11" OLED 120Hz','Apple Pencil Support','8GB RAM','256GB','Cellular Option'],p:[299,399,499,599,699,799]},
    {t:'Wireless Charger',e:'🔌',b:['ChargeFast','WirePad','QuickPower','MagCharge','SpeedDock'],s:['15W Max Output','Multi-Device','Qi2 Certified','LED Indicator','Travel-Friendly'],p:[19,25,29,35,45,55]},
    {t:'Action Camera',e:'📷',b:['ProCam','AdventureShot','XtremeCapture','ActionHero','DuraCam'],s:['4K 120fps','HorizonLock','Waterproof 30m','Voice Control','HyperSmooth'],p:[199,249,299,349,399]},
    {t:'Smart Home Hub',e:'🏠',b:['HomeLink','SmartCore','ConnectHub','AutoHome','NexHome'],s:['Works with Alexa','Google Home','Matter Protocol','Zigbee/Z-Wave','Local Processing'],p:[49,79,99,129,149]},
  ],
  beauty: [
    {t:'Vitamin C Serum',e:'💧',b:['GlowLux','BrightFace','PureClear','DermGlow','LuminSkin'],s:['20% L-Ascorbic Acid','Hyaluronic Acid','Vitamin E','Fragrance-Free','Dermatologist Tested'],p:[28,38,48,58,68,85]},
    {t:'Retinol Night Cream',e:'🧴',b:['DermaClear','NightGlow','AgeFix','SkinRenew','YouthBoost'],s:['0.5% Retinol','Niacinamide 5%','Peptide Complex','Non-Comedogenic','8-Week Clinical'],p:[35,45,55,65,75,85]},
    {t:'Hyaluronic Moisturizer',e:'💦',b:['HydraGlow','AquaFill','MoistMax','DewDrop','HydroBoost'],s:['72hr Hydration','Ceramide Complex','Oil-Free','Lightweight','All Skin Types'],p:[22,28,35,42,52,65]},
    {t:'Makeup Brush Set',e:'💅',b:['BrushPro','GlamKit','ArtistSet','PerfectBlend','ProTools'],s:['15-Piece Set','Vegan Bristles','Rose Gold Handles','Magnetic Case','Cruelty-Free'],p:[25,35,45,55,65,79]},
    {t:'LED Face Mask',e:'💡',b:['GlowTherapy','LightFace','PhotonPro','SkinLight','BeamClear'],s:['7 Color LED','Red+Blue+NIR','Clinical Grade','20min Sessions','Adjustable Straps'],p:[79,99,129,149,179,199]},
    {t:'Sunscreen SPF50',e:'☀️',b:['SunShield','UVBlock','DayGuard','ClearScreen','SkinSafe'],s:['SPF50+ PA++++','Invisible Finish','Water Resistant 80min','Antioxidants','Reef Safe'],p:[18,22,28,32,38,45]},
    {t:'Jade Roller Set',e:'💚',b:['JadeGlow','StoneRoll','CrystalSpa','FaceRoller','ZenRose'],s:['Rose Quartz','Dual-Ended','Gua Sha Included','Cooling Effect','Gift Box'],p:[18,22,28,35,42,49]},
    {t:'Hair Mask',e:'💇',b:['HairRevive','GlossKeratin','SilkRepair','ProteinBoost','ShineMax'],s:['Keratin Complex','Argan Oil','4-Week Treatment','Heat Activated','All Hair Types'],p:[25,35,42,55,65]},
    {t:'Perfume',e:'🌹',b:['AromaNoir','ScentCraft','EauLux','FragrancePro','PerfumeLab'],s:['Eau de Parfum','30ml Bottle','Long-Lasting 12hr','Woody Floral','Unisex Scent'],p:[45,65,85,99,119,149]},
    {t:'Eye Cream',e:'👁️',b:['EyeRevive','DarkCircle Fix','PuffAway','YouthEye','BrightEye'],s:['Peptide Complex','Reduces Dark Circles','De-Puffing','Caffeine','Vitamin K'],p:[28,35,45,55,65,72]},
    {t:'Face Wash',e:'🫧',b:['ClearFoam','PoreClear','AcneFix','GentleCleanse','DermWash'],s:['AHA/BHA','Salicylic Acid 2%','Oil Control','pH Balanced','Pore Minimizing'],p:[12,16,22,28,35]},
    {t:'Lip Balm Set',e:'💋',b:['LipLux','HydraLip','SoftKiss','GlossKit','MoistLip'],s:['SPF 30','Hyaluronic Acid','6-Pack Variety','Long-Lasting','Natural Flavors'],p:[12,18,22,28,35]},
  ],
  home: [
    {t:'Coffee Maker',e:'☕',b:['BrewMaster','CoffeePro','CupCraft','BrewBot','JavaPro'],s:['Built-in Grinder','12-Cup Thermal Carafe','Smart Scheduling','Temperature Control','Self-Cleaning'],p:[79,99,149,199,249,299]},
    {t:'Robot Vacuum',e:'🤖',b:['CleanBot','SweepPro','AutoVac','DustBuster','FloorBot'],s:['LiDAR Mapping','Auto-Empty 60 Days','Mop Function','Pet Hair Mode','App Control'],p:[199,299,399,499,549]},
    {t:'Air Purifier',e:'🌬️',b:['AirClear','PureSky','CleanBreeze','FreshAir','PureZone'],s:['H13 HEPA','600sqft Coverage','CADR 400','Ultra Quiet 22dB','Smart App'],p:[79,99,149,199,229,299]},
    {t:'Smart Thermostat',e:'🌡️',b:['TempSmart','ClimateIQ','AutoTemp','HomeClimate','ComfortPro'],s:['Learning AI','Energy Star Certified','Voice Control','7-Day Schedule','Geofencing'],p:[99,129,149,179,199]},
    {t:'Weighted Blanket',e:'🛏️',b:['DreamWeight','SleepCloud','HugBlanket','CalmComfort','ZenBlanket'],s:['15lbs Premium Fill','Cooling Cotton','Removable Cover','Machine Wash','Stress Relief'],p:[49,65,79,89,99,119]},
    {t:'Cast Iron Set',e:'🍳',b:['IronChef','ProCast','ClassicSkillet','HeatMaster','ForgeKitchen'],s:['Pre-Seasoned','3-Piece Set','Oven Safe 500°F','Induction Ready','Lifetime Warranty'],p:[49,65,79,89,99,119]},
    {t:'Knife Set',e:'🔪',b:['ChefBlade','SharpEdge','SteelMaster','ProCut','KitchenPro'],s:['German Steel','8-Piece Set','Full Tang','Ergonomic Handle','Honing Steel Included'],p:[79,99,119,149,179,199]},
    {t:'Essential Oil Diffuser',e:'🌿',b:['ZenMist','AromaPro','ScentCloud','DiffusePure','VaporZen'],s:['500ml Tank','10hr Run Time','7 LED Colors','Ultra Quiet','Auto Shutoff'],p:[25,35,45,55,65]},
    {t:'Electric Kettle',e:'🫖',b:['HeatPro','BoilSmart','KettleMax','QuickBoil','TempKettle'],s:['1.7L Capacity','Variable Temp 5 Settings','Keep Warm 30min','Gooseneck Option','BPA-Free'],p:[29,39,49,59,79,99]},
    {t:'Candle Set',e:'🕯️',b:['LuxScent','FlameArt','WickWonder','ScentLux','CandleCraft'],s:['3-Pack Variety','60hr Burn Time Each','Soy Wax Blend','Essential Oil Scents','Gift Box'],p:[25,35,45,55,65]},
    {t:'Planter Set',e:'🪴',b:['GreenHome','CeramicPot','PlantPro','TerraForm','GardenLux'],s:['3-Size Set','Drainage Holes','Bamboo Tray','Matte Finish','Indoor/Outdoor'],p:[25,35,45,55,65]},
    {t:'Wine Rack',e:'🍷',b:['VinoCraft','WineHome','BottleRack','SommelierSet','VinoLux'],s:['Holds 12 Bottles','Wall Mount Option','Bamboo/Metal','Decanter Included','Assembly Free'],p:[35,45,55,65,79,89]},
  ],
  sports: [
    {t:'Adjustable Dumbbells',e:'🏋️',b:['FlexCore','IronFlex','PowerGrip','StrengthPro','GainMax'],s:['5-52.5 lbs','2.5lb Increments','Space-Saving Tray','Locking Mechanism','Pair Included'],p:[149,199,249,299,349,399,429]},
    {t:'Yoga Mat',e:'🧘',b:['ZenMat','FlexGrip','BalancePro','CoreMat','PeaceMat'],s:['6mm Thickness','Non-Slip Surface','Alignment Lines','Carrying Strap','Eco-Friendly TPE'],p:[29,39,49,59,69,79]},
    {t:'Fitness Tracker',e:'⌚',b:['FitBand','PulseTrack','ActivePro','HealthBand','MoveMore'],s:['GPS Built-in','24/7 Heart Rate','Sleep Score','7-Day Battery','50m Waterproof'],p:[49,69,99,149,199,249]},
    {t:'Resistance Bands',e:'💪',b:['BandPro','FlexForce','ResistMax','PowerBand','StretchFit'],s:['5 Resistance Levels','Fabric Anti-Slip','Door Anchor Included','All Exercises','Carry Bag'],p:[15,19,25,29,35,45]},
    {t:'Exercise Bike',e:'🚴',b:['CyclePro','SpinMaster','BikeFit','RideSmart','IndoorCycle'],s:['22" HD Screen','Auto Resistance','100 Levels','SPD Pedals','Quiet Magnetic'],p:[299,399,499,699,899,1199,1499]},
    {t:'Boxing Gloves',e:'🥊',b:['FightPro','BoxMaster','KnockOut','StrikePro','RingGlove'],s:['16oz Premium','Wrist Wrap','Hook & Loop','Triple Layer Foam','Pair+Bag Gloves'],p:[29,39,49,59,69,79]},
    {t:'Pull-Up Bar',e:'🏋️',b:['LiftPro','DoorBar','ChampBar','GripMax','PullMaster'],s:['No Screws Needed','300lb Capacity','Doorframe Mount','Foam Grips','Multi-Grip'],p:[19,25,29,35,45,55]},
    {t:'Foam Roller',e:'🧊',b:['RollPro','MassageRoll','RecoverFast','TriggerRoll','DeepTissue'],s:['High Density','3 Sizes','Textured Surface','For IT Band/Back','Hollow Core'],p:[15,19,25,29,35,49]},
    {t:'Running Shoes',e:'👟',b:['SpeedRun','AeroFoot','TrailBlazer','PacePro','RunnerPro'],s:['Carbon Fiber Plate','Stack Height 39mm','Breathable Upper','Wide Toe Box','Reflective Details'],p:[89,119,139,159,179,199,219]},
    {t:'Camping Tent',e:'⛺',b:['CampPro','OutdoorBase','TrailShelter','NatureDome','WildernessHQ'],s:['4-Person','Waterproof 3000mm','Setup Under 5min','Vestibule','Footprint Included'],p:[79,99,129,149,199,249]},
    {t:'Hiking Backpack',e:'🎒',b:['TrailPack','SummitCarry','HikeAll','NatureKitchen','OutdoorHaul'],s:['45L Capacity','Rain Cover','Hip Belt Pockets','Hydration Compatible','Chest Strap'],p:[59,79,99,119,149,179]},
    {t:'Jump Rope',e:'🪢',b:['SpeedJump','CrossFitRope','JumpPro','SkipMaster','AthleticRope'],s:['Ball Bearing Handles','Adjustable Cable','Counter Built-in','Speed & Weighted','Tangle-Free'],p:[12,18,22,28,35,45]},
  ],
  pets: [
    {t:'Dog Food',e:'🐕',b:['PawNutrition','NaturePaws','HealthyK9','ProteinPup','WildBite'],s:['Grain-Free','Real Chicken #1','Omega 3+6','No Artificial','All Life Stages'],p:[25,35,49,65,79,89,99]},
    {t:'Cat Tower',e:'🐈',b:['KittyKastle','CatPalace','PurrPost','FurTree','MeowHome'],s:['5 Tiers','Sisal Scratching Posts','Cozy Hammock','Plush Platforms','Hanging Toys'],p:[49,65,79,99,129,149]},
    {t:'Dog Leash',e:'🦮',b:['LeashPro','WalkMate','PawWalk','SafeStride','UrbanLeash'],s:['26ft Retractable','Anti-Tangle','Brake Button','Neon Reflective','For 50+ lbs'],p:[12,18,22,28,35]},
    {t:'Orthopedic Dog Bed',e:'🐾',b:['PawRest','OrthoSleep','DogDream','FurNest','CozyCrate'],s:['Memory Foam','Waterproof Liner','Washable Cover','Non-Slip Bottom','Multiple Sizes'],p:[35,49,65,79,99,119]},
    {t:'Cat Food',e:'🐱',b:['KittyNutrition','PurrFuel','FelineFirst','WhiskerFuel','MeowHealth'],s:['Grain-Free','Real Salmon','Taurine Added','No Fillers','Wet+Dry Options'],p:[18,25,35,42,55]},
    {t:'Pet Camera',e:'📷',b:['PawCam','WatchPet','PetEye','HomeGuard Pet','FurView'],s:['1080p HD','2-Way Audio','Treat Dispenser','Night Vision','App Alerts'],p:[49,65,89,99,129]},
    {t:'Dog Treats',e:'🦴',b:['TreatPro','PawSnack','YummyPup','WagMore','TastyK9'],s:['6 Flavor Variety','No Artificial Colors','Protein-Rich','Dental Health','6lb Value Pack'],p:[12,18,22,28,35]},
    {t:'Aquarium Kit',e:'🐠',b:['AquaCraft','FishHome','TankPro','AquaStart','DeepBlue'],s:['20 Gallon','LED Lighting','Quiet Filter','Thermometer','Complete Kit'],p:[49,65,89,99,129,149]},
    {t:'Pet Grooming Kit',e:'✂️',b:['GroomPro','PawStyle','FurTrim','PetClip','ShineCoat'],s:['Cordless Clipper','5 Guide Combs','Quiet Motor','USB Charging','Scissors Included'],p:[25,35,45,55,65]},
    {t:'Slow Feeder Bowl',e:'🥣',b:['PawBowl','SlowEat','HealthyFeed','EatSlow','DigiBowl'],s:['Anti-Bloat Design','Non-Slip Base','Dishwasher Safe','Multiple Mazes','BPA-Free'],p:[12,15,18,22,25]},
  ],
  kitchen: [
    {t:'Non-Stick Cookware Set',e:'🍳',b:['CookPro','ChefLine','KitchenMax','SteelCook','FryMaster'],s:['10-Piece Set','PFOA-Free Coating','Induction Ready','Dishwasher Safe','Tempered Glass Lids'],p:[59,79,99,129,149,179]},
    {t:'Stand Mixer',e:'🥣',b:['MixMaster','BakePro','WhipKing','KitchenAid Clone','BlendBot'],s:['5.5qt Bowl','10 Speed Settings','Dough Hook+Whisk+Paddle','Tilt-Head','575W Motor'],p:[149,199,249,299,349]},
    {t:'Instant Pot',e:'🫕',b:['PressurePro','QuickCook','MultiMagic','OnePot','SpeedChef'],s:['7-in-1 Functions','6qt Capacity','15 Smart Programs','Delay Start','Sauté Mode'],p:[59,79,99,119,149]},
    {t:'Air Fryer',e:'🌬️',b:['CrispPro','AirMax','FryLess','CrunchBot','QuickFry'],s:['6qt XL Basket','8 Presets','Digital Display','Dishwasher Safe','1700W'],p:[49,69,89,99,129]},
    {t:'Blender',e:'🥤',b:['BlendPro','SmoothieMax','PowerBlend','VitaMix Clone','TurboBlend'],s:['64oz Container','Variable Speed','Tamper Included','Self-Cleaning','1200W'],p:[49,79,99,129,149,199]},
    {t:'Food Storage Set',e:'🥡',b:['FreshBox','AirtightPro','SnapLock','StoreSmart','KitchenOrg'],s:['14-Piece Set','BPA-Free','Leak-Proof Lids','Microwave Safe','Stackable'],p:[19,25,35,45,55]},
    {t:'Cutting Board Set',e:'🪓',b:['SlicePro','ChopMaster','BoardSet','KitchenCut','WoodChef'],s:['3-Size Set','Bamboo Fiber','Juice Groove','Non-Slip Feet','Dishwasher Safe'],p:[19,25,35,45,55]},
  ],
  health: [
    {t:'Multivitamin',e:'💊',b:['VitaPro','NutriMax','HealthPlus','DailyBoost','WellnessCore'],s:['180 Capsules','23 Vitamins & Minerals','Non-GMO','GMP Certified','Once Daily'],p:[12,18,22,28,35,45]},
    {t:'Protein Bar Variety',e:'🍫',b:['BarPro','FitSnack','ProteinBox','NutriBar','PowerPack'],s:['24-Count Box','20g Protein','5 Flavors','Low Sugar','Gluten Free'],p:[22,28,35,42,49]},
    {t:'Blood Pressure Monitor',e:'💓',b:['CardioCheck','HeartScan','PulsePro','VitalsMax','BPTrack'],s:['Clinically Validated','Memory for 2 Users','Irregular Heartbeat Alert','Rechargeable','App Connected'],p:[25,35,45,55,69,89]},
    {t:'Foam Wedge Pillow',e:'🛌',b:['SleepPro','PosturePillow','BackEase','WedgePlus','SleepSmart'],s:['Memory Foam','Acid Reflux Relief','Washable Cover','3 Angles','CertiPUR-US'],p:[29,39,49,59,69]},
    {t:'First Aid Kit',e:'🩹',b:['SafePro','MedReady','AidKit','FirstCare','SafeBox'],s:['299 Pieces','OSHA Compliant','Water-Resistant Case','For 50+ People','Eyewash Included'],p:[18,25,35,45,55]},
    {t:'Massage Gun',e:'🔫',b:['RecoverPro','TherapyGun','MuscleMax','DeepRelief','PulseGun'],s:['20 Speed Levels','6 Attachments','3200 RPM','Quiet 45dB','5hr Battery'],p:[49,79,99,129,149,179]},
    {t:'Essential Vitamins Bundle',e:'🧬',b:['VitaSet','NutriBundle','HealthStack','WellnessKit','SupplementPro'],s:['Vitamin D3+K2','Omega-3 Fish Oil','Magnesium Glycinate','Zinc+Selenium','3-Month Supply'],p:[35,45,55,65,79]},
  ],
  toys: [
    {t:'LEGO Set',e:'🧱',b:['BrickPro','BlockMaster','BuildIt','SnapBuild','CreatiBlocks'],s:['1000+ Pieces','Ages 8+','Collectible Series','Instructions Included','Compatible Bricks'],p:[29,39,49,59,79,99,129]},
    {t:'Remote Control Car',e:'🏎️',b:['SpeedRC','TurboRace','DriftPro','RCMax','FastTrack'],s:['4WD All-Terrain','30mph Top Speed','60min Run Time','2.4GHz Control','LED Lights'],p:[25,35,49,65,79,99]},
    {t:'Board Game',e:'🎲',b:['GameNight','FunBox','PlayPro','TableTop','GameMaster'],s:['2-6 Players','Ages 8+','45min Play Time','Strategy+Luck','Family Edition'],p:[19,25,29,35,45,55]},
    {t:'Stuffed Animal',e:'🧸',b:['HugPro','CuddleSoft','PlushPal','TeddyMax','SnugBuddy'],s:['Super Soft Plush','Machine Washable','ASTM Certified','14" Premium Size','Multiple Characters'],p:[12,18,22,28,35,45]},
    {t:'Science Kit',e:'🔬',b:['StemPro','LabKit','ScienceMax','ExploreKit','CuriousLab'],s:['50+ Experiments','Ages 8-12','Instruction Manual','Safety Goggles Included','Award Winner'],p:[22,29,35,45,55,65]},
    {t:'Nerf-Style Blaster',e:'🔫',b:['BlastPro','FoamMax','ShotGun','TargetPro','NerfClone'],s:['50-Dart Drum','Auto-Reload','Team Battle Set','Tactical Rail','Ages 8+'],p:[19,25,35,45,55]},
    {t:'Drone',e:'🚁',b:['SkyPro','FlyMax','AeroDrone','HoverKid','SkyBot'],s:['Altitude Hold','Headless Mode','360° Flips','30min Battery','Beginner Mode'],p:[29,49,79,99,129,149]},
  ],
  gaming: [
    {t:'Gaming Controller',e:'🎮',b:['ControlPro','GamePad X','TurboCtrl','ProGrip','PlayMax'],s:['Hall Effect Sticks','Rumble Haptics','Bluetooth 5.1','40hr Battery','For PS/Xbox/PC'],p:[29,39,49,59,79,99]},
    {t:'Gaming Headset',e:'🎧',b:['SoundFrag','GameAudio','HearPro','VoiceMax','FragSound'],s:['7.1 Surround','Noise-Canceling Mic','RGB Earcups','USB+3.5mm','For All Platforms'],p:[29,39,49,69,89,119]},
    {t:'Gaming Chair',e:'🪑',b:['ThronePro','GameSeat','ChairMax','ProGamer Chair','ComfortPlay'],s:['Lumbar Support','Adjustable Armrests','Recliner 180°','PU Leather','Up to 300lbs'],p:[99,129,149,199,249,299]},
    {t:'Gaming Desk',e:'🖥️',b:['DeskPro','GameStation','PlayDesk','SetupMax','RigDesk'],s:['55" Wide Surface','Carbon Fiber Top','Cup Holder','Headset Hook','Cable Management'],p:[79,99,129,149,199,249]},
    {t:'PC Gaming Case',e:'💻',b:['CasePro','RigBox','TowerMax','BuildCase','PCFrame'],s:['Mid Tower ATX','Tempered Glass','RGB Fans Included','Tool-Free SSD','Cable Management'],p:[49,69,89,119,149,179]},
    {t:'SSD Drive',e:'💾',b:['SpeedDisk','NVMePro','FlashMax','StorageX','QuickDrive'],s:['2TB Capacity','7400MB/s Read','M.2 NVMe','PS5 Compatible','5-Year Warranty'],p:[59,89,119,149,179,219]},
    {t:'Gaming Monitor',e:'🖥️',b:['FragView','PlayScreen','ProDisplay','GameVision','HzMax'],s:['27" 1080p 240Hz','1ms Response','FreeSync Premium','HDR400','IPS Panel'],p:[149,199,249,299,349,449]},
  ],
  baby: [
    {t:'Baby Monitor',e:'📹',b:['BabyEye','SafeWatch','ParentView','NightGuard','CribCam'],s:['1080p HD','Night Vision','Two-Way Audio','Temperature Alert','5" Parent Unit'],p:[49,65,89,99,129,149]},
    {t:'Stroller',e:'👶',b:['RollPro','PushEase','StrollMax','BabyRide','CityPush'],s:['Reversible Seat','One-Hand Fold','Air Tires','Cup Holder','Fits Infant Seat'],p:[99,149,199,249,299,349]},
    {t:'Baby Carrier',e:'🤱',b:['CarryPro','HoldSafe','BabyWrap','CloseHold','StrideCarry'],s:['6 Carry Positions','Newborn to 45lbs','Lumbar Support','Machine Wash','Ergonomic Hip Seat'],p:[35,49,65,79,99,119]},
    {t:'Diaper Bag',e:'👜',b:['DiapPro','MomBag','DadPack','ParentCarry','BabyGo'],s:['Large Capacity','Insulated Bottle Pocket','Stroller Straps','Wipe Clean','Multiple Colors'],p:[25,35,45,55,65,79]},
    {t:'Baby Food Maker',e:'🍼',b:['PureBlend','NutriPure','BabyChef','FreshPuree','SmoothieKid'],s:['Steam + Blend','6oz-25oz','BPA-Free','Dishwasher Safe','Auto Shut-Off'],p:[35,49,65,79,99]},
    {t:'Play Mat',e:'🧩',b:['PlaySafe','FoamMat','SoftFloor','TummyTime','BabyGym'],s:['Foam + Activity Arch','Machine Wash','Non-Toxic','Folds Compact','Newborn+'],p:[25,35,45,55,65]},
  ],
  books: [
    {t:'Bestseller Novel',e:'📖',b:['PageTurner','ReadPro','BookVault','StoryMax','InkPress'],s:['Hardcover Edition','Signed Copy Available','Book Club Pick','NY Times Bestseller','Free eBook Included'],p:[12,16,19,22,28,35]},
    {t:'Self-Help Book',e:'🧠',b:['MindPro','GrowthRead','SuccessBook','HabitMax','LifeGuide'],s:['#1 Bestseller','Workbook Edition','Audio Version','Expert Author','12-Week Program'],p:[12,16,19,22,28]},
    {t:'Kindle E-Reader',e:'📱',b:['ReadMax','PageLight','eReaderPro','InkScreen','BookLight'],s:['300 PPI Display','6 Weeks Battery','Adjustable Warmth','Waterproof','32GB Storage'],p:[79,99,129,149,189,249]},
    {t:'Children\'s Book Set',e:'📚',b:['KidsRead','LittleStory','EarlyReader','BabyBooks','GrowRead'],s:['8-Book Collection','Ages 2-6','Board Book Format','Award-Winning','Bilingual Edition'],p:[12,18,22,28,35,45]},
    {t:'Cookbook',e:'🍽️',b:['ChefRead','RecipePro','CookBook','TasteGuide','KitchenRead'],s:['200+ Recipes','Full-Color Photos','Dietary Labels','Beginner Friendly','James Beard Winner'],p:[19,22,28,35,45]},
    {t:'Audiobook Subscription',e:'🎧',b:['ListenPro','AudioMax','SoundBook','VoiceRead','StoryStream'],s:['1 Credit/Month','Unlimited Listening','Offline Download','Plus Catalog','Cancel Anytime'],p:[8,12,15,19,25]},
  ],
  tools: [
    {t:'Cordless Drill Set',e:'🔧',b:['DrillPro','PowerBore','TorqueMaster','BoostDrill','StrongArm'],s:['20V MAX Brushless','2-Speed','1/2" Chuck','2 Batteries Included','Hard Case'],p:[49,69,89,99,129,149,179]},
    {t:'Tool Box',e:'🧰',b:['ToolVault','StorePro','ChestMax','WorkBox','ProOrganize'],s:['26" Wide','8 Drawers','Ball-Bearing Slides','Lockable','500lb Capacity'],p:[49,79,99,129,149,199]},
    {t:'Laser Level',e:'📏',b:['LevelPro','LaserMax','StraightShot','PlumbLine','LevelMaster'],s:['Self-Leveling','3x360° Lines','100ft Range','IP54 Rated','Magnetic Mount'],p:[25,35,45,59,79,99]},
    {t:'Circular Saw',e:'⚡',b:['SawPro','CutMaster','BladeMax','PowerCut','SharpEdge'],s:['7-1/4" Blade','15 Amp','Laser Guide','Dust Port','Bevel to 56°'],p:[49,69,89,99,129,149]},
    {t:'Stud Finder',e:'🔍',b:['FindPro','WallScan','StudMax','DetectPro','WallMaster'],s:['5-in-1 Detection','Deep Scan Mode','Metal+AC Wire','LCD Display','Center Find Mode'],p:[19,25,35,45,55]},
    {t:'Safety Glasses 6-Pack',e:'👓',b:['SafeView','EyePro','ShieldMax','ProtectEye','ClearGuard'],s:['ANSI Z87.1','Anti-Scratch','Anti-Fog','UV400','Clear+Tinted Mix'],p:[12,15,18,22,28]},
  ],
  automotive: [
    {t:'Car Dash Cam',e:'📷',b:['DashPro','RoadEye','DriveGuard','CamMax','AutoRecord'],s:['4K UHD','Night Vision','Wide Angle 170°','GPS Tracking','Loop Recording'],p:[35,49,65,89,99,129]},
    {t:'Jump Starter Pack',e:'⚡',b:['JumpPro','StartMax','PowerJump','BoostPack','JoltStart'],s:['2000A Peak','Up to 8L Engine','USB-C PD 65W','Air Compressor','LED Flashlight'],p:[49,69,89,99,129]},
    {t:'Car Phone Mount',e:'📱',b:['MountPro','HoldMax','DashGrip','PhoneHold','CarMount'],s:['Magnetic MagSafe','Air Vent+Dashboard','360° Rotation','1-Touch Release','Universal Fit'],p:[12,18,22,28,35]},
    {t:'Portable Tire Inflator',e:'🔧',b:['PumpPro','AirMax','TireBoost','QuickPump','InflatePro'],s:['Cordless','150 PSI','Digital Pressure','LED Light','USB-C Rechargeable'],p:[25,35,45,55,65]},
    {t:'Car Vacuum',e:'🌀',b:['VacPro','CarClean','SuckMax','AutoVac','DustBuster Car'],s:['Cordless Handheld','15000pa Suction','HEPA Filter','USB-C','For Car/Home'],p:[25,35,45,55,65]},
    {t:'Seat Cover Set',e:'🪑',b:['SeatPro','CoverMax','CushionFit','AutoComfort','DriveEase'],s:['Full Set 9-Piece','Universal Fit','Waterproof','Breathable Mesh','Easy Install'],p:[25,35,45,55,65,79]},
  ],
  garden: [
    {t:'Garden Tool Set',e:'🌱',b:['GardenPro','GrowKit','DigMaster','PlantTools','EarthSet'],s:['10-Piece Set','Stainless Steel','Ergonomic Handles','Rust-Resistant','Storage Bag'],p:[19,25,35,45,55,65]},
    {t:'Soaker Hose',e:'💧',b:['WaterPro','DripMax','SoakLine','IrriPro','WaterSmart'],s:['100ft Length','Flat Design','Saves 70% Water','Easy Connect','UV Resistant'],p:[15,19,25,29,35]},
    {t:'Raised Garden Bed',e:'🌿',b:['BedPro','PlantBox','GrowRaise','GardenFrame','SoilMax'],s:['4x8ft Cedar','Rot-Resistant','Easy Assembly','Includes Liner','Stackable'],p:[35,49,65,79,99,129]},
    {t:'Composting Bin',e:'♻️',b:['CompostPro','GreenBin','EcoRotate','TumbleMix','NatureCompact'],s:['80 Gallon','Dual Chamber','Aeration System','Fast Compost 4 Weeks','BPA-Free'],p:[49,65,89,99,129]},
    {t:'Solar Garden Lights',e:'☀️',b:['SolarPath','GlowGarden','LightPro','NightBlooms','SunLight'],s:['12-Pack','Auto On/Off','IP65 Waterproof','8hr Runtime','Easy Stake Install'],p:[18,22,28,35,45]},
    {t:'Pressure Washer',e:'🚿',b:['WashPro','PowerClean','SprayMax','BlastClean','HighPressure'],s:['2300 PSI','Electric','4 Nozzles','25ft Hose','Detergent Tank'],p:[79,99,129,149,199]},
  ],
  office: [
    {t:'Ergonomic Chair',e:'🪑',b:['ChairPro','ErgoMax','SeatSmart','PostureKing','ComfortDesk'],s:['Lumbar Adjustable','4D Armrests','Mesh Back','Up to 300lbs','BIFMA Certified'],p:[149,199,249,299,349,399]},
    {t:'Desk Organizer',e:'🗂️',b:['OrgPro','DeskMax','NeatDesk','TidySpace','OfficeOrder'],s:['7 Compartments','Bamboo Material','Pen Holder','Phone Stand','Minimalist Design'],p:[15,19,25,29,35,45]},
    {t:'Label Maker',e:'🏷️',b:['LabelPro','PrintMax','TagMaster','OrganizeLabel','MarkPro'],s:['Bluetooth Connected','180+ Templates','45 Font Styles','Cuts Automatically','AAA Battery'],p:[19,25,29,35,45,55]},
    {t:'Wireless Presenter',e:'📊',b:['SlidePro','PresentMax','ClickAdvance','LaserClick','PresentPro'],s:['100ft Range','Red Laser Pointer','Plug & Play','Countdown Timer','For Mac/PC'],p:[15,19,25,29,35,45]},
    {t:'Shredder',e:'🗃️',b:['ShrePro','SecureMax','PaperDestroy','DocumentSafe','ShredMaster'],s:['Micro-Cut P-4','12 Sheets/Pass','Jam-Proof','CD/Card Shred','30min Runtime'],p:[35,45,55,65,79,99]},
    {t:'Standing Desk Converter',e:'📐',b:['StandPro','RiseDesk','UpMax','DeskLift','StandSmart'],s:['36" Wide Surface','Sit-Stand','Memory Heights','Keyboard Tray','Dual Monitor Ready'],p:[79,99,129,149,199]},
  ],
  travel: [
    {t:'Hardshell Suitcase',e:'🧳',b:['TravelPro','RollMax','LuggagePro','JetSet','AirCase'],s:['Spinner Wheels','TSA Lock','Expandable','Polycarbonate Shell','20"/24"/28" Set'],p:[59,79,99,129,149,199]},
    {t:'Travel Pillow',e:'😴',b:['NeckPro','SleepFly','TravelRest','PillowMax','FlightComfort'],s:['Memory Foam','360° Support','Washable Cover','Compact Carry Bag','Airplane Approved'],p:[15,19,22,28,35,45]},
    {t:'Packing Cubes Set',e:'📦',b:['PackPro','CubeMax','TravelOrg','FoldSmart','JetCubes'],s:['7-Piece Set','Compression Option','Multiple Sizes','Mesh Top View','Lightweight'],p:[12,18,22,28,35]},
    {t:'Travel Adapter',e:'🔌',b:['AdaptPro','GlobalPlug','PowerWorld','VoltMax','UniPlug'],s:['150+ Countries','4 USB + USB-C','65W Fast Charge','Surge Protected','Pocket-Sized'],p:[15,19,25,29,35]},
    {t:'Passport Holder',e:'📋',b:['PassPro','TravelWallet','DocSafe','JetWallet','TripOrg'],s:['RFID Blocking','Holds 4 Cards','Slim Design','Multiple Colors','Genuine Leather'],p:[12,18,22,28,35]},
    {t:'Toiletry Bag',e:'🧴',b:['ToilPro','HangKit','TravelBag','WashPack','KitPro'],s:['Hanging Design','Waterproof Lining','TSA-Friendly','Multiple Pockets','For Men & Women'],p:[15,19,25,29,35,45]},
  ],
  music: [
    {t:'Acoustic Guitar',e:'🎸',b:['TonePro','StringMax','SoundCraft','MelodyPro','ChordMaster'],s:['Solid Spruce Top','Dreadnought Body','Chrome Tuners','Includes Gig Bag','Beginner to Intermediate'],p:[79,99,129,149,199,249]},
    {t:'Digital Piano',e:'🎹',b:['KeyPro','PianoMax','88KeyCraft','MelodyBoard','PressureKey'],s:['88 Weighted Keys','Graded Hammer Action','Triple Sensor','Built-in Speakers','USB MIDI'],p:[199,299,399,499,699,899]},
    {t:'Studio Headphones',e:'🎧',b:['AudioPro','MixMax','StudioSound','FlatFreq','RecordEar'],s:['Flat Response','40mm Drivers','Detachable Cable','Foldable','For Mixing & Mastering'],p:[35,49,69,89,129,149]},
    {t:'USB Audio Interface',e:'🎙️',b:['RecordPro','InputMax','StudioBox','AudioLink','MixDock'],s:['2-In/2-Out','24-bit/192kHz','Zero-Latency','Phantom Power','Bundled DAW Software'],p:[49,69,89,119,149,199]},
    {t:'Drum Practice Pad',e:'🥁',b:['DrumPro','BeatMax','PracticeKit','RhythmPad','StickPad'],s:['9" Single Pad','Dual-Zone','Silent Mesh','Includes Sticks','Mounts to Stand'],p:[12,18,22,28,35,45]},
    {t:'Ukulele Starter Kit',e:'🎵',b:['UkePro','IslandSound','StrumKit','TikiPlay','AlohaUke'],s:['Soprano Size','Gig Bag Included','Extra Strings','Tuner+Picks','Mahogany Body'],p:[25,35,45,55,65]},
  ],
  art: [
    {t:'Colored Pencil Set',e:'🖍️',b:['ColorPro','ArtMax','PencilCraft','HueSet','DrawMaster'],s:['72-Color Set','Professional Grade','Lightfast','Oil-Based Core','Tin Case'],p:[12,18,22,28,35,45]},
    {t:'Acrylic Paint Set',e:'🎨',b:['PaintPro','AcryMax','StudioColor','BrushCraft','ArtBlend'],s:['48 Colors','60ml Tubes','Heavy Body','Fast Dry','Non-Toxic'],p:[15,22,29,35,45,55]},
    {t:'Sketchbook Set',e:'📓',b:['SketchPro','DrawBook','PaperMax','ArtPad','BlankCanvas'],s:['5-Book Bundle','100-Sheet Each','Acid-Free','Spiral Bound','Multiple Sizes'],p:[12,18,22,28,35]},
    {t:'Watercolor Kit',e:'💧',b:['WaterPro','FlowColor','AquaSet','TintMax','WashPaint'],s:['48 Colors','Refillable Brush Pen','Wet Palette','Mixing Tray','Beginner Friendly'],p:[12,18,22,28,35,45]},
    {t:'Canvas Set',e:'🖼️',b:['CanvasPro','PaintSurface','ArtBoard','StudioFrame','GalleryCraft'],s:['12-Pack Primed','3 Sizes Mixed','Triple-Primed','Acid-Free','For Oil & Acrylic'],p:[12,18,25,35,45]},
    {t:'Calligraphy Kit',e:'✒️',b:['CalliPro','PenArt','InkCraft','NibMaster','ScriptPro'],s:['20+ Nibs','6 Ink Colors','Guide Sheets','Oblique Holder','Beginner to Pro'],p:[15,19,25,29,35,45]},
  ],
  food: [
    {t:'Organic Honey',e:'🍯',b:['HoneyPure','NatureSweet','RawGold','BeePure','WildHoney'],s:['Raw Unfiltered','32oz Jar','Monofloral','USDA Organic','Glass Jar'],p:[18,22,28,35,42]},
    {t:'Specialty Coffee',e:'☕',b:['BeanCraft','SingleOrigin','BrewLab','CoffeeCult','RoastPro'],s:['6 Origins Sampler','Light to Dark','Whole Bean','Small Batch Roasted','Tasting Notes Card'],p:[22,28,35,42,55,65]},
    {t:'Dark Chocolate Box',e:'🍫',b:['ChocoCraft','CacaoLux','TrufflePro','DarkArt','ChocoBox'],s:['72% Cacao','24 Assorted Truffles','Belgian Chocolate','Gift Box','No Artificial'],p:[18,25,35,45,55,65]},
    {t:'Matcha Green Tea',e:'🍵',b:['MatchaPro','ZenGreen','CeremonialGrade','TeaCraft','GreenGold'],s:['Ceremonial Grade','100g Tin','First Harvest','Uji Japan Origin','EGCG Rich'],p:[18,25,32,42,55]},
    {t:'Extra Virgin Olive Oil',e:'🫒',b:['OliveGold','PressedFirst','MediterOil','GreenHarvest','PureCold'],s:['Cold Pressed','1L Bottle','Italian Origin','DOP Certified','Polyphenol Rich'],p:[18,22,28,35,42]},
    {t:'Mixed Nuts',e:'🥜',b:['NutHarvest','MixedPro','NatureSnack','PremiumNuts','ProteinMix'],s:['6lb Bulk Bag','No Salt Added','Almonds+Cashews+Walnuts','Non-GMO','Resealable'],p:[22,28,35,42,49,55]},
    {t:'Hot Sauce Collection',e:'🌶️',b:['SpiceBox','HeatPack','SauceWorld','FireKit','ChiliSet'],s:['12 Bottles','World Flavors','Small Batch','No Preservatives','Gift Box'],p:[25,35,45,55,65]},
    {t:'Freeze-Dried Fruit',e:'🫐',b:['FruitCraft','DriedPure','SnackNature','FruitPro','CrunchFruit'],s:['8 Varieties','No Sugar Added','Non-GMO','Lightweight 1oz Packs','Trail Mix Ready'],p:[15,18,22,28,35]},
    {t:'Protein Powder',e:'💪',b:['ProteinPure','WheyPro','MuscleBlend','GainMix','ProteinCraft'],s:['25g Protein/Serving','5lb Bag','10 Flavors','3rd Party Tested','Gluten Free'],p:[35,45,55,65,75,85]},
    {t:'Cooking Spice Set',e:'🧂',b:['SpiceCraft','FlavorKit','HerbMix','SeasonPro','TasteBox'],s:['20-Jar Set','Organic','Filled Airtight Jars','Labels Included','BBQ+Baking'],p:[25,35,45,55,65]},
  ],
};

const STORE_NAMES = {
  fashion: ['SpeedShop','LuxBoutique','TimeKeeper','OutdoorPro','StyleVault'],
  electronics: ['TechVault','GadgetHub','DigiStore','ElectroMax','ByteShop'],
  beauty: ['GlowLab','BeautyPro','DermStore','SkinScience','GlamVault'],
  home: ['HomeZen','CasaCraft','LivingPro','DomesticHub','HomeVault'],
  sports: ['FitWorld','OutdoorPro','SportMax','AthleteHub','GainStore'],
  pets: ['PetParadise','PawsPlus','FurFamily','PetPro','AnimalHouse'],
  food: ['NatureBox','GourmetHub','FoodCraft','OrganicPro','TasteLab'],
  health: ['VitaVault','WellnessHub','HealthPro','NutriStore','CareMax'],
  toys: ['ToyWorld','PlayVault','KidsMax','FunStore','GameHub'],
  gaming: ['GameVault','PCMax','DigitalPlay','GamerHub','ByteStore'],
  baby: ['BabyVault','TinyWorld','NurseryPro','BabyMax','GrowHub'],
  books: ['BookVault','ReadMax','PageHub','StoryPro','MediaStore'],
  tools: ['ToolVault','DIYMax','BuildHub','WorkPro','HardwareStore'],
  automotive: ['AutoVault','DriveMax','CarHub','MotorPro','SpeedStore'],
  garden: ['GardenVault','GreenMax','PlantHub','OutdoorPro','NatureStore'],
  office: ['OfficeVault','WorkMax','DeskHub','OfficePro','BusinessStore'],
  travel: ['TravelVault','JetMax','TripHub','LuggagePro','ExploreStore'],
  music: ['MusicVault','ToneMax','SoundHub','InstrumentPro','MelodyStore'],
  art: ['ArtVault','CreativeMax','CraftHub','StudioPro','ColorStore'],
  kitchen: ['KitchenVault','CookMax','ChefHub','CuisinePro','DiningStore'],
};

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max, dec=1) { return parseFloat((Math.random() * (max - min) + min).toFixed(dec)); }

function generateProducts(count = 1000) {
  const products = [];
  const categories = Object.keys(TEMPLATES);
  const perCat = Math.ceil(count / categories.length);

  for (const category of categories) {
    const templates = TEMPLATES[category];
    const imgs = IMGS[category];
    const stores = STORE_NAMES[category];

    for (let i = 0; i < perCat && products.length < count; i++) {
      const tmpl = rand(templates);
      const brand = rand(tmpl.b);
      const spec = rand(tmpl.s);
      const price = rand(tmpl.p);
      const title = `${brand} ${tmpl.t} — ${spec}`;
      const globalIdx = products.length;
      // Use category-specific Unsplash for first N, then unique picsum for the rest
      const img = globalIdx < imgs.length
        ? imgs[globalIdx % imgs.length]
        : `https://picsum.photos/seed/dopazon-${globalIdx}/400/300`;

      products.push({
        title,
        category,
        price,
        emoji: tmpl.e,
        img,
        stars: randFloat(4.1, 4.9),
        reviews: randInt(500, 75000),
        store_name: rand(stores),
        description: `${title} — available exclusively on Dopazon for the low price of absolutely nothing. Add to cart and experience the full dopamine rush of online shopping, completely free.`,
      });
    }
  }

  // Shuffle
  return products.sort(() => Math.random() - 0.5);
}

async function main() {
  console.log('Deleting existing products...');
  const { error: delErr } = await sb.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delErr) { console.error('Delete error:', delErr.message); process.exit(1); }
  console.log('Deleted. Generating 1000 products...');
  const products = generateProducts(1000);
  console.log(`Generated ${products.length} products. Inserting in batches...`);

  const batchSize = 100;
  let inserted = 0;

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const { error } = await sb.from('products').insert(batch);
    if (error) {
      console.error(`Batch ${i/batchSize + 1} error:`, error.message);
    } else {
      inserted += batch.length;
      console.log(`✓ Inserted ${inserted}/${products.length}`);
    }
  }

  console.log(`\n✅ Done! ${inserted} products inserted into Supabase.`);
}

main();
