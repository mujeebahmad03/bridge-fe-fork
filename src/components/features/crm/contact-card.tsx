"use client";

import type React from "react";

import { ArrowLeft, Mail, MessageSquareText, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactProfile() {
  return (
    <div className="bg-background p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 hover:bg-transparent hover:text-primary"
          asChild
        >
          <a href="#">
            <ArrowLeft className="h-4 w-4" />
            <span>Contacts</span>
          </a>
        </Button>

        {/* Profile Section */}
        <div className="mb-8 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="mx-auto h-24 w-24">
              <AvatarFallback className="bg-muted text-2xl">AS</AvatarFallback>
            </Avatar>
          </motion.div>
          <h1 className="mt-4 text-2xl font-semibold">Aristotle Stanley</h1>
          <p className="text-muted-foreground">Executive Chairperson</p>
          <p className="text-sm text-primary">jstanley@hotsuite.com</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex justify-center gap-4">
          {[
            { icon: Phone, label: "Call" },
            { icon: MessageSquareText, label: "Notes" },
            { icon: Mail, label: "Email" },
            { icon: Send, label: "Task" },
          ].map((action) => (
            <motion.div
              key={action.label}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
              >
                <action.icon className="h-5 w-5" />
                <span className="sr-only">{action.label}</span>
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {action.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Details */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-6">
              <ContactDetail
                label="Email"
                value="jstanley@hotsuite.com"
                action={
                  <Button variant="secondary" size="sm">
                    Add new email address
                  </Button>
                }
              />
              <ContactDetail label="LinkedIn" value="Justin stanley" />
              <ContactDetail label="Contact" value="08107456332" />
              <ContactDetail label="Location" value="Indiana, US" />
              <ContactDetail label="Industry" value="Energy and Utilities" />
              <ContactDetail label="Twitter" value="jstanley_" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function ContactDetail({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="group space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center justify-between">
        <motion.p
          className="text-foreground"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {value}
        </motion.p>
        {action}
      </div>
    </div>
  );
}
