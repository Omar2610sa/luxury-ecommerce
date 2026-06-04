import { Button } from '../ui/button'


type SecondButton = {
    text: string
    icon: React.ElementType
}

export default function SecondButton({ text, icon: Icon }: SecondButton) {
    return (
        <Button className="bg-second rounded-none w-fit py-6 px-16 gap-4 text-xl flex items-center">
            <Icon className="size-6" />
            {text}
        </Button>
    )
}
