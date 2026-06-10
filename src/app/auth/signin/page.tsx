"use client";

import { useState } from "react";
import { Card, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SigninPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { error: authError } = await signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
      } else {
        setSuccess("Signed in successfully! Redirecting...");
        setEmail("");
        setPassword("");
        router.push(redirectTo);
      }
    } catch (err: unknown) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignin} className="flex flex-col gap-5">
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email Address
            </Label>
            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
              <At className="text-zinc-400 pointer-events-none w-4 h-4" />
              <Input
                placeholder="you@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />
            </InputGroup>
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            name="password"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </Label>
            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
              <ShieldKeyhole className="text-zinc-400 pointer-events-none w-4 h-4" />
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />
              <button
                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlash className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </InputGroup>
          </TextField>

          {/* Error */}
          {error && (
            <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
              <span className="font-semibold">Success:</span> {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-semibold rounded-xl text-sm h-12 bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Navigation */}
          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            New to HireLoop?{" "}
            <Link
              href={`/auth/signup?redirect=${redirectTo}`}
              className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400"
            >
              Create an account
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
