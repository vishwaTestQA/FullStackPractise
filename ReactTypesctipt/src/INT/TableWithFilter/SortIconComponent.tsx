import React, { useEffect, useState } from 'react'

type SortKey<T> = {
  key: keyof T;
  direction: "asc" | "desc";
};

type Props<T> = {
//   sortKeys: SortKey<T>[];
  sortKeys: SortKey<T>;
  headerKey: keyof T
}


const SortIconComponent = <T,>({sortKeys, headerKey}: Props<T>) => {

    // const sort = sortKeys?.find((s) => s.key === headerKey)
    const sort = sortKeys.key === headerKey
    
    if(!sort) return <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-down-icon lucide-arrow-up-down"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
    </span>

console.log("sort", sort)
  return (
    <span>
       {/* {sort.direction === "desc"  */}
       {sortKeys.direction === "desc" 
       ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-wide-narrow-icon lucide-arrow-up-wide-narrow"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h10"/><path d="M11 16h7"/><path d="M11 20h4"/></svg>
       : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-narrow-wide-icon lucide-arrow-up-narrow-wide"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/></svg>
      }
    </span>
  )
}

export default SortIconComponent