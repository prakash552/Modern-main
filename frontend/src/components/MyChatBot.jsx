import React, { useMemo, useEffect, useState } from 'react';
import ChatBot from 'react-chatbotify';
import { callGeminiAPI } from '../utils/gemini';
import { useProducts } from '../context/ProductContext';
import './MyChatBot.css';

const MyChatBot = () => {
    const { products } = useProducts();
    const [isReady, setIsReady] = useState(false);

    // Logic to clear old chats and keep only the most recent one
    useEffect(() => {
        const history = localStorage.getItem("chat_history");
        if (history) {
            try {
                const parsedHistory = JSON.parse(history);
                if (Array.isArray(parsedHistory) && parsedHistory.length > 2) {
                    // Keep only the last 2 messages (usually last user question and AI answer)
                    const recentChat = parsedHistory.slice(-2);
                    localStorage.setItem("chat_history", JSON.stringify(recentChat));
                }
            } catch (e) {
                console.error("Cleanup error:", e);
            }
        }
        setIsReady(true);
    }, []);

    const flow = useMemo(() => ({
        start: {
            message: (params) => {
                if (params.chatHistory && params.chatHistory.length > 0) {
                    return null;
                }
                return "Namaste! Main Elevate AI assistant hoon. Main aapki kaise madad kar sakta hoon?";
            },
            form: {
                title: "Choose an option",
                inputs: [
                    {
                        id: "choice",
                        type: "select",
                        options: [
                            { value: "Men Collection", label: "Men Collection" },
                            { value: "Women Collection", label: "Women Collection" },
                            { value: "Latest Arrival", label: "Latest Arrival" },
                            { value: "Latest FAQ", label: "Latest FAQ" },
                            { value: "Style Tips", label: "Style Tips" }
                        ]
                    }
                ]
            },
            path: (params) => {
                if (params.userInput) {
                    return "loop";
                }
                return "start";
            }
        },
        loop: {
            message: async (params) => {
                const userMessage = params.userInput.choice || params.userInput;

                try {
                    const response = await callGeminiAPI(userMessage, products);
                    return response;
                } catch (error) {
                    console.error("ChatBot Error:", error);
                    return "Maaf kijiye, abhi service available nahi hai.";
                }
            },
            path: "loop"
        }
    }), [products]);

    const settings = useMemo(() => ({
        general: {
            embedded: false,
            primaryColor: "#a09f5aff",
            secondaryColor: "#5f5f5cff"
        },
        header: {
            title: "Elevate Helper",
            showAvatar: true
        },
        chatHistory: {
            storageKey: "chat_history",
            enabled: true
        }
    }), []);

    if (!isReady) return null;

    return (
        <ChatBot flow={flow} settings={settings} />
    );
};

export default MyChatBot;
