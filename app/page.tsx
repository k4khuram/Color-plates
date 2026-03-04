"use client"

import { useState } from "react"
import { Check, ChevronDown, Copy } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ColorSwatch {
  name: string
  hex: string
  category: string
}

const colorPalette: ColorSwatch[] = [
  // Sky Blues (Top of image)
  { name: "Deep Sky Blue", hex: "#5B8BA8", category: "Primary Blues" },
  { name: "Dusty Teal", hex: "#7BA5B8", category: "Primary Blues" },
  { name: "Soft Horizon Blue", hex: "#9BBCC8", category: "Primary Blues" },
  { name: "Pale Sky", hex: "#B8D4DE", category: "Primary Blues" },

  // Sunset Warm Tones
  { name: "Golden Amber", hex: "#D4956A", category: "Sunset Warmth" },
  { name: "Soft Peach", hex: "#E8B08A", category: "Sunset Warmth" },
  { name: "Warm Apricot", hex: "#DDA478", category: "Sunset Warmth" },
  { name: "Sunset Orange", hex: "#C98B5F", category: "Sunset Warmth" },

  // Neutrals & Accents
  { name: "Cream White", hex: "#FFF8F0", category: "Neutrals" },
  { name: "Warm Ivory", hex: "#F5EDE3", category: "Neutrals" },
  { name: "Silhouette Brown", hex: "#3D2A1F", category: "Neutrals" },
  { name: "Deep Earth", hex: "#5C4535", category: "Neutrals" },

  // Gradient Combinations
  { name: "Misty Blue", hex: "#8FAFC0", category: "Gradients" },
  { name: "Dusk Mauve", hex: "#C4A8A0", category: "Gradients" },
  { name: "Hazy Gold", hex: "#CBAA85", category: "Gradients" },
  { name: "Soft Coral", hex: "#E0A080", category: "Gradients" },
]

// Two-color gradient combinations
const twoColorGradients = [
  // Sky to Sky (Blue combinations)
  {
    name: "Ocean Breeze",
    gradient: "linear-gradient(135deg, #5B8BA8 0%, #B8D4DE 100%)",
    from: "#5B8BA8",
    to: "#B8D4DE",
    category: "Sky Blues",
  },
  {
    name: "Misty Horizon",
    gradient: "linear-gradient(135deg, #7BA5B8 0%, #9BBCC8 100%)",
    from: "#7BA5B8",
    to: "#9BBCC8",
    category: "Sky Blues",
  },
  {
    name: "Deep to Pale",
    gradient: "linear-gradient(180deg, #5B8BA8 0%, #9BBCC8 100%)",
    from: "#5B8BA8",
    to: "#9BBCC8",
    category: "Sky Blues",
  },
  {
    name: "Teal Fade",
    gradient: "linear-gradient(135deg, #7BA5B8 0%, #B8D4DE 100%)",
    from: "#7BA5B8",
    to: "#B8D4DE",
    category: "Sky Blues",
  },

  // Sunset to Sunset (Warm combinations)
  {
    name: "Golden Sunset",
    gradient: "linear-gradient(135deg, #D4956A 0%, #E8B08A 100%)",
    from: "#D4956A",
    to: "#E8B08A",
    category: "Sunset Warmth",
  },
  {
    name: "Amber Glow",
    gradient: "linear-gradient(135deg, #C98B5F 0%, #DDA478 100%)",
    from: "#C98B5F",
    to: "#DDA478",
    category: "Sunset Warmth",
  },
  {
    name: "Peach Dream",
    gradient: "linear-gradient(180deg, #DDA478 0%, #E8B08A 100%)",
    from: "#DDA478",
    to: "#E8B08A",
    category: "Sunset Warmth",
  },
  {
    name: "Warm Blush",
    gradient: "linear-gradient(135deg, #C98B5F 0%, #E8B08A 100%)",
    from: "#C98B5F",
    to: "#E8B08A",
    category: "Sunset Warmth",
  },

  // Sky to Sunset (Cool to Warm transitions)
  {
    name: "Dusk Transition",
    gradient: "linear-gradient(180deg, #5B8BA8 0%, #D4956A 100%)",
    from: "#5B8BA8",
    to: "#D4956A",
    category: "Sky to Sunset",
  },
  {
    name: "Twilight Blend",
    gradient: "linear-gradient(135deg, #7BA5B8 0%, #E8B08A 100%)",
    from: "#7BA5B8",
    to: "#E8B08A",
    category: "Sky to Sunset",
  },
  {
    name: "Serene Sunset",
    gradient: "linear-gradient(180deg, #9BBCC8 0%, #DDA478 100%)",
    from: "#9BBCC8",
    to: "#DDA478",
    category: "Sky to Sunset",
  },
  {
    name: "Calm to Warm",
    gradient: "linear-gradient(135deg, #B8D4DE 0%, #C98B5F 100%)",
    from: "#B8D4DE",
    to: "#C98B5F",
    category: "Sky to Sunset",
  },
  {
    name: "Horizon Line",
    gradient: "linear-gradient(180deg, #5B8BA8 0%, #E8B08A 100%)",
    from: "#5B8BA8",
    to: "#E8B08A",
    category: "Sky to Sunset",
  },
  {
    name: "Day to Dusk",
    gradient: "linear-gradient(135deg, #9BBCC8 0%, #C98B5F 100%)",
    from: "#9BBCC8",
    to: "#C98B5F",
    category: "Sky to Sunset",
  },

  // With Neutrals
  {
    name: "Sky to Cream",
    gradient: "linear-gradient(180deg, #5B8BA8 0%, #FFF8F0 100%)",
    from: "#5B8BA8",
    to: "#FFF8F0",
    category: "With Neutrals",
  },
  {
    name: "Sunset Fade",
    gradient: "linear-gradient(180deg, #D4956A 0%, #FFF8F0 100%)",
    from: "#D4956A",
    to: "#FFF8F0",
    category: "With Neutrals",
  },
  {
    name: "Earth Glow",
    gradient: "linear-gradient(135deg, #5C4535 0%, #D4956A 100%)",
    from: "#5C4535",
    to: "#D4956A",
    category: "With Neutrals",
  },
  {
    name: "Deep Ocean",
    gradient: "linear-gradient(180deg, #3D2A1F 0%, #5B8BA8 100%)",
    from: "#3D2A1F",
    to: "#5B8BA8",
    category: "With Neutrals",
  },
]

