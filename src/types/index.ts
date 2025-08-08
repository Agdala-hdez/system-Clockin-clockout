// Core types for the time tracking system
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  profilePhoto?: string;
  department?: string;
  contractType: 'hourly' | 'daily';
  payRate: number;
  createdAt: Date;
  isActive: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  address: string;
  contactInfo: string;
  taxData: string;
  timezone: string;
  location: string;
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  clockIn: Date;
  clockOut?: Date;
  note?: string;
  photo?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  adminEditedBy?: string;
  totalHours?: number;
}

export interface PayrollPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  cutoffDate: Date;
  status: 'draft' | 'processed' | 'paid';
  employees: PayrollEmployee[];
}

export interface PayrollEmployee {
  employeeId: string;
  name: string;
  totalHours: number;
  payRate: number;
  totalPay: number;
  contractType: 'hourly' | 'daily';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string; // undefined for broadcast messages
  subject: string;
  content: string;
  attachments?: string[];
  timestamp: Date;
  isRead: boolean;
  senderName: string;
}

export interface AttendanceStats {
  employeeId: string;
  name: string;
  totalHours: number;
  daysWorked: number;
  avgHoursPerDay: number;
  status: 'clocked-in' | 'clocked-out';
  lastActivity: Date;
}