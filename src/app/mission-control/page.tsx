"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Activity, Calendar, Search, Terminal, Zap, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function MissionControlPage() {
  const [activeTab, setActiveTab] = useState<"feed" | "calendar" | "search">("feed");

  return (
    <main className="min-h-screen bg-[#050505] text-white font-editorial-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center ring-1 ring-white/20 shadow-lg shadow-purple-500/20">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-medium tracking-tight">Mission Control</h1>
              <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Pixel Operations Command Center</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <TabButton 
              active={activeTab === "feed"} 
              onClick={() => setActiveTab("feed")}
              icon={<Zap className="w-4 h-4" />}
              label="Activity Feed"
            />
            <TabButton 
              active={activeTab === "calendar"} 
              onClick={() => setActiveTab("calendar")}
              icon={<Calendar className="w-4 h-4" />}
              label="Weekly View"
            />
            <TabButton 
              active={activeTab === "search"} 
              onClick={() => setActiveTab("search")}
              icon={<Search className="w-4 h-4" />}
              label="Global Search"
            />
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider leading-none">Pixel: Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === "feed" && <ActivityFeed />}
        {activeTab === "calendar" && <WeeklyCalendar />}
        {activeTab === "search" && <GlobalSearch />}
      </div>
    </main>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300",
        active ? "bg-white/10 text-white shadow-inner shadow-white/5" : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ActivityFeed() {
  const activities = useQuery(api.activity.getRecentActivity);

  if (!activities) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-sm font-mono tracking-widest uppercase">Initializing Feed...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-editorial-serif italic text-white/90">Real-time Operations Log</h2>
        <p className="text-xs font-mono text-white/30 uppercase tracking-tighter italic">Tracking every byte of Pixel's logic...</p>
      </div>
      
      <div className="relative border-l border-white/5 ml-4 pl-12 space-y-12 py-4">
        {activities.map((activity, i) => (
          <div key={activity._id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[60px] top-1.5 w-6 h-6 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors duration-500 shadow-xl shadow-black">
              {activity.type === "tool" ? <Terminal className="w-3 h-3 text-blue-400" /> : 
               activity.type === "message" ? <Sparkles className="w-3 h-3 text-purple-400" /> :
               <Shield className="w-3 h-3 text-emerald-400" />}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/20">{new Date(activity.timestamp).toLocaleTimeString()}</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest leading-none border",
                  activity.status === "completed" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                  activity.status === "failed" ? "bg-red-500/10 border-red-500/20 text-red-400" :
                  "bg-blue-500/10 border-blue-500/20 text-blue-400"
                )}>
                  {activity.status}
                </span>
                <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{activity.action}</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-2xl">{activity.description}</p>
              {activity.metadata && (
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-mono text-white/30 overflow-x-auto whitespace-pre">
                  {JSON.stringify(activity.metadata, null, 2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyCalendar() {
  const [now] = useState(Date.now());
  const startAt = now;
  const endAt = now + 7 * 24 * 60 * 60 * 1000;
  
  const tasks = useQuery(api.tasks.getWeeklyTasks, { startAt, endAt });

  if (!tasks) return <div>Loading calendar...</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mb-12">
        <h2 className="text-3xl font-editorial-serif italic text-white/90">Operational Horizon</h2>
        <p className="text-sm text-white/40 mt-2 italic">Upcoming scheduled activities for the next 7 days.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        {[...Array(7)].map((_, i) => {
          const date = new Date(now + i * 24 * 60 * 60 * 1000);
          const dayTasks = tasks.filter(t => {
            const tDate = new Date(t.scheduledAt);
            return tDate.getDate() === date.getDate() && tDate.getMonth() === date.getMonth();
          });
          
          return (
            <div key={i} className="flex flex-col gap-4">
              <div className="text-center p-4 border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-sm">
                <span className="block text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] mb-1">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="text-xl font-medium tracking-tighter">
                  {date.getDate()}
                </span>
              </div>
              
              <div className="space-y-3">
                {dayTasks.length > 0 ? dayTasks.map(task => (
                  <div key={task._id} className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
                      )} />
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-tighter leading-none">
                        {new Date(task.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h4 className="text-xs font-medium text-white/80 group-hover:text-white leading-tight">{task.title}</h4>
                  </div>
                )) : (
                  <div className="h-20 rounded-xl border border-dashed border-white/5 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">Clear</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 group-focus-within:text-purple-500 transition-colors duration-500" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search memories, documents, tasks..."
          className="w-full bg-white/[0.02] border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-xl font-editorial-sans placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-500 shadow-2xl shadow-purple-500/5"
        />
        {isSearching && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-white/10 border-t-purple-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
      
      {query ? (
        <div className="space-y-6">
          <p className="text-xs font-mono text-white/20 uppercase tracking-widest pl-2">Search Results for "{query}"</p>
          <div className="grid gap-4">
             {results.length > 0 ? results.map((result, i) => (
               <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                 <div className="flex items-center gap-3 mb-3">
                   <div className={cn(
                     "w-8 h-8 rounded-lg flex items-center justify-center border",
                     result.type === "memory" ? "bg-purple-500/10 border-purple-500/20 text-purple-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                   )}>
                     {result.type === "memory" ? <Sparkles className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                   </div>
                   <div>
                     <h3 className="text-sm font-medium text-white/80 group-hover:text-white">{result.title}</h3>
                     <p className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">{result.path}</p>
                   </div>
                 </div>
                 <pre className="text-xs text-white/40 font-mono whitespace-pre-wrap leading-relaxed border-l border-white/10 pl-4 py-1">
                   {result.snippet}
                 </pre>
               </div>
             )) : !isSearching && (
               <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] opacity-60 italic text-sm text-white/40 text-center py-20">
                 No matches found in the cosmic void... <br/>
                 <span className="text-[10px] uppercase mt-2 block font-mono tracking-tighter opacity-50">Query failed to manifest</span>
               </div>
             )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40 grayscale">
           <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-4">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
               <Activity className="w-4 h-4" />
             </div>
             <h3 className="text-sm font-medium">Semantic Search</h3>
             <p className="text-xs leading-relaxed">Search through unstructured memories and conversational history using vector embeddings.</p>
           </div>
           <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-4">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
               <Shield className="w-4 h-4" />
             </div>
             <h3 className="text-sm font-medium">Document Index</h3>
             <p className="text-xs leading-relaxed">Query our entire file tree, from daily logs to project blueprints and skill definitions.</p>
           </div>
        </div>
      )}
    </div>
  );
}
