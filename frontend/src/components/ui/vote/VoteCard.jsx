import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoteCard({ 
  proposal, 
  timeRemaining, 
  yesPercentage, 
  noPercentage, 
  hasVoted = false,
  userVote = null 
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Timer */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Clock className="w-4 h-4" />
        <span className="font-medium">{timeRemaining}</span>
      </div>

      {/* Proposal Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
        {proposal}
      </h3>

      {/* Voting Options */}
      <div className="space-y-3 mb-6">
        {/* Yes Option */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Yes</span>
              {hasVoted && userVote === 'yes' && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  YOU
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700">{yesPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${yesPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* No Option */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">No</span>
              {hasVoted && userVote === 'no' && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  YOU
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700">{noPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${noPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* View Vote Button */}
      <Button 
        variant="outline" 
        className="w-full text-gray-600 hover:text-gray-800"
      >
        View vote
      </Button>
    </div>
  );
}
