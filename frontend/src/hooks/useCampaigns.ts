import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { campaignAPI } from '../services/api-calls.js'

export const useCampaigns = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ['campaigns', limit, offset],
    queryFn: () => campaignAPI.getAllCampaigns(limit, offset),
  })
}

export const useMyCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns', 'my'],
    queryFn: () => campaignAPI.getMyCampaigns(),
  })
}

export const useCampaignDetails = (id: number) => {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: () => campaignAPI.getCampaign(id),
  })
}

export const useCreateCampaign = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => campaignAPI.createCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })
}

export const useUpdateCampaign = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => campaignAPI.updateCampaign(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaign', id] })
    },
  })
}

export const useApplyToCampaign = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ campaignId, proposal }: any) =>
      campaignAPI.applyToCampaign(campaignId, proposal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })
}

export const useAcceptCreator = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ campaignId, creatorId }: any) =>
      campaignAPI.acceptCreator(campaignId, creatorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })
}

export const useCampaignApplications = (campaignId: number) => {
  return useQuery({
    queryKey: ['campaign', campaignId, 'applications'],
    queryFn: () => campaignAPI.getApplications(campaignId),
  })
}
