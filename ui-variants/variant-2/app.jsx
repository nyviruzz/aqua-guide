const { useState } = React;

const queryStateTwo = new URLSearchParams(window.location.search).get("state");
const initialTwo = ["interaction", "feature"].includes(queryStateTwo) ? queryStateTwo : "home";

function App() {
  const [view, setView] = useState(initialTwo);

  const updateView = (next) => {
    setView(next);
    const url = new URL(window.location.href);
    url.searchParams.set("state", next);
    window.history.replaceState({}, "", url);
  };

  const bulletin = {
    home: "A calmer civic interface for water updates, built like a trusted public bulletin rather than a startup dashboard.",
    interaction: "South Campus is under a short-term advisory. The page rewrites technical language into a clean, readable briefing.",
    feature: "Checklist mode converts the notice into a household prep sheet with larger type and print-friendly structure."
  }[view];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(184,106,77,0.14),_transparent_32%),linear-gradient(180deg,_#f7f1e5_0%,_#fffaf3_100%)]">
      <main className="mx-auto grid min-h-screen max-w-[1500px] gap-6 px-5 py-5 xl:grid-cols-[250px_minmax(0,1fr)_320px]">
        <aside className="rounded-[32px] border border-slate-900/10 bg-white/70 p-6 backdrop-blur-xl">
          <div className="rounded-full border border-ink/10 bg-ink px-4 py-2 text-xs uppercase tracking-[0.24em] text-paper">
            Aqua Guide
          </div>
          <h1 className="mt-6 font-display text-5xl leading-tight text-ink">Civic Ledger</h1>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            This direction leans into trust, readability, and public-service tone.
          </p>
          <div className="mt-8 space-y-2">
            {[
              ["home", "Front page"],
              ["interaction", "Local briefing"],
              ["feature", "Checklist mode"]
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => updateView(key)}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                  view === key
                    ? "bg-ink text-paper"
                    : "bg-slate-900/5 text-slate-700 hover:bg-slate-900/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-8 rounded-[28px] border border-slate-900/10 bg-paper p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Trust signals</div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li>Readable utility summaries</li>
              <li>Accessible typography modes</li>
              <li>AWS-ready AI explainer panel</li>
            </ul>
          </div>
        </aside>

        <section className="rounded-[36px] border border-slate-900/10 bg-white/70 p-7 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="border-b border-slate-900/10 pb-6">
            <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Public briefing</div>
            <h2 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-ink">
              Water updates, edited into something a neighbor could actually use.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{bulletin}</p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <article className="rounded-[30px] border border-slate-900/10 bg-paper p-6">
              <div className="flex items-center justify-between border-b border-slate-900/10 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Main story</div>
                  <h3 className="mt-2 text-3xl font-semibold text-ink">South Campus advisory briefing</h3>
                </div>
                <button
                  onClick={() => updateView("interaction")}
                  className="rounded-full bg-ink px-4 py-2 text-sm text-paper"
                >
                  Load briefing
                </button>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className="space-y-4 text-base leading-8 text-slate-700">
                  <p>
                    Technical source notices often bury the actual household impact. This variant reframes the experience like a trusted civic front page.
                  </p>
                  <p>
                    The primary flow keeps the language plain, the status legible, and the next steps grouped by what people need most.
                  </p>
                  <div className="rounded-[24px] border border-clay/20 bg-clay/10 p-5">
                    <div className="text-xs uppercase tracking-[0.22em] text-clay">Rewritten notice</div>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Boil water used for drinking or cooking until tonight. Showering is okay for most adults. Check for the next utility update at 6 PM.
                    </p>
                  </div>
                </div>
                <div className="rounded-[28px] border border-slate-900/10 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Featured sections</div>
                  <div className="mt-4 space-y-4">
                    {[
                      ["What changed", "Pressure dropped in one service zone."],
                      ["What to do now", "Boil water for drinking and cooking."],
                      ["What to watch", "A follow-up update is expected tonight."]
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-2xl border border-slate-900/10 p-4">
                        <div className="font-semibold text-ink">{title}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <div className="space-y-6">
              <div className="rounded-[30px] border border-slate-900/10 bg-white p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Neighborhood selector</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {["South Campus", "Port Jefferson", "Stony Brook", "Setauket"].map((item) => (
                    <span
                      key={item}
                      className={`rounded-full px-4 py-2 text-sm ${
                        item === "South Campus" && view !== "home"
                          ? "bg-ink text-paper"
                          : "bg-slate-900/5 text-slate-700"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-slate-900/10 bg-ink p-6 text-paper">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-paper/55">Checklist mode</div>
                    <h3 className="mt-2 text-2xl font-semibold">Print-ready household card</h3>
                  </div>
                  <button
                    onClick={() => updateView("feature")}
                    className="rounded-full border border-paper/20 px-4 py-2 text-sm"
                  >
                    Open
                  </button>
                </div>
                <p className="mt-4 text-sm leading-7 text-paper/75">
                  This view is built for low stress reading, faster scanning, and sharing.
                </p>
              </div>
            </div>
          </div>

          {view === "feature" && (
            <div className="mt-8 rounded-[30px] border border-moss/30 bg-moss/10 p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-moss">Checklist mode enabled</div>
                  <h3 className="mt-3 text-3xl font-semibold text-ink">One clear household plan for the next six hours.</h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      ["Drink", "Use boiled or bottled water only."],
                      ["Cook", "Use safe water for washing produce and meals."],
                      ["Store", "Fill clean containers for later use."],
                      ["Review", "Check for the next utility update at 6 PM."]
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-2xl border border-ink/10 bg-white/80 p-4">
                        <div className="font-semibold text-ink">{title}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-700">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[26px] border border-ink/10 bg-white/75 p-5">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-500">AI explainer</div>
                  <div className="mt-4 rounded-2xl bg-slate-900/5 p-4 text-sm leading-7 text-slate-700">
                    This notice can be summarized by an AWS Bedrock-style assistant for plain-language Q&amp;A, alternate languages, and easier reading modes.
                  </div>
                  <div className="mt-4 rounded-2xl bg-ink p-4 text-sm leading-7 text-paper">
                    Example answer: Yes, you can shower. For drinking and cooking, boil water for one minute until the advisory is lifted.
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="rounded-[32px] border border-slate-900/10 bg-white/70 p-6 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Judge appeal</div>
          <div className="mt-5 space-y-5">
            {[
              ["Broad audience", "Water safety is universally understandable."],
              ["Demo clarity", "The before-and-after reading contrast is instant."],
              ["Visual polish", "Editorial hierarchy feels more credible than cluttered dashboards."]
            ].map(([title, text]) => (
              <div key={title} className="rounded-[24px] border border-slate-900/10 bg-paper p-4">
                <div className="font-semibold text-ink">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-700">{text}</div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
