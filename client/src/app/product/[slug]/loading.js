import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <div className="flex w-full bg-gray-200 px-28 pt-12 gap-10">
        <div className="flex flex-row gap-6">
          <div className="grid grid-flow-row content-start gap-6">
            {/* Placeholder for thumbnail images */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 w-20">
                <Skeleton className="h-full w-full bg-amber-400" />
              </div>
            ))}
          </div>
          <div className="h-[400px] w-[400px]">
            {/* Placeholder for main image */}
            <Skeleton className="h-full w-full bg-amber-300" />
          </div>
        </div>
        <div className="flex flex-col bg-gray-100 p-4 w-[400px]">
          {/* Placeholders for product details */}
          <Skeleton className="h-8 w-[200px]" /> {/* Name */}
          <Skeleton className="h-4 w-[100px] mt-2" /> {/* Rating */}
          <Skeleton className="h-6 w-[150px] mt-2" /> {/* Price */}
          <Skeleton className="h-4 w-full mt-4" /> {/* Description line 1 */}
          <Skeleton className="h-4 w-full mt-2" /> {/* Description line 2 */}
          <Skeleton className="h-4 w-full mt-2" /> {/* Description line 3 */}
          <h3 className="mt-4">Select size</h3>
          <div className="flex gap-x-2">
            {/* Placeholder for size buttons */}
            {["M", "L", "XL"].map((size) => (
              <Skeleton key={size} className="h-10 w-10" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
