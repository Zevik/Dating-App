import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../lib/api';
import { useAuth } from '../contexts/auth-context';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface Stats {
  total_users: number;
  active_users: number;
  total_matches: number;
  total_reports: number;
  reports_by_status: {
    pending: number;
    reviewed: number;
    resolved: number;
    rejected: number;
  };
  new_users_last_7_days: number;
  new_reports_last_7_days: number;
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await adminApi.getStats();
        setStats(response.stats);
        setError('');
      } catch (error) {
        setError('Failed to load statistics');
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleViewReports}>
              View Reports
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading statistics...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total_users}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.new_users_last_7_days} new in the last 7 days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.active_users}</div>
                <p className="text-xs text-muted-foreground">
                  {((stats.active_users / stats.total_users) * 100).toFixed(1)}% of total users
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total_matches}</div>
                <p className="text-xs text-muted-foreground">
                  Avg {(stats.total_matches / Math.max(1, stats.total_users)).toFixed(1)} matches per user
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total_reports}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.new_reports_last_7_days} new in the last 7 days
                </p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Reports by Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{stats.reports_by_status.pending}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Reviewed</p>
                    <p className="text-2xl font-bold">{stats.reports_by_status.reviewed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                    <p className="text-2xl font-bold">{stats.reports_by_status.resolved}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold">{stats.reports_by_status.rejected}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardPage; 