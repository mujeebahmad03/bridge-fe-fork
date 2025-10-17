"use client";

import { TrendingUp, Mail, MousePointer } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VariantCardProps {
  variant: "A" | "B";
  leads: number;
  subject: string;
  openRate: string;
  replyRate: string;
}

export function VariantCard({
  variant,
  leads,
  subject,
  openRate,
  replyRate,
}: VariantCardProps) {
  const isVariantA = variant === "A";

  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900">
      {/* Gradient border effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          isVariantA
            ? "from-blue-500 via-purple-500 to-pink-500"
            : "from-slate-400 via-slate-600 to-slate-800"
        } opacity-20 transition-opacity duration-500 group-hover:opacity-40`}
      />
      <div className="absolute inset-[1px] rounded-lg bg-white dark:bg-slate-900" />

      {/* Content */}
      <div className="relative z-10">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  isVariantA ? "bg-blue-500" : "bg-slate-500"
                } shadow-lg`}
              />
              <CardTitle className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-slate-300">
                Variant {variant}
              </CardTitle>
            </div>
            <div
              className={`relative overflow-hidden rounded-xl px-4 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 ${
                isVariantA
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
                  : "bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-900"
              }`}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">
                {leads.toLocaleString()} Leads
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Subject Line Section */}
          <div className="group/subject relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover/subject:opacity-100 dark:from-blue-900/10 dark:to-purple-900/10" />
            <div className="relative rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50/80 to-white p-4 transition-all duration-300 group-hover/subject:border-slate-300/80 dark:border-slate-700/60 dark:from-slate-800/50 dark:to-slate-900/50 dark:group-hover/subject:border-slate-600/80">
              <div className="mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Subject Line
                </p>
              </div>
              <p className="text-base font-semibold leading-relaxed text-slate-900 dark:text-white">
                &quot;{subject}&quot;
              </p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Open Rate */}
            <div className="group/metric relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 opacity-0 transition-opacity duration-300 group-hover/metric:opacity-100 dark:from-emerald-900/10 dark:to-green-900/10" />
              <div className="relative rounded-xl border border-slate-200/40 bg-gradient-to-br from-white/60 to-slate-50/40 p-4 backdrop-blur-sm transition-all duration-300 group-hover/metric:border-emerald-200/60 dark:border-slate-700/40 dark:from-slate-800/40 dark:to-slate-900/20 dark:group-hover/metric:border-emerald-700/40">
                <div className="mb-3 flex items-center gap-2">
                  <MousePointer className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Open Rate
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-slate-300">
                    {openRate}
                  </span>
                  <Badge className="border-emerald-200 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 transition-all duration-300 hover:from-emerald-200 hover:to-green-200 dark:border-emerald-700/50 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-400">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +1.2%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Reply Rate */}
            <div className="group/metric relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-300 group-hover/metric:opacity-100 dark:from-blue-900/10 dark:to-indigo-900/10" />
              <div className="relative rounded-xl border border-slate-200/40 bg-gradient-to-br from-white/60 to-slate-50/40 p-4 backdrop-blur-sm transition-all duration-300 group-hover/metric:border-blue-200/60 dark:border-slate-700/40 dark:from-slate-800/40 dark:to-slate-900/20 dark:group-hover/metric:border-blue-700/40">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Reply Rate
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-slate-300">
                    {replyRate}
                  </span>
                  <Badge className="border-blue-200 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 transition-all duration-300 hover:from-blue-200 hover:to-indigo-200 dark:border-blue-700/50 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +1.2%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute left-0 top-0 h-32 w-32 -translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 transition-transform duration-1000 group-hover:scale-150" />
        <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 transition-transform delay-200 duration-1000 group-hover:scale-150" />
      </div>
    </Card>
  );
}
