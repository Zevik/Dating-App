import React, { useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive = true, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-blue-50 text-blue-500">
          {icon}
        </div>
      </div>
      {change && (
        <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {change} from last month
        </div>
      )}
    </div>
  );
};

interface RecentActivityProps {
  username: string;
  action: string;
  time: string;
  avatar: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ username, action, time, avatar }) => {
  return (
    <div className="flex items-center p-3 border-b border-gray-100 last:border-0">
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-4">
        <img src={avatar} alt={username} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{username}</span> {action}
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};

const DashboardExample: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data
  const stats = [
    { 
      title: 'Total Users', 
      value: '2,542', 
      change: '12%', 
      isPositive: true,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    },
    { 
      title: 'Active Matches', 
      value: '854', 
      change: '5%', 
      isPositive: true,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    },
    { 
      title: 'New Reports', 
      value: '28', 
      change: '3%', 
      isPositive: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    },
    { 
      title: 'Messages Sent', 
      value: '45,782', 
      change: '18%', 
      isPositive: true,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    }
  ];

  const activities = [
    {
      username: 'John Smith',
      action: 'joined the platform',
      time: '2 min ago',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    {
      username: 'Sarah Johnson',
      action: 'reported a user',
      time: '15 min ago',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
    {
      username: 'Mike Wilson',
      action: 'upgraded to premium',
      time: '1 hour ago',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      username: 'Emma Davis',
      action: 'matched with Alex Brown',
      time: '3 hours ago',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - hidden on mobile, unless menu button is clicked */}
      <div 
        className={`bg-indigo-800 text-white w-64 px-4 py-6 fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out z-10`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="font-bold text-xl">Dating App Admin</div>
          <button 
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-900 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Users
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Matches
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Reports
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
          <button 
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="md:flex-1 md:mr-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="search" 
                className="w-full md:max-w-xs pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                placeholder="Search..." 
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium">
              AB
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Overview of your dating app platform</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                isPositive={stat.isPositive}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Charts and activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart area */}
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">User Growth</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded hover:bg-indigo-200">
                    Weekly
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                    Monthly
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                    Yearly
                  </button>
                </div>
              </div>
              
              {/* Chart placeholder */}
              <div className="h-80 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-400">Chart would appear here</p>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {activities.map((activity, index) => (
                  <RecentActivity 
                    key={index}
                    username={activity.username}
                    action={activity.action}
                    time={activity.time}
                    avatar={activity.avatar}
                  />
                ))}
              </div>
              <div className="p-4 text-center">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                  View All Activities
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardExample; 