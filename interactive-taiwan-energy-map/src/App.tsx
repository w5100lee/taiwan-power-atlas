import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EnergyMap from "./components/EnergyMap";
import MixCharts from "./components/MixCharts";
import Timeline from "./components/Timeline";
import Concepts from "./components/Concepts";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-slate-200">
      <div className="noise-layer" />
      <Navbar />
      <main>
        <Hero />
        <EnergyMap />
        <MixCharts />
        <Timeline />
        <Concepts />
      </main>
      <Footer />
    </div>
  );
}
