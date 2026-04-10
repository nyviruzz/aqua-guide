const { useState } = React;

const queryStateThree = new URLSearchParams(window.location.search).get("state");
const initialThree = ["interaction", "feature"].includes(queryStateThree) ? queryStateThree : "home";

function App() {
  const [view, setView] = useState(initialThree);

  const updateView = (next) => {
    setView(next);
    const url = new URL(window.location.href);
    url.searchParams.set("state", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(139,200,255,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,229,193,0.5),_transparent_25%),linear-gradient(180deg,_#eff7ff_0%,_#e6f6ff_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-tide shadow-lg shadow-skyglass/50">
              Aqua Guide / Blue Bloom
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-5xl leading-tight text-tide lg:text-7xl">
              A warmer, more personal take on household water guidance.
            </h1>
          </div>
          <div className="flex rounded-full bg-white/80 p-2 shadow-xl shadow-skyglass/40">
            {[
              ["home", "Today"],
              ["interaction", "Household plan"],
              ["feature", "Assist mode"]
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => updateView(key)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  view === key ? "bg-tide text-white" : "text-slate-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)_300px]">
          <aside className="rounded-[34px] bg-white/75 p-6 shadow-[0_24px_90px_rgba(22,93,125,0.12)] backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.24em] text-tide/60">Household profile</div>
            <h2 className="mt-4 text-3xl font-semibold text-tide">Shared apartment</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This design direction makes the water experience feel calm and personal, with soft cards, rounded surfaces, and friendly guidance.
            </p>
            <div className="mt-6 space-y-3">
              {[
                ["2 roommates", "Saved alert preferences"],
                ["Morning brief", "Daily water safety snapshot"],
                ["Calm mode", "Reduced reading complexity"]
              ].map(([title, text]) => (
                <div key={title} className="rounded-[24px] border border-white/70 bg-white/90 p-4">
                  <div className="font-semibold text-tide">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{text}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => updateView("interaction")}
              className="mt-6 w-full rounded-[22px] bg-tide px-5 py-4 text-sm font-semibold text-white"
            >
              Build today's plan
            </button>
          </aside>

          <section className="rounded-[36px] border border-white/70 bg-white/75 p-6 backdrop-blur-xl">
            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <div>
                <div className="rounded-[32px] bg-[linear-gradient(135deg,_#165d7d,_#8bc8ff)] p-8 text-white shadow-[0_30px_80px_rgba(22,93,125,0.25)]">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/70">Household overview</div>
                  <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight">
                    Safe water guidance should feel as friendly as a daily planner.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                    This direction leans consumer and optimistic. It is less civic and more lifestyle-friendly, while still keeping the safety story believable for a hackathon pitch.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    ["Morning check", "Tap water okay for showering, boil for coffee."],
                    ["Kitchen card", "Use stored water for produce and baby formula."],
                    ["Language mode", "Spanish summary and simpler reading available."],
                    ["AI coach", "Explain the notice like a calm roommate would."]
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(22,93,125,0.08)]">
                      <div className="text-sm uppercase tracking-[0.22em] text-tide/55">{title}</div>
                      <p className="mt-3 text-base leading-7 text-slate-700">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.85),_rgba(196,236,255,0.65))] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-tide/55">Daily plan</div>
                    <h3 className="mt-2 text-2xl font-semibold text-tide">
                      {view === "home" ? "Preview mode" : "Today's water plan"}
                    </h3>
                  </div>
                  <button
                    onClick={() => updateView(view === "feature" ? "interaction" : "feature")}
                    className="rounded-full bg-white px-4 py-2 text-sm text-tide shadow-lg"
                  >
                    {view === "feature" ? "Close assist" : "Open assist"}
                  </button>
                </div>
                {view !== "feature" ? (
                  <div className="mt-5 space-y-4">
                    {[
                      ["7:30 AM", "Boil water for coffee and tea"],
                      ["12:15 PM", "Lunch prep uses stored filtered water"],
                      ["6:00 PM", "Check advisory update and clear reminders"]
                    ].map(([time, task]) => (
                      <div key={time} className="rounded-[24px] bg-white/85 p-4 shadow-sm">
                        <div className="text-sm font-semibold text-tide">{time}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">{task}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 space-y-4">
                    <div className="rounded-[26px] bg-[linear-gradient(180deg,_#165d7d,_#2f8bc0)] p-5 text-white shadow-[0_20px_45px_rgba(22,93,125,0.20)]">
                      <div className="text-xs uppercase tracking-[0.24em] text-white/60">Assist mode</div>
                      <p className="mt-3 text-sm leading-7 text-white/80">
                        A Bedrock-style assistant rewrites the advisory in simpler language and answers practical household questions without making the UI feel clinical.
                      </p>
                      <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-7 text-white">
                        "You can shower as usual. For drinking or cooking, use boiled water until the alert clears tonight."
                      </div>
                    </div>
                    <div className="rounded-[24px] bg-white/85 p-4 shadow-sm">
                      <div className="text-sm font-semibold text-tide">Visible accessibility wins</div>
                      <div className="mt-2 text-sm leading-7 text-slate-600">
                        Simpler reading mode, bilingual summary, and a roommate-friendly explanation all appear without leaving the main flow.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="rounded-[34px] bg-white/80 p-6 shadow-[0_24px_90px_rgba(22,93,125,0.12)]">
            <div className="text-sm uppercase tracking-[0.24em] text-tide/55">Why it lands</div>
            <div className="mt-5 space-y-4">
              {[
                ["Feels finished", "Rounded surfaces and color control make it easy to sell in a demo."],
                ["Broad audience", "Families, roommates, and renters all map to this tone."],
                ["Accessible by design", "Friendly reading modes are naturally part of the layout."]
              ].map(([title, text]) => (
                <div key={title} className="rounded-[24px] bg-mist p-4">
                  <div className="font-semibold text-tide">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{text}</div>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
