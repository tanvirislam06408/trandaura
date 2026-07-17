import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-7xl font-bold text-[#14B8A6]">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900">
          Page Not Found
        </h2>
        <p className="text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Link href="/" className="btn-primary inline-block">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
