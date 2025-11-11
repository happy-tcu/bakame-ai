import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Download, Calendar as CalendarIcon, Search, FileJson, FileText, Phone, Clock, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conversation } from "../../shared/schema";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

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
  const { data: conversationsData, isLoading } = useQuery<{ conversations: Conversation[] }>({
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

  // Download as CSV
  const downloadCSV = () => {
    const headers = ["Conversation ID", "User ID", "Agent ID", "Duration (s)", "Cost", "Start Time", "Status"];
    const rows = filteredConversations.map((conv) => [
      conv.conversation_id,
      conv.user_id || "N/A",
      conv.agent_id,
      conv.call_duration_seconds || 0,
      conv.cost || 0,
      conv.start_time ? new Date(conv.start_time).toISOString() : "N/A",
      conv.status || "N/A",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversations_${new Date().toISOString()}.csv`;
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
            View and analyze all ElevenLabs conversations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-calls">
                {stats?.totalCalls || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-duration">
                {formatDuration(stats?.totalDuration || 0)}
              </div>
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
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-unique-users">
                {stats?.uniqueUsers || 0}
              </div>
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
                    <TableHead>Agent ID</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Status</TableHead>
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
                        <TableCell className="font-mono text-sm">
                          {conv.agent_id.substring(0, 12)}...
                        </TableCell>
                        <TableCell>{formatDuration(conv.call_duration_seconds)}</TableCell>
                        <TableCell>${(parseFloat(conv.cost || "0")).toFixed(4)}</TableCell>
                        <TableCell>
                          {conv.start_time
                            ? format(new Date(conv.start_time), "MMM dd, yyyy HH:mm")
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">
                            {conv.status || "done"}
                          </span>
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
                    <p className="text-sm text-gray-400">Agent ID</p>
                    <p className="font-mono text-sm">{selectedConversation.agent_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p>{formatDuration(selectedConversation.call_duration_seconds)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Cost</p>
                    <p>${parseFloat(selectedConversation.cost || "0").toFixed(6)}</p>
                  </div>
                </div>
              </div>

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
                            {turn.role === "user" ? "User" : "Agent"}
                          </span>
                          <p className="flex-1">{turn.message || turn.content}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Analysis */}
              {selectedConversation.analysis && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Analysis</h3>
                  <pre className="bg-gray-800/50 p-4 rounded-lg overflow-x-auto text-sm">
                    {JSON.stringify(selectedConversation.analysis, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
