"use client";

import { motion } from "framer-motion";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FilterTabs = () => {
  return (
    <Tabs defaultValue="unread">
      <TabsList className="flex gap-2 bg-muted/30 p-1">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <TabsTrigger
            value="all"
            className="transition-all duration-200 data-[state=active]:bg-muted/50"
          >
            All mail
          </TabsTrigger>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <TabsTrigger
            value="unread"
            className="transition-all duration-200 data-[state=active]:shadow-md"
          >
            Unread
          </TabsTrigger>
        </motion.div>
      </TabsList>
    </Tabs>
  );
};
