import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile } from '@/pages/AdminDashboard';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  solution_type: string | null;
  status: string | null;
  created_at: string;
}

interface ContactSubmissionsManagementProps {
  userProfile: UserProfile;
}

export const ContactSubmissionsManagement = ({ userProfile }: ContactSubmissionsManagementProps) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact submissions:', error);
        toast({
          title: "Error",
          description: "Failed to load contact submissions",
          variant: "destructive",
        });
      } else {
        // Map the data to ensure all required fields are present with proper defaults
        const mappedData = (data || []).map(submission => ({
          id: submission.id,
          name: submission.name,
          email: submission.email,
          phone: submission.phone || null,
          company: submission.company || null,
          subject: submission.subject || null,
          message: submission.message,
          solution_type: submission.solution_type || null,
          status: submission.status || null,
          created_at: submission.created_at
        }));
        setSubmissions(mappedData);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        toast({
          title: "Error",
          description: "Failed to update status",
          variant: "destructive",
        });
      } else {
        setSubmissions(prev => 
          prev.map(sub => 
            sub.id === id ? { ...sub, status: newStatus } : sub
          )
        );
        toast({
          title: "Status Updated",
          description: "Submission status has been updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(null);
    }
  };

  function getStatusColor(status: string | null) {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (userProfile.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Submissions</h2>
        <Badge variant="outline" className="text-sm">
          {submissions.length} Total Submissions
        </Badge>
      </div>

      <div className="grid gap-6">
        {submissions.map((submission) => (
          <Card key={submission.id} className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{submission.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {submission.company && `${submission.company} • `}{submission.email}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getStatusColor(submission.status)} text-white`}>
                    {(submission.status || 'new').replace('_', ' ').toUpperCase()}
                  </Badge>
                  <p className="text-xs text-gray-500">
                    {formatDate(submission.created_at)}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Phone:</strong> {submission.phone || 'Not provided'}
                </div>
                <div>
                  <strong>Solution Interest:</strong> {submission.solution_type || 'General'}
                </div>
                {submission.subject && (
                  <div className="md:col-span-2">
                    <strong>Subject:</strong> {submission.subject}
                  </div>
                )}
              </div>

              <div>
                <strong className="text-sm">Message:</strong>
                <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded">
                  {submission.message}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Select
                    value={submission.status || 'new'}
                    onValueChange={(value) => updateStatus(submission.id, value)}
                    disabled={updating === submission.id}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`mailto:${submission.email}?subject=Re: ${submission.subject || 'Your inquiry'}`)}
                >
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {submissions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">No contact submissions found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
