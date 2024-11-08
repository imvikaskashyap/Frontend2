import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist or you don’t have permission to access it.</p>
      <button
        onClick={handleBackToLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Back to Login
      </button>
    </div>
  );
}
