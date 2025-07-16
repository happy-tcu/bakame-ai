
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface SiteColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
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

  const [siteColors, setSiteColors] = useState<SiteColors>({
    primary: '#222247',
    secondary: '#f1f5f9',
    accent: '#f1f5f9',
    background: '#000000',
    foreground: '#0f172a'
  });

  const addContentItem = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: "New Feature",
      description: "Description here"
    };
    setContentItems([...contentItems, newItem]);
  };

  const updateContentItem = (id: string, field: keyof ContentItem, value: string) => {
    setContentItems(items => 
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const deleteContentItem = (id: string) => {
    setContentItems(items => items.filter(item => item.id !== id));
  };

  const updateColor = (colorKey: keyof SiteColors, value: string) => {
    setSiteColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const saveChanges = () => {
    // In a real app, this would save to your backend
    localStorage.setItem('bakame-content', JSON.stringify(contentItems));
    localStorage.setItem('bakame-colors', JSON.stringify(siteColors));
    
    toast({
      title: "Changes Saved",
      description: "Your content and color changes have been saved.",
    });
  };

  const applyColors = () => {
    const root = document.documentElement;
    
    // Convert hex to HSL and apply to CSS variables
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    root.style.setProperty('--primary', hexToHsl(siteColors.primary));
    root.style.setProperty('--secondary', hexToHsl(siteColors.secondary));
    root.style.setProperty('--accent', hexToHsl(siteColors.accent));
    root.style.setProperty('--background', hexToHsl(siteColors.background));
    root.style.setProperty('--foreground', hexToHsl(siteColors.foreground));
  };

  useEffect(() => {
    // Load saved data
    const savedContent = localStorage.getItem('bakame-content');
    const savedColors = localStorage.getItem('bakame-colors');
    
    if (savedContent) {
      setContentItems(JSON.parse(savedContent));
    }
    
    if (savedColors) {
      setSiteColors(JSON.parse(savedColors));
    }
  }, []);

  useEffect(() => {
    applyColors();
  }, [siteColors]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Settings</h1>
          <p className="text-white/70">Manage your site content and appearance</p>
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="colors">Color Scheme</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Carousel Content</h2>
              <Button onClick={addContentItem} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </div>

            <div className="grid gap-4">
              {contentItems.map((item) => (
                <Card key={item.id} className="bg-white/5 border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">Item {item.id}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteContentItem(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor={`title-${item.id}`}>Title</Label>
                      <Input
                        id={`title-${item.id}`}
                        value={item.title}
                        onChange={(e) => updateContentItem(item.id, 'title', e.target.value)}
                        className="bg-white/10 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`description-${item.id}`}>Description</Label>
                      <Textarea
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateContentItem(item.id, 'description', e.target.value)}
                        className="bg-white/10 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`image-${item.id}`}>Image URL</Label>
                      <Input
                        id={`image-${item.id}`}
                        value={item.image || ''}
                        onChange={(e) => updateContentItem(item.id, 'image', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="bg-white/10 border-white/20"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            <h2 className="text-2xl font-semibold">Color Scheme</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(siteColors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={key}
                      type="color"
                      value={value}
                      onChange={(e) => updateColor(key as keyof SiteColors, e.target.value)}
                      className="w-16 h-10 rounded cursor-pointer border-white/20"
                    />
                    <Input
                      value={value}
                      onChange={(e) => updateColor(key as keyof SiteColors, e.target.value)}
                      className="bg-white/10 border-white/20"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Color Preview</h3>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(siteColors).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div 
                      className="w-full h-12 rounded mb-1" 
                      style={{ backgroundColor: value }}
                    />
                    <p className="text-xs text-white/70 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={saveChanges} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
