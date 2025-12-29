import { API_BASE_URL } from './env';

export interface UploadResponse {
  cvText: string;
}

export interface AnalyzeRequest {
  jobDescription: string;
}

export interface AnalysisResult {
  scores: {
    experience: number;
    skills: number;
    education: number;
  };
  missingRequirements: string[];
  strengths: string[];
  concerns: string[];
  summary: string;
}

export interface AnalyzeResponse {
  id: string;
  result: AnalysisResult;
  jobDescription: string;
  cvText: string;
  cvFilePath: string | null;
  cvFileName: string | null;
  cvMimeType: string | null;
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  result: AnalysisResult;
  jobDescription: string;
  cvText: string;
  cvFilePath: string | null;
  cvFileName: string | null;
  cvMimeType: string | null;
  createdAt: string;
}

export interface HistoryResponse {
  analyses: HistoryItem[];
}

export async function uploadCV(file: File, browserId: string): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'x-browser-id': browserId,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to upload CV' }));
    throw new Error(errorData.message || 'Failed to upload CV');
  }

  return response.json() as Promise<UploadResponse>;
}

export async function analyzeCV(
  request: AnalyzeRequest,
  browserId: string,
): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-browser-id': browserId,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to analyze CV' }));
    throw new Error(errorData.message || 'Failed to analyze CV');
  }

  return response.json() as Promise<AnalyzeResponse>;
}

export async function getAnalysisById(id: string): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch analysis' }));
    throw new Error(errorData.message || 'Failed to fetch analysis');
  }

  return response.json() as Promise<AnalyzeResponse>;
}

export async function getHistory(browserId: string): Promise<HistoryResponse> {
  const response = await fetch(`${API_BASE_URL}/analysis/history?browserId=${browserId}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch history' }));
    throw new Error(errorData.message || 'Failed to fetch history');
  }

  return response.json() as Promise<HistoryResponse>;
}

