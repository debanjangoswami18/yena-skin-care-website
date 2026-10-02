import { BRAND_LOGO_DATA_URI, FOUNDER_PHOTO_DATA_URI } from './brandAssetsDataUri';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'serums' | 'cleansers' | 'moisturizers' | 'sunscreens' | 'lip-body' | 'kits';
  categoryLabel: string;
  volume: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  badges?: string[];
  description: string;
  skinType: ('oily' | 'dry' | 'combination' | 'sensitive' | 'normal')[];
  concern: ('pigmentation' | 'acne' | 'anti-aging' | 'hydration' | 'sun-damage' | 'barrier')[];
  keyIngredients: string[];
  clinicalResults?: {
    glow: string;
    pigmentation: string;
    barrier: string;
  };
  details?: {
    philosophy: string;
    ingredientsFull: string;
    howToUse: string[];
    testing: string;
    shipping: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  content: string;
  purchasedVariant: string;
  skinProfile?: string;
  avatarText?: string;
}

export interface ComplimentarySample {
  id: string;
  name: string;
  spec: string;
  image: string;
  originalValue: number;
  description: string;
}

export const BRAND_ASSETS = {
  logo: BRAND_LOGO_DATA_URI,
  logoDark: BRAND_LOGO_DATA_URI,
  userAvatar: FOUNDER_PHOTO_DATA_URI,
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSgtMNIVSoWgafrNwhv3BDv6Mc_QHaC_0Hdnst8uewIwqT05N-dWuOx7fSsp7P6HxDJ5NEeTTwsRpt56llW8KnodQC_aLwO3Mn73x7-wiymG9SE1hX3RTIPGqff5mThYMyEuK8U2aIg7-vxre39YdPD9HFFiYSnqRLIuotZa5FYM4GLK6uQppdCtZ0sUZdheKHNlIztvwvzHskTB7F6x2KG1VoO2mSEJWm9sueKj_MboYJZh61iZv3LA',
  founder: {
    name: 'Debanjan Goswami',
    title: 'CO-FOUNDER & CBO',
    location: 'Kolkata & Bengaluru, India',
    photo: FOUNDER_PHOTO_DATA_URI,
    bio: 'Building YENA Skin Care with a focus on thoughtful products, meaningful branding, and sustainable growth. YENA is more than a skincare brand—it’s a journey of learning, building, and creating with purpose.'
  }
};

export const FEATURED_SERUM: Product = {
  id: 'vit-c-serum',
  name: '15% Vitamin C + Ferulic Acid Glow Serum',
  subtitle: 'A potent clinical elixir engineered to brighten dull complexion, fade stubborn dark spots, and fortify natural collagen synthesis.',
  category: 'serums',
  categoryLabel: 'Concentrated Serum',
  volume: '30ml Standard',
  price: 699,
  originalPrice: 899,
  discount: 'Save 22%',
  rating: 4.8,
  reviewCount: 2890,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADi07tiPsDk_VSyOg57ZQUw2UmjaV7p_G_2peF0mq-iyT9e1_7IHVW33UTBe4MpuHGVMgG03lByNjxb2TjGqcifF4WI8BDhki4ICgnWHgGfoVgQc5YM8R8KAT-5bNr8qXE4fggGsa7PkvQPVenghM8sZJVl2g9R0nTMBpWkYLxsfEKkKoT9D-iEfjPWKb_dk9_KsCuedXM10bs3FAn2x_F8u63zCmmE_USStmxgcPk8Nra4j-Gm4ofQg',
  gallery: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuADi07tiPsDk_VSyOg57ZQUw2UmjaV7p_G_2peF0mq-iyT9e1_7IHVW33UTBe4MpuHGVMgG03lByNjxb2TjGqcifF4WI8BDhki4ICgnWHgGfoVgQc5YM8R8KAT-5bNr8qXE4fggGsa7PkvQPVenghM8sZJVl2g9R0nTMBpWkYLxsfEKkKoT9D-iEfjPWKb_dk9_KsCuedXM10bs3FAn2x_F8u63zCmmE_USStmxgcPk8Nra4j-Gm4ofQg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAk-7cUDDIjLIDqSCnKFRC65TyZLDpVlHnrc-X5uguXakAEMokVTYm6opemxhHT6rL46JaU4Cp137bF2TEO0dcrwBKvnmqMeGwjMR1-MM-5OGdEHdmAuiMFCFekXrF2dXARcAhIezlQcFBo6MDwulySJzmLsgWRNtxEeI0scsglWptK28SyVGqMUv9aMrXhji1aj-91TGCzaocDMa3lG03uCvCZCeryAHVPYpXlbj4ImMKI_a_37UO0vw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDyEAHpQP10-DD4So9YrZRSrLq63Z4Dh7opC7hpmmmRbTOWhzkdRJW6WLAdZVCpfgJIOmB8_eehbGRASCp-ZkFdtf-MpPFZhcnSzu_o7Y-CVYSXQGUm2RxfaugaPxlJjcQNF9XxAyqVcZ_1rPPFlU2MyObPELZD-ydVumqztJfFn7yRCUlnF5DpbFxrSyrWrBAdYERWOZq28zM_qsTIYxPExDq11zxD0-MfTK06vz15C7Q-INwYlsZHNA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCh0ad7HnVINDK1jFx83mjoxjGyQjFwuG35BN8aRsiuYoreUb-w36PVsp8IUJ_XQl1IPKGrRK2WS3S51ccM2Z0mLGIOGJS6kgP4SI1mXKNsDx3xG026XpGiq6oNBIg2QuPrrBZriCeWCB5hRHqId2_e36OqRAt_VilSotW8cHcOzMLBqhT1KmdJhOEptr5yki-sFP6T7M3g9Icw5cpFqBVRubbWRdag-SOidCREFZ64R538vvqH3374tA'
  ],
  badges: ['Bestseller', 'Clinical Grade'],
  description: 'Formulated with advanced 3-O-Ethyl Ascorbic Acid, our formula ensures deep cutaneous penetration without premature oxidation. Ferulic acid doubles antioxidant performance while stabilized hyaluronic spheres replenish depleted lipid barriers.',
  skinType: ['oily', 'combination', 'dry', 'normal', 'sensitive'],
  concern: ['pigmentation', 'anti-aging', 'sun-damage'],
  keyIngredients: [
    '15% Ethyl Ascorbic Acid (Ultra-stable vitamin C)',
    '1% Ferulic Acid (Antioxidant shield)',
    'Triple Hyaluronic Complex (Multi-depth hydration)',
    'Kakadu Plum Extract (Supercharged botanical glow)'
  ],
  clinicalResults: {
    glow: '94%',
    pigmentation: '89%',
    barrier: '96%'
  },
  details: {
    philosophy: 'Formulated with advanced 3-O-Ethyl Ascorbic Acid, our formula ensures deep cutaneous penetration without premature oxidation. Ferulic acid doubles antioxidant performance while stabilized hyaluronic spheres replenish depleted lipid barriers.',
    ingredientsFull: 'Aqua (Demineralized Water), 3-O-Ethyl Ascorbic Acid (15%), Propanediol, Ferulic Acid (1%), Sodium Hyaluronate Crosspolymer, Hydrolyzed Sodium Hyaluronate, Terminalia Ferdinandiana (Kakadu Plum) Fruit Extract, Niacinamide (2%), Centella Asiatica (Gotu Kola) Extract, Tocopheryl Acetate (Vitamin E), Camellia Sinensis (Green Tea) Leaf Extract, Ethoxydiglycol, Phenoxyethanol, Ethylhexylglycerin, Sodium Gluconate.',
    howToUse: [
      'Dispense 3–4 drops onto freshly cleansed fingertips or palm.',
      'Gently press into face, neck, and décolletage using upward gliding motions.',
      'Follow immediately with your daily SPF 50 for synergistic photo-protection.'
    ],
    testing: 'Hypoallergenic, non-comedogenic, and rigorously patch-tested under strict board-certified dermatological oversight on reactive and sensitive skin profiles. Zero added synthetic fragrances, parabens, phthalates, or microplastics.',
    shipping: 'Orders placed before 2 PM IST ship the same business day in temperature-regulated insulated eco-packaging. We provide a 7-day love-it-or-return guarantee with instant refund processing.'
  }
};

