export interface ConfirmationOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

export interface ConfirmationResult {
  confirmed: boolean;
}

export interface ConfirmationService {
  confirm(options: ConfirmationOptions): Promise<ConfirmationResult>;
}

class ConfirmationServiceImpl implements ConfirmationService {
  async confirm(options: ConfirmationOptions): Promise<ConfirmationResult> {
    const {
      title = 'Confirm Action',
      message,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
    } = options;

    const confirmed = window.confirm(`${title}\n\n${message}`);

    return {
      confirmed,
    };
  }
}

export const confirmationService = new ConfirmationServiceImpl();