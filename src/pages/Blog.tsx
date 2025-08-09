
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, ArrowRight, Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";

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

  const instagramPosts = [
    {
      id: 1,
      image: "/lovable-uploads/07b35d7d-a106-42c9-b489-2d86597f0ac7.png",
      caption: "🚀 Exciting news! Bakame AI has been featured in Dallas Innovates! Our journey in revolutionizing AI education continues to make waves. #BakameAI #Innovation #EdTech",
      likes: 124,
      date: "2 days ago"
    },
    {
      id: 2,
      image: "/lovable-uploads/1f2b26b5-04d9-4467-8c6a-01448669e2c3.png",
      caption: "🏆 Proud to announce our win at TCU Neeley's CREATE Competition 2025! This recognition fuels our mission to make AI education accessible worldwide. #TCU #CREATE2025 #Winner",
      likes: 89,
      date: "1 week ago"
    },
    {
      id: 3,
      image: "/lovable-uploads/5a0d8cef-f727-4d56-8b84-f064ace377c7.png",
      caption: "💡 Behind the scenes at Bakame AI! Our team working hard on the next generation of voice AI technology for education. #TeamWork #AI #Development",
      likes: 156,
      date: "2 weeks ago"
    },
    {
      id: 4,
      image: "/lovable-uploads/88b689c6-a4ac-4cd6-9dd7-2eca68783445.png",
      caption: "🌍 Bridging cultures through AI! Our Kinyarwanda integration helps students learn English while staying connected to their roots. #CulturalBridge #Language #AI",
      likes: 203,
      date: "3 weeks ago"
    },
    {
      id: 5,
      image: "/lovable-uploads/9fedb475-4a0b-4ff1-ac9e-d868f9fdd6f9.png",
      caption: "📚 Education meets innovation! Discover how our AI tutors are transforming the learning experience for students worldwide. #Education #Innovation #FutureOfLearning",
      likes: 178,
      date: "1 month ago"
    },
    {
      id: 6,
      image: "/lovable-uploads/a40d3f7c-3281-41fc-8a55-76ebc92497e5.png",
      caption: "🎯 Focus on what matters! Our AI-powered learning platform adapts to each student's unique needs and learning style. #PersonalizedLearning #EdTech #AI",
      likes: 145,
      date: "1 month ago"
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

          {/* Instagram Section */}
          <div className="mt-20 border-t border-border pt-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Follow Us on Instagram
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay connected with our latest updates, behind-the-scenes content, and AI innovations
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Instagram className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">@bakame.ai</h3>
                
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join our community and get exclusive insights into our AI development process, 
                  team updates, and the future of educational technology.
                </p>
              </div>

              {/* Instagram Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {instagramPosts.map((post) => (
                  <Card key={post.id} className="bg-card/80 border-border backdrop-blur-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={`Instagram post ${post.id}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Instagram className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">bakame.ai</p>
                            <p className="text-xs text-muted-foreground">{post.date}</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground mb-3 line-clamp-3">
                        {post.caption}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{post.likes}</span>
                          </div>
                          <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <a 
                  href="https://instagram.com/bakame.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0">
                    <Instagram className="mr-2 h-5 w-5" />
                    Follow on Instagram
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
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
