import { useState } from "react";
import { Eye, EyeOff, Upload, Check } from "lucide-react";

const fields = [
    { name: "firstName", label: "First name", type: "text", required: true, half: true },
    { name: "lastName", label: "Last name", type: "text", half: true },
    { name: "email", label: "Email address", type: "email", required: true },
    { name: "phone", label: "Mobile number", type: "text" },
];

const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

export default function Register() {
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "", terms: false, });
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");

    const update = (e) => {
        const { name, value, type, checked, files } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value }));
        setError("");
    };

    const submit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
        if (!form.terms) return setError("Please accept the Terms & Conditions.");

        const data = new FormData();
        ["firstName", "lastName", "email", "phone", "password"].forEach((k) => data.append(k, form[k]));
        if (form.profileImage) data.append("profileImage", form.profileImage);
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h1 className="text-2xl font-semibold text-slate-900 text-center">Create your account</h1>
                <p className="text-sm text-slate-500 text-center mt-1 mb-6">Register to continue shopping</p>

                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        {fields.slice(0, 2).map(({ name, label, type, required }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                                <input name={name} type={type} required={required} value={form[name]} onChange={update} className={inputClass} />
                            </div>
                        ))}
                    </div>

                    {fields.slice(2).map(({ name, label, type, required }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                            <input name={name} type={type} required={required} value={form[name]} onChange={update} className={inputClass} />
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPw ? "text" : "password"}
                                required
                                value={form.password}
                                onChange={update}
                                className={`${inputClass} pr-10`}
                            />
                            <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm password</label>
                        <input name="confirmPassword" type={showPw ? "text" : "password"} required value={form.confirmPassword} onChange={update} className={inputClass} />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                        <span className={`flex h-5 w-5 items-center justify-center rounded border transition ${form.terms ? "bg-slate-900 border-slate-900" : "border-slate-300"}`}>
                            {form.terms && <Check size={14} className="text-white" />}
                        </span>
                        <input type="checkbox" name="terms" checked={form.terms} onChange={update} className="hidden" />
                        I agree to the Terms & Conditions
                    </label>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button type="submit" className="w-full rounded-lg bg-slate-900 text-white py-2.5 font-medium hover:bg-slate-800 transition">
                        Create account
                    </button>
                </form>

                <div className="flex items-center gap-3 my-5">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs text-slate-400">OR</span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                    type="button"
                    onClick={() => (window.location.href = "http://localhost:5000/api/auth/google")}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                    Continue with Google
                </button>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-slate-900 font-medium hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}