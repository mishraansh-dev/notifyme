import React, { useEffect, useState } from 'react';
import {
  fetchOrgNotices,
  assignNotice,
  updateNoticeStatus,
  formatTimestamp,
  NoticeData
} from '../utils/firebaseUtils';
import StatusBadge from './StatusBadge';
import toast from 'react-hot-toast';

interface OrgDashboardProps {
  orgName: string;
  className?: string;
}

const OrgDashboard: React.FC<OrgDashboardProps> = ({ orgName, className }) => {
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchOrgNotices(orgName)
      .then(setNotices)
      .catch(err => toast.error('Failed to load notices: ' + err.message))
      .finally(() => setLoading(false));
  }, [orgName]);

  const handleAssign = async (noticeId: string) => {
    try {
      await assignNotice(noticeId, orgName);
      setNotices(prev => 
        prev.map(notice => 
          notice.id === noticeId 
            ? { ...notice, assignedOrg: orgName, status: 'ongoing' } 
            : notice
        )
      );
      toast.success('Notice assigned successfully!');
    } catch (error) {
      toast.error('Failed to assign notice');
    }
  };

  const handleStatusChange = async (noticeId: string, newStatus: string) => {
    try {
      await updateNoticeStatus(noticeId, newStatus as any);
      setNotices(prev => 
        prev.map(notice => 
          notice.id === noticeId 
            ? { ...notice, status: newStatus }
            : notice
        )
      );
      toast.success('Notice status updated!');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className={`bg-white p-6 rounded-md shadow-md ${className || ''}`}>
      <h1 className="text-xl font-semibold mb-4">{orgName} Dashboard</h1>
      {loading ? (
        <p>Loading notices...</p>
      ) : (
        <div className="space-y-4">
          {notices.length === 0 ? (
            <p className="text-gray-500">No notices to display.</p>
          ) : (
            notices.map(notice => (
              <div key={notice.id} className="border border-gray-200 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="font-semibold mb-1">{notice.title}</h2>
                    <StatusBadge status={notice.status} />
                  </div>
                  <div className="text-sm text-gray-500">
                    Last updated: {formatTimestamp(notice.statusUpdatedAt)}
                  </div>
                </div>
                <p className="text-sm text-gray-800 mb-2">{notice.description}</p>
                <div className="text-sm text-gray-600 mb-2">Location: {notice.location}</div>
                <div className="flex space-x-4">
                  {notice.assignedOrg === orgName ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStatusChange(notice.id, 'ongoing')}
                        disabled={notice.status === 'ongoing'}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md text-xs disabled:opacity-50"
                      >
                        Set Ongoing
                      </button>
                      <button
                        onClick={() => handleStatusChange(notice.id, 'completed')}
                        disabled={notice.status === 'completed'}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md text-xs disabled:opacity-50"
                      >
                        Set Completed
                      </button>
                    </div>
                  ) : !notice.assignedOrg ? (
                    <button
                      onClick={() => handleAssign(notice.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded-md text-xs"
                    >
                      Assign to me
                    </button>
                  ) : (
                    <p className="text-sm text-gray-500">Assigned to: {notice.assignedOrg}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrgDashboard;

