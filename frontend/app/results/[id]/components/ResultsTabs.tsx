'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ReportTab } from './ReportTab';
import { CVTab } from './CVTab';
import { JobDescriptionTab } from './JobDescriptionTab';
import type { AnalysisResult } from '@/lib/api';

interface ResultsTabsProps {
  activeTab: 'report' | 'job' | 'cv';
  setActiveTab: (tab: 'report' | 'job' | 'cv') => void;
  analysis: AnalysisResult;
  analysisId: string;
  cvMimeType: string | null;
  cvFilePath: string | null;
  cvFileName: string | null;
  cvText: string;
  jobDescription: string;
}

export function ResultsTabs({
  activeTab,
  setActiveTab,
  analysis,
  analysisId,
  cvMimeType,
  cvFilePath,
  cvFileName,
  cvText,
  jobDescription,
}: ResultsTabsProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('report')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === 'report'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Resume Report
          </button>
          <button
            onClick={() => setActiveTab('cv')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === 'cv'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            CV
          </button>
          <button
            onClick={() => setActiveTab('job')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === 'job'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Job Description
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeTab === 'report' && <ReportTab analysis={analysis} />}
        {activeTab === 'cv' && (
          <CVTab
            analysisId={analysisId}
            cvMimeType={cvMimeType}
            cvFilePath={cvFilePath}
            cvFileName={cvFileName}
            cvText={cvText}
          />
        )}
        {activeTab === 'job' && <JobDescriptionTab jobDescription={jobDescription} />}
      </CardContent>
    </Card>
  );
}



