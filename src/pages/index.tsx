import Layout from "@/components/Layout";
import Card from "@/components/Card";

export default function Home() {
  return (
    <Layout>
      {/* Row 1 */}
      <Card cardId="indexes" title="Indexes" className="col-span-3 h-40" />
      <Card cardId="earnings" title="Earnings Today" className="col-span-5 h-40" />
      <Card cardId="top-news" title="Top News" className="col-span-4 h-40" />

      {/* Row 2 */}
      <Card cardId="ai-picks" title="AI Picks" className="col-span-4 h-52" />
      <Card cardId="shorts" title="Short-Interest Radar" className="col-span-4 h-52" />
      <Card cardId="options" title="Options Flow" className="col-span-4 h-52" />

      {/* Row 3 */}
      <Card cardId="social" title="Social Sentiment" className="col-span-8 h-60" />
      <Card cardId="commodities" title="Commodities & DXY" className="col-span-4 h-60" />
    </Layout>
  );
}

