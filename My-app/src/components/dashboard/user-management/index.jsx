import { useState } from 'react';
import { useUsersList } from '../../../hooks/users/use-users-list';
import { useCreateUser } from '../../../hooks/users/use-create-user';
import { useDeleteUser } from '../../../hooks/users/use-delete-user';
import { useAuth } from '../../../hooks/auth/use-auth';
import { RowSkeleton } from '../../skeleton';
import EmptyState from '../../empty-state';
import Input from '../../input';
import Button from '../../button';
import { TEXT } from '../../../constants/app/ui-text';
import { USER_MGMT_TEXT, ROLE_OPTIONS } from '../../../constants/pages/dashboard';
import './styles.css';

export default function UserManagement() {
  const { user } = useAuth();
  const { users, loading, reload, removeLocal } = useUsersList();
  const { createUser, creating } = useCreateUser({ onSuccess: () => reload() });
  const { deleteUser } = useDeleteUser({
    onSuccess: (u) => removeLocal(u.uid),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await createUser({ email, password, role });
      setEmail('');
      setPassword('');
      setRole('user');
    } catch {
      // toast already shown by hook
    }
  };

  return (
    <div className="UserMgmt">
      <form onSubmit={addUser} className="UserMgmt-form">
        <Input
          type="email"
          placeholder={TEXT.AUTH.EMAIL}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={TEXT.AUTH.PASSWORD}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <Input
          type="select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={ROLE_OPTIONS}
        />
        <Button type="submit" variant="primary" loading={creating}>
          {USER_MGMT_TEXT.ADD_BTN}
        </Button>
      </form>

      {loading ? (
        <RowSkeleton count={3} />
      ) : users.length === 0 ? (
        <EmptyState title={USER_MGMT_TEXT.EMPTY_TITLE} description={USER_MGMT_TEXT.EMPTY_DESC} />
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
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteUser(u)}
                    >
                      {TEXT.ADMIN.DELETE}
                    </Button>
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