const gradientSuggestions = [
  {
    name: "Sunset Sky",
    gradient: "linear-gradient(180deg, #5B8BA8 0%, #9BBCC8 30%, #E8B08A 70%, #D4956A 100%)",
    colors: ["#5B8BA8", "#9BBCC8", "#E8B08A", "#D4956A"],
  },
  {
    name: "Golden Hour",
    gradient: "linear-gradient(135deg, #DDA478 0%, #E8B08A 50%, #C98B5F 100%)",
    colors: ["#DDA478", "#E8B08A", "#C98B5F"],
  },
  {
    name: "Calm Blue",
    gradient: "linear-gradient(180deg, #5B8BA8 0%, #7BA5B8 50%, #B8D4DE 100%)",
    colors: ["#5B8BA8", "#7BA5B8", "#B8D4DE"],
  },
  {
    name: "Warm Earth",
    gradient: "linear-gradient(135deg, #5C4535 0%, #C98B5F 50%, #E8B08A 100%)",
    colors: ["#5C4535", "#C98B5F", "#E8B08A"],
  },
  {
    name: "Horizon Blend",
    gradient: "linear-gradient(180deg, #7BA5B8 0%, #C4A8A0 50%, #D4956A 100%)",
    colors: ["#7BA5B8", "#C4A8A0", "#D4956A"],
  },
  {
    name: "Soft Dusk",
    gradient: "linear-gradient(135deg, #9BBCC8 0%, #CBAA85 100%)",
    colors: ["#9BBCC8", "#CBAA85"],
  },
]

const gradientToCss = (gradient: string) =>
  `background: ${gradient};`

