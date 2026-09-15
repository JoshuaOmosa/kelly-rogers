// app/services/page.tsx
import Link from 'next/link';

export default function Services() {
  return (
    <main className="bg-[#F8F1E9] min-h-screen font-sans text-[#1E1E1E]">

      {/* HERO */}
      <div className="max-w-[1100px] mx-auto text-center pt-12 pb-8 px-6">
        <h1 className="font-serif text-[32px] md:text-[44px] leading-tight text-[#1A1A1A]">
          Divorce Coaching & Life Transition Support
        </h1>
        <p className="font-sans font-semibold text-[14px] md:text-[15px] mt-3 max-w-[700px] mx-auto leading-snug">
          Compassionate, evidence-based support for navigating divorce, separation, and life transitions—tailored to your needs, your pace, and your goals.
        </p>
        <div className="flex justify-center mt-4 text-[#4A7C80] opacity-60">
          <svg width="80" height="10" viewBox="0 0 80 10"><path d="M0 5 Q20 0 40 5 T80 5" fill="none" stroke="currentColor" strokeWidth="0.8" /></svg>
        </div>
      </div>

      {/* 3 CARDS */}
      <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-3 gap-8 pb-12">

        {/* Card 1 */}
        <div className="bg-white rounded-[6px] shadow-[0_6px_20px_rgba(0,0,0,0.07)] p-6 flex flex-col items-center text-center">
          <div className="w-[72px] h-[72px] bg-[#9BB8B2] rounded-[22px] rotate-[-6deg] flex items-center justify-center mb-4">
            <span className="text-[28px] rotate-[6deg]">🤝</span>
          </div>
          <h3 className="font-serif text-[#3B6B6E] text-[20px]">Divorce Coaching</h3>
          <p className="text-[12px] font-bold leading-[1.4] mt-2">Practical, supportive guidance to help you move forward with clarity and confidence during divorce or separation.</p>
          <ul className="text-left text-[11px] mt-3 w-full list-disc pl-4 space-y-[1px] font-medium">
            <li>Decision-making & co-parenting strategies</li>
            <li>Communication skills for difficult conversations</li>
            <li>Goal-setting for post-divorce life</li>
            <li>Emotional regulation & resilience tools</li>
          </ul>
          <Link href="/divorce-coaching" className="mt-4 w-full bg-[#4A7C80] hover:bg-[#3D6A6D] text-white text-[13px] py-1.5 rounded-[6px] text-center">Learn More</Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[6px] shadow-[0_6px_20px_rgba(0,0,0,0.07)] p-6 flex flex-col items-center text-center">
          <div className="w-[72px] h-[72px] bg-[#D8DCC5] rounded-[22px] rotate-[-6deg] flex items-center justify-center mb-4">
            <span className="text-[28px] rotate-[6deg]">🧠</span>
          </div>
          <h3 className="font-serif text-[#3B6B6E] text-[19px] leading-tight">Counselling & Stress Management</h3>
          <p className="text-[12px] font-bold leading-[1.4] mt-2">Therapeutic support to manage stress, anxiety, and emotional challenges during transition.</p>
          <ul className="text-left text-[11px] mt-3 w-full list-disc pl-4 space-y-[1px] font-medium">
            <li>Anxiety & stress coping strategies</li>
            <li>Processing grief, loss & identity change</li>
            <li>Mindfulness & grounding techniques</li>
            <li>Building self-compassion & boundaries</li>
          </ul>
          <Link href="/coaching" className="mt-4 w-full bg-[#4A7C80] hover:bg-[#3D6A6D] text-white text-[13px] py-1.5 rounded-[6px] text-center">Learn More</Link>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[6px] shadow-[0_6px_20px_rgba(0,0,0,0.07)] p-6 flex flex-col items-center text-center">
          <div className="w-[72px] h-[72px] bg-[#9BB8B2] rounded-[22px] rotate-[-6deg] flex items-center justify-center mb-4">
            <span className="text-[28px] rotate-[6deg]">🛡️</span>
          </div>
          <h3 className="font-serif text-[#3B6B6E] text-[20px]">Clinical Support</h3>
          <p className="text-[12px] font-bold leading-[1.4] mt-2">Evidence-based clinical intervention for mental health concerns and complex life stress.</p>
          <ul className="text-left text-[11px] mt-3 w-full list-disc pl-4 space-y-[1px] font-medium">
            <li>Trauma-informed care & assessment</li>
            <li>Mood & emotional wellbeing support</li>
            <li>Referrals & treatment planning</li>
            <li>Collaboration with other providers</li>
          </ul>
          <Link href="/process" className="mt-4 w-full bg-[#4A7C80] hover:bg-[#3D6A6D] text-white text-[13px] py-1.5 rounded-[6px] text-center">Learn More</Link>
        </div>
      </div>

      {/* COACHING VS THERAPY */}
      <div className="bg-[#FFFBF6]/60 py-8">
        <h2 className="font-serif text-[30px] text-center mb-4">Coaching vs Therapy</h2>
        <div className="max-w-[760px] mx-auto border border-[#E5DDD3] rounded-[6px] overflow-hidden bg-white">
          <div className="grid grid-cols-[110px_1fr_1fr] bg-[#8FB0AA] text-white text-[13px] font-bold text-center">
            <div className="py-1.5"></div>
            <div className="py-1.5 border-l border-white/20">COACHING</div>
            <div className="py-1.5 border-l border-white/20">THERAPY</div>
          </div>
          {[
            { label: 'Focus', c: 'Future-focused, action-oriented, growth & transition', t: 'Clinical exploration, mental health, emotional healing' },
            { label: 'Approach', c: 'Practical strategies, accountability, goal setting', t: 'Therapeutic, evidence-based, reflective process' },
            { label: 'Best for', c: 'Navigating divorce, life change, moving forward', t: 'Anxiety, depression, trauma, complex mental health' },
            { label: 'Session Style', c: 'Collaborative, practical, supportive', t: 'Clinical, exploratory, confidential' },
            { label: 'Duration', c: 'Short to medium term, goal-driven', t: 'Flexible, ongoing as needed' },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-[110px_1fr_1fr] text-[11px] border-t border-[#EEE8E0]">
              <div className="py-1.5 px-2 font-bold bg-[#FFFBF6]">{row.label}</div>
              <div className="py-1.5 px-2 border-l">{row.c}</div>
              <div className="py-1.5 px-2 border-l">{row.t}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] font-bold mt-3">Not sure which is right for you? We'll discuss this in your initial consultation to find the best fit.</p>
      </div>

      {/* CTA */}
      <div className="bg-[#7FA9A3] text-center py-6 text-white">
        <h3 className="font-serif text-[18px]">Ready to take the next step?</h3>
        <p className="font-sans text-[13px] mt-1">Book a free 15-minute consultation to talk through your needs.</p>
        <Link href="/contact" className="inline-block mt-3 bg-[#E8DCCF] text-[#1A1A1A] px-5 py-1.5 rounded-[6px] text-[12px] font-medium">Schedule Your Free Consult</Link>
      </div>

      {/* FOOTER - same as your layout */}
      <div className="bg-[#2A2A2A] text-[#E8DCCF] text-center text-[11px] py-2.5 tracking-wide">
        © 2024 Kelly Rogers PhD • Clinical & Counselling Psychologist • Brisbane, QLD • hello@kellyrogerspsych.com • 0412 345 678
      </div>
    </main>
  );
}