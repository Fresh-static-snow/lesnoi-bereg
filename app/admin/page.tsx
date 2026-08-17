import { requireChatGPTUser } from "../chatgpt-auth";
import AdminDashboard from "../components/AdminDashboard";

export const dynamic = "force-dynamic";

async function ProtectedAdmin() {
  const user = await requireChatGPTUser("/admin");
  return <AdminDashboard user={{ displayName: user.displayName, email: user.email }} />;
}

export default function AdminPage() { return <ProtectedAdmin />; }
