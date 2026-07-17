"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
// Importing icons from react-icons
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCloudUpload } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

/**
 * Password validation logic
 */
const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("One number");
  if (!/[!@#$%^&*]/.test(password)) errors.push("One special character");
  return errors;
};


// upload image

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.secure_url;
};



// const fileToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
// };

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    setSubmitError("");

    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = `Password must have: ${passwordErrors.join(", ")}`;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setLoading(true);

      let imageUrl: string | undefined = undefined;
      if (formData.image) {
        try {
          imageUrl = await uploadImage(formData.image);
        } catch (err: any) {
          console.error("Cloudinary upload failed:", err);
          setSubmitError("Failed to upload profile image to Cloudinary. Please try again.");
          setLoading(false);
          return;
        }
      }

      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: imageUrl,
      }, {
        onSuccess: () => {
          setLoading(false);
          setFormData({ name: "", email: "", password: "", confirmPassword: "", image: null });
          setPreview(null);
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          setSubmitError(ctx.error.message || "An error occurred during registration.");
        }
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitError("");
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        router.push("/");
      },
      onError: (ctx) => {
        setLoading(false);
        setSubmitError(ctx.error.message || "Google sign-in failed.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md card-base p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-200">
              {submitError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              disabled={loading}
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 rounded-full border border-gray-200 px-5 py-3 text-sm outline-none transition-all duration-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 disabled:bg-gray-50 disabled:text-gray-400"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              disabled={loading}
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 rounded-full border border-gray-200 px-5 py-3 text-sm outline-none transition-all duration-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 disabled:bg-gray-50 disabled:text-gray-400"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (Optional)</label>
            <label className={`flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#14B8A6] hover:bg-[#14B8A6]/5 transition-all duration-300 relative overflow-hidden ${loading ? "pointer-events-none opacity-50" : ""}`}>
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4">
                  <AiOutlineCloudUpload size={40} className="text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload profile image
                  </p>
                  <span className="text-xs text-gray-400">
                    PNG, JPG, JPEG
                  </span>
                </div>
              )}

              <input
                hidden
                type="file"
                accept="image/*"
                name="image"
                onChange={handleInputChange}
                disabled={loading}
              />
            </label>
            {formData.image && (
              <p className="text-xs text-gray-500 mt-1 text-center truncate">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              disabled={loading}
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-1 rounded-full border border-gray-200 px-5 py-3 text-sm outline-none transition-all duration-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 disabled:bg-gray-50 disabled:text-gray-400 pr-12"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-gray-400" disabled={loading}>
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              disabled={loading}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full mt-1 rounded-full border border-gray-200 px-5 py-3 text-sm outline-none transition-all duration-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 disabled:bg-gray-50 disabled:text-gray-400 pr-12"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-10 text-gray-400" disabled={loading}>
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : "Register"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn-outline w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <a href="/login" className="font-semibold text-[#14B8A6] hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}