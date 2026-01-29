"use client";

import {
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order from the 'My Orders' section. Click on any order to see its current status and tracking details.",
  },
  {
    question: "What is the return policy?",
    answer:
      "We offer easy 7-day returns for most items. Simply go to 'Returns & Refunds' and initiate a return request.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3–5 business days. Express delivery is available for select locations.",
  },
  {
    question: "How can I change my delivery address?",
    answer:
      "Go to 'Saved Addresses' to add, edit, or delete your delivery addresses.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, Cards, Net Banking, and Cash on Delivery.",
  },
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Chat Support",
    description: "Chat with our support team",
    action: "Start Chat",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "1800-123-4567 (Toll Free)",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@shopee.com",
    action: "Send Email",
  },
];

export function SupportSection() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <HelpCircle className="w-6 h-6 text-orange-500 dark:text-blue-400" />
          Help & Support
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          We’re here to help you 24/7
        </p>
      </div>

      {/* ================= CONTACT OPTIONS ================= */}
      <div className="grid gap-4 md:grid-cols-3">
        {contactOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card
              key={option.title}
              className="
                bg-white dark:bg-[#0f0f10]
                border border-orange-200 dark:border-white/10
                hover:shadow-md transition-shadow
              "
            >
              <CardContent className="pt-6 text-center">
                <div
                  className="
                    w-14 h-14 rounded-full mx-auto mb-4
                    bg-orange-100 dark:bg-blue-500/20
                    flex items-center justify-center
                  "
                >
                  <Icon className="w-7 h-7 text-orange-500 dark:text-blue-400" />
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {option.description}
                </p>

                <Button
                  className="
                    mt-4 w-full
                    bg-orange-500 hover:bg-orange-600 text-white
                    dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-black
                  "
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ================= FAQ ================= */}
      <Card className="bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  className="
                    text-left
                    text-gray-900 dark:text-gray-100
                    hover:no-underline
                  "
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* ================= QUICK LINKS ================= */}
      <Card className="bg-orange-50 dark:bg-blue-500/10 border border-orange-200 dark:border-white/10">
        <CardContent className="py-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
            Quick Links
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Shipping Policy",
              "Privacy Policy",
              "Terms of Service",
              "Refund Policy",
              "About Us",
            ].map((link) => (
              <Button
                key={link}
                variant="outline"
                size="sm"
                className="
                  border-orange-300 text-orange-600 hover:bg-orange-50
                  dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10
                "
              >
                {link}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
