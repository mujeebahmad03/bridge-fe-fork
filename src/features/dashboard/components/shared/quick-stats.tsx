"use client";

import { motion } from "framer-motion";
import { Phone, Mail, User, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import type { QuickStat } from "@/dashboard/types";

interface QuickStatsProps {
  stats: QuickStat[];
}

export function QuickStats({ stats }: QuickStatsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "phone":
        return <Phone className="h-5 w-5" />;
      case "mail":
        return <Mail className="h-5 w-5" />;
      case "user":
        return <User className="h-5 w-5" />;
      case "calendar":
        return <Calendar className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "calls":
        return "text-green-600 bg-green-100";
      case "emails":
        return "text-blue-600 bg-blue-100";
      case "leads":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${getColor(stat.type)}`}
                >
                  {getIcon(stat.icon)}
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
