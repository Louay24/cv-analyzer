'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/env';

interface CVTabProps {
  analysisId: string;
  cvMimeType: string | null;
  cvFilePath: string | null;
  cvFileName: string | null;
  cvText: string;
}

export function CVTab({ analysisId, cvMimeType, cvFilePath, cvFileName, cvText }: CVTabProps): JSX.Element {
  const params = useParams();
  const id = (params.id as string) || analysisId;

  if (id && cvMimeType) {
    return (
      <div className="space-y-4">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          {cvMimeType === 'application/pdf' ? (
            <iframe
              src={`${API_BASE_URL}/upload/file/${id}`}
              className="w-full h-[800px] border-0 rounded"
              title={cvFileName || 'CV'}
            />
          ) : cvMimeType.startsWith('image/') ? (
            <div className="flex justify-center">
              <Image
                src={cvFilePath || `${API_BASE_URL}/upload/file/${id}`}
                alt={cvFileName || 'CV'}
                width={800}
                height={1000}
                className="max-w-full h-auto rounded"
                unoptimized
              />
            </div>
          ) : (
            <div className="prose max-w-none">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-sm text-slate-900 font-sans">
                  {cvText}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (cvText && cvText.trim()) {
    return (
      <div className="space-y-4">
        <div className="prose max-w-none">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <pre className="whitespace-pre-wrap text-sm text-slate-900 font-sans">
              {cvText}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-slate-600">No CV available. This analysis may have been created before the update. Please create a new analysis.</p>
      </div>
    </div>
  );
}

