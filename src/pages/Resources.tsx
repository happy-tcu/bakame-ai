
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, ExternalLink, FileText, Video, Headphones, Code } from "lucide-react";

const Resources = () => {
  const resourceCategories = [
    {
      title: "IVR Documentation",
      icon: FileText,
      resources: [
        { name: "IVR API Documentation", type: "PDF", size: "3.2 MB", description: "Complete API reference for IVR system integration" },
        { name: "Deployment Guide", type: "PDF", size: "2.8 MB", description: "Step-by-step guide for offline IVR deployment" },
        { name: "Configuration Manual", type: "PDF", size: "4.1 MB", description: "Advanced configuration options and best practices" }
      ]
    },
    {
      title: "Audio & Voice Samples",
      icon: Headphones,
      resources: [
        { name: "IVR Voice Samples", type: "ZIP", size: "67.2 MB", description: "Sample voice prompts and responses" },
        { name: "Kinyarwanda Dataset Sample", type: "ZIP", size: "45.2 MB", description: "Sample from our research dataset" },
        { name: "Multi-language Pack", type: "ZIP", size: "156.8 MB", description: "Voice samples in multiple languages" }
      ]
    },
    {
      title: "Video Tutorials",
      icon: Video,
      resources: [
        { name: "IVR System Setup", type: "MP4", size: "234 MB", description: "Complete setup tutorial for IVR systems" },
        { name: "Enterprise Integration", type: "MP4", size: "189 MB", description: "How to integrate IVR with enterprise systems" },
        { name: "Government Deployment", type: "MP4", size: "156 MB", description: "Best practices for government IVR deployment" }
      ]
    },
    {
      title: "Development Tools",
      icon: Code,
      resources: [
        { name: "Python SDK", type: "ZIP", size: "8.9 MB", description: "Complete Python SDK with IVR integration tools" },
        { name: "JavaScript Library", type: "ZIP", size: "5.2 MB", description: "JavaScript library for web-based IVR interfaces" },
        { name: "Mobile SDK", type: "ZIP", size: "12.1 MB", description: "Mobile development tools for IVR applications" }
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
      {/* Enhanced space-time background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(0,0)">
            <path d="M0,25 Q25,20 50,25 T100,25" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="0.2" filter="url(#glow)"/>
            <path d="M0,50 Q25,45 50,50 T100,50" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.2"/>
            <path d="M0,75 Q25,70 50,75 T100,75" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="0.2" filter="url(#glow)"/>
          </g>
        </svg>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-8">
          <a href="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>

          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Resources
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              Tools, documentation, and assets to help you deploy and integrate our offline IVR solutions
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
                <CardTitle className="text-2xl text-white">Need Custom Solutions?</CardTitle>
                <CardDescription className="text-white/70">
                  Looking for custom IVR deployment or integration support? Our team is here to help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                    Contact Support
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Schedule Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
