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
      const imgIdx = (i + products.length) % imgs.length;

      products.push({
        title,
        category,
        price,
        emoji: tmpl.e,
        img: imgs[imgIdx],
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
  console.log('Generating 1000 products...');
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
