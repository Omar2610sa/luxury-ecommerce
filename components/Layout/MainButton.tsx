import { Button } from "../ui/button";

export default function MainButton({text} : {text : string}) {
  return (
    <Button  className={`bg-primary rounded-3xl w-fit py-5 px-6 shadow-md `}>
        {text}
    </Button>
  )
}
