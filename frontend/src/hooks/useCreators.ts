import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { creatorAPI } from '../services/api-calls.js'

export const useCreators = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ['creators', limit, offset],
    queryFn: () => creatorAPI.getAllCreators(limit, offset),
  })
}

export const useCreatorSearch = (query: string) => {
  return useQuery({
    queryKey: ['creators', 'search', query],
    queryFn: () => creatorAPI.searchCreators(query),
    enabled: query.length > 0,
  })
}

export const useCreatorProfile = (id: number) => {
  return useQuery({
    queryKey: ['creator', id],
    queryFn: () => creatorAPI.getProfile(id),
  })
}

export const useMyCreatorProfile = () => {
  return useQuery({
    queryKey: ['creator', 'me'],
    queryFn: () => creatorAPI.getMyProfile(),
  })
}

export const useCreateCreatorProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => creatorAPI.createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creator', 'me'] })
    },
  })
}

export const useUpdateCreatorProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => creatorAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creator', 'me'] })
    },
  })
}
