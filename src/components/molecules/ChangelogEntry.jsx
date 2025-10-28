import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"

const ChangelogEntry = ({ entry, isLast = false }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "feature": return "Plus"
      case "improvement": return "Zap"
      case "bugfix": return "Bug"
      default: return "Info"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "feature": return "text-green-600"
      case "improvement": return "text-blue-600"
      case "bugfix": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy")
    } catch {
      return "Unknown date"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative pb-8"
    >
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200"></div>
      )}
      
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center ${getTypeColor(entry.type)}`}>
          <ApperIcon name={getTypeIcon(entry.type)} className="h-5 w-5" />
        </div>
        
        <div className="ml-6 flex-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {entry.title}
                </h3>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <span className="font-medium">{entry.version}</span>
                  <span>•</span>
                  <span>{formatDate(entry.releaseDate)}</span>
                </div>
              </div>
              <Badge variant={entry.type}>
                {entry.type}
              </Badge>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              {entry.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ChangelogEntry