import { Button } from '../ui/button'


type SecondButton = {
    text: string
    icon?: React.ElementType
    variant?: "default" | "secondary"
}

export default function SecondButton({ text, icon: Icon, variant }: SecondButton) {
    return (
        <Button variant={variant} className="rounded-none w-fit py-6 px-12 gap-4 text-2xl flex items-center cursor-pointer">
            {text}
            {Icon && <Icon className="size-6" />}
        </Button>
    )
    
}
