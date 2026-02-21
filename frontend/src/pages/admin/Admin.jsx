import './Admin.css'
import AdminPanel from '../../components/admin/AdminPanel'

export default function Admin() {
    return (
        <div className="admin-page">
            <div className="admin-container">
                <h2 className="admin-title">Admin Dashboard</h2>
                <AdminPanel />
            </div>
        </div>
    )
}
