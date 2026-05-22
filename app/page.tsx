'use client';
import Image from 'next/image';
import LeadForm from '@/components/LeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { useLanguage } from '@/components/LanguageProvider';

export default function Page() {
  const { t, lang } = useLanguage();

  const pains = [
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      title: t.problem.items[0].title,
      desc: t.problem.items[0].desc,
    },
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: t.problem.items[1].title,
      desc: t.problem.items[1].desc,
    },
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t.problem.items[2].title,
      desc: t.problem.items[2].desc,
    },
  ];

  const steps = [
    {
      num: '1',
      title: t.method.items[0].title,
      desc: t.method.items[0].desc,
    },
    {
      num: '2',
      title: t.method.items[1].title,
      desc: t.method.items[1].desc,
    },
    {
      num: '3',
      title: t.method.items[2].title,
      desc: t.method.items[2].desc,
    },
  ];

  const bonuses = [
    {
      tag: t.offer.bonuses[0].tag,
      color: 'bg-sage-50 border-sage-100',
      badge: 'bg-sage text-white',
      title: t.offer.bonuses[0].title,
      desc: t.offer.bonuses[0].desc,
      value: '$29',
    },
    {
      tag: t.offer.bonuses[1].tag,
      color: 'bg-amber-50 border-amber-100',
      badge: 'bg-amber text-white',
      title: t.offer.bonuses[1].title,
      desc: t.offer.bonuses[1].desc,
      value: '$37',
    },
    {
      tag: t.offer.bonuses[2].tag,
      color: 'bg-cream-200 border-cream-300',
      badge: 'bg-forest text-white',
      title: t.offer.bonuses[2].title,
      desc: t.offer.bonuses[2].desc,
      value: '$19',
    },
    {
      tag: t.offer.bonuses[3].tag,
      color: 'bg-amber-50 border-amber',
      badge: 'bg-amber-600 text-white',
      title: t.offer.bonuses[3].title,
      desc: t.offer.bonuses[3].desc,
      value: '$9',
    },
  ];

  const testimonials = [
    {
      imgName: 'margaret',
      name: t.testimonials.items[0].name,
      role: t.testimonials.items[0].role,
      text: t.testimonials.items[0].text,
    },
    {
      imgName: 'robert',
      name: t.testimonials.items[1].name,
      role: t.testimonials.items[1].role,
      text: t.testimonials.items[1].text,
    },
    {
      imgName: 'linda',
      name: t.testimonials.items[2].name,
      role: t.testimonials.items[2].role,
      text: t.testimonials.items[2].text,
    },
  ];

  const tiers = [
    {
      id: 'basic',
      label: t.pricing.tiers[0].label,
      price: t.prices.basic,
      includes: t.pricing.tiers[0].includes,
      recommended: false,
      note: t.pricing.tiers[0].note,
    },
    {
      id: 'standard',
      label: t.pricing.tiers[1].label,
      sublabel: t.pricing.tiers[1].sublabel,
      price: t.prices.standard,
      originalPrice: t.prices.originalStandard,
      includes: t.pricing.tiers[1].includes,
      recommended: true,
      note: t.pricing.tiers[1].note,
    },
    {
      id: 'premium',
      label: t.pricing.tiers[2].label,
      price: t.prices.premium,
      includes: t.pricing.tiers[2].includes,
      recommended: false,
      note: t.pricing.tiers[2].note,
    },
  ];

  return (
    <>
      <StickyMobileCTA />
      <main className="min-h-screen">
        {/* NAV */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-cream-300 shadow-soft">
          <div className="container-lg flex items-center justify-between py-4 px-5 md:px-8">
            <span className="font-serif font-semibold text-forest text-lg leading-tight whitespace-pre-line">
              {t.nav.title}
            </span>
            <a href="#checkout" className="btn-primary" id="header-cta-button">
              {t.nav.cta} — {t.prices.standard}
            </a>
          </div>
        </nav>

        {/* HERO */}
        <section id="hero" className="gradient-hero section-pad">
          <div className="container-lg">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="section-label">{t.hero.label}</span>
                <h1 className="font-serif text-4xl md:text-5xl text-forest font-bold mb-6 text-balance leading-tight">
                  {t.hero.title}
                  <span className="text-sage">{t.hero.titleHighlight1}</span>
                  {t.hero.titleMiddle}
                  <span className="text-sage">{t.hero.titleHighlight2}</span>
                </h1>
                <p className="text-xl text-muted mb-8 text-balance">
                  {t.hero.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <a href="#lead-form" id="hero-cta" className="btn-primary text-xl no-underline inline-flex items-center justify-center">
                    {t.hero.cta} — {t.prices.standard}
                  </a>
                  <a href="/khao-sat" className="btn-secondary text-xl no-underline inline-flex items-center justify-center border-2 border-sage text-sage hover:bg-sage-50 bg-white">
                    Khám Bệnh (2 Phút)
                  </a>
                </div>
                <p className="text-muted text-sm mb-6">{t.hero.value}</p>
                <div className="flex flex-wrap gap-3 text-sm text-forest font-semibold">
                  {t.hero.tags.map(tag => (
                    <div key={tag} className="flex items-center gap-2 bg-sage-50 rounded-full px-4 py-2 border border-sage-100">
                      <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/3] md:aspect-auto md:h-[520px]">
                <Image
                  src="/images/hero.png"
                  alt="A peaceful senior woman meditating"
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
            <span>{t.trust}</span>
            {['Mayo Clinic', 'Harvard Health', 'NIH'].map(s => (
              <span key={s} className="bg-white/20 rounded-full px-4 py-1.5">{s}</span>
            ))}
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-12">
              <span className="section-label">{t.problem.label}</span>
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
              {t.problem.quote}
            </p>
          </div>
        </section>

        {/* AGITATION */}
        <section className="section-pad gradient-sage-soft">
          <div className="container-md text-center">
            <span className="section-label">{t.agitation.label}</span>
            <h2 className="font-serif text-3xl md:text-4xl text-forest font-bold mb-6">
              {t.agitation.h2}
            </h2>
            <p className="text-xl text-muted mb-4">
              {t.agitation.p1}
            </p>
            <p className="text-xl text-forest font-semibold">
              {t.agitation.p2_1}
              <span className="text-sage">{t.agitation.p2_2}</span>
            </p>
            <p className="text-lg text-muted mt-6">
              {t.agitation.p3}
            </p>
          </div>
        </section>

        {/* MECHANISM */}
        <section id="method" className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-12">
              <span className="section-label">{t.method.label}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-forest font-bold mb-4">
                {t.method.title}
              </h2>
              <div className="divider mx-auto mb-6" />
              <p className="text-lg text-muted max-w-2xl mx-auto">
                {t.method.desc}
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
            <div className="relative w-full max-w-lg mx-auto h-48 mb-8 rounded-2xl overflow-hidden opacity-80">
              <Image src="/images/method.png" alt="Method illustration" fill className="object-contain" sizes="512px" />
            </div>
            <p className="text-center text-xl font-serif font-semibold text-forest">
              {t.method.footer1}
              <span className="text-sage underline decoration-dotted">{t.method.footer2}</span>
            </p>
          </div>
        </section>

        {/* OFFER STACK */}
        <section id="included" className="section-pad gradient-amber-soft">
          <div className="container-lg">
            <div className="text-center mb-10">
              <span className="section-label">{t.offer.label}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-forest font-bold mb-2">
                {t.offer.title}
              </h2>
              <div className="divider mx-auto" />
            </div>

            <div className="card mb-4 border-2 border-sage">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <span className="section-label !mb-1">{t.offer.coreLabel}</span>
                  <h3 className="font-serif text-2xl font-bold text-forest mb-2">{t.offer.coreTitle}</h3>
                  <p className="text-muted mb-3">{t.offer.coreDesc}</p>
                  <ul className="space-y-1 text-sm text-forest">
                    {t.offer.coreIncludes.map(i => (
                      <li key={i} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-muted line-through text-sm">{t.offer.marketValue}</span>
                  <p className="font-serif font-bold text-3xl text-sage">$147</p>
                </div>
              </div>
            </div>

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

            <div className="card bg-sage text-white text-center border-0">
              <p className="text-sage-100 mb-1">{t.offer.totalValue}</p>
              <p className="font-serif text-5xl font-bold mb-2">$241</p>
              <p className="text-sage-100 text-lg mb-4">{t.offer.yourPrice}</p>
              <p className="font-serif text-6xl font-bold mb-4">{t.prices.standard}</p>
              <a href="#lead-form" id="stack-cta" className="inline-flex items-center justify-center gap-2 bg-white text-sage font-sans font-bold rounded-2xl px-8 py-4 text-lg hover:bg-cream transition-colors cursor-pointer no-underline">
                {t.offer.getEverything} {t.prices.standard}
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-10">
              <span className="section-label">{t.testimonials.label}</span>
              <h2 className="font-serif text-3xl font-bold text-forest">{t.testimonials.title}</h2>
              <div className="divider mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div key={t.name} className="card hover:shadow-cta transition-shadow duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-sage-100">
                      <Image src={`/images/${t.imgName}.png`} alt={t.name} fill className="object-cover object-top" sizes="56px" />
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
                <Image src="/images/guarantee.png" alt="Guarantee badge" fill className="object-contain" sizes="112px" />
              </div>
              <span className="section-label">{t.guarantee.label}</span>
              <h2 className="font-serif text-3xl font-bold text-forest mb-4">{t.guarantee.title}</h2>
              <p className="text-lg text-muted leading-relaxed">
                {t.guarantee.p1}<strong className="text-forest">{t.guarantee.p2}</strong>{t.guarantee.p3}
                <strong className="text-forest">{t.guarantee.p4}</strong>{t.guarantee.p5}
                <strong className="text-sage">{t.guarantee.p6}</strong>
              </p>
              <p className="text-forest font-semibold mt-4">{t.guarantee.footer}</p>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section-pad bg-white">
          <div className="container-lg">
            <div className="text-center mb-10">
              <span className="section-label">{t.pricing.label}</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-2">
                {t.pricing.title}
              </h2>
              <p className="text-muted">{t.pricing.desc}</p>
              <div className="divider mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {tiers.map(tData => (
                <div key={tData.id} className={`card relative flex flex-col ${tData.recommended ? 'border-2 border-sage shadow-cta scale-[1.02]' : 'border border-cream-300'}`}>
                  {tData.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-sage text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                        {tData.sublabel}
                      </span>
                    </div>
                  )}
                  <h3 className="font-serif text-xl font-bold text-forest mb-1">{tData.label}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-4xl font-bold text-sage">{tData.price}</span>
                    {tData.originalPrice && (
                      <span className="text-muted line-through text-lg">{tData.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted mb-4">{tData.note}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tData.includes.map(i => (
                      <li key={i} className="flex items-start gap-2 text-sm text-forest">
                        <svg className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {i}
                      </li>
                    ))}
                  </ul>
                  <a href="#lead-form" id={`pricing-cta-${tData.id}`} className={`${tData.recommended ? 'btn-primary' : 'btn-secondary'} text-center no-underline`}>
                    {t.pricing.chooseBtn} {tData.label}
                  </a>
                </div>
              ))}
            </div>

            {/* Lead Form */}
            <div id="lead-form" className="card max-w-md mx-auto border-2 border-sage">
              <h3 className="font-serif text-2xl font-bold text-forest mb-2 text-center">{t.pricing.formTitle}</h3>
              <p className="text-muted text-center text-sm mb-6">{t.pricing.formDesc}</p>
              <LeadForm tier="standard" />
            </div>
          </div>
        </section>

        {/* URGENCY */}
        <section className="section-pad bg-amber-50 border-t border-b border-amber-100">
          <div className="container-md text-center">
            <span className="section-label text-amber-600">{t.urgency.label}</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-forest mb-4">
              {t.urgency.title}
            </h2>
            <p className="text-lg text-muted mb-6">
              {t.urgency.p1}<strong className="text-forest">{t.urgency.p2}</strong>{t.urgency.p3}
              <strong className="text-forest">{t.urgency.p4}</strong>
            </p>
            <a href="#lead-form" id="urgency-cta" className="btn-primary no-underline inline-flex">
              {t.urgency.cta} — {t.prices.standard}
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section-pad bg-white">
          <div className="container-md">
            <div className="text-center mb-10">
              <span className="section-label">{t.faq.label}</span>
              <h2 className="font-serif text-3xl font-bold text-forest">{t.faq.title}</h2>
              <div className="divider mx-auto mt-4" />
            </div>
            <FAQAccordion />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section-pad gradient-sage-soft text-center">
          <div className="container-md">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-4">
              {t.finalCta.title}
            </h2>
            <p className="text-xl text-muted mb-8 max-w-xl mx-auto">
              {t.finalCta.desc}
            </p>
            <a href="#lead-form" id="final-cta" className="btn-primary text-xl no-underline inline-flex">
              {t.nav.cta} — {t.prices.standard}
            </a>
            <p className="text-muted text-sm mt-4">{t.finalCta.footer}</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-forest text-white py-10 px-5 text-center">
          <p className="font-serif text-xl font-semibold mb-2">{t.footer.title}</p>
          <p className="text-sage-200 text-sm mb-4">{t.footer.subtitle}</p>
          <p className="text-sage-300 text-xs">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {t.footer.title}. {t.footer.rights}
            <span className="mx-2">·</span>
            {t.footer.questions}
          </p>
          <p className="text-sage-400 text-xs mt-2">
            {t.footer.disclaimer}
          </p>
        </footer>

      </main>
    </>
  );
}