export const ALL_PRODUCTS: Product[] = [
  FEATURED_SERUM,
  {
    id: 'hydrating-cleanser',
    name: 'Hydrating Face Cleanser',
    subtitle: 'Barrier-safe foam with Oat & Amino Acid Gentle Gel',
    category: 'cleansers',
    categoryLabel: 'Pure Cleanser',
    volume: '150ml',
    price: 399,
    originalPrice: 499,
    discount: '20% OFF',
    rating: 4.9,
    reviewCount: 1240,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRTj__sauWBKG8z43Np81c709KwbEY8tuR7P1IWNn59jJMb_rxnx6au7ztxJJcY3S37A1ojxpesL5EADzzgxfZxMAmT3gUJTJ9RDUh97EpCQ1H1QLNvPHFSKooabQMGDHTibPwEv0ZZL6c9JydU6_f0c0UmuU22Fki1w_Vv220KoAa_IdhmFe8rK5nBE0dXbUDDDnWlz0lOf1OOxjU1CMkKDk_ZuEWQgxCiN_wcguslhen5jcxwESkug',
    badges: ['pH 5.5 Calm'],
    description: 'Colloidal oatmeal & amino acid complex that gently lifts impurities and water-proof sunscreen while preserving the delicate skin microbiome balance.',
    skinType: ['sensitive', 'dry', 'combination', 'normal', 'oily'],
    concern: ['barrier', 'acne'],
    keyIngredients: ['Colloidal Oatmeal', 'Amino Acid Surfactants', 'Centella Asiatica', 'Chamomile Hydrosol']
  },
  {
    id: 'hyaluronic-dew-drops',
    name: 'Hyaluronic Acid 2% Dew Drops',
    subtitle: 'Multi-depth deep plumping with marine algae',
    category: 'serums',
    categoryLabel: 'Dermal Hydrator',
    volume: '30ml',
    price: 649,
    originalPrice: 799,
    discount: '18% OFF',
    rating: 4.9,
    reviewCount: 940,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnWSID5tXs_zXizHB6k-1OM2e4ztW5d8P6_FiuwKspBjYwZb07De-eLAyKKgHPvnVSUUjx54x8B3mpnPbIB-J73vTDPMRacd2OU2DskLBlYM8G7yU4iuPu2nePolyn-yx973NiTphL4nre9aSUSDJztRRjbvoyWdCXRR71G2Yam6XQLb4or6TWEiUbl9OgRKgNhneA1n7yedYIfuRp-06ggiXzGmtD2-a4kjWxWbG0LOjDTt2DaQ35Bg',
    badges: ['Hydration Hero'],
    description: 'Triple-weight molecular hyaluronic formulation that deeply quenches epidermis layers, locking in moisture for 72 hours of dewy radiance.',
    skinType: ['dry', 'sensitive', 'oily', 'combination', 'normal'],
    concern: ['hydration', 'barrier'],
    keyIngredients: ['Micro & Macro Hyaluronic Acid', 'Panthenol B5', 'Marine Red Algae', 'Betaine']
  },
  {
    id: 'spf-50-shield',
    name: 'SPF 50 Dewy Shield (Invisible Mineral)',
    subtitle: 'Zero white cast fluid with non-nano Zinc Oxide',
    category: 'sunscreens',
    categoryLabel: 'Mineral UV Defense',
    volume: '50g',
    price: 599,
    originalPrice: 749,
    discount: '20% OFF',
    rating: 4.9,
    reviewCount: 3120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzkNV378Qg1Z75z325cD6bkcQELdsVJ667T1ioW3oBvXolg_MkL-Mm-k1d3GBZAtmgsxj3sbdov4ZJLks8JN1jZQ_cQT-KnKpn8fMyBU6i85YGm00JoMJ_3i9yEM1-7SuTkuab83cPH39f_I95y0SVzbsD_RqOfRpPwDxsV8BLIf3gU-ofa-_yLlur9JejGB94XaVYlXn9ji3ldLqYtwxweKagUH9J14Vh2b1r4jRInMxfcPfXUvHWmQ',
    badges: ['No Whitecast', 'PA++++'],
    description: 'Ultralight non-nano Zinc Oxide broad-spectrum mineral shield with adaptogenic ashwagandha, offering a satin-matte skin finish with no ghost cast.',
    skinType: ['oily', 'sensitive', 'combination', 'normal', 'dry'],
    concern: ['sun-damage', 'pigmentation', 'barrier'],
    keyIngredients: ['Non-Nano Zinc Oxide 18%', 'Ectoin', 'Matcha Polyphenols', 'Indian Ginseng']
  },
  {
    id: 'daily-ceramide-cream',
    name: 'Daily Ceramide Barrier Repair Cream',
    subtitle: 'Barrier repair & continuous 24h hydration',
    category: 'moisturizers',
    categoryLabel: 'Restorative Cream',
    volume: '50ml',
    price: 499,
    originalPrice: 599,
    discount: '16% OFF',
    rating: 4.7,
    reviewCount: 820,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV0HsfqUa1Clobsw_4bgCAVMWJqzjIK-_V7Qo8CUaqNlEzRGbEtvrGJNppKNW2lzD2o2bbG-mXS9RmUizLXMG6HKYK6y179Oo_uttlNxneqyZx-QxN9jgbFILcLIod-zyI8lJF9pPB6kzUPccKLaPKnBIc7IgiQa2Te4UVVnRv4B5dUblh4qrPiS54fjWYgQ7kx_vyF2sQqsTXfNba_EbCv00AQcNRnXOvXAVs9rgkRtj5o9t80_UnGQ',
    badges: ['Ceramides 3%'],
    description: 'Biomimetic ceramides combined with centella asiatica and squalane to seal damaged lipid matrices, soothe redness, and stop trans-epidermal water loss.',
    skinType: ['dry', 'sensitive', 'normal', 'combination'],
    concern: ['barrier', 'hydration'],
    keyIngredients: ['Ceramides NP/AP/EOP 3%', 'Centella Asiatica', 'Plant Squalane', 'Oat Beta-Glucan']
  },
  {
    id: 'hydra-plump-lip-balm',
    name: 'Hydra-Plump Peptide Lip Balm',
    subtitle: 'Peptide & Shea Butter for pillow-soft cushion',
    category: 'lip-body',
    categoryLabel: 'Lip Treatment',
    volume: '12g',
    price: 249,
    originalPrice: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 610,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALx65NroZliXGtTKNGbA_m7v50wwzy2WUh-ZkHAYEW6o0hpEsrngfslhGFJWCRgLQKcD7Ax2X4ZLO8GJ9lQsXr1wjd9Uc3QLCBiQJ4rKBY8OGhqoT-W1328HELOL34iWQcUNgpFjuOhgOCA4HwRF6KAQT4sLUWxoyKk6kJXpEDlSCQYs4Ob-7P9RyCCYniNM0nZT_wW0zwyGWf1ETg6VgknyKR73wSJIVCEH6Xkzl6drNUUkJ5jLy2eg',
    badges: ['Peptide Plump'],
    description: 'Infused with cupuaçu butter, palmitoyl tripeptides, and cold-pressed marula oil for lasting restorative plumpness with a glass-like sheer sheen.',
    skinType: ['dry', 'normal', 'combination', 'sensitive', 'oily'],
    concern: ['hydration', 'anti-aging'],
    keyIngredients: ['Palmitoyl Tripeptide-38', 'Cupuaçu Butter', 'Cold-Pressed Marula Oil', 'Phyto-Sterols']
  },
  {
    id: 'gentle-oat-cleanser',
    name: 'Gentle Oat Foaming Cleanser',
    subtitle: 'Colloidal oat wash with calming chamomile',
    category: 'cleansers',
    categoryLabel: 'Calming Cleanser',
    volume: '150ml',
    price: 399,
    originalPrice: 499,
    discount: '20% OFF',
    rating: 4.9,
    reviewCount: 1240,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtGrTNMcfwEwFPewfYQZeEIPHe_uMfOH_6MHVZ9giYNgPw3TtL8MxHPh6zWWkr7rkLgIu8w_p4MTMBZcPMlRkAl4TboyfrIOrvYpkql_cpD68MffegqIoZm_xxYwsGM630u-qeeial4KSvuOvtLGcwK8v27WBD3-fRxT7XRS6wiO8BGec4oTo6B52eo0G59ttx8sgOhIZZexGPKZFbQ5z9WIN-OhzYKy70ndcf_tHxVs3Hqz0L2T0w5A',
    badges: ['pH 5.5 Calm'],
    description: 'Micro-foaming colloidal oat wash that dissolves excess sebum without stripping the skin of essential lipid hydration.',
    skinType: ['sensitive', 'dry', 'normal'],
    concern: ['barrier', 'acne'],
    keyIngredients: ['Colloidal Oatmeal', 'Bisabolol', 'Aloe Vera Leaf Water', 'Sodium Cocoyl Glycinate']
  },
  {
    id: 'peptide-eye-contour-gel',
    name: 'Peptide Eye Contour Gel',
    subtitle: 'Matrixyl 3000 & botanical caffeine contour lift',
    category: 'serums',
    categoryLabel: 'Targeted Eye Care',
    volume: '15ml',
    price: 549,
    originalPrice: 699,
    discount: '21% OFF',
    rating: 4.8,
    reviewCount: 940,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIt9jzI4QKYrby8sSSRWqKdjVYd_fZL7W4p7GunTerIszlETVNMgiw7zTq8nIDmqnOLHHyKvWJOI54qq0qaSjEoziATyle_BQAjLlN6l4KFfSnlkzLu7P6u8gOWXV6quktklxL_metFNKuD9kGukBqV5hnjaBWCNaQDurDmpHg_8jk3YhGlC8Z4xSRsCU4-f7sw8xY6NcPeonSrkpPTapopILWFKf9Hfnp0VzVAsT0WV5afgNRiPOY5Q',
    badges: ['Contour Lift'],
    description: 'Hexapeptides paired with green coffee bean botanicals to immediately decongest morning puffiness and smooth expression lines.',
    skinType: ['normal', 'dry', 'combination', 'oily', 'sensitive'],
    concern: ['anti-aging', 'pigmentation'],
    keyIngredients: ['Matrixyl 3000', 'Green Coffee Extract', 'Niacinamide', 'Escin']
  },
  {
    id: 'bha-clarifying-toner',
    name: '2% BHA Pore Clarifying Toner',
    subtitle: 'Salicylic acid in green tea hydrolat for pore decongestion',
    category: 'serums',
    categoryLabel: 'Exfoliating Tonic',
    volume: '120ml',
    price: 449,
    originalPrice: 549,
    discount: '18% OFF',
    rating: 4.7,
    reviewCount: 730,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl1kJz-OiVo8xuYAMwt8G1HkhsSc8T2_E94f_sVendm02bRCLilRm3ajivHLKu4eyzhCvwFq3tGk2exvPcaIICsGVSL-H1SnmeXSO4xyptqNf94skza1ZCFiq_qKWJJsZohrvFKh83JE1jI7L_sFQjj7I3Vze5FhZ0y91oEsxRnGrlqcqilmsd_eHRvg1f8iRqqXFOIukmAYi1Oy9lkKGKYn1P8wAd30CL6QvbzkhDZqcDv_6FuU3HfA',
    badges: ['Pore Balance'],
    description: 'Encapsulated salicylic acid suspended in organic green tea hydrolat dissolves sebum and cellular debris without flaking or redness.',
    skinType: ['oily', 'combination', 'normal'],
    concern: ['acne', 'pigmentation'],
    keyIngredients: ['Encapsulated Salicylic Acid 2%', 'Green Tea Hydrolat', 'Tea Tree Leaf Oil', 'Allantoin']
  }
];

