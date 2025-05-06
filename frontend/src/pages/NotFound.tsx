
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <h1 className="text-9xl font-bold text-yalla-green mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Button asChild className="bg-yalla-green text-black hover:bg-yalla-green/90">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
