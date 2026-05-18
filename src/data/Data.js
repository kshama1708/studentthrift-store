export const PRODUCTS = [
  { id: 1, title: "Engineering Mathematics Vol.1", category: "Books", emoji: "📚", price: 120, original: 350, condition: "Used", rating: 4, seller: "Arjun K.", views: 45 },
  { id: 2, title: "Casio FX-991EX Calculator", category: "Calculators", emoji: "🔢", price: 450, original: 800, condition: "Used", rating: 5, seller: "Priya M.", views: 78 },
  { id: 3, title: "JBL Earphones (barely used)", category: "Electronics", emoji: "🎧", price: 350, original: 900, condition: "Used", rating: 4, seller: "Rohit S.", views: 33 },
  { id: 4, title: "Data Structures Handwritten Notes", category: "Notes", emoji: "📝", price: 80, original: 200, condition: "New", rating: 5, seller: "Sneha P.", views: 91 },
  { id: 5, title: "Physics Textbook (NCERT)", category: "Books", emoji: "🔬", price: 95, original: 280, condition: "Used", rating: 3, seller: "Vikram R.", views: 22 },
  { id: 6, title: "Wooden Study Chair", category: "Furniture", emoji: "🪑", price: 800, original: 2500, condition: "Used", rating: 4, seller: "Meena T.", views: 57 },
  { id: 7, title: "Scientific Calculator TI-84", category: "Calculators", emoji: "🧮", price: 900, original: 2200, condition: "New", rating: 5, seller: "Aditya N.", views: 112 },
  { id: 8, title: "Laptop Stand (Adjustable)", category: "Electronics", emoji: "💻", price: 250, original: 600, condition: "New", rating: 4, seller: "Kavya L.", views: 44 },
  { id: 9, title: "Organic Chemistry by Morrison", category: "Books", emoji: "⚗️", price: 180, original: 550, condition: "Used", rating: 4, seller: "Dev B.", views: 38 },
  { id: 10, title: "A3 Drawing Board", category: "Furniture", emoji: "🎨", price: 320, original: 700, condition: "Used", rating: 3, seller: "Riya C.", views: 29 },
  { id: 11, title: "Algorithms Printed Notes Set", category: "Notes", emoji: "📄", price: 60, original: 150, condition: "New", rating: 5, seller: "Sam J.", views: 67 },
  { id: 12, title: "USB-C Hub (7-in-1)", category: "Electronics", emoji: "🔌", price: 400, original: 1200, condition: "New", rating: 5, seller: "Nisha K.", views: 83 },
];

export const CATEGORIES = [
  { name: "All", emoji: "🏪" },
  { name: "Books", emoji: "📚" },
  { name: "Electronics", emoji: "💡" },
  { name: "Notes", emoji: "📝" },
  { name: "Furniture", emoji: "🪑" },
  { name: "Calculators", emoji: "🧮" },
];

export const USERS = [
  { id: 1, name: "Arjun Kumar", email: "arjun@college.edu", joined: "Jan 2024", listings: 5, status: "active" },
  { id: 2, name: "Priya Mehta", email: "priya@college.edu", joined: "Feb 2024", listings: 8, status: "active" },
  { id: 3, name: "Rohit Singh", email: "rohit@college.edu", joined: "Mar 2024", listings: 2, status: "blocked" },
  { id: 4, name: "Sneha Patel", email: "sneha@college.edu", joined: "Dec 2023", listings: 12, status: "active" },
];

export const RECENT_ACTIVITY = [
  { id: 1, item: "Casio FX-991EX", action: "Sold", date: "Today", amount: 450 },
  { id: 2, item: "Handwritten Notes", action: "Listed", date: "Yesterday", amount: 80 },
  { id: 3, item: "JBL Earphones", action: "Viewed", date: "2 days ago", amount: 350 },
];

export const CHAT_MESSAGES = [
  { id: 1, text: "Hi! Is the calculator still available?", sent: false, time: "10:22 AM" },
  { id: 2, text: "Yes, it is! In great condition.", sent: true, time: "10:24 AM" },
  { id: 3, text: "Can you come down to ₹400?", sent: false, time: "10:25 AM" },
  { id: 4, text: "Sure, ₹420 is the best I can do. The batteries are new.", sent: true, time: "10:27 AM" },
  { id: 5, text: "Deal! Where can we meet?", sent: false, time: "10:29 AM" },
];

export const CHAT_CONTACTS = [
  { name: "Priya M.", item: "Casio Calculator", last: "Sure, ₹420 is the best...", unread: 1 },
  { name: "Arjun K.", item: "Engineering Maths", last: "I'll pick it up tom...", unread: 0 },
  { name: "Dev B.", item: "Organic Chemistry", last: "Is it available?", unread: 2 },
];
