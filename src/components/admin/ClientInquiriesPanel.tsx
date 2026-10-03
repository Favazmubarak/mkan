"use client";

import { Check, MessageSquare, Trash2 } from "lucide-react";
import type { StudioMessage } from "./studio-types";

interface ClientInquiriesPanelProps {
  active: boolean;
  messages: StudioMessage[];
  selectedMessage: StudioMessage | null;
  filter: "all" | "unread" | "replied";
  unreadCount: number;
  onFilterChange: (filter: "all" | "unread" | "replied") => void;
  onSelectMessage: (message: StudioMessage) => void;
  onToggleRead: (id: string, status: string) => void;
  onToggleReplied: (id: string, replied: boolean) => void;
  onDeleteMessage: (id: string) => void;
}

export function ClientInquiriesPanel({
  active,
  messages,
  selectedMessage,
  filter,
  unreadCount,
  onFilterChange,
  onSelectMessage,
  onToggleRead,
  onToggleReplied,
  onDeleteMessage,
}: ClientInquiriesPanelProps) {
  if (!active) return null;
  const visibleMessages = messages.filter((message) =>
    filter === "all" || (filter === "unread" ? message.status === "unread" : message.replied)
  );

  return (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Client Messages</h2>
                    <p className="text-xs text-[#6B7280]">Direct inquiries received from website visitors</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-1">
                    <button
                      type="button"
                      aria-pressed={filter === "all"}
                      onClick={() => onFilterChange("all")}
                      className={`px-3 py-1 rounded-md text-xs font-bold ${
                        filter === "all" ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
                      }`}
                    >
                      All ({messages.length})
                    </button>
                    <button
                      type="button"
                      aria-pressed={filter === "unread"}
                      onClick={() => onFilterChange("unread")}
                      className={`px-3 py-1 rounded-md text-xs font-bold ${
                        filter === "unread" ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
                      }`}
                    >
                      Unread ({unreadCount})
                    </button>
                    <button
                      type="button"
                      aria-pressed={filter === "replied"}
                      onClick={() => onFilterChange("replied")}
                      className={`px-3 py-1 rounded-md text-xs font-bold ${
                        filter === "replied" ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
                      }`}
                    >
                      Replied ({messages.filter((message) => message.replied).length})
                    </button>
                  </div>
                </div>

                {messages.length === 0 ? (
                  <div className="p-16 rounded-2xl bg-white border border-[#E5E7EB] text-center space-y-2">
                    <MessageSquare className="h-8 w-8 mx-auto text-[#9CA3AF]" />
                    <p className="text-sm font-bold text-[#111827]">No Messages Yet</p>
                    <p className="text-xs text-[#6B7280]">When clients contact you, their messages will appear here.</p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                    {/* Left Message List */}
                    <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] divide-y divide-[#E5E7EB] overflow-y-auto max-h-[560px]">
                      {visibleMessages.map((m) => {
                          const isSelected = selectedMessage?._id === m._id;
                          return (
                            <button
                              key={m._id}
                              type="button"
                              onClick={() => {
                                onSelectMessage(m);
                                if (m.status === "unread") onToggleRead(m._id, "unread");
                              }}
                              aria-pressed={isSelected}
                              aria-label={`Inquiry from ${m.name}, ${m.status}`}
                              className={`w-full text-left p-4 flex items-start gap-3 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B8860B] ${
                                isSelected
                                  ? "bg-[#DDB78A]/15"
                                  : m.status === "unread"
                                  ? "bg-amber-50/70 hover:bg-amber-50"
                                  : "hover:bg-[#F9FAFB]"
                              }`}
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1A060E] text-[#DDB78A] text-xs font-bold">
                                {m.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-[#111827] truncate">{m.name}</h4>
                                  <span className="text-[0.62rem] text-[#9CA3AF]">
                                    {new Date(m.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                  </span>
                                </div>
                                <p className="text-[0.68rem] text-[#B8860B] font-semibold truncate mt-0.5">
                                  {m.company || m.email}
                                </p>
                                <p className="text-[0.68rem] text-[#6B7280] truncate mt-1">
                                  {m.message}
                                </p>
                              </div>
                              {m.status === "unread" && (
                                <span className="h-2 w-2 rounded-full bg-amber-500 mt-2 shrink-0 animate-pulse" />
                              )}
                              {m.replied && (
                                <span className="mt-1 shrink-0 rounded-full bg-[#1A060E] px-2 py-1 text-[0.58rem] font-bold text-white">Replied</span>
                              )}
                            </button>
                          );
                        })}
                    </div>

                    {/* Right Detail Pane */}
                    <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[#FAFAFA]">
                      {selectedMessage ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                            <div>
                              <h3 className="text-base font-bold text-[#111827]">{selectedMessage.name}</h3>
                              <p className="text-xs text-[#B8860B] font-semibold mt-0.5">
                                {selectedMessage.email} {selectedMessage.phone && `• ${selectedMessage.phone}`}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onDeleteMessage(selectedMessage._id)}
                              className="text-[#9CA3AF] hover:text-rose-600 p-2 rounded-lg cursor-pointer"
                              aria-label={`Delete inquiry from ${selectedMessage.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                            <span className="text-[0.62rem] uppercase font-bold text-[#9CA3AF]">Message Body</span>
                            <p className="text-sm text-[#111827] whitespace-pre-wrap leading-relaxed">
                              {selectedMessage.message}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4">
                            <button
                              type="button"
                              onClick={() => onToggleReplied(selectedMessage._id, Boolean(selectedMessage.replied))}
                              aria-pressed={Boolean(selectedMessage.replied)}
                              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${selectedMessage.replied ? "border border-[#1A060E] bg-white text-[#1A060E] hover:bg-[#FAF1E8]" : "bg-[#1A060E] text-white hover:bg-[#2A0A17]"}`}
                            >
                              <Check className="h-3.5 w-3.5" />
                              {selectedMessage.replied ? "Mark as Not Replied" : "Mark as Replied"}
                            </button>
                            <span className="text-xs font-medium text-[#6B7280]">{selectedMessage.status === "unread" ? "Unread" : "Read"}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-[#9CA3AF]">
                          Select a message to view the inquiry.
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {messages.length > 0 && visibleMessages.length === 0 && (
                  <p className="rounded-xl bg-white p-6 text-sm text-[#6B7280]" role="status">
                    {filter === "replied" ? "There are no replied inquiries." : "There are no unread inquiries."}
                  </p>
                )}
              </div>

  );
}
