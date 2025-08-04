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

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
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
            className="bg-[#000000] hover:bg-[#333333] text-white px-6 sm:px-8 py-3 rounded-lg inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              letterSpacing: '-0.04em',
              fontWeight: 500
            }}
          >
            Book a Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:py-16 text-left sm:text-center">
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
          Archer is copilot for <br className="framer-text" />fast-moving credit teams.
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
              className="text-gray-500 underline hover:text-gray-700"
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '14px',
                fontWeight: 400
              }}
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
              className="bg-[#000000] hover:bg-[#333333] text-white px-6 sm:px-8 py-3 rounded-lg inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontWeight: 500
              }}
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
            alt="Archer product demo showing credit memo generation"
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </section>


      {/* Company Logos - Marquee */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <p className="text-center text-gray-500 text-base sm:text-lg mb-8 sm:mb-12 pt-8 sm:pt-12">Designed to seamlessly integrate with your systems</p>
        
        {/* First Row - Left to Right */}
        <div className="relative overflow-hidden mb-12 sm:mb-16">
          <div className="flex animate-marquee space-x-8 sm:space-x-12">
            {/* First set of logos */}
            <div className="flex items-center space-x-8 sm:space-x-12 opacity-60 flex-shrink-0">
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Creditsafe_Logo.svg.png" alt="Creditsafe" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Dropbox_(service)-Icon-Logo.wine.svg" alt="Dropbox" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Experian_logo.svg.png" alt="Experian" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Gmail-Logo-2013.png" alt="Gmail" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/google-drive-icon-google-product-illustration-free-png.webp" alt="Google Drive" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Jack-henry-logo.svg.png" alt="Jack Henry" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/MarineTraffic_logo.jpg" alt="MarineTraffic" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Microsoft_Excel-Logo.wine.svg" alt="Microsoft Excel" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/MX-logo-black-1.png" alt="MX" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/oraclelogo.jpg" alt="Oracle" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center space-x-8 sm:space-x-12 opacity-60 flex-shrink-0">
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Creditsafe_Logo.svg.png" alt="Creditsafe" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Dropbox_(service)-Icon-Logo.wine.svg" alt="Dropbox" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Experian_logo.svg.png" alt="Experian" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Gmail-Logo-2013.png" alt="Gmail" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/google-drive-icon-google-product-illustration-free-png.webp" alt="Google Drive" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Jack-henry-logo.svg.png" alt="Jack Henry" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/MarineTraffic_logo.jpg" alt="MarineTraffic" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Microsoft_Excel-Logo.wine.svg" alt="Microsoft Excel" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/MX-logo-black-1.png" alt="MX" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/oraclelogo.jpg" alt="Oracle" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee-reverse space-x-8 sm:space-x-12">
            {/* First set of logos */}
            <div className="flex items-center space-x-8 sm:space-x-12 opacity-60 flex-shrink-0">
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Plaid-logo.png" alt="Plaid" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/quickbooks-brand-preferred-logo-50-50-black-external.png" alt="QuickBooks" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Salesforce.com_logo.svg.webp" alt="Salesforce" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/SharePoint-logo1.png" alt="SharePoint" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Shipsgo_idH2s6vbMX_1.svg" alt="Shipsgo" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/sp-global-logo-png_seeklogo-344551.png" alt="S&P Global" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Stripe_Logo,_revised_2016.svg.png" alt="Stripe" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/SWIFT_2021_logo.svg.png" alt="SWIFT" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/images.png" alt="Logo" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center space-x-8 sm:space-x-12 opacity-60 flex-shrink-0">
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Plaid-logo.png" alt="Plaid" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/quickbooks-brand-preferred-logo-50-50-black-external.png" alt="QuickBooks" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Salesforce.com_logo.svg.webp" alt="Salesforce" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/SharePoint-logo1.png" alt="SharePoint" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Shipsgo_idH2s6vbMX_1.svg" alt="Shipsgo" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/sp-global-logo-png_seeklogo-344551.png" alt="S&P Global" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/Stripe_Logo,_revised_2016.svg.png" alt="Stripe" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/SWIFT_2021_logo.svg.png" alt="SWIFT" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
              <div className="w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center">
                <Image src="/marquee-logos/images.png" alt="Logo" width={120} height={48} className="max-h-full w-auto object-contain grayscale" />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Designed for Designers Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 sm:mb-16">
          <div>
            <h2 style={{
              fontFamily: '"Geist", "Geist Placeholder", sans-serif',
              fontSize: '40px',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: '130%',
              color: 'rgb(39, 39, 39)'
            }}>
              Designed for Lenders<br />Who Move Fast
            </h2>
          </div>
          <div>
            <p style={{
              '--font-selector': 'R0Y7R2Vpc3QtNTAw',
              '--framer-font-family': '"Geist", "Geist Placeholder", sans-serif',
              '--framer-font-size': '18px',
              '--framer-font-weight': '500',
              '--framer-letter-spacing': '-0.04em',
              '--framer-line-height': '130%',
              '--framer-text-color': 'rgb(39, 39, 39)',
              fontFamily: '"Geist", "Geist Placeholder", sans-serif',
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: '130%',
              color: 'rgb(39, 39, 39)'
            } as React.CSSProperties}>
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
              <h3 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '20px',
                fontWeight: 500,
                color: 'rgb(39, 39, 39)',
                marginBottom: '0.75rem'
              }}>Ingest Entire Data Rooms</h3>
              <p style={{
                '--font-selector': 'R0Y7R2Vpc3QtNTAw',
                '--framer-font-family': '"Geist", "Geist Placeholder", sans-serif',
                '--framer-font-size': '18px',
                '--framer-font-weight': '500',
                '--framer-letter-spacing': '-0.04em',
                '--framer-line-height': '130%',
                '--framer-text-color': 'rgb(39, 39, 39)',
                fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: '130%',
                color: 'rgb(39, 39, 39)'
              } as React.CSSProperties}>
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
              <h3 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '20px',
                fontWeight: 500,
                color: 'rgb(39, 39, 39)',
                marginBottom: '0.75rem'
              }}>2x your coverage, half your workload.</h3>
              <p style={{
                '--font-selector': 'R0Y7R2Vpc3QtNTAw',
                '--framer-font-family': '"Geist", "Geist Placeholder", sans-serif',
                '--framer-font-size': '18px',
                '--framer-font-weight': '500',
                '--framer-letter-spacing': '-0.04em',
                '--framer-line-height': '130%',
                '--framer-text-color': 'rgb(39, 39, 39)',
                fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: '130%',
                color: 'rgb(39, 39, 39)'
              } as React.CSSProperties}>
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
              <h3 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '20px',
                fontWeight: 500,
                color: 'rgb(39, 39, 39)',
                marginBottom: '0.75rem'
              }}>Adapts to your credit policy</h3>
              <p style={{
                '--font-selector': 'R0Y7R2Vpc3QtNTAw',
                '--framer-font-family': '"Geist", "Geist Placeholder", sans-serif',
                '--framer-font-size': '18px',
                '--framer-font-weight': '500',
                '--framer-letter-spacing': '-0.04em',
                '--framer-line-height': '130%',
                '--framer-text-color': 'rgb(39, 39, 39)',
                fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: '130%',
                color: 'rgb(39, 39, 39)'
              } as React.CSSProperties}>
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
              <h3 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '20px',
                fontWeight: 500,
                color: 'rgb(39, 39, 39)',
                marginBottom: '0.75rem'
              }}>No more manual data entry</h3>
              <p style={{
                '--font-selector': 'R0Y7R2Vpc3QtNTAw',
                '--framer-font-family': '"Geist", "Geist Placeholder", sans-serif',
                '--framer-font-size': '18px',
                '--framer-font-weight': '500',
                '--framer-letter-spacing': '-0.04em',
                '--framer-line-height': '130%',
                '--framer-text-color': 'rgb(39, 39, 39)',
                fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: '130%',
                color: 'rgb(39, 39, 39)'
              } as React.CSSProperties}>
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
            <h2 className="text-center mb-4 sm:mb-6 px-2" style={{
              fontFamily: '"Geist", "Geist Placeholder", sans-serif',
              fontSize: '40px',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: '130%',
              color: 'rgb(39, 39, 39)'
            }}>
            Make Credit Operations 10x More Efficient
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Legacy Underwriting Column */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
                <Image
                  src="/Frame-9.svg"
                  alt="Manual Due Diligence"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <h3 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  letterSpacing: '-0.04em',
                  fontSize: '28px',
                  fontWeight: 500,
                  color: 'rgb(39, 39, 39)'
                }}>Legacy Underwriting</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    title: "Deals stalled by paperwork",
                    description:
                      "Weeks of manual data entry creates pipeline bottlenecks and delays closing your deals.",
                  },
                  {
                    title: "Risky sample-based reviews",
                    description:
                      "Only a fraction of borrower data is ever reviewed, exposing your firm to fraud.",
                  },
                  {
                    title: "Prone to costly errors",
                    description:
                      "Simple data entry mistakes and broken spreadsheets can lead to billion-dollar financial blunders.",
                  },
                  {
                    title: "Outdated portfolio snapshots",
                    description:
                      "Periodic reviews leave you exposed to credit risks that emerge between reporting cycles.",
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
                      <p style={{
                '--font-selector': 'R0Y7R2Vpc3QtNTAw',
                '--framer-font-family': '"Geist", "Geist Placeholder", sans-serif',
                '--framer-font-size': '18px',
                '--framer-font-weight': '500',
                '--framer-letter-spacing': '-0.04em',
                '--framer-line-height': '130%',
                '--framer-text-color': 'rgb(39, 39, 39)',
                fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: '130%',
                color: 'rgb(39, 39, 39)'
              } as React.CSSProperties}>
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
                  alt="archer"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <h3 
                  className="text-gray-900"
                  style={{ 
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    letterSpacing: '-0.04em',
                    fontSize: '28px',
                    fontWeight: 500
                  }}
                >
                  archer
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    title: "Accelerate your underwriting process",
                    description:
                      "Instantly ingest entire data rooms to generate IC-ready credit memos in just minutes.",
                  },
                  {
                    title: "Analyze every single transaction",
                    description:
                      "We process every invoice, bank line, and shipping record—no more sampling, no blind spots.",
                  },
                  {
                    title: "Empower your credit teams",
                    description:
                      "Automating grunt work allows your analysts to evaluate more deals without increasing your headcount.",
                  },
                  {
                    title: "Continuous portfolio intelligence",
                    description:
                      "Sync new borrower data automatically to surface anomalies long before a scheduled field exam.",
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
                      <p style={{
                '--font-selector': 'R0Y7R2Vpc3QtNTAw',
                '--framer-font-family': '"Geist", "Geist Placeholder", sans-serif',
                '--framer-font-size': '18px',
                '--framer-font-weight': '500',
                '--framer-letter-spacing': '-0.04em',
                '--framer-line-height': '130%',
                '--framer-text-color': 'rgb(39, 39, 39)',
                fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: '130%',
                color: 'rgb(39, 39, 39)'
              } as React.CSSProperties}>
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

      {/* Security Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-center mb-4" style={{
              fontFamily: '"Geist", "Geist Placeholder", sans-serif',
              fontSize: '40px',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: '130%',
              color: 'rgb(39, 39, 39)'
            }}>
              Enterprise-grade Security from Day 1
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Your Data Stays Yours */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <h3 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '24px',
                fontWeight: 500,
                color: 'rgb(39, 39, 39)',
                marginBottom: '1.5rem'
              }}>Your Data Stays Yours</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Complete data ownership</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Control over retention periods</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Manage access permissions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">No data shared without consent</span>
                </li>
              </ul>
            </div>

            {/* Enterprise-Grade Protection */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <h3 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '24px',
                fontWeight: 500,
                color: 'rgb(39, 39, 39)',
                marginBottom: '1.5rem'
              }}>Enterprise-Grade Protection</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">256-bit AES encryption</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Zero-trust security model</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Role-based access controls</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Advanced MFA implementation</span>
                </li>
              </ul>
            </div>

            {/* Reliability & Transparency */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <h3 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontSize: '24px',
                fontWeight: 500,
                color: 'rgb(39, 39, 39)',
                marginBottom: '1.5rem'
              }}>Reliability & Transparency</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Continuous security monitoring</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Complete audit trails</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Top-tier cloud infrastructure</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">VPC deployment options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Design Faster Section - Founder's Letter */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-center mb-8 sm:mb-12 px-2" style={{
              fontFamily: '"Geist", "Geist Placeholder", sans-serif',
              fontSize: '40px',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: '130%',
              color: 'rgb(39, 39, 39)'
            }}>
              Scale Operations, Not Headcount.
            </h2>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#000000] hover:bg-[#333333] text-white px-12 sm:px-16 py-6 rounded-xl inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                letterSpacing: '-0.04em',
                fontWeight: 500
              }}
            >
              Book a Demo
            </Button>
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
