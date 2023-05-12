export type StatCardProps = {
  name: string
  statistic: string
}

const StatCard = ({ name, statistic }: StatCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white px-4 py-5 sm:p-6">
      <dt className="truncate text-sm font-medium text-gray-500">{name}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {statistic}
      </dd>
    </div>
  )
}

export default StatCard
