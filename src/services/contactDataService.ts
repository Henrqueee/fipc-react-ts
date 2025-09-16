import type { 
  ContactFormData, 
  ContactResult, 
  ContactErrorResult, 
  ContactSubmissionData 
} from '../types/contactTypes';

class ContactDataService {
  private readonly API_ENDPOINT = '/api/contact';
  private readonly RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY = 1000;

  async submitContactMessage(contactData: ContactFormData): Promise<ContactResult> {
    try {
      const submissionData: ContactSubmissionData = {
        ...contactData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      // Simulate API call with current behavior (2 second delay)
      await this.simulateApiCall(submissionData);

      return {
        success: true,
        message: 'Message sent successfully! We will contact you soon.',
        data: {
          id: this.generateMessageId(),
          timestamp: submissionData.timestamp
        }
      };
    } catch (error) {
      return this.handleContactError(error);
    }
  }

  private async simulateApiCall(data: ContactSubmissionData): Promise<void> {
    // Simulate network delay (matching current implementation)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate potential API failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Network error occurred');
    }
  }

  private handleContactError(error: unknown): ContactErrorResult {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to send message. Please try again.';

    return {
      success: false,
      message: errorMessage,
      code: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
      details: error instanceof Error ? error.stack : undefined
    };
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async retrySubmission(
    contactData: ContactFormData, 
    attempt: number = 1
  ): Promise<ContactResult> {
    try {
      return await this.submitContactMessage(contactData);
    } catch (error) {
      if (attempt < this.RETRY_ATTEMPTS) {
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * attempt));
        return this.retrySubmission(contactData, attempt + 1);
      }
      throw error;
    }
  }

  validateSubmissionData(data: ContactFormData): boolean {
    return !!(
      data.name?.trim() &&
      data.email?.trim() &&
      data.subject?.trim() &&
      data.message?.trim() &&
      data.message.trim().length >= 10 &&
      data.message.trim().length <= 1000
    );
  }

  getContactTypes(): string[] {
    return ['query-question', 'technical-issue', 'suggestion', 'partnership', 'other'];
  }
}

export const contactDataService = new ContactDataService();
export default contactDataService;