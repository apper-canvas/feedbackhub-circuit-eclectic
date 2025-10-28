import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"

const RoadmapCard = ({ item, className = "" }) => {
  const getTimelineColor = (timeline) => {
    switch (timeline) {
      case "now": return "bg-gradient-to-r from-green-500 to-green-600"
      case "next": return "bg-gradient-to-r from-blue-500 to-blue-600"
      case "later": return "bg-gradient-to-r from-purple-500 to-purple-600"
      default: return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, shadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {item.title}
        </h3>
        <div className={`w-3 h-3 rounded-full ${getTimelineColor(item.timeline)} flex-shrink-0 ml-3 mt-1`}></div>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
        {item.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Badge variant="default">
            {item.status}
          </Badge>
          {item.linkedFeedbackIds?.length > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <ApperIcon name="Link" className="h-3 w-3 mr-1" />
              {item.linkedFeedbackIds.length} linked
            </div>
          )}
        </div>
        {item.estimatedDate && (
          <div className="text-xs text-gray-500 flex items-center">
            <ApperIcon name="Calendar" className="h-3 w-3 mr-1" />
            {item.estimatedDate}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default RoadmapCard