import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

import { donationsHelper } from './helpers'

export const payments: QueryResolvers['payments'] = async ({ nonProfitId }) => {
  // we find all payments by non profit id
  const payments = await db.payment.findMany({
    where: { nonprofitId: nonProfitId },
    orderBy: { date: 'desc' },
  })

  return payments
}

export const payment: QueryResolvers['payment'] = ({ id }) => {
  return db.payment.findUnique({
    where: { id },
    include: {
      nonprofit: true,
    },
  })
}

// we want the total number of donations so count all the payments
export const totalDonations: QueryResolvers['totalDonations'] = ({ id }) => {
  return db.payment.count({
    where: {
      nonprofitId: id,
    },
  })
}

// it's best to calculate the total amount here
export const totalDonationsValue: QueryResolvers['totalDonationsValue'] =
  async ({ id }) => {
    // we find all payments by non profit id
    const payments = await db.payment.findMany({
      where: {
        nonprofitId: id,
      },
    })
    // we add up all the amountPaid values for each payment
    const totalAmount = payments.reduce(
      (total, payment) => total + payment.amountPaid,
      0
    )
    return totalAmount
  }

// we want to calculate the percentage of git aid payments on the back end
export const giftAidDonations: QueryResolvers['giftAidDonations'] = async ({
  id,
}) => {
  // we find all payments
  const payments = await db.payment.findMany({
    where: {
      nonprofitId: id,
    },
  })
  // we find all the payments where giftAided = true
  const giftAidPayments = payments.filter((payment) => payment.giftAided)
  // we calculate the percentage of gift aid payments and return that integer
  const giftAidPercentage = Math.round(
    (giftAidPayments.length / payments.length) * 100
  )
  return giftAidPercentage
}

export const donationsFailed: QueryResolvers['donationsFailed'] = async ({
  id,
}) => {
  return donationsHelper(db, id, 'failed')
}

export const donationsSucceeded: QueryResolvers['donationsSucceeded'] = async ({
  id,
}) => {
  return donationsHelper(db, id, 'succeeded')
}

export const donationsPending: QueryResolvers['donationsPending'] = async ({
  id,
}) => {
  return donationsHelper(db, id, 'pending')
}

export const topDonations: QueryResolvers['topDonations'] = async ({
  nonProfitId,
}) => {
  // we find all payments by non profit id
  const payments = await db.payment.findMany({
    where: { nonprofitId: nonProfitId },
  })

  const updatedPayments = payments.sort((a, b) => b.amountPaid - a.amountPaid)

  return updatedPayments
}