export const SYNERGY_BUNDLE = {
  title: 'The 3-Step Radiance Synergy Ritual',
  subtitle: 'The 3-Step Synergy',
  discountText: 'Save 15%',
  totalPrice: 1399,
  originalPrice: 1647,
  steps: [
    {
      step: '01 Cleanse',
      name: 'Hydrating Face Cleanser',
      price: 399,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFUtCV30IweECcKEtUiBJmMqSKXQshj8pr9f2iWNGNZgp_BC26N-fZ5k6AKEuLx64tDk-02MlFJK3NzdeKic6kepRRbpPZjU2sF0nEb-mQz3P6eqmuRXYf7ia5jOB9eHxyAQyOGnD6X-EqixiIdKoRDxfn17tzXWfHH3sS3DNE3h9M12GwUMSemR6qNwr0iQYcF9js0IHmOMApLVStDGBoullojkCetgERBBCaDTEz19AWExFH9cgimQ',
      volume: '150ml'
    },
    {
      step: '02 Glow Serum',
      name: '15% Vitamin C Glow Serum',
      price: 699,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQc8FLnrTUe7sJtVTjIeVpifiOnht9j0YC3XY7Zqs1Lm7SO6PBRqE4aX-zxhy82DLFKvjYJW3vsOhUr8WHW30EI_nvf3j5ZbN3TLGIWuPBWljcVcZ25oXHblNdhXABLZjIxsyqT9-Y68-KmJuLvyjG_sxAHxRSdg5PPC6EgrA4-4JC98NggxQHBnGuZw5SMP3Ssgxi-UoXu4PHDFRy5wYU7FbKOVFcw3rA8PjCslFSfoa1g2eO8VLfEA',
      volume: '30ml'
    },
    {
      step: '03 Shield SPF',
      name: 'Invisible Mineral SPF 50',
      price: 549,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5q7Opd2V7d_Cp_6jl17ZVTX-BaB5JY1ukWVSZls-bMIFxzpAmJ7ENR4B8g9v6oJ6OYFYd0675JwA5_4cIZTSvxFRG8KkPQrx1ntKh9utiipGy8aPSyAgEVdsiPbZYnJ-6K_D5W24CjHujDWOq8pPH11tJM58h-siX1Xoac49jbho-DgLnOMksId5AJSgiyMloFD5DCzdbt851Pt_X_gor89wOADcO4wsZmEAKWJ7nEyCCjpfhD7bFoA',
      volume: '50g'
    }
  ]
};

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aarohi M.',
    rating: 5,
    date: '3 days ago',
    verified: true,
    content: "Hands down the best Vitamin C I have tested in years. It doesn't oxidize or turn orange on my skin, has no sticky residue, and my stubborn acne post-marks faded noticeably within ten days.",
    purchasedVariant: 'Purchased: 50ml Value Pack',
    skinProfile: 'Combination Skin • Age 24',
    avatarText: 'AM'
  },
  {
    id: 'rev-2',
    author: 'Devika K.',
    rating: 5,
    date: '1 week ago',
    verified: true,
    content: 'Gentle enough for sensitive rosacea-prone skin. The subtle dewy glow under sunscreen makes me skip foundation completely.',
    purchasedVariant: 'Purchased: 30ml Standard',
    skinProfile: 'Sensitive & Dry • Age 29',
    avatarText: 'DK'
  },
  {
    id: 'rev-3',
    author: 'Sunita Kapoor',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    content: "Having tried luxury serums costing 4x this price, YENA has outdone them all. Most Vitamin C formulations oxidize into an amber disaster within 3 weeks. I'm on week six and the liquid remains crystal clear. My hormonal hyperpigmentation along the jawline has lightened noticeably.",
    purchasedVariant: 'Purchased: 50ml Value Presentation',
    skinProfile: 'Normal to Dry • Age 36',
    avatarText: 'SK'
  },
  {
    id: 'rev-4',
    author: 'Siddharth K.',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    content: "Finally an active serum and SPF routine that doesn’t sweat off or leave a weird ghost cast. Feels like a light drink of water on the face.",
    purchasedVariant: 'Purchased: Synergy Glow Routine',
    skinProfile: 'Oily & Sensitive • Age 28',
    avatarText: 'SK'
  }
];

