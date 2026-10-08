import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

// Some toats service for messages, it`s much cleaner than creating different one each time somebody needs
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts = signal<Toast[]>([]);
  private nextId = 0;

  public success(message: string): void {
    this.show(message, 'success');
  }

  public error(message: string): void {
    this.show(message, 'error');
  }

  public dismiss(id: number): void {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  private show(message: string, type: 'success' | 'error'): void {
    const id = this.nextId++;
    this.toasts.update((toasts) => [...toasts, { id, message, type }]);
    setTimeout(() => this.dismiss(id), type === 'error' ? 5000 : 3000);
  }
}
