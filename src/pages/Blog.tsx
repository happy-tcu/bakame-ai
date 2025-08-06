
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const mediaHits = [
    {
      id: 1,
      title: "Bakame AI Featured in Dallas Innovates",
      excerpt: "Our innovative AI solutions and startup journey highlighted in Dallas's leading innovation publication.",
      source: "Dallas Innovates",
      date: "2025",
      category: "Media Coverage",
      url: "https://dallasinnovates.com/tag/bakame-ai/"
    },
    {
      id: 2,
      title: "Higher Ed Leadership Recognition",
      excerpt: "Bakame AI's impact on educational technology featured in Fort Worth Report's higher education coverage.",
      source: "Fort Worth Report",
      date: "May 2025",
      category: "Education Coverage",
      url: "https://fortworthreport.org/2025/05/26/higher-ed-footnotes-new-leadership-takes-helm-on-tcc-board/"
    },
    {
      id: 3,
      title: "CREATE Competition Winner 2025",
      excerpt: "Bakame AI recognized as winner in TCU Neeley's CREATE innovation competition for groundbreaking AI solutions.",
      source: "TCU Neeley School of Business",
      date: "2025",
      category: "Innovation Award",
      url: "https://www.neeley.tcu.edu/News/Events/CREATE-Winners-2025"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
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
            <path d="M0,25 Q25,20 50,25 T100,25" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="0.2" filter="url(#glow)"/>
            <path d="M0,50 Q25,45 50,50 T100,50" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="0.2"/>
            <path d="M0,75 Q25,70 50,75 T100,75" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="0.2" filter="url(#glow)"/>
          </g>
        </svg>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-8">
          <a href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>

          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Media coverage and recognition highlighting Bakame AI's innovation in AI solutions
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mediaHits.map((hit) => (
              <a key={hit.id} href={hit.url} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="bg-card/50 border-border backdrop-blur-sm hover:bg-card transition-all duration-300 group cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-blue-400 font-medium">{hit.category}</span>
                      <span className="text-xs text-muted-foreground">External Link</span>
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-blue-300 transition-colors">
                      {hit.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {hit.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {hit.source}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {hit.date}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* More Coverage */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground text-sm">
              More media coverage coming soon as Bakame AI continues to innovate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