export const TRANSFORMATION_PHOTOS = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi_gTan6Z4gmpZBjKLlbaR0rAZltYfxUxgmKjZ-7WNqDv2mhJBnrXIiVKNuYZxEs9hsro9c0rtCfpeGyY_sFiQNuzb_3zVskqhzjqqKbllEION-VgjxN7cgQ9PShwR85Z2CjxwRZxOs2fR1aJ4JcF_LRES3KINXLD7C7OYcfEYJzWlHpIO4UdMUXyzyFVxMB8liwFgCQPsMLcFAs1vpGhbba6SP_VF7qlqwFhfonoWMprkWB6__F69fQ',
    label: 'Customer selfie showing clear radiant glowing skin after 3 weeks of morning ritual',
    tag: 'Day 28 • Ananya K.'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6ixNIcdlUCSExzFCp2DCTp5vXSBVcq7okMjfFHeG8v2oy_-W2TVLR1aFsq3JClalP8wUWQ4P8aw_fJdtathq0M4pUEmDheKwKyGUzyfumZDGY63CelQM_c7uQerkV1lZIQY5e0RkvRlMzAUZk-Vd8F1Sdt1RjUQz9jmGMlioXCuu74m8JeHPa39mEGgaTdqK-oC4R7JLDnS7Y3jurwhHSkZJiJbZW8Eztw_jc40Eer8-_tuWhm2UAjA',
    label: 'Hand holding amber skincare bottle on bathroom vanity with morning golden hour sunlight',
    tag: 'Day 14 • Ritu S.'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCshCORHaqEFAvELHGmidLpSbrqBTWv2QZOUI5FMK2oyTLku8-UshuKlbqdt7Vi6l1gdqGQtvnh1X7MisEwqQ_xwHkInKIARFkq8j9Pw7P6471Gir9xhb9hRcvu4oHP4Y_mmFJJDx0roafrELkHfiwefYsBUwK6YFCNLv6grNxC_HM6y3ZA_HjmB_j5_sNYNYRhckdMLOT-uFTg2iwBnH2pPRHILKW7ZXqfSLPGGt-qvUlYF-aWkfnc1Q',
    label: 'Close up of cheek with reduced dark spots, real customer before after texture',
    tag: 'Day 45 • Dr. Priyam'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCohaFeETgQmbSVyrzvHuYdnrj1N7QhiG-bdaK0MVP0s27jRpzcAGx-IwfGXsJHe5-QvDOBhOIMjTvmKAhCPxboIRjdKCM77LXZcxMUtw4YD0fsyFgCtGVfQuH-QWqqlbALApaAqeq_UlcGmgEHmts3tx66m86SVQGWLZI_qNzhYUVb0S_rRHCM6-_0PZcoi8cZu4jNlgmat8n6VNrxEhyWs3piA0cQdMNC8T1lkFF0bsFvG5wp3uuJA',
    label: 'Dropper bottle dispensing serum drop onto fingertip, unboxing customer aesthetic bathroom shot',
    tag: 'Day 21 • Meera V.'
  }
];

