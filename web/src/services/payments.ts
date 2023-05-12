import { gql } from '@redwoodjs/core'

export const payments = gql`
  query GetPayments($nonProfitId: Int!) {
    payments(nonProfitId: $nonProfitId) {
      id
      date
      amountPaid
      status
      giftAided
      nonprofitId
    }
  }
`

export const payment = gql`
  query Payment($id: Int!) {
    payment(id: $id) {
      id
      date
      amountPaid
      status
      giftAided
      nonprofitId
    }
  }
`

export const totalDonations = gql`
  query TotalDonations($id: Int!) {
    totalDonations(id: $id)
  }
`

export const totalDonationsValue = gql`
  query TotalDonationsValue($id: Int!) {
    totalDonationsValue(id: $id)
  }
`

export const giftAidDonations = gql`
  query GiftAidDonations($id: Int!) {
    giftAidDonations(id: $id)
  }
`

export const topDonations = gql`
  query TopDonations($nonProfitId: Int!) {
    topDonations(nonProfitId: $nonProfitId) {
      id
      date
      amountPaid
      status
      giftAided
      nonprofitId
    }
  }
`

export const donationsFailed = gql`
  query DonationsFailed($id: Int!) {
    donationsFailed(id: $id)
  }
`

export const donationsSucceeded = gql`
  query DonationsSucceeded($id: Int!) {
    donationsSucceeded(id: $id)
  }
`
export const donationsPending = gql`
  query DonationsPending($id: Int!) {
    donationsPending(id: $id)
  }
`
