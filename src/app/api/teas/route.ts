import { NextRequest, NextResponse } from 'next/server';

// Define the tea type
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
};

// Mock tea data
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
  },
];

export async function GET(request: NextRequest) {
  // Simulate a small delay to mimic network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(teas);
}