export const CATEGORIES = [
  {
    id: 'cleansers',
    name: 'Face Cleansers',
    subtext: '4 Formulations',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdI-ToGp7mn_pyyJaUpXZLW0F9KC0zhgSXlrrEX9HUePcmx08YVHtK9taZQrfFjQEq1YPkE9yYw48GnrVOR3b_tyFcKyWT2KTq1j0EUScB4A2SlRbgCpUDRre_f2kkGeG8IRYv4bHIVASbD5DuJt758UGZgxdfm-Uq_kgpBKQ3ZWLJ-nrz8WUfvkHruR7DMY3wFQpM4DjE9nSO4GA3hwB1a4v03dl24IK_C-SS6sAK5r19zjB-wLVntg'
  },
  {
    id: 'serums',
    name: 'Active Serums',
    subtext: '7 Targeted Elixirs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCROkQd8tlRxZjLulgXZ3ijBerGjkpVT9STF6C_cuIccJ3UPwdThPsdH4cuzVlZg05yJU-bl_L8ZiH-QqGt1AnXI97DlgWYM-wJavdUmhA8PzRqr9YroLX6646EzVdit4BAUmTZv_H_uFUn1UXeGff1AU9PFGcgtwvraXflvE4Sm6fkiEp18v3aupRMT3sIA5dqi-PSZENS51_Glfh_fsDv2NlHYcNyZklMtfQUAPXfLqOPnTbDo3nxxQ'
  },
  {
    id: 'moisturizers',
    name: 'Moisturizers',
    subtext: '5 Barrier Creams',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkLnqJ41NeSt0jH-5VvPg-pBn4dJ1uohJbKQLeTu-17s5GyF1UAYvt0S65IwSlj2S44orEVJX9-Q3EuyygcKNEQBtrP4HIf7nceJ4FJB2ShjRohbSIubct46AESpkp-Chy1fF8m43o6TrzWlc7oz3jmx-7HyU0hvCa0hJ5ZP8TTkSJshQYFwKLzw39EU0pBWi-akPbZnYf29245AiDr5kznUjByOtN0Y9OtL9JRHYUGgWPLAmT8cc_Rw'
  },
  {
    id: 'sunscreens',
    name: 'Sunscreen SPF',
    subtext: 'SPF 50+ Invisible',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAccgTfIAFfpPsxjf6Xwwfonspu4ZGMiKUDZgIcN2B_JYdyO3qKVKfW_PAQ1OyQKrQhhS4R_WITwuUmGCZ1CEVUxseepFjeeplQ5oxUlxRDZ06sZeyBbDW5Oebzwlss1adCLP7eHA2MSueUmIod8zTb98J5U8BjsRkBo9sx2dsT2QfFwMO8XHjw37tvhlHFIrcG2d4uST9Z-C1fyef5scf7UzuCv0eFR1KvGsqwaaesRx_6aNpYOIvyA'
  },
  {
    id: 'body',
    name: 'Body Care',
    subtext: 'Botanical Elixirs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAOeHlmlkEfrdLiD44XrgY3IuQELzFgVcbK8BH4G4l-xsVWlXkE9Tg6RffX_FoGMH2-93OjpYOzrn7F1Ein75yptgsPFD_Waffpl37JK9Im3mCuo3UYFIvKoWnZNxNRupiUEh4t9bgBbMN5qS9ddF7FE1mFPxTMMMy8CgXKR7clvJLG1mAJNP3oW4QtVGodmaw1leL0mcjN_1LeMcBaM6fLCUpBn6QKjE6hocEbGYD-x03zmR6bvEK1w'
  },
  {
    id: 'lip',
    name: 'Lip Care',
    subtext: 'Plumping Glazes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCubOi074hsXPl0sLicLICdecQZ1DNH57l-WcJ-7g2LGwNnUkA6X-u9_UPpJNDPX-LNz3yCPaKef0UVPywNkrPfkz6E_Ej6p64jqMuL8zFnlStDMBcJRJkZxPv6Bb4FKH3FohG1TxnR0udEWj9JZz1b-0foo2mB-7OizD7QX733moT1tQg-Ltwg-7jeMPMzDV55dJZnxpX4FmdMGIJiYemKo9RdUJBqQCLvhbPIvpkk2YMhDTrcLyBaCw'
  },
  {
    id: 'hair',
    name: 'Hair Care',
    subtext: 'Scalp Elixirs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCR1izhPMUaMqSwgUL5qNMm1THtg85zILejORgX7RQhvw8gDDylyehODIDQg5jAGhb0rNBVhYFgAWPCKQ7q2Vkj4LsrfiyEylL_YbkxJ7Ygot_-kBvdQt58TD5budxHmVKj7E5D9_NxRAk8NBO4I_Z3u9AZxPitlBFAe7kNcgKBPGVjJTxoyPlHUwCYi0QsIPx46biTA9RbxRWcgelXkyIWQOmt3qHpc7m2838E0_MmZ1ZOI7ryTfVQg'
  }
];

