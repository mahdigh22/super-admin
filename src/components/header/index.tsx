import { SearchIcon } from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils/class-names";
import { SidebarTrigger } from "../ui/sidebar";

const Header = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <header
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-5 bg-card py-2 px-4 shadow-md border-b h-16",
          className
        )}
        {...rest}
      >
        {" "}
        <SidebarTrigger className="w-16" />
        <div className="flex-1">
          <Input variant="filled" prepend={<SearchIcon />} />
        </div>{" "}
        {/* <ThemeSwitch /> */}
      </header>
    );
  }
);
Header.displayName = "Header";

export { Header };

// function ThemeSwitch() {
//   const { theme, setTheme } = useTheme();

//   const handleCheckedChange = (value: boolean) => {
//     const newTheme = value ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   return (
//     <div className="flex items-center gap-1">
//       <Sun size="17px" />
//       <Switch checked={theme === 'dark'} onCheckedChange={handleCheckedChange} />
//       <Moon size="17px" />
//     </div>
//   );
// }
