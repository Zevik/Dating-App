import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../lib/api';
import { useAuth } from '../contexts/auth-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectItem } from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../components/ui/toast';

interface ReportedUser {
  id: number | null;
  display_name: string;
  email: string;
  profile_image_url: string | null;
}

interface Reporter {
  id: number | null;
  display_name: string;
  email: string;
  profile_image_url: string | null;
}

interface Report {
  id: number;
  reason: string;
  status: string;
  created_at: string;
  admin_note?: string;
  reporter: Reporter;
  reported: ReportedUser;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await adminApi.getReports();
        setReports(response.reports);
        setError('');
      } catch (error) {
        setError('Failed to load reports');
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesStatus =
      statusFilter === "all" || report.status.toLowerCase() === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      report.reporter?.display_name?.toLowerCase().includes(query) ||
      report.reported?.display_name?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (reportId: number, newStatus: string) => {
    try {
      await adminApi.updateReportStatusViaPost(reportId, newStatus);
      // Update the local state
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: newStatus } : report
      ));
    } catch (error) {
      console.error('Error updating report status:', error);
      setError('Failed to update report status');
    }
  };

  const handleUpdateNote = async (reportId: number, note: string) => {
    try {
      await adminApi.updateReportNote(reportId, note);
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, admin_note: note } : report
      ));
      toast({
        title: "Success",
        description: "Note updated successfully",
        variant: "success"
      });
    } catch (error) {
      console.error('Error updating report note:', error);
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Reports</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading reports...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-4 m-4">
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </Select>
            </div>
            
            <Table>
              <TableCaption>
                {filteredReports.length === 0 
                  ? "No reports found matching your criteria" 
                  : `Showing ${filteredReports.length} of ${reports.length} reports`
                }
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Reported User</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Admin Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No reports found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{formatDate(report.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage 
                              src={report.reporter?.profile_image_url || ''} 
                              alt={report.reporter?.display_name || 'Unknown'} 
                            />
                            <AvatarFallback>
                              {report.reporter?.display_name?.[0] || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {report.reporter ? report.reporter.display_name : 'Unknown'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {report.reporter?.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage 
                              src={report.reported?.profile_image_url || ''} 
                              alt={report.reported?.display_name || 'Unknown'} 
                            />
                            <AvatarFallback>
                              {report.reported?.display_name?.[0] || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {report.reported ? report.reported.display_name : 'Unknown'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {report.reported?.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {report.reason.length > 50 ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">
                                  {report.reason.substring(0, 50)}...
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-md">
                                <p>{report.reason}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          report.reason
                        )}
                      </TableCell>
                      <TableCell>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            report.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {report.status !== 'reviewed' && (
                            <Button 
                              size="sm" 
                              variant={report.status === 'reviewed' ? 'default' : 'outline'}
                              onClick={() => handleStatusChange(report.id, 'reviewed')}
                            >
                              Review
                            </Button>
                          )}
                          {report.status !== 'resolved' && (
                            <Button 
                              size="sm" 
                              variant={report.status === 'resolved' ? 'default' : 'outline'}
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStatusChange(report.id, 'resolved')}
                            >
                              Resolve
                            </Button>
                          )}
                          {report.status !== 'rejected' && (
                            <Button 
                              size="sm" 
                              variant={report.status === 'rejected' ? 'default' : 'outline'}
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleStatusChange(report.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          )}
                          {report.status !== 'pending' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(report.id, 'pending')}
                            >
                              Reset
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Textarea
                          className="min-h-[80px] text-sm resize-y"
                          placeholder="Add admin note..."
                          defaultValue={report.admin_note || ""}
                          onBlur={(e) => handleUpdateNote(report.id, e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage; 