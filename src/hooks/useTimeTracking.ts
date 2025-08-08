import { useState, useEffect } from 'react';
import { TimeEntry, User } from '../types';

// Mock time entries
const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    employeeId: '2',
    clockIn: new Date('2024-01-15T08:00:00'),
    clockOut: new Date('2024-01-15T17:00:00'),
    totalHours: 9,
    note: 'Regular workday'
  },
  {
    id: '2',
    employeeId: '3',
    clockIn: new Date('2024-01-15T09:00:00'),
    clockOut: new Date('2024-01-15T18:00:00'),
    totalHours: 9,
    note: 'Marketing campaign work'
  },
  {
    id: '3',
    employeeId: '2',
    clockIn: new Date(),
    note: 'Started morning shift'
  }
];

export const useTimeTracking = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);

  const clockIn = (employeeId: string, note?: string, photo?: string) => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      employeeId,
      clockIn: new Date(),
      note,
      photo
    };

    setTimeEntries(prev => [...prev, newEntry]);
    setCurrentEntry(newEntry);
  };

  const clockOut = (entryId: string, note?: string) => {
    const clockOutTime = new Date();
    setTimeEntries(prev => prev.map(entry => {
      if (entry.id === entryId) {
        const totalHours = (clockOutTime.getTime() - entry.clockIn.getTime()) / (1000 * 60 * 60);
        return {
          ...entry,
          clockOut: clockOutTime,
          totalHours: Math.round(totalHours * 100) / 100,
          note: note || entry.note
        };
      }
      return entry;
    }));
    setCurrentEntry(null);
  };

  const getCurrentEntry = (employeeId: string) => {
    return timeEntries.find(entry => 
      entry.employeeId === employeeId && !entry.clockOut
    );
  };

  const getTodayEntries = (employeeId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return timeEntries.filter(entry => {
      const entryDate = new Date(entry.clockIn);
      entryDate.setHours(0, 0, 0, 0);
      return entry.employeeId === employeeId && entryDate.getTime() === today.getTime();
    });
  };

  const getEmployeeStats = (employeeId: string, period: 'week' | 'month' = 'week') => {
    const now = new Date();
    const startDate = new Date();
    
    if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else {
      startDate.setMonth(now.getMonth() - 1);
    }

    const relevantEntries = timeEntries.filter(entry => 
      entry.employeeId === employeeId && 
      entry.clockOut &&
      new Date(entry.clockIn) >= startDate
    );

    const totalHours = relevantEntries.reduce((sum, entry) => sum + (entry.totalHours || 0), 0);
    const daysWorked = relevantEntries.length;

    return {
      totalHours: Math.round(totalHours * 100) / 100,
      daysWorked,
      avgHoursPerDay: daysWorked > 0 ? Math.round((totalHours / daysWorked) * 100) / 100 : 0
    };
  };

  // Check for current entry on mount
  useEffect(() => {
    // This would typically come from props or context
    const currentEmployeeId = '2'; // Mock current user ID
    const current = getCurrentEntry(currentEmployeeId);
    setCurrentEntry(current || null);
  }, []);

  return {
    timeEntries,
    currentEntry,
    clockIn,
    clockOut,
    getCurrentEntry,
    getTodayEntries,
    getEmployeeStats,
    setTimeEntries
  };
};