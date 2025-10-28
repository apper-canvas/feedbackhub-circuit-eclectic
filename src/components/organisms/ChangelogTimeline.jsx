import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import ChangelogEntry from "@/components/molecules/ChangelogEntry"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { changelogService } from "@/services/api/changelogService"

const ChangelogTimeline = () => {
  const [changelogData, setChangelogData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadChangelog = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await changelogService.getAll()
      setChangelogData(data)
    } catch (err) {
      setError(err.message || "Failed to load changelog")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadChangelog()
  }, [])

  const groupByVersion = (entries) => {
    const grouped = {}
    entries.forEach(entry => {
      if (!grouped[entry.version]) {
        grouped[entry.version] = []
      }
      grouped[entry.version].push(entry)
    })
    return grouped
  }

  const getTypeStats = () => {
    const stats = { feature: 0, improvement: 0, bugfix: 0 }
    changelogData.forEach(entry => {
      stats[entry.type] = (stats[entry.type] || 0) + 1
    })
    return stats
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadChangelog} />

  const groupedEntries = groupByVersion(changelogData)
  const typeStats = getTypeStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">
          Changelog
        </h1>
        <p className="text-gray-600">
          Stay updated with the latest product improvements and releases
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="Package" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{Object.keys(groupedEntries).length}</div>
              <div className="text-blue-100">Releases</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="Plus" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{typeStats.feature}</div>
              <div className="text-green-100">Features</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="Zap" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{typeStats.improvement}</div>
              <div className="text-purple-100">Improvements</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <ApperIcon name="Bug" className="h-8 w-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">{typeStats.bugfix}</div>
              <div className="text-red-100">Bug Fixes</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      {changelogData.length === 0 ? (
        <Empty
          title="No changelog entries yet"
          description="Check back soon for product updates and release notes."
          icon="FileText"
        />
      ) : (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="space-y-8">
            {changelogData.map((entry, index) => (
              <ChangelogEntry
                key={entry.Id}
                entry={entry}
                isLast={index === changelogData.length - 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChangelogTimeline