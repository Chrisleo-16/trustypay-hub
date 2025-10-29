import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, X } from "lucide-react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import cryptoImage from "@/assets/wallpaper-crypto-theme-high-quality-photo-382426897.webp";
import { ArrowBigRightIcon } from "lucide-react";

export default function AuthGlassModal() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSignUp, setIsSignUp] = useState(
    new URLSearchParams(window.location.search).get("mode") === "signup"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (session?.user) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();

        navigate(roleData?.role === "admin" ? "/admin" : "/", {
          replace: true,
        });
      }
    };
    check();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          toast({ title: "Passwords don't match", variant: "destructive" });
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: `${firstName} ${lastName}`, phone } },
        });

        if (error) throw error;

        if (data?.user) {
          const roleToAssign =
            email.toLowerCase() === "admin@abiaxe.com" ? "admin" : "user";
          await supabase
            .from("user_roles")
            .insert([{ user_id: data.user.id, role: roleToAssign }]);
        }

        toast({
          title: "Account created",
          description: "Check your email to verify your account.",
        });
        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          const msg = error.message?.toLowerCase() || "";
          if (msg.includes("email not confirmed")) {
            toast({
              title: "Email not confirmed",
              description: "Please verify your email before logging in.",
              variant: "destructive",
            });
            return;
          }
          throw error;
        }

        const session = data.session;
        const user = data.user;
        if (!session || !user) throw new Error("User not found after login");

        // ✅ Save Supabase access token for future authenticated API calls
        localStorage.setItem(
          "walletAuth",
          JSON.stringify({
            email: user.email,
            token: session.access_token,
          })
        );

        // Get user role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle();

        toast({ title: "Welcome back!" });
        navigate(roleData?.role === "admin" ? "/admin" : "/");
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "apple") => {
    try {
      setLoading(true);
      await supabase.auth.signInWithOAuth({ provider });
    } catch (err) {
      console.error(err);
      toast({ title: "Social login error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(${cryptoImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-xl">
        <button
          aria-label="close"
          className="absolute right-2 top-2 p-2 rounded-full bg-black/30 hover:bg-black/40 backdrop-blur"
          onClick={() => navigate(-1)}
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <Card className="mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-black/50 to-black/80 border border-white/10 shadow-2xl bg-[rgba(0,0,0,0.35)]">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg p-2 bg-gradient-to-br from-red-600 to-red-400">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">ABIAXE</h3>
                  <p className="text-sm text-white/60">
                    {isSignUp ? "Create an account" : "Welcome back"}
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-full p-1 flex items-center text-xs">
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    isSignUp ? "bg-white text-black" : "text-white/70"
                  }`}
                >
                  Sign up
                </button>
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    !isSignUp ? "bg-white text-black" : "text-white/70"
                  }`}
                >
                  Sign in
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white/80">First name</Label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="bg-[rgba(0,0,0,0.35)] text-white placeholder:text-white/40 border border-white/5"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">Last name</Label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="bg-[rgba(0,0,0,0.35)] text-white placeholder:text-white/40 border border-white/5"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label className="text-white/80">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[rgba(0,0,0,0.35)] text-white placeholder:text-white/40 border border-white/5"
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <Label className="text-white/80">Phone</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(775) 351-6501"
                    className="bg-[rgba(0,0,0,0.35)] text-white placeholder:text-white/40 border border-white/5"
                  />
                </div>
              )}

              <div>
                <Label className="text-white/80">Password</Label>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="bg-[rgba(0,0,0,0.35)] text-white placeholder:text-white/40 border border-white/5"
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <Label className="text-white/80">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    className="bg-[rgba(0,0,0,0.35)] text-white placeholder:text-white/40 border border-white/5"
                    required
                  />
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-3 rounded-lg shadow-md"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : isSignUp
                      ? "Create an account"
                      : "Sign in"}
                </Button>
              </div>
            </form>

            <div className="my-4 text-center text-white/60">
              OR SIGN IN WITH
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleSocial("google")}
                className="flex-1 py-3 rounded-lg bg-white/5 border border-white/6 flex items-center justify-center gap-3"
              >
                <FaGoogle className="w-5 h-5 text-white" />
                <span className="text-white/90">Google</span>
              </button>

              <button
                onClick={() => handleSocial("apple")}
                className="flex-1 py-3 rounded-lg bg-white/5 border border-white/6 flex items-center justify-center gap-3"
              >
                <FaApple className="w-5 h-5 text-white" />
                <span className="text-white/90">Apple</span>
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-white/60">
              By creating an account, you agree to our Terms & Service
            </p>
            <Link
              to={"/"}
              className="text-decoration-none text-white z-12 p-2 ml-4 flex"
            >
              <ArrowBigRightIcon />
              Back Home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
