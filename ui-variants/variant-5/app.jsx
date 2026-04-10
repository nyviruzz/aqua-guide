const { useState } = React;

const queryStateFive = new URLSearchParams(window.location.search).get("state");
const initialFive = ["interaction", "feature"].includes(queryStateFive) ? queryStateFive : "home";

function App() {
  const [view, setView] = useState(initialFive);

  const updateView = (next) => {
    setView(next);
    const url = new URL(window.location.href);
    url.searchParams.set("state", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(118,197,214,0.24),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(211,165,90,0.22),_transparent_24%),linear-gradient(180deg,_#fff8f0_0%,_#fffdf8_100%)]">
      <main className="mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[36px] border border-slate-900/10 bg-white/70 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="inline-flex rounded-full border border-reef/10 bg-reef px-4 py-2 text-xs uppercase tracking-[0.28em] text-shell">
                Aqua Guide / Tide Story
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-5xl leading-tight text-reef lg:text-7xl">
                A pitch-ready narrative surface that tells the water story for you.
              </h1>
            </div>
            <div className="flex rounded-full bg-white p-2 shadow-lg">
              {[
                ["home", "Hero"],
                ["interaction", "Action plan"],
                ["feature", "Impact panel"]
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => updateView(key)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    view === key ? "bg-reef text-white" : "text-slatebay"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[36px] bg-[linear-gradient(135deg,_#0f4c5c,_#1b6676)] p-8 text-white shadow-[0_24px_80px_rgba(15,76,92,0.18)]">
                <div className="text-xs uppercase tracking-[0.28em] text-white/60">Narrative hero</div>
                <h2 className="mt-4 max-w-xl font-display text-5xl leading-tight">
                  Most people do not need more data. They need a calm answer.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-8 text-white/78">
                  This direction is built for presentations. It frames Aqua Guide
                  as a story with a clear tension, a clear solution, and a clean
                  final payoff in under two minutes.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Broad audience</span>
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Beautiful demo</span>
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm">AI assist optional</span>
                </div>
              </article>

              <article className="rounded-[36px] border border-slate-900/10 bg-white/75 p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-slatebay">Story arc</div>
                <div className="mt-5 space-y-4">
                  {[
                    ["Problem", "Water alerts are technical and stressful."],
                    ["Search", "Type a location and reveal a clear status."],
                    ["Act", "Get household next steps immediately."],
                    ["Scale", "Utilities and campuses could embed the same interface."]
                  ].map(([title, text], index) => (
                    <div key={title} className="flex gap-4 rounded-[24px] bg-shell p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-reef text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-reef">{title}</div>
                        <div className="mt-1 text-sm leading-6 text-slatebay">{text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <article className="rounded-[34px] border border-slate-900/10 bg-white/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-slatebay">Featured result</div>
                    <h3 className="mt-3 text-3xl font-semibold text-reef">Riverside zone update</h3>
                  </div>
                  <button
                    onClick={() => updateView("interaction")}
                    className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-slate-950"
                  >
                    Show plan
                  </button>
                </div>
                <div className="mt-6 rounded-[28px] bg-shell p-5">
                  <div className="text-sm uppercase tracking-[0.24em] text-slatebay">Status</div>
                  <div className="mt-3 text-4xl font-semibold text-reef">
                    {view === "home" ? "Caution" : "Boil before drinking"}
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-7 text-slatebay">
                    The system turns a dense advisory into one headline, one explanation, and one household plan.
                  </p>
                </div>
              </article>

              <article className="rounded-[34px] border border-slate-900/10 bg-[linear-gradient(180deg,_rgba(118,197,214,0.18),_rgba(255,255,255,0.88))] p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-slatebay">Main action cards</div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Drink", "Use boiled or bottled water until cleared."],
                    ["Cook", "Prepare food with safe stored water."],
                    ["Review", "Check the next update at 6 PM."],
                    ["Ask Aqua", "Get one plain-language answer fast."]
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-[24px] bg-white/80 p-4 shadow-sm">
                      <div className="font-semibold text-reef">{title}</div>
                      <div className="mt-2 text-sm leading-6 text-slatebay">{text}</div>
                    </div>
                  ))}
                </div>

                {view === "feature" && (
                  <div className="mt-5 rounded-[26px] bg-reef p-5 text-white">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/60">Impact panel</div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      {[
                        ["Utilities", "Public-facing alert layer"],
                        ["Campuses", "Student-ready safety messaging"],
                        ["Cities", "Multilingual emergency guidance"]
                      ].map(([title, text]) => (
                        <div key={title} className="rounded-2xl bg-white/10 p-4">
                          <div className="font-semibold">{title}</div>
                          <div className="mt-2 text-sm leading-6 text-white/75">{text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          </section>

          <aside className="rounded-[34px] border border-slate-900/10 bg-white/80 p-6">
            <div className="text-xs uppercase tracking-[0.24em] text-slatebay">Why this variant works</div>
            <div className="mt-5 space-y-4">
              {[
                ["Best for presenting", "The copy hierarchy is already close to a pitch deck."],
                ["Judge comfort", "The story is broad, obvious, and low-friction to care about."],
                ["Implementation ease", "This can be built fast without a deep backend."]
              ].map(([title, text]) => (
                <div key={title} className="rounded-[24px] bg-shell p-4">
                  <div className="font-semibold text-reef">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slatebay">{text}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[26px] bg-reef p-5 text-white">
              <div className="text-xs uppercase tracking-[0.24em] text-white/60">AWS positioning</div>
              <p className="mt-3 text-sm leading-7 text-white/78">
                AI guidance can be powered by AWS Bedrock or similar. The narrative
                keeps the sponsor alignment present but secondary to the user benefit.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
