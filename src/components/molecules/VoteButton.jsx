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
    if (voted || isVoting) return

    setIsVoting(true)
    try {
      await onVote?.()
      setVoted(true)
      setCurrentVotes(prev => prev + 1)
      toast.success("Vote recorded successfully!")
    } catch (error) {
      toast.error("Failed to record vote")
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: voted ? 1 : 1.05 }}
      whileTap={{ scale: voted ? 1 : 0.95 }}
      className={className}
    >
      <Button
        variant={voted ? "primary" : "secondary"}
        size="sm"
        onClick={handleVote}
        disabled={voted || isVoting}
        loading={isVoting}
        className={cn(
          "flex flex-col items-center px-3 py-2 min-w-[60px]",
          voted ? "bg-gradient-to-r from-green-500 to-green-600" : ""
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