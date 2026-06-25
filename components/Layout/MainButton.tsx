import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

export default function MainButton({text} : {text : string}) {
  return (
    <div  className={cn( buttonVariants({variant:"default"}),`bg-primary rounded-3xl w-fit py-2.5 px-4 md:py-5 md:px-6 shadow-md `)}>
        {text}
    </div>
  )
}
