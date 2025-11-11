import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, startOfDay, eachDayOfInterval, subDays } from "date-fns";
import { Download, Calendar as CalendarIcon, Search, FileJson, FileText, Phone, Clock, DollarSign, Users, TrendingUp, MessageSquare, Target, GraduationCap, BookOpen, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import type { Conversation } from "../../shared/schema";

const COLORS = ['#4c9dff', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#fbbf24'];

interface AIAnalysis {
  englishLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  topicComplexity?: 'beginner' | 'intermediate' | 'advanced';
  conversationQuality?: number;
  grammarAccuracy?: number;
  vocabularyRichness?: number;
  fluency?: number;
  comprehension?: number;
  topics?: string[];
  learningOutcomes?: string[];
  areasForImprovement?: string[];
  strengths?: string[];
  summary?: string;
}

interface ConversationWithAI extends Omit<Conversation, 'analysis'> {
  analysis?: {
    ai?: AIAnalysis;
    [key: string]: any;
  };
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithAI | null>(null);

  // Fetch conversation stats
  const { data: stats } = useQuery<{
    totalCalls: number;
    totalDuration: number;
    totalCost: number;
    uniqueUsers: number;
  }>({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/stats", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  // Fetch all conversations with filters
  const { data: conversationsData, isLoading } = useQuery<{ conversations: ConversationWithAI[] }>({
    queryKey: [
      "/api/admin/conversations",
      dateRange.from?.toISOString(),
      dateRange.to?.toISOString(),
      searchTerm,
      minCost,
      maxCost,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (dateRange.from) params.append("startDate", dateRange.from.toISOString());
      if (dateRange.to) params.append("endDate", dateRange.to.toISOString());
      if (minCost) params.append("minCost", minCost);
      if (maxCost) params.append("maxCost", maxCost);
      
      const response = await fetch(`/api/admin/conversations?${params}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch conversations");
      return response.json();
    },
  });

  const conversations = conversationsData?.conversations || [];

  // Filter conversations by search term
  const filteredConversations = conversations.filter((conv) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      conv.conversation_id.toLowerCase().includes(search) ||
      conv.user_id?.toLowerCase().includes(search) ||
      conv.agent_id.toLowerCase().includes(search)
    );
  });

  // Calculate analytics from conversations
  const analytics = useMemo(() => {
    // Calls over time (last 7 days)
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });

    const callsByDay = last7Days.map(day => {
      const dayStr = format(day, 'MMM dd');
      const count = conversations.filter(conv => 
        conv.start_time && startOfDay(parseISO(conv.start_time.toString())).getTime() === startOfDay(day).getTime()
      ).length;
      return { date: dayStr, calls: count };
    });

    // Duration distribution
    const durationRanges = [
      { range: '0-30s', min: 0, max: 30 },
      { range: '30s-1m', min: 30, max: 60 },
      { range: '1-2m', min: 60, max: 120 },
      { range: '2-5m', min: 120, max: 300 },
      { range: '5m+', min: 300, max: Infinity }
    ];

    const durationData = durationRanges.map(({ range, min, max }) => ({
      range,
      count: conversations.filter(conv => 
        conv.call_duration_seconds && 
        conv.call_duration_seconds >= min && 
        conv.call_duration_seconds < max
      ).length
    }));

    // Average metrics
    const avgDuration = conversations.length > 0
      ? conversations.reduce((sum, conv) => sum + (conv.call_duration_seconds || 0), 0) / conversations.length
      : 0;

    const avgCost = conversations.length > 0
      ? conversations.reduce((sum, conv) => sum + parseFloat(conv.cost || '0'), 0) / conversations.length
      : 0;

    // Engagement metrics
    const transcriptLengths = conversations.map(conv => 
      Array.isArray(conv.transcript) ? conv.transcript.length : 0
    );
    const avgTurns = transcriptLengths.length > 0
      ? transcriptLengths.reduce((sum, len) => sum + len, 0) / transcriptLengths.length
      : 0;

    // AI Analysis metrics
    const conversationsWithAI = conversations.filter(conv => conv.analysis?.ai);
    
    // English Level Distribution
    const levelCounts: Record<string, number> = {};
    conversationsWithAI.forEach(conv => {
      const level = conv.analysis?.ai?.englishLevel || 'Unknown';
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });
    const englishLevelData = Object.entries(levelCounts).map(([level, count]) => ({
      level,
      count
    }));

    // Topic Complexity Distribution
    const complexityCounts: Record<string, number> = {};
    conversationsWithAI.forEach(conv => {
      const complexity = conv.analysis?.ai?.topicComplexity || 'Unknown';
      complexityCounts[complexity] = (complexityCounts[complexity] || 0) + 1;
    });
    const topicComplexityData = Object.entries(complexityCounts).map(([complexity, count]) => ({
      complexity,
      count
    }));

    // Average Quality Metrics
    const avgGrammar = conversationsWithAI.length > 0
      ? conversationsWithAI.reduce((sum, conv) => sum + (conv.analysis?.ai?.grammarAccuracy || 0), 0) / conversationsWithAI.length
      : 0;

    const avgVocabulary = conversationsWithAI.length > 0
      ? conversationsWithAI.reduce((sum, conv) => sum + (conv.analysis?.ai?.vocabularyRichness || 0), 0) / conversationsWithAI.length
      : 0;

    const avgFluency = conversationsWithAI.length > 0
      ? conversationsWithAI.reduce((sum, conv) => sum + (conv.analysis?.ai?.fluency || 0), 0) / conversationsWithAI.length
      : 0;

    const avgComprehension = conversationsWithAI.length > 0
      ? conversationsWithAI.reduce((sum, conv) => sum + (conv.analysis?.ai?.comprehension || 0), 0) / conversationsWithAI.length
      : 0;

    const avgQuality = conversationsWithAI.length > 0
      ? conversationsWithAI.reduce((sum, conv) => sum + (conv.analysis?.ai?.conversationQuality || 0), 0) / conversationsWithAI.length
      : 0;

    // Radar chart data for quality metrics
    const qualityMetricsData = [
      { metric: 'Grammar', value: avgGrammar },
      { metric: 'Vocabulary', value: avgVocabulary },
      { metric: 'Fluency', value: avgFluency },
      { metric: 'Comprehension', value: avgComprehension },
      { metric: 'Overall', value: avgQuality }
    ];

    // Most common topics
    const topicsMap: Record<string, number> = {};
    conversationsWithAI.forEach(conv => {
      const topics = conv.analysis?.ai?.topics || [];
      topics.forEach((topic: string) => {
        topicsMap[topic] = (topicsMap[topic] || 0) + 1;
      });
    });
    const topTopics = Object.entries(topicsMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([topic, count]) => ({ topic, count }));

    return {
      callsByDay,
      durationData,
      avgDuration,
      avgCost,
      avgTurns,
      englishLevelData,
      topicComplexityData,
      avgGrammar,
      avgVocabulary,
      avgFluency,
      avgComprehension,
      avgQuality,
      qualityMetricsData,
      topTopics,
      aiAnalyzedCount: conversationsWithAI.length
    };
  }, [conversations]);

  // Download as CSV
  const downloadCSV = () => {
    const headers = [
      "Conversation ID", "User ID", "Agent ID", "Duration (s)", "Cost", "Start Time", "Status",
      "English Level", "Topic Complexity", "Grammar", "Vocabulary", "Fluency", "Comprehension", "Quality"
    ];
    const rows = filteredConversations.map((conv) => [
      conv.conversation_id,
      conv.user_id || "N/A",
      conv.agent_id,
      conv.call_duration_seconds || 0,
      conv.cost || 0,
      conv.start_time ? new Date(conv.start_time).toISOString() : "N/A",
      conv.status || "N/A",
      conv.analysis?.ai?.englishLevel || "N/A",
      conv.analysis?.ai?.topicComplexity || "N/A",
      conv.analysis?.ai?.grammarAccuracy || "N/A",
      conv.analysis?.ai?.vocabularyRichness || "N/A",
      conv.analysis?.ai?.fluency || "N/A",
      conv.analysis?.ai?.comprehension || "N/A",
      conv.analysis?.ai?.conversationQuality || "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversations_analytics_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download as JSON
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(filteredConversations, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversations_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Format duration to minutes and seconds
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="heading-admin-dashboard">Admin Dashboard</h1>
          <p className="text-gray-400" data-testid="text-dashboard-description">
            Comprehensive analytics and insights from your AI conversations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <Phone className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-calls">
                {stats?.totalCalls || 0}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {analytics.aiAnalyzedCount} AI-analyzed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Speaking Time</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-duration">
                {formatDuration(stats?.totalDuration || 0)}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Avg: {formatDuration(analytics.avgDuration)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-cost">
                ${(stats?.totalCost || 0).toFixed(4)}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Avg: ${analytics.avgCost.toFixed(4)}/call
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-unique-users">
                {stats?.uniqueUsers || 0}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Unique participants
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Learning Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Grammar Score</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.avgGrammar.toFixed(1)}/10
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Accuracy across all conversations
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Vocabulary</CardTitle>
              <Award className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.avgVocabulary.toFixed(1)}/10
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Richness and variety
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Conversation Quality</CardTitle>
              <Target className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.avgQuality.toFixed(1)}/10
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Overall engagement score
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Calls Over Time */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Conversation Trends (Last 7 Days)</CardTitle>
              <CardDescription>Daily conversation volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.callsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="calls" stroke="#4c9dff" strokeWidth={2} name="Calls" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Duration Distribution */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Call Duration Distribution</CardTitle>
              <CardDescription>How long conversations typically last</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.durationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="range" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#4c9dff" name="Conversations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section 2 - AI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* English Level Distribution */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>English Proficiency Levels (CEFR)</CardTitle>
              <CardDescription>Student language proficiency distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.englishLevelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ level, count }) => `${level}: ${count}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics.englishLevelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Topic Complexity */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Topic Complexity Breakdown</CardTitle>
              <CardDescription>Difficulty of conversation topics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.topicComplexityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="complexity" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#60a5fa" name="Conversations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quality Metrics Radar */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Learning Quality Metrics</CardTitle>
              <CardDescription>Comprehensive performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={analytics.qualityMetricsData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#9ca3af" />
                  <Radar name="Score" dataKey="value" stroke="#4c9dff" fill="#4c9dff" fillOpacity={0.6} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Topics */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Most Discussed Topics</CardTitle>
              <CardDescription>Popular conversation subjects</CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.topTopics.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.topTopics} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis dataKey="topic" type="category" stroke="#9ca3af" width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="#93c5fd" name="Mentions" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-400">
                  No topic data available yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle>Filters & Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by conversation ID, user ID, or agent ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700"
                      data-testid="input-search"
                    />
                  </div>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal bg-gray-800 border-gray-700",
                        !dateRange.from && "text-gray-400"
                      )}
                      data-testid="button-date-filter"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                            {format(dateRange.to, "MMM dd, yyyy")}
                          </>
                        ) : (
                          format(dateRange.from, "MMM dd, yyyy")
                        )
                      ) : (
                        "Pick a date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700" align="start">
                    <Calendar
                      mode="range"
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                      className="bg-gray-900"
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  onClick={downloadCSV}
                  variant="outline"
                  className="bg-gray-800 border-gray-700"
                  data-testid="button-download-csv"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download CSV
                </Button>

                <Button
                  onClick={downloadJSON}
                  variant="outline"
                  className="bg-gray-800 border-gray-700"
                  data-testid="button-download-json"
                >
                  <FileJson className="mr-2 h-4 w-4" />
                  Download JSON
                </Button>
              </div>
              
              {/* Cost Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-400 mb-2 block">Min Cost ($)</label>
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="0.0000"
                    value={minCost}
                    onChange={(e) => setMinCost(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    data-testid="input-min-cost"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-400 mb-2 block">Max Cost ($)</label>
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="1.0000"
                    value={maxCost}
                    onChange={(e) => setMaxCost(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    data-testid="input-max-cost"
                  />
                </div>
                <div className="flex-1 flex items-end">
                  <Button
                    onClick={() => {
                      setMinCost("");
                      setMaxCost("");
                      setSearchTerm("");
                      setDateRange({});
                    }}
                    variant="outline"
                    className="bg-gray-800 border-gray-700 w-full"
                    data-testid="button-clear-filters"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversations Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>
              {filteredConversations.length} conversation{filteredConversations.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead>Conversation ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>English Level</TableHead>
                    <TableHead>Complexity</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-400">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredConversations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-400">
                        No conversations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredConversations.map((conv) => (
                      <TableRow
                        key={conv.id}
                        className="border-gray-800 hover:bg-gray-800/50"
                        data-testid={`row-conversation-${conv.id}`}
                      >
                        <TableCell className="font-mono text-sm">
                          {conv.conversation_id.substring(0, 12)}...
                        </TableCell>
                        <TableCell>{conv.user_id || "N/A"}</TableCell>
                        <TableCell>{formatDuration(conv.call_duration_seconds)}</TableCell>
                        <TableCell>${(parseFloat(conv.cost || "0")).toFixed(4)}</TableCell>
                        <TableCell>
                          {conv.analysis?.ai?.englishLevel ? (
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {conv.analysis.ai.englishLevel}
                            </Badge>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {conv.analysis?.ai?.topicComplexity ? (
                            <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              {conv.analysis.ai.topicComplexity}
                            </Badge>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {conv.analysis?.ai?.conversationQuality ? (
                            <span className="text-sm">
                              {conv.analysis.ai.conversationQuality}/10
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedConversation(conv)}
                            className="bg-gray-800 border-gray-700"
                            data-testid={`button-view-${conv.id}`}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversation Detail Dialog */}
      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Conversation Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedConversation?.conversation_id}
            </DialogDescription>
          </DialogHeader>

          {selectedConversation && (
            <div className="space-y-6">
              {/* Metadata */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Metadata</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">User ID</p>
                    <p className="font-mono">{selectedConversation.user_id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p>{formatDuration(selectedConversation.call_duration_seconds)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Cost</p>
                    <p>${parseFloat(selectedConversation.cost || "0").toFixed(6)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <Badge className="bg-green-500/20 text-green-400">
                      {selectedConversation.status || "completed"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              {selectedConversation.analysis?.ai && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">AI Analysis</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">English Level</p>
                        <Badge className="mt-1 bg-blue-500/20 text-blue-400">
                          {selectedConversation.analysis.ai.englishLevel}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Topic Complexity</p>
                        <Badge className="mt-1 bg-purple-500/20 text-purple-400">
                          {selectedConversation.analysis.ai.topicComplexity}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Quality Score</p>
                        <p className="text-lg font-bold">{selectedConversation.analysis.ai.conversationQuality}/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Grammar</p>
                        <p className="text-lg font-bold">{selectedConversation.analysis.ai.grammarAccuracy}/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Vocabulary</p>
                        <p className="text-lg font-bold">{selectedConversation.analysis.ai.vocabularyRichness}/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Fluency</p>
                        <p className="text-lg font-bold">{selectedConversation.analysis.ai.fluency}/10</p>
                      </div>
                    </div>

                    {selectedConversation.analysis.ai.summary && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Summary</p>
                        <p className="text-sm">{selectedConversation.analysis.ai.summary}</p>
                      </div>
                    )}

                    {selectedConversation.analysis.ai.topics && selectedConversation.analysis.ai.topics.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Topics Discussed</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedConversation.analysis.ai.topics.map((topic: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="bg-gray-700/50">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedConversation.analysis.ai.strengths && selectedConversation.analysis.ai.strengths.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Strengths</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {selectedConversation.analysis.ai.strengths.map((strength: string, idx: number) => (
                            <li key={idx} className="text-green-400">{strength}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedConversation.analysis.ai.areasForImprovement && selectedConversation.analysis.ai.areasForImprovement.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Areas for Improvement</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {selectedConversation.analysis.ai.areasForImprovement.map((area: string, idx: number) => (
                            <li key={idx} className="text-yellow-400">{area}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transcript */}
              {selectedConversation.transcript && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Transcript</h3>
                  <div className="space-y-3 bg-gray-800/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    {Array.isArray(selectedConversation.transcript) &&
                      selectedConversation.transcript.map((turn: any, idx: number) => (
                        <div key={idx} className="flex gap-3">
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs font-semibold h-fit",
                              turn.role === "user"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-green-500/20 text-green-400"
                            )}
                          >
                            {turn.role === "user" ? "Student" : "AI Tutor"}
                          </span>
                          <p className="flex-1">{turn.message || turn.content}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
