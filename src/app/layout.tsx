import ThemeProvider from "@/components/Providers/ThemeProvider";
import { geistMono, geistSans, interHeading } from "@/lib/fonts";
import { LayoutProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import "./globals.css";
import { TooltipProvider } from "@/components/shadcnui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcnui/sidebar";
import AppSidebar from "@/components/SideBarComp/AppSidebar";
import ThemeToggleButton from "@/components/Layout/ThemeToggleButton";
import { DateTimeView } from "@/components/SideBarComp/DateTimeView";
import { Toaster } from "@/components/shadcnui/toast";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        interHeading.variable,
      )}
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}>
          <TooltipProvider>
            <SidebarProvider defaultOpen>
              <AppSidebar />

              <SidebarInset>
                <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
                  <SidebarTrigger />

                  <div className="me-5 flex items-center gap-3">
                    <DateTimeView />

                    <ThemeToggleButton />
                  </div>
                </div>

                <main className="mx-auto w-full">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
