export interface ContactFormData extends Record<string, string> {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactResult {
  success: boolean;
  message: string;
  data?: {
    id: string;
    timestamp: string;
  };
}

export interface ContactErrorResult {
  success: false;
  message: string;
  code?: string;
  details?: string;
}

export interface ContactSubjectOption {
  value: string;
  label: string;
}

export const CONTACT_SUBJECT_OPTIONS: ContactSubjectOption[] = [
  { value: "query-question", label: "Query question" },
  { value: "technical-issue", label: "Technical issue" },
  { value: "suggestion", label: "Suggestion" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" }
];

export type ContactFieldName = keyof ContactFormData;

export interface ContactSubmissionData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  userAgent?: string;
}