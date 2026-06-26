'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { BadgeX } from 'lucide-react'
import { createRoot } from 'react-dom/client'

type Props = {
    title: string
}

function ErrorAlertComponent({ title }: Props) {
    return (
        <Dialog open={true}>
            <DialogContent hideCloseButton className="sm:max-w-sm flex flex-col items-center gap-6 py-10 animate-success-alert">
                <BadgeX
                    width={100}
                    height={100}
                    className="object-contain text-red-700"
                />
                <p className="text-center text-2xl font-medium">{title}</p>
            </DialogContent>
        </Dialog>
    )
}

export const ErrorAlert = (title: string) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const root = createRoot(container)
    root.render(<ErrorAlertComponent title={title} />)

    setTimeout(() => {
        root.unmount()
        document.body.removeChild(container)
    }, 3000)
}