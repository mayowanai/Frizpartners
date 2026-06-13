'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateProfileAction } from '@/lib/actions/auth';

const inputClass =
  'w-full rounded-2xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm text-assi-ink outline-none backdrop-blur-md transition focus:border-assi-plum/50 focus:ring-2 focus:ring-assi-plum/20';

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-ghost shrink-0 px-5 py-2.5 text-sm disabled:opacity-60">
      {pending ? '저장 중…' : '저장'}
    </button>
  );
}

export default function ProfileForm({ defaultName }: { defaultName: string }) {
  const [state, action] = useFormState(updateProfileAction, undefined);

  return (
    <form action={action}>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium text-assi-ink/70">이름</label>
          <input name="name" defaultValue={defaultName} required className={inputClass} />
        </div>
        <SaveButton />
      </div>
      {state?.success && <p className="mt-2 text-xs text-emerald-500">✓ 저장되었어요</p>}
      {state?.error && <p className="mt-2 text-xs text-red-500">{state.error}</p>}
    </form>
  );
}
