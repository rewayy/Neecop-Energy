import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BrainCircuit, Building2, Check, ChevronRight, CircleDot,
  Cpu, Database, Factory, Gauge, GitBranch, Globe2, Leaf, Menu, Network,
  PlugZap, Radio, ShieldCheck, Sparkles, SunMedium, TrendingUp, Users,
  X, Zap, BatteryCharging, Bot, LineChart, Blocks, Workflow
} from "lucide-react";
import "./styles.css";

const brand = "NEECOP";

function Reveal({ children, className="", delay=0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: .65, delay, ease: [.22,1,.36,1] }}
    >{children}</motion.div>
  );
}

function SectionLabel({ children }) {
  return <div className="section-label"><span className="pulse-dot"/>{children}</div>;
}

function Button({ children, href="#contact", secondary=false }) {
  return <a className={`btn ${secondary ? "btn-secondary" : ""}`} href={href}>
    {children}<ArrowRight size={16}/>
  </a>;
}

function NetworkVisual() {
  const nodes = [
    {x:14,y:50,label:"SOLAR", icon:SunMedium},
    {x:35,y:25,label:"BATTERY", icon:BatteryCharging},
    {x:47,y:72,label:"BUSINESS", icon:Building2},
    {x:67,y:34,label:"NEECOP", icon:BrainCircuit, core:true},
    {x:86,y:58,label:"GRID", icon:Network},
    {x:77,y:83,label:"PROSUMER", icon:Users},
  ];
  return <div className="network-visual" aria-label="Illustration of an intelligent energy network">
    <div className="network-grid"/>
    <div className="network-orbit orbit-a"/>
    <div className="network-orbit orbit-b"/>
    <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
      {[[14,50,35,25],[14,50,47,72],[35,25,67,34],[47,72,67,34],[67,34,86,58],[67,34,77,83],[77,83,86,58]].map((p,i)=>
        <line key={i} x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]} className="energy-line"/>
      )}
    </svg>
    {nodes.map(({x,y,label,icon:Icon,core}) => <motion.div
      key={label} className={`net-node ${core ? "core" : ""}`} style={{left:`${x}%`,top:`${y}%`}}
      animate={core ? {scale:[1,1.05,1]} : {y:[-3,3,-3]}}
      transition={{duration: core?3:4, repeat:Infinity, ease:"easeInOut"}}
    >
      <div className="node-icon"><Icon size={core?24:17}/></div>
      <span>{label}</span>
    </motion.div>)}
    <div className="data-chip chip-1"><span>AI</span> Forecast +2.8%</div>
    <div className="data-chip chip-2"><span>FLOW</span> 4.2 MW</div>
  </div>
}

function Navbar() {
  const [open,setOpen] = useState(false);
  const links = [["Platform","#platform"],["Solutions","#solutions"],["Technology","#technology"],["About","#about"],["Our Story","#story"],["Contact","#contact"]];
  return <nav className="nav">
    <div className="nav-inner">
      <a href="#" className="logo"><span className="logo-mark"><span/></span>{brand}<small>ENERGY</small></a>
      <div className="nav-links">{links.map(([t,h])=><a key={t} href={h}>{t}</a>)}</div>
      <Button href="#contact">Talk to us</Button>
      <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
    </div>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}>
      {links.map(([t,h])=><a key={t} href={h} onClick={()=>setOpen(false)}>{t}<ChevronRight size={16}/></a>)}
    </motion.div>}</AnimatePresence>
  </nav>
}

const problems = [
  ["Fragmented Energy Data","Critical energy data exists across disconnected systems.",Database],
  ["Renewable Complexity","Solar, storage, EVs and distributed generation make energy management more complex.",SunMedium],
  ["The Rise of Prosumers","Consumers are increasingly becoming producers, consumers and potential energy-market participants.",Users],
  ["Manual Decision Making","Traditional systems cannot continuously analyze, predict and optimize complex energy systems.",Workflow]
];