export const CONCERN_CARDS = [
  {
    id: 'acne',
    tag: 'Salicylic & Tea Tree',
    title: 'Blemish & Acne',
    subtext: 'Clarify without stripping',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6i-JfS2COVMMhwxUDLR9Us0LoxEKC5rX58OKF47MH8MRp49YFyP65kHjfEaCcNcfGAIxkgWD8NGrbBrwZ7VFcDaXC9MM3ou-UqzOHIir5hY4Y7-C6k-7OfSksuYWaFNyLGKSh4CcR1UnrfJl8rnXlxTPexrkn3NA8AMmsfzfvx6DK-AsyNMoSwjHmaKQdNGOrqITZgvkjXkF5Kp64jsHrNbGM0eiHvaMROZko8hH7eNOc_hQQKD1L6A'
  },
  {
    id: 'dryness',
    tag: 'Hyaluronic & Ceramides',
    title: 'Dry & Dehydrated',
    subtext: '24h Continuous dewiness',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHkbhjyHTktYMU2ocRdiiIB4ze-aHgPgAfS7vHkOS_q3Lu6JA-E9WXJCUqPdXpMBBGCdjhotRQayenBJJHLvxuXlgIN2MWWSmCFpO8jmsDKYZCv-IdAIF8_ZqLOxRaMxUfKWR9bYg9VMHv4a4en0YWJ5BRxSjvwhzvR_3Ls6xkqsP5_pXOI-m8gZSTZyPGGfZtJ01iJ-qwR9K-L1pfc48J_16V_WyGW_DeMHk25dgp4XcIq903F4X7Ew'
  },
  {
    id: 'dullness',
    tag: 'Vitamin C & Niacinamide',
    title: 'Dull Skin & Radiance',
    subtext: 'Instant skin luminosity',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAajZS_kY6kWVfr6quXKoGPRp7oLC_4xRzo9is8ONQ7FREjBu4cXAHCFKlr1xji9NwhngAgH-rO8p3FLeZSm8LYcO0U1Cu3vnfPAU9nE75AjQSBrpGTPW1XdjZha3omaRGAjTm4CYyoU1xNfOVRX5EReKpMk8Qe-YGwT7pGeDivcQK7pDBt4R4a8oUBk4KpXWX3uxSYTiZxnQTWt0RzAU7CNvuBrmzbrLnrEP9E0gazSc27w_8O9AZjrA'
  },
  {
    id: 'sensitive',
    tag: 'Centella & Madecassoside',
    title: 'Barrier & Redness',
    subtext: 'Calms reactive flares',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgRV1w3p1cOzxPqRaSk_GiW6yDtw3pm_7BiyohpItD5vDXbp52uNc7PjhZqlGLoMeJIbm9kNMoeyHsdg5UtMeKQuk2WjfCDK_assA3TGVNubaG_DhVMhDX3usjxvyTz7R8nHVJQRrg2Lh3YrNLq8aaEYV7VJBr7npKTwv-Ov6TtlMrkZCRiJ9JqhT5psq1mcTmU0IuL7eBr-gFuK4rFz25wGpFVOWnElDq2oHQRZqJD66Bl4Xd2yNgKg'
  }
];

