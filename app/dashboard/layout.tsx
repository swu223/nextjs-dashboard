import SideNav from '@/app/ui/dashboard/sidenav';
 
// layout basically will include components that will pop up in other pages in this same folder --> such as the customers page will also include the sidenav bar underneath

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}