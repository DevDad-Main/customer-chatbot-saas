"use client";
import { cn } from "@/lib/utils";
import {
  Building2,
  ChevronLeft,
  Globe,
  LinkIcon,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface InitialData {
  businessName: string;
  websiteURL: string;
  externalLinks: string;
}

const STEPS = [
  {
    id: "name",
    label: "Business Name",
    question: "What is the name of your business?",
    description: "This will be the identity of your AI assistant.",
    icon: Building2,
    placeHolder: "e.g Vertex Corp",
    type: "text",
    field: "businessName" as keyof InitialData,
  },
  {
    id: "website",
    label: "Website",
    question: "What are your website URLs?",
    description:
      "We will scape data from the provided data to train your chat bot.",
    icon: Globe,
    placeHolder: "https://exampledomain.com",
    type: "url",
    field: "websiteURL" as keyof InitialData,
  },
  {
    id: "links",
    label: "Extra Content",
    question: "Any other links to add?",
    description: "Add external links like Notion pages or help docs to in",
    icon: LinkIcon,
    placeHolder: "https://notion.so/docs...",
    type: "textarea",
    badge: "Optional",
    field: "externalLinks" as keyof InitialData,
  },
];

const InitialForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InitialData>({
    businessName: "",
    websiteURL: "",
    externalLinks: "",
  });

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const stepData = STEPS[currentStep];
  const Icon = stepData.icon;

  const isStepValid =
    currentStep >= 2 ||
    (formData[stepData.field] && formData[stepData.field].trim() !== "");

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  }, [currentStep]);

  const handleNext = async () => {
    if (isSubmitting) return;

    const currentField = STEPS[currentStep].field;
    const value = formData[currentField];

    if (currentStep < 2 && (!value || value.trim() === "")) return;

    if (currentStep < STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (STEPS[currentStep].type === "textarea") {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = async () => {
    // TODO: Flesh out the rest of the component first
    setIsSubmitting(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto min-h-100 flex flex-col justify-center">
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5">
        <div
          className="h-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="fixed top-6 right- md:top-8 md:right-8 text-xs font-medium text-zinc-600 uppercase tracking-widest pointer-events-none fade-in">
        Setup your account
      </div>

      {isSubmitting ? (
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-16 h-16 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-8 h-8 text-white animate-bounce" />
              {/* Potentially add confetti animation here and see how it looks */}
            </div>
          </div>
          <h2 className="text-2xl font-medium text-white mb-2">
            Storing your Company info!.
          </h2>
          <p className="text-zinc-500">Scanning {formData.websiteURL}...</p>
        </div>
      ) : (
        <div
          className={cn(
            "transition-all duration-300 ease-in-out transform",
            isAnimating
              ? "opacity-0 translate-y-4 scale-95"
              : "opacity-100 translate-y-0 scale-100",
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="tex-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded-full -ml-2 w-8 h-8"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}

              {/* Step the user is currently on in the onboarding phase of the form */}
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wide">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div space-y-2></div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InitialForm;
