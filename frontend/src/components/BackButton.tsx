'use client'
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ArrowLeftCircle } from 'lucide-react';


export const BackButton = () => {
  const router = useRouter();

  const handleBack = useCallback(() => router.back(), [router]);

  return (
    <button
      onClick={handleBack}
      className="px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
    >
      <ArrowLeftCircle size={24}/> Voltar
    </button>
  );
}
