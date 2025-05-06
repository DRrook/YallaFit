
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Layout from "@/components/layout/Layout";

const AccessDenied = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <AlertTriangle className="h-24 w-24 text-yalla-green mb-6" />
        <h1 className="text-4xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
          You don't have permission to access this page. Please contact an administrator if you
          believe this is an error.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="border-yalla-green text-white">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild className="bg-yalla-green text-black hover:bg-yalla-green/90">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AccessDenied;
