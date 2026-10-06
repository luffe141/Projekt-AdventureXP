import styles from "./Admin.module.css";
import AdminSidebar from "./adminComponents/AdminSidebar/AdminSidebar";
import DashboardStats from "./adminComponents/DashboardStats/DashboardStats";
import WeeklyCalendar from "./adminComponents/WeeklyCalendar/WeeklyCalendar";
import BookingPanels from "./adminComponents/BookingPanels/BookingPanels";

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
