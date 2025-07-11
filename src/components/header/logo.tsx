"use client";

function M() {
  return <p>M</p>;
  // return (
  //   <Tooltip>
  //     <TooltipTrigger tabIndex={-1}>
  //       <a
  //         href="/"
  //         className="block h-12 w-12 overflow-hidden rounded-md outline-accent-foreground 2xl:h-16 2xl:w-16"
  //       >
  //         <h1 className="-mt-1 text-5xl font-bold 2xl:text-6xl">m</h1>
  //       </a>
  //     </TooltipTrigger>
  //     <TooltipContent>Back Home</TooltipContent>
  //   </Tooltip>
  // );
}

export function Logo() {
  return (
    <div className="flex items-center space-x-8">
      <M />
    </div>
  );
}
