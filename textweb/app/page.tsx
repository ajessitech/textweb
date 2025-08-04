"use client";

import React, { forwardRef, useState } from "react";
import Image from "next/image";

// Utility function for class names (simplified version of cn)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Button Component (inline shadcn Button)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<string, string> = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Input Component (inline shadcn Input)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    const baseStyles =
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return (
      <input
        type={type}
        className={cn(baseStyles, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Main Website Component
export default function ArcherWebsite() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xgvzlylq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* CSS Variables for design system */}
      <style jsx global>{`
        :root {
          --background: 0 0% 100%;
          --foreground: 240 10% 3.9%;
          --card: 0 0% 100%;
          --card-foreground: 240 10% 3.9%;
          --popover: 0 0% 100%;
          --popover-foreground: 240 10% 3.9%;
          --primary: 346 77% 49.8%;
          --primary-foreground: 355.7 100% 97.3%;
          --secondary: 240 4.8% 95.9%;
          --secondary-foreground: 240 5.9% 10%;
          --muted: 240 4.8% 95.9%;
          --muted-foreground: 240 3.8% 46.1%;
          --accent: 240 4.8% 95.9%;
          --accent-foreground: 240 5.9% 10%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 0 0% 98%;
          --border: 240 5.9% 90%;
          --input: 240 5.9% 90%;
          --ring: 346 77% 49.8%;
          --radius: 0.5rem;
        }

        @font-face {
          font-family: 'Retro Gaming';
          src: url('/Retro Gaming.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        body {
          font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <Image
              src="/archerlogo.svg"
              alt="Archer Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span 
              className="font-medium text-gray-900"
              style={{ 
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '28px'
              }}
            >
              archer
            </span>
          </div>
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#000000] hover:bg-[#333333] text-white font-medium px-6 sm:px-8 py-3 rounded-lg text-base inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Book a Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:py-32 text-left sm:text-center">
        <p 
          style={{
            '--font-selector': 'R0Y7R2Vpc3QtNTAw',
            '--framer-font-family': 'var(--font-geist-sans), sans-serif',
            '--framer-font-size': '68px',
            '--framer-font-weight': '500',
            '--framer-letter-spacing': '-0.04em',
            '--framer-line-height': '120%',
            '--framer-text-alignment': 'center',
            '--framer-text-color': 'rgb(39, 39, 39)',
            fontFamily: 'var(--framer-font-family)',
            fontSize: 'var(--framer-font-size)',
            fontWeight: 'var(--framer-font-weight)',
            letterSpacing: 'var(--framer-letter-spacing)',
            lineHeight: 'var(--framer-line-height)',
            textAlign: 'var(--framer-text-alignment)',
            color: 'var(--framer-text-color)'
          } as unknown as React.CSSProperties}
          className="framer-text mb-4 sm:mb-6 hero-heading-mobile"
        >
          Archer is a copilot for <br className="framer-text" />fast-moving credit teams.
        </p>
        <p 
          style={{
            '--font-selector': 'R0Y7R2Vpc3QtcmVndWxhcg==',
            '--framer-font-family': 'var(--font-geist-sans), sans-serif',
            '--framer-font-size': '18px',
            '--framer-letter-spacing': '-0.03em',
            '--framer-line-height': '150%',
            '--framer-text-alignment': 'center',
            '--framer-text-color': 'rgb(95, 95, 95)',
            fontFamily: 'var(--framer-font-family)',
            fontSize: 'var(--framer-font-size)',
            letterSpacing: 'var(--framer-letter-spacing)',
            lineHeight: 'var(--framer-line-height)',
            textAlign: 'var(--framer-text-alignment)',
            color: 'var(--framer-text-color)'
          } as unknown as React.CSSProperties}
          className="framer-text mb-8 sm:mb-12 max-w-3xl mx-auto px-2 hero-subheading-mobile"
        >
          Archer automates the tedious work of underwriting by letting analysts ingest entire data rooms, run financial analysis, and generate IC-ready credit memos, right from their dashboard.
        </p>

        {/* Email Signup */}
        {isSubmitted ? (
          <div className="flex flex-col items-center gap-3 max-w-sm sm:max-w-md mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
            <div className="text-green-600 font-medium text-base">
              ✓ Submitted! We'll be in touch soon.
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-gray-500 text-sm underline hover:text-gray-700"
            >
              Submit another email
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto mb-12 sm:mb-16 px-4 sm:px-0"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="flex-1 h-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent text-base disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#000000] hover:bg-[#333333] text-white font-medium px-6 sm:px-8 py-3 rounded-lg text-base inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Book a Demo'}
            </Button>
          </form>
        )}
      </section>

      {/* Product Demo Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-20">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
          <Image
            src="/hero.png"
            alt="Archer product demo showing Figma integration"
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Company Logos - Marquee */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-32">
        <p className="text-center text-gray-500 text-sm mb-8 sm:mb-12">Credit teams who felt Archer's need</p>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-12 sm:space-x-16 lg:space-x-20">
            {/* First set of logos */}
            <div className="flex items-center space-x-12 sm:space-x-16 lg:space-x-20 opacity-60 flex-shrink-0">
              <Image src="https://ext.same-assets.com/1375812091/2759214492.png" alt="Microsoft" width={120} height={40} className="h-6 sm:h-8 w-auto" />
              <Image src="https://ext.same-assets.com/1375812091/3770437404.png" alt="Slack" width={120} height={40} className="h-6 sm:h-8 w-auto" />
              <Image src="https://ext.same-assets.com/1375812091/1259129438.png" alt="Intuit" width={120} height={40} className="h-6 sm:h-8 w-auto" />
              <Image src="https://ext.same-assets.com/1375812091/442172929.png" alt="ClickUp" width={120} height={40} className="h-6 sm:h-8 w-auto" />
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center space-x-12 sm:space-x-16 lg:space-x-20 opacity-60 flex-shrink-0">
              <Image src="https://ext.same-assets.com/1375812091/2759214492.png" alt="Microsoft" width={120} height={40} className="h-6 sm:h-8 w-auto" />
              <Image src="https://ext.same-assets.com/1375812091/3770437404.png" alt="Slack" width={120} height={40} className="h-6 sm:h-8 w-auto" />
              <Image src="https://ext.same-assets.com/1375812091/1259129438.png" alt="Intuit" width={120} height={40} className="h-6 sm:h-8 w-auto" />
              <Image src="https://ext.same-assets.com/1375812091/442172929.png" alt="ClickUp" width={120} height={40} className="h-6 sm:h-8 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Designed for Designers Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 sm:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Designed for Lenders<br />Who Move Fast
            </h2>
          </div>
          <div>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Archer integrates directly with your workflow to eliminate manual work, speed up diligence,
              and support better credit decisions—without increasing risk.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mt-12 sm:mt-20">
          {/* Ingest Entire Data Rooms */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/upload.png"
                alt="Ingest Entire Data Rooms"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="px-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Ingest Entire Data Rooms</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Archer understands your source documents. You can drag and drop PDFs,
                spreadsheets, and emails to start your analysis instantly.
              </p>
            </div>
          </div>

          {/* 2x your coverage, half your workload */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/memo.png"
                alt="2x your coverage, half your workload"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="px-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">2x your coverage, half your workload.</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Generate IC-ready memos in minutes, not weeks, allowing your team
                to cover more deals with less manual effort.
              </p>
            </div>
          </div>

          {/* Adapts to your credit policy */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/box.png"
                alt="Adapts to your credit policy"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="px-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Adapts to your credit policy</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Archer uses your custom underwriting criteria and credit box
                to run analysis that stays compliant.
              </p>
            </div>
          </div>

          {/* No more manual data entry */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/manual.png"
                alt="No more manual data entry"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="px-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">No more manual data entry</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Stop spot-checking. Archer processes 100% of borrower data and
                cites every number back to the source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ChatGPT vs Archer Comparison */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              Spreadsheets Weren't Built for Underwriting. <span className="text-[#000000]">Archer Is.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* ChatGPT Column */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
                <Image
                  src="/Frame-9.svg"
                  alt="Legacy Diligence"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Legacy Diligence</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    title: "Relies on sample data, not full picture",
                    description:
                      "Forces you to make decisions on incomplete information, leaving you exposed to fraud and errors.",
                  },
                  {
                    title: "Prone to human error",
                    description:
                      "Manual data entry and copy-pasting across documents is slow, tedious, and invites mistakes.",
                  },
                  {
                    title: "High effort, low context",
                    description:
                      "Requires weeks of manual grunt work for a static report with no connection to the source data.",
                  },
                  {
                    title: "Built for cells, not for credit",
                    description:
                      "Helpful for basic calculations, but not usable for comprehensive, auditable credit analysis.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4 px-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Archer Column */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
                <Image
                  src="/archerlogo.svg"
                  alt="Archer"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <h3 
                  className="text-xl sm:text-2xl font-medium text-gray-900"
                  style={{ 
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    letterSpacing: '-0.04em'
                  }}
                >
                  archer
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    title: "Analyzes 100% of borrower data",
                    description:
                      "Archer sees the whole picture—every transaction, invoice, and data point is part of the analysis.",
                  },
                  {
                    title: "Every number cited to the source",
                    description:
                      "It works with your documents, citing every figure back to its origin. No errors. No black boxes.",
                  },
                  {
                    title: "Minimal input, smart output",
                    description:
                      "Give Archer a data room—it responds with a fully drafted, IC-ready memo in minutes.",
                  },
                  {
                    title: "Designed for credit operations",
                    description:
                      "Archer is built to think in credit, not cells—finally, an AI that speaks underwriting and connects with your data.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4 px-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#000000] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Faster Section - Founder's Letter */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 px-2">
              Scale Operations, Not Headcount.
            </h2>
          </div>

          <div className="prose prose-sm sm:prose-lg mx-auto text-gray-600 px-2">
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Dear Lender,</p>

            <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              You're juggling deal flow, chasing down data, and racing deadlines.
              But great underwriting doesn't come from rushing—it comes from <span className="text-[#000000] font-semibold">rigorous diligence</span>.
              And that's the one thing no one has time for anymore.
            </p>

            <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              As the founding engineer at a fintech that underwrote over $1B in loans, I lived this problem.
              We saw firsthand how a $100k deal required the same manual effort as a $10M deal.
              The market pull for a solution was so strong that a prospective customer tried to
              acquihire our team just to get this built.
            </p>

            <p className="mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
              That's why I'm building <span className="text-[#000000] font-semibold">Archer</span>—a tool made for credit teams.
              A tool where AI eliminates the grunt work so you can focus on the <span className="text-[#000000] font-semibold">decisions that matter</span>.
              Because credit deserves better. And it starts with getting your time back.
            </p>

            <div className="text-center">
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-[#000000] hover:bg-[#333333] text-white font-medium px-6 sm:px-8 py-3 rounded-lg text-base inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Book a Demo
              </Button>
            </div>
          </div>

          {/* LinkedIn Post Screenshot */}
          <div className="mt-12 sm:mt-20">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
              <Image
                src="https://ext.same-assets.com/1375812091/4201220259.png"
                alt="LinkedIn post from Siddharth Vij about designing 10x faster"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">©2025 tryarcher.ai</div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Image
                src="/archerlogo.svg"
                alt="Archer Logo"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span 
                className="text-xl font-medium text-gray-900"
                style={{ 
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  letterSpacing: '-0.04em'
                }}
              >
                archer
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
