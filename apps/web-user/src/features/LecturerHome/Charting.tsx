import { ReactNode } from "react"
import { Chart, useChart } from "@chakra-ui/charts"
import {
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Show } from "@chakra-ui/react"
import { TutorStatsRes } from "@repo/types/tutorStats"

export function Charting({ children }: { children: ReactNode }) {
  const { data: tutorStats } = useSuspenseQuery<TutorStatsRes>({
    queryKey: ["/user", "tutorStats"],
  })

  const chart = useChart({
    data: tutorStats,
    series: [
      { name: "accepted", color: "#56a66b", stackId: "a" },
      { name: "rejected", color: "#a65656", stackId: "a" },
      { name: "pending", color: "#a5a656", stackId: "a" },
    ],
  })

  return (
    <Show when={!children} fallback={children}>
      <Chart.Root maxH="md" chart={chart}>
        <BarChart layout="vertical" data={chart.data}>
          <CartesianGrid
            stroke={chart.color("border.muted")}
            vertical={false}
          />
          <XAxis type="number" axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey={chart.key("name")}
            orientation="left"
            stroke={chart.color("border")}
          />
          <Tooltip
            cursor={{ fill: chart.color("bg.muted") }}
            animationDuration={100}
            content={<Chart.Tooltip />}
          />
          <Legend content={<Chart.Legend />} />
          {chart.series.map((item) => (
            <Bar
              barSize={30}
              isAnimationActive={false}
              key={item.name}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              stroke={chart.color(item.color)}
              stackId={item.stackId}
            />
          ))}
        </BarChart>
      </Chart.Root>
    </Show>
  )
}
