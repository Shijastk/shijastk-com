"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  syncReposAction,
  setRepoSelected,
  importRepoToProject,
} from "@/lib/admin/github-actions";
import type { GithubRepo } from "@/db/schema";

export default function GithubManager({ repos }: { repos: GithubRepo[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const run = (fn: () => Promise<{ ok: boolean; message?: string; error?: string }>) =>
    start(async () => {
      setMsg(null);
      const res = await fn();
      setMsg(res.ok ? res.message ?? "Done." : res.error ?? "Failed.");
      router.refresh();
    });

  const visible = showSelectedOnly ? repos.filter((r) => r.isSelected) : repos;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button disabled={pending} onClick={() => run(syncReposAction)}>
            {pending ? "Working…" : "Sync now"}
          </Button>
          <label className="flex items-center gap-2 text-sm text-zinc-500">
            <Switch checked={showSelectedOnly} onChange={setShowSelectedOnly} />
            Selected only
          </label>
        </div>
        {msg ? <span className="text-sm text-primary-color">{msg}</span> : null}
      </div>

      {repos.length === 0 ? (
        <Card>
          <CardBody className="text-sm text-zinc-500">
            No cached repositories yet. Click <strong>Sync now</strong> to fetch
            them from GitHub ({process.env.NEXT_PUBLIC_GITHUB_USERNAME}).
          </CardBody>
        </Card>
      ) : (
        <ul className="space-y-3">
          {visible.map((repo) => (
            <li key={repo.id}>
              <Card>
                <CardBody className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-zinc-500 shrink-0">
                    <Switch
                      checked={repo.isSelected}
                      onChange={(v) => run(() => setRepoSelected(repo.id, v))}
                    />
                    Show
                  </label>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{repo.name}</p>
                    <p className="text-sm text-zinc-500 truncate">
                      {repo.description ?? "No description"}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      ★ {repo.stargazersCount} · {repo.language ?? "—"}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={pending}
                    onClick={() => run(() => importRepoToProject(repo.id))}
                  >
                    Import as project
                  </Button>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
