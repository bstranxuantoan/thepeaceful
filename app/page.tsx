import Image from 'next/image'
import LeadForm from '@/components/LeadForm'
import FAQAccordion from '@/components/FAQAccordion'
import StickyMobileCTA from '@/components/StickyMobileCTA'

const pains = [
  {
    icon: (
      <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    title: 'Can\'t Fall Asleep',
    desc: 'Lying awake at 2am, mind spinning through worries — exhausted but unable to rest no matter what you try.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Lonely & Invisible',
    desc: 'Family is busy, old friends have drifted away. Days feel long, empty, and without purpose or connection.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Exhausted & Anxious',
    desc: 'Chronic fatigue, body aches, health worries. Your doctor says "reduce stress" — but nobody shows you how.',
  },
]

const steps = [
  {
    num: '1',
    title: 'ANCHOR',
    desc: 'Choose one personal grounding word that signals your brain: "It\'s safe to rest now." This single word becomes your daily reset.',
  },
  {
    num: '2',
    title: 'BREATHE',
    desc: 'A breathing pattern adapted specifically for the slower, natural rhythm of the 60+ body. No strain, no effort — just ease.',
  },
  {
    num: '3',
    title: 'DRIFT',
    desc: 'A guided visualization that gently replaces the mental "to-do loop" with peaceful, healing imagery. Your mind finally lets go.',
  },
]

const bonuses = [
  {
    tag: 'BONUS A',
    color: 'bg-sage-50 border-sage-100',
    badge: 'bg-sage text-white',
    title: '"Tonight\'s Sleep" — Emergency Calm Session',
    desc: 'One 5-minute video for when you need calm RIGHT NOW. Baked-in before you even finish reading this.',
    value: '$29',
  },
  {
    tag: 'BONUS B',
    color: 'bg-amber-50 border-amber-100',
    badge: 'bg-amber text-white',
    title: '"Worry-Free Morning" — 7-Day Audio Series',
    desc: '7 audio-only sessions (5 min each). Just close your eyes and listen. No screen, no tech required.',
    value: '$37',
  },
  {
    tag: 'BONUS G',
    color: 'bg-cream-200 border-cream-300',
    badge: 'bg-forest text-white',
    title: '"Doctor\'s Notes" — Science PDF',
    desc: 'Clinical research from Mayo Clinic, Harvard Health & NIH in plain English. Answers: "Will this really work for me?"',
    value: '$19',
  },
  {
    tag: '⚡ BONUS F — 48h Only',
    color: 'bg-amber-50 border-amber',
    badge: 'bg-amber-600 text-white',
    title: '"Start Tonight" — Quick-Start Checklist',
    desc: 'One page. Three minutes. Everything you need to do your first session tonight.',
    value: '$9',
  },
]

const testimonials = [
  {
    name: 'Margaret T., 67',
    role: 'Retired Teacher · Phoenix, AZ',
    text: 'I\'ve struggled with insomnia for 12 years. After the first week of the 3-Breath Anchor, I was falling asleep before 10pm. I can\'t believe something this simple works this well.',
  },
  {
    name: 'Robert K., 71',
    role: 'Retired Engineer · Portland, OR',
    text: 'My doctor told me to reduce stress after my blood pressure spiked. I didn\'t know how. This program gave me something real to do every morning. My readings have improved and I feel calmer than I have in years.',
  },
  {
    name: 'Linda M., 64',
    role: 'Retired Nurse · Tampa, FL',
    text: 'Since my husband passed, the nights felt endless. The guided sessions gave me something peaceful to look forward to. I sleep through the night now. I feel like myself again.',
  },
]

const tiers = [
  {
    id: 'basic',
    label: 'Book Only',
    price: '20.000đ',
    includes: ['120-page companion book (PDF)'],
    recommended: false,
    note: 'No guided video sessions',
  },
  {
    id: 'standard',
    label: 'Full Bundle',
    sublabel: 'BEST VALUE',
    price: '50.000đ',
    originalPrice: '729.000đ',
    includes: [
      'Book + 21 Video Sessions (10 min each)',
      'Tonight\'s Sleep Emergency Session',
      'Worry-Free Morning Audio Series',
      'Doctor\'s Notes Science PDF',
      'Start Tonight Checklist (48h only)',
    ],
    recommended: true,
    note: 'Tổng giá trị hơn 6.500.000đ',
  },
  {
    id: 'premium',
    label: 'Premium + Support',
    price: '100.000đ',
    includes: [
      'Everything in Full Bundle',
      '30-Day Personal Email Support',
    ],
    recommended: false,
    note: 'For those who want personal guidance',
  },
]

export default function Page() {
  return (
    <>
      <StickyMobileCTA />
      <main className="min-h-screen">

        {/* NAV */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-cream-300 shadow-soft">
          <div className="container-lg flex items-center justify-between py-4 px-5 md:px-8">
            <span className="font-serif font-semibold text-forest text-lg leading-tight">
              The Peaceful Mind<br className="hidden sm:block" /> Method
            </span>
            <a href="#pricing" id="nav-cta" className="btn-primary text-sm px-5 py-2.5 no-underline">
              Get Access — $14.97
            </a>
          </div>
        </nav>

        {/* HERO */}
        <section id="hero" className="gradient-hero section-pad">
          <div className="container-lg">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left — copy */}
              <div>
                <span className="section-label">For Adults 60+ Who Deserve to Feel Well Again</span>
                <h1 className="font-serif text-4xl md:text-5xl text-forest font-bold mb-6 text-balance leading-tight">
                  Finally — A Simple 10-Minute Daily Practice That Helps You{' '}
                  <span className="text-sage">Sleep Deeply</span>, Feel Calm, and{' '}
                  <span className="text-sage">Enjoy Life Again</span>
                </h1>
                <p className="text-xl text-muted mb-8 text-balance">
                  The <strong className="text-forest">3-Breath Anchor Method</strong>: designed specifically for the 60+ nervous system.
                  No apps. No prior experience. Works from the very first night.
                </p>
                <a href="#pricing" id="hero-cta" className="btn-primary text-xl mb-4 no-underline inline-flex">
                  Get Instant Access — $14.97
                </a>
                <p className="text-muted text-sm mb-6">$241 total value · Launch price ends soon</p>
                <div className="flex flex-wrap gap-3 text-sm text-forest font-semibold">
              {['No App Required', 'Works in 10 Minutes', '90-Day Peace Promise'].map(t => (
                <div key={t} className="flex items-center gap-2 bg-sage-50 rounded-full px-4 py-2 border border-sage-100">
                  <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </div>
              ))}
                </div>
              </div>
              {/* Right — hero image */}
              <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/3] md:aspect-auto md:h-[520px]">
                <Image
                  src="/images/hero.png"
                  alt="A peaceful senior woman meditating in soft morning light"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="bg-sage py-5 px-5" aria-label="Research backing">
          <div className="container-lg flex flex-wrap items-center justify-center gap-6 text-white text-sm font-semibold opacity-90">
            <span>Backed by research from:</span>
            {['Mayo Clinic', 'Harvard Health', 'NIH'].map(s => (
              <span key={s} className="bg-white/20 rounded-full px-4 py-1.5">{s}</span>
            ))}
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-12">
              <span className="section-label">Does This Sound Like You?</span>
              <div className="divider mx-auto mb-6" />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {pains.map(p => (
                <div key={p.title} className="card text-center hover:shadow-cta transition-shadow duration-200">
                  <div className="w-16 h-16 bg-sage-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {p.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-forest mb-3">{p.title}</h3>
                  <p className="text-muted text-base">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xl text-forest font-serif italic">
              "If any of this feels familiar — you are not alone. And it is not your fault."
            </p>
          </div>
        </section>

        {/* AGITATION */}
        <section className="section-pad gradient-sage-soft">
          <div className="container-md text-center">
            <span className="section-label">Why Nothing Has Worked</span>
            <h2 className="font-serif text-3xl md:text-4xl text-forest font-bold mb-6">
              You&apos;ve tried apps. YouTube videos. Maybe even a book or two.
            </h2>
            <p className="text-xl text-muted mb-4">
              But at 2am, when your mind is spinning and sleep feels impossible — nothing helps.
            </p>
            <p className="text-xl text-forest font-semibold">
              Here&apos;s why: Most meditation tools were designed for 30-year-olds with busy schedules and tech-savvy habits.{' '}
              <span className="text-sage">Not for you.</span>
            </p>
            <p className="text-lg text-muted mt-6">
              The 60+ mind and body work differently. You need something simpler. Gentler.
              Built for exactly where you are in life right now.
            </p>
          </div>
        </section>

        {/* MECHANISM */}
        <section id="method" className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-12">
              <span className="section-label">The Method</span>
              <h2 className="font-serif text-3xl md:text-4xl text-forest font-bold mb-4">
                Introducing: The 3-Breath Anchor Method
              </h2>
              <div className="divider mx-auto mb-6" />
              <p className="text-lg text-muted max-w-2xl mx-auto">
                The only daily practice designed specifically for the 60+ nervous system —
                which responds better to simple, repeatable rituals than constant novelty.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {steps.map(s => (
                <div key={s.num} className="relative card border-l-4 border-sage hover:shadow-cta transition-shadow duration-200">
                  <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center mb-4">
                    <span className="font-serif font-bold text-white text-xl">{s.num}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-sage mb-3 tracking-wide">{s.title}</h3>
                  <p className="text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
            {/* Method illustration */}
            <div className="relative w-full max-w-lg mx-auto h-48 mb-8 rounded-2xl overflow-hidden opacity-80">
              <Image src="/images/method.png" alt="3-Breath Anchor Method illustration" fill className="object-contain" sizes="512px" />
            </div>
            <p className="text-center text-xl font-serif font-semibold text-forest">
              Three steps. Three minutes to learn. Works from{' '}
              <span className="text-sage underline decoration-dotted">Night One.</span>
            </p>
          </div>
        </section>

        {/* OFFER STACK */}
        <section id="included" className="section-pad gradient-amber-soft">
          <div className="container-lg">
            <div className="text-center mb-10">
              <span className="section-label">What You Get</span>
              <h2 className="font-serif text-3xl md:text-4xl text-forest font-bold mb-2">
                Here&apos;s Everything Included Today
              </h2>
              <div className="divider mx-auto" />
            </div>

            {/* Core */}
            <div className="card mb-4 border-2 border-sage">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <span className="section-label !mb-1">Core Program</span>
                  <h3 className="font-serif text-2xl font-bold text-forest mb-2">The Peaceful Mind Method</h3>
                  <p className="text-muted mb-3">21 guided video sessions (10 min each) + 120-page companion book (PDF). Your complete 21-day journey to better sleep, less stress, and renewed joy.</p>
                  <ul className="space-y-1 text-sm text-forest">
                    {['21 video sessions × 10 minutes', '120-page PDF companion book', 'Morning, evening & emergency calm practices'].map(i => (
                      <li key={i} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-muted line-through text-sm">Market value</span>
                  <p className="font-serif font-bold text-3xl text-sage">$147</p>
                </div>
              </div>
            </div>

            {/* Bonuses */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {bonuses.map(b => (
                <div key={b.tag} className={`card border ${b.color}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className={`${b.badge} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>{b.tag}</span>
                    <span className="font-serif font-bold text-xl text-sage">{b.value}</span>
                  </div>
                  <h4 className="font-serif font-semibold text-forest mb-2">{b.title}</h4>
                  <p className="text-muted text-sm">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Value summary */}
            <div className="card bg-sage text-white text-center border-0">
              <p className="text-sage-100 mb-1">Total Value</p>
              <p className="font-serif text-5xl font-bold mb-2">$241</p>
              <p className="text-sage-100 text-lg mb-4">Your price today (launch week only)</p>
              <p className="font-serif text-6xl font-bold mb-4">$14.97</p>
              <a href="#pricing" id="stack-cta" className="inline-flex items-center justify-center gap-2 bg-white text-sage font-sans font-bold rounded-2xl px-8 py-4 text-lg hover:bg-cream transition-colors cursor-pointer no-underline">
                Get Everything for $14.97
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-10">
              <span className="section-label">Real Stories</span>
              <h2 className="font-serif text-3xl font-bold text-forest">What Our Members Are Saying</h2>
              <div className="divider mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div key={t.name} className="card hover:shadow-cta transition-shadow duration-200">
                  {/* Avatar */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-sage-100">
                      <Image
                        src={`/images/${t.name.split(',')[0].split(' ')[0].toLowerCase()}.png`}
                        alt={t.name}
                        fill
                        className="object-cover object-top"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-forest text-sm">{t.name}</p>
                      <p className="text-muted text-xs">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-forest italic mb-4 text-base leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section id="guarantee" className="section-pad gradient-sage-soft">
          <div className="container-md text-center">
            <div className="card max-w-2xl mx-auto border-2 border-sage">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <Image src="/images/guarantee.png" alt="90-Day Peace Promise badge" fill className="object-contain" sizes="112px" />
              </div>
              <span className="section-label">Our Promise to You</span>
              <h2 className="font-serif text-3xl font-bold text-forest mb-4">The 90-Day Peace Promise</h2>
              <p className="text-lg text-muted leading-relaxed">
                Try The Peaceful Mind Method for <strong className="text-forest">90 full days</strong>.
                Do the 10-minute practice. If you don&apos;t sleep better, feel calmer, or find any value whatsoever —
                email us for a <strong className="text-forest">full refund</strong>. No questions asked.{' '}
                <strong className="text-sage">And you keep the book, all 21 videos, and every single bonus.</strong>
              </p>
              <p className="text-forest font-semibold mt-4">That&apos;s how certain we are this works for you.</p>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-10">
              <span className="section-label">Choose Your Path</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-2">
                Start Your Journey Today
              </h2>
              <p className="text-muted">Launch price ends soon — choose the plan that&apos;s right for you</p>
              <div className="divider mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {tiers.map(t => (
                <div
                  key={t.id}
                  className={`card relative flex flex-col ${t.recommended ? 'border-2 border-sage shadow-cta scale-[1.02]' : 'border border-cream-300'}`}
                >
                  {t.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-sage text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                        {t.sublabel}
                      </span>
                    </div>
                  )}
                  <h3 className="font-serif text-xl font-bold text-forest mb-1">{t.label}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-4xl font-bold text-sage">{t.price}</span>
                    {t.originalPrice && (
                      <span className="text-muted line-through text-lg">{t.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted mb-4">{t.note}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {t.includes.map(i => (
                      <li key={i} className="flex items-start gap-2 text-sm text-forest">
                        <svg className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {i}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#lead-form"
                    id={`pricing-cta-${t.id}`}
                    className={`${t.recommended ? 'btn-primary' : 'btn-secondary'} text-center no-underline`}
                  >
                    Choose {t.label}
                  </a>
                </div>
              ))}
            </div>

            {/* Lead Form */}
            <div id="lead-form" className="card max-w-md mx-auto border-2 border-sage">
              <h3 className="font-serif text-2xl font-bold text-forest mb-2 text-center">Get Instant Access</h3>
              <p className="text-muted text-center text-sm mb-6">Enter your details below to receive the Full Bundle</p>
              <LeadForm tier="standard" />
            </div>
          </div>
        </section>

        {/* URGENCY */}
        <section className="section-pad bg-amber-50 border-t border-b border-amber-100">
          <div className="container-md text-center">
            <span className="section-label text-amber-600">Limited Time</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-forest mb-4">
              This launch price disappears soon
            </h2>
            <p className="text-lg text-muted mb-6">
              The Full Bundle returns to <strong className="text-forest">729.000đ</strong> after launch week ends.
              The &ldquo;Start Tonight&rdquo; checklist (Bonus F) expires{' '}
              <strong className="text-forest">48 hours after purchase.</strong>
            </p>
            <a href="#lead-form" id="urgency-cta" className="btn-primary no-underline inline-flex">
              Lock In 50.000đ Now
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section-pad bg-white">
          <div className="container-md">
            <div className="text-center mb-10">
              <span className="section-label">Questions & Answers</span>
              <h2 className="font-serif text-3xl font-bold text-forest">Everything You Need to Know</h2>
              <div className="divider mx-auto mt-4" />
            </div>
            <FAQAccordion />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section-pad gradient-sage-soft text-center">
          <div className="container-md">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-4">
              You deserve to sleep through the night.
            </h2>
            <p className="text-xl text-muted mb-8 max-w-xl mx-auto">
              10 minutes a day. 21 days. The rest of your life, changed.
            </p>
            <a href="#lead-form-standard" id="final-cta" className="btn-primary text-xl no-underline inline-flex">
              Get Instant Access — $14.97
            </a>
            <p className="text-muted text-sm mt-4">Instant delivery · 90-Day Peace Promise · $241 value</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-forest text-white py-10 px-5 text-center">
          <p className="font-serif text-xl font-semibold mb-2">The Peaceful Mind Method</p>
          <p className="text-sage-200 text-sm mb-4">Calm Your Mind. Sleep Better. Feel Alive Again.</p>
          <p className="text-sage-300 text-xs">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> The Peaceful Mind Method. All rights reserved.
            <span className="mx-2">·</span>
            Questions? Email us anytime.
          </p>
          <p className="text-sage-400 text-xs mt-2">
            Results may vary. This product is for educational and wellness purposes only and is not a substitute for medical advice.
          </p>
        </footer>

      </main>
    </>
  )
}
