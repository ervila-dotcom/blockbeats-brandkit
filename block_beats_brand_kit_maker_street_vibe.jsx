import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, SprayCan, Disc3, Hash } from "lucide-react";
import * as htmlToImage from "html-to-image";

// Helper: download a DOM node as PNG
async function downloadNodeAsPng(node: HTMLElement | null, filename: string) {
  if (!node) return;
  const dataUrl = await htmlToImage.toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    skipFonts: false,
    quality: 1,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

// Simple street textures using CSS gradients
const textures: Record<string, string> = {
  "asphalt":
    "repeating-linear-gradient(45deg, #111 0 10px, #0e0e0e 10px 20px), radial-gradient(100% 100% at 0% 0%, #1a1a1a, #0a0a0a)",
  "brick":
    "repeating-linear-gradient(0deg, #1b1b1b 0 18px, #141414 18px 36px), repeating-linear-gradient(90deg, #1c1c1c 0 40px, #111 40px 80px)",
  "grunge":
    "radial-gradient(100% 100% at 0% 0%, #0d0d0d 0%, #000 100%),
     radial-gradient(60% 80% at 80% 20%, rgba(255,255,255,0.05), rgba(255,255,255,0) 60%),
     radial-gradient(80% 50% at 20% 80%, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%)",
  "neon-alley":
    "linear-gradient(135deg, #0a0a0a, #0e0e14 40%, #0b0b10),
     radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.15), transparent 40%),
     radial-gradient(circle at 80% 70%, rgba(0, 255, 180, 0.15), transparent 40%)",
};

