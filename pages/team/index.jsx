import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { fetchJson } from '../../lib/api';

const emptyMember = { name: '', email: '', role: 'member' };

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState(emptyMember);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const response = await fetchJson('/api/team');
    setMembers(response?.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const sortedMembers = useMemo(
    () => [...(members ?? [])].sort((a, b) => a.name.localeCompare(b.name)),
    [members],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchJson('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember),
    });
    setNewMember(emptyMember);
    setIsAddModalOpen(false);
    fetchMembers();
  };

  if (loading) return <p>Loading members...</p>;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Team Directory</h2>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          aria-label="Open add member form"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Member
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedMembers.map((member) => (
          <article key={member.id} className="rounded-lg border border-slate-700 p-4">
            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{member.email}</p>
            <p className="mt-2 inline-block rounded bg-slate-200 px-2 py-1 text-xs dark:bg-slate-700">{member.role}</p>
          </article>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Member">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            className="w-full rounded border border-slate-400 bg-transparent p-2"
            placeholder="Name"
            aria-label="Member name"
            value={newMember.name}
            onChange={(event) => setNewMember((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
          <input
            className="w-full rounded border border-slate-400 bg-transparent p-2"
            placeholder="Email"
            type="email"
            aria-label="Member email"
            value={newMember.email}
            onChange={(event) => setNewMember((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <select
            className="w-full rounded border border-slate-400 bg-transparent p-2"
            aria-label="Member role"
            value={newMember.role}
            onChange={(event) => setNewMember((prev) => ({ ...prev, role: event.target.value }))}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            aria-label="Submit new member"
            className="rounded-md bg-blue-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Member
          </button>
        </form>
      </Modal>
    </section>
  );
}
