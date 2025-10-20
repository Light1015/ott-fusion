import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Basic",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: [
        { text: "1 screen at a time", included: true },
        { text: "720p HD quality", included: true },
        { text: "Limited content library", included: true },
        { text: "Ads included", included: true },
        { text: "Download content", included: false },
        { text: "4K Ultra HD", included: false },
      ],
      popular: false,
    },
    {
      name: "Premium",
      monthlyPrice: 14.99,
      yearlyPrice: 149.99,
      features: [
        { text: "2 screens at a time", included: true },
        { text: "1080p Full HD quality", included: true },
        { text: "Full content library", included: true },
        { text: "Ad-free experience", included: true },
        { text: "Download on 2 devices", included: true },
        { text: "4K Ultra HD", included: false },
      ],
      popular: true,
    },
    {
      name: "Ultimate",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        { text: "4 screens at a time", included: true },
        { text: "4K Ultra HD quality", included: true },
        { text: "Full content library", included: true },
        { text: "Ad-free experience", included: true },
        { text: "Download on 4 devices", included: true },
        { text: "Early access to new releases", included: true },
      ],
      popular: false,
    },
  ];

  const handleSubscribe = (planName: string) => {
    toast({
      title: "Redirecting to checkout",
      description: `You selected the ${planName} plan`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Choose Your Plan</h1>
          <p className="text-muted-foreground text-center mb-8">
            Watch unlimited movies and TV shows. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card rounded-lg border-2 p-8 transition-all hover:scale-105 ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    per {billingCycle === "monthly" ? "month" : "year"}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={
                          feature.included ? "text-foreground" : "text-muted-foreground"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  Subscribe Now
                </Button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center text-muted-foreground">
            <p className="mb-2">
              All plans include a 7-day free trial. Cancel anytime without penalty.
            </p>
            <p className="text-sm">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
