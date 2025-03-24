"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ContentStrategyData,
  AutoGeneratedContent,
  ContentIdea,
} from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Play, Sparkles } from "lucide-react";

interface AutoGenerateTabProps {
  data: ContentStrategyData;
  formatDuration: (seconds: number) => string;
  onGenerateNew?: (content: AutoGeneratedContent) => void;
}

// Function to generate a random auto-generated content
const generateRandomContent = (
  existingContent: AutoGeneratedContent[],
  index: number
): AutoGeneratedContent => {
  const skincareTitles = [
    "10-Minute Skin Glow Routine for Busy Mornings",
    "Clearing Hormonal Acne: A Science-Based Approach",
    "Retinol 101: Transform Your Anti-Aging Routine",
    "Budget Skincare that Actually Works: Under $15",
    "Sensitive Skin Guide: Products that Won't Irritate",
    "How to Layer Serums Correctly: The Ultimate Guide",
    "Dermatologist-Approved Routine for Combination Skin",
    "Vitamin C Serum Benefits & How to Choose the Right One",
    "Overnight Skin Transformation: PM Routine Essentials",
    "Hydration Heroes: Best Ingredients for Dry Skin",
  ];

  const skincareDescriptions = [
    "This video breaks down an efficient morning skincare routine perfect for busy professionals. Learn how to achieve that healthy skin glow with just 10 minutes and 5 essential products that work together for maximum results.",
    "Developed with dermatologist input, this video explains the hormonal factors behind adult acne and presents a science-based routine focused on salicylic acid, niacinamide, and anti-inflammatory ingredients to effectively treat breakouts.",
    "Everything you need to know about retinol in one comprehensive guide. Learn proper application techniques, how to minimize irritation, when to use it in your routine, and what results to expect at each stage of use.",
    "You don't need expensive products for effective skincare. This video presents carefully researched affordable alternatives with the same active ingredients as luxury brands, all under $15 with proven results.",
    "Created specifically for reactive and sensitive skin types, this gentle routine features fragrance-free, hypoallergenic products that effectively treat skin concerns without causing irritation or redness.",
    "Most people apply their serums in the wrong order, reducing effectiveness. This guide explains the correct layering sequence based on molecule size and ingredients, ensuring you get maximum benefits from your products.",
    "Based on professional dermatologist recommendations, this balanced routine addresses both oily and dry areas with targeted treatments, creating harmony for combination skin without over-treating either concern.",
    "This comprehensive guide explains how Vitamin C works to brighten skin and fight free radicals, plus how to identify the most stable and effective formulations. Includes proper storage tips to maintain potency.",
    "Transform your skin while you sleep with this optimized nighttime routine. Learn how to layer products that repair, regenerate and hydrate overnight, leveraging your skin's natural renewal cycle for enhanced results.",
    "This in-depth look at hydrating ingredients explains the difference between humectants, emollients and occlusives, showing how to combine them effectively for deeply moisturized skin that stays hydrated all day.",
  ];

  const randomIndex = Math.floor(Math.random() * skincareTitles.length);
  // Generate a unique ID using timestamp to avoid duplicates
  const uniqueId = `new-auto-${index}-${Date.now()}`;

  return {
    id: uniqueId,
    title: skincareTitles[randomIndex],
    description: skincareDescriptions[randomIndex],
    videoUrl: `https://example.com/auto-video-${uniqueId}`,
    thumbnailUrl: `https://picsum.photos/seed/${uniqueId}/300/200`,
    duration: Math.floor(Math.random() * 30) + 15,
    suggestedHashtags: ["#skincare", "#skintok", "#glowingskin", "#skintips"],
  };
};

export function AutoGenerateTab({
  data,
  formatDuration,
  onGenerateNew,
}: AutoGenerateTabProps) {
  const [autoContent, setAutoContent] = useState<AutoGeneratedContent[]>(
    data.autoGeneratedContent
  );

  // Function to generate a new video
  const generateNewVideo = () => {
    const newContent = generateRandomContent(
      autoContent,
      autoContent.length + 1
    );
    setAutoContent([newContent, ...autoContent]);

    // Also call the parent component's handler if provided
    if (onGenerateNew) {
      onGenerateNew(newContent);
    }
  };

  // Function to generate a new video from a content idea
  const generateFromIdea = (idea: ContentIdea) => {
    // Generate a unique ID using timestamp to avoid duplicates
    const uniqueId = `idea-${idea.id}-${Date.now()}`;

    const newContent: AutoGeneratedContent = {
      id: uniqueId,
      title: idea.title,
      description: idea.description,
      videoUrl: `https://example.com/auto-video-${uniqueId}`,
      thumbnailUrl: `https://picsum.photos/seed/${uniqueId}/300/200`,
      duration: Math.floor(Math.random() * 30) + 15,
      suggestedHashtags: idea.suggestedHashtags,
    };

    setAutoContent([newContent, ...autoContent]);

    // Also call the parent component's handler if provided
    if (onGenerateNew) {
      onGenerateNew(newContent);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Video Content</CardTitle>
            <CardDescription>
              AI-generated video concepts based on your top-performing content
            </CardDescription>
          </div>
          <Button onClick={generateNewVideo}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate New Video
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {autoContent.map((content) => (
            <motion.div key={content.id} variants={itemVariants}>
              <Card>
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={content.thumbnailUrl}
                    alt={content.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full h-12 w-12"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {formatDuration(content.duration)}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{content.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{content.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {content.suggestedHashtags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                  <Button size="sm">Customize</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={generateNewVideo}>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate More Content
        </Button>
      </CardFooter>
    </Card>
  );
}