export const SOCIAL_GALLERY = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA0HgrzdqjSGyoANg72wKYDmIdLalX9VvKcudp7gQeTZMdnzNz_LMgHuFaYLy4VlErE-fkOHxvezjnRnSmDPcHd3ezg1wvP5XwtNiYr5K9aVzAQdts-zEnoIJXkPi_LwlUAqiMIPLgMkMI6ziEXWRQO6mI9liZs7cT1biJtEi3KgLU9bPBEuesGjIiVMBBt2hl2uXqJlVzmtgb2OZ9ZnlFtmPoEm6T2_hlvm5eip6QhXcc1xWMw_9nXog',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAdA8P3q5DoPhIgcI2-haEScZugDsWeSrLx0pFrZddtKjS0ErIR7t6dn1RcsbOY4Fpv-4QCmfHFS39sVj-_5y7t7RnYV1nE5pzkzcJmJqqkxd7xHKN4l6BujKd0MctInolnH0W1rrB_D90Z49qIp2awXlBx3SCtyiRcUEKfcpDnX1eq3lJSSZ6T-GdMCa4Zab6LMnc0g7shJAZQx1kJHnepF_CK5yWG1DZMO1S-YE1IFAQr9BPNmhtjDQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDEnGNNFScHHBG_sGU0EWMr2cA14OLxn-Qz1oMFTs2U0iOYGJ1SXga938x2TNo4V4tHyaDj4tnT9GYnjUTQjTZVfJuED0w__onw1dRGLupH1spScSDAEEU0x7JS60JqDq5DJ1HRIAofprMf5nVRQly53Qjfw9smJuJJ5LOake7kmCcNUW9EWbtJQBJrexaftaf8aIGD_MTCBeJD0Um8qzLSEJvOT_k5hItx1vdZkVzrVxG5fN6enBSk-g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCp7ibXvgJ7NrRIYyiqz2RgUZHL_iIZRQEHXhks0n2GdhFMgL41w0cFhW19sp7EPQC9O1Nu4zU23lF2qkOSA8IOC2S2gEpKh3JheByEBEEMdcAXDkeZ0H4mUCZfjQm3nxAtKcwJHc06r5Rc4PH_pFjeb3pcd9AAZZnA5x7w1k9pfAnaSdwNhRoX9NAuQ5qdr7J54X3R7mf4dgzQu6sX6ctU_4iINBWK2cPonmM3hy3waToP53-vqrPAjQ'
];

