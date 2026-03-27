import { faqData } from '../data/data';

const sizeGuide = "Men: S to XXL (30-38), Women: S to XL, Kids: 2Y to 10Y. Recommended: Ek size bada lijiye if you want a relaxed fit.";

export const callGeminiAPI = async (prompt, dynamicProducts = []) => {
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes("hi") || lowerPrompt.includes("hello") || lowerPrompt.includes("namaste") || lowerPrompt.includes("hey")) {
        return "Namaste! Main Elevate ka official assistant hoon. Main aapki products, pricing, ya returns mein kaise madad kar sakta hoon?";
    }

    const matchingProducts = dynamicProducts.filter(p => 
        lowerPrompt.includes(p.name.toLowerCase()) || 
        lowerPrompt.includes(p.category.toLowerCase())
    );

    if (matchingProducts.length > 0) {
        const productInfo = matchingProducts.slice(0, 3).map(p => 
            `${p.name} (Price: ₹${p.price.toLocaleString()}, Category: ${p.category.toUpperCase()})`
        ).join('\n');
        
        return `Zaroor! Hamare paas ye products hain:\n${productInfo}\n\nKya aap inme se kisi ke baare mein aur jaanna chahte hain?`;
    }

    if (lowerPrompt.includes("men") || lowerPrompt.includes("gents")) {
        const menCount = dynamicProducts.filter(p => p.category === 'men').length;
        return `Ji! Hamare paas Men's collection mein ${menCount} items hain. Inme Casual Shirts se Blazer tak sab available hain.`;
    }
    if (lowerPrompt.includes("women") || lowerPrompt.includes("ladies")) {
        const womenCount = dynamicProducts.filter(p => p.category === 'women').length;
        return `Ladies section mein hamare paas ${womenCount} premium choices hain, jaise Ethnic Saree aur Kurti sets.`;
    }
    if (lowerPrompt.includes("kids") || lowerPrompt.includes("bacche")) {
        return "Kids collection mein hum colorful sets, denim, aur winter jackets offer karte hain. Sizes 2 saal se upar available hain.";
    }

    if (lowerPrompt.includes("price") || lowerPrompt.includes("sasta") || lowerPrompt.includes("mrp") || lowerPrompt.includes("discount")) {
        return "Hamari pricing ₹799 (Kids) se ₹9,000 (Premium Sets) tak range karti hai. Hum best quality aur value for money optimize karte hain.";
    }

    const matchedFAQ = faqData.find(f => 
        lowerPrompt.includes(f.question.toLowerCase().split(' ').slice(0, 2).join(' ')) ||
        lowerPrompt.includes("return") && f.question.toLowerCase().includes("return") ||
        lowerPrompt.includes("shipping") && f.question.toLowerCase().includes("shipping") ||
        lowerPrompt.includes("track") && f.question.toLowerCase().includes("track")
    );

    if (matchedFAQ) {
        return matchedFAQ.answer;
    }

    if (lowerPrompt.includes("size") || lowerPrompt.includes("fit") || lowerPrompt.includes("chart")) {
        return `Hamara size guide ye raha: ${sizeGuide}. Aap product page par 'Size Chart' bhi dekh sakte hain.`;
    }

    if (lowerPrompt.includes("style") || lowerPrompt.includes("matching") || lowerPrompt.includes("fashion")) {
        return "Premium look ke liye: Casual shirts ko denim ke saath pairing karein. Ethnic sets ke saath light ethnic jewelry best lagegi!";
    }

    if (lowerPrompt.includes("admin") || lowerPrompt.includes("owner") || lowerPrompt.includes("call") || lowerPrompt.includes("contact")) {
        return "Aap hamare contact page par jaakar support team ko reach kar sakte hain. Admin se baat karne ke liye kripya email bejhein.";
    }

    return "Maaf kijiye, main aapki baat poori tarah samajh nahi paaya. Aap products, pricing, sizes, ya returns ke baare mein pooch sakte hain.";
};
