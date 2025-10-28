import feedbackData from '@/services/mockData/feedback.json'

let mockFeedback = [...feedbackData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const feedbackService = {
  async getAll() {
    await delay(300)
    return [...mockFeedback]
  },

  async getById(id) {
    await delay(200)
    const feedback = mockFeedback.find(item => item.Id === parseInt(id))
    if (!feedback) {
      throw new Error('Feedback not found')
    }
    return { ...feedback }
  },

  async create(feedbackData) {
    await delay(400)
    const newFeedback = {
      Id: Math.max(...mockFeedback.map(f => f.Id), 0) + 1,
      ...feedbackData,
      votes: 0,
      votedBy: [],
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockFeedback.unshift(newFeedback)
    return { ...newFeedback }
  },

  async update(id, updateData) {
    await delay(300)
    const index = mockFeedback.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Feedback not found')
    }
    mockFeedback[index] = {
      ...mockFeedback[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    return { ...mockFeedback[index] }
  },

  async delete(id) {
    await delay(250)
    const index = mockFeedback.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Feedback not found')
    }
    mockFeedback.splice(index, 1)
    return true
  },

  async vote(id, userId) {
    await delay(200)
    const feedback = mockFeedback.find(item => item.Id === parseInt(id))
    if (!feedback) {
      throw new Error('Feedback not found')
    }
    
    if (feedback.votedBy.includes(userId)) {
      throw new Error('Already voted')
    }

    feedback.votes += 1
    feedback.votedBy.push(userId)
    feedback.updatedAt = new Date().toISOString()
    
    return { ...feedback }
  },

  async updateStatus(id, status) {
    await delay(300)
    return this.update(id, { status })
  }
}