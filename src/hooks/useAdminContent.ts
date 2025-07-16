
import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export const useAdminContent = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Voice-first and mobile-accessible",
      description: "Learn through natural conversation"
    },
    {
      id: "2", 
      title: "Offline by design — no internet required",
      description: "Works anywhere, anytime"
    },
    {
      id: "3",
      title: "Built in collaboration with educators", 
      description: "Pedagogy-driven approach"
    },
    {
      id: "4",
      title: "Future-ready: supports local languages and custom content",
      description: "Adaptable to any context"
    }
  ]);

  useEffect(() => {
    const savedContent = localStorage.getItem('bakame-content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContentItems(parsed);
      } catch (error) {
        console.error('Failed to parse saved content:', error);
      }
    }
  }, []);

  return contentItems;
};
