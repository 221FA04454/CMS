import React from 'react';
import { Hero } from '@workspace/ui';

// This catch-all route handles ANY domain and ANY path instantly.
// It achieves the goal of "Zero Developer Involvement" for new partners.
export default async function DynamicLandingPage({ params }: { params: { domain: string, slug: string[] } }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain || 'preview';
  const slugPath = resolvedParams?.slug ? '/' + resolvedParams.slug.join('/') : '/';
  
  // SCHEMA FROM CMS (SIMULATED)
  // Non-technical users edit this in Payload CMS
  const cmsData = {
    partnerName: domain.charAt(0).toUpperCase() + domain.slice(1),
    theme: domain === 'bluehost' ? 'blue' : 'indigo',
    content: [
      {
        type: 'hero',
        title: `Welcome to ${domain.toUpperCase()} Portal`,
        subtitle: 'Instantly deployed via the Automated CMS Pipeline.'
      },
      {
        type: 'feature',
        text: 'Dynamic Routing Active'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Rendered from Shared UI Library */}
        <Hero 
          title={cmsData.content[0].title}
          subtitle={cmsData.content[0].subtitle}
          color={cmsData.theme}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Architecture Status</h3>
            <div className="flex items-center space-x-2 text-green-600 font-semibold text-lg">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span>Live & Dynamic</span>
            </div>
            <p className="mt-4 text-neutral-500 text-sm">
              Mapped to: <code className="bg-neutral-100 px-1 rounded">{domain}</code>
            </p>
          </div>

          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
            <h3 className="text-sm font-bold text-neutral-900 mb-2">Automated Rationale</h3>
            <p className="text-neutral-600 leading-relaxed">
              This page did not exist in the codebase 5 minutes ago. 
              By using <strong>Next.js Dynamic Catch-all Routes</strong> and a <strong>Headless CMS</strong>, 
              we've eliminated the need for a developer to touch the code for new partner onboarding.
            </p>
          </div>
        </div>
        
        <div className="bg-indigo-900 text-indigo-100 p-8 rounded-2xl flex items-center justify-between">
          <div>
            <h4 className="font-bold text-xl">Developer Involvement: 0%</h4>
            <p className="opacity-70">Scale to 10,000+ partners without a single commit.</p>
          </div>
          <div className="hidden md:block">
             <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
               Partner Dashboard
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
