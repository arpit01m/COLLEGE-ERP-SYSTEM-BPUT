import React, { useState } from 'react';
import { Calendar, MapPin, Users, Tag, Clock, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Bell } from 'lucide-react';

export default function FeaturedEventsCarousel({ events, onRegister, registeredEventIds = [], onOpenReminderModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollIndex, setScrollIndex] = useState(0);

  const categories = [
    'All',
    'Hackathons',
    'Cultural Events',
    'Sports',
    'Workshops',
    'Placement Events',
    'Seminars'
  ];

  const filteredEvents = events.filter(
    (e) => activeCategory === 'All' || e.category === activeCategory
  );

  const handleNext = () => {
    if (scrollIndex < filteredEvents.length - 1) {
      setScrollIndex(scrollIndex + 1);
    } else {
      setScrollIndex(0);
    }
  };

  const handlePrev = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    } else {
      setScrollIndex(filteredEvents.length - 1);
    }
  };

  return (
    <section id="events" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>MODULE 1: EVENTS MANAGEMENT</span>
          </div>
          <h2 className="text-3xl font-black text-white">Upcoming Campus Events</h2>
          <p className="text-gray-400 text-sm mt-1">
            Discover technical symposiums, cultural fests, sports meets, hackathons, and placement drives.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-[#111d3d] border border-white/10 text-gray-300 hover:text-white hover:border-[#ccff00] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-[#111d3d] border border-white/10 text-gray-300 hover:text-white hover:border-[#ccff00] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setScrollIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#ccff00] text-[#0b132b] shadow-[0_0_12px_rgba(204,255,0,0.3)] font-bold'
                : 'bg-[#111d3d] text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid / Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const isRegistered = registeredEventIds.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="glass-card overflow-hidden flex flex-col group border border-white/10 hover:border-[#ccff00]/40 transition-all duration-300"
            >
              {/* Event Image Banner with Date Badge */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={evt.banner}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b] via-transparent to-black/30"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="badge-neon backdrop-blur-md">
                    {evt.category}
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute bottom-3 left-3 bg-[#0b132b]/90 border border-white/10 rounded-xl px-3 py-1 flex items-center gap-1.5 backdrop-blur-md text-xs font-bold text-white">
                  <Calendar className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>{evt.date}</span>
                </div>
              </div>

              {/* Event Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#ccff00] transition-colors leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-gray-300 border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Organizer: <strong className="text-white">{evt.organizer}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-amber-400 font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Deadline: {evt.registrationDeadline}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onRegister(evt.id)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      isRegistered
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'neon-btn py-2.5 text-xs'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Registered</span>
                      </>
                    ) : (
                      <>
                        <span>Register Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onOpenReminderModal(evt)}
                    title="Set Automated Reminder"
                    className="p-2.5 rounded-xl bg-[#111d3d] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-[#ccff00] transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
