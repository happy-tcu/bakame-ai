
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, ExternalLink, FileText, Video, Headphones, Code } from "lucide-react";

const Resources = () => {
  const resourceCategories = [
    {
      title: "Documentation",
      icon: FileText,
      resources: [
        { name: "API Documentation", type: "PDF", size: "2.1 MB", description: "Complete API reference and integration guide" },
        { name: "Dataset Guidelines", type: "PDF", size: "1.8 MB", description: "Standards and best practices for data collection" },
        { name: "Research Methodology", type: "PDF", size: "3.2 MB", description: "Our approach to building Kinyarwanda AI models" }
      ]
    },
    {
      title: "Audio Samples",
      icon: Headphones,
      resources: [
        { name: "Sample Dataset", type: "ZIP", size: "45.2 MB", description: "Sample Kinyarwanda audio recordings" },
        { name: "Pronunciation Guide", type: "MP3", size: "12.1 MB", description: "Audio guide for proper Kinyarwanda pronunciation" },
        { name: "Regional Dialects", type: "ZIP", size: "89.5 MB", description: "Samples from different Kinyarwanda dialects" }
      ]
    },
    {
      title: "Video Tutorials",
      icon: Video,
      resources: [
        { name: "Getting Started", type: "MP4", size: "156 MB", description: "Introduction to our platform and tools" },
        { name: "Data Collection", type: "MP4", size: "234 MB", description: "How to contribute to our voice dataset" },
        { name: "API Integration", type: "MP4", size: "178 MB", description: "Step-by-step API integration tutorial" }
      ]
    },
    {
      title: "Code Examples",
      icon: Code,
      resources: [
        { name: "Python SDK", type: "ZIP", size: "5.8 MB", description: "Complete Python SDK with examples" },
        { name: "JavaScript Library", type: "ZIP", size: "3.2 MB", description: "JavaScript library for web integration" },
        { name: "React Components", type: "ZIP", size: "2.1 MB", description: "Pre-built React components for voice recording" }
      ]
    }
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case "PDF": return FileText;
      case "MP3": return Headphones;
      case "MP4": return Video;
      case "ZIP": return Download;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Resources
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              Tools, documentation, and assets to help you integrate and contribute to our Kinyarwanda AI ecosystem
            </p>
          </div>
        </div>

        {/* Resources */}
        <div className="container mx-auto px-6 pb-16">
          <div className="space-y-12">
            {resourceCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div key={categoryIndex}>
                  <div className="flex items-center mb-6">
                    <IconComponent className="h-6 w-6 mr-3 text-blue-400" />
                    <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {category.resources.map((resource, resourceIndex) => {
                      const ResourceIcon = getIconForType(resource.type);
                      return (
                        <Card key={resourceIndex} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <ResourceIcon className="h-5 w-5 text-blue-400" />
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">
                                  {resource.type}
                                </span>
                                <span className="text-xs text-white/50">{resource.size}</span>
                              </div>
                            </div>
                            <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors">
                              {resource.name}
                            </CardTitle>
                            <CardDescription className="text-white/70">
                              {resource.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                              <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-blue-400 transition-colors" />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Need More Resources?</CardTitle>
                <CardDescription className="text-white/70">
                  Can't find what you're looking for? Contact our team for additional resources and support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-white text-black hover:bg-white/90">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
