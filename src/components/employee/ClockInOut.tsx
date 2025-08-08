import React, { useState, useEffect } from 'react';
import { Clock, Camera, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTimeTracking } from '../../hooks/useTimeTracking';

const ClockInOut: React.FC = () => {
  const { user } = useAuth();
  const { currentEntry, clockIn, clockOut, getTodayEntries, getEmployeeStats } = useTimeTracking();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayEntries = getTodayEntries(user?.id || '');
  const weekStats = getEmployeeStats(user?.id || '', 'week');
  const isWorking = !!currentEntry;

  const handleClockIn = async () => {
    if (!user) return;
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    clockIn(user.id, note);
    setNote('');
    setIsLoading(false);
  };

  const handleClockOut = async () => {
    if (!currentEntry) return;
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    clockOut(currentEntry.id, note);
    setNote('');
    setIsLoading(false);
  };

  const getWorkingDuration = () => {
    if (!currentEntry) return '0:00:00';
    
    const duration = Date.now() - new Date(currentEntry.clockIn).getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 mt-2">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        <p className="text-2xl lg:text-4xl font-mono font-bold text-blue-600 mt-2">
          {currentTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Status Card */}
      <div className="max-w-md mx-auto">
        <div className={`p-6 rounded-xl shadow-lg text-center ${
          isWorking ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200'
        }`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isWorking ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <Clock className={`h-8 w-8 ${
              isWorking ? 'text-green-600' : 'text-gray-600'
            }`} />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {isWorking ? 'Currently Working' : 'Not Working'}
          </h2>
          
          {isWorking && (
            <>
              <p className="text-sm text-gray-600 mb-2">
                Clocked in at {new Date(currentEntry.clockIn).toLocaleTimeString()}
              </p>
              <p className="text-2xl font-mono font-bold text-green-600">
                {getWorkingDuration()}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Clock In/Out Controls */}
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add a note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Starting morning shift..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <button
          onClick={isWorking ? handleClockOut : handleClockIn}
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
            isWorking
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          } ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
          }`}
        >
          {isLoading ? 'Processing...' : isWorking ? 'Clock Out' : 'Clock In'}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-blue-600">{todayEntries.length}</div>
          <div className="text-sm text-gray-600">Entries Today</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">{weekStats.totalHours.toFixed(1)}h</div>
          <div className="text-sm text-gray-600">This Week</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-purple-600">{weekStats.avgHoursPerDay.toFixed(1)}h</div>
          <div className="text-sm text-gray-600">Daily Average</div>
        </div>
      </div>

      {/* Today's Entries */}
      {todayEntries.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today's Activity
            </h3>
          </div>
          
          <div className="p-4">
            <div className="space-y-3">
              {todayEntries.map((entry, index) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      entry.clockOut ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Entry #{index + 1}
                      </p>
                      {entry.note && (
                        <p className="text-xs text-gray-600">{entry.note}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right text-sm">
                    <div className="text-gray-900">
                      {new Date(entry.clockIn).toLocaleTimeString()} - {' '}
                      {entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : 'Working'}
                    </div>
                    {entry.totalHours && (
                      <div className="text-gray-600">{entry.totalHours}h</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockInOut;