import { useState, useRef, useEffect } from "react";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { AnimatedChevron } from "@/hooks/useAccordion.tsx";
import { AccordionPanel } from "@/hooks/useAccordion.tsx";



const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    contacts: false,
    "find-me": false,
  });

  const toggle = (key: string) =>
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" });

  const validateEmail = (v: string) =>
    !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Wrong email address";

  const handleSubmit = () => {
    const err = validateEmail(email);
    setEmailError(err);
    if (!err && name && message) setSubmitted(true);
  };

  const handleNewMessage = () => {
    setName(""); setEmail(""); setMessage("");
    setEmailError(""); setSubmitted(false);
  };

  const isValid = name && email && message && !emailError;

  return (
    <div className="flex h-full">

      {/* ── Desktop sidebar ───────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col w-58 border-r border-border shrink-0 overflow-y-auto py-2">
        <button onClick={() => toggle("contacts")}
          className="flex items-center gap-2 px-3 py-1.5 w-full text-sm font-mono text-foreground hover:bg-secondary/30 transition-colors">
          <AnimatedChevron open={expandedSections.contacts} />
          contacts
        </button>
        <AccordionPanel open={expandedSections.contacts}>
          <div className="ml-4 space-y-1 mb-1">
            <div className="flex items-center gap-2 px-3 py-1 text-xs font-mono text-muted-foreground">
              <Mail className="w-3 h-3 shrink-0" />
              <span className="truncate">jpazevedomoreiraa@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 text-xs font-mono text-muted-foreground">
              <Phone className="w-3 h-3 shrink-0" /> +55999981111
            </div>
          </div>
        </AccordionPanel>

        <button onClick={() => toggle("find-me")}
          className="flex items-center gap-2 px-3 py-1.5 w-full text-sm font-mono text-foreground hover:bg-secondary/30 transition-colors mt-2">
          <AnimatedChevron open={expandedSections["find-me"]} />
          find-me-also-in
        </button>
        <AccordionPanel open={expandedSections["find-me"]}>
          <div className="ml-4 space-y-1">
            {[
              { label: "YouTube", url: "https://www.youtube.com/@jp_azv" },
              { label: "dev.to", url: "https://dev.to/joaopauloazevedo" },
              { label: "Instagram", url: "https://www.instagram.com/zzz_john" },
              { label: "Twitch", url: "https://www.twitch.tv/zzz_john" },
            ].map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 text-sm font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                <ExternalLink className="w-3 h-3" /> {label}
              </a>
            ))}
          </div>
        </AccordionPanel>
      </div>

      {/* ── Main area ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 overflow-y-auto">

          {/* Mobile accordions */}
          <div className="md:hidden">
            <button onClick={() => toggle("contacts")}
              className="flex items-center gap-2 px-4 py-3 w-full font-mono text-sm text-foreground bg-secondary/20 hover:bg-secondary/30 transition-colors border-b border-border">
              <AnimatedChevron open={expandedSections.contacts} />
              contacts
            </button>
            <AccordionPanel open={expandedSections.contacts}>
              <div className="px-6 py-3 space-y-2 border-b border-border">
                <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <Mail className="w-3 h-3 shrink-0" />
                  <span className="truncate">jpazevedomoreiraa@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <Phone className="w-3 h-3 shrink-0" /> +55 88999981111
                </div>
              </div>
            </AccordionPanel>

            <button onClick={() => toggle("find-me")}
              className="flex items-center gap-2 px-4 py-3 w-full font-mono text-sm text-foreground bg-secondary/20 hover:bg-secondary/30 transition-colors border-b border-border">
              <AnimatedChevron open={expandedSections["find-me"]} />
              find-me-also-in
            </button>
            <AccordionPanel open={expandedSections["find-me"]}>
              <div className="px-6 py-2 space-y-1 border-b border-border">
                {[
                  { label: "YouTube", url: "https://www.youtube.com/channel/UCz4NxtPZ9hv6Ax---a2BBaQ" },
                  { label: "dev.to", url: "https://dev.to/joaopauloazevedo" },
                  { label: "Instagram", url: "https://www.instagram.com/zzz_john" },
                  { label: "Twitch", url: "https://www.twitch.tv/zzz_john" },
                ].map(({ label, url }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 text-sm font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    <ExternalLink className="w-3 h-3" /> {label}
                  </a>
                ))}
              </div>
            </AccordionPanel>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-6 py-16 px-6">
              <div className="text-4xl">🤙</div>
              <div className="font-mono text-center">
                <div className="text-foreground text-lg font-bold mb-2">Thank you!</div>
                <div className="text-muted-foreground text-sm">Your message has been accepted.<br />You will receive an answer soon!</div>
              </div>
              <button onClick={handleNewMessage}
                className="font-mono text-sm px-5 py-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                send-new-message
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-5 max-w-sm">
              <div>
                <label className="font-mono text-sm text-muted-foreground block mb-2">_name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground transition-colors"
                  placeholder="enter your name here" />
              </div>
              <div>
                <label className="font-mono text-sm text-muted-foreground block mb-2">_email:</label>
                <input type="email" value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                  onBlur={e => setEmailError(validateEmail(e.target.value))}
                  className={`w-full bg-secondary/30 border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:ring-1 placeholder:text-muted-foreground transition-colors ${emailError ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"}`} />
                {emailError && <div className="font-mono text-xs text-red-500 mt-1">{emailError}</div>}
              </div>
              <div>
                <label className="font-mono text-sm text-muted-foreground block mb-2">_message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground resize-none transition-colors"
                  placeholder="your message here ..." />
              </div>
              <button onClick={handleSubmit}
                className={`font-mono text-sm px-6 py-2 rounded-lg transition-all duration-200 ${isValid
                  ? "bg-vscode-string/20 border border-vscode-string text-vscode-string hover:bg-vscode-string/30 scale-100"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                submit-message
              </button>
            </div>
          )}
        </div>

        {/* Desktop live code preview */}
        <div className="hidden lg:flex flex-1 border-l border-border p-6 overflow-auto">
          <div className="flex">
            <div className="pr-4 text-right font-mono text-sm text-vscode-linenum select-none leading-7">
              {Array.from({ length: 12 }, (_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="font-mono text-sm leading-7">
              <div><span className="text-vscode-keyword">const </span><span className="text-vscode-variable">button</span><span className="text-foreground"> = document.querySelector(</span><span className="text-vscode-string">'#sendBtn'</span><span className="text-foreground">);</span></div>
              <div>&nbsp;</div>
              <div><span className="text-vscode-keyword">const </span><span className="text-vscode-variable">message</span><span className="text-foreground"> = {"{"}</span></div>
              <div className="pl-4"><span className="text-vscode-variable">name</span><span className="text-foreground">: </span><span className="text-vscode-string">"{name || ""}"</span><span className="text-foreground">,</span></div>
              <div className="pl-4"><span className="text-vscode-variable">email</span><span className="text-foreground">: </span><span className="text-vscode-string">"{email || ""}"</span><span className="text-foreground">,</span></div>
              <div className="pl-4"><span className="text-vscode-variable">message</span><span className="text-foreground">: </span><span className="text-vscode-string">"{message.length > 20 ? message.slice(0, 20) + "..." : message || ""}"</span><span className="text-foreground">,</span></div>
              <div className="pl-4"><span className="text-vscode-variable">data</span><span className="text-foreground">: </span><span className="text-vscode-string">"{dateStr}"</span></div>
              <div>{"}"}</div>
              <div>&nbsp;</div>
              <div><span className="text-vscode-variable">button</span><span className="text-foreground">.addEventListener(</span><span className="text-vscode-string">'click'</span><span className="text-foreground">, () =&gt; {"{"}</span></div>
              <div className="pl-4"><span className="text-vscode-variable">form</span><span className="text-foreground">.send(message);</span></div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;