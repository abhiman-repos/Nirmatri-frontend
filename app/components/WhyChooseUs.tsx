import { Award, Users, Clock, TrendingUp, Headphones, Lock } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Industry Expertise",
    description: "Over 15 years of proven experience delivering exceptional results across various industries.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Dedicated professionals committed to your success with 24/7 support and guidance.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Quick turnaround times without compromising on quality or attention to detail.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Track record of driving growth and achieving measurable success for our clients.",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description: "Round-the-clock customer support to ensure your operations run smoothly.",
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and 99.9% uptime guarantee for peace of mind.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine innovation, expertise, and dedication to deliver unmatched value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
              >
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
