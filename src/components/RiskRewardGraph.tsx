import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export type OptionType = {
  strike_price: number;
  type: string;
  bid: number;
  ask: number;
  long_short: string;
  expiration_date: string;
};

const calculateProfitLoss = (option: OptionType, stockPrice: number) => {
  const { strike_price, type, long_short, ask, bid } = option;
  const premium = (ask + bid) / 2;

  if (type === "Call") {
    const intrinsicValue = Math.max(0, stockPrice - strike_price);
    if (long_short === "long") {
      return intrinsicValue - premium;
    } else {
      return premium - intrinsicValue;
    }
  } else {
    const intrinsicValue = Math.max(0, strike_price - stockPrice);
    if (long_short === "long") {
      return intrinsicValue - premium;
    } else {
      return premium - intrinsicValue;
    }
  }
};

type SingleDataType = { [optionKey: string]: number; price: number };

const generateChartData = (data: Array<OptionType>) => {
  const prices = [];
  for (let price = 80; price <= 120; price += 0.5) {
    const point: SingleDataType = { price };
    data.forEach((option) => {
      point[`${option.long_short} ${option.type} (${option.strike_price})`] =
        calculateProfitLoss(option, price);
    });
    prices.push(point);
  }
  return prices;
};

const RiskRewardGraph = ({ data }: { data: Array<OptionType> }) => {
  const chartData = generateChartData(data);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="price"
            label={{
              value: "Stock Price",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{ value: "Profit/Loss", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          {data.map(({ long_short, type, strike_price }, index) => (
            <Line
              key={index}
              type="linear"
              dataKey={`${long_short} ${type} (${strike_price})`}
              strokeWidth={2}
              dot={false}
              stroke={`#${Math.floor(
                (((index + 2) * 80) / 1000) * 16777215
              ).toString(16)}`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskRewardGraph;
