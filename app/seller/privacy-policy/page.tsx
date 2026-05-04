'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  FileText,
  MapPin,
  ShieldCheck,
  Lock,
  CreditCard,
  Globe,
  Printer,
  Mail,
  HelpCircle,
} from 'lucide-react';

import TermsModal from '@/app/components/TermsModal';

export default function SellerPrivacyPolicyPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  /* ================= PRIVACY CONTENT ================= */

  const privacyContent = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content:
        'Welcome to Nirmatri Crafts. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you register and operate as a seller on our platform.',
    },
    {
      id: 'information-collection',
      title: '2. Information We Collect',
      content:
        'We collect personal information that you voluntarily provide when registering as a seller.',
      subsections: [
        'Name, email address, phone number, business address',
        'Bank account details, IFSC, PAN, GST',
        'Identity verification documents',
        'Store and product information',
        'Transaction and payout history',
        'Device and usage data',
      ],
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Your Information',
      content: 'Your information is used to:',
      subsections: [
        'Create and manage seller accounts',
        'Enable sales and payments',
        'Provide customer support',
        'Prevent fraud and misuse',
        'Comply with legal obligations',
      ],
    },
  ];

  const termsContent = [
    {
      title: 'Seller Eligibility',
      content:
        'Sellers must list only authentic, handcrafted products. Nirmatri reserves the right to verify product authenticity.',
    },
    {
      title: 'Fees & Commissions',
      content:
        'A 10% platform fee is charged on each successful sale.',
    },
    {
      title: 'Account Termination',
      content:
        'Accounts may be suspended or terminated for policy violations.',
    },
  ];

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TermsModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        termsContent={termsContent}
      />

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => router.push('/seller/register')}
              className="flex items-center gap-2 mb-4 opacity-90 hover:opacity-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Registration</span>
            </button>

            <h1 className="text-4xl font-bold mb-2">
              Privacy Policy
            </h1>

            <p className="opacity-90 mb-4">
              Seller Data Protection & Privacy Guidelines
            </p>

            <div className="flex flex-wrap gap-4 text-sm opacity-80">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Feb 4, 2026
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Version 3.0
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                India
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {privacyContent.map((section) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white dark:bg-gray-800 p-8 rounded-xl border transition-all ${
              activeSection === section.id
                ? 'border-blue-500'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">
              {section.title}
            </h2>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {section.content}
            </p>

            {section.subsections && (
              <ul className="space-y-2 ml-4 list-disc">
                {section.subsections.map((item, i) => (
                  <li
                    key={i}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        ))}

        {/* ================= COMPLIANCE ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ComplianceBadge icon={ShieldCheck} label="IT Act 2000" />
          <ComplianceBadge icon={Lock} label="ISO 27001" />
          <ComplianceBadge icon={CreditCard} label="PCI DSS" />
          <ComplianceBadge icon={Globe} label="GDPR Ready" />
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowTerms(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 border rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <FileText className="w-5 h-5" />
            View Terms of Service
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
          >
            <Printer className="w-5 h-5" />
            Print Policy
          </button>
        </div>

        {/* ================= CONTACT ================= */}
        <div className="text-center space-y-3">
          <p className="font-semibold">
            Questions about your privacy?
          </p>

          <div className="flex justify-center gap-6 text-sm">
            <a
              href="mailto:privacy@nirmatri.com"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Mail className="w-4 h-4" />
              privacy@nirmatri.com
            </a>

            <a
              href="/help"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <HelpCircle className="w-4 h-4" />
              Help Center
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= COMPLIANCE BADGE ================= */

function ComplianceBadge({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
      <Icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        {label}
      </p>
    </div>
  );
}