const { useMemo, useState } = React;

const queryState = new URLSearchParams(window.location.search).get("state");
const initialState = ["interaction", "feature"].includes(queryState) ? queryState : "home";

const locations = {
  home: {
    name: "Select a shoreline community",
    status: "Ready to search",
    summary: "Search a ZIP or neighborhood to reveal the latest water guidance.",
    actions: ["Search by ZIP", "View recent guidance", "Preview household cards"]
  },
  interaction: {
    name: "Port Jefferson Station",
    status: "Advisory: boil before drinking",
    summary: "A pipe pressure event triggered a short-term boil advisory for drinking and cooking.",
    actions: ["Boil for 1 minute", "Use bottled water for baby formula", "Check again at 6:00 PM"]
  },
  feature: {
    name: "Port Jefferson Station",
    status: "Advisory explained in plain language",
    summary: "The system rewrote the utility notice into clear steps and enabled Spanish guidance.",
    actions: ["Spanish summary ready", "Large-type mode on", "Bedrock-style Q&A available"]
  }
};

function App() {
  const [view, setView] = useState(initialState);
  const data = useMemo(() => locations[view], [view]);

  const updateView = (next) => {
    setView(next);
    const url = new URL(window.location.href);
    url.searchParams.set("state", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,127,110,0.22),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#082f49_56%,_#031525_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />
      <main className="relative mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100">
              Aqua Guide / Coastal Pulse
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-5xl leading-tight text-foam lg:text-7xl">
              Water guidance that feels calm, fast, and human.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-cyan-50/78">
              A sponsor-friendly, map-first dashboard that turns hard-to-read advisories into confident household guidance.
            </p>
          </div>
          <div className="inline-flex gap-2 self-start rounded-full border border-white/10 bg-slate-950/50 p-2">
            {[
              ["home", "Overview"],
              ["interaction", "Search Result"],
              ["feature", "AI Assist"]
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => updateView(key)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  view === key
                    ? "bg-cyan-300 text-slate-950"
                    : "text-cyan-50/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-100/70">
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1">Public utility clarity</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">AWS-ready AI guidance</span>
              </div>
              <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
                <div>
                  <label className="text-sm uppercase tracking-[0.24em] text-cyan-50/60">
                    Search your neighborhood
                  </label>
                  <div className="mt-3 flex items-center gap-3 rounded-[24px] border border-white/10 bg-slate-950/50 p-3">
                    <input
                      readOnly
                      value={view === "home" ? "" : "11776"}
                      placeholder="ZIP code or city"
                      className="w-full bg-transparent px-3 py-3 text-lg text-white outline-none placeholder:text-slate-400"
                    />
                    <button
                      onClick={() => updateView("interaction")}
                      className="rounded-[18px] bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    >
                      Reveal guidance
                    </button>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      ["16 sec", "time to explain the alert"],
                      ["4 modes", "reading and language support"],
                      ["1 flow", "that wins the demo fast"]
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <div className="text-2xl font-semibold text-white">{value}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-300">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[28px] border border-coral/20 bg-coral/10 p-5">
                  <div className="text-xs uppercase tracking-[0.25em] text-coral/70">Household action</div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{data.status}</h2>
                  <p className="mt-3 text-sm leading-7 text-cyan-50/75">{data.summary}</p>
                  <ul className="mt-5 space-y-3">
                    {data.actions.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-cyan-50/85">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {[
                ["Drinking", "Safe after boiling for one minute."],
                ["Bathing", "Okay for adults and older children."],
                ["Cooking", "Use boiled or bottled water only."]
              ].map(([title, text]) => (
                <article key={title} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="text-sm uppercase tracking-[0.22em] text-cyan-50/55">{title}</div>
                  <p className="mt-4 text-lg leading-8 text-white">{text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-slate-950/40 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-cyan-50/55">Live coastal map</div>
                <h2 className="mt-3 text-3xl font-semibold text-white">{data.name}</h2>
              </div>
              <button
                onClick={() => updateView(view === "feature" ? "interaction" : "feature")}
                className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-50"
              >
                {view === "feature" ? "Close AI panel" : "Open AI panel"}
              </button>
            </div>

            <div className="relative mt-6 h-[460px] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,_rgba(14,165,198,0.20),_rgba(8,47,73,0.95)),radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.12),_transparent_24%)]">
              <div className="absolute left-10 top-10 h-40 w-40 rounded-full border border-cyan-100/20 bg-cyan-100/10 blur-3xl" />
              <div className="absolute left-24 top-20 rounded-[28px] border border-white/10 bg-slate-950/55 px-5 py-4">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-100/55">Current focus</div>
                <div className="mt-2 text-xl font-semibold text-white">Port Jefferson utilities</div>
              </div>
              <div className="absolute right-16 top-20 h-52 w-52 rounded-[36px] border border-cyan-50/10 bg-cyan-100/10 backdrop-blur-xl" />
              <div className="absolute bottom-14 left-12 right-12 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-slate-950/55 p-5">
                  <div className="text-xs uppercase tracking-[0.25em] text-cyan-50/55">Utility notice</div>
                  <p className="mt-4 text-sm leading-7 text-cyan-50/80">
                    Pressure drop detected in zone B. Customers should boil water used for drinking or cooking until the next update.
                  </p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
                  <div className="text-xs uppercase tracking-[0.25em] text-cyan-50/55">Plain-language view</div>
                  <p className="mt-4 text-sm leading-7 text-white">
                    A pipe issue may have let unsafe water into the system. Boil drinking water for one minute and check again tonight.
                  </p>
                </div>
              </div>

              {view === "feature" && (
                <aside className="absolute right-5 top-5 flex h-[420px] w-[320px] flex-col rounded-[30px] border border-cyan-200/20 bg-slate-950/85 p-5 shadow-glass">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-cyan-50/50">AI guidance</div>
                      <h3 className="mt-2 text-xl font-semibold text-white">Bedrock-style helper</h3>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">Spanish mode</span>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-white/5 p-4 text-sm leading-7 text-cyan-50/80">
                      Question: Can I use tap water to brush my teeth?
                    </div>
                    <div className="rounded-2xl bg-cyan-300/12 p-4 text-sm leading-7 text-white">
                      Use boiled or bottled water until the advisory is lifted. Bathing is still okay for most households.
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-cyan-50/80">
                      Also available:
                      <ul className="mt-3 space-y-2 text-cyan-50/70">
                        <li>Large-type reading view</li>
                        <li>Household checklist export</li>
                        <li>Saved locations for repeat alerts</li>
                      </ul>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
