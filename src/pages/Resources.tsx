import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, RotateCcw } from "lucide-react";
import { useResources } from "@/hooks/useResources";
import { AnimatedResourceCard } from "@/components/resources/AnimatedResourceCard";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { ResourceStats } from "@/components/resources/ResourceStats";
import { ResourcePagination } from "@/components/resources/ResourcePagination";
import { usePagination } from "@/hooks/usePagination";

const Resources = () => {
  const { resources, loading, error, downloadResource, refetch } = useResources();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular" | "featured">("featured");

  // Get unique values for filters
  const { availableCategories, availableTypes, availableTags } = useMemo(() => {
    const categories = [...new Set(resources.map(r => r.category).filter(Boolean))];
    const types = [...new Set(resources.map(r => r.type).filter(Boolean))];
    const tags = [...new Set(resources.flatMap(r => r.tags || []))];
    
    return {
      availableCategories: categories,
      availableTypes: types,
      availableTags: tags
    };
  }, [resources]);

  // Filter and sort resources
  const filteredAndSortedResources = useMemo(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = !searchTerm || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => resource.tags?.includes(tag));

      return matchesSearch && matchesCategory && matchesType && matchesTags;
    });

    // Sort resources
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "popular":
        filtered.sort((a, b) => (b.download_count || 0) - (a.download_count || 0));
        break;
      case "featured":
        filtered.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return (b.download_count || 0) - (a.download_count || 0);
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [resources, searchTerm, selectedCategory, selectedType, selectedTags, sortBy]);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedResources,
    goToPage,
    hasNext,
    hasPrevious,
    reset: resetPagination
  } = usePagination({
    items: filteredAndSortedResources,
    itemsPerPage: 9
  });

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchTerm, selectedCategory, selectedType, selectedTags, sortBy, resetPagination]);

  // Group paginated resources by category
  const groupedResources = useMemo(() => {
    const groups: Record<string, typeof paginatedResources> = {};
    paginatedResources.forEach(resource => {
      const category = resource.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(resource);
    });
    return groups;
  }, [paginatedResources]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedTags([]);
    setSortBy("featured");
  };

  const handleRefresh = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading resources...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Resources</h2>
          <p className="text-white/70 mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Resources
              </h1>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="border-white/30 text-white bg-white/5 hover:bg-white/10 hover:border-blue-400/50 backdrop-blur-sm transition-all duration-300"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <p className="text-xl text-white/70 max-w-2xl">
              Tools, documentation, and assets to help you deploy and integrate our offline IVR solutions
            </p>
          </div>

          {/* Stats */}
          <ResourceStats resources={resources} filteredResources={filteredAndSortedResources} />

          {/* Filters */}
          <ResourceFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            availableCategories={availableCategories}
            availableTypes={availableTypes}
            availableTags={availableTags}
            onClearFilters={handleClearFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Resources */}
        <div className="container mx-auto px-6 pb-16">
          {Object.keys(groupedResources).length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-white/70 mb-2">No resources found</h3>
              <p className="text-white/50 mb-4">Try adjusting your search or filters</p>
              <Button onClick={handleClearFilters} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedResources).map(([category, categoryResources]) => (
                <div key={category}>
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                    {category}
                    <span className="ml-2 text-sm text-white/50 bg-white/10 px-2 py-1 rounded">
                      {categoryResources.length}
                    </span>
                  </h2>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categoryResources.map((resource, index) => (
                      <AnimatedResourceCard
                        key={resource.id}
                        resource={resource}
                        onDownload={downloadResource}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <ResourcePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
            />
          )}

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Need Custom Solutions?</CardTitle>
                <CardDescription className="text-white/70">
                  Looking for custom IVR deployment or integration support? Our team is here to help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                      Contact Support
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 transition-all duration-300">
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
