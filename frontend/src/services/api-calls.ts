import api from './api.js'

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  refreshToken: () => api.post('/auth/refresh', {}),
}

export const creatorAPI = {
  createProfile: (data: any) => api.post('/creators', data),
  getProfile: (id: number) => api.get(`/creators/${id}`),
  getMyProfile: () => api.get('/creators/me'),
  getAllCreators: (limit?: number, offset?: number) =>
    api.get('/creators', { params: { limit, offset } }),
  searchCreators: (query: string) =>
    api.get('/creators/search', { params: { q: query } }),
  updateProfile: (data: any) => api.put('/creators/me', data),
  getContent: (id: number) => api.get(`/creators/${id}/content`),
  getReviews: (id: number) => api.get(`/creators/${id}/reviews`),
}

export const contentAPI = {
  upload: (data: any) => api.post('/content', data),
  getContent: (id: number) => api.get(`/content/${id}`),
  deleteContent: (id: number) => api.delete(`/content/${id}`),
  likeContent: (id: number) => api.post(`/content/${id}/like`, {}),
  unlikeContent: (id: number) => api.post(`/content/${id}/unlike`, {}),
  getFeatured: () => api.get('/content/featured'),
}

export const campaignAPI = {
  createCampaign: (data: any) => api.post('/campaigns', data),
  getCampaign: (id: number) => api.get(`/campaigns/${id}`),
  getAllCampaigns: (limit?: number, offset?: number) =>
    api.get('/campaigns', { params: { limit, offset } }),
  getMyCampaigns: () => api.get('/campaigns/my-campaigns'),
  updateCampaign: (id: number, data: any) =>
    api.put(`/campaigns/${id}`, data),
  applyToCampaign: (id: number, proposal: string) =>
    api.post(`/campaigns/${id}/apply`, { proposal_text: proposal }),
  acceptCreator: (campaignId: number, creatorId: number) =>
    api.post(`/campaigns/${campaignId}/accept/${creatorId}`, {}),
  getApplications: (id: number) => api.get(`/campaigns/${id}/applications`),
}

export const messageAPI = {
  sendMessage: (data: any) => api.post('/messages', data),
  getConversations: () => api.get('/messages/conversations'),
  getConversation: (userId: number) => api.get(`/messages/${userId}`),
  getUnreadCount: () => api.get('/messages/unread'),
}

export const reviewAPI = {
  createReview: (data: any) => api.post('/reviews', data),
  getCreatorReviews: (id: number) => api.get(`/reviews/${id}`),
  updateReview: (id: number, data: any) => api.put(`/reviews/${id}`, data),
  deleteReview: (id: number) => api.delete(`/reviews/${id}`),
}

export const paymentAPI = {
  createPaymentIntent: (data: any) =>
    api.post('/payments/create-payment-intent', data),
  getPaymentHistory: () => api.get('/payments/history'),
}

export const adminAPI = {
  getAllUsers: (limit?: number, offset?: number) =>
    api.get('/admin/users', { params: { limit, offset } }),
  getPlatformStats: () => api.get('/admin/stats'),
  getUserStats: () => api.get('/admin/user-stats'),
  banUser: (userId: number) => api.post(`/admin/ban/${userId}`, {}),
  unbanUser: (userId: number) => api.post(`/admin/unban/${userId}`, {}),
  verifyCreator: (creatorId: number) =>
    api.post(`/admin/verify-creator/${creatorId}`, {}),
  moderateContent: (contentId: number, action: string) =>
    api.post(`/admin/moderate/${contentId}`, { action }),
}
