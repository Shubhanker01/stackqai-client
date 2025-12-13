import { useState } from "react"
import { User, Mail, X, LogOut } from "lucide-react"

export default function UserProfile({ name, email }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Profile Button */}
            {!open && (
                <button onClick={() => setOpen(true)} className="p-2">
                    <User className="w-8 h-8 text-slate-800" />
                </button>
            )}

            {/* Profile Card */}
            {open && (
                <div className="fixed top-5 right-6 w-[260px] bg-slate-100 rounded-xl shadow-lg z-50">

                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-3 border-b">
                        <h2 className="font-semibold text-lg">Profile</h2>
                        <button onClick={() => setOpen(false)}>
                            <X className="w-5 h-5 text-slate-600 hover:text-black" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col items-center gap-3 p-4">
                        <div className="w-16 h-16 rounded-full bg-slate-300 flex items-center justify-center">
                            <User className="w-8 h-8 text-slate-700" />
                        </div>

                        <p className="font-medium">{name}</p>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="w-4 h-4" />
                            <span>{email}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t px-4 py-3">
                        <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
