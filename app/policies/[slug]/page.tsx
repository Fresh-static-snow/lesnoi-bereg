import PublicSite from "../../components/PublicSite";
export default async function PolicyPage({ params }: { params: Promise<{slug:string}> }) { const {slug}=await params; return <PublicSite view="policy" slug={slug}/>; }
