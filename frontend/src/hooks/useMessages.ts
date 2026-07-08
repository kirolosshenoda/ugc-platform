import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { messageAPI } from '../services/api-calls.js'

export const useConversations = () => {
  return useQuery({
    queryKey: ['messages', 'conversations'],
    queryFn: () => messageAPI.getConversations(),
    refetchInterval: 5000,
  })
}

export const useConversation = (userId: number) => {
  return useQuery({
    queryKey: ['messages', 'conversation', userId],
    queryFn: () => messageAPI.getConversation(userId),
    refetchInterval: 3000,
  })
}

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ['messages', 'unread'],
    queryFn: () => messageAPI.getUnreadCount(),
    refetchInterval: 5000,
  })
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => messageAPI.sendMessage(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['messages', 'conversations'] })
      queryClient.invalidateQueries({ queryKey: ['messages', 'conversation'] })
    },
  })
}