const platform = [
  ["Energy Intelligence","Demand forecasting, renewable generation forecasting, consumption analytics, anomaly detection and asset intelligence.",LineChart],
  ["AI Energy Agents","Autonomous agents that monitor, reason, recommend and execute workflows.",Bot],
  ["P2P Energy","Peer-to-peer transactions, prosumer marketplaces, renewable matching, dynamic pricing and settlement.",Network],
  ["Renewable Intelligence","Solar/wind forecasting, generation optimization, battery optimization and portfolio analytics.",Leaf],
  ["Blockchain","Selective infrastructure for transactions, settlement, smart contracts, provenance and auditability.",Blocks]
];

const audiences = [
  ["DISCOMs","Demand forecasting, customer intelligence, renewable integration and grid optimization.",Building2],
  ["TRANSCOs","Transmission analytics, forecasting, planning and network intelligence.",Network],
  ["Businesses","Energy-cost optimization, renewable procurement and energy intelligence.",Factory],
  ["Prosumers","Generate, consume, store and participate in emerging energy markets.",SunMedium],
  ["Renewable Developers","Forecasting, asset optimization and portfolio intelligence.",Leaf],
  ["Energy Market Participants","Data-driven trading, matching, settlement and optimization.",TrendingUp]
];

const useCases = ["Demand forecasting","Renewable forecasting","Load optimization","P2P energy trading","Energy procurement","Battery optimization","Energy price prediction","Grid anomaly detection","Predictive maintenance","Renewable portfolio management","Carbon intelligence","Energy market intelligence","AI-powered customer engagement","Automated energy workflows"];

function Dashboard() {
  return <div className="dashboard">
    <div className="dash-head"><div><span className="eyebrow">NEECOP OS / LIVE</span><h3>Energy Overview</h3></div><span className="live"><i/> Live</span></div>
    <div className="metric-row">
      {[["Consumption","3.84 MWh","−4.8%"],["Renewable","2.71 MWh","+12.4%"],["Grid dependency","29.4%","−8.1%"],["Energy cost","₹ 31.2k","−6.7%"]].map(x=><div className="metric" key={x[0]}><small>{x[0]}</small><strong>{x[1]}</strong><span>{x[2]}</span></div>)}
    </div>
    <div className="dash-grid">
      <div className="chart-card"><div className="chart-title"><span>Forecast vs Actual</span><small>Next 24h</small></div>
        <svg viewBox="0 0 600 180" className="chart"><path d="M0 145 C60 135 75 90 130 108 S205 150 255 98 S330 35 390 80 S455 126 515 64 S565 50 600 22" className="chart-line actual"/><path d="M0 150 C70 143 85 100 140 112 S215 142 265 103 S340 45 400 84 S465 115 525 69 S570 58 600 30" className="chart-line forecast"/></svg>
        <div className="legend"><span><i/>Actual</span><span><i/>Forecast</span></div>
      </div>
      <div className="ai-card"><div className="ai-head"><Sparkles size={17}/><span>Energy Intelligence</span><small>AI</small></div><p>Solar generation is expected to increase during the afternoon. Shift flexible loads into this window to reduce grid dependency.</p><div className="recommend"><span>AI Recommendation</span><strong>11.4%</strong><small>Potential cost reduction · demo value</small></div></div>
    </div>
  </div>
}

