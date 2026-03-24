'use client'

import { useState, useTransition } from 'react'
import type { Lead, LeadStatus } from '@/types'
import type { FollowUpRequest, FollowUpResponse, FollowUpType, FollowUpTone, FollowUpChannel, FollowUpLength } from '@/types/ai'
import { updateLeadStatusAction, logContactAction } from '@/app/actions/leads'

interface AIAssistantModalProps {
  lead: Lead
  onClose: () => void
  onStatusUpdate?: (id: string, status: LeadStatus) => void
}

export function AIAssistantModal({ lead, onClose, onStatusUpdate }: AIAssistantModalProps) {
  const [params, setParams] = useState<Omit<FollowUpRequest, 'leadId'>>({
    messageType: 'Follow-Up',
    tone: 'friendly',
    channel: 'sms',
    length: 'short',
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FollowUpResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [editableMessage, setEditableMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/ai/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, ...params }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate message')

      setResult(data as FollowUpResponse)
      setEditableMessage(data.message)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!editableMessage) return
    navigator.clipboard.writeText(editableMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in" 
        onClick={onClose} 
      />

      {/* Modal Container — inset on mobile, centered on md+ */}
      <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-4xl bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-2xl z-50 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Left Panel: Configuration */}
        <div className="w-full md:w-80 bg-[var(--surface)] p-6 border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col shrink-0">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)] tracking-wide flex items-center gap-2">
                <span className="text-violet-400">✨</span> AI Follow-up
              </h3>
              <p className="text-[11px] text-[var(--muted)] mt-1 truncate max-w-[200px]">Drafting for: <span className="text-[var(--text)] font-medium">{lead.full_name}</span></p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
             <div>
               <label className="text-[10px] uppercase tracking-wider font-semibold text-[var(--subtle)] block mb-1.5">Goal</label>
               <select 
                 className="w-full bg-[var(--elevated)] border border-[var(--border)] rounded-lg text-sm px-3 py-2 text-[var(--text)] outline-none focus:border-violet-500/50"
                 value={params.messageType}
                 onChange={e => setParams({...params, messageType: e.target.value as FollowUpType})}
               >
                 <option value="First Reply">First Reply</option>
                 <option value="Follow-Up">Follow-up</option>
                 <option value="Qualify Lead">Qualify Lead</option>
                 <option value="Handle Objection">Handle Objection</option>
               </select>
             </div>
             
             <div>
               <label className="text-[10px] uppercase tracking-wider font-semibold text-[var(--subtle)] block mb-1.5">Channel</label>
               <select 
                 className="w-full bg-[var(--elevated)] border border-[var(--border)] rounded-lg text-sm px-3 py-2 text-[var(--text)] outline-none focus:border-violet-500/50"
                 value={params.channel}
                 onChange={e => setParams({...params, channel: e.target.value as FollowUpChannel})}
               >
                 <option value="sms">SMS / Text</option>
                 <option value="dm">Direct Message (Social)</option>
                 <option value="email">Email</option>
               </select>
             </div>

             <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="text-[10px] uppercase tracking-wider font-semibold text-[var(--subtle)] block mb-1.5">Tone</label>
                 <select 
                   className="w-full bg-[var(--elevated)] border border-[var(--border)] rounded-lg text-sm px-3 py-2 text-[var(--text)] outline-none focus:border-violet-500/50"
                   value={params.tone}
                   onChange={e => setParams({...params, tone: e.target.value as FollowUpTone})}
                 >
                   <option value="friendly">Friendly</option>
                   <option value="warm">Warm</option>
                   <option value="professional">Professional</option>
                   <option value="direct">Direct</option>
                 </select>
               </div>
               <div>
                 <label className="text-[10px] uppercase tracking-wider font-semibold text-[var(--subtle)] block mb-1.5">Length</label>
                 <select 
                   className="w-full bg-[var(--elevated)] border border-[var(--border)] rounded-lg text-sm px-3 py-2 text-[var(--text)] outline-none focus:border-violet-500/50"
                   value={params.length}
                   onChange={e => setParams({...params, length: e.target.value as FollowUpLength})}
                 >
                   <option value="short">Short</option>
                   <option value="medium">Medium</option>
                 </select>
               </div>
             </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full mt-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : "Generate Outline"}
          </button>
        </div>

        {/* Right Panel: Output */}
        <div className="flex-1 p-6 flex flex-col min-h-[400px]">
           <div className="flex justify-between items-center mb-4">
             <h4 className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">AI Output</h4>
             <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[var(--surface)] text-[var(--subtle)] hover:text-white transition-colors">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
           </div>

           {error ? (
             <div className="m-auto p-4 border border-rose-500/20 bg-rose-500/5 rounded-xl text-sm text-rose-400 text-center max-w-sm">
               {error}
             </div>
           ) : !result && !loading ? (
             <div className="m-auto text-center max-w-xs space-y-3">
               <div className="w-12 h-12 rounded-full bg-[var(--elevated)] border border-[var(--border)] mx-auto flex justify-center items-center">
                 <svg className="w-6 h-6 text-[var(--subtle)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
               </div>
               <p className="text-xs text-[var(--muted)] leading-relaxed">Adjust your preferences and hit Generate to draft a personalized follow-up using {lead.full_name}'s context.</p>
             </div>
           ) : loading ? (
             <div className="m-auto text-center space-y-4">
               <div className="w-10 h-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mx-auto" />
               <p className="text-xs text-[var(--subtle)] uppercase tracking-widest font-medium animate-pulse">Drafting...</p>
             </div>
           ) : result ? (
             <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
               {/* Messaging Output */}
               {/* Messaging Output */}
               <div className="flex-1 flex flex-col gap-2">
                 <textarea 
                   value={editableMessage}
                   onChange={e => setEditableMessage(e.target.value)}
                   className="w-full flex-1 min-h-[160px] resize-none bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded-xl p-4 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all leading-relaxed custom-scrollbar shadow-inner"
                 />
                 
                 {/* Actions Row */}
                 <div className="flex flex-wrap items-center gap-2">
                   {lead.phone && (
                     <a 
                       href={`sms:${lead.phone}?body=${encodeURIComponent(editableMessage)}`} 
                       onClick={() => startTransition(() => { logContactAction(lead.id, 'sms', editableMessage) })}
                       className="text-[11px] bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all font-bold"
                     >
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                       Send SMS
                     </a>
                   )}
                   {lead.email && (
                     <a 
                       href={`mailto:${lead.email}?subject=Following%20Up&body=${encodeURIComponent(editableMessage)}`} 
                       onClick={() => startTransition(() => { logContactAction(lead.id, 'email', editableMessage) })}
                       className="text-[11px] bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all font-bold"
                     >
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                       Send Email
                     </a>
                   )}
                   <button 
                     onClick={handleCopy}
                     className="text-[11px] bg-[var(--elevated)] hover:bg-[var(--bg)] border border-[var(--border)] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors font-bold ml-auto shadow-sm"
                   >
                     {copied ? 'Copied!' : 'Copy Text'}
                   </button>
                 </div>
               </div>

               {/* Meta Action Data & Pipeline Tools */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
                 <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 flex flex-col justify-between gap-3">
                   <div>
                     <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest mb-1.5">Suggested Action</p>
                     <p className="text-xs text-amber-200/90 font-medium">{result.nextAction}</p>
                   </div>
                   
                   {lead.status === 'new' && (
                     <button
                       disabled={isPending}
                       onClick={() => {
                         if (onStatusUpdate) onStatusUpdate(lead.id, 'contacted')
                         startTransition(() => {
                           logContactAction(lead.id, 'system', editableMessage)
                         })
                         onClose()
                       }}
                       className="w-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-white py-1.5 rounded-md transition-colors border border-amber-500/30 text-center"
                     >
                       Mark as Contacted
                     </button>
                   )}
                 </div>
                 <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3">
                   <p className="text-[10px] font-bold text-blue-500/60 uppercase tracking-widest mb-1.5">Strategy Reasoning</p>
                   <p className="text-xs text-blue-200/80 leading-snug">{result.reasoningSummary}</p>
                 </div>
               </div>
             </div>
           ) : null}
        </div>
      </div>
    </>
  )
}
