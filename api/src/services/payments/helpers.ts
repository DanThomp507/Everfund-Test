export const donationsHelper = async (db: any, id: number, status: String) => {
  // we find all payments
  const payments = await db.payment.findMany({
    where: {
      nonprofitId: id,
    },
  })
  // we find all the payments where giftAided = true
  const statusPayments = payments.filter(
    (payment: any) => payment.status === status
  )
  // we calculate the percentage of gift aid payments and return that integer
  const percentage = Math.round((statusPayments.length / payments.length) * 100)
  return percentage
}
