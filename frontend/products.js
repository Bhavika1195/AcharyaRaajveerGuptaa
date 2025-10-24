// Products data for the crystal shop

const crystalProducts = [
    {
        id: 1,
        name: "Amethyst",
        price: 299,
        image: "src/images/products/Amethyst.png",
        description: "Enhance spiritual awareness and inner peace. Known for its calming properties and ability to promote clarity of mind.",
        category: "Healing Crystals",
        benefits: ["Spiritual Growth", "Stress Relief", "Better Sleep"]
    },
    {
        id: 2,
        name: "Rose Quartz",
        price: 199,
        image: "src/images/products/Rose Quartz.png",
        description: "The stone of unconditional love. Attracts love and promotes emotional healing.",
        category: "Love & Relationships",
        benefits: ["Self Love", "Emotional Healing", "Attract Love"]
    },
    {
        id: 3,
        name: "Clear Quartz",
        price: 149,
        image: "src/images/products/Clear_Quartz.png",
        description: "The master healer. Amplifies energy and brings clarity to thoughts and intentions.",
        category: "Master Healers",
        benefits: ["Energy Amplification", "Mental Clarity", "Spiritual Growth"]
    },
    {
        id: 4,
        name: "Black Tourmaline",
        price: 249,
        image: "src/images/products/Black_Tourmaline.png",
        description: "Powerful protection stone. Shields against negative energy and electromagnetic radiation.",
        category: "Protection",
        benefits: ["Negative Energy Protection", "Grounding", "EMF Protection"]
    },
    {
        id: 5,
        name: "Citrine",
        price: 179,
        image: "src/images/products/Citrine.png",
        description: "The merchant's stone. Attracts abundance, prosperity, and success in business.",
        category: "Abundance",
        benefits: ["Wealth Attraction", "Success", "Confidence"]
    },
    {
        id: 6,
        name: "Labradorite",
        price: 329,
        image: "src/images/products/Labradorite.png",
        description: "Stone of transformation. Enhances intuition and psychic abilities.",
        category: "Intuition",
        benefits: ["Psychic Enhancement", "Transformation", "Intuition"]
    },
    {
        id: 7,
        name: "Selenite",
        price: 159,
        image: "src/images/products/Selenite.png",
        description: "High vibrational crystal for cleansing and charging other crystals.",
        category: "Cleansing",
        benefits: ["Energy Cleansing", "Spiritual Connection", "Peace"]
    },
    {
        id: 8,
        name: "Hematite",
        price: 129,
        image: "src/images/products/Hematite.png",
        description: "Grounding stone that helps with focus and concentration.",
        category: "Grounding",
        benefits: ["Grounding", "Focus", "Confidence"]
    },
    {
        id: 9,
        name: "Moonstone",
        price: 219,
        image: "src/images/products/Moon Stone.png",
        description: "Stone of new beginnings. Enhances intuition and promotes inspiration.",
        category: "Intuition",
        benefits: ["New Beginnings", "Intuition", "Emotional Balance"]
    },
    {
        id: 10,
        name: "Tiger Eye",
        price: 189,
        image: "src/images/products/Tigar Eye Stone.png",
        description: "Stone of courage and protection. Brings good luck and prosperity.",
        category: "Courage",
        benefits: ["Courage", "Protection", "Good Luck"]
    },
    {
        id: 11,
        name: "Fluorite",
        price: 169,
        image: "src/images/products/Fluorite.png",
        description: "Genius stone that enhances concentration and learning abilities.",
        category: "Mental Clarity",
        benefits: ["Mental Clarity", "Learning", "Focus"]
    },
    {
        id: 12,
        name: "Garnet",
        price: 239,
        image: "src/images/products/Garnet.png",
        description: "Stone of passion and energy. Revitalizes and purifies energy.",
        category: "Energy",
        benefits: ["Passion", "Energy", "Strength"]
    },
    {
        id: 13,
        name: "Aquamarine",
        price: 289,
        image: "src/images/products/Aquamarine.png",
        description: "Stone of courage and communication. Calms the mind and reduces stress.",
        category: "Communication",
        benefits: ["Communication", "Courage", "Stress Relief"]
    },
    {
        id: 14,
        name: "Lapis Lazuli",
        price: 259,
        image: "src/images/products/Lapis Lazuli.png",
        description: "Stone of wisdom and truth. Enhances intellectual ability and memory.",
        category: "Wisdom",
        benefits: ["Wisdom", "Truth", "Intellectual Growth"]
    },
    {
        id: 15,
        name: "Malachite",
        price: 319,
        image: "src/images/products/Malachite.png",
        description: "Stone of transformation and protection. Absorbs negative energies.",
        category: "Transformation",
        benefits: ["Transformation", "Protection", "Emotional Healing"]
    },
    {
        id: 16,
        name: "Pyrite",
        price: 199,
        image: "src/images/products/Pyrite.png",
        description: "Fool's gold that attracts abundance and shields from negative energy.",
        category: "Abundance",
        benefits: ["Abundance", "Protection", "Confidence"]
    },
    {
        id: 17,
        name: "Carnelian",
        price: 149,
        image: "src/images/products/Red Carnelian.png",
        description: "Stone of motivation and courage. Stimulates creativity and confidence.",
        category: "Motivation",
        benefits: ["Motivation", "Creativity", "Courage"]
    },
    {
        id: 18,
        name: "Aventurine",
        price: 139,
        image: "src/images/products/Green Aventurine.png",
        description: "Stone of opportunity and luck. Brings prosperity and emotional calm.",
        category: "Luck",
        benefits: ["Good Luck", "Prosperity", "Emotional Balance"]
    },
    {
        id: 19,
        name: "Turquoise",
        price: 279,
        image: "src/images/products/Turquoise Firoza.png",
        description: "Master healer and protection stone. Promotes communication and healing.",
        category: "Healing",
        benefits: ["Healing", "Communication", "Protection"]
    },
    {
        id: 20,
        name: "Obsidian",
        price: 169,
        image: "src/images/products/Black_Obsidian.png",
        description: "Powerful protection stone that shields against negativity.",
        category: "Protection",
        benefits: ["Protection", "Grounding", "Truth"]
    }
];

// Categories for filtering
const productCategories = [
    "All",
    "Healing Crystals",
    "Love & Relationships", 
    "Protection",
    "Abundance",
    "Intuition",
    "Grounding",
    "Communication",
    "Wisdom",
    "Transformation",
    "Energy",
    "Mental Clarity",
    "Courage",
    "Cleansing",
    "Motivation",
    "Luck",
    "Healing"
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { crystalProducts, productCategories };
}