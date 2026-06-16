import { Button } from "../ui/button";

export default function MainButton({text} : {text : string}) {
  return (
    <Button  className={`bg-primary rounded-3xl w-fit py-2.5 px-4 md:py-5 md:px-6 shadow-md `}>
        {text}
    </Button>
  )
}
