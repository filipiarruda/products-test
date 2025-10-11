'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import React from "react";
import { useCallback } from "react";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";

export const Filter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [name, setName] = React.useState(searchParams.get("name") || "");

    const handleFilter = useCallback((newName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("name", newName);
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams]);

    return (
      <div className="flex">
          <InputGroup>
          <InputGroupInput 
            placeholder="Buscar produtos..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                handleFilter(name);
            }
          }
          />
          <InputGroupAddon>
           <Search />
         </InputGroupAddon>
         </InputGroup>
      </div>
    )
}

export default Filter;