const graffitiFonts = [
  { label: "Impact (Bold Block)", css: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" },
  { label: "System Bold", css: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" },
  { label: "Stencil (Street)", css: "'Stencil Std', 'Impact', sans-serif" },
];

export default function BlockBeatsBrandKitMaker() {
  const [name, setName] = useState("BlockBeats");
  const [tagline, setTagline] = useState("Trap • Afrobeat • Street Mixes • Party Vibes");
  const [texture, setTexture] = useState<string>("grunge");
  const [accent, setAccent] = useState("#ff1a1a");
  const [accent2, setAccent2] = useState("#00ff95");
  const [fontIdx, setFontIdx] = useState(0);
  const [spray, setSpray] = useState(40);
  const [glow, setGlow] = useState(60);

  const logoRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const fontFamily = graffitiFonts[fontIdx].css;

  const sprayShadow = useMemo(() => {
    const g = glow / 10;
    return `0 0 ${g + 6}px ${accent}, 0 0 ${g + 12}px ${accent2}`;
  }, [glow, accent, accent2]);

  const sprayFilter = useMemo(() => `drop-shadow(0 0 ${spray / 4}px ${accent}) drop-shadow(0 0 ${spray / 4 + 6}px ${accent2})`, [spray, accent, accent2]);

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <Card className="col-span-1 bg-neutral-900/60 backdrop-blur border-neutral-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><SprayCan className="w-5 h-5"/> BlockBeats Brand Kit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">Channel Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Tagline</label>
              <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm">Accent 1</label>
                <Input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Accent 2</label>
                <Input type="color" value={accent2} onChange={(e) => setAccent2(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Font</label>
              <Select value={String(fontIdx)} onValueChange={(v) => setFontIdx(parseInt(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a font"/>
                </SelectTrigger>
                <SelectContent>
                  {graffitiFonts.map((f, idx) => (
                    <SelectItem key={idx} value={String(idx)}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm flex items-center gap-2"><Disc3 className="w-4 h-4"/> Spray Intensity</label>
              <Slider defaultValue={[spray]} value={[spray]} onValueChange={(v) => setSpray(v[0])} min={0} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <label className="text-sm flex items-center gap-2"><Hash className="w-4 h-4"/> Neon Glow</label>
              <Slider defaultValue={[glow]} value={[glow]} onValueChange={(v) => setGlow(v[0])} min={0} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Background Texture</label>
              <Select value={texture} onValueChange={setTexture}>
                <SelectTrigger>
                  <SelectValue placeholder="Texture" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(textures).map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button onClick={() => downloadNodeAsPng(logoRef.current, `${name.replace(/\s+/g, '_')}_logo.png`)}><Download className="w-4 h-4 mr-2"/>Download Logo</Button>
              <Button onClick={() => downloadNodeAsPng(bannerRef.current, `${name.replace(/\s+/g, '_')}_banner_2560x1440.png`)}><Download className="w-4 h-4 mr-2"/>Download Banner</Button>
            </div>
            <p className="text-xs text-neutral-400 pt-2">YouTube banner size is 2560×1440 px (safe zone: 1546×423 px). Logo is exported as a square PNG.</p>
          </CardContent>
        </Card>

        {/* Previews */}
        <div className="col-span-1 lg:col-span-2 grid gap-6">
          {/* Logo Preview */}
          <Card className="bg-neutral-900/60 border-neutral-800">
            <CardHeader>
              <CardTitle>Logo Preview (1024×1024)</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={logoRef}
                style={{
                  width: 1024,
                  height: 1024,
                  background: textures[texture],
                  borderRadius: 9999,
                  position: 'relative' as const,
                }}
                className="mx-auto shadow-2xl overflow-hidden flex items-center justify-center"
              >
                <div
                  style={{
                    fontFamily,
                    textShadow: sprayShadow,
                    filter: sprayFilter,
                  }}
                  className="text-center"
                >
                  <div className="text-[180px] leading-none font-black" style={{ color: accent }}>
                    {name.split(" ").map((w, i) => (
                      <span key={i} className="block uppercase tracking-tight">{w}</span>
                    ))}
                  </div>
                </div>
                {/* subtle paint splatter overlay */}
                <svg className="absolute inset-0 mix-blend-screen opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="20" cy="30" r="2" fill={accent} />
                  <circle cx="70" cy="60" r="1.5" fill={accent2} />
                  <circle cx="50" cy="80" r="1" fill={accent} />
                  <circle cx="85" cy="25" r="1.2" fill={accent2} />
                  <circle cx="10" cy="75" r="1.8" fill={accent} />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Banner Preview */}
          <Card className="bg-neutral-900/60 border-neutral-800">
            <CardHeader>
              <CardTitle>YouTube Banner Preview (2560×1440)</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={bannerRef}
                style={{
                  width: 2560,
                  height: 1440,
                  background: textures[texture],
                  position: 'relative' as const,
                }}
                className="mx-auto shadow-2xl overflow-hidden rounded-2xl"
              >
                {/* Glow bars */}
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(circle at 20% 30%, ${accent}22, transparent 50%), radial-gradient(circle at 80% 70%, ${accent2}22, transparent 50%)`
                }} />

                {/* Safe zone */}
                <div
                  className="absolute inset-0 border-2 border-dashed"
                  style={{
                    borderColor: "#ffffff22",
                    left: 507,
                    right: 507,
                    top: 509,
                    bottom: 508,
                  }}
                />

                {/* Title & Tagline */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-10" style={{ fontFamily }}>
                    <h1 className="uppercase font-black tracking-tight" style={{
                      fontSize: 160,
                      color: accent,
                      textShadow: sprayShadow,
                      filter: sprayFilter,
                    }}>{name}</h1>
                    <p className="mt-4 text-xl md:text-3xl text-neutral-200" style={{ textShadow: `0 0 8px ${accent}55, 0 0 12px ${accent2}55` }}>
                      {tagline}
                    </p>
                  </div>
                </div>

                {/* Subtle grime overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-15 mix-blend-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <rect x="0" y="0" width="100" height="100" fill="#000"/>
                  {[...Array(120)].map((_, i) => (
                    <circle key={i} cx={Math.random()*100} cy={Math.random()*100} r={Math.random()*1.8} fill={i%2?accent:accent2} />
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-6 text-xs text-neutral-400">
        Tip: Keep key text inside the dashed safe zone for all devices. Export PNGs and upload them directly to YouTube channel settings.
      </footer>
    </div>
  );
}
