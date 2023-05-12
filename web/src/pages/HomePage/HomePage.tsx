import { MetaTags } from '@redwoodjs/web'
import Stats from 'src/components/Stats/Stats'
import Table from 'src/components/Table/Table'
import { useNonProfitContext } from 'src/layouts/MainLayout/MainLayout.context'
import { useQuery } from '@redwoodjs/web'
import {
  totalDonations,
  totalDonationsValue,
  giftAidDonations,
  payments,
  topDonations,
  donationsSucceeded,
} from 'src/services/payments'
import moment from 'moment'
import {
  CalendarIcon,
  GiftIcon,
  CurrencyPoundIcon,
  ChartBarIcon,
  TrophyIcon,
  GiftTopIcon,
} from '@heroicons/react/24/outline'

const HomePage = () => {
  // How to pull the nonpofit ID form context
  const { nonprofit, setNonProfit } = useNonProfitContext()

  // we're using useQuery from Apollo to fetch the total number of donations
  // we need to pass in the non profit id to ensure we're fetching the correct data
  const { data: totalDonationsData } = useQuery(totalDonations, {
    variables: { id: nonprofit.id },
  })
  // we're doing the same with the amount
  const { data: totalDonationsValueData } = useQuery(totalDonationsValue, {
    variables: { id: nonprofit.id },
  })

  // and the same with donations with gift aid
  const { data: giftAidDonationsData } = useQuery(giftAidDonations, {
    variables: { id: nonprofit.id },
  })
  const { data: paymentsData } = useQuery(payments, {
    variables: { nonProfitId: nonprofit.id },
  })
  const { data: topDonationsData } = useQuery(topDonations, {
    variables: { nonProfitId: nonprofit.id },
  })
  const { data: donationsSucceededData } = useQuery(donationsSucceeded, {
    variables: { id: nonprofit.id },
  })

  // helper function to format monetary values - created in order to reduce repeated code
  const formatInGBP = (value: number) => {
    const updatedValue = value / 100
    return `£${updatedValue?.toFixed(2)}`
  }

  const homepageStats = [
    { name: 'Total Donations', statistic: totalDonationsData?.totalDonations },
    {
      name: 'Total Donations Amount',
      statistic: formatInGBP(totalDonationsValueData?.totalDonationsValue),
    },
    {
      name: 'Donations with Gift Aid (%)',
      statistic: `${giftAidDonationsData?.giftAidDonations}%`,
    },
    // we only want to include stats for succeeded donations
    // addded in percentage of successful donations
    {
      name: 'Donations Succeeded (%)',
      statistic: `${donationsSucceededData?.donationsSucceeded}%`,
    },
  ]

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="mx-auto mb-4 max-w-7xl pb-2">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Stats
          </h2>
          {/** added some iconography to create visual language around terms */}
          <ChartBarIcon className="ml-3 h-6 w-6 text-ever-500" />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {homepageStats.map((item) => (
          <Stats key={item.name} {...item} />
        ))}
      </dl>

      <div className="relative my-4 pb-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-ever-300" />
        </div>
      </div>

      <div className="mx-4 mb-4 max-w-7xl pb-2">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Top Donations
          </h2>
          <TrophyIcon className="ml-3 h-6 w-6 text-ever-500" />
        </div>
        <ol className="!mx-4 my-4 list-auto">
          {/** added top donations section with 5 highest donations made per non profit */}
          {topDonationsData?.topDonations
            ?.slice(0, 5)
            .map((item: any, index: number) => (
              <li key={index}>{formatInGBP(item.amountPaid)}</li>
            ))}
        </ol>
      </div>

      <div className="mx-auto mb-4 max-w-7xl">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Donations
          </h2>
          <GiftTopIcon className="ml-3 h-6 w-6 text-ever-500" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-dashed border-ever-500 opacity-75">
        <Table.table className="min-w-full divide-y divide-gray-300">
          <Table.thead>
            <Table.tr>
              <Table.th>
                {/** included iconography in table columns  */}
                <CalendarIcon className="h-6 w-6 text-ever-500" />
              </Table.th>
              <Table.th>
                <CurrencyPoundIcon className="h-6 w-6 text-ever-500" />
              </Table.th>
              <Table.th>
                <GiftIcon className="h-6 w-6 text-ever-500" />
              </Table.th>
            </Table.tr>
          </Table.thead>
          <Table.tbody>
            {paymentsData?.payments.slice(0, 20).map((payment: any) => (
              <Table.tr key={payment.id}>
                {/** opted to use momentJS to format dates - makes it much easier to read  */}
                <Table.td>
                  {moment(payment.date).format('Do MMMM YYYY, h:mm a')}
                </Table.td>
                <Table.td>{formatInGBP(payment.amountPaid)}</Table.td>
                {/** Small UX improvement - returning Yes or No rather than boolean values */}
                <Table.td>{payment.giftAided ? 'Yes' : 'No'}</Table.td>
              </Table.tr>
            ))}
          </Table.tbody>
        </Table.table>
      </div>
    </>
  )
}

export default HomePage
