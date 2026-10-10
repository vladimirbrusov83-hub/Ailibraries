"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { RoleFilter } from "@/lib/audience";
import { readSavedRole, saveRole } from "@/lib/role-memory";

// Remembers the curriculum role highlight on this device. A ?role= link always wins;
// a bare /curriculum visit restores the last role picked.
export default function RoleMemory({ role }: { role: RoleFilter | null }) {
  const router = useRouter();

  useEffect(() => {
    if (role) {
      saveRole(role);
      return;
    }
    const saved = readSavedRole();
    if (saved && saved !== "all") {
      router.replace(`/curriculum?role=${saved}`, { scroll: false });
    }
  }, [role, router]);

  return null;
}
