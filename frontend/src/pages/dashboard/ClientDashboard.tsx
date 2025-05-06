
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ClientDashboard = () => {
  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-white">Client Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Upcoming Sessions</CardTitle>
            <CardDescription className="text-gray-400">Your next workouts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-400">This week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Completed Sessions</CardTitle>
            <CardDescription className="text-gray-400">All time total</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">27</p>
            <p className="text-sm text-gray-400">+2 this week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Active Goals</CardTitle>
            <CardDescription className="text-gray-400">Current targets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
            <p className="text-sm text-gray-400">In progress</p>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-yalla-green">Orders</CardTitle>
            <CardDescription className="text-gray-400">From store</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4</p>
            <p className="text-sm text-gray-400">All time</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription className="text-gray-400">Your scheduled workouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">HIIT Workout with Sarah</p>
                  <p className="text-sm text-gray-400">Tomorrow, 10:00 AM</p>
                </div>
                <div className="bg-yalla-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  Confirmed
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">Yoga Flow with Michael</p>
                  <p className="text-sm text-gray-400">Wed, 9:00 AM</p>
                </div>
                <div className="bg-yalla-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  Confirmed
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">Strength Training with Alex</p>
                  <p className="text-sm text-gray-400">Fri, 5:30 PM</p>
                </div>
                <div className="bg-yalla-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  Confirmed
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yalla-dark-gray text-white border-yalla-gray">
          <CardHeader>
            <CardTitle>Recommended Sessions</CardTitle>
            <CardDescription className="text-gray-400">Based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">Boxing Fundamentals</p>
                  <p className="text-sm text-gray-400">Coach: James Wilson</p>
                </div>
                <button className="bg-yalla-green/20 text-yalla-green text-xs font-bold px-3 py-1 rounded-full hover:bg-yalla-green hover:text-black transition-colors">
                  Book Now
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">Advanced Pilates</p>
                  <p className="text-sm text-gray-400">Coach: Emily Parker</p>
                </div>
                <button className="bg-yalla-green/20 text-yalla-green text-xs font-bold px-3 py-1 rounded-full hover:bg-yalla-green hover:text-black transition-colors">
                  Book Now
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-md">
                <div>
                  <p className="font-semibold">Nutrition Workshop</p>
                  <p className="text-sm text-gray-400">Coach: David Miller</p>
                </div>
                <button className="bg-yalla-green/20 text-yalla-green text-xs font-bold px-3 py-1 rounded-full hover:bg-yalla-green hover:text-black transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
