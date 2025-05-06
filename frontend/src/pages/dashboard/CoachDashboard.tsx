
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const CoachDashboard = () => {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Coach Dashboard</h1>
        <Button asChild className="bg-yalla-green text-black hover:bg-yalla-green/90">
          <Link to="/coach/sessions/create">
            <Plus className="mr-2 h-4 w-4" /> Create Session
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Active Sessions</CardTitle>
            <CardDescription className="text-gray-400">Currently available</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
            <p className="text-sm text-gray-400">+2 this week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Upcoming Bookings</CardTitle>
            <CardDescription className="text-gray-400">Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-gray-400">3 today</p>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Earnings</CardTitle>
            <CardDescription className="text-gray-400">This month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$1,240</p>
            <p className="text-sm text-gray-400">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Reviews</CardTitle>
            <CardDescription className="text-gray-400">Average rating</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.8/5</p>
            <p className="text-sm text-gray-400">From 36 sessions</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription className="text-gray-400">Your sessions for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">Morning HIIT</p>
                  <p className="text-sm text-gray-400">9:00 AM - 10:00 AM (3 clients)</p>
                </div>
                <div className="bg-yalla-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  In 2 hours
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">Personal Training - John</p>
                  <p className="text-sm text-gray-400">12:00 PM - 1:00 PM</p>
                </div>
                <div className="bg-yalla-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  In 5 hours
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">Evening Yoga Flow</p>
                  <p className="text-sm text-gray-400">6:00 PM - 7:00 PM (5 clients)</p>
                </div>
                <div className="bg-yalla-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  In 11 hours
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription className="text-gray-400">Latest client registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-medium">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-gray-400">Morning HIIT - Tomorrow</p>
                  </div>
                </div>
                <div className="text-gray-400 text-xs">10 min ago</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-medium">RJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Robert Johnson</p>
                    <p className="text-sm text-gray-400">Evening Yoga - Today</p>
                  </div>
                </div>
                <div className="text-gray-400 text-xs">1 hour ago</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-medium">LT</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lisa Thompson</p>
                    <p className="text-sm text-gray-400">Weight Training - Thursday</p>
                  </div>
                </div>
                <div className="text-gray-400 text-xs">3 hours ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoachDashboard;
