import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Telescope } from 'lucide-react'; 
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'; 

const SideBar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        {/* Explore */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/explore"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Telescope className="h-5 w-5" />
              <span className="sr-only">Explore</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Explore</TooltipContent>
        </Tooltip>

        {/* Maps */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/maps"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Map className="h-5 w-5" />
              <span className="sr-only">Maps</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Maps</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default SideBar;
