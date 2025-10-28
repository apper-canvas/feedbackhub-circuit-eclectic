import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import RoadmapCard from "@/components/molecules/RoadmapCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { roadmapService } from "@/services/api/roadmapService"

const RoadmapBoard = () => {
  const [roadmapData, setRoadmapData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadRoadmap = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await roadmapService.getAll()
      setRoadmapData(data)
    } catch (err) {
      setError(err.message || "Failed to load roadmap")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRoadmap()
  }, [])

  const groupByTimeline = (items) => {
    return {
      now: items.filter(item => item.timeline === "now"),
      next: items.filter(item => item.timeline === "next"),
      later: items.filter(item => item.timeline === "later")
    }
  }

  const timelineConfig = {
    now: {
      title: "Now",
      description: "Currently in development",
      color: "from-green-500 to-green-600",
      icon: "Play"
    },
    next: {
      title: "Next",
      description: "Coming up soon",
      color: "from-blue-500 to-blue-600",
      icon: "Clock"
    },
    later: {
      title: "Later",
      description: "Future considerations",
      color: "from-purple-500 to-purple-600",
      icon: "Calendar"
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadRoadmap} />

  const groupedItems = groupByTimeline(roadmapData)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Roadmap
          </h1>
          <p className="text-gray-600">
            Track our development progress and upcoming features
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.entries(timelineConfig).map(([key, config]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-r ${config.color} text-white p-6 rounded-xl shadow-sm`}
          >
            <div className="flex items-center">
              <ApperIcon name={config.icon} className="h-8 w-8 mr-3" />
              <div>
                <div className="text-2xl font-bold">
                  {groupedItems[key].length}
                </div>
                <div className={`${key === 'now' ? 'text-green-100' : key === 'next' ? 'text-blue-100' : 'text-purple-100'}`}>
                  {config.title}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Roadmap Board */}
      {roadmapData.length === 0 ? (
        <Empty
          title="No roadmap items yet"
          description="The roadmap will be updated with planned features and development progress."
          icon="Map"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(timelineConfig).map(([timeline, config]) => (
            <div key={timeline} className="space-y-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.color} mr-3`}></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {config.title}
                  </h3>
                  <p className="text-sm text-gray-600">{config.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {groupedItems[timeline].length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <ApperIcon name="Package" className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No items planned</p>
                  </div>
                ) : (
                  groupedItems[timeline].map((item, index) => (
                    <motion.div
                      key={item.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <RoadmapCard item={item} />
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RoadmapBoard