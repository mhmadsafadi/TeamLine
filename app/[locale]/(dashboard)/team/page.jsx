import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import TeamList from "./components/TeamList";

const TeamPage = async () => {
  const supabase = await createClient();
  const t = await getTranslations("Dashboard.Team");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: workspaces } = await supabase
    .from("workspaces")
    .select("id, name")
    .eq("owner_id", user.id)
    .limit(1);

  const workspace = workspaces?.[0];
  if (!workspace) return null;

  const { data: members } = await supabase
    .from("workspace_members")
    .select(
      `
      id, role, joined_at,
      user_id
    `,
    )
    .eq("workspace_id", workspace.id)
    .order("joined_at", { ascending: true });

  // جلب بيانات المستخدمين
  const memberIds = members?.map((m) => m.user_id) || [];

  const { data: profiles } =
    memberIds.length > 0
      ? await supabase
          .from("users")
          .select("id, email, raw_user_meta_data")
          .in("id", memberIds)
      : { data: [] };

  const membersWithProfiles = (members || []).map((member) => {
    const profile = profiles?.find((p) => p.id === member.user_id);
    return {
      ...member,
      email: profile?.email || "",
      full_name:
        profile?.raw_user_meta_data?.full_name ||
        profile?.email?.split("@")[0] ||
        "User",
      avatar_url: profile?.raw_user_meta_data?.avatar_url || null,
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{t("title")}</h1>
          <p className="text-sm text-gray-400 my-1" >
            {workspace.name} • {members?.length || 0} {t("members")}
          </p>
        </div>
      </div>
      <TeamList
        members={membersWithProfiles}
        workspaceId={workspace.id}
        currentUserId={user.id}
      />
    </div>
  );
};

export default TeamPage;
