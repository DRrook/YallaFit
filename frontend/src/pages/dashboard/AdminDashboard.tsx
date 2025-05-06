
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 40, revenue: 2400, sessions: 24 },
  { name: 'Feb', users: 30, revenue: 1398, sessions: 22 },
  { name: 'Mar', users: 50, revenue: 9800, sessions: 35 },
  { name: 'Apr', users: 27, revenue: 3908, sessions: 29 },
  { name: 'May', users: 18, revenue: 4800, sessions: 19 },
  { name: 'Jun', users: 23, revenue: 3800, sessions: 27 },
];

const AdminDashboard = () => {
  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-white">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Total Users</CardTitle>
            <CardDescription className="text-gray-400">Active platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,284</p>
            <div className="flex items-center text-sm text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +14% this month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Active Sessions</CardTitle>
            <CardDescription className="text-gray-400">Available workouts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">237</p>
            <div className="flex items-center text-sm text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +23% this month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Monthly Revenue</CardTitle>
            <CardDescription className="text-gray-400">Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$24,320</p>
            <div className="flex items-center text-sm text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +8% vs last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Support Tickets</CardTitle>
            <CardDescription className="text-gray-400">Open issues</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <div className="flex items-center text-sm text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1 transform rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +3 since yesterday
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-yalla-dark-gray text-white grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription className="text-gray-400">Monthly statistics for the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                      <XAxis dataKey="name" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#222', 
                          borderColor: '#D4FF00',
                          color: 'white' 
                        }} 
                      />
                      <Bar dataKey="users" fill="#D4FF00" name="New Users" />
                      <Bar dataKey="sessions" fill="#888" name="Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription className="text-gray-400">Monthly new user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                      <XAxis dataKey="name" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#222', 
                          borderColor: '#D4FF00',
                          color: 'white' 
                        }} 
                      />
                      <Bar dataKey="users" fill="#D4FF00" name="New Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6">
            <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription className="text-gray-400">Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                      <XAxis dataKey="name" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#222', 
                          borderColor: '#D4FF00',
                          color: 'white' 
                        }} 
                      />
                      <Bar dataKey="revenue" fill="#D4FF00" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
