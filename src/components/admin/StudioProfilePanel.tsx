"use client";

import type { Dispatch, SetStateAction } from "react";
import type { StudioSite } from "./studio-types";

interface StudioProfilePanelProps {
  active: boolean;
  site: StudioSite;
  setSite: Dispatch<SetStateAction<StudioSite>>;
  onSave: () => void;
}

export function StudioProfilePanel({ active, site, setSite, onSave }: StudioProfilePanelProps) {
  if (!active) return null;
  const inputClassName = "w-full rounded-xl border border-[#D1D5DB] bg-white px-3.5 py-2 text-sm text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]";
  return (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-6">
                <div className="border-b border-[#F3F4F6] pb-4">
                  <h2 className="text-lg font-bold text-[#111827]">Studio Contact & Info</h2>
                  <p className="text-xs text-[#6B7280]">Official numbers, email, Instagram handle, and studio location</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="studio-name" className="block text-xs font-bold uppercase text-[#374151] mb-1">Studio Name</label>
                    <input
                      id="studio-name"
                      type="text"
                      value={site.name || ""}
                      onChange={(e) => setSite({ ...site, name: e.target.value })}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="studio-tagline" className="block text-xs font-bold uppercase text-[#374151] mb-1">Tagline</label>
                    <input
                      id="studio-tagline"
                      type="text"
                      value={site.tagline || ""}
                      onChange={(e) => setSite({ ...site, tagline: e.target.value })}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="studio-phone" className="block text-xs font-bold uppercase text-[#374151] mb-1">Official Phone</label>
                    <input
                      id="studio-phone"
                      type="text"
                      value={site.contact?.phone || ""}
                      onChange={(e) =>
                        setSite({
                          ...site,
                          contact: {
                            ...site.contact,
                            phone: e.target.value,
                            phoneHref: `tel:${e.target.value.replace(/[^0-9+]/g, "")}`,
                          },
                        })
                      }
                      className={inputClassName}
                      placeholder="+971 50 222 5890"
                    />
                  </div>

                  <div>
                    <label htmlFor="studio-email" className="block text-xs font-bold uppercase text-[#374151] mb-1">Official Email</label>
                    <input
                      id="studio-email"
                      type="email"
                      value={site.contact?.email || ""}
                      onChange={(e) =>
                        setSite({
                          ...site,
                          contact: {
                            ...site.contact,
                            email: e.target.value,
                            emailHref: `mailto:${e.target.value.trim()}`,
                          },
                        })
                      }
                      className={inputClassName}
                      placeholder="mkanconcept@gmail.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="studio-instagram-handle" className="block text-xs font-bold uppercase text-[#374151] mb-1">Instagram Handle</label>
                    <input
                      id="studio-instagram-handle"
                      type="text"
                      value={site.contact?.instagramHandle || ""}
                      onChange={(e) =>
                        setSite({
                          ...site,
                          contact: { ...site.contact, instagramHandle: e.target.value },
                        })
                      }
                      className={inputClassName}
                      placeholder="@mkan.concept"
                    />
                  </div>

                  <div>
                    <label htmlFor="studio-instagram-url" className="block text-xs font-bold uppercase text-[#374151] mb-1">Instagram Link</label>
                    <input
                      id="studio-instagram-url"
                      type="text"
                      value={site.contact?.instagramUrl || ""}
                      onChange={(e) =>
                        setSite({
                          ...site,
                          contact: { ...site.contact, instagramUrl: e.target.value },
                        })
                      }
                      className={inputClassName}
                      placeholder="https://instagram.com/mkan.concept"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="studio-location" className="block text-xs font-bold uppercase text-[#374151] mb-1">Physical Location</label>
                    <input
                      id="studio-location"
                      type="text"
                      value={site.contact?.location || ""}
                      onChange={(e) =>
                        setSite({
                          ...site,
                          contact: { ...site.contact, location: e.target.value },
                        })
                      }
                      className={inputClassName}
                      placeholder="Wasl 51, Dubai, UAE"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F3F4F6] flex justify-end">
                  <button
                    type="button"
                    onClick={onSave}
                    className="rounded-xl bg-[#1A060E] px-5 py-2.5 text-xs font-bold text-[#DDB78A] transition-all hover:bg-[#2A0A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                  >
                    Save Profile
                  </button>
                </div>
              </div>

  );
}
