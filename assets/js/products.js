/**
 * BLUSH & THREAD - Product Catalog Data
 * Premium Contemporary Women's Fashion Boutique
 * Currency: INR (₹)
 */

const BLUSH_PRODUCTS = [
  {
    id: "bt-01",
    name: "Gulnar Chanderi Silk Anarkali Set",
    subtitle: "Handwoven Chanderi with delicate zardozi neckline & organza dupatta",
    category: "ethnic",
    categoryName: "Contemporary Ethnic",
    price: 12450,
    originalPrice: 14800,
    rating: 4.9,
    reviewsCount: 38,
    isNew: true,
    isBestSeller: true,
    colors: [
      { name: "Dusty Rose", hex: "#C58F96" },
      { name: "Warm Ivory", hex: "#F8F4EF" },
      { name: "Soft Blush", hex: "#EAD5D3" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "An homage to timeless Indian textile heritage reimagined through contemporary minimalism. Crafted from gossamer handloom Chanderi silk with subtle champagne metallic threading and an ethereal scalloped organza veil.",
    details: [
      "Fabric: 100% Handloom Chanderi Silk & Organza Dupatta",
      "Embroidery: Hand-done micro-marodi & zardozi work along collar and cuffs",
      "Silhouette: Fluid kalidar cut with pocket detailing and lining in pure mulmul",
      "Care: Dry clean only. Store wrapped in pure unbleached muslin",
      "Origin: Handcrafted in our Jaipur & Bangalore artisan ateliers"
    ],
    tags: ["new", "ethnic", "handloom", "festive"]
  },
  {
    id: "bt-02",
    name: "Aurelia Rose Tailored Blazer Dress",
    subtitle: "Sculpted Italian crepe blazer with pearl-finished horn buttons",
    category: "occasion",
    categoryName: "Occasion Wear",
    price: 9800,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 24,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: "Dusty Rose", hex: "#C58F96" },
      { name: "Deep Burgundy", hex: "#542D39" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Precision tailoring meets feminine confidence. Structured through the shoulders with an architectural waist cinch, this blazer dress transitions seamlessly from gallery private views to champagne soirees.",
    details: [
      "Fabric: Double-faced breathable stretch crepe with silk cupro lining",
      "Tailoring: Sharp peak lapels, jetted flap pockets, self-fabric belt with brushed gold buckle",
      "Fit: True to size; structured hourglass silhouette",
      "Care: Professional gentle dry clean only",
      "Origin: Patterned and crafted at our Mumbai studio"
    ],
    tags: ["new", "occasion", "tailored", "blazer"]
  },
  {
    id: "bt-03",
    name: "Zoya Silk Tencel Wrap Midi Dress",
    subtitle: "Breezy fluid silhouette with gentle pleated sleeves & waist tie",
    category: "everyday",
    categoryName: "The Everyday Edit",
    price: 5450,
    originalPrice: 6200,
    rating: 4.9,
    reviewsCount: 47,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: "Soft Blush", hex: "#EAD5D3" },
      { name: "Warm Ivory", hex: "#F8F4EF" },
      { name: "Champagne", hex: "#C5AD91" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The quintessential embodiment of everyday luxury. Cut from an ultra-breathable silk-tencel blend that moves like gentle water, featuring an adjustable true wrap closure and discreet side slip pockets.",
    details: [
      "Fabric: 65% Eco-certified Tencel, 35% Mulberry Silk",
      "Design: Deep crossover V-neckline with modesty snap, fluttering blouson sleeves",
      "Length: Graceful midi hemline with side seam slits",
      "Care: Cold hand wash or dry clean, line dry in shade",
      "Sustainability: Oeko-Tex certified low-impact non-toxic botanic dyes"
    ],
    tags: ["everyday", "dress", "sustainable", "bestseller"]
  },
  {
    id: "bt-04",
    name: "Mira Organza Rosette Evening Slip",
    subtitle: "Cascading bias-cut silk organza gown with hand-rolled floral accents",
    category: "occasion",
    categoryName: "Occasion Wear",
    price: 15600,
    originalPrice: 18200,
    rating: 5.0,
    reviewsCount: 19,
    isNew: true,
    isBestSeller: true,
    colors: [
      { name: "Soft Blush", hex: "#EAD5D3" },
      { name: "Warm Ivory", hex: "#F8F4EF" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "An ethereal statement piece designed for unforgettable celebrations. Hand-sculpted fabric rosettes adorn the delicate shoulder strap, floating into a bias-cut skirt that catches every gleam of ambient candlelight.",
    details: [
      "Fabric: 100% Pure Silk Organza overlay with heavy matte crepe lining",
      "Details: Asymmetric rosette corsage, concealed invisible side zipper",
      "Fit: Bias drape contours gently over the hips without cling",
      "Care: Specialist luxury dry clean only",
      "Exclusivity: Limited numbered batch of 50 pieces worldwide"
    ],
    tags: ["new", "occasion", "gown", "evening"]
  },
  {
    id: "bt-05",
    name: "Kavya Handwoven Jamdani Kurta & Pant",
    subtitle: "Organic ivory cotton Jamdani with rose gold metallic motifs",
    category: "ethnic",
    categoryName: "Contemporary Ethnic",
    price: 8400,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 31,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: "Warm Ivory", hex: "#F8F4EF" },
      { name: "Champagne", hex: "#C5AD91" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb129965a2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Reviving historical Bengali Jamdani weave into relaxed, ultra-modern proportions. Each geometric floral motif is woven on a traditional pit-loom by hand, paired with straight-leg cropped trousers with subtle zari cuffs.",
    details: [
      "Fabric: Fine Count Bengal Handspun Organic Cotton",
      "Weave: Discontinuous supplementary weft Jamdani technique",
      "Set includes: Relaxed tunic kurta and tailored elasticated ankle trousers",
      "Care: Gentle cold hand wash with mild botanical detergent",
      "Artisan Craft: Over 24 hours of loom-time per individual outfit"
    ],
    tags: ["ethnic", "handcrafted", "jamdani", "bestseller"]
  },
  {
    id: "bt-06",
    name: "Sienna Cashmere-Blend Rib Knit Top",
    subtitle: "Featherlight rib knit in warm dusty rose with boat neckline",
    category: "essentials",
    categoryName: "Effortless Essentials",
    price: 3850,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 52,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: "Dusty Rose", hex: "#C58F96" },
      { name: "Warm Charcoal", hex: "#35302F" },
      { name: "Warm Ivory", hex: "#F8F4EF" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1524041255072-7da0525d6b34?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "An indispensable layer of tactile refinement. Crafted from an airy cashmere and superfine merino yarn blend, this rib knit contours with subtle grace while feeling like a tender second skin.",
    details: [
      "Composition: 30% Mongolian Cashmere, 70% Extra-fine Australian Merino Wool",
      "Neckline: Wide boatneck collar framed with delicate rolled finishing",
      "Sleeve: Elongated knuckle-length sleeves with thumbhole slits",
      "Care: Hand wash cold with wool wash, dry flat on towel",
      "Season: Four-season trans-seasonal luxury"
    ],
    tags: ["new", "essentials", "knitwear", "cashmere"]
  },
  {
    id: "bt-07",
    name: "Tara Pleated Wide-Leg Palazzos",
    subtitle: "Fluid drape trousers in champagne metallic crepe",
    category: "everyday",
    categoryName: "The Everyday Edit",
    price: 4900,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 29,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: "Champagne", hex: "#C5AD91" },
      { name: "Warm Charcoal", hex: "#35302F" },
      { name: "Warm Ivory", hex: "#F8F4EF" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Voluminous yet effortless. Designed with razor-sharp inverted front pleats and a high, structured waistband, creating an elongated architectural stride whether styled with flat sandals or heeled mules.",
    details: [
      "Fabric: Fluid crepe with subtle micro-twill weave and satin back",
      "Waistband: Tailored high-rise front with concealed side elastication for comfort",
      "Pockets: Deep functional French side slant pockets",
      "Care: Machine wash cold delicate cycle or dry clean",
      "Styling: Pairs seamlessly with our Sienna Rib Knit or Aurelia Blazer"
    ],
    tags: ["everyday", "trousers", "pleated", "essentials"]
  },
  {
    id: "bt-08",
    name: "Gulbahar Hand-Embroidered Cape & Sharara",
    subtitle: "Deep burgundy raw silk cape with champagne foil work & silk sharara",
    category: "ethnic",
    categoryName: "Contemporary Ethnic",
    price: 18900,
    originalPrice: 22000,
    rating: 5.0,
    reviewsCount: 22,
    isNew: true,
    isBestSeller: true,
    colors: [
      { name: "Deep Burgundy", hex: "#542D39" },
      { name: "Dusty Rose", hex: "#C58F96" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Opulent regal poetry in deep burgundy silk. Features an asymmetrical floor-length cape adorned with intricate rose-tinted pita embroidery and hand-beaded gota patti, worn over flared tiered sharara trousers.",
    details: [
      "Fabric: Pure Matka Raw Silk Cape with Mulberry Satin Crepe Sharara",
      "Handcraft: 40+ hours of hand-done gota-zari embroidery by master artisans",
      "Inner: Structured crop inner with padded cups and back hook fastening",
      "Care: Luxury heritage dry clean only",
      "Occasion: Bridal reception, sangeet, and high-glamour cultural soirees"
    ],
    tags: ["new", "ethnic", "statement", "embroidery"]
  },
  {
    id: "bt-09",
    name: "Elysian Silk Charmeuse Bias Camisole",
    subtitle: "Heavyweight silk charmeuse with French lingerie lace trim",
    category: "essentials",
    categoryName: "Effortless Essentials",
    price: 3200,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 41,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: "Warm Ivory", hex: "#F8F4EF" },
      { name: "Dusty Rose", hex: "#C58F96" },
      { name: "Deep Burgundy", hex: "#542D39" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524041255072-7da0525d6b34?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The foundation of an elevated capsule wardrobe. Crafted from rich 22-momme pure silk charmeuse, bias-cut to drape lovingly over the collarbone and bust, accented with delicate eyelash lace.",
    details: [
      "Fabric: 100% 22-Momme Grade 6A Mulberry Silk",
      "Strap: Ultra-delicate adjustable spaghetti straps with gold-plated sliders",
      "Neckline: Flattering sweetheart neck with French scalloped eyelash lace",
      "Care: Hand wash cold with delicate detergent or dry clean",
      "Versatility: Wear tucked into tailored trousers or underneath a sharp blazer"
    ],
    tags: ["essentials", "silk", "camisole", "bestseller"]
  },
  {
    id: "bt-10",
    name: "Seraphina Tiered Cotton Silk Maxi",
    subtitle: "Airy bohemian tiered dress with hand-drawn botanical block print",
    category: "everyday",
    categoryName: "The Everyday Edit",
    price: 6800,
    originalPrice: 7900,
    rating: 4.9,
    reviewsCount: 35,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: "Soft Blush", hex: "#EAD5D3" },
      { name: "Warm Ivory", hex: "#F8F4EF" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Dreamy coastal afternoon nostalgia captured in lightweight cotton silk. Features hand-carved wooden block prints in blush rose and warm charcoal, finished with tasselled drawstring ties and billowing flutter sleeves.",
    details: [
      "Fabric: 60% Fine Chanderi Cotton, 40% Mulberry Silk",
      "Printing: Hand block-printed using carved teakwood blocks in Sanganer",
      "Design: Gathered four-tier skirt with gentle gathers and concealed pockets",
      "Care: Hand wash in cold water with gentle agitation",
      "Comfort: Includes a detached lightweight mulmul slip"
    ],
    tags: ["new", "everyday", "blockprint", "maxi"]
  },
  {
    id: "bt-11",
    name: "Noor Rose Gold Tissue Saree",
    subtitle: "Metallic woven tissue silk drape with scalloped zardozi borders",
    category: "ethnic",
    categoryName: "Contemporary Ethnic",
    price: 16500,
    originalPrice: 19500,
    rating: 5.0,
    reviewsCount: 16,
    isNew: true,
    isBestSeller: true,
    colors: [
      { name: "Dusty Rose", hex: "#C58F96" },
      { name: "Champagne", hex: "#C5AD91" }
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Luminous and ethereal, this tissue silk saree glints like sunset across molten rose gold. Embellished with hand-cut scallops, dabka wirework, and delicate seed pearls along the entire 5.5-meter perimeter.",
    details: [
      "Fabric: Metallic Pure Weft Tissue Silk with soft organza pallu border",
      "Length: 5.5 meters saree length plus 1 meter unstitched blouse piece in matching brocade",
      "Craft: Hand-cut scalloped gota border executed by artisan zardozi masters",
      "Care: Specialized dry clean only, store flat without hanging",
      "Heritage: Woven by master weavers in the historic looms of Varanasi"
    ],
    tags: ["new", "ethnic", "saree", "handcrafted"]
  },
  {
    id: "bt-12",
    name: "Clarisse Asymmetric Draped Cocktail Gown",
    subtitle: "Sculptural one-shoulder evening gown in deep burgundy satin",
    category: "occasion",
    categoryName: "Occasion Wear",
    price: 13200,
    originalPrice: 15500,
    rating: 4.9,
    reviewsCount: 28,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: "Deep Burgundy", hex: "#542D39" },
      { name: "Dusty Rose", hex: "#C58F96" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sensual architectural mastery. A Grecian-inspired single shoulder flows into diagonal gathers that flatter the waistline, cascading into an elegant thigh-high split and a sweeping puddle train.",
    details: [
      "Fabric: Ultra-luxurious liquid satin back crepe (subtle sheen, non-static)",
      "Construction: Fully boned interior corset bodice for effortless support",
      "Closure: Concealed zipper at side seam with hook and eye fastening",
      "Care: Dry clean only",
      "Statement: Pairs dramatically with champagne drop earrings and minimal stilettos"
    ],
    tags: ["occasion", "gown", "evening", "statement"]
  },
  {
    id: "bt-13",
    name: "Lila Relaxed Belted Linen Trench",
    subtitle: "Unstructured summer trench in pure European washed linen",
    category: "everyday",
    categoryName: "The Everyday Edit",
    price: 8900,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 21,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: "Warm Ivory", hex: "#F8F4EF" },
      { name: "Soft Blush", hex: "#EAD5D3" },
      { name: "Champagne", hex: "#C5AD91" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Effortless continental chic reimagined for tropical climates. Generously proportioned with dropped shoulders, storm flap detail, and an extra-long sash belt that can be knotted loosely or cinched tight.",
    details: [
      "Fabric: 100% Certified European Flax Linen, garment washed for softness",
      "Finishing: Bound interior seams with cotton bias tape, natural horn buttons",
      "Design: Deep storm flap, raglan sleeves, storm tab cuff buckles",
      "Care: Machine wash cold delicate, hang to dry, steam gently",
      "Trans-seasonal: The ultimate lightweight outerwear for air travel and evenings"
    ],
    tags: ["new", "everyday", "linen", "outerwear"]
  },
  {
    id: "bt-14",
    name: "Roshni Zari Brocade Peplum Co-Ord",
    subtitle: "Ivory & gold handwoven brocade top with cigarette pants",
    category: "ethnic",
    categoryName: "Contemporary Ethnic",
    price: 11200,
    originalPrice: 13500,
    rating: 4.9,
    reviewsCount: 27,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: "Warm Ivory", hex: "#F8F4EF" },
      { name: "Dusty Rose", hex: "#C58F96" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb129965a2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The modern Indian silhouette at its pinnacle. A structured peplum silhouette woven in Banarasi zari brocade, paired with sleek ankle-grazer silk trousers for the woman who values sharp grace.",
    details: [
      "Fabric: Banarasi Handloom Katan Silk Brocade with pure silk pants",
      "Cut: Peplum hem flare with delicate scalloped gold cord piping",
      "Lining: 100% Cotton mulmul lining for all-day skin breathability",
      "Care: Specialized dry clean only",
      "Styling: Add polki earrings and pointed pumps for cocktail events"
    ],
    tags: ["ethnic", "coord", "brocade", "handloom"]
  },
  {
    id: "bt-15",
    name: "Camille Silk Crepe Button-Down Shirt",
    subtitle: "Relaxed boyfriend fit silk shirt with mother-of-pearl buttons",
    category: "essentials",
    categoryName: "Effortless Essentials",
    price: 4600,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 44,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: "Warm Ivory", hex: "#F8F4EF" },
      { name: "Dusty Rose", hex: "#C58F96" },
      { name: "Champagne", hex: "#C5AD91" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524041255072-7da0525d6b34?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "A tailored masterpiece in fluid silk de chine. Featuring slightly elongated cuffs, a relaxed nonchalant collar, and lustrous genuine mother-of-pearl buttons crafted in coastal India.",
    details: [
      "Fabric: 100% 16-Momme Sandwashed Silk Crepe de Chine",
      "Buttons: Natural mother-of-pearl button fastenings",
      "Fit: Relaxed fluid cut with curved shirttail hemline",
      "Care: Hand wash cold with silk detergent or dry clean",
      "Essential: Wear tucked into high-rise denim or our Tara Palazzos"
    ],
    tags: ["essentials", "shirt", "silk", "bestseller"]
  },
  {
    id: "bt-16",
    name: "Amara Tiered Organza Cocktail Skirt",
    subtitle: "High-waisted champagne organza skirt with architectural tiers",
    category: "occasion",
    categoryName: "Occasion Wear",
    price: 7600,
    originalPrice: 8900,
    rating: 4.7,
    reviewsCount: 17,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: "Champagne", hex: "#C5AD91" },
      { name: "Soft Blush", hex: "#EAD5D3" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Drama in featherlight motion. Constructed from multiple stiffened yet airy organza panels that hold an intoxicating sculptural silhouette as you dance through the evening.",
    details: [
      "Fabric: Crisp Silk-blend Organza over soft viscose lining",
      "Waistband: Fitted high-waist grosgrain band with concealed hook and zipper",
      "Length: Ankle-brushing romantic length",
      "Care: Dry clean only",
      "Pairing: Best styled with our Sienna Cashmere Top or Elysian Camisole"
    ],
    tags: ["new", "occasion", "skirt", "organza"]
  }
];

// Helper to look up a product by ID
function getProductById(id) {
  if (!id) return BLUSH_PRODUCTS[0];
  return BLUSH_PRODUCTS.find(p => p.id === id) || BLUSH_PRODUCTS[0];
}

// Helper to get formatted INR price string
function formatPriceINR(amount) {
  if (typeof amount !== 'number') amount = Number(amount) || 0;
  return "₹" + amount.toLocaleString('en-IN');
}