export default function ColorPalettePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const copyGradient = (gradient: string, format: "css" | "value") => {
    const text = format === "css" ? gradientToCss(gradient) : gradient
    navigator.clipboard.writeText(text)
    setCopiedGradient(gradient)
    setTimeout(() => setCopiedGradient(null), 2000)
  }

  const categories = [...new Set(colorPalette.map((c) => c.category))]

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Hero Reference */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XW6WaFOdcVteM7j38ajtDjmQ0trubm.png"
          alt="Lucid Breath Hero Section"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] to-transparent" />
        <div className="absolute bottom-4 left-8">
          <h1 className="text-3xl font-bold text-[#3D2A1F]">Color Palette</h1>
          <p className="text-[#5C4535]">Extracted from your hero image</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-12">
        {/* Individual Colors by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="mb-6 text-xl font-semibold text-[#3D2A1F]">{category}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {colorPalette
                .filter((c) => c.category === category)
                .map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => copyToClipboard(color.hex)}
                    className="group relative overflow-hidden rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-lg"
                  >
                    <div className="h-24 w-full" style={{ backgroundColor: color.hex }} />
                    <div className="bg-white p-3">
                      <p className="text-sm font-medium text-[#3D2A1F]">{color.name}</p>
                      <p className="font-mono text-xs text-[#5C4535]">{color.hex}</p>
                    </div>
                    <div className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                      {copiedColor === color.hex ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-[#5C4535]" />
                      )}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}

        {/* Two-Color Gradient Plates */}
        <div className="mb-12">
          <h2 className="mb-2 text-xl font-semibold text-[#3D2A1F]">Two-Color Gradient Plates</h2>
          <p className="mb-6 text-sm text-[#5C4535]">Copy gradient value or full CSS code</p>
          
          {["Sky Blues", "Sunset Warmth", "Sky to Sunset", "With Neutrals"].map((category) => (
            <div key={category} className="mb-8">
              <h3 className="mb-4 text-base font-medium text-[#5B8BA8]">{category}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {twoColorGradients
                  .filter((g) => g.category === category)
                  .map((grad) => (
                    <div
                      key={grad.name}
                      className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
                    >
                      <div className="h-24 w-full" style={{ background: grad.gradient }} />
                      <div className="p-3">
                        <p className="mb-2 text-sm font-medium text-[#3D2A1F]">{grad.name}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-5 w-5 rounded-full border border-gray-200"
                              style={{ backgroundColor: grad.from }}
                              title={grad.from}
                            />
                            <span className="text-xs text-[#5C4535]">to</span>
                            <div
                              className="h-5 w-5 rounded-full border border-gray-200"
                              style={{ backgroundColor: grad.to }}
                              title={grad.to}
                            />
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[#5B8BA8] transition-colors hover:bg-[#5B8BA8]/10"
                              >
                                {copiedGradient === grad.gradient ? (
                                  <>
                                    <Check className="h-3 w-3" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3" />
                                    Copy
                                    <ChevronDown className="h-3 w-3" />
                                  </>
                                )}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => copyGradient(grad.gradient, "css")}>
                                Copy as CSS
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyGradient(grad.gradient, "value")}>
                                Copy gradient value
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-2 flex justify-between font-mono text-[10px] text-[#5C4535]/70">
                          <span>{grad.from}</span>
                          <span>{grad.to}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Multi-Color Gradient Suggestions */}
        <div className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-[#3D2A1F]">Multi-Color Gradients</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gradientSuggestions.map((grad) => (
              <div
                key={grad.name}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
              >
                <div className="h-32 w-full" style={{ background: grad.gradient }} />
                <div className="p-4">
                  <p className="mb-2 font-medium text-[#3D2A1F]">{grad.name}</p>
                  <div className="mb-3 flex gap-1">
                    {grad.colors.map((c, i) => (
                      <div
                        key={i}
                        className="h-6 w-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 rounded-lg bg-[#5B8BA8]/10 px-3 py-1.5 text-xs font-medium text-[#5B8BA8] transition-colors hover:bg-[#5B8BA8]/20">
                        {copiedGradient === grad.gradient ? (
                          <>
                            <Check className="h-3 w-3" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                            <ChevronDown className="h-3 w-3" />
                          </>
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => copyGradient(grad.gradient, "css")}>
                        Copy as CSS
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyGradient(grad.gradient, "value")}>
                        Copy gradient value
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Palette */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-[#3D2A1F]">Recommended 5-Color Palette</h2>
          <div className="grid grid-cols-5 gap-2 overflow-hidden rounded-xl">
            {[
              { hex: "#5B8BA8", name: "Primary" },
              { hex: "#D4956A", name: "Secondary" },
              { hex: "#FFF8F0", name: "Background" },
              { hex: "#3D2A1F", name: "Text" },
              { hex: "#E8B08A", name: "Accent" },
            ].map((color) => (
              <button
                key={color.hex}
                onClick={() => copyToClipboard(color.hex)}
                className="group relative"
              >
                <div className="h-20 w-full transition-all hover:scale-105" style={{ backgroundColor: color.hex }} />
                <p className="mt-2 text-center text-xs font-medium text-[#5C4535]">{color.name}</p>
                <p className="text-center font-mono text-xs text-[#5C4535]/70">{color.hex}</p>
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#5C4535]">
            This balanced palette uses the calming blue as primary, warm sunset tones as secondary/accent,
            cream for backgrounds, and deep brown for text — perfectly matching your hero section's aesthetic.
          </p>

          {/* Recommended Gradients */}
          <div className="mt-8 border-t border-[#5C4535]/10 pt-8">
            <h3 className="mb-4 text-base font-semibold text-[#3D2A1F]">Recommended Gradients</h3>
            <p className="mb-4 text-sm text-[#5C4535]">
              Gradients using palette colors — ideal for heroes, section backgrounds, or buttons.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Sky to Cream", gradient: "linear-gradient(180deg, #5B8BA8 0%, #FFF8F0 100%)" },
                { name: "Sunset Fade", gradient: "linear-gradient(180deg, #D4956A 0%, #FFF8F0 100%)" },
                { name: "Teal Fade", gradient: "linear-gradient(135deg, #7BA5B8 0%, #B8D4DE 100%)" },
                { name: "Peach Dream", gradient: "linear-gradient(180deg, #DDA478 0%, #E8B08A 100%)" },
                { name: "Calm to Warm", gradient: "linear-gradient(135deg, #B8D4DE 0%, #C98B5F 100%)" },
              ].map((grad) => (
                <div
                  key={grad.name}
                  className="overflow-hidden rounded-xl border border-[#5C4535]/10 transition-shadow hover:shadow-md"
                >
                  <div className="h-20 w-full" style={{ background: grad.gradient }} />
                  <div className="flex items-center justify-between p-3">
                    <p className="text-sm font-medium text-[#3D2A1F]">{grad.name}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[#5B8BA8] transition-colors hover:bg-[#5B8BA8]/10">
                          {copiedGradient === grad.gradient ? (
                            <>
                              <Check className="h-3 w-3" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" /> Copy
                              <ChevronDown className="h-3 w-3" />
                            </>
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => copyGradient(grad.gradient, "css")}>
                          Copy as CSS
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyGradient(grad.gradient, "value")}>
                          Copy gradient value
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
