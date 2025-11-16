import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/AuthContext";
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
import { Calendar as CalendarIcon, Search, FileJson, FileText, Phone, Clock, DollarSign, Users, TrendingUp, MessageSquare, ArrowUp, ArrowDown, BookOpen, Award, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import type { Conversation } from "../../shared/schema";

const COLORS = ['#5b7cff', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

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
  const { loading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithAI | null>(null);

  const { data: stats } = useQuery<{
    totalCalls: number;
    totalDuration: number;
    totalCost: number;
    uniqueUsers: number;
  }>({
    queryKey: ["/api/admin/stats"],
    enabled: !authLoading,
  });

  const { data: analyticsData } = useQuery<{
    cefrDistribution: Array<{ level: string; count: number }>;
    topicComplexityDistribution: Array<{ complexity: string; count: number }>;
    averageScores: {
      grammar: number;
      vocabulary: number;
      fluency: number;
      coherence: number;
    };
    topInsights: string[];
  }>({
    queryKey: ["/api/admin/analytics"],
    enabled: !authLoading,
  });

  // Build query params
  const queryParams = new URLSearchParams();
  if (dateRange.from) queryParams.append("startDate", dateRange.from.toISOString());
  if (dateRange.to) queryParams.append("endDate", dateRange.to.toISOString());
  if (minCost) queryParams.append("minCost", minCost);
  if (maxCost) queryParams.append("maxCost", maxCost);
  
  const conversationsUrl = queryParams.toString() 
    ? `/api/admin/conversations?${queryParams}`
    : "/api/admin/conversations";

  const { data: conversationsData, isLoading } = useQuery<{ conversations: ConversationWithAI[] }>({
    queryKey: [conversationsUrl],
  });

  const conversations = conversationsData?.conversations || [];

  const filteredConversations = conversations.filter((conv) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      conv.conversation_id.toLowerCase().includes(search) ||
      conv.user_id?.toLowerCase().includes(search) ||
      conv.agent_id.toLowerCase().includes(search)
    );
  });

  const analytics = useMemo(() => {
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

    const avgDuration = conversations.length > 0
      ? conversations.reduce((sum, conv) => sum + (conv.call_duration_seconds || 0), 0) / conversations.length
      : 0;

    const avgCost = conversations.length > 0
      ? conversations.reduce((sum, conv) => sum + parseFloat(conv.cost || '0'), 0) / conversations.length
      : 0;

    const transcriptLengths = conversations.map(conv => 
      Array.isArray(conv.transcript) ? conv.transcript.length : 0
    );
    const avgTurns = transcriptLengths.length > 0
      ? transcriptLengths.reduce((sum, len) => sum + len, 0) / transcriptLengths.length
      : 0;

    const conversationsWithAI = conversations.filter(conv => conv.analysis?.ai);
    
    const levelCounts: Record<string, number> = {};
    conversationsWithAI.forEach(conv => {
      const level = conv.analysis?.ai?.englishLevel || 'Unknown';
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });
    const englishLevelData = Object.entries(levelCounts).map(([level, count]) => ({
      level,
      count
    }));

    const complexityCounts: Record<string, number> = {};
    conversationsWithAI.forEach(conv => {
      const complexity = conv.analysis?.ai?.topicComplexity || 'Unknown';
      complexityCounts[complexity] = (complexityCounts[complexity] || 0) + 1;
    });
    const topicComplexityData = Object.entries(complexityCounts).map(([complexity, count]) => ({
      complexity,
      count
    }));

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

    const qualityMetricsData = [
      { metric: 'Grammar', value: avgGrammar },
      { metric: 'Vocabulary', value: avgVocabulary },
      { metric: 'Fluency', value: avgFluency },
      { metric: 'Comprehension', value: avgComprehension },
      { metric: 'Overall', value: avgQuality }
    ];

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

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8 mt-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="heading-admin-dashboard">
            Dashboard
          </h1>
          <p className="text-gray-500" data-testid="text-dashboard-description">
            {dateRange.from 
              ? `${format(dateRange.from, 'MM/dd/yyyy')} to ${dateRange.to ? format(dateRange.to, 'MM/dd/yyyy') : 'now'}`
              : 'Overview of all conversation analytics'}
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Conversations</CardTitle>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900" data-testid="stat-total-calls">
                {stats?.totalCalls || 0}
              </div>
              <p className="text-xs text-green-600 flex items-center mt-2">
                <ArrowUp className="h-3 w-3 mr-1" />
                {analytics.aiAnalyzedCount} analyzed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Speaking Time</CardTitle>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900" data-testid="stat-total-duration">
                {formatDuration(stats?.totalDuration || 0)}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Avg: {formatDuration(analytics.avgDuration)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Cost</CardTitle>
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900" data-testid="stat-total-cost">
                ${(stats?.totalCost || 0).toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Avg: ${analytics.avgCost.toFixed(4)}/call
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900" data-testid="stat-unique-users">
                {stats?.uniqueUsers || 0}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Unique participants
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Quality Metrics from OpenAI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Grammar Score</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {(analyticsData?.averageScores.grammar || 0).toFixed(1)}<span className="text-lg text-gray-400">/10</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all" 
                  style={{ width: `${((analyticsData?.averageScores.grammar || 0) / 10) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Vocabulary</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {(analyticsData?.averageScores.vocabulary || 0).toFixed(1)}<span className="text-lg text-gray-400">/10</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all" 
                  style={{ width: `${((analyticsData?.averageScores.vocabulary || 0) / 10) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Fluency</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {(analyticsData?.averageScores.fluency || 0).toFixed(1)}<span className="text-lg text-gray-400">/10</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all" 
                  style={{ width: `${((analyticsData?.averageScores.fluency || 0) / 10) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Coherence</CardTitle>
              <Target className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {(analyticsData?.averageScores.coherence || 0).toFixed(1)}<span className="text-lg text-gray-400">/10</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all" 
                  style={{ width: `${((analyticsData?.averageScores.coherence || 0) / 10) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900">Conversation Trends</CardTitle>
                  <CardDescription className="text-gray-500">Last 7 days</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  View
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={analytics.callsByDay}>
                  <defs>
                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5b7cff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#5b7cff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    labelStyle={{ color: '#111827', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="calls" stroke="#5b7cff" strokeWidth={2} fillOpacity={1} fill="url(#colorCalls)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900">Duration Distribution</CardTitle>
                  <CardDescription className="text-gray-500">Call length breakdown</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  View
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analytics.durationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="range" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    labelStyle={{ color: '#111827', fontWeight: 600 }}
                  />
                  <Bar dataKey="count" fill="#5b7cff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 - AI Analysis with API Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">English Levels (CEFR)</CardTitle>
              <CardDescription className="text-gray-500">Proficiency distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={analyticsData?.cefrDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="level"
                  >
                    {(analyticsData?.cefrDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {(analyticsData?.cefrDistribution || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-xs text-gray-600">{item.level} ({item.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Topic Complexity</CardTitle>
              <CardDescription className="text-gray-500">Difficulty levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={analyticsData?.topicComplexityDistribution || []} layout="vertical">
                  <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="complexity" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#7c3aed" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Quality Metrics</CardTitle>
              <CardDescription className="text-gray-500">Performance radar</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={[
                  { metric: 'Grammar', value: analyticsData?.averageScores.grammar || 0 },
                  { metric: 'Vocabulary', value: analyticsData?.averageScores.vocabulary || 0 },
                  { metric: 'Fluency', value: analyticsData?.averageScores.fluency || 0 },
                  { metric: 'Coherence', value: analyticsData?.averageScores.coherence || 0 }
                ]}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" stroke="#6b7280" style={{ fontSize: '11px' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#9ca3af" style={{ fontSize: '10px' }} />
                  <Radar name="Score" dataKey="value" stroke="#5b7cff" fill="#5b7cff" fillOpacity={0.5} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights Section */}
        {analyticsData?.topInsights && analyticsData.topInsights.length > 0 && (
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Key Insights
              </CardTitle>
              <CardDescription className="text-gray-600">AI-powered analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analyticsData.topInsights.map((insight, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-600">{idx + 1}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="bg-white border-0 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900">Filters & Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      data-testid="input-search"
                    />
                  </div>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal border-gray-200",
                        !dateRange.from && "text-gray-500"
                      )}
                      data-testid="button-date-filter"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                          </>
                        ) : (
                          format(dateRange.from, "MMM dd, yyyy")
                        )
                      ) : (
                        "Date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border-gray-200" align="start">
                    <Calendar
                      mode="range"
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  onClick={downloadCSV}
                  variant="outline"
                  className="border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  data-testid="button-download-csv"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  CSV
                </Button>

                <Button
                  onClick={downloadJSON}
                  variant="outline"
                  className="border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  data-testid="button-download-json"
                >
                  <FileJson className="mr-2 h-4 w-4" />
                  JSON
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversations Table */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Conversations</CardTitle>
            <CardDescription className="text-gray-500">
              {filteredConversations.length} conversation{filteredConversations.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-transparent">
                    <TableHead className="text-gray-600">ID</TableHead>
                    <TableHead className="text-gray-600">User</TableHead>
                    <TableHead className="text-gray-600">Duration</TableHead>
                    <TableHead className="text-gray-600">Cost</TableHead>
                    <TableHead className="text-gray-600">Level</TableHead>
                    <TableHead className="text-gray-600">Complexity</TableHead>
                    <TableHead className="text-gray-600">Quality</TableHead>
                    <TableHead className="text-gray-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredConversations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                        No conversations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredConversations.map((conv) => (
                      <TableRow
                        key={conv.id}
                        className="border-gray-100 hover:bg-gray-50"
                        data-testid={`row-conversation-${conv.id}`}
                      >
                        <TableCell className="font-mono text-xs text-gray-600">
                          {conv.conversation_id.substring(0, 8)}...
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">{conv.user_id || "Guest"}</TableCell>
                        <TableCell className="text-sm text-gray-600">{formatDuration(conv.call_duration_seconds)}</TableCell>
                        <TableCell className="text-sm text-gray-900 font-medium">${(parseFloat(conv.cost || "0")).toFixed(4)}</TableCell>
                        <TableCell>
                          {conv.analysis?.ai?.englishLevel ? (
                            <Badge className="bg-blue-50 text-blue-700 border-0 hover:bg-blue-100">
                              {conv.analysis.ai.englishLevel}
                            </Badge>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {conv.analysis?.ai?.topicComplexity ? (
                            <Badge className="bg-purple-50 text-purple-700 border-0 hover:bg-purple-100">
                              {conv.analysis.ai.topicComplexity}
                            </Badge>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {conv.analysis?.ai?.conversationQuality ? (
                            <span className="text-sm font-medium text-gray-900">
                              {conv.analysis.ai.conversationQuality}/10
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedConversation(conv)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            data-testid={`button-view-${conv.id}`}
                          >
                            View
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
        <DialogContent className="bg-white text-gray-900 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Conversation Details</DialogTitle>
            <DialogDescription className="text-gray-500 font-mono text-xs">
              {selectedConversation?.conversation_id}
            </DialogDescription>
          </DialogHeader>

          {selectedConversation && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Metadata</h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-mono text-sm text-gray-900">{selectedConversation.user_id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-gray-900">{formatDuration(selectedConversation.call_duration_seconds)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cost</p>
                    <p className="text-gray-900 font-medium">${parseFloat(selectedConversation.cost || "0").toFixed(6)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className="bg-green-50 text-green-700 border-0">
                      {selectedConversation.status || "completed"}
                    </Badge>
                  </div>
                </div>
              </div>

              {selectedConversation.analysis?.ai && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Analysis</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">English Level</p>
                        <Badge className="mt-1 bg-blue-100 text-blue-800 border-0">
                          {selectedConversation.analysis.ai.englishLevel}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Complexity</p>
                        <Badge className="mt-1 bg-purple-100 text-purple-800 border-0">
                          {selectedConversation.analysis.ai.topicComplexity}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quality</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{selectedConversation.analysis.ai.conversationQuality}/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Grammar</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{selectedConversation.analysis.ai.grammarAccuracy}/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Vocabulary</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{selectedConversation.analysis.ai.vocabularyRichness}/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fluency</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{selectedConversation.analysis.ai.fluency}/10</p>
                      </div>
                    </div>

                    {selectedConversation.analysis.ai.summary && (
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Summary</p>
                        <p className="text-sm text-gray-900">{selectedConversation.analysis.ai.summary}</p>
                      </div>
                    )}

                    {selectedConversation.analysis.ai.topics && selectedConversation.analysis.ai.topics.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Topics</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedConversation.analysis.ai.topics.map((topic: string, idx: number) => (
                            <Badge key={idx} className="bg-white text-gray-700 border-0">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedConversation.analysis.ai.strengths && selectedConversation.analysis.ai.strengths.length > 0 && (
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">✅ Strengths</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {selectedConversation.analysis.ai.strengths.map((strength: string, idx: number) => (
                            <li key={idx} className="text-green-700">{strength}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedConversation.analysis.ai.areasForImprovement && selectedConversation.analysis.ai.areasForImprovement.length > 0 && (
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">📈 Areas for Improvement</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {selectedConversation.analysis.ai.areasForImprovement.map((area: string, idx: number) => (
                            <li key={idx} className="text-amber-700">{area}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedConversation.transcript && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Transcript</h3>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    {Array.isArray(selectedConversation.transcript) &&
                      selectedConversation.transcript.map((turn: any, idx: number) => (
                        <div key={idx} className="flex gap-3">
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-semibold h-fit",
                              turn.role === "user"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            )}
                          >
                            {turn.role === "user" ? "Student" : "AI Tutor"}
                          </span>
                          <p className="flex-1 text-sm text-gray-900">{turn.message || turn.content}</p>
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
