const { useState } = React;

const queryStateFour = new URLSearchParams(window.location.search).get("state");
const initialFour = ["interaction", "feature"].includes(queryStateFour) ? queryStateFour : "home";

function App() {
  const [view, setView] = useState(initialFour);

  const updateView = (next) => {
    setView(next);
    const url = new URL(window.location.href);
    url.searchParams.set("state", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(47,230,197,0.14),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.18),_transparent_18%),linear-gradient(180deg,_#020617_0%,_#06131f_100%)]">
      <main className="mx-auto max-w-[1500px] px-6 py-6">
        <header className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-signal">Aqua Guide / Harbor Control</div>
              <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-ice lg:text-7xl">
                Command-center water guidance for moments that feel urgent.
              </h1>
            </div>
            <div className="flex rounded-full border border-white/10 bg-slate-950/60 p-2 font-mono text-sm">
              {[
                ["home", "grid"],
                ["interaction", "incident"],
                ["feature", "assistant"]
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => updateView(key)}
                  className={`rounded-full px-4 py-2 transition ${
                    view === key ? "bg-signal text-slate-950" : "text-steel"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">system status</div>
              <div className="mt-4 grid gap-3">
                {[
                  ["Data relay", "Stable", "bg-emerald-400/15 text-emerald-200"],
                  ["Language layer", "Ready", "bg-cyan-400/15 text-cyan-200"],
                  ["AI assist", "Armed", "bg-signal/15 text-signal"]
                ].map(([title, text, classes]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">{title}</div>
                    <div className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs ${classes}`}>{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-signal/10 p-5">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-signal">Judge hook</div>
              <p className="mt-4 text-sm leading-7 text-ice/80">
                This direction feels operational, fast, and technically credible
                without needing a heavy backend.
              </p>
            </div>
          </aside>

          <section className="rounded-[34px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ["Severity", view === "home" ? "Standby" : "Caution"],
                    ["Zone", view === "home" ? "Awaiting search" : "North utility branch"],
                    ["Next update", "18:00 local time"]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[24px] border border-white/10 bg-slate-950/50 p-4">
                      <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">{label}</div>
                      <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="relative h-[420px] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,_rgba(47,230,197,0.18),_rgba(6,19,31,0.95))]">
                  <div className="absolute left-10 top-10 rounded-[24px] border border-signal/20 bg-hull/80 px-5 py-4">
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">Live sector</div>
                    <div className="mt-2 text-xl font-semibold text-white">Stony Brook corridor</div>
                  </div>
                  <div className="absolute right-10 top-10 h-24 w-40 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl" />
                  <div className="absolute left-16 top-28 h-56 w-80 rounded-[34px] border border-signal/15 bg-signal/10 blur-[2px]" />
                  <div className="absolute right-14 bottom-16 w-[360px] rounded-[26px] border border-white/10 bg-slate-950/70 p-5">
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">Machine-readable briefing</div>
                    <p className="mt-4 text-sm leading-7 text-ice/80">
                      Pressure instability detected. Drinking and cooking use cases require a boil-first precaution while crews inspect the line.
                    </p>
                  </div>
                  <div className="absolute bottom-16 left-14 rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">Action stack</div>
                    <ul className="mt-4 space-y-3 text-sm text-ice/80">
                      <li>1. Boil before drinking</li>
                      <li>2. Use stored water for cooking</li>
                      <li>3. Recheck by 6 PM</li>
                    </ul>
                  </div>
                </div>

                {view !== "home" && (
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ["Source panel", "Campus utility feed and advisory record."],
                      ["Confidence", "High confidence based on direct notice wording."],
                      ["Embed mode", "Utility-branded public alert surface."]
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">{title}</div>
                        <p className="mt-3 text-sm leading-6 text-ice/75">{text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">Incident control</div>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Response stack</h2>
                    </div>
                    <button
                      onClick={() => updateView("interaction")}
                      className="rounded-full bg-alert px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-white"
                    >
                      activate
                    </button>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      ["Search result", "Location found and active."],
                      ["Civic cards", "Household instructions generated."],
                      ["AI channel", "Question prompts prepared."]
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="font-semibold text-white">{title}</div>
                        <div className="mt-2 text-sm leading-6 text-ice/70">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-signal/20 bg-signal/10 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.24em] text-signal">AWS fit</div>
                      <h3 className="mt-2 text-2xl font-semibold text-white">Bedrock-style assistant</h3>
                    </div>
                    <button
                      onClick={() => updateView("feature")}
                      className="rounded-full border border-signal/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-signal"
                    >
                      launch
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ice/75">
                    Use AI only for bounded explanation, translation, and next-step questions.
                  </p>
                </div>

                {view === "feature" && (
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-steel">Assistant output</div>
                    <div className="mt-4 rounded-2xl bg-hull p-4 text-sm leading-7 text-ice/80">
                      Question: Can I brush my teeth with this water?
                    </div>
                    <div className="mt-3 rounded-2xl bg-signal/10 p-4 text-sm leading-7 text-white">
                      Use boiled or bottled water for brushing until the notice clears. Showering remains okay for most adults.
                    </div>
                    <div className="mt-3 rounded-2xl border border-white/10 p-4 text-sm leading-7 text-ice/70">
                      Sources used: utility notice, household action rules, last updated 12 minutes ago.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
