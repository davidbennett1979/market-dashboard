import Layout from "@/components/Layout";
import Card from "@/components/Card";

export default function Home() {
  return (
    <Layout>
      {/* Row 1 */}
      <Card title="Indexes" className="col-span-3 h-40" />
      <Card title="Earnings Today" className="col-span-5 h-40" />
      <Card title="Top News" className="col-span-4 h-40" />

      {/* Row 2 */}
      <Card title="AI Picks" className="col-span-4 h-52" />
      <Card title="Short-Interest Radar" className="col-span-4 h-52" />
      <Card title="Options Flow" className="col-span-4 h-52" />

      {/* Row 3 */}
      <Card title="Social Sentiment" className="col-span-8 h-60" />
      <Card title="Commodities & DXY" className="col-span-4 h-60" />
    </Layout>
  );
}