export const COMPLIMENTARY_SAMPLES: ComplimentarySample[] = [
  {
    id: 'lip-glaze',
    name: 'Mini Lip Glaze',
    spec: '3.5ml • Ceramide',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLXCAgSre3Z-LvskC4PKNx5fq6YPLeGSAIzQSjBCCFzDRAKL_RIjpxGDI4xlS1nFOzuJjAstsuHQdWX8RKv22u4V1_uWU2rebWT4d7ZmWxKmSLedZMa2CAnrNAnrzYwe-mkNDDjvcbMafkhuzzVr6hUppvwLhjvwN44MrA1056q1gQyXXS9IaGX3-U-aUyFqijPyiaEokYHFgdF7cpSABJn2UyTNP68prMgdFjsfj6Oynf4Ge1ufcmqQ',
    originalValue: 220,
    description: 'Restorative phyto-squalane & pure damask rose shine.'
  },
  {
    id: 'rice-toner',
    name: 'Rice Toner',
    spec: '15ml • Barrier Dew',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu5KRWNpXg3L7jmHmnBDhdNl6im9Sh5tU-tKWF-XK_vDPjiKHIOjnS1BH7Ejaq952Y_efKQvJdbCLv8rq-gtmkUjG-lehAACbefTS0EmrzsVXPkqD93o4xaIqmWs0ZxGYiBV6G9060bp9STxN0p_P7jPNDY2dK0RZhmW94VteecgyJuTdbV9qMlIA0MKA2TpZuh4_iAEPLx4ZjQgzZ_KztOSKmn87E2uQSLRG9s7aRNl1j14HY3NFgRA',
    originalValue: 280,
    description: 'Fermented rice ferment filtrate with milky ceramide emulsion.'
  },
  {
    id: 'barrier-balm',
    name: 'Barrier Balm',
    spec: '5g • Centella Salve',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdFjFoWTBq1AfJ9UjNoxKyZeRwTrvUfAEi8KfDoUl-yWqlc0nqeHHyQKWYlL4kdg0ZvCbucYjkAYQa4Zn-SuNsn0_ZxbQRPlexLc-jnp3JH64BMaRHwsjeVPfx4ukRYaRUgHClhsqa6X7856h-YQvRfSmWJhF1dBXrXHSO9Lj7lAs1Gg0De9hlgF0H_ncygg4WkH0XMF6xMC-POGU95C5zdtEvfA82zLrbQ8P02PGjX4gG5pws9R4AZQ',
    originalValue: 250,
    description: 'Intense SOS rescue salve for compromised barrier zones.'
  }
];

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  tag: string;
  volume: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    productId: 'vit-c-serum',
    name: 'Vitamin C Glow Serum',
    tag: 'Serum',
    volume: '30ml • Botanical Illuminator',
    price: 699,
    originalPrice: 899,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_xyQ2MlbPkbrBDwUhyMLzUzejMKnWAbuSM8TPe1mhOlwwLAz_3EUzOj3fsn_KBdwBmbug4GDeorh58b78YZXuCOs23CLp9CUyz3vjyB2vPe9xWQmXdOnS9UYpr41APg1QnA80J6YpU3-ebq4eMT7fdUrLVG2YCgNdpK1dv8j5ebDOTH3jlWR3RJTKMRRyLXdydmNTtlWC-N5JbZhf-b9SunTjOse0obKDWLiQ9TlHsNsQy1etI6oY8w'
  },
  {
    id: 'cart-2',
    productId: 'hydrating-cleanser',
    name: 'Hydrating Face Cleanser',
    tag: 'Cleanser',
    volume: '150ml • Amino Acid Gentle Gel',
    price: 399,
    originalPrice: 499,
    quantity: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Tkcyg2p0_r9Ta75DbQd25eHpCCFDYnqJrX6Jcdm4pMpj55yOltR2DBMe3u_tsNyKg7aO4ou79xzbD6_DV-FOM3C9EyqVRbnvZrewPQjM87dIPuQOQiRuSLZkyWWn7j8fJ5n1jYiMH1DERklI4GhmZCU-QDDLjq_wwMq4e0A_JuuScOGhM_PrmpvuAmi2PTDCsZusDI_KvU8yVlcJ19cThXg7d_yBk-iBIfRtNIiW2WPFIcjXCEBHOw'
  },
  {
    id: 'cart-3',
    productId: 'spf-50-shield',
    name: 'Invisible Mineral SPF 50',
    tag: 'Shield',
    volume: '50g • Broad Spectrum PA++++',
    price: 599,
    originalPrice: 749,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3QMkMTvQJqVJdmAm49CFaMjCdjajeM-aDFeXJ_tp-WEPa-nN6tsmn3QHOsws1JhmTCIRZjEuOWehEj87Ic-lshfqNa27DHodP83xjjk5JumK0pcj7WA1apDeevzNGxZ-M0OSqZSriMVLWXX1GEn7NWU4SiHlhUn0EG6wt-6S0cMmE9kiUbr4Il-qJscEi6BWFeYQcd6nqnCSejejpON9_KILTIKWNt-GMtieP9KM_5cp9XQ_TIzg5Hg'
  }
];
