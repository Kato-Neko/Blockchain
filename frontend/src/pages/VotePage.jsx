// src/pages/VotePage.jsx
import { Button } from "@/components/ui/button";

export default function VotePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Voting should be here, Jermaine ✅
        </h1>
        <div className="mt-6">
          <Button className="px-6 py-2">Vote now</Button>
        </div>
      </div>
    </div>
  );
}
