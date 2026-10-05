import styles from "./Admin.module.css";
import AdminSidebar from "./adminComponents/AdminSidebar";
import DashboardStats from "./adminComponents/DashboardStats";
import WeeklyCalendar from "./adminComponents/WeeklyCalendar";
import BookingPanels from "./adminComponents/BookingPanels";

function Admin() {
  return (
    <main className={styles.adminPage}>
      <AdminSidebar />
      <section className={styles.dashboard} aria-label="Admin oversigt">
        <DashboardStats />
        <div className={styles.dashboardGrid}>
          <WeeklyCalendar />
          <BookingPanels />
        </div>
      </section>
    </main>
  );
}

export default Admin;
