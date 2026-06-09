import MainButton from "@/components/Layout/MainButton"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { EyeOffIcon } from "lucide-react"

export function LoginDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <MainButton text="تسجيل دخول" />

                </DialogTrigger>
                <DialogContent className="sm:max-w-md" >
                    <DialogHeader>
                        <DialogTitle className="text-lg">قم بتسجيل الدخول الي حسابك</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="email-1">البريد الإلكتروني</Label>
                            <Input id="email-1" name="email" placeholder="أدخل البريد الإلكتروني" />
                        </Field>
                        <Field>
                            <Label htmlFor="username-1">كلمة المرور</Label>
                            <InputGroup>
                                <InputGroupInput
                                    id="inline-end-input"
                                    type="password"
                                    placeholder="إدخل كلمة السر"
                                />

                            </InputGroup>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                        </DialogClose>
                        <Field>
                            <Label htmlFor="username-1">نسيت كلمة المرور؟</Label>
                            <Button className="w-[90%] mt-3 mx-auto cursor-pointer" type="submit">تسجيل الدخول</Button>
                        </Field>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
