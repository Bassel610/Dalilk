import { useState } from 'react';
import { useUsers } from '../../../../hooks/use-users';
import { useAuth } from '../../../../hooks/use-auth';
import { useToast } from '../../../../components/toast';
import { useConfirm } from '../../../../components/confirm-dialog';
import { RowSkeleton } from '../../../../components/skeleton';
import EmptyState from '../../../../components/empty-state';
import { TEXT } from '../../../../constants/ui-text';
import './styles.css';

export default function UserManagement() {
  const { user } = useAuth();
  const { users, loading, create, remove } = useUsers();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const confirm = useConfirm();

  const addUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await create({ email, password, role });
      toast.success('تمت إضافة المستخدم');
      setEmail('');
      setPassword('');
      setRole('user');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (u) => {
    const ok = await confirm({
      title: 'حذف المستخدم',
      message: `سيتم حذف الحساب "${u.email}" نهائياً.`,
      confirmLabel: 'حذف',
      cancelLabel: 'إلغاء',
      variant: 'danger',
    });
    if (!ok) return;
    try {
      await remove(u.uid);
      toast.success('تم حذف المستخدم');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="UserMgmt">
      <form onSubmit={addUser} className="UserMgmt-form">
        <input
          type="email"
          placeholder={TEXT.AUTH.EMAIL}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={TEXT.AUTH.PASSWORD}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit" disabled={submitting}>
          {submitting ? '…' : 'إضافة'}
        </button>
      </form>

      {loading ? (
        <RowSkeleton count={3} />
      ) : users.length === 0 ? (
        <EmptyState title="لا يوجد مستخدمون" description="ابدأ بإضافة أول مستخدم بالأعلى." />
      ) : (
        <table>
          <thead>
            <tr>
              <th>{TEXT.AUTH.EMAIL}</th>
              <th>{TEXT.ADMIN.ROLE}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.uid}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.uid !== user?.uid && (
                    <button className="UserMgmt-delete" onClick={() => handleDelete(u)}>
                      {TEXT.ADMIN.DELETE}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
