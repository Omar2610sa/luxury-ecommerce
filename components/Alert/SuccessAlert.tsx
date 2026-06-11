'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import { createRoot } from 'react-dom/client'
import SuccessIcon from '@/assets/icons/mdi_checkbox-marked-circle-outline.png' 

type Props = {
    title: string
}

function SuccessAlertComponent({ title }: Props) {
    return (
        <Dialog open={true}>
            <DialogContent className="sm:max-w-sm flex flex-col items-center gap-6 py-10 animate-success-alert">
                <Image
                    src={SuccessIcon}
                    alt="success"
                    width={100}
                    height={100}
                    className="object-contain"
                />
                <p className="text-center text-2xl font-medium">{title}</p>
            </DialogContent>
        </Dialog>
    )
}

export const SuccessAlert = (title: string) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const root = createRoot(container)
    root.render(<SuccessAlertComponent title={title} />)

    setTimeout(() => {
        root.unmount()
        document.body.removeChild(container)
        window.location.reload()
    }, 3000)
}