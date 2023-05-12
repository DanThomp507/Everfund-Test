export const schema = gql`
  """
  Representation of Payment.
  """
  type Payment {
    "Description for id."
    id: Int!

    "Description for date."
    date: DateTime!

    "Description for amountPaid."
    amountPaid: Int!

    "Description for status."
    status: String!

    "Description for giftAided."
    giftAided: Boolean!

    "Description for nonprofitId."
    nonprofitId: Int!
  }

  """
  About queries
  """
  type Query {
    "Fetch Payments."
    payments(nonProfitId: Int!): [Payment!]! @requireAuth

    "Fetch a Payment by id."
    payment(id: Int!): Payment @requireAuth

    "Fetch Donations Failed."
    donationsFailed(id: Int!): Int! @requireAuth

    "Fetch Top Donations."
    topDonations(nonProfitId: Int!): [Payment!]! @requireAuth

    "Fetch Donations Succeeded."
    donationsSucceeded(id: Int!): Int! @requireAuth

    "Fetch Donations Pending."
    donationsPending(id: Int!): Int! @requireAuth

    "Fetch Total Number of Donations."
    totalDonations(id: Int!): Int! @requireAuth

    "Fetch Total Donations Value."
    totalDonationsValue(id: Int!): Int! @requireAuth

    "Fetch Donations With Gift Aid."
    giftAidDonations(id: Int!): Int! @requireAuth
  }
`
