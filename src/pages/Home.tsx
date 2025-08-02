import React from 'react';
import Layout from '../components/Layout';
import NoticeCard from '../components/NoticeCard';
import { Notice } from '../types';

const Home: React.FC = () => {
  const sampleNotices: Notice[] = [
    {
      id: '1',
      title: 'Welcome to NotifyMe!',
      description: 'Stay updated with community announcements and events.',
      timestamp: new Date(),
      tag: 'General',
    },
    {
      id: '2',
      title: 'Community BBQ this weekend',
      description: 'Join us for a BBQ in the park this Saturday at noon!',
      timestamp: new Date(),
      tag: 'Event',
    },
    {
      id: '3',
      title: 'Water Supply Issue',
      description: 'There will be a planned outage on Sunday from 8 AM to 12 PM.',
      timestamp: new Date(),
      tag: 'Maintenance',
    },
  ];

  return (
    <Layout title="Home">
      <section className="text-center py-12 bg-white">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">Welcome to NotifyMe</h1>
        <p className="text-lg text-gray-700">
          Connect with your community and stay informed with the latest updates and events.
        </p>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Notices</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sampleNotices.map(notice => (
            <NoticeCard key={notice.id} {...notice} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;

