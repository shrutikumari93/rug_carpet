const About = () => {
  return (
    <div>
      {/* Split hero: image left, text right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <p className="text-clay-500 font-medium mb-3 uppercase tracking-widest text-xs">Our story</p>
          <h1 className="font-display text-4xl sm:text-5xl font-700 text-clay-900 leading-tight mb-6">
            Woven by hand,<br />chosen with care.
          </h1>
          <p className="text-clay-700 text-base sm:text-lg leading-relaxed mb-4">
            Weftly started with a simple idea: floors deserve as much thought as anything else in a
            home. We work directly with weavers and small mills to bring rugs and carpets that are
            built to last, not just to photograph well.
          </p>
          <p className="text-clay-700 text-base sm:text-lg leading-relaxed">
            Every product on this site is checked for material quality, weave density, and durability
            before it's listed — because a floor covering is a long-term relationship, not an impulse buy.
          </p>
        </div>
        <div className="order-1 md:order-2 relative aspect-[4/5] rounded-3xl overflow-hidden bg-clay-200">
          <img
            src="https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?w=900"
            alt="Artisan weaving a rug"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Rug vs carpet explainer, with small photo collage */}
      <section className="bg-clay-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80"
                alt="A rug"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden mt-8">
              <img
                src="https://americanorientalrug.com/cdn/shop/products/A18399_20AOR.jpg?v=1696321756"
                alt="A carpet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl font-700 text-clay-900 mb-4">Rug or carpet — what's the difference?</h2>
            <p className="text-clay-700 leading-relaxed mb-3">
              A <strong className="text-clay-900">rug</strong> is a movable piece — easy to swap in
              and out as your space changes, layer over hard flooring, or shift room to room.
            </p>
            <p className="text-clay-700 leading-relaxed">
              A <strong className="text-clay-900">carpet</strong> is a more permanent choice, fitted
              wall-to-wall for warmth and comfort underfoot. We carry both, so whichever fits your
              home, you'll find it here.
            </p>
          </div>
        </div>
      </section>

      {/* Values with icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-700 text-clay-900 mb-10 text-center">Why people choose Weftly</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-clay-100 flex items-center justify-center mx-auto mb-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8A4E25" strokeWidth="1.8">
                <path d="M4 12l1.5-7h13L20 12M4 12l1 8h14l1-8M4 12h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-700 text-clay-900 mb-2">Hand-checked quality</h3>
            <p className="text-sm text-clay-600 leading-relaxed">
              Every piece is inspected for weave density and material quality before it's listed.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-clay-100 flex items-center justify-center mx-auto mb-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8A4E25" strokeWidth="1.8">
                <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21 7.5 13.5 2 9h7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-700 text-clay-900 mb-2">Sourced directly</h3>
            <p className="text-sm text-clay-600 leading-relaxed">
              We buy straight from weavers and small mills — no unnecessary middlemen.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-clay-100 flex items-center justify-center mx-auto mb-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8A4E25" strokeWidth="1.8">
                <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" strokeLinecap="round" />
                <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-700 text-clay-900 mb-2">Built to last</h3>
            <p className="text-sm text-clay-600 leading-relaxed">
              A floor covering is a long-term relationship, not an impulse buy — we design for years, not seasons.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;