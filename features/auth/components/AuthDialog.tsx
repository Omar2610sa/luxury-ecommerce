import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthDialogProps } from "../types";

export default function AuthDialog({
    title,
    children,
    className,
}: AuthDialogProps) {
    return (
        <DialogContent className={`sm:max-w-md ${className}`} >
            <DialogHeader>
                <DialogTitle className="text-lg mb-3 ">
                    {title}
                </DialogTitle>
            </DialogHeader>
            {children}
        </DialogContent>
    )
}
