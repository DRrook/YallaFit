
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-black"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative container mx-auto px-4 py-32 lg:py-48">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Unite. Grow. <span className="text-yalla-green">Strong.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Connect with professional fitness coaches, book personalized sessions, and achieve your
              fitness goals with YallaFit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-yalla-green text-black hover:bg-yalla-green/90 text-lg py-6 px-8"
              >
                <Link to="/register">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-yalla-green text-white hover:bg-yalla-green/10 text-lg py-6 px-8"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose <span className="text-yalla-green">YallaFit</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-yalla-dark-gray p-8 rounded-lg border border-yalla-gray hover-scale">
              <div className="w-12 h-12 bg-yalla-green/20 rounded-lg flex items-center justify-center mb-4">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Expert Coaches</h3>
              <p className="text-gray-400">
                Connect with certified fitness professionals specializing in various training
                methods.
              </p>
            </div>

            <div className="bg-yalla-dark-gray p-8 rounded-lg border border-yalla-gray hover-scale">
              <div className="w-12 h-12 bg-yalla-green/20 rounded-lg flex items-center justify-center mb-4">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Flexible Scheduling</h3>
              <p className="text-gray-400">
                Book sessions that fit your schedule, with easy rescheduling options when needed.
              </p>
            </div>

            <div className="bg-yalla-dark-gray p-8 rounded-lg border border-yalla-gray hover-scale">
              <div className="w-12 h-12 bg-yalla-green/20 rounded-lg flex items-center justify-center mb-4">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Track Progress</h3>
              <p className="text-gray-400">
                Monitor your fitness journey with detailed progress tracking and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coach Section */}
      <section className="py-16 bg-yalla-dark-gray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Are You a Fitness <span className="text-yalla-green">Coach</span>?
              </h2>
              <p className="text-gray-300 mb-6">
                Join our platform to connect with clients, manage your sessions, and grow your
                business. YallaFit provides the tools you need to succeed as a fitness professional.
              </p>
              <ul className="space-y-4 mb-8">
                {["Showcase your expertise and services", "Build your client base", "Manage bookings efficiently", "Get paid securely"].map(
                  (item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-yalla-green"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Button asChild className="bg-yalla-green text-black hover:bg-yalla-green/90 text-lg py-6 px-8">
                <Link to="/register?role=coach">Become a Coach</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Fitness Coach"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            What Our Users <span className="text-yalla-green">Say</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Client",
                content: "YallaFit has transformed my fitness journey. Finding coaches that match my goals has never been easier!",
                avatar: "SJ",
              },
              {
                name: "Michael Roberts",
                role: "Coach",
                content: "As a fitness coach, YallaFit has helped me expand my client base and manage my sessions efficiently.",
                avatar: "MR",
              },
              {
                name: "Emma Thompson",
                role: "Client",
                content: "The variety of sessions available is amazing. I've tried everything from yoga to HIIT and found what works for me.",
                avatar: "ET",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-yalla-dark-gray p-8 rounded-lg border border-yalla-gray hover-scale">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-yalla-green/20 flex items-center justify-center mr-3">
                    <span className="text-yalla-green font-medium">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yalla-dark-gray border-t border-yalla-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Start Your <span className="text-yalla-green">Fitness Journey</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join YallaFit today and connect with fitness professionals who can help you achieve your
            goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-yalla-green text-black hover:bg-yalla-green/90 text-lg py-6 px-8"
            >
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-yalla-green text-white hover:bg-yalla-green/10 text-lg py-6 px-8"
            >
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
