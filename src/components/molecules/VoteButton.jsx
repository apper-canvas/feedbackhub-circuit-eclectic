import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const VoteButton = ({ votes, hasVoted = false, onVote, className = "" }) => {
  const [isVoting, setIsVoting] = useState(false)
  const [currentVotes, setCurrentVotes] = useState(votes)
  const [voted, setVoted] = useState(hasVoted)

  const handleVote = async () => {
    if (isVoting) return

    setIsVoting(true)
    const wasVoted = voted
    
    // Optimistic update
    setVoted(!wasVoted)
    setCurrentVotes(prev => wasVoted ? prev - 1 : prev + 1)
    
    try {
      await onVote?.()
      toast.success(wasVoted ? "Vote removed!" : "Vote recorded successfully!")
    } catch (error) {
      // Revert on error
      setVoted(wasVoted)
      setCurrentVotes(prev => wasVoted ? prev + 1 : prev - 1)
      toast.error("Failed to update vote")
    } finally {
      setIsVoting(false)
    }
  }

  return (
<motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Button
        variant={voted ? "primary" : "secondary"}
        size="sm"
        onClick={handleVote}
        disabled={isVoting}
        loading={isVoting}
        className={cn(
          "flex flex-col items-center px-3 py-2 min-w-[60px] transition-all duration-300",
          voted ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" : "hover:bg-gray-100"
        )}
      >
        <ApperIcon 
          name={voted ? "Check" : "ChevronUp"} 
          className="h-4 w-4 mb-1" 
        />
        <span className="text-xs font-semibold">
          {currentVotes}
        </span>
      </Button>
    </motion.div>
  )
}

export default VoteButton