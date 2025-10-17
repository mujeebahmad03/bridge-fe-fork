"use client";

import Image from "next/image";
import { companies } from "./constants";

interface CompanyListProps {
  keyPrefix: string;
}

export function CompanyList({ keyPrefix }: CompanyListProps) {
  return (
    <div className="flex min-w-max items-center justify-center space-x-8 sm:space-x-12 lg:space-x-16">
      {companies.map((company) => (
        <div
          key={`${keyPrefix}-${company.name}`}
          className="flex cursor-pointer items-center justify-center space-x-2 whitespace-nowrap text-lg font-bold text-muted-foreground transition-colors duration-200 hover:text-foreground sm:space-x-3 sm:text-xl"
        >
          <Image
            src={company.logo}
            alt={company.name}
            width={60}
            height={30}
            className="h-20 rounded-full object-contain transition-transform duration-200 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
