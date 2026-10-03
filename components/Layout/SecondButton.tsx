import { Button } from '../ui/button'


type SecondButton = {
    text: string
    icon?: React.ElementType
    variant?: "default" | "secondary"
    
}

export default function SecondButton({ text, icon: Icon, variant }: SecondButton) {
    return (
        <Button variant={variant} className="rounded-none w-fit py-8 px-16 gap-2 text-2xl flex items-center  cursor-pointer hover:bg-[#333333] hover:text-white hover:scale-110">
            {text}
            {Icon && <Icon className="size-7" />}
        </Button>
    )
    
}
