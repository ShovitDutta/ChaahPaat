import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    type Tea = {
        id: string;
        name: string;
        note: string;
        tag: string;
        emoji: string;
        description: string;
        origin: string;
        elevation: string;
        harvest: string;
        gradient: string;
        image: string;
    };
    const teas: Tea[] = [
        {
            id: "1",
            name: "Jasmine Green Harmony",
            note: "Floral, light-bodied — perfect for evening unwinding.",
            tag: "Green",
            emoji: "🌿",
            description:
                "A delicate blend of premium green tea leaves infused with fresh jasmine blossoms. This tea undergoes a traditional scenting process where tea leaves absorb the natural fragrance of jasmine flowers over several nights.",
            origin: "Assam, India",
            elevation: "500-800m",
            harvest: "Spring 2024",
            gradient: "from-green-200 to-emerald-300",
            image: "https://5.imimg.com/data5/SELLER/Default/2025/3/499661042/TD/PJ/WU/183314314/zyanna-jasmine-green-tea-3-500x500.png",
        },
        {
            id: "2",
            name: "Smoky Mountain Oolong",
            note: "Complex roasted aroma with a sweet lingering finish.",
            tag: "Oolong",
            emoji: "🏔️",
            description: "Partially oxidized and carefully roasted to develop its distinctive smoky character. Notes of dried fruit and honey emerge as the leaves unfold through multiple infusions.",
            origin: "Assam Hills, India",
            elevation: "1000-1200m",
            harvest: "Summer 2024",
            gradient: "from-stone-300 to-stone-400",
            image: "https://chadomoments.com/cdn/shop/collections/Oolong_Tea_Shutter_Temp.jpg?v=1678794458&width=750",
        },
        {
            id: "3",
            name: "Lemongrass Chamomile",
            note: "Calming herbal blend with bright citrus notes.",
            tag: "Herbal",
            emoji: "🌼",
            description: "A caffeine-free infusion combining organic chamomile flowers with fresh lemongrass. Perfect for evening relaxation with natural calming properties.",
            origin: "Multi-region blend",
            elevation: "Various",
            harvest: "Year-round",
            gradient: "from-yellow-200 to-lime-200",
            image: "https://onoteas.com/wp-content/uploads/2021/04/chamomile-tea-cups-plants-scaled.jpg",
        },
        {
            id: "4",
            name: "Lotus White Pearl",
            note: "Delicate, sweet, floral notes with a silky finish.",
            tag: "White",
            emoji: "🪷",
            description: "Rare silver needle white tea with minimal processing to preserve its natural sweetness. Hand-picked buds create a pale golden liquor with subtle complexity.",
            origin: "Assam, India",
            elevation: "800-1000m",
            harvest: "Early Spring 2024",
            gradient: "from-slate-200 to-gray-300",
            image: "https://ceylonorganicstore.com/cdn/shop/files/white-lotus-10.jpg?v=1758358062&width=720",
        },
        {
            id: "5",
            name: "Citrus Mint Breeze",
            note: "Refreshing herbal blend with mint and citrus.",
            tag: "Herbal",
            emoji: "🍃",
            description: "Invigorating blend of spearmint, peppermint, and citrus peels. Naturally caffeine-free with cooling properties perfect for hot summer days.",
            origin: "Multi-region blend",
            elevation: "Various",
            harvest: "Summer 2024",
            gradient: "from-teal-200 to-cyan-300",
            image: "https://cdn.shopify.com/s/files/1/0587/4381/6355/files/fertig_Refreshing_tea_spritz_with_ice_cubes_fresh_mint_leaves_1_1e5e0ec7-6d3b-497c-9d7a-be181592674d_1024x1024.webp?v=1708874686",
        },
        {
            id: "6",
            name: "Autumn Keemun",
            note: "Smooth black tea with subtle stone fruit and cocoa.",
            tag: "Black",
            emoji: "🍂",
            description: "Premium black tea with wine-like characteristics and natural sweetness. Known for its smooth texture without astringency, with hints of cocoa and fruit.",
            origin: "Assam, India",
            elevation: "600-900m",
            harvest: "Autumn 2024",
            gradient: "from-orange-200 to-amber-300",
            image: "https://img.freepik.com/free-photo/cup-knitted-scarf-with-autumn-leaves_23-2148206078.jpg?semt=ais_hybrid&w=740&q=80",
        },
        {
            id: "7",
            name: "Himalayan Breakfast",
            note: "Bold and malty with a hint of caramel.",
            tag: "Black",
            emoji: "⛰️",
            description: "Robust breakfast blend with full-bodied character. High-grown tea leaves provide natural sweetness and strength that pairs perfectly with milk.",
            origin: "Himalayan Foothills",
            elevation: "1500-2000m",
            harvest: "Summer 2024",
            gradient: "from-amber-200 to-orange-300",
            image: "https://www.jiomart.com/images/product/original/rv6xwac42t/himalayan-stocks-rose-black-tea-15-tea-bags-2-gm-each-sun-dried-caffeine-free-herbal-tea-product-images-orv6xwac42t-p605850588-1-202310271538.jpg?im=Resize=(1000,1000)",
        },
        {
            id: "8",
            name: "Tieguanyin",
            note: "Floral oolong with a honeyed aftertaste.",
            tag: "Oolong",
            emoji: "🌸",
            description: "Traditional iron goddess oolong with orchid-like aroma. Multiple roasting creates layers of flavor that evolve through successive infusions.",
            origin: "Assam, India",
            elevation: "800-1200m",
            harvest: "Spring 2024",
            gradient: "from-emerald-200 to-teal-300",
            image: "https://iteaworld.com/cdn/shop/articles/oolong-tea-loose-leaf-tea_874f2eb6-ecea-44c8-adc4-ffd05b86e013.jpg?v=1762172339",
        },
    ];
    return NextResponse.json(teas);
}
