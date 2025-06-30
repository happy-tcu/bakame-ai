
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Revolutionizing IVR: The Offline Advantage",
      excerpt: "How our offline-first approach to Interactive Voice Response systems is transforming communication in remote areas.",
      author: "Engineering Team",
      date: "December 2024",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      id: 2,
      title: "Deploying IVR Systems in Education",
      excerpt: "Case studies of how educational institutions are leveraging our offline IVR solutions for better student engagement.",
      author: "Education Team",
      date: "November 2024",
      readTime: "6 min read",
      category: "Education"
    },
    {
      id: 3,
      title: "Enterprise Communication Without Boundaries",
      excerpt: "How businesses are using our IVR systems to maintain customer service excellence regardless of connectivity.",
      author: "Business Team",
      date: "November 2024",
      readTime: "4 min read",
      category: "Enterprise"
    },
    {
      id: 4,
      title: "Government Services Made Accessible",
      excerpt: "The role of offline IVR in making government services accessible to all citizens, regardless of location.",
      author: "Government Relations",
      date: "October 2024",
      readTime: "5 min read",
      category: "Government"
    },
    {
      id: 5,
      title: "Building the Kinyarwanda AI Dataset",
      excerpt: "Our research initiative to create the first comprehensive Kinyarwanda dataset for AI applications.",
      author: "Research Team",
      date: "October 2024",
      readTime: "7 min read",
      category: "Research"
    },
    {
      id: 6,
      title: "The Future of Voice Technology",
      excerpt: "Exploring how AI-powered voice systems will shape the future of human-computer interaction.",
      author: "AI Team",
      date: "September 2024",
      readTime: "6 min read",
      category: "Innovation"
    }
  ];

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
          <a href="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>

          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              Insights, updates, and stories from our journey to revolutionize offline communication
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <a key={post.id} href={`/blog/${post.id}`} className="block">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-blue-400 font-medium">{post.category}</span>
                      <span className="text-xs text-white/50">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
