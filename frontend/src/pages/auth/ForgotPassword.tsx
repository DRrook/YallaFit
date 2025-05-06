
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { Lock } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Reset email sent",
        description: "Please check your email for reset instructions",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-yalla-green flex items-center justify-center">
              <Lock className="h-6 w-6 text-black" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white">Reset your password</h1>
            <p className="mt-2 text-sm text-gray-400">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <div className="mt-8 bg-yalla-dark-gray rounded-lg shadow-lg p-8">
            {!isSubmitted ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-yalla-green text-black hover:bg-yalla-green/90"
                >
                  {isLoading ? "Sending reset link..." : "Send reset link"}
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-yalla-green hover:text-yalla-green/80"
                  >
                    Back to sign in
                  </Link>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-yalla-green/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yalla-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-white">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <p className="text-gray-400 text-sm">
                  Check your email and follow the instructions to reset your password
                </p>
                <div className="pt-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-yalla-green hover:text-yalla-green/80"
                  >
                    Back to sign in
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