function App() {
  useEffect(()=>{ document.documentElement.style.scrollBehavior="smooth"; },[]);
  return <>
    <Navbar/>
    <main>
      <section className="hero">
        <div className="hero-bg"/><div className="container hero-inner">
          <div className="hero-copy">
            <SectionLabel>AI-NATIVE ENERGY INFRASTRUCTURE</SectionLabel>
            <h1>Intelligence for the <em>new energy economy.</em></h1>
            <p className="hero-sub">Building the digital infrastructure for a smarter, more connected energy ecosystem across India.</p>
            <p className="hero-detail">A coordination layer connecting producers, consumers and distributed energy resources — with intelligence, data and software.</p>
            <div className="actions"><Button href="#platform">Explore the Platform</Button><Button href="#contact" secondary>Talk to us</Button></div>
            <div className="hero-proof"><span><Check size={14}/> Measure</span><span><Check size={14}/> Connect</span><span><Check size={14}/> Optimise</span></div>
          </div>
          <NetworkVisual/>
        </div>
      </section>

      <section className="statement"><div className="container"><Reveal><span>ENERGY IS BECOMING A SOFTWARE PROBLEM.</span><strong>We are building the intelligence layer.</strong></Reveal></div></section>

      <section className="section" id="about"><div className="container">
        <Reveal><SectionLabel>THE SHIFT</SectionLabel><h2>The energy system is changing.<br/><span>The infrastructure needs to catch up.</span></h2></Reveal>
        <div className="problem-grid">{problems.map(([t,d,I],i)=><Reveal key={t} delay={i*.05}><div className="card problem"><div className="icon"><I size={19}/></div><h3>{t}</h3><p>{d}</p><span className="card-index">0{i+1}</span></div></Reveal>)}</div>
      </div></section>

      <section className="section dark-section" id="platform"><div className="container">
        <div className="two-col"><Reveal><SectionLabel>THE SOLUTION</SectionLabel><h2>An intelligence layer for the <span>energy ecosystem.</span></h2><p className="lead">Neecop is the digital energy coordination layer. Electricity continues to flow through the existing network. We make that flow intelligent, measurable and optimised.</p></Reveal>
        <Reveal><div className="architecture"><div>ENERGY ASSETS</div><ArrowRight/><div>ENERGY DATA</div><ArrowRight/><div>AI / ML</div><ArrowRight/><div>LLMs</div><ArrowRight/><div>AGENTIC AI</div><ArrowRight/><div>OPTIMISATION</div></div></Reveal></div>
        <div className="platform-grid">{platform.map(([t,d,I],i)=><Reveal key={t} delay={i*.04}><div className="feature-card"><div className="feature-top"><div className="icon"><I size={20}/></div><span>0{i+1}</span></div><h3>{t}</h3><p>{d}</p><a href="#technology">Explore capability <ArrowRight size={14}/></a></div></Reveal>)}</div>
      </div></section>

      <section className="section stack-section"><div className="container">
        <Reveal><SectionLabel>FOUNDATION</SectionLabel><h2>Built for the <span>new energy stack.</span></h2><p className="lead">A digital foundation connecting energy assets, data, intelligence, markets and ecosystem participants.</p></Reveal>
        <div className="stack-visual">
          {[
            ["ENERGY ASSETS","Solar · Wind · Battery · EV · Smart Meter · Industrial Loads",PlugZap],
            ["ENERGY DATA","Metering · Generation · Consumption · Weather · Market Data · Grid Data",Database],
            ["INTELLIGENCE","ML · Forecasting · Optimisation · LLMs · Digital Twins",BrainCircuit],
            ["AGENTIC AI","Reasoning · Planning · Decision-making · Workflow Automation",Bot],
            ["ENERGY MARKETS","P2P · Trading · Pricing · Settlement",TrendingUp],
            ["ECOSYSTEM","DISCOMs · TRANSCOs · Businesses · Prosumers · Developers",Globe2]
          ].map(([t,d,I],i)=><motion.div className="stack-layer" key={t} whileHover={{x:6}}><div className="stack-num">0{i+1}</div><I size={18}/><div><b>{t}</b><span>{d}</span></div><ChevronRight size={17}/></motion.div>)}
        </div>
      </div></section>

      <section className="section dark-section" id="solutions"><div className="container">
        <Reveal><SectionLabel>WHO WE SERVE</SectionLabel><h2>One network. <span>Every participant.</span></h2><p className="lead">Designed for the evolving energy value chain — from infrastructure operators to the businesses and prosumers shaping demand.</p></Reveal>
        <div className="audience-grid">{audiences.map(([t,d,I],i)=><Reveal key={t} delay={i*.04}><div className="audience"><I size={19}/><h3>{t}</h3><p>{d}</p><ArrowRight size={16}/></div></Reveal>)}</div>
      </div></section>

      <section className="section"><div className="container">
        <div className="section-head"><Reveal><SectionLabel>APPLICATIONS</SectionLabel><h2>From energy data to <span>better decisions.</span></h2></Reveal><Reveal><p className="lead right">A growing application layer designed to measure, understand, match, optimise and coordinate energy.</p></Reveal></div>
        <div className="use-grid">{useCases.map((x,i)=><div className="use-pill" key={x}><CircleDot size={12}/>{x}<span>↗</span></div>)}</div>
      </div></section>

      <section className="section ai-section" id="technology"><div className="container">
        <div className="two-col ai-top"><Reveal><SectionLabel>INTELLIGENCE ENGINE</SectionLabel><h2>AI that moves from <span>insight to action.</span></h2><p className="lead">Machine learning predicts. LLMs reason. Agents plan and execute approved workflows.</p></Reveal><Reveal><div className="ai-layers">{[["MACHINE LEARNING","Prediction · Forecasting · Optimisation · Anomaly Detection",Cpu],["LLMs","Natural-language energy intelligence · Reasoning · Knowledge retrieval",BrainCircuit],["AGENTIC AI","Planning · Tool use · Decision-making · Workflow execution",Bot]].map(([t,d,I])=><div key={t}><I/><b>{t}</b><p>{d}</p></div>)}</div></Reveal></div>
        <Reveal><div className="workflow"><div className="workflow-q"><span>USER</span><strong>“Optimise our renewable energy procurement for tomorrow.”</strong></div><div className="workflow-steps">{["Forecast demand","Forecast renewable generation","Check market prices","Analyse contracts","Evaluate storage","Determine optimal strategy","Recommend action","Execute approved workflow"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}<ArrowRight size={14}/></div>)}</div></div></Reveal>
      </div></section>

      <section className="section dashboard-section"><div className="container"><Reveal><SectionLabel>PRODUCT / DEMO</SectionLabel><h2>A control plane for <span>energy intelligence.</span></h2><p className="lead">A representative enterprise dashboard concept. Metrics and AI recommendations shown below are illustrative demo values, not company claims.</p></Reveal><Reveal><Dashboard/></Reveal></div></section>

      <section className="section dark-section" id="story"><div className="container">
        <div className="story-grid"><Reveal><SectionLabel>OUR STORY</SectionLabel><h2>The energy transition is becoming a <span>software transformation.</span></h2></Reveal><Reveal><p className="story-copy">India's energy system is moving from a linear model toward a distributed ecosystem of solar, storage, EVs, smart meters, flexible loads and increasingly active consumers.</p><p className="story-copy">Neecop is built around a simple belief: <strong>the future of energy will be increasingly software-defined.</strong></p></Reveal></div>
        <div className="team"><Reveal><div className="team-card"><div className="portrait">DT</div><div><h3>Divyansh Tuli</h3><b>Co-Founder — Technology & AI</b><p>Engineering graduate and AI specialist focused on artificial intelligence, LLMs, intelligent systems and emerging technologies, with experience building in the climate-tech ecosystem.</p><div className="tags"><span>AI</span><span>LLMs</span><span>Agentic AI</span><span>Climate Tech</span></div></div></div></Reveal>
        <Reveal><div className="team-card"><div className="portrait">Y</div><div><h3>Yagyesh</h3><b>Co-Founder — Energy & Public Policy</b><p>Public policy expert and former entrepreneur in the MSME ecosystem, working at the intersection of technology, policy and infrastructure.</p><div className="tags"><span>Public Policy</span><span>Energy & Power</span><span>MSMEs</span></div></div></div></Reveal></div>
      </div></section>

      <section className="vision"><div className="vision-glow"/><div className="container"><Reveal><SectionLabel>VISION / MISSION</SectionLabel><h2>Build the digital intelligence layer for a <em>more distributed, renewable, efficient and autonomous</em> energy system.</h2><div className="pillars">{[["INTELLIGENCE","Turn energy data into decisions."],["INTEROPERABILITY","Connect participants across the energy ecosystem."],["AUTONOMY","Enable systems that continuously optimise energy operations."]].map(([a,b])=><div key={a}><b>{a}</b><p>{b}</p></div>)}</div></Reveal></div></section>

      <section className="section roadmap"><div className="container"><Reveal><SectionLabel>ROADMAP</SectionLabel><h2>Building the intelligence layer — <span>step by step.</span></h2></Reveal><div className="timeline">{[["NOW","Energy Intelligence","Forecasting · Analytics · AI insights"],["NEXT","AI Agents","Autonomous workflows · Decision intelligence · Optimisation"],["FUTURE","P2P Energy Networks","Distributed markets · Prosumer participation · Dynamic pricing"],["LONG TERM","Autonomous Energy Ecosystem","AI-native infrastructure · Interoperable markets · Intelligent grid coordination"]].map(([a,b,c],i)=><Reveal key={a} delay={i*.05}><div className="timeline-item"><span>{a}</span><div className="timeline-line"><i/></div><div><h3>{b}</h3><p>{c}</p></div></div></Reveal>)}</div></div></section>

      <section className="impact"><div className="container"><Reveal><SectionLabel>IMPACT</SectionLabel><h2>Technology that accelerates the <span>energy transition.</span></h2></Reveal><div className="impact-grid">{[["↓","Energy Waste"],["↑","Renewable Utilization"],["↓","Operational Cost"],["↑","Grid Intelligence"]].map(([s,t])=><div key={t}><strong>{s}</strong><span>{t}</span></div>)}</div></div></section>

      <section className="section trust"><div className="container"><div className="trust-head"><Reveal><SectionLabel>ENTERPRISE READY</SectionLabel><h2>Built for <span>critical energy infrastructure.</span></h2></Reveal><Reveal><p className="lead right">Designed with the operational realities of enterprise energy systems in mind. No unsupported certifications or compliance claims.</p></Reveal></div><div className="trust-grid">{["Secure architecture","Role-based access","Data privacy","Auditability","API-first infrastructure","Enterprise integrations","Scalable cloud architecture"].map(x=><div key={x}><ShieldCheck size={17}/>{x}</div>)}</div></div></section>

      <section className="cta" id="contact"><div className="container"><Reveal><SectionLabel>START A CONVERSATION</SectionLabel><h2>The energy system is becoming intelligent.</h2><p>Let's build the infrastructure that powers it.</p><div className="actions"><Button href="mailto:hello@neecop.energy">Partner with us</Button><Button href="mailto:hello@neecop.energy" secondary>Talk to our team</Button></div></Reveal></div></section>
    </main>
    <footer><div className="container footer-inner"><div><a href="#" className="logo"><span className="logo-mark"><span/></span>{brand}<small>ENERGY</small></a><p>Powering human needs.<br/>Digital infrastructure for the new energy economy.</p></div><div className="footer-links"><a href="#platform">Platform</a><a href="#solutions">Solutions</a><a href="#technology">Technology</a><a href="#about">About</a><a href="#story">Our Story</a><a href="#contact">Contact</a></div><div className="footer-meta"><span>Delhi, India · 2026</span><span>© 2026 Neecop. All rights reserved.</span></div></div></footer>
  </>;
}

createRoot(document.getElementById("root")).render(<App/>);