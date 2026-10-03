'use client';

import React, { useState } from 'react';
import { Leaf, MapPin, Send, AlertTriangle, ArrowRight, ShieldCheck, TreePine, CarFront, HeartHandshake } from 'lucide-react';
import { MOCK_NGOS, MOCK_BLUEPRINTS } from '@/lib/mock-data';

export default function Home() {
  const [complaint, setComplaint] = useState("there's a tree fallen on Karmelicka 14");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [proposal, setProposal] = useState<any>(null);
  const [useLiveAI, setUseLiveAI] = useState(true);
  const [isForwarded, setIsForwarded] = useState(false);

  const matchedNgo = proposal ? MOCK_NGOS.find(n => n.id === proposal.matchedNgoId) : null;
  const matchedBlueprint = proposal ? MOCK_BLUEPRINTS.find(b => b.id === proposal.matchedBlueprintId) : null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint) return;
    
    setIsGenerating(true);
    setShowProposal(false);
    setIsForwarded(false);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ complaint, useLiveAI })
      });
      
      if (!response.ok) throw new Error('Failed to generate proposal');
      
      const data = await response.json();
      setProposal(data);
      setShowProposal(true);
    } catch (error) {
      console.error(error);
      alert('Error generating proposal. Check console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight">
            <ShieldCheck className="h-6 w-6" />
            <span>CivicSync</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="hover:text-slate-900 cursor-pointer">Blueprints</span>
            <span className="hover:text-slate-900 cursor-pointer">NGO Directory</span>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-24">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Turn local ideas into <span className="text-blue-600">civic action.</span>
          </h1>
          <p className="text-lg text-slate-600">
            Don't let good ideas go unnoticed. Tell us what your neighborhood needs—whether it's fixing a hazard or building something new—and our AI will instantly draft a formal project proposal and match it with local NGOs and city funding.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col min-h-[500px]">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-1">What's happening?</h2>
                <p className="text-slate-400 text-sm">Use your own words. We'll handle the bureaucracy.</p>
              </div>
              
              {/* DEMO TOGGLE */}
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={useLiveAI} 
                  onChange={(e) => setUseLiveAI(e.target.checked)}
                  className="rounded border-slate-500 bg-slate-700 text-blue-500 focus:ring-blue-500/50"
                />
                Live AI Generation
              </label>
            </div>
            
            <form onSubmit={handleGenerate} className="flex-1 flex flex-col p-6">
              
              <div className="mb-4">
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer shadow-sm appearance-none"
                  onChange={(e) => {
                    if (e.target.value === "custom") {
                      setComplaint("");
                    } else {
                      setComplaint(e.target.value);
                    }
                  }}
                  defaultValue="tree"
                >
                  <option value="custom">✏️ Type a custom observation...</option>
                  <option value="there's a tree fallen on Karmelicka 14">🪵 Fallen Tree on Karmelicka 14 (Quick Test)</option>
                  <option value="There's this huge abandoned dirt lot behind the old bakery on Dietla 42. It's just collecting trash and weeds. It would be really nice if we could clear it out and maybe plant some vegetables or flowers so the neighborhood has a green space to hang out in.">🌱 Community Garden (Environment)</option>
                  <option value="I've noticed a lot of the older folks in my apartment complex struggle to carry their groceries up the stairs, especially in winter. Some of them don't have family nearby. We need some sort of system where younger residents can help them with errands so they aren't isolated.">👵 Elderly Grocery Support (Social)</option>
                  <option value="A lot of kids in the housing block on Starowiślna 88 don't have reliable internet access to do their schoolwork, and the nearest library is 3 miles away. It would be amazing if the city could install a secure public Wi-Fi hotspot or a digital access point near the community center.">💻 Digital Kiosk / Wi-Fi (Tech)</option>
                  <option value="Samochody jeżdżą o wiele za szybko w pobliżu szkoły podstawowej na ulicy Długiej. Dzieci ledwo mogą bezpiecznie przejść przez ulicę. Potrzebujemy progów zwalniających albo lepszego przejścia dla pieszych, zanim dojdzie do wypadku.">🇵🇱 Traffic Safety (Polish Input)</option>
                </select>
              </div>

              <textarea 
                className="w-full flex-1 resize-none bg-slate-50 border border-slate-200 rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                placeholder="E.g. The empty lot on Dietla 42 is covered in trash..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
              />
              
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                    <MapPin className="h-3 w-3" /> Kraków, Poland
                  </span>
                  <button type="button" className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Use My Location
                  </button>
                </div>
                
                <button 
                  type="submit"
                  disabled={isGenerating}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Generate Proposal <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: AI Output / Proposal Card */}
          <div className="flex flex-col justify-start w-full min-h-[500px]">
            
            {!showProposal && !isGenerating && (
              <div className="text-center text-slate-400 mt-24">
                <ShieldCheck className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Your action proposal will appear here.</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center text-blue-600 animate-pulse mt-24">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                <p className="font-medium">Translating to civic proposal...</p>
              </div>
            )}

            {showProposal && !isGenerating && proposal && (
              <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                    <AlertTriangle className="h-3 w-3" /> {proposal.category}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                    Est. {proposal.estimatedBudget}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-4 leading-tight">
                  {proposal.title}
                </h3>
                
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {proposal.summary}
                </p>

                {/* Match Details */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Matched NGO</p>
                    <p className="font-semibold flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-blue-600" /> {matchedNgo ? matchedNgo.name : proposal.matchedNgoId}</p>
                  </div>
                  <div className="flex-1 sm:pl-4 pt-4 sm:pt-0">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Blueprint Used</p>
                    <p className="font-semibold flex items-center gap-1.5"><CarFront className="h-4 w-4 text-blue-600" /> {matchedBlueprint ? matchedBlueprint.title : proposal.matchedBlueprintId}</p>
                  </div>
                </div>

                {/* Verification & Location */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Community Verification</h4>
                      <span className="text-xs font-bold text-blue-600">1/10 Upvotes</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <p className="text-[10px] text-slate-500">Requires 10 upvotes to route to NGO</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Exact Location</h4>
                      <p className="text-sm font-semibold text-slate-700">50.0647° N, 19.9450° E</p>
                      <p className="text-[10px] text-slate-500">Captured via GPS</p>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    Action Plan <ArrowRight className="h-4 w-4 text-slate-400" />
                  </h4>
                  <ul className="space-y-3">
                    {proposal.nextSteps?.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-600 rounded-full h-6 w-6 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">{idx + 1}</div>
                        <p className="text-sm text-slate-700">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button className="text-slate-500 text-sm font-medium px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors">
                    Edit Details
                  </button>
                  <button 
                    onClick={() => setIsForwarded(true)}
                    className={`text-sm font-medium px-6 py-2 rounded-lg transition-all shadow-lg ${
                      isForwarded 
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20 pointer-events-none' 
                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
                    }`}
                  >
                    {isForwarded ? 'Forwarded Successfully ✓' : 'Forward to NGO'}
                  </button>
                </div>
                
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
