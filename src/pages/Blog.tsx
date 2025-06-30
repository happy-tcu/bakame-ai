
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building the Future of Kinyarwanda AI",
      excerpt: "Our journey to create the first comprehensive Kinyarwanda dataset for AI applications and language preservation.",
      author: "Research Team",
      date: "December 2024",
      readTime: "5 min read",
      category: "Research"
    },
    {
      id: 2,
      title: "100,000 Hours Milestone Approach",
      excerpt: "How we're collecting and processing voice data to reach our ambitious goal of 100,000 recorded hours.",
      author: "Data Team",
      date: "November 2024",
      readTime: "3 min read",
      category: "Progress"
    },
    {
      id: 3,
      title: "Language Preservation Through Technology",
      excerpt: "The importance of preserving indigenous languages in the digital age and AI's role in this mission.",
      author: "Cultural Team",
      date: "October 2024",
      readTime: "7 min read",
      category: "Culture"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              Blog
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              Insights, updates, and stories from our journey to revolutionize Kinyarwanda AI
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer">
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
